import { useState } from "react";
import { DEFAULT_SETTINGS, SETTINGS_FILEPATH } from "../const";

type Settings = typeof DEFAULT_SETTINGS;

export const useSettingsStore = () => {
	const { fs } = window;
	const [settings, setSettings] =
		useState<Settings>(DEFAULT_SETTINGS);

	function retrieveSettings() {
		const exists = fs.existsSync(SETTINGS_FILEPATH);
		// Retrieve JSON
		const data =
			exists &&
			JSON.parse(
				fs.readFileSync(SETTINGS_FILEPATH, {
					encoding: "utf8",
				})
			);
		/* Validate data */
		if (
			data &&
			data[Object.keys(DEFAULT_SETTINGS)[0]] &&
			data[Object.keys(DEFAULT_SETTINGS)[1]]
		) {
			setSettings(data);
			return;
		}
		/* Re-initialize if file not found */
		setSettings(DEFAULT_SETTINGS);
		fs.writeFileSync(
			SETTINGS_FILEPATH,
			JSON.stringify(DEFAULT_SETTINGS)
		);
	}

	function updateSettings(updatedValue: Partial<Settings>) {
		setSettings((prev) => {
			const newSettings = {
				...prev,
				...updatedValue,
			};
			console.log({ updatedValue, newSettings });
			fs.writeFileSync(
				SETTINGS_FILEPATH,
				JSON.stringify(newSettings)
			);
			console.log("written");
			return newSettings;
		});
	}

	return { ...settings, retrieveSettings, updateSettings };
};
