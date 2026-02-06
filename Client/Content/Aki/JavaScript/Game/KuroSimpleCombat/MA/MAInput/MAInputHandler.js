"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowBlockHandler = exports.MotorcycleArrowInputHandler = undefined;
const InputEnums_1 = require("../../../Input/InputEnums");
const InputFilter_1 = require("../../../Input/InputFilter");
const InputFilterManager_1 = require("../../../Input/InputFilterManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterInputComponent_1 = require("../../../NewWorld/Character/Common/Component/CharacterInputComponent");
const MOTORARROW_PRIORITY = 100;
const MOTORARROW_BLOCK_PRIORITY = 99;
class MotorcycleArrowInputHandler {
  constructor() {
    this.InputGroup = undefined;
    this.AxisValues = new Map();
    this.H6r = new Array();
    this.Cyg = 0;
  }
  Init() {
    this.InputGroup = new InputFilter_1.InputFilter(InputFilterManager_1.InputFilterManager.CharacterActions, undefined, InputFilterManager_1.InputFilterManager.CharacterAxes, undefined);
  }
  GetPriority() {
    return MOTORARROW_PRIORITY;
  }
  GetInputFilter() {
    if (!this.InputGroup) {
      this.Init();
    }
    return this.InputGroup;
  }
  HandlePressEvent(e, t) {
    if (ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(e)) {
      this.H6r.push(new CharacterInputComponent_1.InputEvent(e, 1, t, this.Cyg++));
    }
  }
  HandleReleaseEvent(e, t) {}
  HandleHoldEvent(e, t) {}
  HandleInputAxis(e, t) {
    if (e === InputEnums_1.EInputAxis.MoveRight) {
      this.AxisValues.set(e, t);
    }
  }
  ClearInputAxis(e) {
    this.AxisValues.clear();
  }
  ClearSingleAxisInput(e, t) {
    if (this.AxisValues.has(e)) {
      this.AxisValues.delete(e);
    }
  }
  PreProcessInput(e, t) {}
  PostProcessInput(e, t) {
    var r = this.GetController();
    if (r) {
      var n = this.AxisValues.get(InputEnums_1.EInputAxis.MoveRight) ?? 0;
      r.MoveRight(n, e);
      for (const o of this.H6r) {
        if (o.Action === InputEnums_1.EInputAction.跳跃) {
          r.ExecSkillAction();
        }
      }
      this.H6r.length = 0;
    }
  }
  GetController() {
    var e = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubController;
    if (e) {
      return e;
    }
  }
}
exports.MotorcycleArrowInputHandler = MotorcycleArrowInputHandler;
class MotorcycleArrowBlockHandler {
  Init() {}
  GetPriority() {
    return MOTORARROW_BLOCK_PRIORITY;
  }
  GetInputFilter() {
    return new InputFilter_1.InputFilter(undefined, InputFilterManager_1.InputFilterManager.CharacterActions, undefined, InputFilterManager_1.InputFilterManager.CharacterAxes);
  }
  HandlePressEvent(e, t) {}
  HandleReleaseEvent(e, t) {}
  HandleHoldEvent(e, t) {}
  HandleInputAxis(e, t) {}
  ClearInputAxis(e) {}
  ClearSingleAxisInput(e, t) {}
  PreProcessInput(e, t) {}
  PostProcessInput(e, t) {}
}
exports.MotorcycleArrowBlockHandler = MotorcycleArrowBlockHandler;
//# sourceMappingURL=MAInputHandler.js.map