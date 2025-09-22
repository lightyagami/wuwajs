"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObtainedRoleDevWeaponDetailItemData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
class ObtainedRoleDevWeaponDetailItemData {
  constructor() {
    this.C1d = [];
  }
  InitByWeaponInstance(e, t) {
    this.C1d = [];
    var a = t.GetLevel();
    var r = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e).WeaponLevel;
    var i = t.GetBreachLevel();
    var l = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e).WeaponBreachLevel;
    this.fpd(e, t, a, r);
    this.gpd(e, t, i, l);
  }
  fpd(e, t, a, r) {
    e = this.mud(e, t, a, r);
    if (e) {
      this.C1d.push(e);
    }
  }
  gpd(e, t, a, r) {
    e = this.fud(e, t, a, r);
    if (e) {
      for (const i of e) {
        this.C1d.push(i);
      }
    }
  }
  mud(e, t, a, r) {
    if (!(r <= a)) {
      t = this.zNd(t, a, r);
      a = this.VNd();
      r = this.Epd(a, t);
      if (r.length !== 0) {
        return this.jNd(e, r);
      }
    }
  }
  zNd(t, a, r) {
    let i = 0;
    for (let e = a; e <= r; e++) {
      i += t.GetLevelExp(e);
    }
    a = this.k$d(t);
    return i += a;
  }
  k$d(e) {
    var t = e.GetBreachLevel();
    var e = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e.GetRoleId()).WeaponBreachLevel - t;
    if (e <= 0) {
      return 0;
    } else {
      return e * (ConfigManager_1.ConfigManager.RoleDevConfig?.GetRoleDevStaticConfig()?.OverflowExperience ?? 1);
    }
  }
  VNd() {
    var e = [];
    for (const a of ModelManager_1.ModelManager.WeaponModel.GetWeaponExpMaterialList()) {
      var t = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(a.Id);
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
    var a = [];
    var r = this.JNd(e, t, a, 0);
    this.ZNd(e, t, a, r);
    return a;
  }
  JNd(e, t, a, r) {
    let i = r;
    for (const s of e) {
      if (i >= t) {
        break;
      }
      var l = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(s.GetConfigId()).BasicExp;
      var o = Math.ceil((t - i) / l);
      var o = Math.min(o, s.GetCount());
      if (o > 0) {
        a.push({
          ItemId: s.GetConfigId(),
          RequiredCount: o
        });
        i += o * l;
      }
    }
    return i;
  }
  ZNd(e, t, a, r) {
    var i;
    if (!(t <= r) && e.length !== 0) {
      e = e[e.length - 1];
      i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(e.GetConfigId()).BasicExp;
      t = Math.ceil((t - r) / i);
      a.push({
        ItemId: e.GetConfigId(),
        RequiredCount: t
      });
    }
  }
  fud(e, t, a, r) {
    if (!(r <= a)) {
      t = t.GetWeaponConfig();
      if (t) {
        t = this.e3d(t, a, r);
        if (t.length !== 0) {
          return this.$Nd(e, t);
        }
      }
    }
  }
  e3d(t, a, e) {
    var r = [];
    var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(t.BreachId);
    var l = Math.min(i, e);
    for (let e = a; e <= l; e++) {
      var o = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(t.BreachId, e);
      if (o) {
        this.t3d(o, r);
      }
    }
    return r;
  }
  t3d(e, t) {
    for (var [a, r] of e.Consume) {
      if (a !== 1) {
        this.i3d(t, a, r);
      }
    }
  }
  i3d(e, t, a) {
    var r = e.find(e => e.ItemId === t);
    if (r) {
      r.RequiredCount += a;
    } else {
      e.push({
        ItemId: t,
        RequiredCount: a
      });
    }
  }
  $Nd(e, t) {
    t = RoleDevUtils_1.RoleDevUtils.GroupMaterialsByType(t);
    e = RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(e, t, 2);
    if (e.length > 0) {
      return e;
    } else {
      return [];
    }
  }
  get DetailItems() {
    return this.C1d;
  }
}
exports.ObtainedRoleDevWeaponDetailItemData = ObtainedRoleDevWeaponDetailItemData;
//# sourceMappingURL=ObtainedRoleDevWeaponDetailItemData.js.map