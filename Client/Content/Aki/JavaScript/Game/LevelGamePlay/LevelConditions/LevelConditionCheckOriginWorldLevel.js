"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckOriginWorldLevel = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckOriginWorldLevel extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var l;
    return !!e.LimitParams && !!(e = e.LimitParams.get("Level")) && !!(l = ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel) && l >= parseInt(e);
  }
}
exports.LevelConditionCheckOriginWorldLevel = LevelConditionCheckOriginWorldLevel;
//# sourceMappingURL=LevelConditionCheckOriginWorldLevel.js.map