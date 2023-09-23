import React, { useContext } from "react";
import { NativeSelect, SimpleGrid } from "@mantine/core";
import { Text, Paper } from "@mantine/core";

import "./CsvDiff.css";
import { ResultPageContext } from "../../pages/ResultPage/context";
import { getCSVDiff, parseCSV } from "./utils";

type CsvDiffProps = {
	expected: string;
	actual: string;
};

export const CsvDiff = (props: CsvDiffProps) => {
	const { actual, expected } = props;

	console.log({ expected });
	const expected_csv_string = parseCSV(expected);
	const actual_csv_string = parseCSV(actual);

	const csv_diff = getCSVDiff(
		expected_csv_string,
		actual_csv_string
	);
	const maxColumns = Math.max(...csv_diff.map((row) => row.length));

	const flat_csv_values = csv_diff.reduce(
		(acc, curr) => acc.concat(curr),
		[]
	);

	const flat_csv_header_values = expected_csv_string[0];

	const flat_csv_diff_values = flat_csv_values.slice(
		csv_diff[0].length,
		flat_csv_values.length
	);

	return (
		<>
			<div className="w-full h-4/5 overflow-y-scroll scrollbar mt-[10vh]">
				<SimpleGrid cols={maxColumns} spacing={"xs"}>
					{flat_csv_header_values.map((value, index) => {
						console.log({ value });
						return (
							<Paper
								key={`header-${index}`}
								shadow="xl"
								p="xl">
								<Text
									size={"md"}
									weight={""}
									color="dimmed">
									{value}
								</Text>
							</Paper>
						);
					})}
					{csv_diff
						.reduce((acc, curr) => acc.concat(curr), [])
						.map((value, index) => {
							return (
								<Paper
									key={`rows-${index}`}
									shadow="xs"
									p="xl">
									<Text
										size={"md"}
										weight={"bold"}
										color="red">
										{value}
									</Text>
								</Paper>
							);
						})}
				</SimpleGrid>
			</div>
		</>
	);
};
