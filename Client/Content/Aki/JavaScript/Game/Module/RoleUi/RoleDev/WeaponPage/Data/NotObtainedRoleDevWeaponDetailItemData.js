"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotObtainedRoleDevWeaponDetailItemData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CommonItemData_1 = require("../../../../Inventory/ItemData/CommonItemData");
const RoleDevUtils_1 = require("../../RoleDevUtils");
class NotObtainedRoleDevWeaponDetailItemData {
  constructor() {
    this.E1d = [];
  }
  InitByWeaponType(e, t) {
    var a = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e).WeaponBreachLevel - 1;
    var r = this.IYd(t);
    this.E1d = [];
    var t = this.M9d(t);
    if (t) {
      this.SYd(e, r);
      this.Nyd(e, t, 0, a);
    }
  }
  IYd(e) {
    var t;
    var e = this.M9d(e);
    if (e) {
      t = RoleDevUtils_1.RoleDevUtils.GetCurrentProjectNum();
      return e.WeaponTypeExperience[t];
    } else {
      return 0;
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
      var a = this.W7d();
      var a = this.Hyd(a, t);
      if (a.length !== 0) {
        return this.Q7d(e, a);
      }
    }
  }
  W7d() {
    var e = [];
    for (const a of ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemConfigList()) {
      var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(a.Id);
      e.push(new CommonItemData_1.CommonItemData(a.Id, -1, t, 0));
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
    var a = [];
    var r = this.i9d(e, t, a, 0);
    this.r9d(e, t, a, r);
    return a;
  }
  i9d(e, t, a, r) {
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
  r9d(e, t, a, r) {
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
  Nyd(e, t, a, r) {
    t = t.WeaponItemGroup;
    if (t) {
      e = this.jyd(e, t, a, r);
      if (e) {
        for (const i of e) {
          this.E1d.push(i);
        }
      }
    }
  }
  jyd(e, t, a, r) {
    if (!(r < a)) {
      t = this.o9d(t, a, r);
      if (t.length !== 0) {
        return this.X7d(e, t);
      }
    }
  }
  o9d(t, a, r) {
    var i = [];
    for (let e = a; e <= r; e++) {
      var o = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(t, e);
      if (o) {
        this.n9d(o, i);
      }
    }
    return i;
  }
  n9d(e, t) {
    for (var [a, r] of e.Consume) {
      if (a !== 1) {
        this.s9d(t, a, r);
      }
    }
  }
  s9d(e, t, a) {
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
  X7d(e, t) {
    t = RoleDevUtils_1.RoleDevUtils.GroupMaterialsByType(t);
    e = RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(e, t, 2);
    if (e.length > 0) {
      return e;
    } else {
      return [];
    }
  }
  get DetailItems() {
    return this.E1d;
  }
}
exports.NotObtainedRoleDevWeaponDetailItemData = NotObtainedRoleDevWeaponDetailItemData;
//# sourceMappingURL=NotObtainedRoleDevWeaponDetailItemData.js.map