"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckCalabashLevel = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const ModelManager_1 = require("../../Manager/ModelManager");
class LevelConditionCheckCalabashLevel extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    return !!e.LimitParams && !!(e = e.LimitParams.get("Level")) && ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel() >= Number(e);
  }
}
exports.LevelConditionCheckCalabashLevel = LevelConditionCheckCalabashLevel;
//# sourceMappingURL=LevelConditionCheckCalabashLevel.js.map