const express = require('express');
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai"); 

const app = express();
app.use(cors()); // ✅ enable CORS

const PORT = process.env.PORT || 8000;
const api = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(process.cwd(), "uploads");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir); 
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

app.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No PDF uploaded" });

        const buffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(buffer);
        const pdfText = pdfData.text;
        const pdfShort = pdfText.slice(0, 15000);

        fs.unlinkSync(req.file.path);

        const prompt = `
You are an exam question setter.
Based ONLY on the following study material, generate:
- 5 exam-oriented questions
- Mix of theory and numerical (if applicable)
- Questions should sound like real university exams
- Do NOT add answers
- Do NOT use AI-style wording

Study Material:
${pdfShort}
`;

        const response = await api.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        res.json({ 
          success: true,
          question: response.text
        });
        console.log("Questions generated successfully", response.text);

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).json({ message: "Error processing PDF" });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
