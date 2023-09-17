import { useEffect } from "react";
import { useSettingsStore } from "./useSettingsStore";
import {
	findExclusive,
	findFilesInDirectories,
	findUnion,
	obtainResultInfo,
} from "./utils";
import { SUPPORTED_EXT } from "../const";
import { AnyJsonObject } from "../types";

export type TestResultType =
	| {
			type: SUPPORTED_EXT;
			data: AnyJsonObject;
	  }
	| {
			type: SUPPORTED_EXT;
			data: string;
	  };

export function useReadResult() {
	const {
		retrieveSettings,
		actual_folder_path,
		expected_folder_path,
	} = useSettingsStore();

	useEffect(() => {
		retrieveSettings();
	}, []);

	const test_results_directory = {
		expected: actual_folder_path,
		actual: expected_folder_path,
	};

	const getTestResults = () => {
		const expected_filenames = findFilesInDirectories(
			test_results_directory.expected,
			[SUPPORTED_EXT.CSV, SUPPORTED_EXT.JSON]
		);
		const actual_filenames = findFilesInDirectories(
			test_results_directory.actual,
			[SUPPORTED_EXT.CSV, SUPPORTED_EXT.JSON]
		);

		const union_filenames = findUnion(
			expected_filenames,
			actual_filenames
		);

		const exclusive_filenames = findExclusive(
			expected_filenames,
			actual_filenames
		);
		return {
			expected_filenames,
			actual_filenames,
			union_filenames,
			exclusive_filenames,
		};
	};

	const getMappedTestResults = (): {
		expected_data: TestResultType[];
		actual_data: TestResultType[];
	} => {
		retrieveSettings(); // refresh settings data
		const { union_filenames } = getTestResults();
		const { path } = window;

		const expected_data = union_filenames.map((file_name) => {
			const expected_file_path = path.join(
				test_results_directory.expected,
				file_name
			);
			return obtainResultInfo(expected_file_path);
		});

		const actual_data = union_filenames.map((file_name) => {
			const actual_file_path = path.join(
				test_results_directory.actual,
				file_name
			);
			return obtainResultInfo(actual_file_path);
		});

		return { expected_data, actual_data };
	};

	return { getMappedTestResults };
}
