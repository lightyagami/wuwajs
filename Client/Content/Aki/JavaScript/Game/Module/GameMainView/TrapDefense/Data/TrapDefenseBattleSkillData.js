"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBattleSkillData = undefined;
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const InputEnums_1 = require("../../../../Input/InputEnums");
const TDPlayerController_1 = require("../../../../KuroSimpleCombat/TD/TDPlayer/TDPlayerController");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const BattleSkillDataBase_1 = require("../../Data/BattleSkillDataBase");
class TrapDefenseBattleSkillData extends BattleSkillDataBase_1.BattleSkillDataBase {
  constructor() {
    super(...arguments);
    this.LongPressTime = 0;
    this.Config = undefined;
    this.EntityHandle = undefined;
    this.GameplayTagComponent = undefined;
    this.CharacterSkillCdComponent = undefined;
    this.SkillTexturePath = undefined;
    this.IsEnableInternal = true;
    this._hd = false;
  }
  OnInitData() {
    var t;
    this.Config = this.GetSkillDataConfig(this.GetActionName());
    this.EntityHandle = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (this.EntityHandle) {
      t = this.EntityHandle.Entity;
      this.GameplayTagComponent = t.GetComponent(217);
      this.CharacterSkillCdComponent = t.GetComponent(220);
    }
    if (this.Config) {
      this.InitSkill();
    }
  }
  InitSkill() {
    this.RefreshSkillTexturePath();
  }
  GetSkillDataConfig(t) {
    var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseSkillButtonConfigByType(1);
    if (e) {
      for (const i of e) {
        if (i.ActionName === t) {
          return i;
        }
      }
    }
  }
  RefreshSkillTexturePath() {
    if (this.Config) {
      this.SkillTexturePath = this.Config.SkillIcon;
    }
  }
  GetSkillTexturePath() {
    return this.SkillTexturePath;
  }
  RefreshLongPressTime() {
    if (this.Config) {
      this.LongPressTime = this.Config.LongPressTime / CommonDefine_1.MILLIONSECOND_PER_SECOND;
    }
  }
  GetLongPressTime() {
    return this.LongPressTime;
  }
  GetIsLongPressControlCamera() {
    return !!this.Config && this.Config.IsLongPressControlCamera;
  }
  GetActionType() {
    if (this.Config) {
      return this.Config.ButtonType;
    } else {
      return InputEnums_1.EInputAction.None;
    }
  }
  GetButtonType() {
    if (this.Config) {
      return this.Config.ButtonType;
    } else {
      return 0;
    }
  }
  IsEnable() {
    return this.IsEnableInternal;
  }
  SetEnable(t) {
    this.IsEnableInternal = t;
  }
  SetVisible(t) {
    this.IsVisibleInternal = t;
  }
  RefreshSkillCd() {
    if (this.CharacterSkillCdComponent) {
      var t = this.GetGroupSkillCdInfo();
      if (!t || t.RemainingCount <= 0) {
        this.IsEnableInternal = false;
        return;
      }
    }
    this.IsEnableInternal = true;
  }
  SetIsBuilding(t) {
    this._hd = t;
  }
  IsCdVisible() {
    var t;
    return !this._hd && !!(t = TDPlayerController_1.TowerDefensePlayerController.GetFollowerProxyId()) && ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAuxiliaryById(t)?.CDSkill === 1;
  }
  GetSkillIconName() {
    if (this.Config && (this.GetActionName() !== InputMappingsDefine_1.actionMappings.塔防射击 || this._hd)) {
      return this.Config.Name;
    }
  }
}
exports.TrapDefenseBattleSkillData = TrapDefenseBattleSkillData;
//# sourceMappingURL=TrapDefenseBattleSkillData.js.map