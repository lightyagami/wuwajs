"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueBattleSkillData = undefined;
const InputEnums_1 = require("../../../../Input/InputEnums");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const BattleSkillDataBase_1 = require("../../Data/BattleSkillDataBase");
class SurvivorsRogueBattleSkillData extends BattleSkillDataBase_1.BattleSkillDataBase {
  constructor(t) {
    super();
    this.bSo = true;
    this.wmo = undefined;
    this.FUd = undefined;
    this.ESo = undefined;
    this.SSo = undefined;
    this.sDe = undefined;
    this.TSo = undefined;
    this.LSo = undefined;
    this.NUd = true;
    this.wmo = t;
  }
  OnInitData() {
    var t;
    if (this.wmo) {
      this.sDe = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (this.sDe) {
        t = this.sDe.Entity;
        this.LSo = t.GetComponent(211);
        this.TSo = t.GetComponent(40);
      }
      if (this.GetActionName() === InputMappingsDefine_1.actionMappings.闪避) {
        this.NUd = false;
        this.ESo = this.TSo.GetSkillInfo(this.wmo);
      } else {
        this.FUd = this.VUd();
      }
      this.SSo = this.LSo?.GetGroupSkillCdInfo(this.wmo);
    }
  }
  VUd() {
    var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSkillButtonConfigByType(2);
    if (t) {
      var i = ModelManager_1.ModelManager.SurvivorsRogueModel.CurRoleId;
      for (const e of t) {
        if (e.ActionName === this.GetActionName() && e.RoleId === i) {
          return e;
        }
      }
    }
  }
  RefreshSkillCd() {
    if (this.LSo) {
      var t = this.GetGroupSkillCdInfo();
      if (!t || t.RemainingCount <= 0) {
        this.bSo = false;
        return;
      }
    }
    this.bSo = true;
  }
  GetSkillId() {
    return this.wmo;
  }
  GetSkillTexturePath() {
    if (this.GetActionName() === InputMappingsDefine_1.actionMappings.闪避) {
      return this.ESo?.SkillIcon?.AssetPathName.toString();
    } else {
      return this.FUd?.SkillIcon;
    }
  }
  GetActionType() {
    if (this.FUd) {
      return this.FUd.ButtonType;
    } else {
      return InputEnums_1.EInputAction.闪避;
    }
  }
  GetButtonType() {
    if (this.FUd) {
      return this.FUd.ButtonType;
    } else {
      return InputEnums_1.EInputAction.闪避;
    }
  }
  IsEnable() {
    return this.bSo;
  }
  GetGroupSkillCdInfo() {
    return this.SSo;
  }
  HasCdComponent() {
    return true;
  }
  GetSkillRemainingCoolDown() {
    if (this.SSo) {
      return this.SSo.CurRemainingCd;
    } else {
      return 0;
    }
  }
  IsCdVisible() {
    return this.NUd;
  }
}
exports.SurvivorsRogueBattleSkillData = SurvivorsRogueBattleSkillData;
//# sourceMappingURL=SurvivorsRogueBattleSkillData.js.map