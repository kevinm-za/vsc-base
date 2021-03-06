'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vsc = require("vsc-base");
const SortImports_1 = require("./cleaners/SortImports");
class CleanCode {
    getConfig(property, defaultValue) {
        return vsc.getConfig('vscOrganizeImports', property, defaultValue);
    }
    run(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uri) {
                return;
            }
            const content = vsc.getDocumentContent();
            if (!content) {
                return;
            }
            //load settings:
            const spaceBetweenImportGroups = this.getConfig('spaceBetweenImportGroups', true);
            yield SortImports_1.SortImports(content, spaceBetweenImportGroups);
        });
    }
}
exports.default = CleanCode;
//# sourceMappingURL=CleanCode.js.map