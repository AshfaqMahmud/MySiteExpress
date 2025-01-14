const app = require("./app_config");

// Route to display the contact form
app.get("/contact", (req, res) => {
  res.render("contact");
});

// Route to process the contact form
app.post("/process-contact", (req, res) => {
  console.log(`Received contact form ${req.body.name} <${req.body.email}>`);

  try {
    // Simulate saving to the database
    console.log("Saving to the database...");

    // check if the req is AJAX (XHR) req
    if (req.xhr) {
      return res.json({ success: true });
    } else {
      return res.redirect(303, "/thank-you");
    }
  } catch (err) {
    console.log("Databse error: ", err);
    if (req.xhr) {
      return res.json({ error: "DB error." });
    } else {
      return res.redirect(303, "/db-error");
    }
  }
});

// Thank You page route
app.get("/thank-you", (req, res) => {
  res.render("thank-you");
});

// Start the server
app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press ctrl-c to terminate"
  );
});
