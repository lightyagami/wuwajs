"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowEnableHookMark = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowEnableHookMark extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.vq = false;
  }
  Init(e) {
    this.vq = e;
    return this;
  }
  OnExecute() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnableGrapplingHookMark, this.vq);
    this.FinishExecute(true);
  }
}
exports.LevelFlowEnableHookMark = LevelFlowEnableHookMark;
//# sourceMappingURL=LevelFlowEnableHookMark.js.map