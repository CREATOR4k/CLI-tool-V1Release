# CLI-tool-V1Release

> An interactive CLI utility built with TypeScript/Node.js for locating large ("heavy") files within a specified directory, automatically compressing them into ZIP archives, and deleting the original files.

![version](https://img.shields.io/badge/version-1.0.0-blue)
![license](https://img.shields.io/badge/license-MIT-green)

## Features
- **Large File Discovery & Compression:** Scans directories to identify large files, compressing them into ZIP archives and purging originals to reclaim space.
- **Interactive Mode & Crypto:** Provides interactive terminal prompts and complementary Python scripts for AES-256 encryption and decryption.

## Requirements
- Node.js v18.0.0+ / TypeScript
- Python 3.x (for encryption/decryption modules)

## Installation
```bash
git clone https://github.com/CREATOR4k/CLI-tool-V1Release.git
cd CLI-tool-V1Release
npm install
```

## Usage
```bash
npx ts-node CLI.ts [command] [options]
```

### Commands & Options

| Command/Flag | Description |
|--------------|-------------|
| `interactive` | Launches the terminal user interface |
| `scan <path>` | Scans the target folder for high-capacity files |
| `-h, --help` | Show help configuration options |
| `-v, --version` | Show current application version |

## Project Structure
Includes `CLI.ts`, Python crypto utilities (`Encrypt.py`, `Decrypt.py`), and configuration manifests (`package.json`, `tsconfig.json`).

## Contributing & License
Fork the repo, create a feature branch, commit changes, and open a pull request. Distributed under the MIT License.

## Contact
CREATOR4k – https://github.com/CREATOR4k
