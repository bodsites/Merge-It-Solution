const fs = require('fs');


function splitIntoBlocks(content) {
  return content.trim().split(/\n\s*\n|====/);
}


function mergeBlocks(baseBlocks, modifiedBlocks) {
  return modifiedBlocks.map((modifiedBlock, index) => {
    // If the modified block contains 'IGNORED', we use the corresponding base block
    const baseBlock = baseBlocks[index].trim();
    return modifiedBlock.includes('IGNORED') ? baseBlock : modifiedBlock.trim();
  }).join('\n\n====\n\n');
}

// Read the base file and the modified file asynchronously
fs.readFile('base.txt', 'utf8', (err, baseContent) => {
  if (err) {
    console.error('Error reading base.txt:', err);
    return;
  }

  fs.readFile('modified.txt', 'utf8', (err, modifiedContent) => {
    if (err) {
      console.error('Error reading modified.txt:', err);
      return;
    }

    // Split both files into blocks
    const baseBlocks = splitIntoBlocks(baseContent);
    const modifiedBlocks = splitIntoBlocks(modifiedContent);

    // Merge the blocks using the defined rules
    const mergedResult = mergeBlocks(baseBlocks, modifiedBlocks);

    // Save the merged content to a new file called 'merged_output.txt'
    fs.writeFile('merged_output.txt', mergedResult, (err) => {
      if (err) {
        console.error('Error writing merged_output.txt:', err);
        return;
      }
      console.log('Merged content has been successfully saved to merged_output.txt!');
    });
  });
});
