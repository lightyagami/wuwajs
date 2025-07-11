"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GravityFlipController = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class GravityFlipController extends UiControllerBase_1.UiControllerBase {
  static OnChangeGravityDirection(e) {
    ModelManager_1.ModelManager.GravityFlipModel.GravityFlipComp?.UpdatePrefabState();
  }
  static ListenTeleportCompleteEvent(e) {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    this.PY_ = e;
  }
  static CancelWaitTeleport() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.TeleportComplete, this.Ilt)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    }
    this.PY_?.(3);
  }
}
exports.GravityFlipController = GravityFlipController;
(_a = GravityFlipController).PY_ = undefined;
GravityFlipController.Ilt = (e, t) => {
  EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, _a.Ilt);
  _a.PY_?.(3);
}; //# sourceMappingURL=GravityFlipController.js.map