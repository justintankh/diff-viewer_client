import React, { useEffect, useRef, useState } from "react";
import { Autocomplete } from "@mantine/core";
import {
	getDirectories,
	isPathFolder,
} from "../../components/hooks/utils";

export type AutocompleteInputProps = {
	label: string;
	placeholder?: string;
	className?: string;
};

export const AutocompleteInput = (props: AutocompleteInputProps) => {
	const autoCompleteRef = useRef<HTMLInputElement>(null);
	const [directorySel, setDirectionSel] = useState<string>("");
	const [autoCompleteData, setAutoCompleteData] = useState<
		string[]
	>([]);

	useEffect(() => {
		const path = "./" + directorySel;
		const isFolder = isPathFolder(path) && path.endsWith("/");

		if (isFolder) {
			const incomingDirectories = getDirectories(path);
			const nestAutoComplete = incomingDirectories.map(
				(dir) => directorySel + dir
			);
			setAutoCompleteData(nestAutoComplete);
		}
	}, [directorySel]);

	/* For dropdown table to show when clicked */
	useEffect(() => {
		// Prevents from focusing on first load
		if (directorySel === "") return;
		setTimeout(() => {
			autoCompleteRef.current && autoCompleteRef.current.blur();
		}, 5);
		setTimeout(() => {
			autoCompleteRef.current &&
				autoCompleteRef.current.focus();
		}, 10);
	}, [autoCompleteData]);

	return (
		<Autocomplete
			{...props}
			ref={autoCompleteRef}
			data={autoCompleteData}
			onChange={setDirectionSel}
			transitionProps={{
				transition: "pop-top-left",
				duration: 80,
				timingFunction: "ease",
			}}
			// maw={320}
			// mx="lg"
		/>
	);
};
