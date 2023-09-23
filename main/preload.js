"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const api = {
    /**
     * Here you can expose functions to the renderer process
     * so they can interact with the main (electron) side
     * without security problems.
     *
     * The function below can accessed using `window.Main.sayHello`
     */
    sendMessage: (message) => {
        electron_1.ipcRenderer.send("message", message);
    },
    /**
    Here function for AppBar
   */
    Minimize: () => {
        electron_1.ipcRenderer.send("minimize");
    },
    Maximize: () => {
        electron_1.ipcRenderer.send("maximize");
    },
    Close: () => {
        electron_1.ipcRenderer.send("close");
    },
    /**
     * Provide an easier way to listen to events
     */
    on: (channel, callback) => {
        electron_1.ipcRenderer.on(channel, (_, data) => callback(data));
    },
};
electron_1.contextBridge.exposeInMainWorld("Main", api);
/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 */
electron_1.contextBridge.exposeInMainWorld("ipcRenderer", electron_1.ipcRenderer);
/**
 * Pre-load require
 */
electron_1.contextBridge.exposeInMainWorld("require", require);
electron_1.contextBridge.exposeInMainWorld("fs", fs_1.default);
electron_1.contextBridge.exposeInMainWorld("path", path_1.default);
electron_1.contextBridge.exposeInMainWorld("appPath", getAppDataPath());
function getAppDataPath() {
    switch (process.platform) {
        case "darwin": {
            return path_1.default.join(process.env["HOME"], "Library", "Application Support", "regression-test-app");
        }
        case "win32": {
            return path_1.default.join(process.env.APPDATA, "regression-test-app");
        }
        case "linux": {
            return path_1.default.join(process.env["HOME"], "regression-test-app");
        }
        default: {
            console.log("Unsupported platform!");
            process.exit(1);
        }
    }
}
console.log("ran preload.ts");
