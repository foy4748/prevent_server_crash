const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config()

const PORT = process.env.PORT || 5000;

// Basic AXIOS setup
// DOC: https://axios-http.com/docs/instance

const baseURL = `http://localhost:${PORT}`
const axiosClient = axios.create({
	baseURL,
	timeout: 1000,
	headers: {"content-type": "application/json"}
});

// Storage
const storage = {}

// GET all users
async function GetAllUsers() {
	const {data: foundUsers} = await axiosClient("/users");
	storage.response1 = foundUsers;
	return foundUsers;
}

async function GetAUser() {
	const response1UserId = storage.response1[0]._id;
	const {data: foundUser} = await axiosClient(`/user/${response1UserId}`);
	storage.response2 = foundUser;
	return foundUser;
}

// async function GetAUserDanger() {
// 	const response1UserId = null;
// 	const {data: foundUser} = await axiosClient(`/user/${response1UserId}`);
// 	storage.response3 = foundUser;
// 	return foundUser;
// }

async function runTest() {
	const res1 = await GetAllUsers();
	const res2 = await GetAUser();
	// const res3 = await GetAUserDanger();
	console.log("RESPONSE 1:\n", res1);
	console.log("RESPONSE 2:\n", res2);
	// console.log("RESPONSE 3:\n", res3);
}

runTest().catch(console.log)
