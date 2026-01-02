import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// ESM __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, 'INPUT_DIRECTORY_PATH'); // Replace with your input directory path   
const OUTPUT_DIR = path.join(__dirname, 'OUTPUT_DIRECTORY_PATH'); // Replace with your output directory path

/**
 * Ensures the output directory exists
 */
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Converts an individual image to WebP format
 *  inputPath Source file path
 *  outputPath Destination file path
 */
async function convertToWebp(inputPath: string, outputPath: string): Promise<void> {
    try {
        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);
        console.log(`Converted: ${inputPath} -> ${outputPath}`);
    } catch (error) {
        console.error(`Error converting ${inputPath}:`, error);
    }
}

/**
 * Recursively walks through directories to find and convert images
 * dir Current input directory
 * targetDir Current output directory
 */
async function walkAndConvert(dir: string, targetDir: string): Promise<void> {
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        const outputPath = path.join(targetDir, item);

        if (stat.isDirectory()) {
            if (!fs.existsSync(outputPath)) {
                fs.mkdirSync(outputPath, { recursive: true });
            }
            await walkAndConvert(fullPath, outputPath);
        } else {
            const ext = path.extname(item).toLowerCase();
            const supportedExtensions = ['.png', '.jpg', '.jpeg']; // Add more as needed

            if (!supportedExtensions.includes(ext)) {
                continue;
            }

            const finalOutput = path.join(
                targetDir,
                `${path.basename(item, ext)}.webp`
            );

            await convertToWebp(fullPath, finalOutput);
        }
    }
}

// Execution block
(async () => {
    console.log("Starting WebP conversion...");
    await walkAndConvert(INPUT_DIR, OUTPUT_DIR);
    console.log("Conversion process complete.");
})();

{
    // Example Output:
    // Starting WebP conversion...
    // Converted: /path/to/input/image1.jpg -> /path/to/output/image1.webp
    // Converted: /path/to/input/subdir/image2.png -> /path/to/output/subdir/image2.webp
    // .....goes on for each converted image.....
    // Conversion process complete.
}