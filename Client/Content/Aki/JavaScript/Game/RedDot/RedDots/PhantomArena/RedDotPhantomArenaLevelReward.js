"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RedDotPhantomArenaLevelReward = void 0;
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaLevelReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaMasterInfoUpdate, EventDefine_1.EEventName.RedDotStart]
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardRedDot()
  }
}
exports.RedDotPhantomArenaLevelReward = RedDotPhantomArenaLevelReward;
//# sourceMappingURL=RedDotPhantomArenaLevelReward.js.map