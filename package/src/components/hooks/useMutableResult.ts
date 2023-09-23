import { useContext, useState } from "react";
import { ResultPageContext } from "../../pages/ResultPage/context";
import { AnyJsonObject } from "../types";

export type UseMuttableData = [
	AnyJsonObject,
	React.Dispatch<React.SetStateAction<AnyJsonObject>>
];

export function useMutableResult() {
	const {
		states: { selectedIndex, expectedDataList, actualDataList },
	} = useContext(ResultPageContext);

	const selectedExpectedData = expectedDataList[selectedIndex];
	const selectedActualData = actualDataList[selectedIndex];

	const useExpected = useState(selectedExpectedData);
	const useActual = useState(selectedActualData);

	const options = expectedDataList.map((_, index) => {
		return `Index ${index + 1}`;
	});

	return {
		staticSelectedData: {
			selectedExpectedData,
			selectedActualData,
			options,
		},
		useMuttableSelectedData: {
			useExpected,
			useActual,
		},
	};
}
