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
    this.C1d = [];
  }
  InitByRoleId(e) {
    this.C1d = [];
    this.qNd(e);
    this.GNd(e);
  }
  qNd(e) {
    e = this.MCd(e);
    if (e) {
      this.C1d.push(e);
    }
  }
  GNd(e) {
    e = this.FNd(e);
    if (e) {
      this.C1d.push(...e);
    }
  }
  MCd(e) {
    var t = this.NNd(e);
    if (t) {
      t = t.RoleExperience;
      if (!(t <= 0)) {
        var r = this.VNd();
        var r = this.ICd(r, t);
        if (r.length !== 0) {
          return this.jNd(e, r);
        }
      }
    }
  }
  FNd(e) {
    var t = this.NNd(e);
    if (t) {
      t = this.HNd(t);
      if (t.length !== 0) {
        return this.$Nd(e, t);
      }
    }
  }
  ICd(e, t) {
    var r = [];
    var a = this.WNd(e, t, r, 0);
    this.QNd(e, t, r, a);
    return r;
  }
  NNd(e) {
    return ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e);
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
    return RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(e, t, 1)[0];
  }
  WNd(e, t, r, a) {
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
  QNd(e, t, r, a) {
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
  HNd(e) {
    var t = [];
    for (const a of e.RoleItemGroup) {
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
    return RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(e, a, 1);
  }
  get DetailItems() {
    return this.C1d;
  }
}
exports.ForecastRoleDevRoleDetailItemData = ForecastRoleDevRoleDetailItemData;
//# sourceMappingURL=ForecastRoleDevRoleDetailItemData.js.map