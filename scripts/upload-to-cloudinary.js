const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get environment folder (dev/prod)
const ENV_FOLDER = process.env.CLOUDINARY_FOLDER || 'prod';

// Folder mapping for organized uploads (dynamic based on environment)
const FOLDER_MAPPING = {
  'hero': `${ENV_FOLDER}/hero`,
  'events': `${ENV_FOLDER}/events`,
  'artists': `${ENV_FOLDER}/artists`,
  'gallery': `${ENV_FOLDER}/gallery`,
  'about': `${ENV_FOLDER}/about`,
  'videos': `${ENV_FOLDER}/videos`,
};

// About subsection mapping
const ABOUT_SUBSECTION_MAPPING = {
  'loving-memory': `${ENV_FOLDER}/about/loving-memory`,
  'patrons': `${ENV_FOLDER}/about/patrons`,
  'the-virasat-team': `${ENV_FOLDER}/about/the-virasat-team`,
};

// File type detection
function getFileType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (['.mp4', '.mov', '.webm', '.avi'].includes(ext)) return 'video';
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext)) return 'image';
  return 'raw';
}

// Generate semantic tags based on file path and name
function generateTags(filePath, folder) {
  const tags = ['section:' + folder.split('/')[1]]; // section:hero, section:events, etc.
  
  // Add specific tags based on folder
  if (folder.includes('artists')) {
    tags.push('type:portrait', 'category:artists');
  } else if (folder.includes('events')) {
    tags.push('type:event-image', 'category:events');
  } else if (folder.includes('gallery')) {
    const year = folder.match(/\/(\d{4})\//);
    if (year) tags.push('year:' + year[1]);
    tags.push('type:gallery', 'category:gallery');
  } else if (folder.includes('about')) {
    if (folder.includes('loving-memory')) {
      tags.push('type:portrait', 'category:loving-memory');
    } else if (folder.includes('patrons')) {
      tags.push('type:portrait', 'category:patrons');
    } else if (folder.includes('the-virasat-team')) {
      tags.push('type:portrait', 'category:team');
    }
  } else if (folder.includes('hero')) {
    tags.push('type:hero', 'category:homepage');
  }
  
  return tags;
}

// Upload single file to Cloudinary with enhanced metadata
async function uploadFile(filePath, folder, options = {}) {
  try {
    const fileType = getFileType(filePath);
    const fileName = path.basename(filePath, path.extname(filePath));
    
    // Create public ID with folder structure
    const publicId = `${folder}/${fileName}`;
    
    // Generate semantic tags
    const tags = generateTags(filePath, folder);
    
    // Default transformations for optimization
    const transformations = fileType === 'image' 
      ? [{ width: 2000, crop: "limit", quality: "auto", fetch_format: "auto" }]
      : [{ quality: "auto" }];
    
    // Enhanced upload options
    const uploadOptions = {
      public_id: publicId,
      folder: folder,
      resource_type: fileType,
      overwrite: true,
      tags: tags,
      transformation: transformations,
      context: {
        alt: fileName.replace(/-/g, ' ').replace(/_/g, ' '),
        caption: `Image from ${folder.split('/').pop()}`
      },
      ...options
    };

    console.log(`Uploading ${filePath} to ${publicId}...`);
    console.log(`Tags: ${tags.join(', ')}`);
    
    const result = await cloudinary.uploader.upload(filePath, uploadOptions);
    
    console.log(`✅ Uploaded: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

// Upload directory recursively
async function uploadDirectory(dirPath, targetFolder) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Handle year-wise gallery folders
      if (targetFolder === `${ENV_FOLDER}/gallery` && /^\d{4}$/.test(item)) {
        await uploadDirectory(itemPath, `${ENV_FOLDER}/gallery/${item}`);
      }
      // Handle about subsection folders
      else if (targetFolder === `${ENV_FOLDER}/about` && ABOUT_SUBSECTION_MAPPING[item]) {
        await uploadDirectory(itemPath, ABOUT_SUBSECTION_MAPPING[item]);
      } else {
        await uploadDirectory(itemPath, targetFolder);
      }
    } else {
      // Upload file
      await uploadFile(itemPath, targetFolder);
    }
  }
}

// Main upload function
async function uploadAssets() {
  console.log(`🚀 Starting Cloudinary upload process to ${ENV_FOLDER} environment...\n`);
  
  // Check if migration folder exists
  const migrationPath = path.join(__dirname, '..', 'migration');
  if (!fs.existsSync(migrationPath)) {
    console.log('📁 Creating migration folder structure...');
    fs.mkdirSync(migrationPath, { recursive: true });
    
    // Create subfolders
    Object.keys(FOLDER_MAPPING).forEach(folder => {
      fs.mkdirSync(path.join(migrationPath, folder), { recursive: true });
    });
    
    console.log('✅ Migration folder created. Please organize your Google Drive assets into:');
    console.log('   migration/hero/');
    console.log('   migration/events/');
    console.log('   migration/artists/');
    console.log('   migration/gallery/2024/ (or your years)');
    console.log('   migration/about/');
    console.log('   migration/videos/');
    console.log('\nThen run this script again.');
    return;
  }
  
  // Upload each folder
  for (const [localFolder, cloudFolder] of Object.entries(FOLDER_MAPPING)) {
    const folderPath = path.join(migrationPath, localFolder);
    
    if (fs.existsSync(folderPath)) {
      console.log(`\n📂 Uploading ${localFolder} to ${cloudFolder}...`);
      await uploadDirectory(folderPath, cloudFolder);
    } else {
      console.log(`⚠️  Folder ${localFolder} not found, skipping...`);
    }
  }
  
  console.log('\n🎉 Upload process completed!');
}

// Run the upload
if (require.main === module) {
  uploadAssets().catch(console.error);
}

module.exports = { uploadFile, uploadDirectory, uploadAssets };
