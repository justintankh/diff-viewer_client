export enum SUPPORTED_EXT {
	JSON = ".json",
	CSV = ".csv",
}
export const SETTINGS_FILEPATH = window.path.join(
	window.appPath,
	"./app-settings.json"
);
export const DEFAULT_SETTINGS = {
	expected_folder_path: window.path.join(
		window.appPath,
		"./test_results/expected"
	),
	actual_folder_path: window.path.join(
		window.appPath,
		"./test_results/actual"
	),
	user_test_path: window.path.join(
		window.appPath,
		"./user_test_cases"
	),
};
export const EXECUTION_INSTRUCTION_FILE =
	"execution_instructions.json";
