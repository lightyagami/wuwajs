"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillInputHandler = undefined;
const InputFilter_1 = require("../../../Input/InputFilter");
class BattleSkillInputHandler {
  constructor() {
    this.InputFilter = undefined;
    this.QMc = undefined;
    this.KMc = undefined;
    this.InputFilter = new InputFilter_1.InputFilter([], undefined, undefined, undefined);
  }
  InitCallback(t, e) {
    this.QMc = t;
    this.KMc = e;
  }
  SetActionType(t) {
    this.InputFilter.Actions.clear();
    this.InputFilter.Actions.add(t);
  }
  GetPriority() {
    return 1;
  }
  GetInputFilter() {
    return this.InputFilter;
  }
  HandlePressEvent(t, e) {
    this.QMc?.(t);
  }
  HandleReleaseEvent(t, e) {
    this.KMc?.(t);
  }
  HandleHoldEvent(t, e) {}
  HandleInputAxis(t, e) {}
  ClearInputAxis(t) {}
  ClearSingleAxisInput(t, e) {}
  PreProcessInput(t, e) {}
  PostProcessInput(t, e) {}
}
exports.BattleSkillInputHandler = BattleSkillInputHandler;
//# sourceMappingURL=BattleSkillInputHandler.js.map