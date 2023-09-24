import { ipcRenderer, contextBridge } from "electron";
import fs from "fs";
import path from "path";
declare global {
	interface Window {
		Main: typeof api;
		ipcRenderer: typeof ipcRenderer;
		require: typeof require;
		fs: typeof fs;
		path: typeof path;
		appPath: string;
	}
}

const api = {
	/**
	 * Here you can expose functions to the renderer process
	 * so they can interact with the main (electron) side
	 * without security problems.
	 *
	 * The function below can accessed using `window.Main.sayHello`
	 */
	sendMessage: (message: string) => {
		ipcRenderer.send("message", message);
	},
	/**
    Here function for AppBar
   */
	Minimize: () => {
		ipcRenderer.send("minimize");
	},
	Maximize: () => {
		ipcRenderer.send("maximize");
	},
	Close: () => {
		ipcRenderer.send("close");
	},
	/**
	 * Provide an easier way to listen to events
	 */
	on: (channel: string, callback: (data: any) => void) => {
		ipcRenderer.on(channel, (_, data) => callback(data));
	},
};
contextBridge.exposeInMainWorld("Main", api);
/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 */
contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);

/**
 * Pre-load require
 */
contextBridge.exposeInMainWorld("require", require);
contextBridge.exposeInMainWorld("fs", fs);
contextBridge.exposeInMainWorld("path", path);
contextBridge.exposeInMainWorld("appPath", getAppDataPath());

function getAppDataPath() {
	switch (process.platform) {
		case "darwin": {
			return path.join(
				process.env["HOME"]!,
				"Library",
				"Application Support",
				"regression-test-app"
			);
		}
		case "win32": {
			return path.join(
				process.env.APPDATA!,
				"regression-test-app"
			);
		}
		case "linux": {
			return path.join(
				process.env["HOME"]!,
				"regression-test-app"
			);
		}
		default: {
			console.log("Unsupported platform!");
			process.exit(1);
		}
	}
}

console.log("ran preload.ts");
