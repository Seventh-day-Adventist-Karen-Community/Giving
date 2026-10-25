import React, {Fragment, useState } from "react";
import Button from "./Button";
import CheckedBox from "./svgs/CheckedBox";
import UnCheckedBox from "./svgs/UnCheckedBox";
import IndeterminateCheckBox from "./svgs/IndeterminateCheckBox";
import Search from "./svgs/search";
import { Icolumn, Irow, renderFunction, IPaginated, IPerPage, stringRenderFunc, TableActionType, rowActionFunc, RowAction } from "./table-types";
import utilsClass from "./utilsClass";
import { RiFileExcel2Line } from "react-icons/ri";
import { FaFileCsv } from "react-icons/fa";
import { AiOutlineFilePdf } from "react-icons/ai";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import { AdminTextButtonPlain2, AdminTextLinkPlain, AdminTextLinkPlain2 } from "../buttons";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

var XLSX = require("xlsx");

declare global {
    interface Navigator {
        msSaveBlob?: (blob: any, defaultName?: string) => boolean
    }
}
export interface ItableRow {
	row: Irow,
	columns: Icolumn[],
	primary_key_field?: string,
	/**
	 * If users want to enable using bulk selects, then they have to pass in an array of strings of actions.
	 * If that array of string is empty, then this will be false
	 */
	use_bulk_action: boolean,
	use_row_actions?: boolean,
	row_actions?: RowAction[],
	index: number,
	render?: renderFunction,
	checked_set: Set<number>,
	active_page_number: number,
	use_in_visibility?: string,
	/**
	 * Whenever a single checkbox in a table row is clicked, this is invoked. Since I'm using a cotrolled input,
	 * I therefore trigger an event up the tree to notify about this click. This is then recorded on the 
	 * `Set` that holds data of clicked rows for this page. 
	 */
	setCheck: (page_number: number, index: number, ischecked: boolean) => void,
	is_striped: boolean,
	is_bordered:boolean,
	is_hovered:boolean,
	row_style: string,
	data_style:string
}

export function TableRow(props: ItableRow) {
// console.log(props.row, props.columns)
	let primary = props.primary_key_field || 'index'	
	let user_primary = props.columns.filter(col => col.user_primary == true)?.[0]?.field || 'index'
	return (
		<tr className={`${props.is_hovered ? "focus:text-maroon-300 active:text-maroon-300 hover:text-gray-600 dark:hover:text-gray-400  transition-all delay-75 ":""} 
						${props.is_bordered ? "border-b border-gray-200 dark:border-gray-800 ":""} 
						${utilsClass.isEven(props.index + 1) && props.is_striped? 'bg-gray-50 dark:bg-gray-930 ' : ''}`
						+ props.row_style}>

			{props.use_bulk_action &&
				<td className={"px-3 py-3 pl-4 text-base hover:bg-gray-50 dark:hover:bg-gray-700 transition-all delay-75 w-8"+ props.data_style}>
					<input id={`${props.row[primary]}`} className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-60" type="checkbox"
						checked={props.checked_set.has(props.index)}
						title={`Select ${props.row[user_primary]}`}
						onChange={(ev) => props.setCheck(props.active_page_number, props.index, ev.target.checked)} />
					<label htmlFor={`${props.row[primary]}`} className="sr-only">checkbox</label>
				</td>
			}

			{
				props.columns.map((column: Icolumn, index: number) => {
					return <TableData key={index.toString()} 
									  col={column} 
									  row={props.row} 
									  render={props.render}
									  style={props.data_style} />
				})
			}
			{props.use_row_actions && 
				<td className="flex flex-row justify-end gap-2 py-2 pl-1 text-base">
					{props.row_actions?.map((row_action)=>{
						return(
							(row_action.visible || props.row[props.use_in_visibility??'index']) ?
								<div key={row_action.title} className='p-0 m-0'>
								{ row_action.type == TableActionType.Link ?
									<AdminTextLinkPlain2  link={`${row_action.basePath??''}${props.row[primary]}${row_action.pathSuffix??''}`} text={row_action.name || ''} icon={row_action.icon} title={`${row_action.title} ${props.row[user_primary]}`} className={row_action.className} reverse/>		
								:
									<AdminTextButtonPlain2 className={row_action.className} icon={row_action.icon} title={`${row_action.title} ${props.row[user_primary]}`} text={row_action.name || ''} onClick={() => row_action.action && row_action.action(props.row[primary])} reverse/>
								}
								</div>
							:
							<></>
						)
					})}
				</td>
			}
		</tr>
	)
}



export function TableData(props: { col: Icolumn, row: Irow, render?: renderFunction, style:string }) {

	var display_value = utilsClass.unwindObject(props.row, props.col.field);
	return (
		<td className={"px-2 py-3 text-sm "+props.style} >

			{
				(props.render && props.render(props.row, props.col, display_value)) || display_value
			}
		</td>
	)
}

interface Ithead {
	columns: Icolumn[],
	use_row_actions?: boolean,
	use_bulk_action: boolean,
	page_data: IPerPage,
	active_page_number: number,
	mass_checking: (page_number: number, action: "check-all" | "uncheck-all") => void,
	row_style: string,
	data_style: string,
	sorting: (column:Icolumn, ascending:boolean)=>void
}

export function TableHead(props: Ithead) {

	let page = props.active_page_number;
	let rows_lenth : number = 0;
	let checked_length : number = 0;
	let all_is_checked : boolean = false;
	let some_ischecked : boolean = false;
	let none_is_checked : boolean = false;

	//Only run this calculations if user opted to use bulk select api and the table data is not empty
	if(props.use_bulk_action){
		//This data might be undefined, so use this operator
		rows_lenth = props.page_data?.page_row_array.length;
		checked_length = props.page_data?.checked_set.size;
		all_is_checked = rows_lenth === checked_length && rows_lenth !== 0;
		some_ischecked = checked_length > 0 && !all_is_checked;
		none_is_checked = checked_length === 0;
	}


	const display_columns = props.columns?.filter((column: Icolumn) => {
		//Dont show columns the developer indicated should be false
		return column.use_in_display !== false;
	});

	return <tr className={"bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-300 border-gray-700 dark:text-gray-300 text-left "+props.row_style} >

		{
			props.use_bulk_action &&
			<th className={"text-base font-semibold text-gray-700 dark:text-gray-300 py-3.5 px-2 pl-4 "+props.data_style} >
				{
					all_is_checked && < CheckedBox onClick={() => props.mass_checking(page, 'uncheck-all')}
						className="bulk-checkbox fill-current w-4 h-4 cursor-pointer" />
				}

				{
					some_ischecked && < IndeterminateCheckBox onClick={() => props.mass_checking(page, 'check-all')}
						className="bulk-checkbox indeterminate fill-current w-4 h-4 cursor-pointer" />
				}

				{
					none_is_checked && < UnCheckedBox onClick={() => props.mass_checking(page, 'check-all')}
						className="bulk-checkbox fill-current w-4 h-4 cursor-pointer" />
				}
			</th>
		}

		{
			display_columns?.map((column: Icolumn, index) => {
				// if item is the first in array, then padd left
				// if it is last, then pad right
				return <SingleTableHead key={index.toString()} column={column} index={index} props={props} length={display_columns.length - 1}/>
			})
		}
		{
			props.use_row_actions &&
			<th>
			</th>
		}
	</tr>
}

function SingleTableHead({props, column, index, length}:{props: Ithead,column: Icolumn, index:any, length:number}){
	const [ascending, setAscending] = useState(true)
	const toggleSorting = () =>{
		setAscending(!ascending)
		props.sorting(column, ascending)
	}
	return(
		<th key={index.toString()}
					className={`font-semibold text-gray-700 dark:text-gray-300 text-sm py-3.5 px-2 ${column.use_in_sorting && 'hover:cursor-pointer hover:text-yellow-600 dark:hover:text-yellow-300'} 
							${!props.use_bulk_action && index === 0 ? 'pl-4 ' : ''}
							${index === length ? 'pr-4 ' : ''} ` +props.data_style}
					onClick={toggleSorting}
				>
					<div className="flex flex-row justify-between content-center align-middle">
					{column.use ? column.use : column.field}
					{column.use_in_sorting && 
						<div className="flex flex-col justify-center">
							{ascending ?
								<BiChevronUp size={16}/>
							:
								<BiChevronDown size={16}/>
							}
						</div>
					}
				</div>
		</th>
	)
}


export function TableCaption(props: { text: string, style:string }) {
	return <div className={"flex mt-4 mb-1 text-base font-semibold tracking-wide leading-7 text-gray-700 dark:text-gray-100 "+ props.style}>
		<h4 className=" ml-1 react-table-top-caption">
			{props.text}
		</h4>
	</div>
}


export function TableSearch(props: { onSearch: (text: string) => void, style: string }) {

	return <div className="relative flex items-center mt-3 md:mt-0 table-top-search">
		<input type="text" name="search"
			className={`text-xs py-2 h-9 px-4 pl-6 w-52 md:w-auto focus:outline-none leading-tight tracking-wide focus:ring-2 focus:ring-maroon-500
			text-gray-700 border border-gray-300 dark:border-gray-600 bg-gray-100 rounded dark:bg-gray-800 dark:text-gray-100 `+ props.style}
			placeholder="Search"
			onChange={(ev: React.ChangeEvent<HTMLInputElement>) => props.onSearch(ev.target.value)} />
		<Search className="dark:text-gray-300 absolute w-2.5 h-2.5 ml-2" style={{ top: '0.9rem' }} />
	</div>

}

interface IexportProps {
	export_text: string, 
	paginated_data: IPaginated, 
	cols: Icolumn[], 
	file_name: string, 
	processFunc?: stringRenderFunc, 
	bg_color?: string, 
	text_color: string,
	style: string,
	other_links?: {icon: React.ReactNode, link: string, name?: string, title: string}[],
	orientation?: "p" | "portrait" | "l" | "landscape",
}
export function TableExport(props: IexportProps) {
	return(
		<div className="flex order-first md:order-none self-end md:self-auto gap-x-3">
			<>
				{props.other_links && 
					props.other_links.map((link)=>{
						return(
							<AdminTextLinkPlain key={link.title} link={link.link} text='New' icon={link.icon} reverse />
						)
					})
				}
			</>
			<div className={`export-btn flex items-center  hover:text-blue-500 cursor-pointer `+props.style}
				onClick={() => processDownload(props.paginated_data, props.cols,props.file_name, props.processFunc)}  id="export-it">
				<FaFileCsv className="fill-current w-4 h-4 mr-2 text-blue-600 cursor-pointer hover:text-blue-500 transition-all delay-75" />
				<p className="font-normal text-base">{props.export_text}</p>
			</div>
			<div
				className="export-btn flex items-center cursor-pointer hover:text-green-500 transition-all delay-75"
				onClick={() => processExcelDownload(props.paginated_data, props.cols,props.file_name)}  id="export-it">
				<RiFileExcel2Line className="fill-current w-4 h-4 mr-2 text-green-600 cursor-pointer hover:text-green-500 transition-all delay-75"/>
				<p className="font-normal text-base">Excel</p>
			</div>
			<div
				className="export-btn flex items-center cursor-pointer hover:text-red-500 transition-all delay-75"
				onClick={() => processPDFDownload(props.paginated_data, props.cols,props.file_name, props.orientation)}  id="export-it">
				<AiOutlineFilePdf className="fill-current w-4 h-4 mr-2 text-red-600 cursor-pointer hover:text-red-500 transition-all delay-75"/>
				<p className="font-normal text-base">Pdf</p>
			</div>
			
		</div>
	) 

}

export function TableTop(props: { children?: React.ReactNode, style:string }) {
	return <Fragment>
		{
			props.children && <div className={"flex flex-col gap-3 lg:flex-row md:items-center py-2 justify-between mt-4 mb-2 react-table-top "+props.style} >
				{props.children}
			</div>
		}
	</Fragment>

}


export interface ItableActProps { 
	action_options: string[], 
	eventSelected: (option: string) => void, 
	bg_color : string, 
	text_color ?: string,
	dropdown_style: string,
	button_style: string,
	button_text: string
}
export function TableBulkAction(props: ItableActProps) {

	const [currentOption, setOption] = useState('nothing');
	let isNothing = currentOption === 'nothing';

	function optionChange(event: React.ChangeEvent<HTMLSelectElement>) {
		let value = event.target.value;
		setOption(value)
	}

	/**
	 * When the `Button` element below is pressed, this function fires the event to the prop passed in by the user.
	 */
	function takeAction(){
		if (!isNothing) {
			//The rows selected are not passed in here, the parent table component is allowed to figure out
			//The logic of getting the currently selected rows and sending to the user
			props.eventSelected(currentOption);
		}
	}

	return <div className="flex items-center mt-3 md:mt-0 bulk-select-dropdown">
		<div className="w-52 md:w-48 relative mr-2 flex ">
			<select
				onChange={optionChange}
				value={currentOption}
				className={`leading-tight block appearance-none w-full bg-white dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600 flex-shrink 
								   border border-gray-200 px-3 py-2 pr-8 rounded `+ props.dropdown_style}>
				<option value="nothing">Select ...</option>
				{
					props.action_options.map((value: string, index: number) => {
						return <option key={index.toString()} value={value}>{value}</option>
					})
				}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
				<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
					<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
				</svg>
			</div>
		</div>

		<Button bg_color={props.bg_color} px="px-6"
				className={`${isNothing?'opacity-50':''}`+props.button_style} 
				disabled={isNothing}
				uppercase={false} 
				onClick={takeAction} >{props.button_text}</Button>
	</div>
}


interface Ifooter {
	page_number_list: number[],
	paginated_map: IPaginated,
	active_page: number,
	total_pages: number,
	onPageChange: (page_number: number) => void,
	bg_color: string,
	main_style: string,
	statistics_main_style: string,
	statistics_number_style: string,
	number_box_Style: string
}

export function Footer(props: Ifooter) {
	const { active_page, page_number_list, paginated_map,main_style,
			statistics_main_style,statistics_number_style,number_box_Style} = props;
	// statistics_number_style

	let page_count = props.page_number_list.length;


	function pageClick(page_number: number) {
		props.onPageChange(page_number);
	}

	function nextBackBtnClick(direction: "nxt" | "bck") {
		if (direction === "nxt" && paginated_map[active_page].forward_button_clickable) {
			props.onPageChange(active_page + 1);
			return;
		}
		if (direction === "bck" && paginated_map[active_page].back_button_clickable) {
			props.onPageChange(active_page - 1);
			return;
		}

	}

	return page_count > 0 ?
		<div className={"flex flex-col md:flex-row justify-between mt-6 items-center px-2 w-full md:w-auto "+main_style}>
			<div>
				<p className={"text-sm "+statistics_main_style}>
					Showing
				<span className={"font-bold "+statistics_number_style}> {paginated_map[active_page].from_index + 1} </span>  
				to
				<span className={"font-bold "+statistics_number_style}> {paginated_map[active_page].from_index + paginated_map[active_page].page_row_array.length} </span> 
				of
				<span className={"font-bold "+statistics_number_style}> {props.total_pages} </span>entries
			</p>
			</div>

			<div className="flex rounded overflow-hidden border mt-2 md:mt-0 w-full md:w-auto">

				<div className={`back-button text-sm w-7 h-7 md:w-8 md:h-8 flex items-center justify-around border-r 
							  ${paginated_map[active_page].back_button_clickable ?
							  ' cursor-pointer ' : ' cursor-not-allowed '} 
							  ${paginated_map[active_page].back_button_clickable ?'text-gray-700' : 'text-gray-400'} 
							  `+number_box_Style}
					 onClick={() => nextBackBtnClick('bck')}>
					<p>
						<svg className="transform rotate-180 fill-current" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0.772277 9.90938L0.837937 9.85312L5.73111 5.60312C5.89682 5.45937 6 5.24375 6 5.00313C6 4.7625 5.89369 4.54688 5.73111 4.40312L0.847317 0.15625L0.766024 0.0843749C0.687858 0.0312499 0.59406 0 0.494007 0C0.221991 0 0 0.23125 0 0.51875V9.48125C0 9.76875 0.221991 10 0.494007 10C0.597186 10 0.694111 9.96562 0.772277 9.90938Z" />
						</svg>
					</p>
				</div>

				{
					/**
					 * I want each line to have between 7-9 boxes of pagination, This logic solved it
					 * This implementation also had mobile view in mind. To make sure the pagination numbers do not 
					 * over stretch the mobile screen
					 */

					/* Else */
					page_number_list.length <= 7 ?
						//If total number of items in list is just less than or equal to seven
						//Then don't border implementing the algorithm below
						page_number_list.map((page_number) => {
							let is_active_page = page_number === active_page;
							return <NumberBox key={page_number} 
											  is_active_page={is_active_page}
											  page_number={page_number} 
											  pageClick={pageClick}
											  bg_color={props.bg_color}
											  style={number_box_Style} />
						})

						/* Else IF */
						: active_page >= 1 && active_page <= 6 ?
							/* if the active page is nin the beginning of the pagination list*/
							<ActivePageBegining pageClick={pageClick} page_number_list={page_number_list}
								active_page={active_page} bg_color={props.bg_color} style={number_box_Style} />

							/* Else IF  The current active page is at the ending of the Pagination list*/
							: active_page >= page_count - 5 && active_page <= page_count ?
								<ActivePageEnding pageClick={pageClick} page_number_list={page_number_list}
									active_page={active_page} bg_color={props.bg_color} style={number_box_Style} />

								/* Else  the active page is in the middle of the pagination list*/
								: <ActivePageMiddle pageClick={pageClick} page_number_list={page_number_list}
									active_page={active_page} bg_color={props.bg_color} style={number_box_Style}/>
				}



				<div className={`next-button text-sm w-7 h-7 md:w-8 md:h-8 flex items-center justify-around border-r 
							  ${paginated_map[active_page].forward_button_clickable ?
							  ' cursor-pointer ' : ' cursor-not-allowed '} 
							  ${paginated_map[active_page].forward_button_clickable ?'text-gray-700' : 'text-gray-400'} 
							  `+number_box_Style}
					onClick={() => nextBackBtnClick('nxt')}>
					<p >
						<svg className="fill-current" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0.772277 9.90938L0.837937 9.85312L5.73111 5.60312C5.89682 5.45937 6 5.24375 6 5.00313C6 4.7625 5.89369 4.54688 5.73111 4.40312L0.847317 0.15625L0.766024 0.0843749C0.687858 0.0312499 0.59406 0 0.494007 0C0.221991 0 0 0.23125 0 0.51875V9.48125C0 9.76875 0.221991 10 0.494007 10C0.597186 10 0.694111 9.96562 0.772277 9.90938Z" />
						</svg>
					</p>
				</div>


			</div>
		</div>

		: null;
}

export interface IPageNumberGroup{
	page_number_list: number[]; 
	active_page: number; 
	pageClick: (page: number) => void, 
	bg_color: string, 
	style: string 
}

function ActivePageBegining(props:IPageNumberGroup) {

	//Get the page that is last
	let last_page: number = props.page_number_list[props.page_number_list.length - 1];
	return <Fragment>
		{
			props.page_number_list.slice(0, 7).map((page_number) => {
				let is_active_page = page_number === props.active_page;
				return <NumberBox key={page_number} is_active_page={is_active_page} style={props.style}
								  page_number={page_number} pageClick={props.pageClick} bg_color={props.bg_color} />
			})
		}

		<DottedBox />

		<NumberBox page_number={last_page} is_active_page={false} style={props.style}
				   pageClick={props.pageClick} bg_color={props.bg_color}/>

	</Fragment>

}

function ActivePageMiddle(props: IPageNumberGroup) {

	//Get the page that is last
	let first_page: number = props.page_number_list[0];
	let page_count = props.page_number_list.length;
	let last_page: number = props.page_number_list[page_count - 1];

	return <Fragment>

		{/*  The First */}
		<NumberBox page_number={first_page} is_active_page={false} style={props.style}
				   pageClick={props.pageClick} bg_color={props.bg_color} />

		<DottedBox />

		{
			props.page_number_list.slice(props.active_page - 4, props.active_page + 3).map((page_number) => {
				let is_active_page = page_number === props.active_page;
				return <NumberBox key={page_number} is_active_page={is_active_page} style={props.style}
								  page_number={page_number} pageClick={props.pageClick} bg_color={props.bg_color} />
			})
		}

		<DottedBox />
		{/*  The last */}

		<NumberBox page_number={last_page} is_active_page={false} style={props.style}
				   pageClick={props.pageClick} bg_color={props.bg_color} />


	</Fragment>

}



function ActivePageEnding(props:IPageNumberGroup) {

	//Get the page that is last
	let first_page: number = props.page_number_list[0];
	let page_count = props.page_number_list.length;
	return <Fragment>

		<NumberBox page_number={first_page} is_active_page={false} style={props.style}
				   pageClick={props.pageClick} bg_color={props.bg_color} />

		<DottedBox />
		{
			props.page_number_list.slice(page_count - 7, page_count).map((page_number) => {
				let is_active_page = page_number === props.active_page;
				return <NumberBox key={page_number} is_active_page={is_active_page} style={props.style}
								  page_number={page_number} pageClick={props.pageClick} bg_color={props.bg_color} />
			})
		}

	</Fragment>

}



function DottedBox() {

	return <div className="w-7 h-7 md:w-8 md:h-8 flex flex-grow items-center justify-around border-r ">
		<p className="text-sm text-gray-700 ">
			<span className="hidden md:flex"> . . . </span>
			<span className="flex md:hidden"> ... </span>
		</p>
	</div>
}

export interface IBoxNumber{ 
	page_number: number, 
	is_active_page: boolean, 
	pageClick: (page: number) => void, 
	bg_color:string,
	style:string
}

function NumberBox(props: IBoxNumber) {
	return <div className={`text-sm w-7 h-7 md:w-8 md:h-8 flex items-center flex-grow flex-shrink 
							md:flex-shrink-0 justify-around border-r cursor-pointer 
							${props.is_active_page ? props.bg_color : ''}
							${props.is_active_page ? ' text-white ' : ''}`+ props.style}
		onClick={() => props.pageClick(props.page_number)}>
		<p>
			{
				props.page_number
			}
		</p>
	</div>
}


async function processDownload(paginated_data: IPaginated, colums: Icolumn[],file_name: string, processFunc?: stringRenderFunc) {

	let all_rows: Irow[] | null = [];
	var page: string; //suppose to be :number
	 file_name = file_name +".csv";
	for (page in paginated_data) {
		all_rows = all_rows.concat(paginated_data[page].page_row_array)
	}


	let blob = await utilsClass.generateCSV(colums, all_rows, processFunc), 
		url = window.URL.createObjectURL(blob);

	// @ts-ignore
	if (window.navigator.msSaveBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
		window.navigator.msSaveBlob(blob, file_name);
	else {
		var link = document.createElement("a");
		link.setAttribute("href", url);
		link.setAttribute("download", file_name);
		document.body.appendChild(link); // Required for Fire fox

		link.click(); // This will download the data file named "my_data.csv".

		setTimeout(() => {
			window.URL.revokeObjectURL(url);
			document.body.removeChild(link);
			all_rows = null;
		}, 0)
	}
}


async function processExcelDownload(paginated_data: IPaginated, colums: Icolumn[],file_name: string) {

	let all_rows: Irow[] | null = [];
	var page: string; //suppose to be :number
	for (page in paginated_data) {
		all_rows = all_rows.concat(paginated_data[page].page_row_array)
	}
	let {rows, columns} = await utilsClass.generateExcelArray(colums, all_rows)
	const worksheet = XLSX.utils.json_to_sheet(rows);
	const workbook = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(workbook, worksheet, "Main")
	/* fix headers */
	XLSX.utils.sheet_add_aoa(worksheet, [columns], { origin: "A1" });

	/* calculate column width */
	// const max_width = all_rows.reduce((w, r) => Math.max(w, r.name.length), 10);
	// worksheet["!cols"] = [ { wch: max_width } ];
  
	/* create an XLSX file and try to save to Presidents.xlsx */
	file_name = file_name +".xlsx";
	XLSX.writeFile(workbook, file_name, { compression: true });
}

async function processPDFDownload(paginated_data: IPaginated, colums: Icolumn[],file_name: string, orientation?:"p" | "portrait" | "l" | "landscape" ) {
	const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
	const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

	let all_rows: Irow[] | null = [];
	var page: string; //suppose to be :number
	for (page in paginated_data) {
		all_rows = all_rows.concat(paginated_data[page].page_row_array)
	}
	let {rows, columns} = await utilsClass.generateExcelArray(colums, all_rows)
	let content = {
		startY: 50,
		head: [columns],
		body: rows
	  };
	doc.text(file_name, marginLeft, 40);
	autoTable(doc, content)
	file_name = file_name +".pdf";
	doc.save(file_name)
}

