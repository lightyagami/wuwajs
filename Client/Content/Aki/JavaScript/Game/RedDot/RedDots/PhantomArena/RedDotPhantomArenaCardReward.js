"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhantomArenaCardReward = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaCardReward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotPhantomArenaCollect";
  }
  IsMultiple() {
    return false;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaCardRewardUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.PhantomArenaModel.GetCardRewardRedDot();
  }
}
exports.RedDotPhantomArenaCardReward = RedDotPhantomArenaCardReward;
//# sourceMappingURL=RedDotPhantomArenaCardReward.js.map