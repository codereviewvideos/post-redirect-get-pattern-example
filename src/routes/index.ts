import express from "express";

const router = express.Router();

// Initialise counter
let formSubmissionCounter = 0;

router.get("/", (req: express.Request, res: express.Response) => {
  req.session.whereDoYouLive = undefined;
  formSubmissionCounter = 0; // Reset counter on clearing
  res.render("index.njk");
});

router.get(
  "/check-your-answers",
  (req: express.Request, res: express.Response) => {
    res.render("check-your-answers.njk", {
      whereDoYouLive: req.session.whereDoYouLive,
    });
  },
);

router.get("/with-prg", (req: express.Request, res: express.Response) => {
  res.render("where-do-you-live.njk", {
    errors: req.flash("errors"),
    renderedFrom: "GET /with-prg",
    formSubmissionCounter,
  });
});

router.post("/with-prg", (req: express.Request, res: express.Response) => {
  if (!req.body.whereDoYouLive) {
    req.flash("errors", "some error message here");
    return res.redirect("/with-prg");
  }

  formSubmissionCounter++;

  req.session.whereDoYouLive = req.body.whereDoYouLive;

  res.redirect("/check-your-answers");
});

router.get("/without-prg", (req: express.Request, res: express.Response) => {
  res.render("where-do-you-live.njk", {
    formSubmissionCounter,
    renderedFrom: "GET /without-prg",
  });
});

router.post("/without-prg", (req: express.Request, res: express.Response) => {
  req.session.whereDoYouLive = req.body.whereDoYouLive;

  formSubmissionCounter++;

  if (!req.body.whereDoYouLive) {
    return res.render("where-do-you-live.njk", {
      errors: ["had errors"],
      renderedFrom: "POST /without-prg",
      formSubmissionCounter,
    });
  }

  res.redirect("/check-your-answers");
});

export default router;
