# MARC Language Support for VS Code

Language support for MARC MRK (machine-readable cataloging) files with syntax highlighting, and hover documentation.

## Installation

Install the MARC LSP server:
```bash
pipx install git+https://github.com/RvanB/marc-lsp.git
```

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the extension using the `tsc:build` task (Terminal → Run Task), or manually:
   ```bash
   npm run compile
   ```

3. Press `F5` to launch the Extension Development Host and test

Watch for changes during development:
```bash
npm run watch  # or use Terminal → Run Task → tsc:watch
```

## Configuration

Configure in VS Code settings (`.vscode/settings.json`):

```json
{
  "marcLsp.serverCommand": "marc-lsp-server",
  "marcLsp.trace.server": "off"
}
```

- `serverCommand`: Path to LSP server executable
- `trace.server`: Set to "verbose" for debugging