import React, { useState } from "react";
import { IconGhost } from "@tabler/icons-react";
function AppBar() {
	const [isMaximize, setMaximize] = useState(false);

	const handleToggle = () => {
		if (isMaximize) {
			setMaximize(false);
		} else {
			setMaximize(true);
		}
		window.Main.Maximize();
	};

	return (
		<>
			<div className="py-0.5 flex justify-between draggable top-0">
				<div className="inline-flex">
					<IconGhost className="h-6 mx-2" />
					<p className="text-xs md:pt-1 md:-ml-1 lg:-ml-1">
						Regression Test
					</p>
				</div>
				<div className="inline-flex -mt-1">
					<button
						onClick={window.Main.Minimize}
						className="undraggable md:px-4 lg:px-3 pt-1 hover:bg-gray-300">
						&#8211;
					</button>
					<button
						onClick={handleToggle}
						className="undraggable px-6 lg:px-5 pt-1 hover:bg-gray-300">
						{isMaximize ? "\u2752" : "⃞"}
					</button>
					<button
						onClick={window.Main.Close}
						className="undraggable px-4 pt-1 hover:bg-red-500 hover:text-white">
						&#10005;
					</button>
				</div>
			</div>
			{/* <div className="text-black undraggable">
				<div className="flex text-center">
					<div className="text-sm w-8  hover:bg-gray-300">
						File
					</div>
					<div className="text-sm w-8   hover:bg-gray-300">
						Edit
					</div>
					<div className="text-sm w-10  hover:bg-gray-300">
						View
					</div>
					<div className="text-sm w-14  hover:bg-gray-300 ">
						Window
					</div>
					<div className="text-sm w-9  hover:bg-gray-300 ">
						Help
					</div>
				</div>
			</div> */}
		</>
	);
}

export default AppBar;
