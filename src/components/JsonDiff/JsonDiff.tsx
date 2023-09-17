import React, { useContext } from "react";
import ReactJsonViewCompare from "react-json-view-compare";
import { NativeSelect } from "@mantine/core";
import { AnyJsonObject } from "../types";
import "./JsonDiff.css";
import { ResultPageContext } from "../../pages/ResultPage/context";

type JsonDiffProps = {
	expected: AnyJsonObject;
	actual: AnyJsonObject;
	options: string[];
};

export const JsonDiff = (props: JsonDiffProps) => {
	const { actual, expected, options } = props;
	const {
		methods: { setSelectedIndex },
	} = useContext(ResultPageContext);

	return (
		<>
			<div className="my-4 mr-6">
				<NativeSelect
					data={options}
					label="Select the index to compare"
					description="Index is by execution command order"
					onChange={(e) => {
						const index =
							parseInt(
								e.currentTarget.value.slice(-1)
							) - 1;
						setSelectedIndex(index);
					}}
				/>
			</div>

			<div className="w-full h-4/5 overflow-y-scroll scrollbar">
				<ReactJsonViewCompare
					oldData={expected}
					newData={actual}
				/>
			</div>
		</>
	);
};
