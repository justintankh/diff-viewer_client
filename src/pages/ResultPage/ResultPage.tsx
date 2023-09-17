import React from "react";
import { JsonDiff } from "../../components/JsonDiff/JsonDiff";
import { JsonInput } from "../../components/JsonInput/JsonInput";
import { ResultContextProvider } from "./context";
import { useMutableResult } from "../../components/hooks/useMutableResult";
import { Group, Badge } from "@mantine/core";

import "./ResultPage.css";
import { SUPPORTED_EXT } from "../../components/const";
import { AnyJsonObject } from "../../components/types";

const ResultPage = () => {
	const {
		staticSelectedData: {
			selected_expected_info,
			selected_actual_info,
			options,
		},
		useMuttableSelectedData,
	} = useMutableResult();

	const { useExpected, useActual } = useMuttableSelectedData;
	const [muttableExpectedData] = useExpected;
	const [muttableActualData] = useActual;

	const { type } = selected_actual_info ?? {};
	const { data: expected_data } = selected_expected_info ?? {};
	const { data: actual_data } = selected_actual_info ?? {};

	return (
		<div className="ResultPageContainer">
			<div className="LeftColumnLayout mx-4 mr-8">
				<div className="ResultContainer">
					<div className="GroupContainer">
						<Group position="left">
							<Badge color="green">Passed (6)</Badge>
							<span>1, 3, 4, 5, 9, 10</span>
						</Group>
						<Group position="left">
							<Badge color="yellow">Neutral (1)</Badge>
							<span>2</span>
						</Group>
						<Group position="left">
							<Badge color="red">Failed (3)</Badge>
							<span>6, 7, 8</span>
						</Group>
					</div>
				</div>
				<div className="NestedInput">
					{type === SUPPORTED_EXT.JSON && (
						<>
							<JsonInput
								id="JsonInput-Expected"
								useMuttableData={useExpected}
								initialValue={
									expected_data as
										| AnyJsonObject
										| undefined
								}
								className="mb-5"
								label="Expected JSON"
							/>
							<JsonInput
								id="JsonInput-Actual"
								useMuttableData={useActual}
								initialValue={
									actual_data as
										| AnyJsonObject
										| undefined
								}
								label="Actual JSON"
							/>
						</>
					)}
					{type === SUPPORTED_EXT.CSV && (
						<>
							<div>Expected - CSV INPUT HERE</div>
							<div>Actual - CSV INPUT HERE</div>
						</>
					)}
				</div>
			</div>
			<div className="h-screen">
				<JsonDiff
					expected={{
						csv:
							(muttableExpectedData as AnyJsonObject) ??
							(expected_data as AnyJsonObject),
					}}
					actual={{
						csv:
							(muttableActualData as AnyJsonObject) ??
							(actual_data as AnyJsonObject),
					}}
					options={options}
				/>
			</div>
		</div>
	);
};

export const ResultPageWithProvider = () => {
	return (
		<ResultContextProvider>
			<ResultPage />
		</ResultContextProvider>
	);
};
