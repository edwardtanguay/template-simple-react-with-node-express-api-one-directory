import express from 'express';
import * as config from '../config';
import cors from 'cors';
import * as tools from '../tools';
import axios from 'axios';

interface IEmpHireItem {
	fullName: string;
	hireDate: string;
}

const app = express();
app.use(cors());
const port = 4882;

app.get('/', (_req, res) => {
	res.status(203);
	res.json({
		appName: config.getAppName()
	});
});

app.get('/node-version', (_, res) => {
	res.json(process.version);
});

app.get('/number-of-files', (_, res) => {
	const files = tools.getAllFilesInDirectory(process.cwd());
	res.json(files.length);
});

app.get('/employee-hire-dates', (req, res) => {
	(async () => {
		const response = await axios.get('https://edwardtanguay.vercel.app/share/employees.json');
		const empHireItems: IEmpHireItem[] = [];
		const employees = response.data;
		for (const employee of employees) {
			empHireItems.push({
				fullName: `${employee.firstName} ${employee.lastName}`,
				hireDate: employee.hireDate.substring(0, 10)
			});
		}
		res.json(empHireItems);
	})();
});

app.listen(port, () => {
	console.log(`server is running at http://localhost:${port}`);
});