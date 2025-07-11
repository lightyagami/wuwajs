"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelCodeConditionCheckGroup = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelCodeConditionCheckGroup extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r, o) {
    return !e || !e.ConditionGroup || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(e.ConditionGroup, r, o);
  }
}
exports.LevelCodeConditionCheckGroup = LevelCodeConditionCheckGroup;
//# sourceMappingURL=LevelCodeConditionCheckGroup.js.map