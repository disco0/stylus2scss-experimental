'use strict';
import * as prettier from 'prettier';
import * as stylus from 'stylus';
import * as vscode from 'vscode';

function print(node: any) {
  const compiler = new (stylus.Compiler as any)(node);
  return compiler.compile();
}

function process(node: any): string {
  switch (JSON.parse(JSON.stringify(node)).__type) {
    case 'Root':
      return node.nodes.map((node: any) => process(node)).join('\n');
    case 'Group':
      return `${node.nodes.map((node: any) => print(node)).join('\n')} {
        ${process(node.block)}
      }`;
    case 'Block':
      return node.nodes.map((node: any) => process(node)).join('\n');
    case 'Media':
      return `@media${node.val.nodes.map((node: any) => process(node)).join(' and ')} {
        ${process(node.block)}
    }`;
    case 'Feature':
      return `(${node.segments[0].name}: ${node.expr.nodes[0].name})`;
    case 'Query':
      return node.nodes.map((node: any) => process(node)).join('');
    default:
      return print(node);
  }
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.stylus2scss-experimental', () => {
    try {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.selection.isEmpty
        ? new vscode.Range(
            editor.document.positionAt(0),
            editor.document.positionAt(editor.document.getText().length - 1)
          )
        : editor.selection;
      const styl = editor.document.getText(selection);
      const parser = new (stylus.Parser as any)(styl);
      const ast = parser.parse();
      let result = process(ast);
      try {
        result = prettier.format(result, {
          parser: 'css'
        });
      } catch (e) {}
      editor.edit(edit => {
        edit.replace(selection, result);
      });
    } catch (e) {
      vscode.window.showErrorMessage(e.message);
    }
  });
  context.subscriptions.push(disposable);
}

export function deactivate() {}
