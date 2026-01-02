# Web Image Optimizer: PNG/JPEG to WebP Converter

A high-performance TypeScript utility for automating the conversion of web assets to the WebP format. This tool recursively scans your project directories, optimizes images using the `sharp` engine, and preserves your folder structure in the output.

## Overview

Modern web performance requires efficient image formats. This project provides a robust, type-safe solution to transition from legacy formats (PNG, JPEG) to WebP, significantly improving load times and Core Web Vitals.

## Key Features

* **Recursive Processing:** Automatically traverses nested directories.
* **Performance Focused:** Built on the `sharp` library (using `libvips`) for industry-leading speed and low memory footprint.
* **Preserves Structure:** Mirrors your input directory hierarchy in the output folder.
* **Type-Safe:** Written entirely in TypeScript with ES Modules.
* **Optimized Defaults:** Pre-configured with a 80% quality threshold, balancing visual fidelity and file size.

## Advantages of WebP Conversion

| Feature | JPEG / PNG | WebP |
| :--- | :--- | :--- |
| **Average Size** | 100% | 65% - 75% |
| **Compression** | Lossy (JPG) / Lossless (PNG) | Superior Lossy & Lossless |
| **Transparency** | PNG only | Supported (Lossless & Lossy) |
| **Browser Support** | Universal | Modern Browsers (Chrome, Safari, Edge, Firefox) |

1. **Faster Page Loads:** Smaller images reduce the total payload of your web application.
2. **Bandwidth Savings:** Significant cost reduction for high-traffic applications.
3. **SEO Boost:** Faster LCP (Largest Contentful Paint) scores contribute to higher search engine rankings.

## Prerequisites

* **Node.js:** v16.x or higher
* **npm**

## Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/jayanthct/Recursive_WebP_Conversion.git](https://github.com/jayanthct/Recursive_WebP_Conversion.git)
   cd webp_conversion

2. Ensure you have `typescript` and `ts-node` installed:
```bash
npm install -g typescript ts-node sharp

```

## Usage

1. Place your source images in the directory specified in the script.
2. Run the conversion script:
```bash
node recursiveWebPconversion.ts

```

3. Optimized images will be generated in the output directory.

## Configuration

You can adjust the quality settings in `recursiveWebPconversion.ts`:

```typescript
await sharp(inputPath)
  .webp({ quality: 100 }) // Adjust quality from 1-100
  .toFile(outputPath);

```
