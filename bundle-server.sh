#!/bin/bash
# Script to bundle the MARC LSP server with dependencies

# Create server directory in extension
mkdir -p server

# Copy the LSP server files
cp ../marc_lsp_server.py server/
cp ../marc_lookup.py server/
cp ../marc_adapter.py server/
cp ../marc_fixed_fields.py server/
cp ../mrk_parser.py server/

# Create requirements.txt
cat > server/requirements.txt << EOF
requests>=2.25.0
beautifulsoup4>=4.9.0
lsprotocol>=2023.0.0
pygls>=1.0.0
EOF

# Create a wrapper script that sets up the environment
cat > server/run_server.py << 'EOF'
#!/usr/bin/env python3
import subprocess
import sys
import os
from pathlib import Path

# Get the directory containing this script
server_dir = Path(__file__).parent

# Install dependencies if needed
def ensure_dependencies():
    try:
        import requests
        import bs4
        import lsprotocol
        import pygls
    except ImportError:
        print("Installing dependencies...")
        subprocess.check_call([
            sys.executable, "-m", "pip", "install", "-r", 
            str(server_dir / "requirements.txt")
        ])

if __name__ == "__main__":
    ensure_dependencies()
    
    # Import and run the actual server
    server_path = server_dir / "marc_lsp_server.py"
    
    # Add server directory to path so imports work
    sys.path.insert(0, str(server_dir))
    
    # Execute the server
    exec(open(server_path).read())
EOF

chmod +x server/run_server.py

echo "Server bundled successfully!"