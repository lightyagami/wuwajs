"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterTypeFunctionLibrary = undefined;
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const FishingDefine_1 = require("../../../../Activity/ActivityContent/Fishing/FishingDefine");
const CalabashDefine_1 = require("../../../../Calabash/CalabashDefine");
const FilterData_1 = require("../Model/FilterData");
class FilterTypeFunctionLibrary {
  static XLt(r, a) {
    var n = new Array();
    for (const i of r) {
      var e;
      var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(i);
      if (t && t.length !== 0 && ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(t[0].Rarity).Rare === a) {
        e = ConfigManager_1.ConfigManager.CalabashConfig.GetMonsterNameByMonsterId(i);
        t = t[0].SkillId;
        t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(t).BattleViewIcon;
        e = new FilterData_1.FilterItemData(i, e, t);
        n.push(e);
      }
    }
    return n;
  }
}
exports.FilterTypeFunctionLibrary = FilterTypeFunctionLibrary;
(_a = FilterTypeFunctionLibrary).GetElementFilterData = r => {
  var a = new Array();
  for (const e of ConfigManager_1.ConfigManager.ElementInfoConfig.GetConfigList(r)) {
    var n = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(e.Name);
    a.push(new FilterData_1.FilterItemData(e.Id, n, e.Icon4));
  }
  return a;
};
FilterTypeFunctionLibrary.GetWeaponFilterData = r => {
  var a;
  var n = new Array();
  for (const e of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList()) {
    if (r.includes(e.Value)) {
      a = ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfComment(e.Comment);
      n.push(new FilterData_1.FilterItemData(e.Value, a, e.Icon));
    }
  }
  return n;
};
FilterTypeFunctionLibrary.GetPhantomFilterData = r => {
  var a = new Array();
  for (const t of r) {
    var n = ConfigManager_1.ConfigManager.CalabashConfig.GetMonsterNameByMonsterId(t);
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(t)[0].SkillId;
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(e).BattleViewIcon;
    var n = new FilterData_1.FilterItemData(t, n, e);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetDetectFilterData = r => {
  var a = new Array();
  for (const e of r) {
    var n = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetLocalFilterTextById(e);
    var n = new FilterData_1.FilterItemData(e, n, undefined);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetCookMenuFilterData = r => {
  var a = new Array();
  for (const e of r) {
    var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Recipe");
    var n = new FilterData_1.FilterItemData(e, n, undefined);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetCookTypeFilterData = r => {
  var a = new Array();
  for (const e of r) {
    var n = e === 1 ? "Attack" : e === 2 ? "Defense" : "Explore";
    var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(n);
    var n = new FilterData_1.FilterItemData(e, n, undefined);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetComposeFilterData = r => {
  var a = new Array();
  for (const e of r) {
    var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Formula");
    var n = new FilterData_1.FilterItemData(e, n, undefined);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetPhantomRarityFilterData = r => {
  var a = new Array();
  for (const e of r) {
    var n = "CalabashCatchGain_" + e.toString();
    var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(n);
    var n = new FilterData_1.FilterItemData(e, n, undefined);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetPhantomFettersEquipFilterData = r => {
  var a = new Array();
  for (const t of r) {
    var n = t === 1 ? "PhantomFettersEquip" : "PhantomFettersUnEquip";
    var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(n);
    var e = t === 1 ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterEquipTexture() : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterNoEquipTexture();
    var n = new FilterData_1.FilterItemData(t, n, e);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetPhantomFettersHasFilterData = r => {
  var a = new Array();
  for (const t of r) {
    var n = t === 1 ? "PhantomFettersHas" : "PhantomFettersUnHas";
    var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(n);
    var e = t === 1 ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterOwnTexture() : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFilterNotOwnTexture();
    var n = new FilterData_1.FilterItemData(t, n, e);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetPhantomRarityZeroFilterData = r => _a.XLt(r, 0);
FilterTypeFunctionLibrary.GetPhantomRarityOneFilterData = r => _a.XLt(r, 1);
FilterTypeFunctionLibrary.GetPhantomRarityTwoFilterData = r => _a.XLt(r, 2);
FilterTypeFunctionLibrary.GetPhantomRarityThreeFilterData = r => _a.XLt(r, 3);
FilterTypeFunctionLibrary.GetItemQualityFilterData = r => {
  var a = new Array();
  for (const t of r) {
    var n = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(t);
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Name);
    a.push(new FilterData_1.FilterItemData(t, e, n?.FilterIconPath));
  }
  return a;
};
FilterTypeFunctionLibrary.GetVisionDestroyCostData = r => {
  var a = new Array();
  for (const t of r) {
    var n = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(t).Cost;
    var e = StringUtils_1.StringUtils.Format("Cost{0}", n.toString());
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e);
    var n = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDestroyCostSpriteByCost(n);
    var e = new FilterData_1.FilterItemData(t, e, n);
    a.push(e);
  }
  return a;
};
FilterTypeFunctionLibrary.GetVisionDestroyQualityData = r => {
  var a = new Array();
  for (const t of r) {
    var n = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(t);
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Name);
    a.push(new FilterData_1.FilterItemData(t, e, n?.FilterIconPath));
  }
  return a;
};
FilterTypeFunctionLibrary.GetVisionDestroyFetterGroupData = r => {
  var a = new Array();
  for (const t of r) {
    var n = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(t);
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.FetterGroupName);
    a.push(new FilterData_1.FilterItemData(t, e, n.FetterElementPath));
  }
  return a;
};
FilterTypeFunctionLibrary.GetVisionDestroyAttribute = r => {
  var a = new Array();
  for (const t of r) {
    var n = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleAttributeId(t, 4);
    var n = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexIcon(n);
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(t, 4);
    a.push(new FilterData_1.FilterItemData(t, e, n));
  }
  return a;
};
FilterTypeFunctionLibrary.GetRoleTagFilterList = r => {
  var a = new Array();
  for (const t of r) {
    var n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleTagConfig(t);
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.TagName);
    a.push(new FilterData_1.FilterItemData(t, e, n.TagIcon));
  }
  return a;
};
FilterTypeFunctionLibrary.GetItemDeprecateFilterList = r => {
  var a = new Array();
  for (const t of r) {
    var n = t === CalabashDefine_1.VISION_RECOVERT_FILTER_DEPERCATE ? "EchoAbandoned" : "NotAbandoned";
    var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n);
    var e = t === CalabashDefine_1.VISION_RECOVERT_FILTER_DEPERCATE ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionRecoveryDesperateIcon() : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionRecoveryUnDesperateIcon();
    var n = new FilterData_1.FilterItemData(t, n, e);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetVisionGroupAttributeFilterList = r => {
  var a = new Array();
  for (const o of r) {
    var n = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleAttributeId(o, 15);
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleAddType(o, 15);
    var t = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(n).Icon;
    var i = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(o, 15);
    var n = new FilterData_1.FilterItemData(n * 10 + e, i, t);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetFishingTechData = r => {
  var a = new Array();
  for (const e of r) {
    var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Fishing_TagName" + e);
    var n = new FilterData_1.FilterItemData(e, n, undefined);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetFishingTimeData = r => {
  var a = new Array();
  for (const e of r) {
    var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(FishingDefine_1.fishingItemTimeText[e]);
    var n = new FilterData_1.FilterItemData(e, n, undefined);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetFishingAreaData = r => {
  var a = new Array();
  for (const e of r) {
    var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Area_" + e + "_Title");
    var n = new FilterData_1.FilterItemData(e, n, undefined);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetFishingTypeData = r => {
  var a = new Array();
  for (const e of r) {
    var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(FishingDefine_1.fishingItemTypeText[e]);
    var n = new FilterData_1.FilterItemData(e, n, undefined);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetDangoAbyssPluginQualityData = r => {
  var a = new Array();
  for (const t of r) {
    var n = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(t);
    var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(n.Name);
    var e = new FilterData_1.FilterItemData(t, e, n?.FilterIconPath);
    a.push(e);
  }
  return a;
};
FilterTypeFunctionLibrary.GetDangoAbyssPluginPropData = r => {
  var a = new Array();
  for (const t of r) {
    var n = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t);
    var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(n.Name);
    var e = new FilterData_1.FilterItemData(t, e, n.Icon);
    a.push(e);
  }
  return a;
};
FilterTypeFunctionLibrary.GetDangoAbyssPluginTagData = r => {
  var a = new Array();
  for (const t of r) {
    var n = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(t);
    var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(n.Name);
    var e = new FilterData_1.FilterItemData(t, e, n.Icon);
    a.push(e);
  }
  return a;
};
FilterTypeFunctionLibrary.GetDangoAbyssPluginLockStateData = r => {
  var a = new Array();
  for (const e of r) {
    var n = e === 1 ? "AbyssItem_Lock1" : "AbyssItem_UnLock1";
    var n = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(n);
    var n = new FilterData_1.FilterItemData(e, n, undefined);
    a.push(n);
  }
  return a;
};
FilterTypeFunctionLibrary.GetPhantomManageFirstMainPropData = r => {
  var a = new Array();
  for (const t of r) {
    var n = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleAttributeId(t, 4);
    var n = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexIcon(n);
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(t, 4);
    a.push(new FilterData_1.FilterItemData(t, e, n));
  }
  return a;
};
FilterTypeFunctionLibrary.GetPhantomManageCostData = r => {
  var a = new Array();
  for (const t of r) {
    var n = StringUtils_1.StringUtils.Format("Cost{0}", t.toString());
    var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(n);
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDestroyCostSpriteByCost(t);
    var n = new FilterData_1.FilterItemData(t, n, e);
    a.push(n);
  }
  return a;
}; //# sourceMappingURL=FilterTypeFunctionLibrary.js.map