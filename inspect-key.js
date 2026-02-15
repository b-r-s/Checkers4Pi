import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'validation-key.txt');

try {
    const content = fs.readFileSync(filePath);
    console.log('File Path:', filePath);
    console.log('Total Bytes:', content.length);
    console.log('Content (String):', content.toString());
    console.log('Content (Hex):', content.toString('hex'));

    if (content.length > 25) {
        console.log('⚠️ WARNING: File is longer than 25 bytes. Likely trailing newline or whitespace.');
    } else if (content.length < 25) {
        console.log('⚠️ WARNING: File is shorter than 25 bytes.');
    } else {
        console.log('✅ Size matches expected 25 bytes.');
    }

} catch (err) {
    console.error('Error reading file:', err);
}
