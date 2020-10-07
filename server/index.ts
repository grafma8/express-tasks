
import {app} from "./app";

// start express server
const APP_PORT = process.env.APP_PORT;
app.listen(APP_PORT);
console.log(`Express server has started on port ${APP_PORT}`);