import express from "express";
import session from "express-session";
import nunjucks from "nunjucks";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectFlash from "connect-flash";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 3000;

// Configure Express to serve static files from the 'assets' directory
const assets = [
  "/dist/public/stylesheets",
  "/node_modules/govuk-frontend/dist/govuk/assets",
  "/node_modules/govuk-frontend/dist/govuk",
];
assets.forEach((dir) => {
  app.use("/assets", express.static(path.join(process.cwd(), dir)));
});

// Configure Nunjucks
nunjucks.configure(["src/views", "node_modules/govuk-frontend/dist"], {
  autoescape: true,
  express: app,
});

app.use(cookieParser("a-secret-key"));

// Configure session middleware with the default in-memory store
app.use(
  session({
    secret: "some-highly-secret-key",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(connectFlash());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
