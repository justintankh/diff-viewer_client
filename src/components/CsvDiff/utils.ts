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
