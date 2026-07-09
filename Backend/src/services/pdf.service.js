import fs from "fs";
import pdf from "pdf-parse";

async function extractText(filePath) {
    const buffer = fs.readFileSync(filePath);

    const data = await pdf(buffer);

    fs.unlinkSync(filePath);

    return data.text;
}

export default extractText