import { useContext, useEffect, useState } from "react";
import { ResultPageContext } from "../../pages/ResultPage/context";
import { AnyJsonObject } from "../types";

export type UseMuttableData = [
	string | AnyJsonObject,
	React.Dispatch<React.SetStateAction<string | AnyJsonObject>>
];

export function useMutableResult() {
	const {
		states: { selectedIndex, expectedDataList, actualDataList },
	} = useContext(ResultPageContext);

	const selected_expected_info = expectedDataList[selectedIndex];
	const selected_actual_info = actualDataList[selectedIndex];
	console.log({ selected_expected_info, selected_actual_info });

	useEffect(() => {
		setExpected(selected_expected_info?.data);
		setActual(selected_actual_info?.data);
	}, [selectedIndex]);

	const useExpected = useState(selected_expected_info?.data);
	const useActual = useState(selected_actual_info?.data);
	const [_, setExpected] = useExpected;
	const [__, setActual] = useActual;

	const options = expectedDataList.map((_, index) => {
		return `Index ${index + 1}`;
	});

	return {
		staticSelectedData: {
			selected_expected_info,
			selected_actual_info,
			options,
		},
		useMuttableSelectedData: {
			useExpected,
			useActual,
		},
	};
}
