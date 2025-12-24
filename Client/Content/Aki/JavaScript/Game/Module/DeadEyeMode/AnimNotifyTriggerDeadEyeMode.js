"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TsBaseVehicle_1 = require("../../NewWorld/Vehicle/TsBaseVehicle");
class AnimNotifyTriggerDeadEyeMode extends UE.KuroAnimNotify {
  Constructor() {}
  K2_Notify(e, t) {
    return !!e.IsVisible() && ((e = e.GetOwner()) instanceof TsBaseVehicle_1.default && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDeadEyeModeTrigger, e.EntityId), true);
  }
}
exports.default = AnimNotifyTriggerDeadEyeMode;
//# sourceMappingURL=AnimNotifyTriggerDeadEyeMode.js.map