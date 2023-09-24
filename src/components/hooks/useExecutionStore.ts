import { useEffect, useMemo, useState } from "react";
import { getDirectories } from "./utils";
import { AnyJsonObject } from "../types";
import { retrieveJson } from "../JsonInput/utils";
import { EXECUTION_INSTRUCTION_FILE } from "../const";

type ExecutionStoreProps = {
	user_test_path: string;
};

type Instruction = {
	test_name: string;
	data: CommandInstruction;
};

interface CommandInstruction {
	commands: Command[];
}

interface Command {
	compare_against: string;
	type: string;
	use_service: string;
	request: Request;
}

interface Request {
	url: string;
	method: string;
	headers: Headers;
	json: string;
}

interface Headers {
	"Content-Type": string;
}

export const useExecutionStore = ({
	user_test_path,
}: ExecutionStoreProps) => {
	/* Values */
	const user_test_options = useMemo(
		() => getDirectories(user_test_path),
		[user_test_path]
	);

	/* States */
	const [selected_user_test_case, set_selected_user_test_case] =
		useState<string>("");
	const [instructionList, setInstructionList] = useState<
		Instruction[]
	>([]);

	useEffect(() => {
		/* Clear available instructions if empty */
		if (!selected_user_test_case) {
			setInstructionList([]);
			return;
		}
		/* When a user test is selected, populate with the instructions found */
		const list_of_dir = getDirectories(
			user_test_path + "/" + selected_user_test_case
		);

		/* Find execution_instructions */
		const loaded_ei = list_of_dir
			.map((dir_name) =>
				window.path.join(
					user_test_path,
					selected_user_test_case,
					dir_name,
					EXECUTION_INSTRUCTION_FILE
				)
			)
			.map((dir, idx) => {
				const isExist = window.fs.existsSync(dir);
				return isExist
					? {
							test_name: list_of_dir[idx],
							data: retrieveJson(dir),
					  }
					: undefined;
			})
			.filter((dir) => dir !== undefined);

		console.log(loaded_ei);
		/* Store available instructions */
		setInstructionList(loaded_ei as Instruction[]);
	}, [selected_user_test_case]);

	/* Functions */
	function getUserTestOptions() {
		const SELECT_FOLDER_PLACEHOLDER =
			"- Select a User Test Case -";

		if (!selected_user_test_case) {
			return [SELECT_FOLDER_PLACEHOLDER, ...user_test_options];
		}
		return user_test_options;
	}

	return {
		getUserTestOptions,
		selected_user_test_case,
		set_selected_user_test_case,
		instructionList,
	};
};
