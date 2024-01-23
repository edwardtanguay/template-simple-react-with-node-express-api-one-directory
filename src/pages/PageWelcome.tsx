/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = "http://localhost:4882";

interface IEmpHireItem {
	fullName: string;
	hireDate: string;
}

export const PageWelcome = () => {
	const [appMessage, setAppMessage] = useState("");
	const [appName, setAppName] = useState("");
	const [nodeVersion, setNodeVersion] = useState("");
	const [numberOfFiles, setNumberOfFiles] = useState(0);
	const [empHireItems, setEmpHireItems] = useState<IEmpHireItem[]>([]);

	const fetchAppName = async () => {
		try {
			const response = await axios.get(backendUrl);
			console.log("STATUS: " + response.status);
			setAppName(response.data.appName);
		} catch (e: any) {
			console.log(`ERROR: ${e.message}`);
			setAppMessage(
				`Sorry, we can't retrieve your data at this time. Try again later.`
			);
		}
	};

	useEffect(() => {
		fetchAppName();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/node-version`);
			setNodeVersion(response.data);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/number-of-files`);
			setNumberOfFiles(response.data);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await axios.get(
				`${backendUrl}/employee-hire-dates`
			);
			setEmpHireItems(response.data);
		})();
	}, []);

	return (
		<>
			<h2 className="text-red-600">{appMessage}</h2>
			{appMessage === "" && (
				<>
					<p>APP NAME: {appName}</p>
					<p>NODE-VERSION: {nodeVersion}</p>
					<p>NUMBER OF FILES: {numberOfFiles}</p>
					<p>
						EMPLOYEE HIRE DATES:
						<ul className="list-disc ml-6">
							{empHireItems.map((empHireItem, index) => {
								return (
									<li key={index}>
										{empHireItem.fullName} -{" "}
										{empHireItem.hireDate}
									</li>
								);
							})}
						</ul>
					</p>
				</>
			)}
		</>
	);
};
