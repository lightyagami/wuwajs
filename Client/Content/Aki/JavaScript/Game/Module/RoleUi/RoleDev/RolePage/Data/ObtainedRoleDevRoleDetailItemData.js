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
    this.E1d = [];
  }
  InitByRoleId(e) {
    this.E1d = [];
    var t;
    var a;
    var r;
    var i = this.h9d(e);
    if (i) {
      t = (i = i.GetLevelData()).GetLevel();
      a = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e).RoleLevel;
      i = i.GetBreachLevel();
      r = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e).RoleBreachLevel;
      this.kyd(e, t, a);
      this.Oyd(e, i, r);
    }
  }
  h9d(e) {
    return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
  }
  kyd(e, t, a) {
    e = this.b1d(e, t, a);
    if (e) {
      this.E1d.push(e);
    }
  }
  Oyd(e, t, a) {
    e = this.R1d(e, t, a);
    if (e) {
      for (const r of e) {
        this.E1d.push(r);
      }
    }
  }
  b1d(e, t, a) {
    if (!(a <= t)) {
      t = this.t9d(e, t, a);
      a = this.W7d();
      a = this.$vd(a, t);
      return this.Q7d(e, a);
    }
  }
  t9d(t, a, r) {
    let i = 0;
    var e = this.h9d(t).GetLevelData().GetExp();
    for (let e = a + 1; e <= r; e++) {
      i += ModelManager_1.ModelManager.RoleModel.GetRoleLevelUpExp(t, e);
    }
    a = this.Qrm(t);
    return i = i + a - e;
  }
  Qrm(e) {
    var t = this.h9d(e).GetLevelData().GetBreachLevel();
    var e = RoleDevUtils_1.RoleDevUtils.GetCultivateProject(e).RoleBreachLevel - t;
    if (e <= 0) {
      return 0;
    } else {
      return e * (ConfigManager_1.ConfigManager.RoleDevConfig?.GetRoleDevStaticConfig()?.OverflowExperience ?? 1);
    }
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
  $vd(e, t) {
    var a = [];
    var r = this.i9d(e, t, a, 0);
    this.r9d(e, t, a, r);
    return a;
  }
  i9d(e, t, a, r) {
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
  r9d(e, t, a, r) {
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
  R1d(e, t, a) {
    if (!(a <= t)) {
      t = this.o9d(e, t, a);
      if (t.length !== 0) {
        return this.X7d(e, t);
      }
    }
  }
  o9d(t, a, r) {
    var i = [];
    for (let e = a + 1; e <= r; e++) {
      var l = ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachConfig(t, e);
      if (l) {
        this.n9d(l, i);
      }
    }
    return i;
  }
  n9d(e, t) {
    for (var [a, r] of e.BreachConsume) {
      if (a !== ItemDefines_1.EItemId.Gold) {
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
    e = RoleDevUtils_1.RoleDevUtils.BuildDetailItemData(e, t, 1);
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
exports.ObtainedRoleDevRoleDetailItemData = ObtainedRoleDevRoleDetailItemData;
//# sourceMappingURL=ObtainedRoleDevRoleDetailItemData.js.map