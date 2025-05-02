/**
 * Image Optimization Script
 * 
 * This script optimizes all images in the public/images/gallery directory
 * It creates optimized versions at different resolutions for responsive loading
 * 
 * To use: 
 * 1. Install dependencies: npm install sharp fs-extra path glob
 * 2. Run: node optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// Configuration
const inputDir = path.join(__dirname, 'public', 'images', 'gallery');
const outputDir = path.join(__dirname, 'public', 'images', 'gallery', 'optimized');
const sizes = [320, 640, 960, 1280]; // Responsive image sizes
const quality = 80; // JPEG quality (0-100)

// Ensure output directory exists
fs.ensureDirSync(outputDir);

// Find all image files
glob('**/*.{jpg,jpeg,png}', { cwd: inputDir, nocase: true }, async (err, files) => {
  if (err) {
    console.error('Error finding image files:', err);
    return;
  }

  console.log(`Found ${files.length} images to optimize`);

  let processed = 0;
  const startTime = Date.now();

  // Process each file
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const fileInfo = path.parse(file);
    
    try {
      // Get original file size
      const originalStats = fs.statSync(inputPath);
      const originalSize = originalStats.size;

      // Base optimization - maintain original size but optimize
      const outputPathBase = path.join(outputDir, `${fileInfo.name}${fileInfo.ext}`);
      await sharp(inputPath)
        .jpeg({ quality, mozjpeg: true })
        .toFile(outputPathBase);

      // Create different sizes for responsive loading
      for (const width of sizes) {
        const outputPath = path.join(outputDir, `${fileInfo.name}-${width}${fileInfo.ext}`);
        await sharp(inputPath)
          .resize({ width, withoutEnlargement: true })
          .jpeg({ quality, mozjpeg: true })
          .toFile(outputPath);
      }

      // Create WebP version (better compression, modern browsers)
      const outputPathWebP = path.join(outputDir, `${fileInfo.name}.webp`);
      await sharp(inputPath)
        .webp({ quality })
        .toFile(outputPathWebP);

      // Calculate size reduction for the base optimization
      const optimizedStats = fs.statSync(outputPathBase);
      const optimizedSize = optimizedStats.size;
      const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);

      processed++;
      console.log(`Optimized [${processed}/${files.length}]: ${file} (${reduction}% smaller)`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`Finished optimizing ${processed} images in ${totalTime}s`);
}); 