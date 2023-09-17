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
		"./testResults/expected"
	),
	actual_folder_path: window.path.join(
		window.appPath,
		"./testResults/actual"
	),
};
