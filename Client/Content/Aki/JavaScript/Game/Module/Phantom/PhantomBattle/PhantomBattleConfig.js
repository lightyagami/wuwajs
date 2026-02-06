"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleConfig = exports.COSTLIST = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ItemInfoById_1 = require("../../../../Core/Define/ConfigQuery/ItemInfoById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const PhantomExpItemAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomExpItemAll");
const PhantomExpItemByItemId_1 = require("../../../../Core/Define/ConfigQuery/PhantomExpItemByItemId");
const PhantomFetterAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterAll");
const PhantomFetterById_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterById");
const PhantomFetterGroupAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterGroupAll");
const PhantomFetterGroupById_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterGroupById");
const PhantomGrowthByGrowthIdAndLevel_1 = require("../../../../Core/Define/ConfigQuery/PhantomGrowthByGrowthIdAndLevel");
const PhantomItemAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomItemAll");
const PhantomItemByItemId_1 = require("../../../../Core/Define/ConfigQuery/PhantomItemByItemId");
const PhantomItemByMonsterId_1 = require("../../../../Core/Define/ConfigQuery/PhantomItemByMonsterId");
const PhantomItemByParentMonsterId_1 = require("../../../../Core/Define/ConfigQuery/PhantomItemByParentMonsterId");
const PhantomLevelByGroupId_1 = require("../../../../Core/Define/ConfigQuery/PhantomLevelByGroupId");
const PhantomLevelByGroupIdAndLevel_1 = require("../../../../Core/Define/ConfigQuery/PhantomLevelByGroupIdAndLevel");
const PhantomMainPropertyById_1 = require("../../../../Core/Define/ConfigQuery/PhantomMainPropertyById");
const PhantomMainPropertyByRandGroupId_1 = require("../../../../Core/Define/ConfigQuery/PhantomMainPropertyByRandGroupId");
const PhantomMainPropItemById_1 = require("../../../../Core/Define/ConfigQuery/PhantomMainPropItemById");
const PhantomQualityByQuality_1 = require("../../../../Core/Define/ConfigQuery/PhantomQualityByQuality");
const PhantomRarityAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomRarityAll");
const PhantomRarityByRare_1 = require("../../../../Core/Define/ConfigQuery/PhantomRarityByRare");
const PhantomSkillById_1 = require("../../../../Core/Define/ConfigQuery/PhantomSkillById");
const PhantomSkillByPhantomSkillId_1 = require("../../../../Core/Define/ConfigQuery/PhantomSkillByPhantomSkillId");
const PhantomSubPropertyById_1 = require("../../../../Core/Define/ConfigQuery/PhantomSubPropertyById");
const PhantomSubPropertyByPropId_1 = require("../../../../Core/Define/ConfigQuery/PhantomSubPropertyByPropId");
const PhantomVicePolishConfigAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomVicePolishConfigAll");
const PhantomVicePolishConfigByPropCount_1 = require("../../../../Core/Define/ConfigQuery/PhantomVicePolishConfigByPropCount");
const PhantomWildItemAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomWildItemAll");
const TrailPhantomPropById_1 = require("../../../../Core/Define/ConfigQuery/TrailPhantomPropById");
const TrialPhantomPropItemById_1 = require("../../../../Core/Define/ConfigQuery/TrialPhantomPropItemById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const COST3 = 3;
const COST1 = 1;
exports.COSTLIST = [1, 3, 4];
class PhantomBattleConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.jVi = new Map();
  }
  GetPhantomItemList() {
    var e = PhantomItemAll_1.configPhantomItemAll.GetConfigList();
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象道具配置列表失败, 请检查配置表");
      }
    }
    return e;
  }
  GetPhantomItemById(e) {
    var t = PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(e);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象道具配置失败, 请检查配置表", ["id", e]);
      }
    }
    return t;
  }
  GetPhantomItemByParentMonsterId(e) {
    return PhantomItemByParentMonsterId_1.configPhantomItemByParentMonsterId.GetConfigList(e);
  }
  GetPhantomItemByMonsterId(e) {
    return PhantomItemByMonsterId_1.configPhantomItemByMonsterId.GetConfigList(e);
  }
  GetPhantomSkillList(e) {
    var t = PhantomSkillByPhantomSkillId_1.configPhantomSkillByPhantomSkillId.GetConfigList(e);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象技能配置列表失败, 请检查配置表", ["SkillId", e]);
      }
    }
    return t;
  }
  GetPhantomSkillDescExByPhantomSkillIdAndQuality(e, t = 2) {
    var e = PhantomSkillByPhantomSkillId_1.configPhantomSkillByPhantomSkillId.GetConfigList(e)[0];
    var r = e.LevelDescStrArray.length;
    return (r < t ? e.LevelDescStrArray[r - 1] : e.LevelDescStrArray[t - 1]).ArrayString;
  }
  GetPhantomSkillDescExBySkillIdAndQuality(e, t = 2) {
    var e = PhantomSkillById_1.configPhantomSkillById.GetConfig(e);
    var r = e.LevelDescStrArray.length;
    return (r < t ? e.LevelDescStrArray[r - 1] : e.LevelDescStrArray[t - 1]).ArrayString;
  }
  GetPhantomSkillDescStringBySkillIdAndQuality(e, t = 2) {
    t = this.GetPhantomSkillDescExBySkillIdAndQuality(e, t);
    e = PhantomSkillById_1.configPhantomSkillById.GetConfig(e).DescriptionEx;
    e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    return StringUtils_1.StringUtils.Format(e, ...t);
  }
  GetPhantomSkillBySkillId(e) {
    var t = PhantomSkillByPhantomSkillId_1.configPhantomSkillByPhantomSkillId.GetConfigList(e);
    if (t?.length === 0 && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 27, "获取幻象技能配置失败, 请检查配置表, 也可能是探索技能", ["SkillId", e]);
    }
    return t[0];
  }
  GetPhantomRareConfig(e) {
    return PhantomRarityByRare_1.configPhantomRarityByRare.GetConfig(e);
  }
  GetPhantomRareConfigAll() {
    var e = PhantomRarityAll_1.configPhantomRarityAll.GetConfigList();
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 75, "获取幻象洗炼材料配置失败, 请检查配置表");
      }
    }
    return e;
  }
  GetPhantomVicePolishConfigAll() {
    var e = PhantomVicePolishConfigAll_1.configPhantomVicePolishConfigAll.GetConfigList();
    if (e === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Phantom", 75, "获取幻象辅音洗炼材料配置失败, 请检查配置表");
    }
    return e;
  }
  GetPhantomQualityByItemQuality(e) {
    var t = PhantomQualityByQuality_1.configPhantomQualityByQuality.GetConfig(e);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象品质配置失败, 请检查配置表", ["id", e]);
      }
    }
    return t;
  }
  GetPhantomMainPropertyById(e) {
    var t = PhantomMainPropertyById_1.configPhantomMainPropertyById.GetConfig(e);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象主属性配置失败, 请检查配置表", ["id", e]);
      }
    }
    return t;
  }
  GetPhantomMainPropertyByRandGroupId(e) {
    var t = PhantomMainPropertyByRandGroupId_1.configPhantomMainPropertyByRandGroupId.GetConfigList(e);
    if (t) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Phantom", 75, "获取幻象主属性方案组失败, 请检查配表", ["id", e]);
    }
  }
  GetPhantomMainPropertyItemId(e) {
    var t = PhantomMainPropItemById_1.configPhantomMainPropItemById.GetConfig(e);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象主属性配置失败, 请检查配置表", ["id", e]);
      }
    }
    return t;
  }
  GetPhantomSubPropertyById(e) {
    var t = PhantomSubPropertyById_1.configPhantomSubPropertyById.GetConfig(e);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象属性配置失败, 请检查配置表", ["id", e]);
      }
    }
    return t;
  }
  GetPhantomFetterList() {
    var e = PhantomFetterAll_1.configPhantomFetterAll.GetConfigList();
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象羁绊配置列表失败, 请检查配置表");
      }
    }
    return e;
  }
  GetPhantomFetterGroupList() {
    var e = PhantomFetterGroupAll_1.configPhantomFetterGroupAll.GetConfigList();
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象羁绊配置列表失败, 请检查配置表");
      }
    }
    return e;
  }
  GetPhantomFetterById(e) {
    var t = PhantomFetterById_1.configPhantomFetterById.GetConfig(e);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象羁绊配置失败, 请检查配置表", ["Id", e]);
      }
    }
    return t;
  }
  GetPhantomLevelExpByGroupIdAndLevel(e, t) {
    var r = PhantomLevelByGroupIdAndLevel_1.configPhantomLevelByGroupIdAndLevel.GetConfig(e, t);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象升级消耗配置失败, 请检查配置表", ["groupId", e], ["level", t]);
      }
    }
    return r.Exp;
  }
  GetPhantomLevelListByGroupId(e) {
    var t = PhantomLevelByGroupId_1.configPhantomLevelByGroupId.GetConfigList(e);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象升级消耗配置列表失败, 请检查配置表", ["groupId", e]);
      }
    }
    return t;
  }
  GetItemInfoById(e) {
    var t = ItemInfoById_1.configItemInfoById.GetConfig(e);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取道具配置失败, 请检查配置表", ["itemId", e]);
      }
    }
    return t;
  }
  GetPhantomExpItemById(e) {
    var t = PhantomExpItemByItemId_1.configPhantomExpItemByItemId.GetConfig(e);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象经验道具配置失败, 请检查配置表", ["itemId", e]);
      }
    }
    return t;
  }
  GetPhantomExpItemList() {
    return PhantomExpItemAll_1.configPhantomExpItemAll.GetConfigList();
  }
  GetPhantomWildItem() {
    return PhantomWildItemAll_1.configPhantomWildItemAll.GetConfigList();
  }
  GetPhantomGrowthValueByGrowthIdAndLevel(e, t) {
    var r = PhantomGrowthByGrowthIdAndLevel_1.configPhantomGrowthByGrowthIdAndLevel.GetConfig(e, t);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取幻象成长曲线值配置失败, 请检查配置表", ["growthId", e], ["level", t]);
      }
    }
    return r.Value;
  }
  GetPhantomSubPropertyByPropId(e) {
    return PhantomSubPropertyByPropId_1.configPhantomSubPropertyByPropId.GetConfigList(e);
  }
  GetPhantomLevelUpCostRatio() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomLevelUpCoinCost") / 1000;
  }
  GetTrailPhantomPropItemById(e) {
    var t = TrialPhantomPropItemById_1.configTrialPhantomPropItemById.GetConfig(e);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "获取configTrialPhantomPropItemById, 请检查配置表", ["id", e]);
      }
    }
    return t.Prop;
  }
  GetQualityIdentifyCost(e) {
    return this.GetPhantomQualityByItemQuality(e).IdentifyCoin;
  }
  GetFetterGroupById(e) {
    return PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(e);
  }
  GetFetterGroupMaxCountById(e) {
    e = this.GetFetterGroupById(e).FetterMap;
    return Math.max(...e.keys());
  }
  GetFetterGroupFetterDataById(e) {
    return PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(e).FetterMap;
  }
  GetFetterGroupArray() {
    return PhantomFetterGroupAll_1.configPhantomFetterGroupAll.GetConfigList();
  }
  GetFetterGroupSourceMonster(t) {
    var e = this.GetPhantomItemList();
    const r = new Array();
    e.forEach(e => {
      if (e.PhantomType === 1 && !e.ParentMonsterId && e.FetterGroup.includes(t)) {
        r.push(e.MonsterId);
      }
    });
    return r;
  }
  GetFetterMapResultBySuitMap(e) {
    const a = new Map();
    e.forEach((r, e) => {
      var t = PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(e).FetterMap;
      let o = 0;
      let n = 0;
      const i = new Map();
      t.forEach((e, t) => {
        if (t <= r) {
          o = e;
          n = t;
        }
        if (o > 0) {
          i.set(o, n);
        }
      });
      if (i.size > 0) {
        a.set(e, i);
      }
    });
    return a;
  }
  GetFetterResultBySuitMap(e) {
    const t = new Array();
    e.forEach((r, e) => {
      e = PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(e).FetterMap;
      let o = 0;
      e.forEach((e, t) => {
        if (t <= r) {
          o = e;
        }
      });
      if (o > 0) {
        t.push(o);
      }
    });
    return t;
  }
  GetPhantomQualityBgSprite(e) {
    if (e === undefined || e === 0) {
      return CommonParamById_1.configCommonParamById.GetStringConfig("VisionQualityDefaultSprite");
    } else {
      return this.GetPhantomQualityByItemQuality(e).QualitySprite;
    }
  }
  GetPhantomSlotUnlockLevel(e) {
    return this.GetPhantomQualityByItemQuality(e).SlotUnlockLevel;
  }
  GetPhantomIdentifyCost(e) {
    return this.GetPhantomQualityByItemQuality(e).IdentifyCost;
  }
  GetMonsterIdName(e) {
    e = this.GetPhantomItemByMonsterId(e);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e[0].MonsterName);
  }
  GetFetterNameByFetterNameId(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
  }
  GetTrialPhantomPropConfig(e) {
    return TrailPhantomPropById_1.configTrailPhantomPropById.GetConfig(e);
  }
  GetVisionLevelUpQualityLimit() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionHighQuality");
  }
  GetVisionLevelUpRareLimit() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionHighRare");
  }
  GetVisionLevelUpLevelLimit() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionHighLevel");
  }
  GetVisionScrollerMoveDistance() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionScrollerMoveDistance");
  }
  GetVisionScrollerPressTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionScrollerLongPressTime");
  }
  GetVisionBeforeScrollerLongPressTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionBeforeScrollerLongPressTime");
  }
  GetVisionScrollerOffsetX() {
    if (Info_1.Info.IsInTouch()) {
      return CommonParamById_1.configCommonParamById.GetFloatConfig("VisionScrollerOffsetX");
    } else {
      return 0;
    }
  }
  GetVisionScrollerOffsetY() {
    if (Info_1.Info.IsInTouch()) {
      return CommonParamById_1.configCommonParamById.GetFloatConfig("VisionScrollerOffsetY");
    } else {
      return 0;
    }
  }
  GetVisionScrollerOffsetXDir() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionScrollerOffsetXDir");
  }
  GetVisionScrollerOffsetYDir() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionScrollerOffsetYDir");
  }
  GetVisionDragCurve() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionDragCurve");
  }
  GetVisionDragCurveTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionDragAnimationTime");
  }
  GetFilterOwnTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionFilterSpriteOwn");
  }
  GetFilterNotOwnTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionFilterSpriteNotOwn");
  }
  GetFilterEquipTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionFilterSpriteEquipped");
  }
  GetFilterNoEquipTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionFilterSpriteNotEquipped");
  }
  GetVisionLevelUpTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionLevelUpUnlockTexture");
  }
  GetVisionHeadSprBgB() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionHeadSprBgB");
  }
  GetVisionHeadSprBgA() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionHeadSprBgA");
  }
  GetVisionHeadLightBgA() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionHeadLightBgA");
  }
  GetVisionHeadLightBgB() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionHeadLightBgB");
  }
  GetVisionReachableCostMax() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomTotalCost");
  }
  GetVisionFetterDefaultColor() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionFetterDefaultColor");
  }
  GetVisionFetterDefaultTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionFetterDefaultTexture");
  }
  GetVisionLevelUpDelay() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionLevelUpDelay");
  }
  GetVisionIdentifyDelay() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionIdentifyDelay");
  }
  GetVisionCostColorBase() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionCostColorBase");
  }
  GetVisionCostColorFull() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionCostColorFull");
  }
  GetVisionCostColorAlert() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionCostColorAlert");
  }
  GetVisionIdentifyAnimationTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionIdentifyAnimationTime");
  }
  GetVisionMainAttributeSortArray() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("VisionMainAttributeSortArray");
  }
  GetVisionMainPercentageAttributeSortArray() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("VisionMainPercentageAttributeSortArray");
  }
  GetVisionSubAttributeSortArray() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("VisionSubAttributeSortArray");
  }
  GetVisionSubPercentageAttributeSortArray() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("VisionSubPercentageAttributeSortArray");
  }
  GetVisionDestroyCostSpriteByCost(e) {
    if (e === COST1) {
      return this.GetVisionDestroyCost1();
    } else if (e === COST3) {
      return this.GetVisionDestroyCost3();
    } else {
      return this.GetVisionDestroyCost4();
    }
  }
  GetVisionDestroyCost1() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionFilterSpriteCost1");
  }
  GetVisionDestroyCost3() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionFilterSpriteCost3");
  }
  GetVisionDestroyCost4() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionFilterSpriteCost4");
  }
  GetVisionRecoveryUnDesperateIcon() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionRecoveryUnDesperate");
  }
  GetVisionRecoveryDesperateIcon() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("VisionRecoveryDesperate");
  }
  GetVisionRecommendRuleLevel() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionRecommendRuleLevel");
  }
  GetPhantomEquipGroupCountMax() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomEquipGroupCount");
  }
  GetPhantomEquipHelpGroupId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionEquipHelpGroupId");
  }
  GetPhantomRecommendHelpGroupId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("VisionRecommendHelpId");
  }
  GetVisionAttrSortArray() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("VisionMainViewExtraAttributeForPreset");
  }
  GetPhantomVicePolishCostByLockCount(e) {
    return PhantomVicePolishConfigByPropCount_1.configPhantomVicePolishConfigByPropCount.GetConfig(e);
  }
  OnClear() {
    this.jVi.clear();
    return true;
  }
}
exports.PhantomBattleConfig = PhantomBattleConfig;
//# sourceMappingURL=PhantomBattleConfig.js.map