import { AnyJsonObject } from "../types";

export function getResolvedInput(initialJsonValue?: AnyJsonObject) {
	if (initialJsonValue) {
		return JSON.stringify(initialJsonValue);
	}
	return undefined;
}
