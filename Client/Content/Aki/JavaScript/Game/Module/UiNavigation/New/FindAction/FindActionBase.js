"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindActionBase = undefined;
class FindActionBase {
  constructor() {
    this.Params = [];
    this.PanelConfig = undefined;
  }
  AddParam(s) {
    this.Params.push(...s);
  }
}
exports.FindActionBase = FindActionBase;
//# sourceMappingURL=FindActionBase.js.map