"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const vsc = require("vsc-base");
require("src");
function SortImports(content, spaceBetweenImportGroups) {
    return __awaiter(this, void 0, void 0, function* () {
        //Find first node that is not in import
        const imports = mapImports(content);
        if (!imports) {
            return;
        }
        //find last import
        const firstImport = imports.sort((a, b) => a.pos.end - b.pos.end)[0];
        const lastImport = imports[imports.length - 1];
        //sort
        imports.sort((a, b) => a.path.localeCompare(b.path));
        //TODO: sort specifiers (maybe)
        // imports.forEach(imp => {
        //   if (imp.specifiers) {
        //     imp.specifiers.sort((a, b) => a.name.localeCompare(b.name))
        //   }
        //   if (imp.name) {
        //     imp.specifiers.sort((a, b) => a.name.localeCompare(b.name))
        //   }
        // })
        const newImportContent = yield organizeImports(imports, spaceBetweenImportGroups);
        yield vsc.insertAt(newImportContent, firstImport.pos.start, lastImport.pos.end);
    });
}
exports.SortImports = SortImports;
const organizeImports = (imports, spaceBetweenImportGroups) => __awaiter(this, void 0, void 0, function* () {
    // load dependencies to specify global imports
    const [dependencies, devDependencies] = yield vsc.getPackageDependencies();
    const dependencyNames = Object.keys(Object.assign({}, dependencies, devDependencies));
    //split into global / local
    const globalImports = [];
    const absoluteImports = [];
    const localImports = [];
    const directImports = [];
    imports.forEach(_import => {
        const global = !!dependencyNames.find(name => {
            return name.indexOf(_import.path) === 0;
        });
        const local = /^\./.test(_import.path);
        if (!_import.node.importClause) {
            directImports.push(_import);
        }
        else if (global) {
            globalImports.push(_import);
        }
        else if (local) {
            localImports.push(_import);
        }
        else {
            absoluteImports.push(_import);
        }
    });
    const addNewLine = () => {
        if (newImportContent.length > 0) {
            newImportContent += '\n';
            if (spaceBetweenImportGroups) {
                newImportContent += '\n';
            }
        }
    };
    //organize in groups with spaces between
    let newImportContent = "";
    if (globalImports.length > 0) {
        newImportContent += globalImports.map(imp => imp.fullString).join('\n');
    }
    if (absoluteImports.length > 0) {
        addNewLine();
        newImportContent += absoluteImports.map(imp => imp.fullString).join('\n');
    }
    if (localImports.length > 0) {
        addNewLine();
        newImportContent += localImports.map(imp => imp.fullString).join('\n');
    }
    if (directImports.length > 0) {
        addNewLine();
        newImportContent += directImports.map(imp => imp.fullString).join('\n');
    }
    return newImportContent;
});
const mapImports = (content) => {
    const [, firstPos] = vsc.tsFindNodePositionFromContent(content, node => !ts.isSourceFile(node)
        && !ts.isImportDeclaration(node)
        && !(ts.isExpressionStatement(node) && node.expression.getText() === 'use strict'));
    // All imports before first statement, mapped with import path
    const importPos = vsc.tsFindAllNodePositionsFromContent(content, node => ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start));
    const imports = importPos.map(([node, pos], index) => {
        const importNode = node;
        let name = '';
        const fullString = content
            .substring(index === 0 ? pos.start : importPos[index - 1][1].end + 1, pos.end)
            .trim();
        let specifiers = [];
        const importClause = importNode.importClause;
        if (importClause) {
            if (importClause.name) {
                name = importClause.name.getText();
            }
            if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
                specifiers = importClause.namedBindings.elements.map(e => ({
                    fullString: e.getText(),
                    node: e,
                    name: e.name.getText()
                }));
            }
        }
        return ({
            pos,
            name,
            specifiers,
            fullString,
            node: importNode,
            path: importNode.moduleSpecifier
                .getText()
                .replace(/^['"]|['"]$/g, ''),
        });
    });
    return imports;
};
//# sourceMappingURL=SortImports.js.map