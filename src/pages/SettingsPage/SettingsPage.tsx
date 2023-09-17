import React, { useEffect } from "react";

import {
	FileInput,
	rem,
	HoverCard,
	Button,
	Text,
	Group,
} from "@mantine/core";
import { IconFolderBolt } from "@tabler/icons-react";

import { useSettingsStore } from "../../components/hooks/useSettingsStore";
import { constructFileInput, getFileParams } from "./utils";

import "./SettingsPage.css";
import { AutocompleteInput } from "./AutocompleteInput";
import { DEFAULT_SETTINGS } from "../../components/const";

export const SettingsPage = () => {
	const {
		actual_folder_path,
		expected_folder_path,
		retrieveSettings,
		updateSettings,
	} = useSettingsStore();

	useEffect(() => {
		// Retrieve info on first render
		retrieveSettings();
	}, []);

	console.log({
		actual_folder_path,
		expected_folder_path,
	});
	return (
		<div className="SettingPageContainer">
			<div className="LeftColumnLayout mx-4 mr-8">
				<div className="AutocompleteContainer">
					<AutocompleteInput
						label="Auto complete folder"
						placeholder="todo: add default path"
					/>
					{/* <Group position="center">
						<HoverCard width={280} shadow="md">
							<HoverCard.Target>
								<Button variant="filled">
									Hover to reveal the card
								</Button>
							</HoverCard.Target>
							<HoverCard.Dropdown>
								<Text size="sm">
									Hover card is revealed when user
									hovers over target element, it
									will be hidden once mouse is not
									over both target and dropdown
									elements
								</Text>
							</HoverCard.Dropdown>
						</HoverCard>
					</Group> */}
				</div>
				<div className="NestedInput">
					<FileInput
						placeholder="defaults to './testResults/expected'"
						label="Expected Folder"
						icon={<IconFolderBolt size={16} />}
						clearable
						withAsterisk
						value={constructFileInput(
							expected_folder_path
						)}
						onChange={(file) => {
							/* If clear is selected */
							if (!file) {
								updateSettings({
									expected_folder_path:
										DEFAULT_SETTINGS.expected_folder_path,
								});
								return;
							}

							const { folderPath } =
								getFileParams(file);

							/* If valid file selected */
							if (folderPath) {
								updateSettings({
									expected_folder_path: folderPath,
								});
							}
						}}
						fileInputProps={{
							/* @ts-expect-error */
							directory: "",
							webkitdirectory: "",
						}}
					/>
					<FileInput
						placeholder="defaults to './testResults/actual'"
						label="Actual Folder"
						icon={<IconFolderBolt size={16} />}
						withAsterisk
						value={constructFileInput(actual_folder_path)}
						onChange={(file) => {
							console.log({ file });

							const { fileToShow, folderPath } =
								getFileParams(file);

							if (fileToShow && folderPath) {
								updateSettings({
									actual_folder_path: folderPath,
								});
							}
						}}
						fileInputProps={{
							/* @ts-expect-error */
							directory: "",
							webkitdirectory: "",
						}}
					/>
				</div>
			</div>
		</div>
	);
};
