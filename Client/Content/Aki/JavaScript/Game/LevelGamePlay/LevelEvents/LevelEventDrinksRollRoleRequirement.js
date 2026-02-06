"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventDrinksRollRoleRequirement = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventDrinksRollRoleRequirement extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    if (e) {
      ControllerHolder_1.ControllerHolder.DrinksController.SelectRoleAndPlaySeq(e.RoleId, 3, e.RequirementId);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 42, "LevelEventDrinksRollRoleRequirement 参数配置错误");
    }
  }
}
exports.LevelEventDrinksRollRoleRequirement = LevelEventDrinksRollRoleRequirement;
//# sourceMappingURL=LevelEventDrinksRollRoleRequirement.js.map