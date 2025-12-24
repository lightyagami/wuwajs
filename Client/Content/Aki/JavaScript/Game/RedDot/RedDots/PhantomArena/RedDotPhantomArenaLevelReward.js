"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhantomArenaLevelReward = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaLevelReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaMasterInfoUpdate];
  }
  IsMultiple() {
    return true;
  }
  OnCheck(e) {
    return e !== 0 && ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevelRewardRedDot(e);
  }
}
exports.RedDotPhantomArenaLevelReward = RedDotPhantomArenaLevelReward;
//# sourceMappingURL=RedDotPhantomArenaLevelReward.js.map