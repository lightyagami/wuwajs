"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RedDotPhantomArenaActivity = void 0;
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaActivity extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate, EventDefine_1.EEventName.OnPhantomArenaMasterInfoUpdate, EventDefine_1.EEventName.OnPhantomArenaRoleRewardUpdate, EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate, EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate, EventDefine_1.EEventName.OnPhantomArenaTaskAwardUpdate, EventDefine_1.EEventName.OnPhantomArenaShopOpen]
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaButtonRedDot()
  }
}
exports.RedDotPhantomArenaActivity = RedDotPhantomArenaActivity;
//# sourceMappingURL=RedDotPhantomArenaActivity.js.map