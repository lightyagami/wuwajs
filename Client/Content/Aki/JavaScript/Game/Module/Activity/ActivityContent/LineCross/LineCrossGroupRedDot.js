"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCrossGroupRedDot = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../../RedDot/RedDotBase");
class LineCrossGroupRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshLineCrossGroupRedDot];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.LineCrossModel.GetGroupRedDotState(e);
  }
}
exports.LineCrossGroupRedDot = LineCrossGroupRedDot;
//# sourceMappingURL=LineCrossGroupRedDot.js.map