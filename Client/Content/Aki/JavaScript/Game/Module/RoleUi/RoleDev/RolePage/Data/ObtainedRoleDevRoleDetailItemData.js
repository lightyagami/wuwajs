"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObtainedRoleDevRoleDetailItemData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ItemDefines_1 = require("../../../../Item/Data/ItemDefines");
const RoleDevUtils_1 = require("../../RoleDevUtils");
class ObtainedRoleDevRoleDetailItemData {
  constructor() {
    this.C1d = [];
  }
  InitByRoleId(e) {
    this.C1d = [];
    var t;
    var a;
    var r;
    var i = this.o3d(e);
    if (i) {
      t = (i = i.GetLevelData()).GetLevel();
      a = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e).RoleLevel;
      i = i.GetBreachLevel();
      r = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e).RoleBreachLevel;
      this.fpd(e, t, a);
      this.gpd(e, i, r);
    }
  }
  o3d(e) {
    return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
  }
  fpd(e, t, a) {
    e = this.y1d(e, t, a);
    if (e) {
      this.C1d.push(e);
    }
  }
  gpd(e, t, a) {
    e = this.S1d(e, t, a);
    if (e) {
      for (const r of e) {
        this.C1d.push(r);
      }
    }
  }
  y1d(e, t, a) {
    if (!(a <= t)) {
      t = this.zNd(e, t, a);
      a = this.VNd();
      a = this.ICd(a, t);
      return this.jNd(e, a);
    }
  }
  zNd(t, a, r) {
    let i = 0;
    for (let e = a; e <= r; e++) {
      i += ModelManager_1.ModelManager.RoleModel.GetRoleLevelUpExp(t, e);
    }
    a = this.k$d(t);
    return i += a;
  }
  k$d(e) {
    var t = this.o3d(e).GetLevelData().GetBreachLevel();
    var e = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e).RoleBreachLevel - t;
    if (e <= 0) {
      return 0;
    } else {
      return e * (ConfigManager_1.ConfigManager.RoleDevConfig?.GetRoleDevStaticConfig()?.OverflowExperience ?? 1);
    }
  }
  VNd() {
    var e = ModelManager_1.ModelManager.RoleModel.GetExpItemInInventory();
    return this.KNd(e);
  }
  KNd(e) {
    return e.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.ItemId);
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.ItemId);
      return (e?.QualityId ?? 0) - (t?.QualityId ?? 0);
    });
  }
  jNd(e, t) {
    t = RoleDevUtils_1.RoleDevUtils.GroupMaterialsByType(t);
    return RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(e, t, 1, 2)[0];
  }
  ICd(e, t) {
    var a = [];
    var r = this.JNd(e, t, a, 0);
    this.ZNd(e, t, a, r);
    return a;
  }
  JNd(e, t, a, r) {
    let i = r;
    for (const o of e) {
      if (i >= t) {
        break;
      }
      var l = ModelManager_1.ModelManager.RoleModel.GetRoleExpItemExp(o.ItemId);
      var s = Math.ceil((t - i) / l);
      var s = Math.min(s, o.Count);
      if (s > 0) {
        a.push({
          ItemId: o.ItemId,
          RequiredCount: s
        });
        i += s * l;
      }
    }
    return i;
  }
  ZNd(e, t, a, r) {
    var i;
    if (!(t <= r)) {
      e = e[e.length - 1];
      i = ModelManager_1.ModelManager.RoleModel.GetRoleExpItemExp(e.ItemId);
      t = Math.ceil((t - r) / i);
      a.push({
        ItemId: e.ItemId,
        RequiredCount: t
      });
    }
  }
  S1d(e, t, a) {
    if (!(a <= t)) {
      t = this.e3d(e, t, a);
      if (t.length !== 0) {
        return this.$Nd(e, t);
      }
    }
  }
  e3d(t, a, r) {
    var i = [];
    for (let e = a + 1; e <= r; e++) {
      var l = ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachConfig(t, e);
      if (l) {
        this.t3d(l, i);
      }
    }
    return i;
  }
  t3d(e, t) {
    for (var [a, r] of e.BreachConsume) {
      if (a !== ItemDefines_1.EItemId.Gold) {
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
    e = RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(e, t, 1);
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
exports.ObtainedRoleDevRoleDetailItemData = ObtainedRoleDevRoleDetailItemData;
//# sourceMappingURL=ObtainedRoleDevRoleDetailItemData.js.map