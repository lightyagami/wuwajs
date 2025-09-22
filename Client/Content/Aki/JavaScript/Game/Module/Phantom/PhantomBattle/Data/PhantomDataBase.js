"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomDataBase = exports.VisionSubPropData = exports.VisionSubPropViewData = exports.VisionSlotData = exports.VisionFetterData = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AttributeModel_1 = require("../../../Attribute/AttributeModel");
const CalabashDefine_1 = require("../../../Calabash/CalabashDefine");
const CommonComponentDefine_1 = require("../../../Common/CommonComponentDefine");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const AttrListScrollData_1 = require("../../../RoleUi/View/ViewData/AttrListScrollData");
const VisionAttributeItemTwo_1 = require("../../Vision/View/VisionAttributeItemTwo");
class VisionFetterData {
  constructor() {
    this.FetterGroupId = 0;
    this.FetterId = 0;
    this.NeedActiveNum = 0;
    this.ActiveFetterGroupNum = 0;
    this.ActiveState = false;
    this.NewAdd = false;
  }
}
exports.VisionFetterData = VisionFetterData;
class VisionSlotData {
  constructor() {
    this.SlotState = 0;
  }
}
exports.VisionSlotData = VisionSlotData;
class VisionSubPropViewData {
  constructor() {
    this.Data = undefined;
    this.SourceView = "";
    this.IfPreCache = false;
    this.CurrentVisionData = undefined;
    this.NeedHighLight = false;
  }
}
exports.VisionSubPropViewData = VisionSubPropViewData;
class VisionSubPropData {
  constructor(t, e) {
    this.wVi = 0;
    this.Pe = undefined;
    this.SlotState = 0;
    this.PhantomSubProp = undefined;
    this.wVi = t;
    this.Pe = e;
  }
  GetSubPropName() {
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(this.PhantomSubProp.Yws).PropId;
    return ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t).Name;
  }
  GetSlotIndex() {
    return this.wVi;
  }
  GetAttributeValueString() {
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(this.PhantomSubProp.Yws);
    var e = t.AddType === CommonComponentDefine_1.RATIO;
    var r = AttributeModel_1.TipsDataTool.GetPropRatioValue(this.PhantomSubProp.e5n, e);
    return ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(t.PropId, r, e);
  }
  GetUnlockLevel() {
    var t = this.Pe.GetQuality();
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSlotUnlockLevel(t);
    if (t.length > this.wVi) {
      return t[this.wVi];
    } else {
      return 0;
    }
  }
}
exports.VisionSubPropData = VisionSubPropData;
class PhantomDataBase {
  constructor() {
    this.PhantomMainProp = [];
    this.PhantomSubProp = [];
    this.PhantomLevel = 0;
    this.PhantomExp = 0;
    this.ItemId = 0;
    this.FuncValue = 0;
    this.SuspendSlot = undefined;
    this.BVi = 0;
    this.FetterGroupId = 0;
    this.bVi = 0;
    this.X8_ = undefined;
  }
  SetPhantomLevel(t) {
    this.PhantomLevel = t;
  }
  static GenerateLocalUniqueId(t, e) {
    return t * 10 * -1 - e;
  }
  SetIncId(t) {
    this.BVi = t;
  }
  GetPhantomLevel() {
    return this.PhantomLevel;
  }
  GetVisionIfCanRecovery() {
    return this.GetPhantomLevel() === 0 && this.GetExp() === 0 && !this.GetIsLock();
  }
  GetVisionIfCanRefine() {
    return this.GetPhantomLevel() === 0 && this.GetExp() === 0 && this.GetQuality() >= CalabashDefine_1.VISION_REFINE_FILTER_QUALITY;
  }
  IsMax() {
    return this.PhantomLevel >= ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(this.BVi);
  }
  SetPhantomExp(t) {
    this.PhantomExp = t;
  }
  CurrentPhantomInstance() {
    return this.GetPhantomInstanceWithSkinId();
  }
  GetCurrentSuspendSlotData() {
    return this.SuspendSlot;
  }
  GetFetterGroupId() {
    return this.FetterGroupId;
  }
  GetEatFullExp() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("PhantomExpReturnRatio");
    return Math.floor(this.GetFullExp() * t / 1000);
  }
  GetFullExp() {
    if (this.GetPhantomLevel() === 0) {
      return this.PhantomExp;
    }
    let e = 0;
    for (let t = 1; t <= this.GetPhantomLevel(); t++) {
      e += ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomLevelExpByGroupIdAndLevel(this.d8a().PhantomItem.LevelUpGroupId, t);
    }
    return e + this.PhantomExp;
  }
  GetExp() {
    return this.PhantomExp;
  }
  UpdateData(t) {
    this.BVi = t.b9n ?? 0;
    this.FuncValue = t.Vws ?? 0;
    this.PhantomLevel = t.$ws ?? 0;
    this.PhantomExp = t.Hws ?? 0;
    this.PhantomMainProp = t.jws ?? [];
    this.PhantomSubProp = t.Wws ?? [];
    this.FetterGroupId = t.Kws ?? 0;
    this.bVi = t.Z7n ?? 0;
  }
  SetMainProp(t) {
    this.PhantomMainProp = t;
  }
  SetSubProp(t) {
    this.PhantomMainProp = t;
  }
  GetIncrId() {
    return this.BVi;
  }
  OnFunctionValueChange(t) {
    this.FuncValue = t;
  }
  GetSuspendAttributeData() {
    var t = this.SuspendSlot.Qws;
    const i = new Array();
    t.forEach(t => {
      var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(t.Yws);
      var r = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t.Yws);
      var n = e.AddType === CommonComponentDefine_1.RATIO;
      var t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.e5n, n);
      i.push(new AttrListScrollData_1.AttrListScrollData(e.PropId, 0, t, r.Priority, n, 1));
    });
    return i;
  }
  GetSlotIndexAttributeData(t, e) {
    var r;
    var n;
    var i;
    var a;
    if (this.GetSlotIndexDataEx(t)) {
      t = this.GetSlotIndexDataEx(t);
      r = new Array();
      n = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(t.Yws);
      i = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t.Yws);
      a = n.AddType === CommonComponentDefine_1.RATIO;
      t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.e5n, a);
      r.push(new AttrListScrollData_1.AttrListScrollData(n.PropId, 0, t, i.Priority, a, e));
      return r;
    }
  }
  IsFunctionValue(t) {
    return (this.FuncValue & 1 << t) > 0;
  }
  GetIsLock() {
    return this.IsFunctionValue(0);
  }
  GetIsDeprecated() {
    return this.IsFunctionValue(1);
  }
  GetEquipRoleId() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(this.GetIncrId()) ?? 0;
  }
  GetEquipRoleIndex() {
    var t = this.GetEquipRoleId();
    if (t > 0) {
      t = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(t).GetIncrIdList();
      if (t.includes(this.GetIncrId())) {
        return t.indexOf(this.GetIncrId());
      }
    }
    return -1;
  }
  GetNameColor() {
    return ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(this.GetQuality()).DropColor;
  }
  qVi(t, e) {
    var r;
    var n;
    var i = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e).GetIncrIdList();
    if (t === -1 || (r = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e).GetIndexPhantomId(t)) === (n = this.GetIncrId())) {
      return i;
    } else {
      i = Array.from(ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e).GetIncrIdList());
      if (r === 0) {
        if (this.GetEquipRoleId() === e) {
          i[this.GetEquipRoleIndex()] = 0;
        }
        i[t] = n;
      } else if (r !== n) {
        if (this.GetEquipRoleId() === e) {
          i[this.GetEquipRoleIndex()] = i[t];
        }
        i[t] = n;
      }
      return i;
    }
  }
  static CalculateFetterByPhantomBattleData(e) {
    var r = e.length;
    var n = new Map();
    var i = new Map();
    for (let t = 0; t < r; t++) {
      var a = e[t];
      if (a) {
        var o;
        var s = a.GetFetterGroupId();
        let t = i.get(s);
        if (!(t = t || new Array()).includes(a.GetMonsterId())) {
          o = n.get(s) ?? 0;
          n.set(s, o + 1);
          t.push(a.GetMonsterId());
        }
        i.set(s, t);
      }
    }
    return n;
  }
  IfEquipSameNameMonsterOnRole(t, e) {
    t = this.qVi(t, e);
    const r = new Array();
    t.forEach(t => {
      t = ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(t);
      if (t) {
        r.push(t.GetMonsterId());
      }
    });
    e = new Set(r);
    return r.length !== e.size;
  }
  IfEquipOverNeedOnRole(t) {
    return !(t.length <= 0) && (t = t.reduce((t, e) => e.NeedActiveNum > t.NeedActiveNum ? e : t, t[0])).ActiveFetterGroupNum > t.NeedActiveNum;
  }
  GetPreviewShowFetterList(t, e) {
    const a = new Array();
    if (!(this.FetterGroupId <= 0)) {
      var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupFetterDataById(this.FetterGroupId);
      var n = this.qVi(t, e);
      const h = ModelManager_1.ModelManager.PhantomBattleModel.GetRoleFetterData(e);
      var i = n.length;
      var o = new Array();
      for (let t = 0; t < i; t++) {
        var s = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(n[t]);
        if (s) {
          o.push(s);
        }
      }
      const u = PhantomDataBase.CalculateFetterByPhantomBattleData(o);
      const l = h.length;
      r.forEach((e, t) => {
        var r = new VisionFetterData();
        r.FetterGroupId = this.FetterGroupId;
        r.FetterId = e;
        r.NeedActiveNum = t;
        r.ActiveFetterGroupNum = u.get(this.FetterGroupId) ?? 0;
        r.ActiveState = u.get(this.FetterGroupId) >= t;
        var n = u.get(this.FetterGroupId) >= t;
        let i = false;
        for (let t = 0; t < l; t++) {
          if (h[t].FetterId === e && h[t].ActiveState !== n && n) {
            i = true;
            break;
          }
        }
        if (i) {
          r.NewAdd = true;
        }
        a.push(r);
      });
    }
    return a;
  }
  GetPreviewCurrentShowFetterList() {
    return new Array();
  }
  GetShowFetterList(t, e) {
    const r = new Array();
    if (t !== -1) {
      this.GetAddFetterList(t, e).forEach(t => {
        var e = new VisionAttributeItemTwo_1.VisionAttributeVariantTwoData();
        e.FetterId = t;
        e.State = 2;
        r.push(e);
      });
      this.GetDelFetterList(t, e).forEach(t => {
        var e = new VisionAttributeItemTwo_1.VisionAttributeVariantTwoData();
        e.FetterId = t;
        e.State = 1;
        r.push(e);
      });
    }
    this.GetCanActiveFetterList().forEach(t => {
      var e;
      if (!this.GVi(r, t)) {
        (e = new VisionAttributeItemTwo_1.VisionAttributeVariantTwoData()).FetterId = t;
        e.State = 0;
        r.push(e);
      }
    });
    return r;
  }
  GVi(e, r) {
    for (let t = e.length - 1; t >= 0; t--) {
      if (e[t].FetterId === r) {
        return true;
      }
    }
    return false;
  }
  GetCanActiveFetterList() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetTargetCanActiveFettersList(this.GetIncrId());
  }
  GetDelFetterList(t, e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPreviewFettersDel(this, t, e);
  }
  GetAddFetterList(t, e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPreviewFetterAdd(this, t, e);
  }
  GetFetterGroupConfig() {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(this.GetFetterGroupId());
  }
  GetIsFetterGroupSpecial() {
    return this.GetFetterGroupConfig().FetterType === 1;
  }
  GetCost() {
    var t = this.GetConfig().Rarity;
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(t).Cost;
  }
  GetRareConfig() {
    var t = this.GetConfig().Rarity;
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(t);
  }
  GetNewSubPropSuccessData(e) {
    var e = e.length;
    var r = this.PhantomSubProp.length;
    var n = this.GetSubPropShowAttributeList(1);
    var i = new Array();
    for (let t = e; t < r; t++) {
      n[t].AddValue = n[t].BaseValue;
      n[t].BaseValue = 0;
      i.push(n[t]);
    }
    const a = new Array();
    i.forEach(t => {
      t = RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(t);
      t.ShowArrow = false;
      t.PreText = undefined;
      a.push(t);
    });
    return {
      Title: "IdentifySuccess",
      WiderScrollView: false,
      AttributeInfo: a,
      IsShowArrow: false
    };
  }
  GetSlotIndexDataEx(t) {
    var e = this.PhantomSubProp;
    if (e.length > t) {
      return e[t];
    }
  }
  GetMaxSubPropCount() {
    var t = this.GetQuality();
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSlotUnlockLevel(t).length;
  }
  GetSubPropIdentifyPreviewData(t, e) {
    var r = this.GetLevelSubPropData(t);
    let n = 0;
    var i = r.length;
    for (let t = 0; t < i; t++) {
      if (r[t].SlotState === 1 && e - n > 0) {
        r[t].SlotState = 5;
        n++;
      }
    }
    return r;
  }
  GetLevelSubPropPreviewData(t, e) {
    var r = this.GetLevelSubPropData(t);
    var n = this.GetLevelSubPropData(e);
    var i = n.length;
    for (let t = 0; t < i; t++) {
      if (n[t].SlotState !== 0 && r[t].SlotState === 0) {
        n[t].SlotState = 2;
      }
    }
    return n;
  }
  GetEquipmentViewPreviewData() {
    var e = this.GetLevelSubPropData(this.GetPhantomLevel());
    var r = e.length;
    var n = new Array();
    let i = 0;
    for (let t = 0; t < r; t++) {
      if (e[t].SlotState === 3) {
        n.push(e[t]);
      }
      if (e[t].SlotState === 1 && i === 0) {
        n.push(e[t]);
        i += 1;
      }
    }
    return n;
  }
  GetIdentifyCostItemId() {
    return ItemDefines_1.EItemId.Gold;
  }
  GetIdentifyCostItemValue() {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetQualityIdentifyCost(this.GetQuality());
  }
  GetCurrentIdentifyCost() {
    var t = this.GetQuality();
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomIdentifyCost(t);
  }
  GetCurrentSubPropLockCount() {
    var t = this.GetLevelSubPropData(this.GetPhantomLevel());
    let e = 0;
    t.forEach(t => {
      if (t.SlotState === 0) {
        e++;
      }
    });
    return e;
  }
  GetIfHaveEnoughIdentifyGold(t) {
    var t = this.GetIdentifyCostItemValue() * t;
    var e = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(this.GetIdentifyCostItemId());
    let r = 0;
    return (r = e.length > 0 ? e[0].GetCount() : r) - t >= 0;
  }
  GetIfHaveEnoughIdentifyConsumeItem(t) {
    var t = this.GetCurrentIdentifyCostValue() * t;
    var e = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(this.GetCurrentIdentifyCostId());
    let r = 0;
    return (r = e.length > 0 ? e[0].GetCount() : r) - t >= 0;
  }
  GetNextIdentifyLevel() {
    let t = 0;
    for (const e of this.GetLevelSubPropData(this.GetPhantomLevel())) {
      if (e.SlotState === 0) {
        t = e.GetUnlockLevel();
        break;
      }
    }
    return t;
  }
  GetCurrentIdentifyCostId() {
    var t = this.GetCurrentIdentifyCost();
    let r = 0;
    t.forEach((t, e) => {
      r = e;
    });
    return r;
  }
  GetCurrentIdentifyCostValue() {
    var t = this.GetCurrentIdentifyCost();
    let r = 0;
    t.forEach((t, e) => {
      r = t;
    });
    return r;
  }
  GetCurrentCanIdentifyCount() {
    var t = this.GetLevelSubPropData(this.GetPhantomLevel());
    let e = 0;
    t.forEach(t => {
      if (t.SlotState === 1) {
        e++;
      }
    });
    let n = e;
    this.GetCurrentIdentifyCost().forEach((t, e) => {
      e = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(e);
      let r = 0;
      if ((r = e.length > 0 ? Math.floor(e[0].GetCount() / t) : r) < n) {
        n = r;
      }
    });
    return n;
  }
  GetLevelUnlockSubPropSlotCount(e) {
    var r = this.GetMaxSubPropCount();
    let n = 0;
    for (let t = 0; t < r; t++) {
      if (e >= this.GetSubPropUnlockLevel(t)) {
        n++;
      }
    }
    return n;
  }
  GetLevelSubPropData(e) {
    var r = this.GetMaxSubPropCount();
    var n = new Array();
    for (let t = 0; t < r; t++) {
      var i;
      var a = new VisionSubPropData(t, this);
      if (e >= this.GetSubPropUnlockLevel(t)) {
        if (i = this.GetSlotIndexDataEx(t)) {
          a.SlotState = 3;
          a.PhantomSubProp = i;
        } else {
          a.SlotState = 1;
        }
      } else {
        a.SlotState = 0;
      }
      n.push(a);
    }
    return n;
  }
  GetIfHaveLockSubProp() {
    let t = false;
    for (const e of this.GetLevelSubPropData(this.GetPhantomLevel())) {
      if (e.SlotState === 0) {
        t = true;
        break;
      }
    }
    return t;
  }
  GetIfHaveUnIdentifySubProp() {
    let t = false;
    for (const e of this.GetLevelSubPropData(this.GetPhantomLevel())) {
      if (e.SlotState === 1) {
        t = true;
        break;
      }
    }
    return t;
  }
  GetSubPropUnlockLevel(t) {
    var e = this.GetQuality();
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSlotUnlockLevel(e);
    if (e.length >= t) {
      return e[t];
    } else {
      return 9999;
    }
  }
  GetMaxSlotCount() {
    const e = this.GetLevelLimit();
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("PhantomSlotUnlockLevel");
    let r = 0;
    t.forEach(t => {
      if (e >= t) {
        r++;
      }
    });
    return r;
  }
  GetSlotUnlockLevel(t) {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("PhantomSlotUnlockLevel");
    if (e.length >= t) {
      return e[t];
    } else {
      return 9999;
    }
  }
  GetSlotLockState(t) {
    return this.GetPhantomLevel() < this.GetSlotUnlockLevel(t);
  }
  GetIdentifyBackRadio() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomIdentifyReturnRatio") / 1000;
  }
  GetCurrentIdentifyNum() {
    return this.PhantomSubProp.length;
  }
  GetIdentifyBackItem() {
    var t = this.GetCurrentIdentifyCostValue();
    var e = this.GetCurrentIdentifyCostId();
    var r = this.GetCurrentIdentifyNum();
    var n = new Map();
    var t = Math.floor(t * r * this.GetIdentifyBackRadio());
    if (t > 0) {
      n.set(e, t);
    }
    return n;
  }
  GetLevelSlotData(e) {
    var r = this.GetMaxSlotCount();
    var n = new Array();
    if (!(r >= 1) || !(e < this.GetSlotUnlockLevel(0))) {
      for (let t = 0; t < r; t++) {
        var i = new VisionSlotData();
        if (e >= this.GetSlotUnlockLevel(t)) {
          if (this.GetSlotIndexDataEx(t)) {
            i.SlotState = 3;
          } else {
            i.SlotState = 1;
          }
        } else {
          i.SlotState = 0;
        }
        n.push(i);
      }
    }
    return n;
  }
  GetCurrentSlotData() {
    return this.GetLevelSlotData(this.GetPhantomLevel());
  }
  GetPreviewSlotData(e) {
    var r;
    var n = this.GetCurrentSlotData();
    var i = this.GetLevelSlotData(e);
    var a = i.length;
    for (let t = 0; t < a; t++) {
      if (n.length === 0) {
        r = this.GetSlotUnlockLevel(t);
        i[t].SlotState = r <= e ? 2 : 0;
      } else if (n.length > t && n[t].SlotState !== i[t].SlotState) {
        i[t].SlotState = 2;
      }
    }
    return i;
  }
  GetCurrentSkillId() {
    return this.GetPhantomInstanceWithSkinId().PhantomItem.SkillId;
  }
  GetSkillDescExParam(t) {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(t, this.GetQuality());
  }
  GetNormalSkillDesc() {
    var t = this.GetPhantomInstanceWithSkinId();
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(t.PhantomItem.SkillId);
    if (t) {
      return {
        MainSkillText: t.DescriptionEx,
        MainSkillParameter: this.GetSkillDescExParam(t.Id),
        MainSkillIcon: t.BattleViewIcon
      };
    }
  }
  GetNormalSkillConfig() {
    var t = this.GetPhantomInstanceWithSkinId();
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(t.PhantomItem.SkillId);
  }
  GetNormalSkillId() {
    return this.GetPhantomInstanceWithSkinId().PhantomItem.SkillId;
  }
  GetPersonalSkillId() {
    return 0;
  }
  GetPhantomInstanceWithSkinId() {
    var t = this.SkinId;
    if (t) {
      return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(t);
    } else {
      return this.d8a();
    }
  }
  d8a() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(this.GetConfigId());
  }
  GetLevelUpPreviewData(t) {
    const a = new Array();
    t = this.GetMainPropValueMapInTargetLevel(t);
    const o = new Map();
    this.PhantomMainProp.forEach(t => {
      o.set(t.Yws, t.e5n);
    });
    t.forEach((t, e) => {
      var r = o.has(e) ? o.get(e) : 0;
      var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(e);
      var n = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(e.PropId);
      var i = e.AddType === CommonComponentDefine_1.RATIO;
      var r = AttributeModel_1.TipsDataTool.GetPropRatioValue(r, i);
      var t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t, i);
      a.push(new AttrListScrollData_1.AttrListScrollData(e.PropId, r, t, n.Priority, i, 1));
    });
    return a;
  }
  GetPhantomMainProp() {
    return this.PhantomMainProp;
  }
  GetPhantomFirstMainProp() {
    return this.PhantomMainProp[0];
  }
  GetMainPropValueMapInTargetLevel(t) {
    var e = new Map();
    for (const i of this.GetPhantomMainProp()) {
      var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(i.Yws);
      var n = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomGrowthValueByGrowthIdAndLevel(r.GrowthId, t);
      var r = AttributeModel_1.TipsDataTool.GetAttributeValue(r.StandardProperty, n, false);
      e.set(i.Yws, Math.floor(r));
    }
    return e;
  }
  GetPhantomSubProp() {
    return this.PhantomSubProp;
  }
  SetConfigId(t) {
    this.ItemId = t;
  }
  SetSkinId(t) {
    this.bVi = t;
  }
  get SkinId() {
    return this.bVi;
  }
  GetConfigId(t = false) {
    var e = this.SkinId;
    if (t && e) {
      return e;
    } else {
      return this.ItemId;
    }
  }
  GetConfig() {
    this.X8_ ||= ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(this.ItemId);
    return this.X8_;
  }
  GetSkinConfig() {
    var t = this.SkinId;
    if (t) {
      return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(t);
    } else {
      return this.GetConfig();
    }
  }
  GetMonsterConfig() {
    return ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(this.GetMonsterId());
  }
  GetLevelLimit() {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(this.GetQuality()).LevelLimit;
  }
  GetQuality() {
    return this.GetConfig()?.QualityId;
  }
  GetMonsterId(t = false) {
    return (t && this.SkinId ? this.GetSkinConfig() : this.GetConfig())?.MonsterId;
  }
  GetMonsterName() {
    return (this.SkinId ? this.GetSkinConfig() : this.GetConfig())?.MonsterName;
  }
  GetFirstMainPropAttribute(t, e = false) {
    var r = this.PhantomMainProp[0].Yws;
    var n = this.PhantomMainProp[0].e5n;
    var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(r);
    var i = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(r.PropId);
    var n = AttributeModel_1.TipsDataTool.GetPropRatioValue(n, r.AddType === CommonComponentDefine_1.RATIO);
    return new AttrListScrollData_1.AttrListScrollData(r.PropId, n, e ? r.AddType : 0, i.Priority, r.AddType === CommonComponentDefine_1.RATIO, t);
  }
  GetMainPropShowAttributeList(e, r = false) {
    var n = new Array();
    const i = new Map();
    this.PhantomMainProp.forEach(t => {
      i.set(t.Yws, t.e5n);
    });
    var a = Array.from(i.keys());
    var o = a.length;
    for (let t = 0; t < o; t++) {
      var s = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(a[t]);
      var h = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(s.PropId);
      var u = AttributeModel_1.TipsDataTool.GetPropRatioValue(i.get(a[t]), s.AddType === CommonComponentDefine_1.RATIO);
      n.push(new AttrListScrollData_1.AttrListScrollData(s.PropId, u, r ? s.AddType : 0, h.Priority, s.AddType === CommonComponentDefine_1.RATIO, e));
    }
    return n;
  }
  GetSubPropShowAttributeList(i) {
    const a = new Array();
    this.PhantomSubProp.forEach(t => {
      var e = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t.Yws);
      var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(t.Yws);
      var n = r.AddType === CommonComponentDefine_1.RATIO;
      var t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.e5n, n);
      a.push(new AttrListScrollData_1.AttrListScrollData(r.PropId, t, 0, e.Priority, r.AddType === CommonComponentDefine_1.RATIO, i));
    });
    return a;
  }
  CheckIfHaveSelectRecommendMainAttr() {
    var t = ModelManager_1.ModelManager.VisionRecommendModel.CurrentSelectMainAttrArray;
    if (t.length === 0) {
      return true;
    }
    for (const r of t) {
      for (const n of this.PhantomMainProp) {
        var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(n.Yws);
        if (e.AddType === r.AddType && e.PropId === r.AttrId) {
          return true;
        }
      }
    }
    return false;
  }
  CheckIfHaveSelectRecommendSubAttr() {
    for (const r of ModelManager_1.ModelManager.VisionRecommendModel.CurrentSelectSubAttrArray) {
      let t = false;
      for (const n of this.PhantomSubProp) {
        var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(n.Yws);
        if (e.AddType === r.AddType && e.PropId === r.AttrId) {
          t = true;
          break;
        }
      }
      if (!t) {
        return false;
      }
    }
    return true;
  }
  GetPropShowAttributeList(e) {
    var r = new Array();
    const n = new Map();
    this.PhantomMainProp.forEach(t => {
      n.set(t.Yws, t.e5n);
    });
    const i = new Map();
    this.PhantomSubProp.forEach(t => {
      i.set(t.Yws, t.e5n);
      if (!n.has(t.Yws)) {
        n.set(t.Yws, 0);
      }
    });
    var a = Array.from(n.keys());
    var o = a.length;
    for (let t = 0; t < o; t++) {
      var s = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(a[t]);
      r.push(new AttrListScrollData_1.AttrListScrollData(a[t], n.get(a[t]), i.get(a[t]) ?? 0, s.Priority, false, e));
    }
    return r;
  }
  static GetPropValue(t, e) {
    return t.Value;
  }
}
exports.PhantomDataBase = PhantomDataBase;
//# sourceMappingURL=PhantomDataBase.js.map