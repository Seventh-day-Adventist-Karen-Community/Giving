import React, { useCallback, useMemo } from "react";

import DisabledItem from "./DisabledItem";
import { useSelectContext } from "./SelectProvider";
import { Option } from "./type";

interface ItemProps {
    item: Option;
}

const Item: React.FC<ItemProps> = ({ item }) => {
    const { classNames, value, handleValueChange, formatOptionLabel } = useSelectContext();

    const isSelected = useMemo(() => {
        return value !== null && !Array.isArray(value) && value.value === item.value;
    }, [item.value, value]);

    const getItemClass = useCallback(() => {
        const baseClass =
            "block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded";
        const selectedClass = isSelected
            ? `text-gray-200 dark:text-white bg-maroon-500 dark:bg-gray-800`
            : `text-gray-500 dark:text-gray-200 hover:bg-maroon-100 hover:text-maroon-500 dark:hover:bg-gray-800 dark:hover:text-gray-100`;

        return classNames && classNames.listItem
            ? classNames.listItem({ isSelected })
            : `${baseClass} ${selectedClass}`;
    }, [classNames, isSelected]);

    return (
        <>
            {formatOptionLabel ? (
                <div onClick={() => handleValueChange(item)}>
                    {formatOptionLabel({ ...item, isSelected })}
                </div>
            ) : (
                <>
                    {item.disabled ? (
                        <DisabledItem>{item.label}</DisabledItem>
                    ) : (
                        <li
                            aria-selected={isSelected}
                            role={"option"}
                            onClick={() => handleValueChange(item)}
                            className={getItemClass()}
                        >
                            {item.label}
                        </li>
                    )}
                </>
            )}
        </>
    );
};

export default Item;
