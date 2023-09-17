export function getFileParams(file: File | null) {
	if (!file || !file.path) {
		return {
			fileToShow: null,
			folderPath: null,
		};
	}

	const { path } = file;
	const nestedFoldersList = path.split("/");
	const pathLength = nestedFoldersList.length;
	const previousFolder = nestedFoldersList[pathLength - 3] ?? "";
	const selectedFolder = nestedFoldersList[pathLength - 2];

	const selectedPathResolved =
		".../" + previousFolder + "/" + selectedFolder;

	const fileToShow = {
		...file,
		name: selectedPathResolved,
	} as File;

	nestedFoldersList.pop();
	const folderPath = nestedFoldersList.join("/");

	return {
		fileToShow,
		folderPath,
	};
}

export function constructFileInput(path?: string): File {
	return {
		name: path,
	} as File;
}
