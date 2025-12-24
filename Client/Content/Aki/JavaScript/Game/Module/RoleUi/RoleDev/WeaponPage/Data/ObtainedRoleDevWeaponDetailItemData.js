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
    this.E1d = [];
  }
  InitByWeaponInstance(e, t) {
    this.E1d = [];
    var a = t.GetLevel();
    var r = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e).WeaponLevel;
    var i = t.GetBreachLevel();
    var l = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e).WeaponBreachLevel - 1;
    this.kyd(e, t, a, r);
    this.Oyd(e, t, i, l);
  }
  kyd(e, t, a, r) {
    e = this.yud(e, t, a, r);
    if (e) {
      this.E1d.push(e);
    }
  }
  Oyd(e, t, a, r) {
    e = this.Sud(e, t, a, r);
    if (e) {
      for (const i of e) {
        this.E1d.push(i);
      }
    }
  }
  yud(e, t, a, r) {
    if (!(r <= a)) {
      t = this.t9d(t, a, r);
      a = this.W7d();
      r = this.Hyd(a, t);
      if (r.length !== 0) {
        return this.Q7d(e, r);
      }
    }
  }
  t9d(t, a, r) {
    let i = -t.GetExp();
    for (let e = a; e < r; e++) {
      i += t.GetLevelExp(e);
    }
    a = this.mhm(t);
    return i += a;
  }
  mhm(e) {
    var t = e.GetBreachLevel();
    var e = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e.GetRoleId()).WeaponBreachLevel - t;
    if (e <= 0) {
      return 0;
    } else {
      return e * (ConfigManager_1.ConfigManager.RoleDevConfig?.GetRoleDevStaticConfig()?.OverflowExperience ?? 1);
    }
  }
  W7d() {
    return ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemConfigList().sort((e, t) => e.QualityId - t.QualityId);
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
      var l = n.Id;
      var s = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(l);
      var o = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(l).BasicExp;
      var _ = Math.ceil((t - i) / o);
      var _ = Math.min(_, s);
      if (_ > 0) {
        a.push({
          ItemId: l,
          RequiredCount: _
        });
        i += _ * o;
      }
    }
    return i;
  }
  r9d(e, t, a, r) {
    var i;
    if (!(t <= r) && e.length !== 0) {
      e = e[e.length - 1];
      i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpItemConfig(e.Id).BasicExp;
      t = Math.ceil((t - r) / i);
      a.push({
        ItemId: e.Id,
        RequiredCount: t
      });
    }
  }
  Sud(e, t, a, r) {
    if (!(r < a)) {
      t = t.GetWeaponConfig();
      if (t) {
        t = this.o9d(t, a, r);
        if (t.length !== 0) {
          return this.X7d(e, t);
        }
      }
    }
  }
  o9d(t, a, e) {
    var r = [];
    var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(t.BreachId);
    var l = Math.min(i, e);
    for (let e = a; e <= l; e++) {
      var s = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(t.BreachId, e);
      if (s) {
        this.n9d(s, r);
      }
    }
    return r;
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
exports.ObtainedRoleDevWeaponDetailItemData = ObtainedRoleDevWeaponDetailItemData;
//# sourceMappingURL=ObtainedRoleDevWeaponDetailItemData.js.map