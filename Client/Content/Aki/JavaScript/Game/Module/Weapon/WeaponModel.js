"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const WeaponDefine_1 = require("./WeaponDefine");
const WeaponInstance_1 = require("./WeaponInstance");
class WeaponModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Lko = new Map();
    this.Dko = new Map();
    this.Rko = 0;
    this.BlueprintWeaponBreachLevel = 0;
    this.BlueprintWeaponEquippedRoleId = 0;
    this.LevelUpConfirmTipsNotShow = false;
    this.Uko = (e, t) => t.QualityId - e.QualityId;
  }
  AddWeaponData(e) {
    var e = this.CreateWeaponInstance(e);
    var t = e.GetIncId();
    this.Lko.set(t, e);
    var n = e.HasRole();
    if (n && (n = e.GetRoleId(), this.Dko.set(n, t), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Role", 43, "武器设置", ["roleId", n], ["incId", t]);
    }
  }
  RemoveWeaponData(e) {
    var t = this.Lko.get(e);
    if (t) {
      if (t.HasRole()) {
        t = t.GetRoleId();
        this.Dko.delete(t);
      }
      this.Lko.delete(e);
    }
  }
  CreateWeaponInstance(e) {
    var t = new WeaponInstance_1.WeaponInstance();
    t.SetWeaponItem(e);
    return t;
  }
  SetWeaponLevelData(e, t, n) {
    e = this.Lko.get(e);
    if (e) {
      e.SetExp(t);
      e.SetLevel(n);
    }
  }
  SetWeaponBreachData(e, t) {
    e = this.Lko.get(e);
    if (e) {
      e.SetBreachLevel(t);
    }
  }
  SetWeaponResonanceData(e, t) {
    e = this.Lko.get(e);
    if (e) {
      e.SetResonanceLevel(t);
    }
  }
  GetWeaponLevelById(e) {
    e = this.Lko.get(e);
    if (e) {
      return e.GetLevel();
    } else {
      return 0;
    }
  }
  GetWeaponDataByRoleDataId(e, t = true) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e, t);
    if (t.IsTrialRole() || t.IsOnlineRole()) {
      return t.GetWeaponData();
    } else if ((t = this.GetWeaponInstanceByRoleId(e)) !== undefined) {
      return t;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "获取不到武器数据", ["roleDataId", e]);
      }
      return;
    }
  }
  GetWeaponIdByRoleDataId(e) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    if (t) {
      if (t.IsTrialRole()) {
        return t.GetWeaponData().GetItemId();
      } else if ((t = this.GetWeaponInstanceByRoleId(e)) !== undefined) {
        return t.GetItemId();
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Role", 58, "获取不到武器数据", ["roleDataId", e]);
        }
        return;
      }
    } else {
      return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).InitWeaponItemId;
    }
  }
  GetWeaponInstanceByRoleId(e) {
    e = this.Dko.get(e);
    if (e) {
      return this.Lko.get(e);
    }
  }
  GetWeaponDataByIncId(e) {
    return this.Lko.get(e);
  }
  WeaponRoleLoadEquip(e) {
    if (e) {
      for (const o of e) {
        var t = o.mjn;
        var n = o.djn;
        this.ChangeWeaponEquip(n, t);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EquipWeapon);
    }
  }
  WeaponLevelUpResponse(e) {
    this.SetWeaponLevelData(e.w5n, e.gjn, e.Cjn);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeaponLevelUp);
    this.wOo(e._vs);
  }
  wOo(e) {
    var t = [];
    for (const o of Object.keys(e)) {
      var n = [{
        IncId: 0,
        ItemId: Number.parseInt(o)
      }, e[o]];
      t.push(n);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeaponLevelUpReceiveItem, t);
  }
  ChangeWeaponEquip(e, t) {
    var n = this.Lko.get(e);
    var o = n.GetRoleId();
    if (o > 0 && (this.Dko.set(o, 0), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Role", 43, "武器设置", ["lastRoleId", o], ["incId", 0]);
    }
    n.SetRoleId(t);
    if (t > 0 && (this.Dko.set(t, e), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Role", 43, "武器设置", ["roleId", t], ["incId", e]);
    }
  }
  GetCurveValue(e, t, n, o) {
    return t * ((ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponPropertyGrowthConfig(e, n, o)?.CurveValue ?? 0) / WeaponDefine_1.WEAPON_CURVE_RATION);
  }
  GetWeaponListFromReplace(e) {
    var t = [];
    for (const n of ModelManager_1.ModelManager.InventoryModel.GetWeaponItemDataList()) {
      if (this.GetWeaponDataByIncId(n.GetUniqueId()).GetWeaponConfig().WeaponType === e) {
        t.push(n);
      }
    }
    return t;
  }
  GetResonanceMaterialList(e) {
    var t = ModelManager_1.ModelManager.InventoryModel;
    var n = this.GetWeaponDataByIncId(e);
    var o = n.GetItemId();
    var r = [];
    for (const a of t.GetItemDataBaseByMainType(2)) {
      if (a.GetConfigId() === o && a.GetUniqueId() !== e && !this.GetWeaponDataByIncId(a.GetUniqueId()).HasRole()) {
        r.push(a);
      }
    }
    n = n.GetResonanceConfig().AlternativeConsume;
    if (n && n.length > 0) {
      for (const i of n) {
        for (const s of t.GetItemDataBaseByConfigId(i)) {
          r.push(s);
        }
      }
    }
    return r;
  }
  GetWeaponExpMaterialList() {
    var e;
    var t = [];
    for (const n of ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByMainType(2)) {
      if (n.GetType() === 4 && (e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(n.GetConfigId()))) {
        t.push(e);
      }
    }
    t.sort((e, t) => t.QualityId - e.QualityId);
    return t;
  }
  GetCanChangeMaterialList(e) {
    var t = new Map();
    var n = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.ItemConfig.GetConfigListByItemType(4));
    n.sort(this.Uko);
    let o = e;
    for (const i of n) {
      var r;
      var a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(i.Id);
      if (o >= a.BasicExp) {
        r = Math.floor(o / a.BasicExp);
        t.set(i.Id, r);
        o %= a.BasicExp;
      }
    }
    return t;
  }
  GetResonanceNeedMoney(t, n, o) {
    let r = 0;
    for (let e = n; e < o; e++) {
      r += ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(t, e).GoldConsume;
    }
    return r;
  }
  GetWeaponBreachMaxLevel(e) {
    var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreachList(e);
    var n = t.length;
    let o = 0;
    for (let e = 0; e < n; e++) {
      var r = t[e];
      if (r.Level > o) {
        o = r.Level;
      }
    }
    return o;
  }
  GetWeaponItemBaseExp(e) {
    if (e.GetType() === 4) {
      const t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(e.GetConfigId());
      return t.BasicExp;
    }
    const t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponQualityInfo(e.GetQuality());
    return t.BasicExp;
  }
  GetWeaponConfigDescParams(e, t) {
    var n;
    var o = [];
    for (const r of e.DescParams) {
      if (r) {
        n = t >= r.ArrayString.length ? r.ArrayString.length : t;
        n = r.ArrayString[n - 1];
        o.push(n);
      }
    }
    return o;
  }
  GetCurSelectViewName() {
    return this.Rko;
  }
  SetCurSelectViewName(e) {
    this.Rko = e;
  }
  IsWeaponUsedByUncommonRole(e) {
    e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    if (e) {
      e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.GetRoleId());
      if (e && e.GetRoleConfig().RoleType !== 1) {
        return true;
      }
    }
    return false;
  }
  CanItemUseAsExpItem(e) {
    if (e.GetType() === 2 && e.GetUniqueId() > 0) {
      e = this.GetWeaponDataByIncId(e.GetUniqueId());
      if (e.HasRole() || e.GetItemConfig().QualityId >= 5) {
        return false;
      }
    }
    return true;
  }
  IsWeaponHighQuality(e) {
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponQualityCheck() < e.GetItemConfig().QualityId;
  }
  IsWeaponHighLevel(e) {
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponLevelCheck() < e.GetLevel();
  }
  IsWeaponHighResonanceLevel(e) {
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceCheck() < e.GetResonanceLevel();
  }
  HasWeaponResonance(e) {
    return e.GetResonanceLevel() > 1;
  }
  GetWeaponItemExp(e, t) {
    if (e && e > 0) {
      if (e = this.GetWeaponDataByIncId(e)) {
        return e.GetMaterialExp();
      } else {
        return 0;
      }
    } else {
      return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(t).BasicExp;
    }
  }
  GetWeaponItemExpCost(e, t) {
    if (e && e > 0) {
      if (e = this.GetWeaponDataByIncId(e)) {
        return e.GetMaterialCost();
      } else {
        return 0;
      }
    } else {
      return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(t).Cost;
    }
  }
  GetWeaponExpItemListCost(e) {
    let t = 0;
    for (const o of e) {
      if (o[0].ItemId === 0) {
        break;
      }
      var n = this.GetWeaponItemExpCost(o[0].IncId, o[0].ItemId);
      t += n * o[1];
    }
    return t;
  }
  GetWeaponExpItemList(e) {
    var t = [];
    for (const n of ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByMainType(2)) {
      if (this.CanItemUseAsExpItem(n) && e !== n.GetUniqueId()) {
        t.push(n);
      }
    }
    return t;
  }
  GetWeaponExpItemListUseToAuto(e) {
    var t = [];
    for (const o of this.GetWeaponExpItemList(e)) {
      if (!o.GetIsLock()) {
        if (o.GetType() === 2) {
          var n = this.GetWeaponDataByIncId(o.GetUniqueId());
          if (this.IsWeaponHighResonanceLevel(n)) {
            continue;
          }
          if (this.IsWeaponHighLevel(n)) {
            continue;
          }
        }
        t.push(o);
      }
    }
    this.GetWeaponExpItemListWithSort(t);
    return t;
  }
  GetWeaponExpItemListWithSort(e) {
    var t = new Set();
    t.add(2);
    t.add(10);
    t.add(8);
    ModelManager_1.ModelManager.SortModel.SortDataByData(e, 2, t, true);
    return e;
  }
  AutoAddExpItem(e, t, n, o) {
    let r = e;
    var a = [];
    for (const g of n) {
      if (t <= a.length || r <= 0) {
        break;
      }
      var i = o(g);
      var s = Math.ceil(r / i);
      var f = g.Count - g.SelectedCount;
      var s = g.SelectedCount + Math.min(s, f);
      if (s > 0) {
        f = {
          IncId: g.IncId,
          ItemId: g.ItemId,
          Count: g.Count,
          SelectedCount: s
        };
        a.push(f);
        r -= s * i;
      }
    }
    return a;
  }
  CheckSatisfyExp(e, t, n, o) {
    let r = e;
    let a = 0;
    for (const g of n) {
      if (a >= t || r <= 0) {
        break;
      }
      var i = o(g);
      var s = Math.ceil(r / i);
      var f = g.Count - g.SelectedCount;
      var s = g.SelectedCount + Math.min(s, f);
      if (s > 0) {
        a++;
        r -= s * i;
      }
    }
    return r <= 0;
  }
  AutoAddExpItemEx(e, t, n) {
    let o = e;
    for (const s of t) {
      if (o <= 0) {
        break;
      }
      var r = n(s);
      var a = Math.ceil(o / r);
      var i = s.Count - s.SelectedCount;
      var a = s.SelectedCount + Math.min(a, i);
      s.SelectedCount = a;
      o -= a * r;
    }
  }
  GetWeaponAttributeParamList(e) {
    return [{
      PropId: e.FirstPropId,
      CurveId: e.FirstCurve
    }, {
      PropId: e.SecondPropId,
      CurveId: e.SecondCurve
    }];
  }
  GetWeaponBreachState(e) {
    var t;
    var n;
    var e = this.GetWeaponDataByIncId(e);
    var o = e.GetBreachConfig();
    if (!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(o.ConditionId.toString(), undefined, true)) {
      return 3;
    }
    for ([t, n] of e.GetBreachConsume()) {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t) < n) {
        return 0;
      }
    }
    e = o.GoldConsume;
    if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(ItemDefines_1.EItemId.Gold) < e) {
      return 1;
    } else {
      return 2;
    }
  }
  RedDotWeaponBreachCondition(e) {
    e = this.GetWeaponInstanceByRoleId(e);
    return e !== undefined && !!e.CanGoBreach() && this.GetWeaponBreachState(e.GetIncId()) === 2;
  }
  RedDotWeaponResonanceCondition(e) {
    var t;
    var n;
    var e = this.GetWeaponDataByIncId(e);
    return e !== undefined && (t = e.GetResonanceLevel(), !(e.GetWeaponConfig().ResonLevelLimit <= t) && !!(n = e.GetResonanceConfig()) && n.MaterialPlaceType === 1 && n.AlternativeConsume.length !== 0 && !(ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(n.AlternativeConsume[0]) <= 0)) && ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(ItemDefines_1.EItemId.Gold) >= n.GoldConsume;
  }
  RedDotWeaponResonanceConditionByRole(e) {
    e = this.GetWeaponInstanceByRoleId(e)?.GetIncId();
    return !!e && this.RedDotWeaponResonanceCondition(e);
  }
  GetWeaponExpItemConfigList() {
    var e = [];
    var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemList();
    if (t) {
      for (const o of t) {
        var n = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(o.Id);
        if (n) {
          e.push(n);
        }
      }
    }
    return e;
  }
}
exports.WeaponModel = WeaponModel;
//# sourceMappingURL=WeaponModel.js.map