"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckEquippedPhantom = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const PhantomBattleDefine_1 = require("../../Module/Phantom/PhantomBattle/PhantomBattleDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class LevelConditionCheckEquippedPhantom extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var n;
    var t;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else {
      n = parseInt(e.LimitParams.get("声骸位置"));
      t = parseInt(e.LimitParams.get("是否装备"));
      if (n && (n <= 0 || n > PhantomBattleDefine_1.MAX_EQUIP_COUNT)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的声骸位置值的范围是[1-${PhantomBattleDefine_1.MAX_EQUIP_COUNT}]`);
        }
        return false;
      } else if (t !== 0 && t !== 1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的是否装备应该是0或1`);
        }
        return false;
      } else {
        return !!(e = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData.GetCurrentRoleConfigId) && (e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(e, n - 1), Boolean(t) === (e !== 0));
      }
    }
  }
}
exports.LevelConditionCheckEquippedPhantom = LevelConditionCheckEquippedPhantom;
//# sourceMappingURL=LevelConditionCheckEquippedPhantom.js.map