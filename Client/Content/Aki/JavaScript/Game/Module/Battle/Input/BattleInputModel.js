"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleInputModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputController_1 = require("../../../Input/InputController");
const InputEnums_1 = require("../../../Input/InputEnums");
const VisibleStateUtil_1 = require("../../BattleUi/VisibleStateUtil");
class BattleInputModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Waa = [];
    this.EQe = [];
  }
  OnInit() {
    this.Waa.length = 0;
    for (let t = this.EQe.length = 0; t < 16; t++) {
      this.Waa.push(0);
      this.EQe.push(0);
    }
    return true;
  }
  GetInputEnable(t) {
    return this.Waa[t] === 0;
  }
  GetInputVisible(t) {
    return this.EQe[t] === 0;
  }
  SetInputEnable(t, e, n) {
    var i = this.Waa[t];
    if (!e && i === 0 && InputController_1.InputController.IsKeyDown(t) && (InputController_1.InputController.InputAction(t, 2), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Battle", 17, "禁用输入时，该输入已按下，立即执行放开操作", ["action", t]);
    }
    var e = VisibleStateUtil_1.VisibleStateUtil.SetVisible(i, e, n);
    if (i !== (this.Waa[t] = e)) {
      this.Qaa(t, e === 0);
    }
  }
  SetInputVisible(t, e, n) {
    var i = this.EQe[t];
    var e = VisibleStateUtil_1.VisibleStateUtil.SetVisible(i, e, n);
    if (i !== (this.EQe[t] = e)) {
      this.fXe(t, e === 0);
    }
  }
  SetAllInputEnable(e, n) {
    var i = InputEnums_1.EInputAction.MaxCount;
    for (let t = 0; t < i; t++) {
      this.SetInputEnable(t, e, n);
    }
  }
  SetAllInputVisible(e, n) {
    var i = InputEnums_1.EInputAction.MaxCount;
    for (let t = 0; t < i; t++) {
      this.SetInputVisible(t, e, n);
    }
  }
  SetAllInputEnableWithIgnoreSet(e, n, i) {
    var r = InputEnums_1.EInputAction.MaxCount;
    for (let t = 0; t < r; t++) {
      this.SetInputEnable(t, n.has(t) !== e, i);
    }
  }
  Qaa(t, e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleInputEnableChanged, t, e);
  }
  fXe(t, e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleInputVisibleChanged, t, e);
  }
}
exports.BattleInputModel = BattleInputModel;
//# sourceMappingURL=BattleInputModel.js.map