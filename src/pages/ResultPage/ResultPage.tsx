import React from "react";
import { JsonDiff } from "../../components/JsonDiff/JsonDiff";
import { JsonInput } from "../../components/JsonInput/JsonInput";
import { ResultContextProvider } from "./context";
import { useMutableResult } from "./useMutableResult";
import { Group, Badge } from "@mantine/core";
import "./ResultPage.css";

const ResultPage = () => {
	const {
		staticSelectedData: {
			selectedExpectedData,
			selectedActualData,
			options,
		},
		useMuttableSelectedData,
	} = useMutableResult();

	const { useExpected, useActual } = useMuttableSelectedData;
	const [muttableExpectedData] = useExpected;
	const [muttableActualData] = useActual;

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
					<JsonInput
						id="JsonInput-Expected"
						useMuttableData={useExpected}
						initialValue={selectedExpectedData}
						className="mb-5"
						label="Expected JSON"
					/>
					<JsonInput
						id="JsonInput-Actual"
						useMuttableData={useActual}
						initialValue={selectedActualData}
						label="Actual JSON"
					/>
				</div>
			</div>
			<div className="h-screen">
				<JsonDiff
					expected={
						muttableExpectedData ?? selectedExpectedData
					}
					actual={muttableActualData ?? selectedActualData}
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
