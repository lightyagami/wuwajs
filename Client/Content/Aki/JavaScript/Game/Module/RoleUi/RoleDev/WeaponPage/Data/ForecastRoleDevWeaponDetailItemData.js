"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForecastRoleDevWeaponDetailItemData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
class ForecastRoleDevWeaponDetailItemData {
  constructor() {
    this.C1d = [];
  }
  InitByWeaponType(e, t) {
    this.C1d = [];
    var r = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e).WeaponExperience;
    if (this.p3d(t)) {
      this.T8d(e, r);
      this.ypd(e);
    }
  }
  p3d(e) {
    return ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevWeaponItemConfig(e);
  }
  T8d(e, t) {
    e = this.b8d(e, t);
    if (e) {
      this.C1d.push(e);
    }
  }
  b8d(e, t) {
    if (!(t <= 0)) {
      var r = this.VNd();
      var r = this.Epd(r, t);
      if (r.length !== 0) {
        return this.jNd(e, r);
      }
    }
  }
  VNd() {
    var e = [];
    for (const r of ModelManager_1.ModelManager.WeaponModel.GetWeaponExpMaterialList()) {
      var t = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(r.Id);
      e.push(...t);
    }
    return this.KNd(e);
  }
  KNd(e) {
    return e.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.GetConfigId());
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.GetConfigId());
      return (e?.QualityId ?? 0) - (t?.QualityId ?? 0);
    });
  }
  jNd(e, t) {
    t = RoleDevUtils_1.RoleDevUtils.GroupMaterialsByType(t);
    return RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(e, t, 2, 12)[0];
  }
  Epd(e, t) {
    var r = [];
    var a = this.JNd(e, t, r, 0);
    this.ZNd(e, t, r, a);
    return r;
  }
  JNd(e, t, r, a) {
    let i = a;
    for (const n of e) {
      if (i >= t) {
        break;
      }
      var o = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(n.GetConfigId()).BasicExp;
      var s = Math.ceil((t - i) / o);
      var s = Math.min(s, n.GetCount());
      if (s > 0) {
        r.push({
          ItemId: n.GetConfigId(),
          RequiredCount: s
        });
        i += s * o;
      }
    }
    return i;
  }
  ZNd(e, t, r, a) {
    var i;
    if (!(t <= a) && e.length !== 0) {
      e = e[e.length - 1];
      i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(e.GetConfigId()).BasicExp;
      t = Math.ceil((t - a) / i);
      r.push({
        ItemId: e.GetConfigId(),
        RequiredCount: t
      });
    }
  }
  ypd(e) {
    e = this.Mpd(e);
    if (e) {
      this.C1d.push(...e);
    }
  }
  NNd(e) {
    return ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e);
  }
  Mpd(e) {
    var t = this.NNd(e);
    if (t) {
      t = this.R8d(t);
      if (t.length !== 0) {
        return this.$Nd(e, t);
      }
    }
  }
  R8d(e) {
    var t = [];
    for (const a of e.WeaponBreachItemGroup) {
      var r = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsRoleItemConfig(a);
      if (r) {
        t.push(r);
      }
    }
    return t;
  }
  $Nd(e, t) {
    var r = [];
    for (const i of t) {
      var a = this.XNd(i);
      if (a.length > 0) {
        a = this.YNd(e, i, a);
        r.push(...a);
      }
    }
    if (r.length > 0) {
      return r;
    } else {
      return undefined;
    }
  }
  XNd(e) {
    var t = [];
    for (const i of e.ItemGroup) {
      var r = i.Item1;
      var a = i.Item2;
      t.push({
        ItemId: r,
        RequiredCount: a
      });
    }
    return t;
  }
  YNd(e, t, r) {
    var a = [];
    a.push({
      Type: t.ItemTypeId,
      Materials: r
    });
    return RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(e, a, 2);
  }
  get DetailItems() {
    return this.C1d;
  }
}
exports.ForecastRoleDevWeaponDetailItemData = ForecastRoleDevWeaponDetailItemData;
//# sourceMappingURL=ForecastRoleDevWeaponDetailItemData.js.map