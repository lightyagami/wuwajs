"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionUnlockQualityData = exports.RecommendData = exports.PhantomSortStruct = exports.PhantomBattleModel = exports.LevelUpPastVisionData = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const PhantomFetterGroupById_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterGroupById");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AttributeDefine_1 = require("../../Attribute/AttributeDefine");
const CommonComponentDefine_1 = require("../../Common/CommonComponentDefine");
const RoleLevelUpSuccessController_1 = require("../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const AttrListScrollData_1 = require("../../RoleUi/View/ViewData/AttrListScrollData");
const UiCameraPostEffectComponent_1 = require("../../UiCamera/UiCameraComponent/UiCameraPostEffectComponent");
const UiCameraManager_1 = require("../../UiCamera/UiCameraManager");
const PhantomDataBase_1 = require("./Data/PhantomDataBase");
const PhantomRoleEquipmentData_1 = require("./Data/PhantomRoleEquipmentData");
const PhantomBattleData_1 = require("./PhantomBattleData");
const PhantomBattleInstance_1 = require("./PhantomBattleInstance");
class LevelUpPastVisionData {
  constructor() {
    this.Level = 0;
    this.UniqueId = 0;
    this.AttrListScrollData = undefined;
    this.SlotData = undefined;
    this.SubProp = undefined;
  }
}
exports.LevelUpPastVisionData = LevelUpPastVisionData;
class PhantomBattleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.o6i = new Map();
    this.r6i = new Map();
    this.n6i = new Map();
    this.s6i = new Map();
    this.a6i = new Map();
    this.h6i = new Array();
    this.l6i = false;
    this._6i = undefined;
    this.CurrentSelectData = undefined;
    this.CurrentEquipmentSelectIndex = 0;
    this.CurrentSelectUniqueId = 0;
    this.u6i = undefined;
    this.c6i = new UE.Vector();
    this.m6i = new UE.Vector();
    this.d6i = new UE.Rotator();
    this.C6i = new Map();
    this.g6i = [];
    this.f6i = undefined;
    this.p6i = false;
    this.v6i = 999;
    this.M6i = 0;
    this.E6i = [];
    this.S6i = new Map();
    this.y6i = new Map();
    this.I6i = undefined;
    this.T6i = undefined;
    this.L6i = undefined;
    this.D6i = undefined;
    this._1l = 0;
    this.u1l = 0;
    this.gDu = 0;
    this.nye = () => {
      this._1l = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpMaterialPutInMode) ?? 0;
      this.u1l = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpMaterialUseType) ?? 0;
      this.gDu = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpIdentify) ?? 0;
    };
    this.R6i = () => {
      ControllerHolder_1.ControllerHolder.PhantomBattleController.TryShowReceiveItem();
    };
    this.SortAttrList = (t, e) => {
      var r = t.Priority !== 0;
      var a = e.Priority !== 0;
      if (r && a) {
        return t.Priority - e.Priority;
      } else if (r) {
        return -1;
      } else if (a) {
        return 1;
      } else {
        return t.Id - e.Id;
      }
    };
    this.U6i = undefined;
    this.CurrentSelectFetterGroupId = 0;
    this.A6i = undefined;
    this.N6i = (t, e) => {
      var r;
      var a;
      if (t.GetType() !== e.GetType()) {
        return t.GetType() - e.GetType();
      } else if (t.GetQuality() !== e.GetQuality()) {
        return t.GetQuality() - e.GetQuality();
      } else {
        r = this.GetPhantomBattleData(t.GetUniqueId());
        a = this.GetPhantomBattleData(t.GetUniqueId());
        if (r && a && r.GetPhantomLevel() !== a.GetPhantomLevel()) {
          return r.GetPhantomLevel() - a.GetPhantomLevel();
        } else {
          return e.GetUniqueId() - t.GetUniqueId();
        }
      }
    };
    this.O6i = new Array();
    this.VH_ = 0;
  }
  SetCurrentDragIndex(t) {
    this.v6i = t;
  }
  ClearCurrentDragIndex() {
    this.v6i = 999;
  }
  CheckIfCurrentDragIndex(t) {
    return this.v6i === t;
  }
  CheckIfCanDrag() {
    return this.v6i === 999;
  }
  OnInit() {
    for (const a of ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemList()) {
      var e;
      var r = a.ParentMonsterId !== 0 ? a.ParentMonsterId : a.MonsterId;
      let t = this.S6i.get(r);
      t = t || [];
      if (a.ParentMonsterId !== 0) {
        t.push(a.ItemId);
        this.S6i.set(r, t);
      } else if (a.PhantomType === 1 && a.QualityId === 2) {
        (e = []).push(a.ItemId);
        t = e.concat(t);
        this.S6i.set(r, t);
      }
      if (a.ParentMonsterId !== 0) {
        this.y6i.set(a.MonsterId, a.ParentMonsterId);
      }
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    return true;
  }
  async GetDragCurve() {
    if (!this.u6i) {
      this.u6i = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDragCurve(), UE.CurveFloat, t => {
        this.u6i.SetResult(t);
      });
    }
    await this.u6i.Promise;
    return this.u6i.Promise;
  }
  SetDefaultSkin(t, e) {
    for (var [, r] of this.a6i) {
      if (t === r.GetConfig()?.MonsterId) {
        r.SetSkinId(e);
      }
    }
  }
  SetUnlockSkinList(t) {
    this.E6i = t;
  }
  ConcatUnlockSkinList(t) {
    this.E6i = this.E6i.concat(t);
  }
  GetSkinIsUnlock(t) {
    return this.E6i.includes(t);
  }
  GetMonsterSkinListByMonsterId(t) {
    return this.S6i.get(t);
  }
  GetMonsterSkinListHasNew(t) {
    t = ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomItemById(t);
    if (t) {
      t = t.ParentMonsterId !== 0 ? t.ParentMonsterId : t.MonsterId;
      t = this.S6i.get(t);
      if (t) {
        for (const e of t) {
          if (ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin, e)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  GetMonsterSkinMonsterIdMapByMonsterId(t) {
    return this.y6i.get(t);
  }
  SetMaxCost(t) {
    this.M6i = t;
  }
  GetMaxCost() {
    return this.M6i;
  }
  SetRobotPhantomData(t, e) {
    this.o6i.set(t, e);
  }
  NewPhantomBattleData(t) {
    var e = new PhantomBattleData_1.PhantomBattleData();
    e.SetData(t);
    this.a6i.set(t.b9n, e);
    this.l6i = true;
    return e;
  }
  UpdatePhantomBattleData(t) {
    this.RemovePhantomBattleData(t.b9n);
    var e = new PhantomBattleData_1.PhantomBattleData();
    e.SetData(t);
    this.a6i.set(t.b9n, e);
    this.l6i = true;
    return e;
  }
  RemovePhantomBattleData(t) {
    this.a6i.delete(t);
    this.l6i = true;
  }
  GetPhantomDataBase(t) {
    return this.GetPhantomBattleData(t);
  }
  GetPhantomBattleData(t) {
    return (t < 0 ? this.o6i : this.a6i).get(t);
  }
  GetPhantomInstanceByItemId(t) {
    let e = this.s6i.get(t);
    var r;
    if (!e) {
      r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(t);
      e = new PhantomBattleInstance_1.PhantomBattleInstance(r);
      this.s6i.set(t, e);
    }
    return e;
  }
  CreatePhantomLevelCacheData(t) {
    var e = new LevelUpPastVisionData();
    e.Level = this.GetPhantomBattleData(t).GetPhantomLevel();
    e.AttrListScrollData = this.GetPhantomBattleData(t).GetMainPropShowAttributeList(1);
    e.SlotData = this.GetPhantomBattleData(t).GetCurrentSlotData();
    e.UniqueId = t;
    e.SubProp = this.GetPhantomBattleData(t).GetPhantomSubProp();
    return e;
  }
  CachePhantomLevelUpData(t) {
    this.f6i = t;
  }
  GetCachePhantomLevelUpData() {
    return this.f6i;
  }
  GetLevelUpSuccessData(t) {
    let e = undefined;
    var r = ModelManager_1.ModelManager.PhantomBattleModel.GetCachePhantomLevelUpData();
    const a = new Array();
    var i = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIfLevelMax(t);
    var t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(t);
    if (r.Level !== t.GetPhantomLevel()) {
      this.k6i(r, t).forEach(t => {
        a.push(RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(t));
      });
      e = {
        PreUpgradeLv: r.Level,
        UpgradeLv: t.GetPhantomLevel(),
        FormatStringId: "VisionLevel",
        IsMaxLevel: i
      };
    }
    let n = undefined;
    var i = r.SubProp.length;
    var o = t.GetPhantomSubProp().length;
    var s = t.GetSubPropShowAttributeList(1);
    var h = new Array();
    for (let t = i; t < o; t++) {
      s[t].AddValue = s[t].BaseValue;
      s[t].BaseValue = 0;
      h.push(s[t]);
    }
    h.forEach(t => {
      t = RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(t);
      t.ShowArrow = false;
      t.PreText = undefined;
      a.push(t);
    });
    if (h.length > 0) {
      n = "IdentifySuccess";
    }
    var i = t.GetLevelUnlockSubPropSlotCount(r.Level);
    var l = t.GetLevelUnlockSubPropSlotCount(t.GetPhantomLevel()) - i - h.length;
    if (l > 0) {
      for (let t = 0; t < l; t++) {
        var u = {
          Name: "UnlockSlot",
          ShowArrow: false,
          PreText: ""
        };
        u.CurText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_PhantomUnlock_Text");
        u.IconPath = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpTexture();
        a.push(u);
      }
    }
    return {
      Title: n,
      LevelInfo: e,
      WiderScrollView: false,
      AttributeInfo: a,
      ClickFunction: this.R6i
    };
  }
  k6i(t, e) {
    var a = t.AttrListScrollData;
    var i = e.GetMainPropShowAttributeList(1);
    var n = i.length;
    var o = a.length;
    var s = new Array();
    for (let r = 0; r < n; r++) {
      var h = i[r];
      let e = undefined;
      for (let t = 0; t < o; t++) {
        if (a[t].Id === h.Id && r === t) {
          e = a[t];
          break;
        }
      }
      var l = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(h.Id);
      s.push(new AttrListScrollData_1.AttrListScrollData(h.Id, e.BaseValue, h.BaseValue, l.Priority, e.IsRatio, 2));
    }
    return s;
  }
  PhantomLevelUpReceiveItem(t) {
    var e = [];
    for (const a of Object.keys(t)) {
      var r = [{
        IncId: 0,
        ItemId: Number.parseInt(a)
      }, t[a]];
      e.push(r);
    }
    this.g6i = e;
    this.p6i = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomLevelUpReceiveItem, e);
  }
  GetVisionLevelUpTag() {
    return this.p6i;
  }
  ClearVisionLevelUp() {
    this.p6i = false;
  }
  GetTempSaveItemList() {
    return this.g6i;
  }
  ClearTempSaveItemList() {
    this.g6i = [];
  }
  GetVisionSortUseDataList(t = 0, e = 0) {
    var r = new Array();
    var a = ModelManager_1.ModelManager.InventoryModel;
    for (const s of ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleDataMap().values()) {
      var i;
      var n;
      var o = s.GetUniqueId();
      if ((!(t > 0) || s.GetFetterGroupId() === t) && (!(e > 0) || s.GetCost() === e)) {
        if (s.CheckIfHaveSelectRecommendSubAttr() && s.CheckIfHaveSelectRecommendMainAttr()) {
          i = a.GetPhantomItemData(o);
          n = s.GetConfig();
          o = {
            IsPhantomData: true,
            Id: s.GetUniqueId(),
            Quality: n.QualityId,
            IsEquip: ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(o),
            Role: ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(o),
            Level: s.GetPhantomLevel(),
            IsBreach: s.IsBreach(),
            MonsterId: n.MonsterId,
            MainPropMap: s.GetMainPropArray(),
            SubPropMap: s.GetSubPropArray(),
            IsLock: i.GetIsLock(),
            IsDeprecate: i.GetIsDeprecated(),
            ConfigId: i.GetConfigId(),
            Rarity: n.Rarity
          };
          r.push(o);
        }
      }
    }
    return r;
  }
  GetPhantomBattleDataMap() {
    return this.a6i;
  }
  GetUnEquipVisionArray() {
    if (this.l6i) {
      this.h6i = [];
      this.l6i = false;
      this.GetPhantomBattleDataMap().forEach((t, e) => {
        if (!this.CheckPhantomIsEquip(e)) {
          this.h6i.push(t);
        }
      });
    }
    return this.h6i;
  }
  UpdateRoleEquipmentData(r) {
    var t = this.GetBattleDataById(r.Q6n);
    t.GetIncrIdList().forEach(t => {
      this.n6i.delete(t);
    });
    r.eHn.forEach(t => {
      var e = this.GetPhantomEquipOnRoleId(t);
      if (e > 0) {
        this.GetBattleDataById(e).RemoveIncrIdLocal(t);
      }
      this.n6i.set(t, r.Q6n);
    });
    this.l6i = true;
    t.Phrase(r);
  }
  UpdateRoleEquipmentPropData(t) {
    this.GetBattleDataById(t.Q6n).Phrase(t);
  }
  DeleteBattleData(t) {
    var e = this.r6i.get(t);
    if (e) {
      e.GetIncrIdList().forEach(t => {
        this.n6i.delete(t);
      });
      this.l6i = true;
      this.r6i.delete(t);
    }
  }
  GetBattleDataById(t) {
    let e = this.r6i.get(t);
    e = e || new PhantomRoleEquipmentData_1.PhantomRoleEquipmentData();
    this.r6i.set(t, e);
    return e;
  }
  CheckPhantomIsEquip(t) {
    return t < 0 || t !== 0 && this.n6i.has(t);
  }
  CheckPhantomIsMain(t) {
    var e;
    if (t < 0) {
      return this.GetPhantomDataBase(t).GetIfMain();
    } else {
      return !!this.CheckPhantomIsEquip(t) && (e = this.n6i.get(t), this.GetBattleDataById(e).CheckPhantomIsMain(t));
    }
  }
  CheckPhantomIsSub(t) {
    var e;
    return !!this.CheckPhantomIsEquip(t) && (e = this.n6i.get(t), this.GetBattleDataById(e).CheckPhantomIsSub(t));
  }
  GetPhantomEquipOnRoleId(t) {
    if (this.CheckPhantomIsEquip(t)) {
      return this.n6i.get(t);
    }
  }
  CheckPhantomIndexIsEquipOnRole(t, e) {
    return this.GetBattleDataById(t).GetIndexPhantomId(e) !== -1;
  }
  GetPhantomSumLevelByRoleId(t) {
    return this.GetBattleDataById(t).GetSumEquipLevel();
  }
  GetPhantomIsUnlock(t) {
    for (const e of ModelManager_1.ModelManager.CalabashModel.GetUnlockCalabashDevelopRewards().keys()) {
      if (t === e) {
        return true;
      }
    }
    return false;
  }
  GetIfHasMonsterInInventory(t) {
    t = this.GetPhantomItemIdArrayByMonsterId(t);
    if (!t || t.length === 0) {
      return false;
    }
    let e = false;
    for (const r of t) {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r) > 0) {
        e = true;
        break;
      }
    }
    return e;
  }
  CheckPhantomIfLevelMax(t) {
    t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(t);
    return t.GetPhantomLevel() === ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(t.GetQuality()).LevelLimit;
  }
  CheckMonsterIsEquipOnRole(t, e) {
    return this.GetBattleDataById(t).CheckMonsterIsEquip(e);
  }
  GetVisionIndexOnRole(t, e) {
    return this.GetBattleDataById(e).GetIndexPhantomId(t);
  }
  GetRoleIfEquipVision(t) {
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(t).GetIncrIdList();
    var r = e.length;
    for (let t = 0; t < r; t++) {
      if (e[t] !== 0) {
        return true;
      }
    }
    return false;
  }
  GetRoleIndexPhantomId(t, e) {
    return this.GetBattleDataById(t).GetIndexPhantomId(e);
  }
  GetPhantomIndexOfRole(t, e) {
    var r = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(t).GetIncrIdList();
    var a = r.length;
    for (let t = 0; t < a; t++) {
      if (r[t] === e) {
        return t;
      }
    }
    return -1;
  }
  GetRolePhantomEquipState(t, e, r) {
    if (this.CheckPhantomIsEquip(r)) {
      return this.GetBattleDataById(t).GetPhantomOperationState(e, r);
    } else {
      return 1;
    }
  }
  GetPhantomMaxLevel(t) {
    t = this.GetPhantomBattleData(t);
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(t.GetQuality()).LevelLimit;
  }
  GetFetterListByRoleId(t) {
    t = this.GetTargetRoleFetterList(t);
    if (t.length === 0) {
      return [];
    }
    var e = new Array();
    for (const r of t) {
      e.push(ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(r));
    }
    return e;
  }
  UpdateFetterList(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Phantom", 27, "刷新当前羁绊列表", ["roleId", t]);
    }
    const e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t).GetPhantomData();
    var t = e.GetDataMap();
    var r = [];
    for (const e of t.values()) {
      if (e) {
        r.push(e.GetIncrId());
      }
    }
    e.ClearPhantomFettersList();
    this.F6i(r, e.GetPhantomFettersList());
  }
  F6i(t, e) {
    const r = new Map();
    t.forEach(t => {
      var e;
      var t = this.GetPhantomDataBase(t);
      if (t) {
        e = (r.get(t.GetFetterGroupId()) ?? 0) + 1;
        r.set(t.GetFetterGroupId(), e);
      }
    });
    ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterResultBySuitMap(r).forEach(t => {
      e.push(t);
    });
  }
  GetPreviewFetterAdd(t, e, r) {
    var a = this.GetBattleDataById(r).GetIncrIdList();
    var i = new Array();
    var n = a.length;
    for (let t = 0; t < n; t++) {
      if (this.GetPhantomBattleData(a[t]) && t !== e) {
        i.push(a[t]);
      }
    }
    var o = new Array();
    var s = this.GetTargetRoleFetterList(r);
    var h = new Array();
    i.push(t.GetIncrId());
    this.F6i(i, o);
    for (const l of o) {
      if (!s.includes(l)) {
        h.push(l);
      }
    }
    return h;
  }
  GetPreviewFettersDel(t, e, r) {
    var a = this.GetBattleDataById(r).GetIncrIdList();
    var i = new Array();
    var n = a.length;
    for (let t = 0; t < n; t++) {
      if (this.GetPhantomBattleData(a[t]) && t !== e) {
        i.push(a[t]);
      }
    }
    var o = new Array();
    var r = this.GetTargetRoleFetterList(r);
    var s = new Array();
    i.push(t.GetIncrId());
    this.F6i(i, o);
    for (const h of r) {
      if (!o.includes(h)) {
        s.push(h);
      }
    }
    return s;
  }
  CheckFetterActiveState(t, e) {
    t = this.GetFetterListByRoleId(t);
    if (t && t.length !== 0) {
      for (const r of t) {
        if (r.Id === e) {
          return true;
        }
      }
    }
    return false;
  }
  GetTargetCanActiveFettersList(t) {
    var e = new Map();
    var t = this.GetPhantomDataBase(t);
    const i = new Array();
    if (t) {
      e.set(t.GetFetterGroupId(), 999);
    }
    e.forEach((r, t) => {
      t = PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(t).FetterMap;
      let a;
      t.forEach((t, e) => {
        if (e <= r) {
          a = t;
          i.push(a);
        }
      });
    });
    return i;
  }
  GetRoleFetterData(t) {
    const a = new Array();
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(t).GetIncrIdList();
    var r = e.length;
    var i = new Array();
    for (let t = 0; t < r; t++) {
      var n = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e[t]);
      if (n) {
        i.push(n);
      }
    }
    const o = PhantomDataBase_1.PhantomDataBase.CalculateFetterByPhantomBattleData(i);
    for (let t = 0; t < r; t++) {
      const s = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e[t]);
      if (s) {
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupFetterDataById(s.GetFetterGroupId()).forEach((t, e) => {
          var r = new PhantomDataBase_1.VisionFetterData();
          r.FetterId = t;
          r.FetterGroupId = s.GetFetterGroupId();
          r.ActiveFetterGroupNum = o.get(s.GetFetterGroupId()) ?? 0;
          r.ActiveState = o.get(s.GetFetterGroupId()) >= e;
          a.push(r);
        });
      }
    }
    return a;
  }
  GetTargetRoleFetterList(t) {
    return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t).GetPhantomData().GetPhantomFettersList();
  }
  GetMeshTransform(t) {
    return new UE.Transform(this.V6i(t), this.H6i(t), this.j6i(t));
  }
  j6i(t) {
    t = this.GetPhantomInstanceByItemId(t).GetModelZoom();
    if (t && t.length > 0) {
      this.c6i.X = t[0];
      this.c6i.Y = t[1];
      this.c6i.Z = t[2];
      return this.c6i;
    }
  }
  H6i(t) {
    t = this.GetPhantomInstanceByItemId(t).GetModelLocation();
    if (t && t.length > 0) {
      this.m6i.X = t[0];
      this.m6i.Y = t[1];
      this.m6i.Z = t[2];
      return this.m6i;
    }
  }
  V6i(t) {
    t = this.GetPhantomInstanceByItemId(t).GetModelRotator();
    if (t && t.length > 0) {
      this.d6i.Roll = t[0];
      this.d6i.Pitch = t[1];
      this.d6i.Yaw = t[2];
      return this.d6i;
    }
  }
  GetStandAnim(t) {
    return this.GetPhantomInstanceByItemId(t).GetStandAnim();
  }
  GetPhantomLevelUpItemSortList(t) {
    var e = [];
    var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
    if (r) {
      for (const i of r) {
        var a = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId);
        if (a) {
          e.push(a);
        }
      }
    }
    return e;
  }
  CheckPhantomIfNewQuality(t) {
    var e;
    var r;
    var a = this.GetPhantomDataBase(t);
    let i = false;
    for ([e, r] of this.a6i) {
      if (r.GetMonsterId() === a?.GetMonsterId() && e !== t && r.GetQuality() === a.GetQuality()) {
        i = true;
        break;
      }
    }
    return !i;
  }
  GetEquipRoleName(t) {
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(t);
    if (t > 0) {
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
      return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(t.Name);
    } else {
      return "";
    }
  }
  GetRoleCurrentPhantomCost(t) {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    let r = 0;
    if (e?.IsTrialRole()) {
      var a = e.GetPhantomData().GetDataMap();
      for (let t = 0; t < 5; ++t) {
        var i = a.get(t);
        if (i) {
          r += i.GetCost();
        }
      }
    } else {
      this.GetBattleDataById(t).GetIncrIdList().forEach(t => {
        t = this.GetPhantomBattleData(t);
        if (t) {
          r += t.GetCost();
        }
      });
    }
    return r;
  }
  GetLevelUpNeedCost(t) {
    return Math.floor(t * ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomLevelUpCostRatio());
  }
  ResetLevelUpItemData() {
    this.C6i.clear();
  }
  GetPhantomItemIdArrayByMonsterId(t) {
    t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(t);
    const e = new Array();
    t.forEach(t => {
      e.push(t.ItemId);
    });
    return e;
  }
  GetMonsterRarity(t) {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(t)[0].Rarity;
  }
  GetShowAttrList(t) {
    t = this.GetBattleDataById(t).GetPropShowAttributeList();
    t.sort(this.SortAttrList);
    return t;
  }
  GetExtraAttrList(t) {
    t = this.GetBattleDataById(t).GetPropDetailAttributeList();
    t.sort(this.SortAttrList);
    return t;
  }
  GetFetterGroupMonsterIdArray(t) {
    return this.GetFetterGroupMonsterMap().get(t);
  }
  GetMonsterFindCountByMonsterIdArray(t) {
    let e = 0;
    for (const r of t) {
      if (ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(1, r)) {
        e++;
      }
    }
    return e;
  }
  GetFetterGroupMonsterMap() {
    if (!this._6i) {
      this._6i = new Map();
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupArray().forEach(t => {
        var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupSourceMonster(t.Id);
        const r = new Array();
        e.forEach(t => {
          if (!r.includes(t)) {
            r.push(t);
          }
        });
        this._6i.set(t.Id, r);
      });
    }
    return this._6i;
  }
  GetTrialRoleDetailAttrList(t) {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("VisionMainViewExtraAttribute");
    const r = this.GetTrialRoleAttrList(t);
    const a = r.length;
    const i = [];
    let n = false;
    e.forEach(e => {
      var t = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(e);
      n = false;
      for (let t = 0; t < a; t++) {
        if (r[t].Id === e) {
          i.push(r[t]);
          n = true;
          break;
        }
      }
      if (!n) {
        i.push(new AttrListScrollData_1.AttrListScrollData(e, 0, 0, t.Priority, false, 1));
      }
    });
    return i;
  }
  GetTrialRoleAttrList(t) {
    var e;
    var r;
    var a = new Array();
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleRobotData(t);
    var n = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexList();
    var o = new Map();
    const s = [];
    i.GetPhantomData().GetDataMap().forEach(t => {
      for (const e of t.GetMainTrailProp().values()) {
        s.push(e);
      }
      for (const r of t.GetSubTrailPropMap().values()) {
        s.push(r);
      }
    });
    this.W6i(s, o, t);
    for (const h of n) {
      if (h.IsShow) {
        e = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(h.Id);
        r = (r = o.get(h.Id)) !== undefined ? r : 0;
        a.push(new AttrListScrollData_1.AttrListScrollData(h.Id, 0, r, e.Priority, false, 1));
      }
    }
    a.sort(this.SortAttrList);
    return a;
  }
  W6i(t, r, e) {
    var a;
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    for (const n of t) {
      let t = 0;
      let e = n.AttributeId;
      if (n.AttributeId > AttributeDefine_1.GREEN_ATTRIBUTE_INTERNAL) {
        e -= AttributeDefine_1.GREEN_ATTRIBUTE_INTERNAL;
      }
      t = n.IsRatio ? (i.GetBaseAttributeValueById(e) ?? 0) * (n.AttributeValue / AttributeDefine_1.TEN_THOUSANDTH_RATIO) : n.AttributeValue;
      if (r.has(e)) {
        a = r.get(e);
        r.set(e, a + t);
      } else {
        r.set(e, t);
      }
    }
  }
  set CurrentSelectedFetter(t) {
    this.U6i = t;
  }
  get CurrentSelectedFetter() {
    return this.U6i;
  }
  GetFettersObtainDataList(t) {
    var e = new Array();
    for (const i of t) {
      var r = this.GetPhantomItemIdArrayByMonsterId(i);
      if (r && r.length !== 0) {
        let t = 0;
        for (const n of r) {
          if ((t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(n)) > 0) {
            break;
          }
        }
        var r = this.GetPhantomInstanceByItemId(r[0]);
        var a = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(i);
        var a = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(a.MonsterInfoId);
        var r = {
          Id: i,
          Name: r.PhantomItem.MonsterName,
          Icon: a,
          IsGet: t !== 0
        };
        e.push(r);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "该怪物没有对应道具，请检查幻象道具表是否正确", ["monsterId", i]);
      }
    }
    return e;
  }
  SetPhantomRecommendData(t) {
    this.A6i = new RecommendData();
    this.A6i.RoleId = t.Q6n;
    this.A6i.MonsterIdList = t.wBs;
    this.A6i.MainPropId = t.xBs;
    this.A6i.FetterGroupId = t.Kws;
  }
  get PhantomRecommendData() {
    return this.A6i;
  }
  CheckIfHasPhantomSatisfiedLevelCondition(t, e) {
    let r = [];
    if ((r = t !== 0 ? ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItemId(t) : ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList()).length !== 0) {
      for (const i of r) {
        var a = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(i.GetUniqueId());
        if (a && a.GetPhantomLevel() >= e) {
          return true;
        }
      }
    }
    return false;
  }
  CheckIfHasPhantomLevelMax() {
    for (const t of this.GetPhantomBattleDataMap().values()) {
      if (this.GetPhantomMaxLevel(t.GetUniqueId()) === t.GetPhantomLevel()) {
        return true;
      }
    }
    return false;
  }
  CheckIfExistPhantomCanEquipInItemList(t) {
    for (const r of t) {
      var e = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItemId(r);
      if (e.length === 0) {
        return false;
      }
      for (const a of e) {
        if (!this.CheckPhantomIsEquip(a.GetUniqueId())) {
          return true;
        }
      }
    }
    return false;
  }
  GetPhantomItemNumByItemId(t) {
    var e = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
    if (e.length === 0) {
      return 0;
    }
    let r = 0;
    for (const a of e) {
      if (a.GetConfigId() === t) {
        r++;
      }
    }
    return r;
  }
  static FilterShowAttribute(t) {
    const e = new Array();
    const r = CommonParamById_1.configCommonParamById.GetIntArrayConfig("VisionMainViewShowAttribute");
    t.forEach(t => {
      if (r.includes(t.Id)) {
        e.push(t);
      }
    });
    return e;
  }
  GetCurrentViewShowPhantomList(t) {
    var e = t.IsTrialRole();
    var r = new Array();
    if (e) {
      var a = t.GetPhantomData().GetDataMap();
      for (let t = 0; t < 5; ++t) {
        var i = a.get(t);
        r.push(i);
      }
    } else {
      var n = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(t.GetRoleId()).GetIncrIdList();
      var o = n.length;
      for (let t = 0; t < o; t++) {
        var s = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(n[t]);
        r.push(s);
      }
    }
    return r;
  }
  GetSortedExpMaterialList(t, e, r) {
    return this.GetExpMaterialList(t, e, true, r).sort(this.N6i);
  }
  GetExpMaterialList(t, i = 0, e = false, r = false) {
    var a = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetLevelUpItemList(t);
    const n = [];
    a.forEach(t => {
      var e = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(t.Id);
      var r = e.length;
      for (let t = 0; t < r; t++) {
        var a = e[t];
        if (!(i > 0) || !(a.GetQuality() > i)) {
          n.push(a);
        }
      }
    });
    if (!r) {
      for (const s of ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByMainType(3)) {
        if (s.GetType() === 9) {
          if (s.GetUniqueId() === t) {
            continue;
          }
          if (e && s.GetIsLock()) {
            continue;
          }
          if (i > 0 && s.GetQuality() > i) {
            continue;
          }
          var o = this.GetPhantomBattleData(s.GetUniqueId());
          if (o.GetPhantomLevel() === 0 && o.GetExp() === 0) {
            continue;
          }
          if (this.n6i.has(s.GetUniqueId()) && this.n6i.get(s.GetUniqueId()) !== 0) {
            continue;
          }
        }
        n.push(s);
      }
    }
    return n;
  }
  GetIfSimpleState(t) {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsSimpleDetail);
    return !!e && !!e.has(t) && e.get(t);
  }
  SaveIfSimpleState(t, e) {
    let r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsSimpleDetail);
    (r = r || new Map()).set(t, e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsSimpleDetail, r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeVisionSimplyState);
  }
  SaveVisionSkillState(t, e) {
    let r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSpecialSkillShowMap);
    (r = r || new Map()).set(t, e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSpecialSkillShowMap, r);
  }
  GetIfVisionSkillState(t) {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSpecialSkillShowMap);
    return !!e && !!e.has(t) && e.get(t);
  }
  CalculateExpBackItem(t) {
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
    var r = e.length;
    let a = t;
    var i = new Map();
    for (let t = r - 1; t >= 0; t--) {
      var n = Math.floor(a / e[t].Exp);
      a %= e[t].Exp;
      if (n > 0) {
        i.set(e[t].ItemId, n);
      }
    }
    return i;
  }
  CheckVisionIdentifyRedDot(t) {
    var e;
    var t = this.GetPhantomDataBase(t);
    return !!t && (e = t.GetIfHaveUnIdentifySubProp(), t = t.GetIfHaveEnoughIdentifyConsumeItem(1), e) && t;
  }
  CheckVisionLevelUpSettingRedDot() {
    return !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpSettingRedDot, false) || !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpIdentifyRedDot, false);
  }
  IsVisionHighQuality(t) {
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpQualityLimit();
    return t.GetConfig().QualityId > e;
  }
  IsVisionHighLevel(t) {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpLevelLimit() < t.GetPhantomLevel();
  }
  IsVisionHighRare(t) {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpRareLimit() < t.GetRareConfig().Rare;
  }
  get QualityUnlockTipsList() {
    return this.O6i;
  }
  CacheNewSkinData(t) {
    var e = new VisionUnlockQualityData();
    e.SkinId = t;
    e.MonsterItemId = t;
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(t).QualityId;
    e.UnlockQuality = t;
    ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.push(e);
  }
  CacheNewQualityData(t) {
    t.BBs.forEach(t => {
      var e = new VisionUnlockQualityData();
      var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(t).QualityId;
      e.MonsterItemId = t;
      e.UnlockQuality = r;
      ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.push(e);
    });
  }
  GetMainAttributeKey(t) {
    if (this.GetSortMainAttributeMap().has(t)) {
      return this.GetSortMainAttributeMap().get(t);
    } else if (this.GetSortMainPercentageAttributeMap().has(t)) {
      return this.GetSortMainPercentageAttributeMap().get(t);
    } else {
      return 0;
    }
  }
  GetSortRuleIdByPropIndex(t, e) {
    var r;
    var a;
    for ([r, a] of e === CommonComponentDefine_1.RATIO ? this.GetSortMainPercentageAttributeMap() : this.GetSortMainAttributeMap()) {
      if (t === a) {
        return r;
      }
    }
    return 0;
  }
  GetSortMainAttributeMap() {
    if (!this.I6i) {
      this.I6i = new Map();
      this.I6i.set(8, 10007);
      this.I6i.set(6, 10002);
      this.I6i.set(10, 10010);
      this.I6i.set(12, 8);
      this.I6i.set(13, 9);
      this.I6i.set(14, 35);
      this.I6i.set(15, 21);
      this.I6i.set(16, 22);
      this.I6i.set(17, 23);
      this.I6i.set(18, 24);
      this.I6i.set(19, 25);
      this.I6i.set(20, 26);
      this.I6i.set(21, 27);
      this.I6i.set(22, 11);
    }
    return this.I6i;
  }
  GetSortMainPercentageAttributeMap() {
    if (!this.T6i) {
      this.T6i = new Map();
      this.T6i.set(9, 10007);
      this.T6i.set(7, 10002);
      this.T6i.set(11, 10010);
    }
    return this.T6i;
  }
  GetSubAttributeKey(t) {
    if (this.GetSortSubAttributeMap().has(t)) {
      return this.GetSortSubAttributeMap().get(t);
    } else if (this.GetSortSubPercentageAttributeMap().has(t)) {
      return this.GetSortSubPercentageAttributeMap().get(t);
    } else {
      return 0;
    }
  }
  GetSortSubAttributeMap() {
    if (!this.L6i) {
      this.L6i = new Map();
      this.L6i.set(25, 2);
      this.L6i.set(23, 1);
      this.L6i.set(27, 3);
      this.L6i.set(29, 11);
      this.L6i.set(30, 12);
      this.L6i.set(36, 11);
      this.L6i.set(37, 12);
      this.L6i.set(38, 13);
      this.L6i.set(39, 13);
      this.L6i.set(47, 7);
      this.L6i.set(48, 8);
      this.L6i.set(49, 9);
      this.L6i.set(50, 10);
    }
    return this.L6i;
  }
  GetSortSubPercentageAttributeMap() {
    if (!this.D6i) {
      this.D6i = new Map();
      this.D6i.set(26, 5);
      this.D6i.set(24, 4);
      this.D6i.set(28, 6);
    }
    return this.D6i;
  }
  GmClearData() {
    this.O6i.length = 0;
  }
  RecordVisionRecoveryRedDot(t) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionRecoveryBatchTip, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRecoveryStorage);
  }
  GetVisionRecoveryBatchRedDot() {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionRecoveryBatchTip) ?? true;
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10024001) && t;
  }
  GetVisionRecoverySortPhantomItemList(t) {
    var t = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByAddCountItemInfo(t);
    var e = new Set();
    e.add(3);
    e.add(4);
    ModelManager_1.ModelManager.SortModel.SortDataByData(t, 4, e, false);
    return t;
  }
  RecordVisionRefineRedDot(t) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionRefineTip, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRefineStorage);
  }
  GetVisionRefineRedDot() {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionRefineTip) ?? true;
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10083) && t;
  }
  GetVisionRefineMaterialCost(t) {
    t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(t);
    if (t) {
      return t.GetRareConfig().PolishCost;
    }
  }
  GetVisionRefineMaterialDefaultCost() {
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfigAll();
    if (t) {
      return t[0].PolishCost;
    }
  }
  IsVisionRefineMaterialEnough(t) {
    var e;
    var r;
    for ([e, r] of this.GetVisionRefineMaterialCost(t)) {
      var a = r;
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) < a) {
        return false;
      }
    }
    return true;
  }
  GetPhantomMainRandGroupId(t) {
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(t).MainProp.RandGroupId;
    return e || (Log_1.Log.CheckError() && Log_1.Log.Error("Phantom", 75, "获取幻象主属性组配置失败, 请检查配置表", ["id", t]), -1);
  }
  GetPhantomMainPropItemRefineAvailableIdList(t) {
    var e = this.GetPhantomMainRandGroupId(t);
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyByRandGroupId(e);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 75, "获取幻象主属性池失败, 请检查配置表", ["id", t]);
      }
      return [];
    }
    var r = [];
    for (const i of e) {
      var a = i.PropGroup;
      r.push(a[0]);
    }
    return r;
  }
  GetVisionLevelUpMaterialPutInMode() {
    return this._1l;
  }
  SetVisionLevelUpMaterialPutInMode(t) {
    if (this._1l !== t) {
      this._1l = t;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpMaterialPutInMode, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionLevelUpMaterialPutInModeChange);
    }
  }
  GetVisionLevelUpMaterialUseType() {
    return this.u1l;
  }
  SetVisionLevelUpMaterialUseType(t) {
    if (this.u1l !== t) {
      this.u1l = t;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpMaterialUseType, t);
    }
  }
  GetVisionLevelUpIdentify() {
    return this.gDu;
  }
  SetVisionLevelUpIdentify(t) {
    if (this.gDu !== t) {
      this.gDu = t;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpIdentify, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionLevelUpIdentifyChange);
    }
  }
  GetPhantomBattleDataByPhantomItem(t) {
    var e = new PhantomBattleData_1.PhantomBattleData();
    e.SetData(t);
    return e;
  }
  AddNeedCameraFocusMethodDisableViewCount() {
    this.VH_++;
    this.UpdateCameraFocusMethod();
  }
  ReduceNeedCameraFocusMethodDisableViewCount() {
    this.VH_--;
    this.UpdateCameraFocusMethod();
  }
  UpdateCameraFocusMethod() {
    var t = this.VH_ > 0 ? 3 : 1;
    UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(UiCameraPostEffectComponent_1.UiCameraPostEffectComponent).SetCameraFocusMethod(t);
  }
}
exports.PhantomBattleModel = PhantomBattleModel;
class PhantomSortStruct {
  constructor() {
    this.PhantomPropId = 0;
    this.Value = 0;
    this.IfPercentage = false;
  }
}
exports.PhantomSortStruct = PhantomSortStruct;
class RecommendData {
  constructor() {
    this.RoleId = 0;
    this.MonsterIdList = new Array();
    this.FetterGroupId = 0;
    this.MainPropId = 0;
  }
}
exports.RecommendData = RecommendData;
class VisionUnlockQualityData {
  constructor() {
    this.MonsterItemId = 0;
    this.UnlockQuality = 0;
    this.SkinId = 0;
  }
}
exports.VisionUnlockQualityData = VisionUnlockQualityData;
//# sourceMappingURL=PhantomBattleModel.js.map