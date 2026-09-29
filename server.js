const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/calendar", async (req, res) => {
  const rawUrl = req.query.url;

  if (!rawUrl) return res.status(400).json({ error: "Missing url parameter." });

  let target;
  try {
    target = new URL(rawUrl);
  } catch {
    return res.status(400).json({ error: "Invalid calendar URL." });
  }

  if (!["http:", "https:"].includes(target.protocol)) {
    return res.status(400).json({ error: "Only HTTP(S) URLs are allowed." });
  }

  try {
    const response = await fetch(target.href, {
      redirect: "follow",
      headers: {
        "User-Agent": "AssignmentDashboard/1.0"
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Calendar server returned HTTP ${response.status}.`
      });
    }

    const text = await response.text();

    if (!text.includes("BEGIN:VCALENDAR")) {
      return res.status(422).json({
        error: "The URL did not return a valid ICS calendar."
      });
    }

    res.type("text/calendar").send(text);
  } catch (error) {
    res.status(502).json({
      error: "Could not retrieve the calendar.",
      detail: error.message
    });
  }
});

app.get("/health", (req, res) => res.json({ ok: true }));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Assignment Dashboard running on port ${PORT}`);
});
