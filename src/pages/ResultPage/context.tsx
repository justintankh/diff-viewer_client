import React, { useState, createContext, useEffect } from "react";
import { AnyJsonObject } from "../../components/types";
import {
	mockActualDataList,
	mockExpectedDataList,
} from "../../components/__tests__/mockData";
import {
	TestResultType,
	useReadResult,
} from "../../components/hooks/useReadResult";

export type ResultContextType = {
	states: {
		selectedIndex: number;
		expectedDataList: TestResultType[];
		actualDataList: TestResultType[];
	};
	methods: {
		setSelectedIndex: (value: number) => void;
	};
};

export const ResultPageContext = createContext<ResultContextType>(
	{} as any
);

export const ResultContextProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [expectedDataList, setExpectedDataList] = useState<
		TestResultType[]
	>([]);
	const [actualDataList, setActualDataList] = useState<
		TestResultType[]
	>([]);

	const { getMappedTestResults } = useReadResult();

	useEffect(() => {
		const { expected_data, actual_data } = getMappedTestResults();
		console.log({ expected_data, actual_data });
		setExpectedDataList(expected_data);
		setActualDataList(actual_data);
	}, []);

	const contextValues: ResultContextType = {
		states: {
			expectedDataList,
			actualDataList,
			selectedIndex,
		},
		methods: { setSelectedIndex },
	};

	return (
		<ResultPageContext.Provider value={contextValues}>
			{children}
		</ResultPageContext.Provider>
	);
};
