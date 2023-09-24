import React, { useEffect } from "react";
import { useSettingsStore } from "../../components/hooks/useSettingsStore";
import { useExecutionStore } from "../../components/hooks/useExecutionStore";

import {
	Accordion,
	NativeSelect,
	Button,
	Card,
	Group,
	Text,
	Menu,
	ActionIcon,
	rem,
	SimpleGrid,
} from "@mantine/core";
import {
	IconDots,
	IconEdit,
	IconEye,
	IconFileZip,
	IconTrash,
} from "@tabler/icons-react";
import "./ExecutionPage.css";
import { JsonInput } from "../../components/JsonInput/JsonInput";

export const ExecutionPage = () => {
	const { user_test_path, retrieveSettings, updateSettings } =
		useSettingsStore();

	useEffect(() => {
		// Retrieve info on first render
		retrieveSettings();
	}, []);

	const {
		getUserTestOptions,
		selected_user_test_case,
		set_selected_user_test_case,
		instructionList,
	} = useExecutionStore({ user_test_path });

	console.log({ instructionList });

	return (
		<>
			<div className="TopBar">
				<NativeSelect
					onChange={(event) => {
						set_selected_user_test_case(
							event.currentTarget.value
						);
					}}
					value={selected_user_test_case}
					data={getUserTestOptions()}
				/>
				<Button variant="filled" color="yellow">
					Run
				</Button>
			</div>
			<div className="TestContainer">
				{instructionList.map((instruction) => {
					const accordion_items =
						instruction.data.commands.map((cmd, idx) => (
							<Accordion.Item
								key={`${instruction.test_name}_accordion_item_${idx}`}
								value={`${instruction.test_name}_accordion_item_${idx}`}>
								<Accordion.Control
									icon={cmd.type}
									disabled={false}>
									{`${cmd.request.url}`}
								</Accordion.Control>
								<Accordion.Panel>
									<Card
										shadow="sm"
										radius={"md"}
										component="a"
										target="_blank"
										mb={"lg"}>
										<Text
											fw={500}
											size="lg"
											mb={"xs"}>
											Request
										</Text>
										<SimpleGrid cols={3}>
											<div>
												<Text
													fw={300}
													size="md">
													Method
												</Text>
												<Text
													c="dimmed"
													size="sm">
													{
														cmd.request
															.method
													}
												</Text>
											</div>
											<div>
												<Text
													fw={300}
													size="md">
													URL
												</Text>
												<Text
													c="dimmed"
													size="sm">
													{cmd.request.url}
												</Text>
											</div>
											<div>
												<Text
													fw={300}
													size="md">
													Body
												</Text>
												<Text
													c="dimmed"
													size="sm">
													{cmd.request.json}
												</Text>
											</div>
										</SimpleGrid>
									</Card>
									<Card
										shadow="sm"
										radius={"md"}
										component="a"
										target="_blank"
										mb={"lg"}>
										<Text
											fw={500}
											size="lg"
											mb={"xs"}>
											Test Info
										</Text>
										<SimpleGrid cols={3}>
											<div>
												<Text
													fw={300}
													size="md">
													Service
												</Text>
												<Text
													c="dimmed"
													size="sm">
													{cmd.use_service}
												</Text>
											</div>
											<div>
												<Text
													fw={300}
													size="md">
													Sequence
												</Text>
												<Text
													c="dimmed"
													size="sm">
													{idx + 1}
												</Text>
											</div>
											<div>
												<Text
													fw={300}
													size="md">
													Compare Against
												</Text>
												<Text
													c="dimmed"
													size="sm">
													{
														cmd.compare_against
													}
												</Text>
											</div>
										</SimpleGrid>
									</Card>
									<JsonInput
										id="JsonInput-Actual"
										initialValue={cmd}
									/>
								</Accordion.Panel>
							</Accordion.Item>
						));

					return (
						<Card
							withBorder
							shadow="sm"
							radius="md"
							mb={"md"}
							key={instruction.test_name}>
							<Card.Section
								withBorder
								inheritPadding
								py="xs">
								<Group position="apart">
									<Text fw={500}>
										{instruction.test_name}
									</Text>
									<Menu
										withinPortal
										position="bottom-end"
										shadow="sm">
										<Menu.Target>
											<ActionIcon
												variant="subtle"
												color="gray">
												<IconDots
													style={{
														width: rem(
															16
														),
														height: rem(
															16
														),
													}}
												/>
											</ActionIcon>
										</Menu.Target>

										<Menu.Dropdown>
											<Menu.Item>
												<Group>
													<IconEdit
														style={{
															width: rem(
																14
															),
															height: rem(
																14
															),
														}}
													/>
													<div>
														Edit test case
													</div>
												</Group>
											</Menu.Item>
											<Menu.Item>
												<Group>
													<IconEye
														style={{
															width: rem(
																14
															),
															height: rem(
																14
															),
														}}
													/>
													<div>
														Preview all
													</div>
												</Group>
											</Menu.Item>
											<Menu.Item color="red">
												<Group>
													<IconTrash
														style={{
															width: rem(
																14
															),
															height: rem(
																14
															),
														}}
													/>
													<div>
														Delete all
													</div>
												</Group>
											</Menu.Item>
										</Menu.Dropdown>
									</Menu>
								</Group>
							</Card.Section>

							<Text mt="sm" c="dimmed" size="sm">
								<Text
									span
									inherit
									c="var(--mantine-color-anchor)">
									{`${instruction.data.commands.length} command(s)`}
								</Text>{" "}
							</Text>

							<Card.Section
								inheritPadding
								mt="sm"
								pb="md">
								<>
									<Accordion
										chevronPosition="right"
										variant="contained">
										{accordion_items}
									</Accordion>
								</>
							</Card.Section>
						</Card>
					);
				})}
			</div>
		</>
	);
};
