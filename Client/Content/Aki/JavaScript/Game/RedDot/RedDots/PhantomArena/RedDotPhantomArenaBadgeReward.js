"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhantomArenaBadgeReward = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaBadgeReward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotPhantomArenaCollect";
  }
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate];
  }
  OnCheck(e) {
    return e !== 0 && ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeRewardRedDot(e);
  }
}
exports.RedDotPhantomArenaBadgeReward = RedDotPhantomArenaBadgeReward;
//# sourceMappingURL=RedDotPhantomArenaBadgeReward.js.map