# MARC Language Support for VS Code

A Visual Studio Code extension that provides comprehensive language support for MARC MRK (machine-readable cataloging) files, including syntax highlighting, hover documentation, auto-completion, and validation.

## Features

- **Syntax Highlighting**: Color-coded MARC tags, indicators, and subfields with custom grammar
- **Hover Documentation**: Detailed information about MARC fields and subfields fetched from Library of Congress documentation
- **Auto-completion**: Intelligent suggestions for MARC tags and subfields as you type
- **Real-time Validation**: Syntax checking for MRK format with error highlighting
- **Dynamic Documentation**: Always up-to-date field definitions from Library of Congress
- **Precise Hover Ranges**: Accurate highlighting of individual subfields, including repeated subfields

## Requirements

- **Python**: 3.9 or higher
- **MARC LSP Server**: Installed via pipx or pip

## Installation

### For End Users

1. **Install the MARC LSP server** (recommended with pipx for isolation):
   ```bash
   # Install pipx if you don't have it
   python -m pip install --user pipx
   python -m pipx ensurepath

   # Install MARC LSP server
   pipx install marc-lsp-server
   ```

   **Alternative with pip:**
   ```bash
   pip install marc-lsp-server
   ```

2. **Install this VS Code extension** from the marketplace (once published)

3. **Start using MARC files** - the extension will automatically detect `.mrk` files and activate

### For Development/Testing

1. **Install the LSP server from source:**
   ```bash
   git clone <your-marc-lsp-repo>
   cd marc-lsp
   pipx install -e .
   ```

2. **Build and test the VS Code extension:**
   ```bash
   cd vscode-marc-lsp
   npm install
   npm run compile
   # Press F5 in VS Code to launch Extension Development Host
   ```

## Configuration

The extension can be configured via VS Code settings:

```json
{
  "marcLsp.serverCommand": "marc-lsp-server",
  "marcLsp.trace.server": "off"
}
```

### Settings

- `marcLsp.serverCommand`: Command to run the MARC LSP server (default: "marc-lsp-server")
- `marcLsp.trace.server`: LSP communication tracing level ("off", "messages", "verbose")

## Example Usage

### Sample MARC MRK File

Create a `.mrk` file with content like this to test the extension:

```mrk
=LDR  00000nam a2200000 a 4500
=001  123456789
=008  230101s2023    cau     b    001 0 eng d
=020  \\$a9781234567890$qhardcover
=035  \\$a(OCoLC)123456789$z(OCoLC)987654321
=040  \\$aCLU$beng$cCLU$dNST$dDLC$dOCLCQ$dOCLCF$dOCLCO$dGILDS$dOCLCO$dOCLCQ
=100  1\$aSmith, John,$d1980-
=245  10$aExample MARC record$bfor testing language server$cby John Smith
=260  \\$aLos Angeles :$bUCLA Library,$c2023.
=300  \\$a200 pages :$billustrations ;$c24 cm
=504  \\$aIncludes bibliographical references and index.
=650  \0$aLibrary science$xAutomation.
=856  40$uhttp://example.com/resource$zOnline version
```

### Testing Features

- **Hover over MARC tags** (=245, =040) to see field descriptions from Library of Congress
- **Hover over subfields** ($a, $b, $d) to see subfield definitions and descriptions
- **Hover over repeated subfields** (multiple $d in 040 field) - each instance highlights correctly
- **Hover over indicators** (10, \\) to see indicator value meanings
- **Type completion**: Start typing `=` to get tag suggestions, `$` for subfield suggestions
- **Syntax highlighting**: Tags, indicators, and subfields are color-coded differently

## Testing Without Publishing

### Development Mode (Recommended)

1. **Clone and setup:**
   ```bash
   git clone <repo-url>
   cd marc-lsp/vscode-marc-lsp
   npm install
   npm run compile
   ```

2. **Open in VS Code and press F5** to launch Extension Development Host

3. **In the new window**, open a `.mrk` file and test all features

### Package Testing

```bash
# Package the extension
npm install -g @vscode/vsce
vsce package

# Install locally
code --install-extension marc-lsp-0.1.0.vsix
```

## Troubleshooting

### LSP Server Not Found

**Error**: `Launching server using command marc-lsp-server failed`

**Solutions**:
1. **Install the LSP server**: `pipx install marc-lsp-server`
2. **Check if it's in PATH**: `which marc-lsp-server`
3. **Configure custom path**: Set `marcLsp.serverCommand` to full path

### Extension Not Activating

1. **Check file extension**: Must be `.mrk` or `.mrc`
2. **Verify language mode**: Bottom right of VS Code should show "MARC MRK"  
3. **Reload window**: `Ctrl+Shift+P` → "Developer: Reload Window"

### No Hover/Completion

1. **Check Output panel**: View → Output → "MARC Language Server"
2. **Enable verbose logging**: `"marcLsp.trace.server": "verbose"`
3. **Test simple line**: `=245  10$aTest title`
4. **Check internet**: Extension fetches documentation from Library of Congress

### Performance Issues

1. **Cache location**: Documentation cached in `~/.cache/marc-lsp-server/`
2. **Clear cache**: Delete cache directory if needed
3. **Network delays**: First-time field lookups may be slow

## Technical Details

### Architecture

- **LSP Server**: Standalone Python application (`marc-lsp-server`)
- **VS Code Extension**: TypeScript client that communicates with LSP server
- **Documentation Source**: Live data fetched from Library of Congress
- **Caching**: HTML responses cached locally for performance

### Project Structure

```
vscode-marc-lsp/
├── package.json                    # Extension manifest  
├── src/extension.ts               # Main extension client
├── syntaxes/mrk.tmLanguage.json   # Syntax highlighting grammar
└── language-configuration.json    # Language features (brackets, etc.)
```

### Development Commands

```bash
npm install           # Install dependencies
npm run compile       # Compile TypeScript
npm run watch         # Watch for changes
npx vsce package      # Create .vsix package
```

## Contributing

1. **Fork** the repository
2. **Install** development dependencies: `pipx install -e .` and `npm install`
3. **Test** your changes using Extension Development Host (`F5`)
4. **Submit** a pull request with clear description

## License

[Add your license here]

---

**Keywords**: MARC, MRK, cataloging, library, bibliographic, metadata, LSP, language server