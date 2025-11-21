"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBattleExploreSkillData = undefined;
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const TrapDefenseBattleSkillData_1 = require("./TrapDefenseBattleSkillData");
const SKILL_NONE_PATH = "T_IconSkillNone";
class TrapDefenseBattleExploreSkillData extends TrapDefenseBattleSkillData_1.TrapDefenseBattleSkillData {
  constructor() {
    super(...arguments);
    this.ExploreSkillId = undefined;
  }
  get cWc() {
    return ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn;
  }
  RefreshSkillTexturePath() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(SKILL_NONE_PATH);
    var t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseItemByExploreToolId(this.ExploreSkillId);
    if (!t || !(t = ModelManager_1.ModelManager.TrapDefenseModel?.BattleInventoryData.GetItemData(t.Id)) || t.InventoryCount <= 0) {
      this.SkillTexturePath = e;
    } else {
      this.SkillTexturePath = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillIcon;
      if (!this.SkillTexturePath) {
        if (this.Config) {
          this.SkillTexturePath = this.Config.SkillIcon;
        } else {
          this.SkillTexturePath = e;
        }
      }
    }
  }
  IsEnableLongPress() {
    return true;
  }
  IsEnableInput() {
    return this.IsEnableInternal;
  }
  IsEquippedItemBanReqUse() {
    return !!this.cWc && ModelManager_1.ModelManager.RouletteModel.IsEquippedItemBanReqUse();
  }
  IsSkillInItemUseCd() {
    return this.IsSkillInItemUseBuffCd() || this.IsSkillInItemUseSkillCd();
  }
  IsSkillInItemUseBuffCd() {
    return !!this.cWc && !this.IsExploreAsFight && ModelManager_1.ModelManager.RouletteModel.IsEquipItemInBuffCd();
  }
  IsSkillInItemUseSkillCd() {
    if (this.cWc && this.CharacterSkillCdComponent && !this.IsExploreAsFight) {
      var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId)?.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill);
      if (e) {
        return this.CharacterSkillCdComponent.GetGroupSkillCdInfo(e)?.CurRemainingCd - TimeUtil_1.TimeUtil.TimeDeviation > 0;
      }
    }
    return false;
  }
  GetEquippedItemUsingBuffCd() {
    var e;
    var t;
    if (this.cWc) {
      e = ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId;
      return [(t = ModelManager_1.ModelManager.BuffItemModel).GetBuffItemRemainCdTime(e), t.GetBuffItemTotalCdTime(e)];
    } else {
      return [0, 0];
    }
  }
  GetEquippedItemUsingSkillCd() {
    if (this.cWc && this.CharacterSkillCdComponent) {
      var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId)?.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill);
      if (e) {
        return [(e = this.CharacterSkillCdComponent.GetGroupSkillCdInfo(e)).CurRemainingCd, e.CurMaxCd];
      }
    }
    return [0, 0];
  }
  GetSkillId() {
    return this.ExploreSkillId;
  }
  SetExploreSkillId(e) {
    var t = this.ExploreSkillId !== e;
    this.ExploreSkillId = e;
    this.SetExploreSkillChange(t);
    this.RefreshSkillTexturePath();
  }
  RefreshSkillCd() {
    if (this.cWc && !this.IsExploreAsFight && (this.IsEquippedItemBanReqUse() || this.IsSkillInItemUseCd())) {
      this.IsEnableInternal = false;
    } else {
      super.RefreshSkillCd();
    }
  }
}
exports.TrapDefenseBattleExploreSkillData = TrapDefenseBattleExploreSkillData;
//# sourceMappingURL=TrapDefenseBattleExploreSkillData.js.map