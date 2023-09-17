import React from "react";
import AppBar from "./AppBar";
import { Tabs } from "@mantine/core";
import {
	IconPhoto,
	IconMessageCircle,
	IconSettings,
} from "@tabler/icons-react";
import { ResultPageWithProvider } from "./pages/ResultPage/ResultPage";
import { SettingsPage } from "./pages/SettingsPage/SettingsPage";

function App() {
	return (
		<div className="flex flex-col h-screen">
			{window.Main && (
				<div className="flex-none">
					<AppBar />
					<Tabs keepMounted={false} defaultValue="results">
						<Tabs.List>
							<Tabs.Tab
								value="execution"
								icon={<IconPhoto size="0.8rem" />}>
								Execution
							</Tabs.Tab>
							<Tabs.Tab
								value="results"
								icon={
									<IconMessageCircle size="0.8rem" />
								}>
								Results
							</Tabs.Tab>
							<Tabs.Tab
								value="settings"
								icon={<IconSettings size="0.8rem" />}>
								Settings
							</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel value="gallery" pt="xs">
							Gallery tab content
						</Tabs.Panel>

						<Tabs.Panel value="results" pt="xs">
							<ResultPageWithProvider />
						</Tabs.Panel>

						<Tabs.Panel value="settings" pt="xs">
							<SettingsPage />
						</Tabs.Panel>
					</Tabs>
				</div>
			)}
		</div>
	);
}

export default App;
