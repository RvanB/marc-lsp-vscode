import * as vscode from 'vscode';
import * as path from 'path';
import { spawn } from 'child_process';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
    // Get configuration
    const config = vscode.workspace.getConfiguration('marcLsp');
    const serverCommand = config.get<string>('serverCommand', 'marc-lsp-server');

    // Server options - simple command execution
    const serverOptions: ServerOptions = {
        command: serverCommand,
        args: []
    };

    // Client options
    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            { scheme: 'file', language: 'mrk' },
            { scheme: 'untitled', language: 'mrk' }
        ],
        synchronize: {
            configurationSection: 'marcLsp',
            fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
        }
    };

    // Create the language client
    client = new LanguageClient(
        'marcLsp',
        'MARC Language Server',
        serverOptions,
        clientOptions
    );

    // Start the client (and server)
    client.start();

    // Add client to disposables so it gets cleaned up
    context.subscriptions.push(client);

    // Add status bar item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = "$(book) MARC LSP";
    statusBarItem.tooltip = "MARC Language Server is active";
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Register commands
    const restartCommand = vscode.commands.registerCommand('marcLsp.restart', async () => {
        await client.stop();
        client.start();
        vscode.window.showInformationMessage('MARC LSP server restarted');
    });
    context.subscriptions.push(restartCommand);

    // Show activation message
    vscode.window.showInformationMessage('MARC Language Server is now active!');
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}