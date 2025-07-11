"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckIsMulti = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckIsMulti extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    return ModelManager_1.ModelManager.GameModeModel.IsMulti;
  }
}
exports.LevelConditionCheckIsMulti = LevelConditionCheckIsMulti;
//# sourceMappingURL=LevelConditionCheckIsMulti.js.map