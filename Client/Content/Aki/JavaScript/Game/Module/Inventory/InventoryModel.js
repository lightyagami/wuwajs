"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const SkipTaskManager_1 = require("../SkipInterface/SkipTaskManager");
const InventoryDefine_1 = require("./InventoryDefine");
const CommonItemData_1 = require("./ItemData/CommonItemData");
const PhantomItemData_1 = require("./ItemData/PhantomItemData");
const WeaponItemData_1 = require("./ItemData/WeaponItemData");
const ItemMainTypeMapping_1 = require("./ItemMainTypeMapping");
const PhantomManageConfigData_1 = require("./Views/PhantomManageConfigData");
const CD_TIME_REASON = "限时物品主动添加倒计时 [ConfigId:{0}, UniqueId:{1}]";
class InventoryModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Hci = 0;
    this.jci = undefined;
    this.Wci = 0;
    this.Kci = undefined;
    this.Qci = undefined;
    this.Xci = new Map();
    this.dWt = new Map();
    this.$ci = new Map();
    this.Yci = new Map();
    this.Jci = new Map();
    this.Zci = undefined;
    this.emi = new Set();
    this.tmi = new Map();
    this.IsConfirmDestruction = false;
    this.lqu = new Map();
  }
  OnInit() {
    return !(ConfigManager_1.ConfigManager.InventoryConfig.GetAllMainTypeConfig().length <= 0) && !(this.SetSelectedTypeIndex(0), 0);
  }
  OnClear() {
    this.ClearAllItemData();
    for (const e of this.tmi.values()) {
      TimerSystem_1.RealTimeTimerSystem.Remove(e);
    }
    this.tmi.clear();
    return true;
  }
  RefreshItemRedDotSet() {
    var t = ModelManager_1.ModelManager.NewFlagModel;
    var r = t.GetNewFlagSet(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Inventory", 37, "[InventoryRedDot]当前本地保存的常规道具红点", ["commonItemRedDotSet", r]);
    }
    if (r && r.size > 0) {
      let e = false;
      for (const o of r) {
        if (this.GetCommonItemCount(o) <= 0) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Inventory", 37, "[InventoryRedDot]消除常规道具红点", ["configId", o]);
          }
          t.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot, o);
          e = true;
        }
      }
      if (e) {
        this.SaveRedDotCommonItemConfigIdList();
      }
    }
    r = t.GetNewFlagSet(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Inventory", 37, "[InventoryRedDot]当前本地保存的属性道具红点", ["attributeItemRedDotSet", r]);
    }
    if (r) {
      let e = false;
      for (const n of r) {
        var a = this.GetAttributeItemData(n);
        if (a) {
          if (a?.GetCount() <= 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Inventory", 37, "[InventoryRedDot]消除属性道具红点", ["uniqueId", n]);
            }
            t.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot, n);
            e = true;
          }
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Inventory", 37, "[InventoryRedDot]消除属性道具红点", ["uniqueId", n]);
          }
          t.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot, n);
          e = true;
        }
      }
      if (e) {
        this.SaveRedDotAttributeItemUniqueIdList();
      }
    }
  }
  SetInventoryTabOpenIdList(e) {
    this.Qci = e;
  }
  GetOpenIdMainTypeConfig() {
    var e = [];
    for (const r of this.Qci) {
      var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(r);
      if (t?.bShowInInventoryView) {
        e.push(t);
      }
    }
    return e;
  }
  imi(e) {
    var t = e.GetType();
    let r = this.Yci.get(t);
    if (!r) {
      r = new Set();
      this.Yci.set(t, r);
    }
    r.add(e);
  }
  omi(e) {
    var t = e.GetType();
    var t = this.Yci.get(t);
    if (t) {
      t.delete(e);
    }
  }
  rmi(e) {
    this.Yci.delete(e);
  }
  nmi(e) {
    var t = e.GetMainType();
    let r = this.Jci.get(t);
    if (!r) {
      r = new ItemMainTypeMapping_1.ItemMainTypeMapping(t);
      this.Jci.set(t, r);
    }
    r.Add(e);
  }
  smi(e) {
    var t = e.GetMainType();
    var t = this.Jci.get(t);
    if (t) {
      t.Remove(e);
    }
  }
  ami(e) {
    this.Jci.delete(e);
  }
  NewCommonItemData(e, t, r = 0, a) {
    t = new CommonItemData_1.CommonItemData(e, r, t, 0, a);
    let o = this.Xci.get(e);
    if (!(o = o || new Map()).get(r)) {
      o.set(r, t);
      this.Xci.set(e, o);
      this.imi(t);
      this.nmi(t);
      this.hmi(t);
    }
  }
  RemoveCommonItemData(e, t = 0) {
    var r;
    var a = this.Xci.get(e);
    if (a && (r = a.get(t))) {
      a.delete(t);
      if (a.size === 0) {
        this.Xci.delete(e);
      }
      this.omi(r);
      this.smi(r);
    }
  }
  RemoveCommonItemDataAndSaveNewList(e) {
    for (const t of e) {
      this.RemoveCommonItemData(t.ItemId, t.IncId);
      this.RemoveNewCommonItem(t.ItemId, t.IncId);
      this.RemoveRedDotCommonItem(t.ItemId, t.IncId);
    }
    this.SaveNewCommonItemConfigIdList();
    this.SaveNewAttributeItemUniqueIdList();
    this.SaveRedDotCommonItemConfigIdList();
    this.SaveRedDotAttributeItemUniqueIdList();
  }
  hmi(e) {
    if (e.GetEndTime() > 0) {
      if (e.IsOverTime()) {
        ControllerHolder_1.ControllerHolder.InventoryController.InvalidItemRemoveRequest();
      } else {
        const t = e.GetEndTime() + TimerSystem_1.MIN_TIME;
        if (!this.emi.has(t)) {
          e = StringUtils_1.StringUtils.Format(CD_TIME_REASON, e.GetConfigId().toString(), e.GetUniqueId().toString());
          if (e = TimerSystem_1.RealTimeTimerSystem.EmitOnTime(() => {
            this.lmi(t);
          }, t, undefined, e)) {
            this.emi.add(t);
            this.tmi.set(t, e);
          }
        }
      }
    }
  }
  lmi(e) {
    ControllerHolder_1.ControllerHolder.InventoryController.InvalidItemRemoveRequest();
    var t = this.tmi.get(e);
    if (t) {
      TimerSystem_1.RealTimeTimerSystem.Remove(t);
      this.tmi.delete(e);
    }
    this.emi.delete(e);
  }
  GetCommonItemData(e, t = 0) {
    e = this.Xci.get(e);
    if (e) {
      e = e.get(t);
      if (!e || e.IsValid()) {
        return e;
      }
    }
  }
  GetAllCommonItemDataByConfigId(e) {
    var t = [];
    var e = this.Xci.get(e);
    if (e) {
      for (const r of Array.from(e.values())) {
        if (r.IsValid()) {
          t.push(r);
        }
      }
    }
    return t;
  }
  GetItemDataBaseByConfigId(e) {
    switch (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e)) {
      case 2:
        return this.GetAllWeaponItemDataByConfigId(e);
      case 3:
        return this.GetAllPhantomItemDataByConfigId(e);
      default:
        return this.GetAllCommonItemDataByConfigId(e);
    }
  }
  GetAllPhantomItemDataByConfigId(e) {
    var t = [];
    for (const r of this.GetAllPhantomItemDataIterator()) {
      if (r.GetConfigId() === e) {
        t.push(r);
      }
    }
    return t;
  }
  GetAllWeaponItemDataByConfigId(e) {
    var t = [];
    for (const r of this.GetWeaponItemDataList()) {
      if (r.GetConfigId() === e) {
        t.push(r);
      }
    }
    return t;
  }
  GetAllWeaponItemDataByQualityAndType(e, t) {
    var r = [];
    for (const a of this.GetWeaponItemDataList()) {
      if ((e === 0 || a.GetQuality() === e) && (t === 0 || a.GetConfig().WeaponType === t)) {
        r.push(a);
      }
    }
    return r;
  }
  GetCommonItemCount(e, t = 0) {
    e = this.GetCommonItemData(e, t);
    if (e) {
      return e.GetCount();
    } else {
      return 0;
    }
  }
  NewWeaponItemData(e, t, r) {
    if (!this.dWt.get(t)) {
      e = new WeaponItemData_1.WeaponItemData(e, t, r, 2);
      this.dWt.set(t, e);
      this.imi(e);
      this.nmi(e);
    }
  }
  RemoveWeaponItemData(e) {
    var t = this.dWt.get(e);
    if (t) {
      this.dWt.delete(e);
      this.omi(t);
      this.smi(t);
    }
  }
  RemoveWeaponItemDataAndSaveNewList(e) {
    for (const t of e) {
      this.RemoveWeaponItemData(t);
      this.RemoveNewAttributeItem(t);
      this.RemoveRedDotAttributeItem(t);
    }
    this.SaveNewAttributeItemUniqueIdList();
    this.SaveRedDotAttributeItemUniqueIdList();
  }
  GetWeaponItemData(e) {
    return this.dWt.get(e);
  }
  NewPhantomItemData(e, t, r) {
    if (!this.$ci.get(t)) {
      e = new PhantomItemData_1.PhantomItemData(e, t, r, 3);
      this.$ci.set(t, e);
      this.imi(e);
      this.nmi(e);
    }
  }
  UpdatePhantomItemData(e) {
    var t = e.s5n;
    var r = e.b9n;
    var e = e.Vws;
    this.RemovePhantomItemData(r);
    this.NewPhantomItemData(t, r, e);
  }
  RemovePhantomItemData(e) {
    var t = this.$ci.get(e);
    if (t) {
      this.$ci.delete(e);
      this.omi(t);
      this.smi(t);
    }
  }
  RemovePhantomItemDataAndSaveNewList(e) {
    for (const t of e) {
      this.RemovePhantomItemData(t);
      this.RemoveNewAttributeItem(t);
      this.RemoveRedDotAttributeItem(t);
    }
    this.SaveNewAttributeItemUniqueIdList();
    this.SaveRedDotAttributeItemUniqueIdList();
  }
  GetPhantomItemData(e) {
    return this.$ci.get(e);
  }
  ClearCommonItemData() {
    for (const r of this.Xci.values()) {
      for (const a of r.values()) {
        var e = a.GetMainType();
        var t = a.GetType();
        this.ami(e);
        this.rmi(t);
      }
    }
    this.Xci.clear();
  }
  ClearWeaponItemData() {
    for (const r of this.dWt.values()) {
      var e = r.GetMainType();
      var t = r.GetType();
      this.ami(e);
      this.rmi(t);
    }
    this.dWt.clear();
  }
  ClearPhantomItemData() {
    for (const r of this.$ci.values()) {
      var e = r.GetMainType();
      var t = r.GetType();
      this.ami(e);
      this.rmi(t);
    }
    this.$ci.clear();
  }
  ClearAllItemData() {
    this.ClearCommonItemData();
    this.ClearWeaponItemData();
    this.ClearPhantomItemData();
    this.Yci.clear();
    this.Jci.clear();
  }
  GetAttributeItemData(e) {
    let t = this.GetWeaponItemData(e);
    return t = (t = t || this.GetPhantomItemData(e)) || ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e);
  }
  GetWeaponItemDataList() {
    var e = [];
    for (const t of this._mi()) {
      if (!ModelManager_1.ModelManager.WeaponModel.IsWeaponUsedByUncommonRole(t.GetUniqueId())) {
        e.push(t);
      }
    }
    return e;
  }
  GetPhantomItemDataList() {
    var e = [];
    for (const t of this.$ci.values()) {
      e.push(t);
    }
    return e;
  }
  GetUnEquipPhantomItemDataList() {
    var e = this.GetPhantomItemDataList();
    const t = [];
    e.forEach(e => {
      if (!ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(e.GetUniqueId())) {
        t.push(e);
      }
    });
    return t;
  }
  GetPhantomItemDataListByPhantomItemId(e) {
    var t = [];
    for (const r of this.$ci.values()) {
      if (r.GetConfigId() === e) {
        t.push(r);
      }
    }
    return t;
  }
  GetPhantomItemDataListByPhantomItem(e) {
    const t = [];
    e.forEach(e => {
      e = this.GetPhantomItemDataByPhantomItem(e);
      t.push(e);
    });
    return t;
  }
  GetPhantomItemDataByPhantomItem(e) {
    var t = new PhantomItemData_1.PhantomItemData(e.s5n, e.b9n, e.Vws, 3);
    t.SetFetterGroupId(e.Kws);
    return t;
  }
  GetPhantomItemDataListByAddCountItemInfo(e) {
    const t = [];
    e.forEach(e => {
      e = new PhantomItemData_1.PhantomItemData(e.s5n, e.b9n, 0, 3);
      t.push(e);
    });
    return t;
  }
  GetCommonItemDataList() {
    var e = [];
    for (const t of this.Xci.values()) {
      for (const r of t.values()) {
        if (r.IsValid()) {
          e.push(r);
        }
      }
    }
    return e;
  }
  GetCommonItemByItemType(e) {
    var t = [];
    for (const r of this.Xci.values()) {
      for (const a of r.values()) {
        if (a.GetType() === e && a.IsValid()) {
          t.push(a);
        }
      }
    }
    return t;
  }
  GetCommonItemByShowType(e) {
    var t = [];
    for (const r of this.Xci.values()) {
      for (const a of r.values()) {
        if (a.GetShowTypeList().includes(e) && a.IsValid()) {
          t.push(a);
        }
      }
    }
    return t;
  }
  GetWeaponItemByItemType(e) {
    var t = [];
    for (const r of this.GetWeaponItemDataList()) {
      if (r.GetType() === e) {
        t.push(r);
      }
    }
    return t;
  }
  GetPhantomItemByItemType(e) {
    var t = [];
    for (const r of this.$ci.values()) {
      if (r.GetType() === e) {
        t.push(r);
      }
    }
    return t;
  }
  GetItemDataBase(e) {
    var t = e.IncId;
    if (t > 0) {
      return [this.GetAttributeItemData(t)];
    } else {
      return this.GetItemDataBaseByConfigId(e.ItemId);
    }
  }
  GetItemMainTypeMapping(e) {
    return this.Jci.get(e);
  }
  GetItemDataBaseByMainType(e) {
    var t = new Set();
    var e = this.Jci.get(e);
    if (e) {
      for (const r of e.GetSet()) {
        if (r.IsValid()) {
          t.add(r);
        }
      }
    }
    return t;
  }
  GetInventoryItemGridCountByMainType(e) {
    var t;
    let r = 0;
    for (const a of this.GetItemDataBaseByMainType(e)) {
      if (a.GetType() !== 0) {
        if (a instanceof CommonItemData_1.CommonItemData) {
          if (!((t = a.GetMaxStackCount()) <= 0)) {
            r += Math.ceil(a.GetCount() / t);
          }
        } else {
          r += 1;
        }
      }
    }
    return r;
  }
  GetItemDataBaseByItemType(e) {
    var t = new Set();
    var e = this.Yci.get(e);
    if (e) {
      for (const r of e) {
        if (r.IsValid()) {
          t.add(r);
        }
      }
    }
    return t;
  }
  _mi() {
    return this.dWt.values();
  }
  GetAllPhantomItemDataIterator() {
    return this.$ci.values();
  }
  SetSelectedItemViewData(e) {
    this.Kci = e;
  }
  SetCurrentLockItemUniqueId(e) {
    this.Wci = e;
  }
  GetSelectedItemData() {
    return this.Kci;
  }
  get GetCurrentLockItemUniqueId() {
    return this.Wci;
  }
  SetSelectedTypeIndex(e) {
    this.Hci = e;
  }
  GetSelectedTypeIndex() {
    return this.Hci;
  }
  SetOutsideUniqueId(e) {
    this.jci = e;
  }
  GetOutsideUniqueId() {
    return this.jci;
  }
  ClearOutsideUniqueId() {
    this.jci = undefined;
  }
  GetItemCountByConfigId(e, t = 0) {
    if (e in ItemDefines_1.EItemId) {
      return ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(e);
    }
    switch (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e)) {
      case 2:
        return this.umi(e);
      case 3:
        return this.cmi(e);
      case 6:
        return this.mmi(e);
      case 8:
        return this.dmi(e);
      case 9:
        return this.ee1(e);
      case 10:
        return this.Qtl(e);
      case 11:
        return this.Zvl(e);
      case 12:
        return this.Cr_(e);
      case 14:
        return this.dGc(e);
      case 15:
        return this.VHc(e);
      default:
        return this.GetCommonItemCount(e, t);
    }
  }
  GetGetWayDataList(e) {
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    if (!t.ItemAccess || t.ItemAccess.length <= 0) {
      return [];
    }
    var r = [];
    for (const o of t.ItemAccess) {
      var a = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(o);
      if (a) {
        a = {
          Id: o,
          Type: a?.Type,
          Text: a?.Description,
          SortIndex: a?.SortIndex,
          Function: () => {
            SkipTaskManager_1.SkipTaskManager.RunByConfigId(o, e);
          }
        };
        r.push(a);
      }
    }
    r.sort((e, t) => {
      var r = e.SortIndex;
      var a = t.SortIndex;
      if (r === a) {
        return t.Id - e.Id;
      } else {
        return a - r;
      }
    });
    return r;
  }
  umi(e) {
    let t = 0;
    for (const r of this.GetWeaponItemDataList()) {
      if (r.GetConfigId() === e) {
        t++;
      }
    }
    return t;
  }
  dmi(e) {
    return ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeCurrency(e) ?? 0;
  }
  ee1(e) {
    return ModelManager_1.ModelManager.ActivityPermanentRogueModel?.GetCurrency(e) ?? 0;
  }
  Qtl(e) {
    return ModelManager_1.ModelManager.WeaponSkinModel?.GetSkinCountById(e) ?? 0;
  }
  Zvl(e) {
    return ModelManager_1.ModelManager.RoleSkinModel?.GetSkinCountById(e) ?? 0;
  }
  dGc(e) {
    return ModelManager_1.ModelManager.FlySkinModel?.GetFlySkinItemCount(e) ?? 0;
  }
  VHc(e) {
    if (ModelManager_1.ModelManager.PhantomArenaModel?.IsCardUnlock(e) ?? false) {
      return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e).CardGroupNum;
    } else {
      return 0;
    }
  }
  cmi(e) {
    let t = 0;
    for (const r of this.GetAllPhantomItemDataIterator()) {
      if (r.GetConfigId() === e) {
        t++;
      }
    }
    return t;
  }
  Cr_(e) {
    e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e);
    if (e && !e.Lock) {
      return 1;
    } else {
      return 0;
    }
  }
  mmi(t) {
    var r = ModelManager_1.ModelManager.PersonalModel.GetCardDataList();
    var a = r.length;
    for (let e = 0; e < a; e++) {
      var o = r[e];
      if (o.CardId === t && o.IsUnLock) {
        return 1;
      }
    }
    return 0;
  }
  TryAddNewCommonItem(e, t = 0) {
    if (t !== 0) {
      return this.TryAddNewAttributeItem(t);
    } else {
      return !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem, e) && (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGetNewItem, e), true);
    }
  }
  TryAddNewAttributeItem(e) {
    return !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem, e) && (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGetNewItem, e), true);
  }
  RemoveNewCommonItem(e, t = 0) {
    if (t !== 0) {
      return this.RemoveNewAttributeItem(t);
    } else {
      return ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem, e);
    }
  }
  RemoveNewAttributeItem(e) {
    return ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem, e);
  }
  SaveNewCommonItemConfigIdList() {
    return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem);
  }
  SaveNewAttributeItemUniqueIdList() {
    return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem);
  }
  IsNewCommonItem(e, t = 0) {
    if (t !== 0) {
      return this.IsNewAttributeItem(t);
    } else {
      return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem, e);
    }
  }
  IsNewAttributeItem(e) {
    return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem, e);
  }
  GetNewAttributeItemUniqueIdList() {
    return ModelManager_1.ModelManager.NewFlagModel.GetNewFlagSet(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem);
  }
  TryAddRedDotCommonItem(e, t = 0) {
    var r;
    return !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot, e) && !!(r = this.GetCommonItemData(e, t)) && r.GetRedDotDisableRule() !== 0 && (t !== 0 ? ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot, t) : ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot, e), true);
  }
  TryAddRedDotAttributeItem(e) {
    var t;
    return !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot, e) && !!(t = this.GetAttributeItemData(e)) && t.GetRedDotDisableRule() !== 0 && (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot, e), true);
  }
  HasRedDot() {
    var e = ModelManager_1.ModelManager.NewFlagModel;
    var t = e.GetNewFlagSet(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot);
    let r = 0;
    if (t) {
      r = t.size;
    }
    let a = 0;
    t = e.GetNewFlagSet(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot);
    if (t) {
      a = t.size;
    }
    return r > 0 || a > 0;
  }
  IsMainTypeHasRedDot(e) {
    return this.GetItemMainTypeMapping(e)?.HasRedDot() ?? false;
  }
  IsCommonItemHasRedDot(e, t = 0) {
    if (t !== 0) {
      return this.IsAttributeItemHasRedDot(t);
    } else {
      return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot, e);
    }
  }
  IsAttributeItemHasRedDot(e) {
    return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot, e);
  }
  RemoveRedDotCommonItem(e, t = 0) {
    if (t !== 0) {
      return this.RemoveRedDotAttributeItem(t);
    } else {
      return !!ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot, e) && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveItemRedDot), true);
    }
  }
  RemoveRedDotAttributeItem(e) {
    return !!ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot, e) && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveItemRedDot), true);
  }
  SaveRedDotCommonItemConfigIdList() {
    return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot);
  }
  SaveRedDotAttributeItemUniqueIdList() {
    return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot);
  }
  SetAcquireData(e) {
    this.Zci = e;
  }
  GetAcquireData() {
    return this.Zci;
  }
  CheckIsCoinEnough(e, t) {
    for (const r of t) {
      if (r.ItemId === e) {
        return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) >= r.Count;
      }
    }
    return true;
  }
  GetPhantomManageConfigClear() {
    return this.lqu.size === 0;
  }
  GetPhantomManageConfigByType(e) {
    if (this.lqu.size !== 0 && this.lqu.get(e)) {
      return this.lqu.get(e);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Inventory", 75, "批量管理方案未初始化");
      }
      return [];
    }
  }
  GetPhantomManageConfigByTypeAndIndex(e, t) {
    for (const r of this.GetPhantomManageConfigByType(e)) {
      if (r.GetIndex() === t) {
        return r;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Inventory", 75, "批量管理方案未初始化");
    }
  }
  UpdatePhantomManageConfig(e, t) {
    var r = t.rxu;
    var t = this.lqu.get(e);
    if (r && t) {
      var a = r.c5n;
      for (const o of t) {
        if (a === o.GetIndex()) {
          o.Parse(r);
          break;
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Inventory", 75, "批量管理方案更新失败");
    }
  }
  CoverAllPhantomManageConfig(e) {
    this.lqu.clear();
    for (const s of e) {
      var t = s.oxu;
      let e = this.lqu.get(t);
      if (!e) {
        e = [];
        this.lqu.set(t, e);
      }
      var r;
      var a = s.rxu;
      if (a) {
        (r = new PhantomManageConfigData_1.PhantomManageConfigData(a.c5n)).SetType(t);
        r.Parse(a);
        e.push(r);
        this.lqu.set(t, e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Inventory", 43, "批量管理方案设置数据为空");
      }
    }
    for (var [o, n] of this.lqu.entries()) {
      while (n.length < this.GetConfigMaxCountConst()) {
        var i = new PhantomManageConfigData_1.PhantomManageConfigData(n.length);
        i.SetType(o);
        n.push(i);
      }
    }
  }
  InitPhantomManageConfig(e) {
    this.lqu.clear();
    this._qu(Protocol_1.Aki.Protocol._xu.Proto_AutoLock, e.nxu);
    this._qu(Protocol_1.Aki.Protocol._xu.Proto_AutoDisuse, e.sxu);
  }
  uqu(e, t) {
    for (const r of t) {
      if (r.c5n === e) {
        return r;
      }
    }
  }
  _qu(t, r) {
    var a = [];
    var o = this.GetConfigMaxCountConst();
    for (let e = 0; e < o; e++) {
      var n = new PhantomManageConfigData_1.PhantomManageConfigData(e);
      n.SetType(t);
      var i = this.uqu(e, r);
      if (i) {
        n.Parse(i);
      }
      a.push(n);
    }
    this.lqu.set(t, a);
  }
  GetSettingTitleItemDataList() {
    var e = this.GetFilterIdConst();
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(e)?.RuleList;
    var r = [];
    if (t) {
      for (const o of t) {
        var a = {
          FilterId: e,
          FilterRuleId: o
        };
        r.push(a);
      }
    }
    return r;
  }
  GetFilterIdConst() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomAutoLockFilterId") ?? 0;
  }
  GetConfigMaxCountConst() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomSettingFilterMaxCount") ?? InventoryDefine_1.MANAGE_CONFIG_MAX_COUNT;
  }
  GetGridTypeByFilterRuleId(e) {
    return InventoryDefine_1.recFilterRuleToGirdType[e] ?? 1;
  }
}
exports.InventoryModel = InventoryModel;
//# sourceMappingURL=InventoryModel.js.map