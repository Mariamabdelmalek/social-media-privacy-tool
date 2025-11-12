const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const PORT = 8000;

// Middleware
app.use(cors()); // optional since CRA proxy works
app.use(fileUpload());

// Dummy /scan endpoint
app.post("/scan", (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const file = req.files.file;

  // For demo: pretend we scanned and return dummy data
  const dummyResult = {
    summary: { num_posts: 2 },
    results: [
      {
        text_snippet: "This is a post snippet...",
        findings: [
          { type: "person", match: "John Doe", source: "ner" },
          { type: "email", match: "john@example.com", source: "regex" }
        ],
        risk_score: 0.7,
        recommendations: ["Remove sensitive info", "Use pseudonyms"]
      },
      {
        text_snippet: "Another post snippet...",
        findings: [
          { type: "gpe", match: "New York", source: "ner" }
        ],
        risk_score: 0.3,
        recommendations: ["Avoid location tagging"]
      }
    ]
  };

  res.json(dummyResult);
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
