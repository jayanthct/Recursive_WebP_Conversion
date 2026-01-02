import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Handling __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, 'INPUT_DIRECTORY_PATH'); // Replace with your input directory path

/**
 * Interface representing the structure of our count object
 */
interface ExtensionCounts {
    [extension: string]: number;
}

const counts: ExtensionCounts = {};

/**
 * Recursively scans a directory and counts file occurrences by extension
 */
function countExtensions(dir: string): void {
    try {
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                countExtensions(fullPath);
            } else {
                const ext = path.extname(item);

                if (!ext) continue;

                counts[ext] = (counts[ext] || 0) + 1;
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
    }
}

console.log("Scanning image types...");
countExtensions(INPUT_DIR);

console.log("\nImage Type Count:");
Object.entries(counts).forEach(([ext, count]) => {
    console.log(`${ext} - ${count}`);
});

{
    // Example Output:
    // Scanning image types...
    // Image Type Count:
    // .jpg - 150
    // .png - 85
    // .gif - 40
    // .svg - 25
}