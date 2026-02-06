"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventTriggerGamepadShake = undefined;
const Log_1 = require("../../../Core/Common/Log");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTriggerGamepadShake extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.WCg = {};
  }
  ExecuteNew(e, r, t) {
    if (!e || StringUtils_1.StringUtils.IsBlank(e.KuroForceFeedbackEffect)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 18, "执行行为LevelEventTriggerGamepadShake失败，参数错误");
      }
    } else {
      ControllerHolder_1.ControllerHolder.GamepadController.TriggerGamepadShakeEvent(e, this.WCg);
    }
  }
  OnUpdateGuarantee() {
    var e = {
      Name: "StopGamepadShake",
      Params: this.WCg
    };
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, this.Type, this.BaseContext, e);
  }
}
exports.LevelEventTriggerGamepadShake = LevelEventTriggerGamepadShake;
//# sourceMappingURL=LevelEventTriggerGamepadShake.js.map