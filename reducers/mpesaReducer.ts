import { MpesaLinestype, MpesaType } from "@data/mpesa";

export enum MpesaActionEnum {
	CHANGE_NAME = "change_name",
	CHANGE_NAME_ERROR = "change_name_error",
	CHANGE_PHONE = "change_phone",
	CHANGE_PHONE_ERROR = "change_phone_error",
	CHANGE_EMAIL = "change_email",
	CHANGE_EMAIL_ERROR = "change_email_error",
	CHANGE_DISTRICT = "change_district",
	CHANGE_DISTRICT_ERROR = "change_district_error",
	CHANGE_CHURCH = "change_church",
	CHANGE_CHURCH_ERROR = "change_church_error",
	CHANGE_UNIT = "CHANGE_UNIT",
	CHANGE_LINES = "change_lines",
	CHANGE_LINES_ERROR = "change_lines_error",
	CLEAR_LINES = "clear_lines",
	SWITCH_SAVE = "swith_save",
	RESET = "reset",
}

interface ActionType {
	type: MpesaActionEnum;
	payload?: any;
}

export function MpesaReducer(state: MpesaType, action: ActionType): MpesaType {
	const { type, payload } = action;

	switch (type) {
		case MpesaActionEnum.CHANGE_NAME:
			return {
				...state,
				name: payload,
				name_error: undefined,
				errored: false,
			};

		case MpesaActionEnum.CHANGE_NAME_ERROR:
			return {
				...state,
				name_error: payload,
				errored: true,
			};

		case MpesaActionEnum.CHANGE_PHONE:
			return {
				...state,
				phone: payload,
				phone_error: undefined,
				errored: false,
			};

		case MpesaActionEnum.CHANGE_PHONE_ERROR:
			return {
				...state,
				phone_error: payload,
				errored: true,
			};

		case MpesaActionEnum.CHANGE_EMAIL:
			return {
				...state,
				email: payload,
				email_error: undefined,
				errored: false,
			};

		case MpesaActionEnum.CHANGE_EMAIL_ERROR:
			return {
				...state,
				email_error: payload,
				errored: true,
			};

		case MpesaActionEnum.CHANGE_DISTRICT:
			return {
				...state,
				district: payload,
				errored: false,
			};

		// case MpesaActionEnum.CHANGE_DISTRICT_ERROR:
		// 	return {
		// 		...state,
		// 		district_error: payload,
		// 		errored: true,
		// 	};

		case MpesaActionEnum.CHANGE_CHURCH:
			return {
				...state,
				church: payload,
				errored: false,
			};

		// case MpesaActionEnum.CHANGE_CHURCH_ERROR:
		// 	return {
		// 		...state,
		// 		church_error: payload,
		// 		errored: true,
		// 	};

		case MpesaActionEnum.CHANGE_UNIT:
			return {
				...state,
				unit: payload,
				unit_error: undefined,
				errored: false,
			};

		case MpesaActionEnum.CHANGE_LINES:
			return {
				...state,
				lines: [...payload],
				total: CalculateTotal(payload),
				errored: false,
			};

		case MpesaActionEnum.CHANGE_LINES_ERROR:
			return {
				...state,
				errored: true,
			};

		case MpesaActionEnum.CLEAR_LINES:
			return {
				...state,
				lines: [],
				total: 0,
				errored: false,
			};

		case MpesaActionEnum.SWITCH_SAVE:
			return {
				...state,
				save: !state.save,
			};

		case MpesaActionEnum.RESET:
			return {
				...payload,
			};

		default:
			return state;
	}
}

const CalculateTotal = (lines: MpesaLinestype[]): number => {
	return lines.reduce((total, line) => {
		const amount = Number(line.amount);

		return total + (Number.isFinite(amount) && amount > 0 ? amount : 0);
	}, 0);
};
