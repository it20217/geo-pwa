var sslRedirect = require("heroku-ssl-redirect");
const app = express();
app.use(sslRedirect());