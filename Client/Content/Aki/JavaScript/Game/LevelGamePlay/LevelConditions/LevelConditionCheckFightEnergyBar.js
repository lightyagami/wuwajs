"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckFightEnergyBar = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const Log_1 = require("../../../Core/Common/Log");
class LevelConditionCheckFightEnergyBar extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var t;
    var i;
    var o;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else if ((t = Number(e.LimitParams.get("机制条状态"))) < 0 || t > 2) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的机制条状态只能是0，1`);
      }
      return false;
    } else {
      e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (i = this.GetCurrentSpecialEnergyAttributeId(e.Entity)) {
        o = e.Entity.GetComponent(173)?.GetCurrentValue(i.AttributeId);
        e = e.Entity.GetComponent(173)?.GetCurrentValue(i.MaxAttributeId);
        return o === 0 && t === 0 || o > 0 && o < e && t === 2 || e <= o && t === 1;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 16, "查询角色特殊能量条属性错误");
        }
        return false;
      }
    }
  }
  GetCurrentSpecialEnergyAttributeId(e) {
    var r = e.GetComponent(205);
    if (r) {
      e = this.GetRoleConfig(e);
      if (e) {
        e = e.SpecialEnergyBarId;
        e = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(e);
        if (e) {
          if (!e.TagEnergyBarIdMap || e.TagEnergyBarIdMap.size <= 0) {
            return {
              AttributeId: e.AttributeId,
              MaxAttributeId: e.MaxAttributeId
            };
          }
          for (var [t, i] of e.TagEnergyBarIdMap) {
            if (r.HasTag(t)) {
              t = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(i);
              if (t) {
                return {
                  AttributeId: t.AttributeId,
                  MaxAttributeId: t.MaxAttributeId
                };
              }
            }
          }
        }
      }
    }
  }
  GetRoleConfig(e) {
    e = e.GetComponent(0);
    if (e) {
      e = e.GetRoleId();
      e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
      if (e) {
        return e.GetRoleConfig();
      }
    }
  }
  GetDefaultSpecialEnergyAttributeId(e) {
    e = this.GetRoleConfig(e);
    if (e) {
      e = e.SpecialEnergyBarId;
      e = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(e);
      if (e) {
        return {
          AttributeId: e.AttributeId,
          MaxAttributeId: e.MaxAttributeId
        };
      }
    }
  }
}
exports.LevelConditionCheckFightEnergyBar = LevelConditionCheckFightEnergyBar;
//# sourceMappingURL=LevelConditionCheckFightEnergyBar.js.map