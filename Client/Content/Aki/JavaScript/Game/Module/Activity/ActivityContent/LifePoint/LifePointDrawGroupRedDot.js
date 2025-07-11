"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointDrawGroupRedDot = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../../RedDot/RedDotBase");
class LifePointDrawGroupRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshLifePointDrawGroupRedDot];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.LifePointDrawModel.GetGroupRedDotState(e);
  }
}
exports.LifePointDrawGroupRedDot = LifePointDrawGroupRedDot;
//# sourceMappingURL=LifePointDrawGroupRedDot.js.map