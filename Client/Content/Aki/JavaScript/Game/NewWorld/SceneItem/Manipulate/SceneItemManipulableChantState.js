"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableChantState = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableChantState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor(e, t, n) {
    super(e);
    this.pYi = undefined;
    this.Znr = undefined;
    this.pYi = t;
    this.Znr = n;
  }
  OnEnter() {
    this.StartCameraShake(this.pYi);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddSubCameraTag, this.Znr);
    this.SceneItem.NeedRemoveControllerId = true;
  }
  OnExit() {
    this.StopCameraShake();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveSubCameraTag, this.Znr);
  }
}
exports.SceneItemManipulableChantState = SceneItemManipulableChantState;
//# sourceMappingURL=SceneItemManipulableChantState.js.map