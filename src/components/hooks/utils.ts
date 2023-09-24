import { retrieveCsv, retrieveJson } from "../JsonInput/utils";
import { SUPPORTED_EXT } from "../const";
import { AnyJsonObject } from "../types";

const { fs, path } = window;

function findFilesInDirectories(source: string, extTypes: string[]) {
	const isExist = fs.existsSync(source);
	if (!isExist) {
		// fs.mkdirSync(source, { recursive: true });
		return [];
	}

	return fs
		.readdirSync(source, { withFileTypes: true })
		.filter((dirent) =>
			extTypes.some((ext) => dirent.name.endsWith(ext))
		)
		.map((dirent) => dirent.name);
}

function findExclusive(arr1: string[], arr2: string[]) {
	const result = arr1.filter((item) => !arr2.includes(item));
	return result;
}

function findUnion(arr1: string[], arr2: string[]) {
	const result = arr1.filter((item) => arr2.includes(item));
	return result;
}

function isPathFolder(path: string) {
	try {
		return fs.lstatSync(path).nlink > 1;
	} catch (error) {
		return false;
	}
}

function getDirectories(source: string) {
	source.endsWith("/") || (source += "/");
	return fs
		.readdirSync(source, { withFileTypes: true })
		.filter((dirent) => isPathFolder(source + dirent.name))
		.map((dirent) => dirent.name);
}

function obtainResultInfo(file_name: string) {
	const ext = path.extname(file_name) as SUPPORTED_EXT;

	switch (ext) {
		case SUPPORTED_EXT.JSON:
			return {
				type: SUPPORTED_EXT.JSON,
				data: retrieveJson(file_name),
			};
		case SUPPORTED_EXT.CSV:
			return {
				type: SUPPORTED_EXT.CSV,
				data: retrieveCsv(file_name),
			};
	}
}

function keysExistInObject(objA: AnyJsonObject, objB: AnyJsonObject) {
	return Object.keys(objA).every((key) => key in objB);
}

export {
	findFilesInDirectories,
	findExclusive,
	findUnion,
	isPathFolder,
	getDirectories,
	obtainResultInfo,
	keysExistInObject,
};
