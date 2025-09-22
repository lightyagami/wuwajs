"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotObtainedRoleDevWeaponDetailItemData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
class NotObtainedRoleDevWeaponDetailItemData {
  constructor() {
    this.C1d = [];
  }
  InitByWeaponType(e, t) {
    var a = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e).WeaponBreachLevel;
    var r = this.w8d(t);
    this.C1d = [];
    var t = this.p3d(t);
    if (t) {
      this.T8d(e, r);
      this.ypd(e, t, 0, a);
    }
  }
  w8d(e) {
    var t;
    var e = this.p3d(e);
    if (e) {
      t = RoleDevUtils_1.RoleDevUtils.GetCurrentProjectNum();
      return e.WeaponTypeExperience[t];
    } else {
      return 0;
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
      var a = this.VNd();
      var a = this.Epd(a, t);
      if (a.length !== 0) {
        return this.jNd(e, a);
      }
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
    for (const n of e) {
      if (i >= t) {
        break;
      }
      var o = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(n.GetConfigId()).BasicExp;
      var s = Math.ceil((t - i) / o);
      var s = Math.min(s, n.GetCount());
      if (s > 0) {
        a.push({
          ItemId: n.GetConfigId(),
          RequiredCount: s
        });
        i += s * o;
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
  ypd(e, t, a, r) {
    t = t.WeaponItemGroup;
    if (t) {
      e = this.Mpd(e, t, a, r);
      if (e) {
        for (const i of e) {
          this.C1d.push(i);
        }
      }
    }
  }
  Mpd(e, t, a, r) {
    if (!(r <= a)) {
      t = this.e3d(t, a, r);
      if (t.length !== 0) {
        return this.$Nd(e, t);
      }
    }
  }
  e3d(t, a, r) {
    var i = [];
    for (let e = a; e <= r; e++) {
      var o = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(t, e);
      if (o) {
        this.t3d(o, i);
      }
    }
    return i;
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
exports.NotObtainedRoleDevWeaponDetailItemData = NotObtainedRoleDevWeaponDetailItemData;
//# sourceMappingURL=NotObtainedRoleDevWeaponDetailItemData.js.map