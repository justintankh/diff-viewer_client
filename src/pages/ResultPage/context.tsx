import React, { useState, createContext, useEffect } from "react";
import { AnyJsonObject } from "../../components/types";
import {
	mockActualDataList,
	mockExpectedDataList,
} from "../../components/__tests__/mockData";

export type ResultContextType = {
	states: {
		selectedIndex: number;
		expectedDataList: AnyJsonObject[];
		actualDataList: AnyJsonObject[];
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
		AnyJsonObject[]
	>([]);
	const [actualDataList, setActualDataList] = useState<
		AnyJsonObject[]
	>([]);

	useEffect(() => {
		setExpectedDataList(mockExpectedDataList);
		setActualDataList(mockActualDataList);
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
