Merge It - File Merge Solution

Project Overview
This project is designed to merge two versions of a file by comparing them block by block. The solution follows these rules:
- If a block in the modified file contains the word `IGNORED`, the corresponding block from the base file is retained.
- Otherwise, the block from the modified file is used.

The merging is done at the block level, with blocks being separated by two empty lines or `====` markers.

Features
- Merges files at the block level based on custom rules.
- Handles content marked as `IGNORED` in the modified file.
- Supports block delimiters such as empty lines and specific markers (`====`).

Setup Instructions

Prerequisites
- Node.js: Ensure that Node.js is installed on your system. You can download it from [here](https://nodejs.org/).

Installation
1. Clone the repository:
   ```bash

Navigate to the project directory
cd merge-it-solution
