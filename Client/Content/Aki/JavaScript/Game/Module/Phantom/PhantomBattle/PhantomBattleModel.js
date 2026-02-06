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
    this.LevelUpConfirmTipsNotShow = false;
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
    this.YDu = 0;
    this.nye = () => {
      this._1l = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpMaterialPutInMode) ?? 0;
      this.u1l = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpMaterialUseType) ?? 0;
      this.YDu = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpIdentify) ?? 0;
    };
    this.SortAttrList = (e, t) => {
      var r = e.Priority !== 0;
      var a = t.Priority !== 0;
      if (r && a) {
        return e.Priority - t.Priority;
      } else if (r) {
        return -1;
      } else if (a) {
        return 1;
      } else {
        return e.Id - t.Id;
      }
    };
    this.U6i = undefined;
    this.CurrentSelectFetterGroupId = 0;
    this.A6i = undefined;
    this.N6i = (e, t) => {
      var r;
      var a;
      if (e.GetType() !== t.GetType()) {
        return e.GetType() - t.GetType();
      } else if (e.GetQuality() !== t.GetQuality()) {
        return e.GetQuality() - t.GetQuality();
      } else {
        r = this.GetPhantomBattleData(e.GetUniqueId());
        a = this.GetPhantomBattleData(e.GetUniqueId());
        if (r && a && r.GetPhantomLevel() !== a.GetPhantomLevel()) {
          return r.GetPhantomLevel() - a.GetPhantomLevel();
        } else {
          return t.GetUniqueId() - e.GetUniqueId();
        }
      }
    };
    this.O6i = new Array();
    this.VH_ = 0;
  }
  SetCurrentDragIndex(e) {
    this.v6i = e;
  }
  ClearCurrentDragIndex() {
    this.v6i = 999;
  }
  CheckIfCurrentDragIndex(e) {
    return this.v6i === e;
  }
  CheckIfCanDrag() {
    return this.v6i === 999;
  }
  OnInit() {
    for (const a of ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemList()) {
      var t;
      var r = a.ParentMonsterId !== 0 ? a.ParentMonsterId : a.MonsterId;
      let e = this.S6i.get(r);
      e = e || [];
      if (a.ParentMonsterId !== 0) {
        e.push(a.ItemId);
        this.S6i.set(r, e);
      } else if (a.PhantomType === 1 && a.QualityId === 2) {
        (t = []).push(a.ItemId);
        e = t.concat(e);
        this.S6i.set(r, e);
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
      ResourceSystem_1.ResourceSystem.LoadAsync(ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDragCurve(), UE.CurveFloat, e => {
        this.u6i.SetResult(e);
      }, 100, "Ui.PhantomUi");
    }
    await this.u6i.Promise;
    return this.u6i.Promise;
  }
  SetDefaultSkin(e, t) {
    for (var [, r] of this.a6i) {
      if (e === r.GetConfig()?.MonsterId) {
        r.SetSkinId(t);
      }
    }
  }
  SetUnlockSkinList(e) {
    this.E6i = e;
  }
  ConcatUnlockSkinList(e) {
    this.E6i = this.E6i.concat(e);
  }
  GetSkinIsUnlock(e) {
    return this.E6i.includes(e);
  }
  GetMonsterSkinListByMonsterId(e) {
    return this.S6i.get(e);
  }
  GetMonsterSkinListHasNew(e) {
    e = ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomItemById(e);
    if (e) {
      e = e.ParentMonsterId !== 0 ? e.ParentMonsterId : e.MonsterId;
      e = this.S6i.get(e);
      if (e) {
        for (const t of e) {
          if (ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin, t)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  GetMonsterSkinMonsterIdMapByMonsterId(e) {
    return this.y6i.get(e);
  }
  SetMaxCost(e) {
    this.M6i = e;
  }
  GetMaxCost() {
    return this.M6i;
  }
  SetRobotPhantomData(e, t) {
    this.o6i.set(e, t);
  }
  NewPhantomBattleData(e) {
    var t = new PhantomBattleData_1.PhantomBattleData();
    t.SetData(e);
    this.a6i.set(e.b9n, t);
    this.l6i = true;
    return t;
  }
  UpdatePhantomBattleData(e) {
    this.RemovePhantomBattleData(e.b9n);
    var t = new PhantomBattleData_1.PhantomBattleData();
    t.SetData(e);
    this.a6i.set(e.b9n, t);
    this.l6i = true;
    return t;
  }
  RemovePhantomBattleData(e) {
    this.a6i.delete(e);
    this.l6i = true;
  }
  GetPhantomDataBase(e) {
    return this.GetPhantomBattleData(e);
  }
  GetPhantomBattleData(e) {
    return (e < 0 ? this.o6i : this.a6i).get(e);
  }
  GetPhantomInstanceByItemId(e) {
    let t = this.s6i.get(e);
    var r;
    if (!t) {
      r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(e);
      t = new PhantomBattleInstance_1.PhantomBattleInstance(r);
      this.s6i.set(e, t);
    }
    return t;
  }
  CreatePhantomLevelCacheData(e) {
    var t = new LevelUpPastVisionData();
    t.Level = this.GetPhantomBattleData(e).GetPhantomLevel();
    t.AttrListScrollData = this.GetPhantomBattleData(e).GetMainPropShowAttributeList(1);
    t.SlotData = this.GetPhantomBattleData(e).GetCurrentSlotData();
    t.UniqueId = e;
    t.SubProp = this.GetPhantomBattleData(e).GetPhantomSubProp();
    return t;
  }
  CachePhantomLevelUpData(e) {
    this.f6i = e;
  }
  GetCachePhantomLevelUpData() {
    return this.f6i;
  }
  GetLevelUpSuccessData(e) {
    let t = undefined;
    var r = ModelManager_1.ModelManager.PhantomBattleModel.GetCachePhantomLevelUpData();
    const a = new Array();
    var i = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIfLevelMax(e);
    var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(e);
    if (r.Level !== e.GetPhantomLevel()) {
      this.k6i(r, e).forEach(e => {
        a.push(RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(e));
      });
      t = {
        PreUpgradeLv: r.Level,
        UpgradeLv: e.GetPhantomLevel(),
        FormatStringId: "VisionLevel",
        IsMaxLevel: i
      };
    }
    let n = undefined;
    var i = r.SubProp.length;
    var o = e.GetPhantomSubProp().length;
    var s = e.GetSubPropShowAttributeList(1);
    var h = new Array();
    for (let e = i; e < o; e++) {
      s[e].AddValue = s[e].BaseValue;
      s[e].BaseValue = 0;
      h.push(s[e]);
    }
    var i = e.GetLevelUnlockSubPropSlotCount(r.Level);
    var l = e.GetLevelUnlockSubPropSlotCount(e.GetPhantomLevel()) - i - h.length;
    if (h.length > 0 || l > 0) {
      a.push({
        IsLine: true
      });
    }
    h.forEach(e => {
      e = RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(e);
      e.ShowArrow = false;
      e.PreText = undefined;
      a.push(e);
    });
    if (h.length > 0) {
      n = "IdentifySuccess";
    }
    if (l > 0) {
      for (let e = 0; e < l; e++) {
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
      LevelInfo: t,
      WiderScrollView: false,
      AttributeInfo: a
    };
  }
  k6i(e, t) {
    var a = e.AttrListScrollData;
    var i = t.GetMainPropShowAttributeList(1);
    var n = i.length;
    var o = a.length;
    var s = new Array();
    for (let r = 0; r < n; r++) {
      var h = i[r];
      let t = undefined;
      for (let e = 0; e < o; e++) {
        if (a[e].Id === h.Id && r === e) {
          t = a[e];
          break;
        }
      }
      var l = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(h.Id);
      s.push(new AttrListScrollData_1.AttrListScrollData(h.Id, t.BaseValue, h.BaseValue, l.Priority, t.IsRatio, 2));
    }
    return s;
  }
  PhantomLevelUpReceiveItem(e) {
    var t = [];
    for (const a of Object.keys(e)) {
      var r = [{
        IncId: 0,
        ItemId: Number.parseInt(a)
      }, e[a]];
      t.push(r);
    }
    this.g6i = t.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e[0].ItemId);
      return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t[0].ItemId).QualityId - e.QualityId;
    });
    this.p6i = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomLevelUpReceiveItem, t);
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
  ShiftTempSaveItemList() {
    return this.g6i.shift();
  }
  ClearTempSaveItemList() {
    this.g6i = [];
  }
  GetVisionSortUseDataList(e = 0, t = 0) {
    var r = new Array();
    var a = ModelManager_1.ModelManager.InventoryModel;
    for (const s of ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleDataMap().values()) {
      var i;
      var n;
      var o = s.GetUniqueId();
      if ((!(e > 0) || s.GetFetterGroupId() === e) && (!(t > 0) || s.GetCost() === t)) {
        if (s.CheckIfHaveSelectRecommendSubAttr() && s.CheckIfHaveSelectRecommendMainAttr() && s.CheckIfHaveSelectMainPhantomType()) {
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
      this.GetPhantomBattleDataMap().forEach((e, t) => {
        if (!this.CheckPhantomIsEquip(t)) {
          this.h6i.push(e);
        }
      });
    }
    return this.h6i;
  }
  UpdateRoleEquipmentData(r) {
    var e = this.GetBattleDataById(r.Q6n);
    e.GetIncrIdList().forEach(e => {
      this.n6i.delete(e);
    });
    r.eHn.forEach(e => {
      var t = this.GetPhantomEquipOnRoleId(e);
      if (t > 0) {
        this.GetBattleDataById(t).RemoveIncrIdLocal(e);
      }
      this.n6i.set(e, r.Q6n);
    });
    this.l6i = true;
    e.Phrase(r);
  }
  UpdateRoleEquipmentPropData(e) {
    this.GetBattleDataById(e.Q6n).Phrase(e);
  }
  DeleteBattleData(e) {
    var t = this.r6i.get(e);
    if (t) {
      t.GetIncrIdList().forEach(e => {
        this.n6i.delete(e);
      });
      this.l6i = true;
      this.r6i.delete(e);
    }
  }
  GetBattleDataById(e) {
    let t = this.r6i.get(e);
    t = t || new PhantomRoleEquipmentData_1.PhantomRoleEquipmentData();
    this.r6i.set(e, t);
    return t;
  }
  CheckPhantomIsEquip(e) {
    return e < 0 || e !== 0 && this.n6i.has(e);
  }
  CheckPhantomIsMain(e) {
    var t;
    if (e < 0) {
      return this.GetPhantomDataBase(e).GetIfMain();
    } else {
      return !!this.CheckPhantomIsEquip(e) && (t = this.n6i.get(e), this.GetBattleDataById(t).CheckPhantomIsMain(e));
    }
  }
  CheckPhantomIsSub(e) {
    var t;
    return !!this.CheckPhantomIsEquip(e) && (t = this.n6i.get(e), this.GetBattleDataById(t).CheckPhantomIsSub(e));
  }
  GetPhantomEquipOnRoleId(e) {
    if (this.CheckPhantomIsEquip(e)) {
      return this.n6i.get(e);
    }
  }
  CheckPhantomIndexIsEquipOnRole(e, t) {
    return this.GetBattleDataById(e).GetIndexPhantomId(t) !== -1;
  }
  GetPhantomSumLevelByRoleId(e) {
    return this.GetBattleDataById(e).GetSumEquipLevel();
  }
  GetPhantomIsUnlock(e) {
    for (const t of ModelManager_1.ModelManager.CalabashModel.GetUnlockCalabashDevelopRewards().keys()) {
      if (e === t) {
        return true;
      }
    }
    return false;
  }
  GetIfHasMonsterInInventory(e) {
    e = this.GetPhantomItemIdArrayByMonsterId(e);
    if (!e || e.length === 0) {
      return false;
    }
    let t = false;
    for (const r of e) {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r) > 0) {
        t = true;
        break;
      }
    }
    return t;
  }
  CheckPhantomIfLevelMax(e) {
    e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(e);
    return e.GetPhantomLevel() === ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(e.GetQuality()).LevelLimit;
  }
  CheckMonsterIsEquipOnRole(e, t) {
    return this.GetBattleDataById(e).CheckMonsterIsEquip(t);
  }
  GetVisionIndexOnRole(e, t) {
    return this.GetBattleDataById(t).GetIndexPhantomId(e);
  }
  GetRoleIfEquipVision(e) {
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e).GetIncrIdList();
    var r = t.length;
    for (let e = 0; e < r; e++) {
      if (t[e] !== 0) {
        return true;
      }
    }
    return false;
  }
  GetRoleIndexPhantomId(e, t) {
    return this.GetBattleDataById(e).GetIndexPhantomId(t);
  }
  GetPhantomIndexOfRole(e, t) {
    var r = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e).GetIncrIdList();
    var a = r.length;
    for (let e = 0; e < a; e++) {
      if (r[e] === t) {
        return e;
      }
    }
    return -1;
  }
  GetRolePhantomEquipState(e, t, r) {
    if (this.CheckPhantomIsEquip(r)) {
      return this.GetBattleDataById(e).GetPhantomOperationState(t, r);
    } else {
      return 1;
    }
  }
  GetPhantomMaxLevel(e) {
    e = this.GetPhantomBattleData(e);
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityByItemQuality(e.GetQuality()).LevelLimit;
  }
  GetFetterListByRoleId(e) {
    e = this.GetTargetRoleFetterList(e);
    if (e.length === 0) {
      return [];
    }
    var t = new Array();
    for (const r of e) {
      t.push(ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(r));
    }
    return t;
  }
  UpdateFetterList(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Phantom", 27, "刷新当前羁绊列表", ["roleId", e]);
    }
    const t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e).GetPhantomData();
    var e = t.GetDataMap();
    var r = [];
    for (const t of e.values()) {
      if (t) {
        r.push(t.GetIncrId());
      }
    }
    t.ClearPhantomFettersList();
    this.F6i(r, t.GetPhantomFettersList());
  }
  F6i(e, t) {
    const r = new Map();
    e.forEach(e => {
      var t;
      var e = this.GetPhantomDataBase(e);
      if (e) {
        t = (r.get(e.GetFetterGroupId()) ?? 0) + 1;
        r.set(e.GetFetterGroupId(), t);
      }
    });
    ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterResultBySuitMap(r).forEach(e => {
      t.push(e);
    });
  }
  GetPreviewFetterAdd(e, t, r) {
    var a = this.GetBattleDataById(r).GetIncrIdList();
    var i = new Array();
    var n = a.length;
    for (let e = 0; e < n; e++) {
      if (this.GetPhantomBattleData(a[e]) && e !== t) {
        i.push(a[e]);
      }
    }
    var o = new Array();
    var s = this.GetTargetRoleFetterList(r);
    var h = new Array();
    i.push(e.GetIncrId());
    this.F6i(i, o);
    for (const l of o) {
      if (!s.includes(l)) {
        h.push(l);
      }
    }
    return h;
  }
  GetPreviewFettersDel(e, t, r) {
    var a = this.GetBattleDataById(r).GetIncrIdList();
    var i = new Array();
    var n = a.length;
    for (let e = 0; e < n; e++) {
      if (this.GetPhantomBattleData(a[e]) && e !== t) {
        i.push(a[e]);
      }
    }
    var o = new Array();
    var r = this.GetTargetRoleFetterList(r);
    var s = new Array();
    i.push(e.GetIncrId());
    this.F6i(i, o);
    for (const h of r) {
      if (!o.includes(h)) {
        s.push(h);
      }
    }
    return s;
  }
  CheckFetterActiveState(e, t) {
    e = this.GetFetterListByRoleId(e);
    if (e && e.length !== 0) {
      for (const r of e) {
        if (r.Id === t) {
          return true;
        }
      }
    }
    return false;
  }
  GetTargetCanActiveFettersList(e) {
    var t = new Map();
    var e = this.GetPhantomDataBase(e);
    const i = new Array();
    if (e) {
      t.set(e.GetFetterGroupId(), 999);
    }
    t.forEach((r, e) => {
      e = PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(e).FetterMap;
      let a;
      e.forEach((e, t) => {
        if (t <= r) {
          a = e;
          i.push(a);
        }
      });
    });
    return i;
  }
  GetRoleFetterData(e) {
    const a = new Array();
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e).GetIncrIdList();
    var r = t.length;
    var i = new Array();
    for (let e = 0; e < r; e++) {
      var n = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t[e]);
      if (n) {
        i.push(n);
      }
    }
    const o = PhantomDataBase_1.PhantomDataBase.CalculateFetterByPhantomBattleData(i);
    for (let e = 0; e < r; e++) {
      const s = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t[e]);
      if (s) {
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupFetterDataById(s.GetFetterGroupId()).forEach((e, t) => {
          var r = new PhantomDataBase_1.VisionFetterData();
          r.FetterId = e;
          r.FetterGroupId = s.GetFetterGroupId();
          r.ActiveFetterGroupNum = o.get(s.GetFetterGroupId()) ?? 0;
          r.ActiveState = o.get(s.GetFetterGroupId()) >= t;
          a.push(r);
        });
      }
    }
    return a;
  }
  GetTargetRoleFetterList(e) {
    return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e).GetPhantomData().GetPhantomFettersList();
  }
  GetMeshTransform(e) {
    return new UE.Transform(this.V6i(e), this.H6i(e), this.j6i(e));
  }
  j6i(e) {
    e = this.GetPhantomInstanceByItemId(e).GetModelZoom();
    if (e && e.length > 0) {
      this.c6i.X = e[0];
      this.c6i.Y = e[1];
      this.c6i.Z = e[2];
      return this.c6i;
    }
  }
  H6i(e) {
    e = this.GetPhantomInstanceByItemId(e).GetModelLocation();
    if (e && e.length > 0) {
      this.m6i.X = e[0];
      this.m6i.Y = e[1];
      this.m6i.Z = e[2];
      return this.m6i;
    }
  }
  V6i(e) {
    e = this.GetPhantomInstanceByItemId(e).GetModelRotator();
    if (e && e.length > 0) {
      this.d6i.Roll = e[0];
      this.d6i.Pitch = e[1];
      this.d6i.Yaw = e[2];
      return this.d6i;
    }
  }
  GetStandAnim(e) {
    return this.GetPhantomInstanceByItemId(e).GetStandAnim();
  }
  GetPhantomLevelUpItemSortList(e) {
    var t = [];
    var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
    if (r) {
      for (const i of r) {
        var a = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId);
        if (a) {
          t.push(a);
        }
      }
    }
    return t;
  }
  CheckPhantomIfNewQuality(e) {
    var t;
    var r;
    var a = this.GetPhantomDataBase(e);
    let i = false;
    for ([t, r] of this.a6i) {
      if (r.GetMonsterId() === a?.GetMonsterId() && t !== e && r.GetQuality() === a.GetQuality()) {
        i = true;
        break;
      }
    }
    return !i;
  }
  GetEquipRoleName(e) {
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(e);
    if (e > 0) {
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name);
    } else {
      return "";
    }
  }
  GetRoleCurrentPhantomCost(e) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    let r = 0;
    if (t?.IsTrialRole()) {
      var a = t.GetPhantomData().GetDataMap();
      for (let e = 0; e < 5; ++e) {
        var i = a.get(e);
        if (i) {
          r += i.GetCost();
        }
      }
    } else {
      this.GetBattleDataById(e).GetIncrIdList().forEach(e => {
        e = this.GetPhantomBattleData(e);
        if (e) {
          r += e.GetCost();
        }
      });
    }
    return r;
  }
  GetLevelUpNeedCost(e) {
    return Math.floor(e * ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomLevelUpCostRatio());
  }
  ResetLevelUpItemData() {
    this.C6i.clear();
  }
  GetPhantomItemIdArrayByMonsterId(e) {
    e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(e);
    const t = new Array();
    e.forEach(e => {
      t.push(e.ItemId);
    });
    return t;
  }
  GetMonsterRarity(e) {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(e)[0].Rarity;
  }
  GetShowAttrList(e) {
    e = this.GetBattleDataById(e).GetPropShowAttributeList();
    e.sort(this.SortAttrList);
    return e;
  }
  GetExtraAttrList(e) {
    e = this.GetBattleDataById(e).GetPropDetailAttributeList();
    e.sort(this.SortAttrList);
    return e;
  }
  GetFetterGroupMonsterIdArray(e) {
    return this.GetFetterGroupMonsterMap().get(e);
  }
  GetMonsterFindCountByMonsterIdArray(e) {
    let t = 0;
    for (const r of e) {
      if (ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(1, r)) {
        t++;
      }
    }
    return t;
  }
  GetMonsterFindCountByMonsterIdArrayWithoutCost4(e) {
    let t = 0;
    for (const a of e) {
      var r;
      if (ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(1, a) && (r = ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomItemByMonsterId(a)) && r.length !== 0 && (r = r[0].Rarity, (ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomRareConfig(r)).Cost !== 4)) {
        t++;
      }
    }
    return t;
  }
  GetFetterGroupMonsterMap() {
    if (!this._6i) {
      this._6i = new Map();
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupArray().forEach(e => {
        var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupSourceMonster(e.Id);
        const r = new Array();
        t.forEach(e => {
          if (!r.includes(e)) {
            r.push(e);
          }
        });
        this._6i.set(e.Id, r);
      });
    }
    return this._6i;
  }
  GetTrialRoleDetailAttrList(e) {
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("VisionMainViewExtraAttribute");
    const r = this.GetTrialRoleAttrList(e);
    const a = r.length;
    const i = [];
    let n = false;
    t.forEach(t => {
      var e = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t);
      n = false;
      for (let e = 0; e < a; e++) {
        if (r[e].Id === t) {
          i.push(r[e]);
          n = true;
          break;
        }
      }
      if (!n) {
        i.push(new AttrListScrollData_1.AttrListScrollData(t, 0, 0, e.Priority, false, 1));
      }
    });
    return i;
  }
  GetTrialRoleAttrList(e) {
    var t;
    var r;
    var a = new Array();
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleRobotData(e);
    var n = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexList();
    var o = new Map();
    const s = [];
    i.GetPhantomData().GetDataMap().forEach(e => {
      for (const t of e.GetMainTrailProp().values()) {
        s.push(t);
      }
      for (const r of e.GetSubTrailPropMap().values()) {
        s.push(r);
      }
    });
    this.W6i(s, o, e);
    for (const h of n) {
      if (h.IsShow) {
        t = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(h.Id);
        r = (r = o.get(h.Id)) !== undefined ? r : 0;
        a.push(new AttrListScrollData_1.AttrListScrollData(h.Id, 0, r, t.Priority, false, 1));
      }
    }
    a.sort(this.SortAttrList);
    return a;
  }
  W6i(e, r, t) {
    var a;
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    for (const n of e) {
      let e = 0;
      let t = n.AttributeId;
      if (n.AttributeId > AttributeDefine_1.GREEN_ATTRIBUTE_INTERNAL) {
        t -= AttributeDefine_1.GREEN_ATTRIBUTE_INTERNAL;
      }
      e = n.IsRatio ? (i.GetBaseAttributeValueById(t) ?? 0) * (n.AttributeValue / AttributeDefine_1.TEN_THOUSANDTH_RATIO) : n.AttributeValue;
      if (r.has(t)) {
        a = r.get(t);
        r.set(t, a + e);
      } else {
        r.set(t, e);
      }
    }
  }
  set CurrentSelectedFetter(e) {
    this.U6i = e;
  }
  get CurrentSelectedFetter() {
    return this.U6i;
  }
  GetFettersObtainDataList(e) {
    var t = new Array();
    for (const i of e) {
      var r = this.GetPhantomItemIdArrayByMonsterId(i);
      if (r && r.length !== 0) {
        let e = 0;
        for (const n of r) {
          if ((e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(n)) > 0) {
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
          IsGet: e !== 0
        };
        t.push(r);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 27, "该怪物没有对应道具，请检查幻象道具表是否正确", ["monsterId", i]);
      }
    }
    return t;
  }
  SetPhantomRecommendData(e) {
    this.A6i = new RecommendData();
    this.A6i.RoleId = e.Q6n;
    this.A6i.MonsterIdList = e.wBs;
    this.A6i.MainPropId = e.xBs;
    this.A6i.FetterGroupId = e.Kws;
  }
  get PhantomRecommendData() {
    return this.A6i;
  }
  CheckIfHasPhantomSatisfiedLevelCondition(e, t) {
    let r = [];
    if ((r = e !== 0 ? ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItemId(e) : ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList()).length !== 0) {
      for (const i of r) {
        var a = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(i.GetUniqueId());
        if (a && a.GetPhantomLevel() >= t) {
          return true;
        }
      }
    }
    return false;
  }
  CheckIfHasPhantomLevelMax() {
    for (const e of this.GetPhantomBattleDataMap().values()) {
      if (this.GetPhantomMaxLevel(e.GetUniqueId()) === e.GetPhantomLevel()) {
        return true;
      }
    }
    return false;
  }
  CheckIfExistPhantomCanEquipInItemList(e) {
    for (const r of e) {
      var t = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItemId(r);
      if (t.length === 0) {
        return false;
      }
      for (const a of t) {
        if (!this.CheckPhantomIsEquip(a.GetUniqueId())) {
          return true;
        }
      }
    }
    return false;
  }
  GetPhantomItemNumByItemId(e) {
    var t = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
    if (t.length === 0) {
      return 0;
    }
    let r = 0;
    for (const a of t) {
      if (a.GetConfigId() === e) {
        r++;
      }
    }
    return r;
  }
  static FilterShowAttribute(e) {
    const t = new Array();
    const r = CommonParamById_1.configCommonParamById.GetIntArrayConfig("VisionMainViewShowAttribute");
    e.forEach(e => {
      if (r.includes(e.Id)) {
        t.push(e);
      }
    });
    return t;
  }
  GetCurrentViewShowPhantomList(e) {
    var t = e.IsTrialRole();
    var r = new Array();
    if (t) {
      var a = e.GetPhantomData().GetDataMap();
      for (let e = 0; e < 5; ++e) {
        var i = a.get(e);
        r.push(i);
      }
    } else {
      var n = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e.GetRoleId()).GetIncrIdList();
      var o = n.length;
      for (let e = 0; e < o; e++) {
        var s = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(n[e]);
        r.push(s);
      }
    }
    return r;
  }
  GetSortedExpMaterialList(e, t, r) {
    return this.GetExpMaterialList(e, t, true, r).sort(this.N6i);
  }
  GetExpMaterialList(e, i = 0, t = false, r = false) {
    var a = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetLevelUpItemList(e);
    const n = [];
    a.forEach(e => {
      var t = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(e.Id);
      var r = t.length;
      for (let e = 0; e < r; e++) {
        var a = t[e];
        if (!(i > 0) || !(a.GetQuality() > i)) {
          n.push(a);
        }
      }
    });
    if (!r) {
      for (const s of ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByMainType(3)) {
        if (s.GetType() === 9) {
          if (s.GetUniqueId() === e) {
            continue;
          }
          if (t && s.GetIsLock()) {
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
  GetIfSimpleState(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsSimpleDetail);
    return !!t && !!t.has(e) && t.get(e);
  }
  SaveIfSimpleState(e, t) {
    let r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsSimpleDetail);
    (r = r || new Map()).set(e, t);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsSimpleDetail, r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeVisionSimplyState);
  }
  SaveVisionSkillState(e, t) {
    let r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSpecialSkillShowMap);
    (r = r || new Map()).set(e, t);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSpecialSkillShowMap, r);
  }
  GetIfVisionSkillState(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSpecialSkillShowMap);
    return !!t && !!t.has(e) && t.get(e);
  }
  CalculateExpBackItem(e) {
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
    var r = t.length;
    let a = e;
    var i = new Map();
    for (let e = r - 1; e >= 0; e--) {
      var n = Math.floor(a / t[e].Exp);
      a %= t[e].Exp;
      if (n > 0) {
        i.set(t[e].ItemId, n);
      }
    }
    return i;
  }
  CheckVisionIdentifyRedDot(e) {
    var t;
    var e = this.GetPhantomDataBase(e);
    return !!e && (t = e.GetIfHaveUnIdentifySubProp(), e = e.GetIfHaveEnoughIdentifyConsumeItem(1), t) && e;
  }
  CheckVisionLevelUpSettingRedDot() {
    return !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpSettingRedDot, false) || !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpIdentifyRedDot, false);
  }
  IsVisionHighQuality(e) {
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpQualityLimit();
    return e.GetConfig().QualityId > t;
  }
  IsVisionHighLevel(e) {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpLevelLimit() < e.GetPhantomLevel();
  }
  IsVisionHighRare(e) {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpRareLimit() < e.GetRareConfig().Rare;
  }
  get QualityUnlockTipsList() {
    return this.O6i;
  }
  CacheNewSkinData(e) {
    var t = new VisionUnlockQualityData();
    t.SkinId = e;
    t.MonsterItemId = e;
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(e).QualityId;
    t.UnlockQuality = e;
    ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.push(t);
  }
  CacheNewQualityData(e) {
    e.BBs.forEach(e => {
      var t = new VisionUnlockQualityData();
      var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(e).QualityId;
      t.MonsterItemId = e;
      t.UnlockQuality = r;
      ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.push(t);
    });
  }
  GetMainAttributeKey(e) {
    if (this.GetSortMainAttributeMap().has(e)) {
      return this.GetSortMainAttributeMap().get(e);
    } else if (this.GetSortMainPercentageAttributeMap().has(e)) {
      return this.GetSortMainPercentageAttributeMap().get(e);
    } else {
      return 0;
    }
  }
  GetSortRuleIdByPropIndex(e, t) {
    var r;
    var a;
    for ([r, a] of t === CommonComponentDefine_1.RATIO ? this.GetSortMainPercentageAttributeMap() : this.GetSortMainAttributeMap()) {
      if (e === a) {
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
  GetSubAttributeKey(e) {
    if (this.GetSortSubAttributeMap().has(e)) {
      return this.GetSortSubAttributeMap().get(e);
    } else if (this.GetSortSubPercentageAttributeMap().has(e)) {
      return this.GetSortSubPercentageAttributeMap().get(e);
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
  RecordVisionRecoveryRedDot(e) {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10024001)) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionRecoveryBatchTip, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRecoveryStorage);
    }
  }
  GetVisionRecoveryBatchRedDot() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionRecoveryBatchTip) ?? true;
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10024001) && e;
  }
  RecordVisionRecoveryAimRedDot(e) {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10100)) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionRecoveryBatchAimTip, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRecoveryStorage);
    }
  }
  GetVisionRecoveryBatchAimRedDot() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionRecoveryBatchAimTip) ?? true;
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10100) && e;
  }
  GetVisionRecoverySortPhantomItemList(e) {
    var e = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByAddCountItemInfo(e);
    var t = new Set();
    t.add(3);
    t.add(4);
    ModelManager_1.ModelManager.SortModel.SortDataByData(e, 4, t, false);
    return e;
  }
  RecordVisionRefineRedDot(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionRefineTip, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRefineStorage);
  }
  GetVisionRefineRedDot() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionRefineTip) ?? true;
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10083) && e;
  }
  GetVisionRefineMaterialCost(e) {
    e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(e);
    if (e) {
      return e.GetRareConfig().PolishCost;
    }
  }
  GetVisionListRefineMainMaterialCost(e) {
    var t = new Map();
    for (const n of e) {
      var r = this.GetVisionRefineMaterialCost(n);
      if (r !== undefined) {
        for (var [a, i] of r) {
          if (t.has(a)) {
            t.set(a, t.get(a) + i);
          } else {
            t.set(a, i);
          }
        }
      }
    }
    if (t.size !== 0) {
      return t;
    }
  }
  GetVisionRefineSubMaterialCost(e) {
    if (!(e >= 5)) {
      e = ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomVicePolishCostByLockCount(e);
      if (e !== undefined) {
        return e.Cost;
      }
    }
  }
  GetVisionRefineMaterialDefaultCost() {
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfigAll();
    if (e) {
      return e[0].PolishCost;
    }
  }
  GetVisionRefineSubMaterialDefaultCost() {
    var e;
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomVicePolishConfigAll();
    if (t) {
      for ([e] of t[0].Cost) {
        return new Map([[e, 0]]);
      }
    }
  }
  IsVisionRefineMainMaterialEnough(e) {
    var t;
    var r;
    for ([t, r] of this.GetVisionRefineMaterialCost(e)) {
      var a = r;
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t) < a) {
        return false;
      }
    }
    return true;
  }
  IsVisionListRefineMainMaterialEnough(e) {
    var t;
    var r;
    var a = new Map();
    for (const h of e) {
      var i = this.GetVisionRefineMaterialCost(h);
      if (i !== undefined) {
        for (var [n, o] of i) {
          if (a.has(n)) {
            a.set(n, a.get(n) + o);
          } else {
            a.set(n, o);
          }
        }
      }
    }
    for ([t, r] of a) {
      var s = r;
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t) < s) {
        return false;
      }
    }
    return true;
  }
  IsVisionRefineSubMaterialEnough(e) {
    e = this.GetVisionRefineSubMaterialCost(e);
    if (e !== undefined) {
      for (var [t, r] of e) {
        return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t) >= r;
      }
    }
    return false;
  }
  GetPhantomMainRandGroupId(e) {
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(e).MainProp.RandGroupId;
    return t || (Log_1.Log.CheckError() && Log_1.Log.Error("Phantom", 75, "获取幻象主属性组配置失败, 请检查配置表", ["id", e]), -1);
  }
  GetPhantomMainPropItemRefineAvailableIdList(e) {
    var t = this.GetPhantomMainRandGroupId(e);
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyByRandGroupId(t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 75, "获取幻象主属性池失败, 请检查配置表", ["id", e]);
      }
      return [];
    }
    var r = [];
    for (const i of t) {
      var a = i.PropGroup;
      r.push(a[0]);
    }
    return r;
  }
  GetVisionLevelUpMaterialPutInMode() {
    return this._1l;
  }
  SetVisionLevelUpMaterialPutInMode(e) {
    if (this._1l !== e) {
      this._1l = e;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpMaterialPutInMode, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionLevelUpMaterialPutInModeChange);
    }
  }
  GetVisionLevelUpMaterialUseType() {
    return this.u1l;
  }
  SetVisionLevelUpMaterialUseType(e) {
    if (this.u1l !== e) {
      this.u1l = e;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpMaterialUseType, e);
    }
  }
  GetVisionLevelUpIdentify() {
    return this.YDu;
  }
  SetVisionLevelUpIdentify(e) {
    if (this.YDu !== e) {
      this.YDu = e;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpIdentify, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionLevelUpIdentifyChange);
    }
  }
  GetPhantomBattleDataByPhantomItem(e) {
    var t = new PhantomBattleData_1.PhantomBattleData();
    t.SetData(e);
    return t;
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
    var e = this.VH_ > 0 ? 3 : 1;
    UiCameraManager_1.UiCameraManager.Get().GetUiCameraComponent(UiCameraPostEffectComponent_1.UiCameraPostEffectComponent).SetCameraFocusMethod(e);
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