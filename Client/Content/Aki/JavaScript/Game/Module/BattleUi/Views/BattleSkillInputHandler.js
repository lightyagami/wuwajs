"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BattleSkillInputHandler = void 0;
const InputFilter_1 = require("../../../Input/InputFilter");
class BattleSkillInputHandler {
  constructor() {
    this.InputFilter = void 0, this.QMc = void 0, this.KMc = void 0, this.InputFilter = new InputFilter_1.InputFilter([], void 0, void 0, void 0)
  }
  InitCallback(t, e) {
    this.QMc = t, this.KMc = e
  }
  SetActionType(t) {
    this.InputFilter.Actions.clear(), this.InputFilter.Actions.add(t)
  }
  GetPriority() {
    return 1
  }
  GetInputFilter() {
    return this.InputFilter
  }
  HandlePressEvent(t, e) {
    this.QMc?.(t)
  }
  HandleReleaseEvent(t, e) {
    this.KMc?.(t)
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