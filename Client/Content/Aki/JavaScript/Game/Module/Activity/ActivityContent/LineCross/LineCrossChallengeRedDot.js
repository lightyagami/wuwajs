"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCrossChallengeRedDot = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../../RedDot/RedDotBase");
class LineCrossChallengeRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshLineCrossChallengeRedDot];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.LineCrossModel.GetChallengeRedDotState(e);
  }
}
exports.LineCrossChallengeRedDot = LineCrossChallengeRedDot;
//# sourceMappingURL=LineCrossChallengeRedDot.js.map