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
const CalabashSkinItemData_1 = require("./ItemData/CalabashSkinItemData");
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
    this.TBd = new Map();
    this.Yci = new Map();
    this.Jci = new Map();
    this.Zci = undefined;
    this.emi = new Set();
    this.tmi = new Map();
    this.IsConfirmDestruction = false;
    this.B_m = undefined;
    this.Uqu = new Map();
    this.ySd = undefined;
  }
  SetItemNeedCount(e) {
    this.B_m = e;
  }
  GetItemNeedCount() {
    return this.B_m;
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
    var a;
    var r = ModelManager_1.ModelManager.NewFlagModel;
    var n = r.GetNewFlagSet(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Inventory", 37, "[InventoryRedDot]当前本地保存的常规道具红点", ["commonItemRedDotSet", n]);
    }
    if (n && n.size > 0) {
      let t = false;
      for (const o of n) {
        let e = false;
        if (e = this.GetCommonItemCount(o) <= 0 || (a = this.GetCommonItemData(o, 0)) && a.GetRedDotDisableRule() === 0 ? true : e) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Inventory", 37, "[InventoryRedDot]消除常规道具红点", ["configId", o]);
          }
          r.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot, o);
          t = true;
        }
      }
      if (t) {
        this.SaveRedDotCommonItemConfigIdList();
      }
    }
    n = r.GetNewFlagSet(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Inventory", 37, "[InventoryRedDot]当前本地保存的属性道具红点", ["attributeItemRedDotSet", n]);
    }
    if (n) {
      let e = false;
      for (const i of n) {
        var t = this.GetAttributeItemData(i);
        if (t) {
          if (t?.GetCount() <= 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Inventory", 37, "[InventoryRedDot]消除属性道具红点", ["uniqueId", i]);
            }
            r.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot, i);
            e = true;
          }
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Inventory", 37, "[InventoryRedDot]消除属性道具红点", ["uniqueId", i]);
          }
          r.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot, i);
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
    for (const a of this.Qci) {
      var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(a);
      if (t?.bShowInInventoryView) {
        e.push(t);
      }
    }
    return e;
  }
  imi(e) {
    var t = e.GetType();
    let a = this.Yci.get(t);
    if (!a) {
      a = new Set();
      this.Yci.set(t, a);
    }
    a.add(e);
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
    let a = this.Jci.get(t);
    if (!a) {
      a = new ItemMainTypeMapping_1.ItemMainTypeMapping(t);
      this.Jci.set(t, a);
    }
    a.Add(e);
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
  NewCommonItemData(e, t, a = 0, r) {
    t = new CommonItemData_1.CommonItemData(e, a, t, 0, r);
    let n = this.Xci.get(e);
    if (!(n = n || new Map()).get(a)) {
      n.set(a, t);
      this.Xci.set(e, n);
      this.imi(t);
      this.nmi(t);
      this.hmi(t);
    }
  }
  RemoveCommonItemData(e, t = 0) {
    var a;
    var r = this.Xci.get(e);
    if (r && (a = r.get(t))) {
      r.delete(t);
      if (r.size === 0) {
        this.Xci.delete(e);
      }
      this.omi(a);
      this.smi(a);
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
      for (const a of Array.from(e.values())) {
        if (a.IsValid()) {
          t.push(a);
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
    for (const a of this.GetAllPhantomItemDataIterator()) {
      if (a.GetConfigId() === e) {
        t.push(a);
      }
    }
    return t;
  }
  GetAllWeaponItemDataByConfigId(e) {
    var t = [];
    for (const a of this.GetWeaponItemDataList()) {
      if (a.GetConfigId() === e) {
        t.push(a);
      }
    }
    return t;
  }
  GetAllWeaponItemDataByQualityAndType(e, t) {
    var a = [];
    for (const r of this.GetWeaponItemDataList()) {
      if ((e === 0 || r.GetQuality() === e) && (t === 0 || r.GetConfig().WeaponType === t)) {
        a.push(r);
      }
    }
    return a;
  }
  GetCommonItemCount(e, t = 0) {
    e = this.GetCommonItemData(e, t);
    if (e) {
      return e.GetCount();
    } else {
      return 0;
    }
  }
  NewWeaponItemData(e, t, a) {
    if (!this.dWt.get(t)) {
      e = new WeaponItemData_1.WeaponItemData(e, t, a, 2);
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
  NewPhantomItemData(e, t, a) {
    if (!this.$ci.get(t)) {
      e = new PhantomItemData_1.PhantomItemData(e, t, a, 3);
      this.$ci.set(t, e);
      this.imi(e);
      this.nmi(e);
    }
  }
  UpdatePhantomItemData(e) {
    var t = e.s5n;
    var a = e.b9n;
    var e = e.Vws;
    this.RemovePhantomItemData(a);
    this.NewPhantomItemData(t, a, e);
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
  NewCalabashSkinItemData(e) {
    var t;
    if (!this.TBd.get(e)) {
      t = new CalabashSkinItemData_1.CalabashSkinItemData(e, 1, 18);
      this.TBd.set(e, t);
      this.imi(t);
      this.nmi(t);
    }
  }
  ClearCommonItemData() {
    for (const a of this.Xci.values()) {
      for (const r of a.values()) {
        var e = r.GetMainType();
        var t = r.GetType();
        this.ami(e);
        this.rmi(t);
      }
    }
    this.Xci.clear();
  }
  ClearWeaponItemData() {
    for (const a of this.dWt.values()) {
      var e = a.GetMainType();
      var t = a.GetType();
      this.ami(e);
      this.rmi(t);
    }
    this.dWt.clear();
  }
  ClearPhantomItemData() {
    for (const a of this.$ci.values()) {
      var e = a.GetMainType();
      var t = a.GetType();
      this.ami(e);
      this.rmi(t);
    }
    this.$ci.clear();
  }
  ClearCalabashSkinItemData() {
    for (const a of this.TBd.values()) {
      var e = a.GetMainType();
      var t = a.GetType();
      this.ami(e);
      this.rmi(t);
    }
    this.TBd.clear();
  }
  ClearAllItemData() {
    this.ClearCommonItemData();
    this.ClearWeaponItemData();
    this.ClearPhantomItemData();
    this.ClearCalabashSkinItemData();
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
    for (const a of this.$ci.values()) {
      if (a.GetConfigId() === e) {
        t.push(a);
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
      for (const a of t.values()) {
        if (a.IsValid()) {
          e.push(a);
        }
      }
    }
    return e;
  }
  GetCommonItemByItemType(e) {
    var t = [];
    for (const a of this.Xci.values()) {
      for (const r of a.values()) {
        if (r.GetType() === e && r.IsValid()) {
          t.push(r);
        }
      }
    }
    return t;
  }
  GetCommonItemByShowType(e) {
    var t = [];
    for (const a of this.Xci.values()) {
      for (const r of a.values()) {
        if (r.GetShowTypeList().includes(e) && r.IsValid()) {
          t.push(r);
        }
      }
    }
    return t;
  }
  GetWeaponItemByItemType(e) {
    var t = [];
    for (const a of this.GetWeaponItemDataList()) {
      if (a.GetType() === e) {
        t.push(a);
      }
    }
    return t;
  }
  GetPhantomItemByItemType(e) {
    var t = [];
    for (const a of this.$ci.values()) {
      if (a.GetType() === e) {
        t.push(a);
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
      for (const a of e.GetSet()) {
        if (a.IsValid()) {
          t.add(a);
        }
      }
    }
    return t;
  }
  GetInventoryItemGridCountByMainType(e) {
    var t;
    let a = 0;
    for (const r of this.GetItemDataBaseByMainType(e)) {
      if (r.GetType() !== 0) {
        if (r instanceof CommonItemData_1.CommonItemData) {
          if (!((t = r.GetMaxStackCount()) <= 0)) {
            a += Math.ceil(r.GetCount() / t);
          }
        } else {
          a += 1;
        }
      }
    }
    return a;
  }
  GetItemDataBaseByItemType(e) {
    var t = new Set();
    var e = this.Yci.get(e);
    if (e) {
      for (const a of e) {
        if (a.IsValid()) {
          t.add(a);
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
        return this.cYu(e);
      case 18:
        return this.bBd(e);
      default:
        return this.GetCommonItemCount(e, t);
    }
  }
  GetGetWayDataList(e) {
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    if (!t.ItemAccess || t.ItemAccess.length <= 0) {
      return [];
    }
    var a = [];
    for (const n of t.ItemAccess) {
      var r = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(n);
      if (r) {
        r = {
          Id: n,
          Type: r?.Type,
          Text: r?.Description,
          SortIndex: r?.SortIndex,
          Function: () => {
            SkipTaskManager_1.SkipTaskManager.RunByConfigId(n, e);
          }
        };
        a.push(r);
      }
    }
    a.sort((e, t) => {
      var a = e.SortIndex;
      var r = t.SortIndex;
      if (a === r) {
        return t.Id - e.Id;
      } else {
        return r - a;
      }
    });
    return a;
  }
  umi(e) {
    let t = 0;
    for (const a of this.GetWeaponItemDataList()) {
      if (a.GetConfigId() === e) {
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
  cYu(e) {
    if (ModelManager_1.ModelManager.PhantomArenaModel?.IsCardUnlock(e) ?? false) {
      return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e).CardGroupNum;
    } else {
      return 0;
    }
  }
  bBd(e) {
    return ModelManager_1.ModelManager.CalabashSkinModel.GetSkinCountById(e);
  }
  cmi(e) {
    let t = 0;
    for (const a of this.GetAllPhantomItemDataIterator()) {
      if (a.GetConfigId() === e) {
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
    var a = ModelManager_1.ModelManager.PersonalModel.GetCardDataList();
    var r = a.length;
    for (let e = 0; e < r; e++) {
      var n = a[e];
      if (n.CardId === t && n.IsUnLock) {
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
    var a;
    return !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot, e) && !!(a = this.GetCommonItemData(e, t)) && a.GetRedDotDisableRule() !== 0 && (t !== 0 ? ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot, t) : ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot, e), true);
  }
  TryAddRedDotAttributeItem(e) {
    var t;
    return !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot, e) && !!(t = this.GetAttributeItemData(e)) && t.GetRedDotDisableRule() !== 0 && (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot, e), true);
  }
  HasRedDot() {
    var e = ModelManager_1.ModelManager.NewFlagModel;
    var t = e.GetNewFlagSet(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot);
    let a = 0;
    if (t) {
      a = t.size;
    }
    let r = 0;
    t = e.GetNewFlagSet(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot);
    if (t) {
      r = t.size;
    }
    return a > 0 || r > 0;
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
    for (const a of t) {
      if (a.ItemId === e) {
        return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) >= a.Count;
      }
    }
    return true;
  }
  GetPhantomManageConfigClear() {
    return this.Uqu.size === 0;
  }
  GetPhantomManageConfigByType(e) {
    if (this.Uqu.size !== 0 && this.Uqu.get(e)) {
      return this.Uqu.get(e);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Inventory", 75, "批量管理方案未初始化");
      }
      return [];
    }
  }
  GetPhantomManageConfigByTypeAndIndex(e, t) {
    for (const a of this.GetPhantomManageConfigByType(e)) {
      if (a.GetIndex() === t) {
        return a;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Inventory", 75, "批量管理方案未初始化");
    }
  }
  UpdatePhantomManageConfig(e, t) {
    var a = t.Axu;
    var t = this.Uqu.get(e);
    if (a && t) {
      var r = a.c5n;
      for (const n of t) {
        if (r === n.GetIndex()) {
          n.Parse(a);
          break;
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Inventory", 75, "批量管理方案更新失败");
    }
  }
  CoverAllPhantomManageConfig(e) {
    this.Uqu.clear();
    for (const s of e) {
      var t = s.Pxu;
      let e = this.Uqu.get(t);
      if (!e) {
        e = [];
        this.Uqu.set(t, e);
      }
      var a;
      var r = s.Axu;
      if (r) {
        (a = new PhantomManageConfigData_1.PhantomManageConfigData(r.c5n)).SetType(t);
        a.Parse(r);
        e.push(a);
        this.Uqu.set(t, e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Inventory", 43, "批量管理方案设置数据为空");
      }
    }
    for (var [n, o] of this.Uqu.entries()) {
      while (o.length < this.GetConfigMaxCountConst()) {
        var i = new PhantomManageConfigData_1.PhantomManageConfigData(o.length);
        i.SetType(n);
        o.push(i);
      }
    }
  }
  InitPhantomManageConfig(e) {
    this.Uqu.clear();
    this.Dqu(Protocol_1.Aki.Protocol.Oxu.Proto_AutoLock, e.xxu);
    this.Dqu(Protocol_1.Aki.Protocol.Oxu.Proto_AutoDisuse, e.Uxu);
  }
  Bqu(e, t) {
    for (const a of t) {
      if (a.c5n === e) {
        return a;
      }
    }
  }
  Dqu(t, a) {
    var r = [];
    var n = this.GetConfigMaxCountConst();
    for (let e = 0; e < n; e++) {
      var o = new PhantomManageConfigData_1.PhantomManageConfigData(e);
      o.SetType(t);
      var i = this.Bqu(e, a);
      if (i) {
        o.Parse(i);
      }
      r.push(o);
    }
    this.Uqu.set(t, r);
  }
  GetSettingTitleItemDataList() {
    var e = this.GetFilterIdConst();
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(e)?.RuleList;
    var a = [];
    if (t) {
      for (const n of t) {
        var r = {
          FilterId: e,
          FilterRuleId: n
        };
        a.push(r);
      }
    }
    return a;
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
  SetPhantomManageSelectSet(e) {
    this.ySd = e;
  }
  GetPhantomManageSelectSet() {
    return this.ySd;
  }
}
exports.InventoryModel = InventoryModel;
//# sourceMappingURL=InventoryModel.js.map