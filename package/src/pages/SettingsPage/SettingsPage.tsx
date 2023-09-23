import React from "react";
import { Group, Badge } from "@mantine/core";

import "./SettingsPage.css";
import { useRetrieveSettings } from "../../components/hooks/useRetrieveSettings";

export const SettingsPage = () => {
	const { actualFolderPath, expectedFolderPath } =
		useRetrieveSettings();

	console.table({ actualFolderPath, expectedFolderPath });
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
					<div>hello world</div>
					<div>hello world</div>
				</div>
			</div>
			<div className="h-screen">
				<div>hello world</div>
			</div>
		</div>
	);
};
