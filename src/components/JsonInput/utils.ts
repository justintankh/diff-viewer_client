import { AnyJsonObject } from "../types";

export function getResolvedInput(initialJsonValue?: AnyJsonObject) {
	if (initialJsonValue) {
		return JSON.stringify(initialJsonValue);
	}
	return undefined;
}

export function retrieveJson(pathFile: string): AnyJsonObject {
	console.log({ pathFile });
	const expectedJson = window.fs.readFileSync(pathFile, {
		encoding: "utf8",
	});
	return JSON.parse(expectedJson);
}

export function retrieveCsv(pathFile: string): string {
	return window.fs.readFileSync(pathFile, {
		encoding: "utf8",
	});
}
