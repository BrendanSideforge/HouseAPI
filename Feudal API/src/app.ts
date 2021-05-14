
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
import * as fetchHouse from './routes/fetchHouse';
import * as deleteUser from './routes/deleteUser';
import * as changeHouse from './routes/changeHouse';
import * as allMembers from "./routes/fetchAllUsers";

const app: express.Application = express();
const port: number = 3000;

app.use(express.json());
app.use(Authorization.middleware);
app.use('/api/v1/add_house', addHouse);
app.use('/api/v1/get_user', getUser);
// app.use('/remove_house', removeHouse);
app.use('/api/v1/add_house_points', addHousePoints);
app.use('/api/v1/remove_house_points', removeHousePoints);
app.use('/api/v1/get_house', getHouse);
app.use('/api/v1/add_user_points', addUserPoints);
app.use('/api/v1/remove_user_points', removeUserPoints);
app.use('/api/v1/get_house_points', getHousePoints);
app.use('/api/v1/get_user_points', getUserPoints);
app.use('/api/v1/leaderboard', getLeaderboard);
app.use('/api/v1/house_members', getHouseMembers);
app.use('/api/v1/set_user_points', setUserPoints);
app.use('/api/v1/set_house_points', setHousePoints);
app.use('/api/v1/create_house', createHouse);
app.use('/api/v1/delete_house', deleteHouse);
app.use('/api/v1/check_id', CheckID);
app.use('/api/v1/fetch_user', FetchMember);
app.use('/api/v1/fetch_houses', fetchHouses);
app.use('/api/v1/fetch_house', fetchHouse);
app.use('/api/v1/delete_user', deleteUser);
app.use('/api/v1/change_house', changeHouse);
app.use('/api/v1/all_members', allMembers);

'144.172.75.88'
app.listen(port, '144.172.70.231', async () => {
    console.log(`Server is now listening at: http://144.172.70.231:${port}`);
    await database.createTables();
})