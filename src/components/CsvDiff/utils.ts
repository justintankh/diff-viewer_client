export function parseCSV(csvString: string): string[][] {
	return csvString.split("\n").map((line) => line.split(","));
}

// Make sure both dimensions are the same
function resolveDimensions(expected: string[][], actual: string[][]) {
	// Resolve first dimension
	while (expected.length != actual.length) {
		if (expected.length < actual.length) {
			expected.push([""]);
		}
		if (expected.length > actual.length) {
			actual.push([""]);
		}
	}
	// Resolve nested dimension
	for (let i = 0; i < expected.length; i++) {
		while (expected[i].length != actual[i].length) {
			if (expected[i].length < actual[i].length) {
				expected[i].push("");
			}
			if (expected[i].length > actual[i].length) {
				actual[i].push("");
			}
		}
	}
}

// Double dimension diff
export function getCSVDiff(expected: string[][], actual: string[][]) {
	resolveDimensions(expected, actual);
	return expected.map((row, rowIndex) => {
		return row.map((_, colIndex) => {
			const expectedValue = expected[rowIndex][colIndex];
			const actualValue = actual[rowIndex][colIndex];
			if (expectedValue === actualValue) {
				return " ";
			}
			return `${expectedValue} != ${actualValue}`;
		});
	});
}

//var csv is the CSV file with headers
export function csvJSON(csv: string) {
	var lines = csv.split("\n");
	var result: {
		[key: string]: any;
	}[] = [];

	// NOTE: If your columns contain commas in their values, you'll need
	// to deal with those before doing the next step
	// (you might convert them to &&& or something, then covert them back later)
	// jsfiddle showing the issue https://jsfiddle.net/
	var headers = lines[0].split(",");

	for (var i = 1; i < lines.length; i++) {
		var obj: {
			[key: string]: any;
		} = {};
		var currentline = lines[i].split(",");

		for (var j = 0; j < headers.length; j++) {
			obj[headers[j]] = currentline[j];
		}
		result.push(obj);
	}
	//return result; //JavaScript object
	return JSON.stringify(result); //JSON
}
