import React, { useEffect, useState } from "react";
import { JsonInput as MantineJsonInput } from "@mantine/core";
import { AnyJsonObject } from "../types";
import { getResolvedInput } from "../JsonInput/utils";
import { UseMuttableData } from "../hooks/useMutableResult";
import "./JsonInput.css";

type JsonInputProps = {
	id: string;
	className?: string;
	label: string;
	useMuttableData: UseMuttableData;
	initialValue?: AnyJsonObject;
	formatOnBlur?: boolean;
};

export const CsvInput = (props: JsonInputProps) => {
	const {
		id,
		initialValue,
		label,
		className,
		useMuttableData,
		formatOnBlur = true,
	} = props;
	const resolvedIinitialValue = getResolvedInput(initialValue);

	const jsonInputRef = React.useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		setValue(resolvedIinitialValue);
		setTimeout(() => {
			jsonInputRef.current && jsonInputRef.current.focus();
		}, 10);
		setTimeout(() => {
			jsonInputRef.current && jsonInputRef.current.blur();
		}, 20);
	}, [
		// To make the JsonInput component format on render
		initialValue,
	]);

	const [value, setValue] = useState(resolvedIinitialValue);
	const [isError, setError] = useState(false);
	const [data, setData] = useMuttableData;

	function calculateRowHeight() {
		const rowPerPx = 14 / 350;
		const frRatio = 5 / 6;
		const pxPerInput = (window.innerHeight * frRatio) / 2;

		return pxPerInput * rowPerPx;
	}

	return (
		<MantineJsonInput
			id={id}
			ref={jsonInputRef}
			className={className}
			label={label}
			formatOnBlur={formatOnBlur}
			value={value}
			error={isError}
			radius="md"
			placeholder="Json will be validated on blur"
			validationError="Invalid JSON"
			minRows={calculateRowHeight()}
			onChange={(value) => {
				setValue(value);
				setError(false);

				// Clear selected data
				if (!value) {
					setData({});
					return;
				}

				try {
					setData(JSON.parse(value));
				} catch (error) {
					setError(true);
					console.log("Json parsing error");
				}
			}}
		/>
	);
};
