const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {MongoClient, ServerApiVersion} = require("mongodb");
const {ObjectId} = require("mongodb");

dotenv.config()
const PORT = process.env.PORT || 5000;

// Accessing Secrets
const {MONGO_URI, DB_NAME} = process.env;

const app = express();

app.use(cors())
app.use(express.json())

const client = new MongoClient(MONGO_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
}
);
async function run() {

	// Collections
	const usersCollection = client.db(DB_NAME).collection("users");

	try {
		// GET all users
		app.get("/users", async (_, res) => {
			const foundUsers = await usersCollection.find({}).toArray();
			return res.send(foundUsers);
		})

		// GET a particular users
		app.get("/user/:id", async (req, res) => {
			const {id} = req.params;
			const query = {_id: new ObjectId(id)}
			const foundUser = await usersCollection.findOne(query);
			return res.send(foundUser);

		})

	} catch (error) {
		console.log(error)
	}

}

app.get("/", (_req, res) => {
	res.send({
		message: "Server is UP and RUNNING",
		paths: [
			{
				method: "GET",
				paths: ["/users", "/user/:id"]
			}
		]
	})
})

run().catch(console.log);

app.listen(PORT, () => {console.log(`SERVER is UP and RUNNING at PORT: ${PORT}`)})


