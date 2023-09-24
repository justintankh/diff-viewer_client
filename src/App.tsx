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
import { ExecutionPage } from "./pages/ExecutionPage/ExecutionPage";

function App() {
	return (
		<div className="flex flex-col h-screen">
			{window.Main && (
				<div className="flex-none">
					<AppBar />
					<Tabs keepMounted={true} defaultValue="execution">
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

						<Tabs.Panel value="execution">
							<ExecutionPage />
						</Tabs.Panel>

						<Tabs.Panel value="results">
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
