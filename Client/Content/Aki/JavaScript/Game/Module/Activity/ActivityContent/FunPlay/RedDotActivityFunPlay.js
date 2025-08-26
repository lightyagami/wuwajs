"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotActivityFunPlay = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../../RedDot/RedDotBase");
class RedDotActivityFunPlay extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshActivityFunPlayRedDot];
  }
  OnCheck(e) {
    e = ModelManager_1.ModelManager.ActivityFunPlayModel.GetChallengeData(e);
    return !!e && e.GetRedPoint();
  }
}
exports.RedDotActivityFunPlay = RedDotActivityFunPlay;
//# sourceMappingURL=RedDotActivityFunPlay.js.map