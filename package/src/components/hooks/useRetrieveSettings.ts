import { useEffect, useState } from "react";
import fs from "fs";

export const useRetrieveSettings = () => {
	const DEFAULT_SETTINGS_PATH = "./app-settings.json";

	const defaultSettings = {
		expectedFolderPath: "./testResults/expected",
		actualFolderPath: "./testResults/actual",
	};

	const [settings, setSettings] = useState(defaultSettings);

	async function checkIfFileExists(path: string) {
		const resp = await fetch(path);
		console.log(resp.ok, path);
		return resp.ok;
	}

	async function recursivelyFindFile(path: string) {
		const nestToFind = ["", ".", "./.", "../."];
		for (var i = 0; i < nestToFind.length; i++) {
			const file_path = nestToFind[i] + path;
			if (await checkIfFileExists(file_path)) {
				return file_path;
			}
		}
		return DEFAULT_SETTINGS_PATH;
	}

	async function retrieveSettings() {
		const file_path = await recursivelyFindFile(
			DEFAULT_SETTINGS_PATH
		);
		console.log(file_path);
		const resp = await fetch(file_path);
		const data = await resp.json();
		/* Validate data */
		if (
			data &&
			data["expectedFolderPath"] &&
			data["actualFolderPath"]
		) {
			setSettings(data);
		}
	}

	useEffect(() => {
		// Retrieve info on first render
		retrieveSettings();
	}, []);

	useEffect(() => {
		// Update settings file
	}, [settings]);

	return { ...settings };
};
