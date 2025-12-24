"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForecastRoleDevWeaponDetailItemData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CommonItemData_1 = require("../../../../Inventory/ItemData/CommonItemData");
const RoleDevUtils_1 = require("../../RoleDevUtils");
class ForecastRoleDevWeaponDetailItemData {
  constructor() {
    this.E1d = [];
  }
  InitByWeaponType(e, t) {
    this.E1d = [];
    var r = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e).WeaponExperience;
    if (this.M9d(t)) {
      this.SYd(e, r);
      this.Nyd(e);
    }
  }
  M9d(e) {
    return ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevWeaponItemConfig(e);
  }
  SYd(e, t) {
    e = this.MYd(e, t);
    if (e) {
      this.E1d.push(e);
    }
  }
  MYd(e, t) {
    if (!(t <= 0)) {
      var r = this.W7d();
      var r = this.Hyd(r, t);
      if (r.length !== 0) {
        return this.Q7d(e, r);
      }
    }
  }
  W7d() {
    var e = [];
    for (const r of ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemConfigList()) {
      var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r.Id);
      e.push(new CommonItemData_1.CommonItemData(r.Id, -1, t, 0));
    }
    return this.J7d(e);
  }
  J7d(e) {
    return e.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.GetConfigId());
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.GetConfigId());
      return (e?.QualityId ?? 0) - (t?.QualityId ?? 0);
    });
  }
  Q7d(e, t) {
    t = RoleDevUtils_1.RoleDevUtils.GroupMaterialsByType(t);
    return RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(e, t, 2)[0];
  }
  Hyd(e, t) {
    var r = [];
    var a = this.i9d(e, t, r, 0);
    this.r9d(e, t, r, a);
    return r;
  }
  i9d(e, t, r, a) {
    let i = a;
    for (const s of e) {
      if (i >= t) {
        break;
      }
      var o = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(s.GetConfigId()).BasicExp;
      var n = Math.ceil((t - i) / o);
      var n = Math.min(n, s.GetCount());
      if (n > 0) {
        r.push({
          ItemId: s.GetConfigId(),
          RequiredCount: n
        });
        i += n * o;
      }
    }
    return i;
  }
  r9d(e, t, r, a) {
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
  Nyd(e) {
    e = this.jyd(e);
    if (e) {
      this.E1d.push(...e);
    }
  }
  $7d(e) {
    return ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e);
  }
  jyd(e) {
    var t = this.$7d(e);
    if (t) {
      t = this.EYd(t);
      if (t.length !== 0) {
        return this.X7d(e, t);
      }
    }
  }
  EYd(e) {
    var t = [];
    for (const a of e.WeaponBreachItemGroup) {
      var r = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsRoleItemConfig(a);
      if (r) {
        t.push(r);
      }
    }
    return t;
  }
  X7d(e, t) {
    var r = [];
    for (const i of t) {
      var a = this.Z7d(i);
      if (a.length > 0) {
        a = this.e9d(e, i, a);
        r.push(...a);
      }
    }
    if (r.length > 0) {
      return r;
    } else {
      return undefined;
    }
  }
  Z7d(e) {
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
  e9d(e, t, r) {
    var a = [];
    a.push({
      Type: t.ItemTypeId,
      Materials: r
    });
    return RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(e, a, 2);
  }
  get DetailItems() {
    return this.E1d;
  }
}
exports.ForecastRoleDevWeaponDetailItemData = ForecastRoleDevWeaponDetailItemData;
//# sourceMappingURL=ForecastRoleDevWeaponDetailItemData.js.map