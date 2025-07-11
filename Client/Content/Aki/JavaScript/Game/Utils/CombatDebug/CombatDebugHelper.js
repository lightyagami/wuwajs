"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombatScriptHelper = undefined;
const AnimHelp_1 = require("./AnimHelp");
const CombatDebugScript_1 = require("./CombatDebugScript");
class CombatScriptHelper extends CombatDebugScript_1.CombatScriptHelperBase {
  OnInit() {
    this.CombatScripts.push(new AnimHelp_1.AnimHelp());
  }
}
exports.CombatScriptHelper = CombatScriptHelper;
//# sourceMappingURL=CombatDebugHelper.js.map