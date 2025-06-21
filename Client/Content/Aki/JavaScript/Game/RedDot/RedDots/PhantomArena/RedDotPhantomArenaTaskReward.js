"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RedDotPhantomArenaTaskReward = void 0;
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaTaskReward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotPhantomArenaLimitReward"
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaTaskAwardUpdate]
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PhantomArenaModel.CheckTaskRedDot()
  }
}
exports.RedDotPhantomArenaTaskReward = RedDotPhantomArenaTaskReward;
//# sourceMappingURL=RedDotPhantomArenaTaskReward.js.map