import React from "react";
import ReactJsonViewCompare from "react-json-view-compare";
import { AnyJsonObject } from "../types";
import "./JsonDiff.css";

type JsonDiffProps = {
	expected: AnyJsonObject;
	actual: AnyJsonObject;
};

export const JsonDiff = (props: JsonDiffProps) => {
	const { actual, expected } = props;

	return (
		<>
			<div className="w-full h-4/5 overflow-y-scroll scrollbar">
				<ReactJsonViewCompare
					oldData={expected}
					newData={actual}
				/>
			</div>
		</>
	);
};
