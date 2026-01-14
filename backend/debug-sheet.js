
import dotenv from "dotenv";
import { getSheet } from "./google.js";

dotenv.config();

console.log("Starting debug script...");
const SHEET_ID = process.env.SHEET_ID;
console.log("Sheet ID:", SHEET_ID);

async function test() {
    try {
        console.log("Fetching sheet...");
        const rows = await getSheet(SHEET_ID);
        console.log("Rows fetched:", rows ? rows.length : 0);
        if (rows && rows.length > 1) {
            // Log header
            console.log("Header:", rows[0]);
            // Log first row
            const row = rows[1];
            console.log("First row raw image:", row[13]);

            let images = [];
            if (row[13]) {
                images = row[13]
                    .split(',')
                    .map(url => url.trim())
                    .filter(url => url.length > 0 && url.startsWith("http"));
            }
            console.log("Parsed images:", images);
        }
    } catch (err) {
        console.error("Error fetching sheet:", err);
    }
}

test();
