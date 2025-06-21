"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RedDotPhantomArenaBadgeReward = void 0;
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaBadgeReward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotPhantomArenaCollect"
  }
  IsMultiple() {
    return !1
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate]
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardRedDot()
  }
}
exports.RedDotPhantomArenaBadgeReward = RedDotPhantomArenaBadgeReward;
//# sourceMappingURL=RedDotPhantomArenaBadgeReward.js.map