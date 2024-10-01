const fs = require('fs');

// Function to split content into blocks using regex
// It splits based on empty lines or the '====' marker.
function splitIntoBlocks(content) {
  return content.trim().split(/\n\s*\n|====/);
}

// Function to merge blocks from base and modified versions
// If the block in the modified file contains 'IGNORED', use the block from the base file
// Otherwise, use the block from the modified file.
function mergeBlocks(baseBlocks, modifiedBlocks) {
  return modifiedBlocks.map((block, index) => {
    // Check if the block in the modified file contains 'IGNORED'
    if (block.includes('IGNORED')) {
      return baseBlocks[index].trim();  // Use base block
    } else {
      return block.trim();  // Use modified block
    }
  }).join('\n\n====\n\n');
}

// Read the base and modified files asynchronously
// Files should be named 'base.txt' and 'modified.txt' and placed in the same directory.
fs.readFile('base.txt', 'utf8', (err, baseFile) => {
  if (err) {
    console.error('Error reading base.txt:', err);
    return;
  }

  fs.readFile('modified.txt', 'utf8', (err, modifiedFile) => {
    if (err) {
      console.error('Error reading modified.txt:', err);
      return;
    }

    // Split the content of both files into blocks
    const baseBlocks = splitIntoBlocks(baseFile);
    const modifiedBlocks = splitIntoBlocks(modifiedFile);

    // Merge the blocks according to the rules defined
    const mergedContent = mergeBlocks(baseBlocks, modifiedBlocks);

    // Write the merged content into a new file called 'merged_output.txt'
    fs.writeFile('merged_output.txt', mergedContent, (err) => {
      if (err) {
        console.error('Error writing merged_output.txt:', err);
        return;
      }
      console.log('Merged content has been saved to merged_output.txt!');
    });
  });
});
