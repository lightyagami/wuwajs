"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowHideHookEffectAction = undefined;
const LevelFlowResourceManager_1 = require("../LevelFlowResourceManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowHideHookEffectAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.E0 = 0;
  }
  Init(e) {
    this.E0 = e;
    return this;
  }
  OnExecute() {
    LevelFlowResourceManager_1.LevelFlowResourceManager.HideHookEffect(this.E0);
    this.FinishExecute(true);
  }
}
exports.LevelFlowHideHookEffectAction = LevelFlowHideHookEffectAction;
//# sourceMappingURL=LevelFlowHideHookEffectAction.js.map