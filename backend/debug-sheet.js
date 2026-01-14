
import dotenv from "dotenv";
import { getSheet } from "./google.js";

dotenv.config();


const SHEET_ID = process.env.SHEET_ID;


async function test() {
    try {
        
        const rows = await getSheet(SHEET_ID);
        
        if (rows && rows.length > 1) {
            // Log header
            
            // Log first row
            const row = rows[1];
            

            let images = [];
            if (row[13]) {
                images = row[13]
                    .split(',')
                    .map(url => url.trim())
                    .filter(url => url.length > 0 && url.startsWith("http"));
            }
            
        }
    } catch (err) {
        console.error("Error fetching sheet:", err);
    }
}

test();
