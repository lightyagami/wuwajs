"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RedDotPhantomArenaCardReward = void 0;
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaCardReward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotPhantomArenaCollect"
  }
  IsMultiple() {
    return !1
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate]
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardRedDot()
  }
}
exports.RedDotPhantomArenaCardReward = RedDotPhantomArenaCardReward;
//# sourceMappingURL=RedDotPhantomArenaCardReward.js.map