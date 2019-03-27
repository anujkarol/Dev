import app from "./app";
import routes from "./route"

routes();

const server = app.listen(app.get("port"), () => {
    console.log(`App is running in port : ${app.get("port")} and environment : ${app.get("env")}`)
});

export default server;
