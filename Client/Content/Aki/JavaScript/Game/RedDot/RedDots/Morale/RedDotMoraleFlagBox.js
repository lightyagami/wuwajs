"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RedDotMoraleFlagBox = void 0;
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotMoraleFlagBox extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "Morale"
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateMoraleFlagBox]
  }
  OnCheck() {
    return ModelManager_1.ModelManager.MoraleModel.RedDotFlagBox()
  }
}
exports.RedDotMoraleFlagBox = RedDotMoraleFlagBox;
//# sourceMappingURL=RedDotMoraleFlagBox.js.map