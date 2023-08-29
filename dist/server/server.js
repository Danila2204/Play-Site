import express from "express";
import * as mongoDB from "mongodb";
import path from "path";

const URL = "mongodb+srv://pogranichnikDustFell:Danila123@playsite.bnorhem.mongodb.net/Games?retryWrites=true&w=majority";
const PORT = 3001;

const viewsDirectory = "../";

const createPath = filePath => path.resolve("./", "../", `${filePath}.ejs`);

const games = {};
const types = [];
const messages = {};

const app = express();
const mongoClient = new mongoDB.MongoClient(URL);
const connect = async () => {
	try {
		await mongoClient.connect();

		const gamesDB = mongoClient.db("Games");
		const gamesCollection = gamesDB.collection("games");
		const typesCollection = gamesDB.collection("types");

		const nameGames = gamesCollection.find({});
		const typesGames = typesCollection.find({});
		let id = 0;
		let typesIndex = 0;

		for await (let typeGame of typesGames) {
			for await (let type of typeGame.types) {
				types.push(type);
				games[type] = {};
			}
		}


		for await (let nameGame of nameGames) {
			if (nameGame.type === types[typesIndex]) {
				games[nameGame.type][`game_${id}`] = {};
				games[nameGame.type][`game_${id}`]["name"] = nameGame.name;
				games[nameGame.type][`game_${id}`]["type"] = nameGame.type;
				games[nameGame.type][`game_${id}`]["url"] = nameGame.url;
				games[nameGame.type][`game_${id}`]["image-url"] = nameGame["image-url"];
			}
			id++;
			typesIndex++;
		}


	} catch (error) {
		console.log(error);
	}
}


connect().then(() => {
	app.use(express.static(path.resolve("./", "../")));
	app.get("/", (request, response) => {
		response.render(createPath("index"), {
			types: types
		})
	})

	for (let i = 0; i < types.length; i++) {
		app.get(`/${types[i]}`, (request, response) => {
			response.render(createPath("games"), {
				title: types[i],
				gameType: games[types[i]]
			})
		})
	}

	app.use((request, response) => {
		response
			.status(404)
			.render(createPath("error"))
	})
})

app.set("view engine", "ejs");
app.set("views", viewsDirectory);

console.log(`viewsDirectory - ${viewsDirectory}, index - ${createPath("index")}`);

app.get("/help", (request, response) => {
    response.render(createPath("help"));
})

app.get("/form", (request, response) => {
    response.render(createPath("form"));
})

app.get("/about", (request, response) => {
    response.render(createPath("about"));
})

app.listen(PORT, error => {
    if (error) console.log("Error -", error);
})