"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointDrawChallengeRedDot = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../../RedDot/RedDotBase");
class LifePointDrawChallengeRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshLifePointDrawChallengeRedDot];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.LifePointDrawModel.GetChallengeRedDotState(e);
  }
}
exports.LifePointDrawChallengeRedDot = LifePointDrawChallengeRedDot;
//# sourceMappingURL=LifePointDrawChallengeRedDot.js.map