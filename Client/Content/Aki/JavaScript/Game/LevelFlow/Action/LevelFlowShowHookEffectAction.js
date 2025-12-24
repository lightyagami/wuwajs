"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowShowHookEffectAction = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const LevelFlowResourceManager_1 = require("../LevelFlowResourceManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowShowHookEffectAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.E0 = 0;
    this.ynm = StringUtils_1.EMPTY_STRING;
    this.Cnm = 0;
  }
  Init(e, t, s) {
    this.E0 = e;
    this.ynm = t;
    this.Cnm = s;
    return this;
  }
  OnExecute() {
    LevelFlowResourceManager_1.LevelFlowResourceManager.ShowHookEffect(this.E0, this.ynm, this.Cnm);
    this.FinishExecute(true);
  }
}
exports.LevelFlowShowHookEffectAction = LevelFlowShowHookEffectAction;
//# sourceMappingURL=LevelFlowShowHookEffectAction.js.map