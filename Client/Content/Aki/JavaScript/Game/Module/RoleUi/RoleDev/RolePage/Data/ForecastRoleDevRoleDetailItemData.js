"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForecastRoleDevRoleDetailItemData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
class ForecastRoleDevRoleDetailItemData {
  constructor() {
    this.E1d = [];
  }
  InitByRoleId(e) {
    this.E1d = [];
    this.V7d(e);
    this.j7d(e);
  }
  V7d(e) {
    e = this.jvd(e);
    if (e) {
      this.E1d.push(e);
    }
  }
  j7d(e) {
    e = this.H7d(e);
    if (e) {
      this.E1d.push(...e);
    }
  }
  jvd(e) {
    var t = this.$7d(e);
    if (t) {
      t = t.RoleExperience;
      if (!(t <= 0)) {
        var r = this.W7d();
        var r = this.$vd(r, t);
        if (r.length !== 0) {
          return this.Q7d(e, r);
        }
      }
    }
  }
  H7d(e) {
    var t = this.$7d(e);
    if (t) {
      t = this.K7d(t);
      if (t.length !== 0) {
        return this.X7d(e, t);
      }
    }
  }
  $vd(e, t) {
    var r = [];
    var a = this.Y7d(e, t, r, 0);
    this.z7d(e, t, r, a);
    return r;
  }
  $7d(e) {
    return ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e);
  }
  W7d() {
    var e = ModelManager_1.ModelManager.RoleModel.GetExpItemInInventory();
    return this.J7d(e);
  }
  J7d(e) {
    return e.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.ItemId);
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.ItemId);
      return (e?.QualityId ?? 0) - (t?.QualityId ?? 0);
    });
  }
  Q7d(e, t) {
    t = RoleDevUtils_1.RoleDevUtils.GroupMaterialsByType(t);
    return RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(e, t, 1)[0];
  }
  Y7d(e, t, r, a) {
    let i = a;
    for (const l of e) {
      if (i >= t) {
        break;
      }
      var o = ModelManager_1.ModelManager.RoleModel.GetRoleExpItemExp(l.ItemId);
      var s = Math.ceil((t - i) / o);
      var s = Math.min(s, l.Count);
      if (s > 0) {
        r.push({
          ItemId: l.ItemId,
          RequiredCount: s
        });
        i += s * o;
      }
    }
    return i;
  }
  z7d(e, t, r, a) {
    var i;
    if (!(t <= a)) {
      e = e[e.length - 1];
      i = ModelManager_1.ModelManager.RoleModel.GetRoleExpItemExp(e.ItemId);
      t = Math.ceil((t - a) / i);
      r.push({
        ItemId: e.ItemId,
        RequiredCount: t
      });
    }
  }
  K7d(e) {
    var t = [];
    for (const a of e.RoleItemGroup) {
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
    return RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(e, a, 1);
  }
  get DetailItems() {
    return this.E1d;
  }
}
exports.ForecastRoleDevRoleDetailItemData = ForecastRoleDevRoleDetailItemData;
//# sourceMappingURL=ForecastRoleDevRoleDetailItemData.js.map