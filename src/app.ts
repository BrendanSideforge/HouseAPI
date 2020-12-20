
import * as express from "express";
import * as database from "./database";
import * as addHouse from "./routes/addHouse";
import * as getUser from "./routes/getUser"
import * as removeHouse from "./routes/removeHouse";
import * as addHousePoints from './routes/addHousePoints';
import * as getHouse from "./routes/getHouse";
import * as removeHousePoints from './routes/removeHousePoints';
import * as addUserPoints from './routes/addUserPoints';
import * as removeUserPoints from './routes/removeUserPoints';
import * as getHousePoints from './routes/getHousePoints';
import * as getUserPoints from './routes/getUserPoints';
import * as getLeaderboard from './routes/leaderboard';
import * as getHouseMembers from './routes/getHouseMembers';
import * as setUserPoints from './routes/setUserPoints';
import * as setHousePoints from './routes/setHousePoints';
import * as createHouse from './routes/createHouse';
import * as deleteHouse from './routes/deleteHouse';
import * as Authorization from './routes/authorization';
import * as CheckID from "./routes/checkid";
import * as FetchMember from "./routes/fetchMember";
import * as fetchHouses from './routes/fetchHouses';

const app: express.Application = express();
const port: number = 3000;

app.use(express.json());
app.use(Authorization.middleware);
app.use('/add_house', addHouse);
app.use('/get_user', getUser);
app.use('/remove_house', removeHouse);
app.use('/add_house_points', addHousePoints);
app.use('/remove_house_points', removeHousePoints);
app.use('/get_house', getHouse);
app.use('/add_user_points', addUserPoints);
app.use('/remove_user_points', removeUserPoints);
app.use('/get_house_points', getHousePoints);
app.use('/get_user_points', getUserPoints);
app.use('/leaderboard', getLeaderboard);
app.use('/house_members', getHouseMembers);
app.use('/set_user_points', setUserPoints);
app.use('/set_house_points', setHousePoints);
app.use('/create_house', createHouse);
app.use('/delete_house', deleteHouse);
app.use('/check_id', CheckID);
app.use('/fetch_user', FetchMember);
app.use('/fetch_houses', fetchHouses);

app.listen(port, '144.172.75.88', async () => {
    console.log(`Server is now listening at: http://144.172.75.88:${port}`);
    await database.createTables();
})