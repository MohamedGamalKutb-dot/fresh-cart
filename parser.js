const fs = require('fs');
const html = fs.readFileSync('C:/Users/Nourhan/.gemini/antigravity/brain/171f757e-8a81-4bde-9257-09b0ca5c5e0a/.system_generated/steps/311/content.md', 'utf8');

// The Postman documentation contains a giant JSON object embedded in a script tag: window.__INITIAL_STATE__ or similar.
// Or we can just find '317f086d'
const idx = html.indexOf('317f086d');
if (idx !== -1) {
    const segment = html.substring(Math.max(0, idx - 1000), idx + 2000);
    console.log(segment);
} else {
    console.log("Hash not found");
}
