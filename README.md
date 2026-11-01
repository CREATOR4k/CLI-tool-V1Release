# CLI Media Backup Tool 🗜

**CLI-tool-V1Release** — an interactive CLI utility built with TypeScript and Node.js, designed to locate large files, compress them into ZIP archives, and remove the original files.

## ✨ Features
- **Recursive Search:** Scans directories while skipping symbolic links.
- **Size-based Filtering:** Allows setting a minimum file size threshold (default is 15 MB).
- **Compression & Cleanup:** Archives files into `.zip` format and deletes the source files.
- **Interactive UI:** User-friendly prompts powered by `@clack/prompts`.

## 🛠 Technologies
- TypeScript, Node.js, `commander`, `@clack/prompts`, `archiver`, `picocolors`.

## 🚀 Installation

```bash
git clone https://github.com
cd CLI-tool-V1Release
npm install
npm run build
```

## 💡 Usage

- **Interactive Mode:** `node dist/CLI.js`
- **Specify a Directory:** `node dist/CLI.js ./my-media-folder`
- **With Size Filter:** `node dist/CLI.js ./my-media-folder --size 50`

For full documentation and a list of available parameters, please refer to the repository [LICENSE](LICENSE).
