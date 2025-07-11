"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomTipsData = exports.WeaponTipsData = exports.CommonTipsData = exports.CommonTipsBaseData = exports.CommonTipsComponentUtil = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CommonComponentDefine_1 = require("../CommonComponentDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CommonTipsComponentUtil {
  static GetWeaponTipsDataByUniqueId(e) {
    var a = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
    if (a) {
      var t = a.GetConfig();
      if (a.GetItemDataType() === 2) {
        return this.GetWeaponTipsData(t, e);
      }
    }
  }
  static GetPhantomTipsDataByUniqueId(e) {
    var a = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
    if (a) {
      var t = a.GetConfig();
      if (a.GetItemDataType() === 3) {
        return this.GetPhantomTipsData(t, e);
      }
    }
  }
  static GetTipsDataByItemId(e) {
    var a;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e);
    if (t === 2) {
      a = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(e);
      return this.GetWeaponTipsData(a, e);
    } else if (t === 3) {
      a = ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(e);
      return this.GetPhantomTipsData(a, e);
    } else {
      return undefined;
    }
  }
  static GetWeaponTipsDataByItemId(e) {
    e = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(e);
    if (e) {
      return this.GetWeaponTipsData(e);
    }
  }
  static GetPhantomTipsDataByItemId(e) {
    e = ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(e);
    if (e) {
      return this.GetPhantomTipsData(e);
    }
  }
  static GetWeaponTipsData(e, a) {
    var t = new WeaponTipsData();
    var n = a ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(a) : undefined;
    var o = n ? n.GetWeaponConfig() : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e.ItemId);
    var i = n ? n.GetBreachLevel() : 0;
    var r = n ? n.GetResonanceLevel() : 1;
    var s = n ? n.GetBreachConfig() : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(o.BreachId, i);
    var g = n ? n.GetLevel() : 1;
    var s = s.LevelLimit;
    var l = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponLevelUpLevelText");
    var C = o.BreachId;
    var C = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(C);
    var M = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(o.FirstCurve, o.FirstPropId.Value, g, i);
    var M = {
      Id: o.FirstPropId.Id,
      IsRatio: o.FirstPropId.IsRatio,
      CurValue: M
    };
    var p = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(o.SecondCurve, o.SecondPropId.Value, g, i);
    var p = {
      Id: o.SecondPropId.Id,
      IsRatio: o.SecondPropId.IsRatio,
      CurValue: p
    };
    t.IncId = a;
    t.ConfigId = e.ItemId;
    t.Name = e.WeaponName;
    t.QualityId = e.QualityId;
    t.ItemType = 2;
    t.BgDescription = e.BgDescription;
    t.LevelText = StringUtils_1.StringUtils.Format(l, g.toString(), s.toString());
    t.CurrentStar = i;
    t.MaxStar = C;
    t.Type = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(o.WeaponType);
    t.AttributeList.push(M);
    t.AttributeList.push(p);
    t.ResonanceLevel = r;
    if (n && (t.EquippedId = n.GetRoleId(), t.EquippedId !== 0)) {
      a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t.EquippedId);
      t.EquippedIcon = a.GetRoleConfig().RoleHeadIcon;
      t.EquippedName = a.GetName();
    }
    return t;
  }
  static GetPhantomTipsData(e, a) {
    var t = new PhantomTipsData();
    var n = ModelManager_1.ModelManager.PhantomBattleModel;
    var o = a ? n.GetPhantomBattleData(a) : undefined;
    var i = e.ItemId;
    var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(e.QualityId).LevelLimit;
    var s = o ? o.GetPhantomLevel() : 1;
    var g = e.TypeDescription;
    var g = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(g);
    t.Name = e.MonsterName;
    t.IncId = a;
    t.ConfigId = i;
    t.QualityId = e.QualityId;
    t.ItemType = 9;
    var l = ConfigManager_1.ConfigManager.TextConfig.GetTextById("LevelShow");
    t.LevelText = StringUtils_1.StringUtils.Format(l, s.toString());
    var l = ConfigManager_1.ConfigManager.TextConfig.GetTextById("RoleMaxLevel02");
    t.MaxLevelText = StringUtils_1.StringUtils.Format(l, r.toString());
    t.Level = s;
    t.Type = g ?? "";
    t.PhantomId = e.MonsterId;
    var l = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(a);
    if (l) {
      t.EquippedId = l;
      r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(l);
      t.EquippedIcon = r.GetRoleConfig().RoleHeadIcon;
      t.EquippedName = r.GetName();
    }
    t.RarityId = "CalabashCatchGain_" + e.Rarity.toString();
    var s = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e.ElementType[0]);
    t.PropertyTexture = s.Icon;
    t.PropertyId = e.ElementType[0];
    var g = n.GetPhantomInstanceByItemId(i);
    if (g) {
      l = g.GetPhantomSkillInfoByLevel();
      t.MainSkillText = l.DescriptionEx;
      r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(l.Id, e.QualityId);
      t.MainSkillParameter = r;
      t.SkillIcon = g.PhantomItem.SkillIcon;
    } else if (n = (s = ConfigManager_1.ConfigManager.PhantomBattleConfig).GetPhantomItemById(i)) {
      l = n.SkillId;
      r = s.GetPhantomSkillBySkillId(l);
      t.MainSkillText = r.DescriptionEx;
      g = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExByPhantomSkillIdAndQuality(l, e.QualityId);
      t.MainSkillParameter = g;
      t.SkillIcon = n.SkillIcon;
    }
    t.IsBreak = false;
    var i = o?.GetPhantomMainProp();
    t.IsMain = ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsMain(a);
    if (i && i.length > 0) {
      for (const h of i) {
        var C = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(h.Yws);
        var C = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(C.PropId);
        var M = !!C.IsPercent;
        t.MainAttributeList.push(new CommonComponentDefine_1.TipsAttributeData(C.Id, h.e5n, M));
      }
    }
    s = o?.GetPhantomSubProp();
    t.IsSub = ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsSub(a);
    if (s && s.length > 0) {
      t.IsUnlockSub = true;
      for (const _ of s) {
        var p = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(_.Yws).AddType === CommonComponentDefine_1.RATIO;
        t.SubAttributeList.push(new CommonComponentDefine_1.TipsAttributeData(_.Yws, _.e5n, p));
      }
    }
    return t;
  }
}
exports.CommonTipsComponentUtil = CommonTipsComponentUtil;
class CommonTipsBaseData {
  constructor() {
    this.IncId = 0;
    this.ConfigId = 0;
    this.Name = "";
    this.QualityId = 0;
    this.ItemType = 2;
    this.BgDescription = "";
    this.LevelText = "";
    this.MaxLevelText = "";
    this.Type = "";
    this.EquippedId = 0;
    this.EquippedIcon = "";
    this.EquippedName = "";
  }
}
class CommonTipsData extends (exports.CommonTipsBaseData = CommonTipsBaseData) {
  constructor() {
    super(...arguments);
    this.CurrentStar = 0;
    this.MaxStar = 0;
    this.AttributeList = [];
  }
}
class WeaponTipsData extends (exports.CommonTipsData = CommonTipsData) {
  constructor() {
    super(...arguments);
    this.ResonanceLevel = 0;
  }
}
exports.WeaponTipsData = WeaponTipsData;
class PhantomTipsData extends CommonTipsBaseData {
  constructor() {
    super(...arguments);
    this.PhantomId = 0;
    this.Level = 0;
    this.RarityId = "";
    this.PropertyTexture = "";
    this.PropertyId = 0;
    this.IsBreak = false;
    this.BreakAttributeList = [];
    this.IsMain = false;
    this.MainAttributeList = [];
    this.MainSkillText = "";
    this.MainSkillParameter = undefined;
    this.SkillIcon = "";
    this.IsSub = false;
    this.SubAttributeList = [];
    this.IsUnlockSub = false;
    this.UnlockSubTips = "";
  }
}
exports.PhantomTipsData = PhantomTipsData;
//# sourceMappingURL=CommonTipsComponentsUtil.js.map