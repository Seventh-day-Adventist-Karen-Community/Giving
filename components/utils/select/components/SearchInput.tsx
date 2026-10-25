import React, { forwardRef, useContext } from "react";

import { SearchIcon } from "./Icons";
import { SelectContext } from "./SelectProvider";

interface SearchInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
    { placeholder = "", value = "", onChange, name = "" },
    ref
) {
    const { classNames } = useContext(SelectContext);
    return (
        <div
            className={
                classNames && classNames.searchContainer
                    ? classNames.searchContainer
                    : "relative py-1 bg-white dark:bg-gray-900"
            }
        >
            <SearchIcon
                className={
                    classNames && classNames.searchIcon
                        ? classNames.searchIcon
                        : "absolute w-5 h-5 mt-2.5 pb-0.5 ml-2 text-gray-500"
                }
            />
            <input
                ref={ref}
                className={
                    classNames && classNames.searchBox
                        ? classNames.searchBox
                        : "bg-inherit dark:text-gray-200 w-full py-2 pl-8 text-sm text-gray-500 border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none"
                }
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
            />
        </div>
    );
});

export default SearchInput;
