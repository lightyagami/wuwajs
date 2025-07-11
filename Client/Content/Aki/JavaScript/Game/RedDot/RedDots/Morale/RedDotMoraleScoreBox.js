"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMoraleScoreBox = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMoraleScoreBox extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "Morale";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateMoraleScoreBox];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.MoraleModel.RedDotScoreBox();
  }
}
exports.RedDotMoraleScoreBox = RedDotMoraleScoreBox;
//# sourceMappingURL=RedDotMoraleScoreBox.js.map