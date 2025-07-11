"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetPlayerMoveControl = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetPlayerMoveControl extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.xRe = false;
  }
  ExecuteNew(e, t) {
    if (e) {
      this.xRe = (e = e).Forward === 1 && e.Back === 1 && e.Left === 1 && e.Right === 1;
      ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(e.Forward === 1, e.Back === 1, e.Left === 1, e.Right === 1);
    }
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(this.xRe ? EventDefine_1.EEventName.RemGuaranteeAction : EventDefine_1.EEventName.AddGuaranteeAction, this.Type, this.BaseContext, {
      Name: "EnablePlayerMoveControl"
    });
  }
}
exports.LevelEventSetPlayerMoveControl = LevelEventSetPlayerMoveControl;
//# sourceMappingURL=LevelEventSetPlayerMoveControl.js.map