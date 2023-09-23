import React, { useContext } from "react";
import { JsonDiff } from "../../components/JsonDiff/JsonDiff";
import { JsonInput } from "../../components/JsonInput/JsonInput";
import { ResultContextProvider, ResultPageContext } from "./context";
import { useMutableResult } from "../../components/hooks/useMutableResult";
import { Group, Badge, NativeSelect } from "@mantine/core";

import "./ResultPage.css";
import { SUPPORTED_EXT } from "../../components/const";
import { AnyJsonObject } from "../../components/types";
import { CsvDiff } from "../../components/CsvDiff/CsvDiff";

const ResultPage = () => {
	const {
		methods: { setSelectedIndex },
	} = useContext(ResultPageContext);

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
							<JsonInput
								id="JsonInput-Expected"
								useMuttableData={useExpected}
								formatOnBlur={false}
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
								formatOnBlur={false}
								initialValue={
									actual_data as
										| AnyJsonObject
										| undefined
								}
								label="Actual JSON"
							/>
						</>
					)}
				</div>
			</div>
			<div className="h-screen">
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

				{type === SUPPORTED_EXT.JSON && (
					<JsonDiff
						expected={
							(muttableExpectedData as AnyJsonObject) ??
							(expected_data as AnyJsonObject)
						}
						actual={
							(muttableActualData as AnyJsonObject) ??
							(actual_data as AnyJsonObject)
						}
					/>
				)}
				{type === SUPPORTED_EXT.CSV && (
					<CsvDiff
						expected={
							(muttableExpectedData ??
								expected_data) as string
						}
						actual={
							(muttableActualData ??
								actual_data) as string
						}
					/>
				)}
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
