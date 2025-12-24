"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhantomArenaActivity = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaActivity extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaChallengeUpdate, EventDefine_1.EEventName.OnPhantomArenaMasterInfoUpdate, EventDefine_1.EEventName.OnPhantomArenaRoleRewardUpdate, EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate, EventDefine_1.EEventName.OnPhantomArenaBadgeRewardUpdate, EventDefine_1.EEventName.OnPhantomArenaTaskAwardUpdate, EventDefine_1.EEventName.OnPhantomArenaShopOpen];
  }
  IsMultiple() {
    return true;
  }
  OnCheck(e) {
    return e !== 0 && ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaButtonRedDot(e);
  }
}
exports.RedDotPhantomArenaActivity = RedDotPhantomArenaActivity;
//# sourceMappingURL=RedDotPhantomArenaActivity.js.map