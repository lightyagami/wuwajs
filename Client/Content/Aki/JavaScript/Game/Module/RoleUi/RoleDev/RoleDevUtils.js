"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevUtils = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
class RoleDevUtils {
  static GetRoleDevDataTypeByRoleId(e) {
    if (ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)) {
      return 0;
    } else if (this.GetRoleTypeTagByRoleId(e) === 0) {
      return 2;
    } else {
      return 1;
    }
  }
  static GetCultivateProject(e) {
    e = this.GetCultivateProjectId(e);
    if (e !== undefined) {
      return ConfigManager_1.ConfigManager.RoleDevConfig?.GetCultivateProjectConfig(e);
    }
  }
  static GetCultivateProjectId(e) {
    var e = ConfigManager_1.ConfigManager.RoleDevConfig?.GetRoleDevProjectConfig(e);
    var t = this.GetCurrentProjectNum();
    if (t !== undefined) {
      e = e.ProjectGroup;
      if (!(e.length <= t)) {
        return e[t];
      }
    }
  }
  static GetRoleGachaIds(e) {
    var t = [];
    if (this.IsHotRole(e)) {
      e = ConfigManager_1.ConfigManager.RoleDevConfig?.GetRoleDevProsListConfig(e);
      if (e) {
        var r = e.GachaId;
        if (r && ModelManager_1.ModelManager.GachaModel.CheckGachaValidByGachaId(r)) {
          t.push(r);
        }
        var r = e.SpecialGachaId;
        for (const a of r) {
          if (ModelManager_1.ModelManager.GachaModel.CheckGachaValidByGachaId(a.Item2)) {
            t.push(a.Item2);
          }
        }
      }
    }
    return t;
  }
  static GetRoleProspectType(e) {
    var t = ConfigManager_1.ConfigManager.RoleDevConfig?.GetRoleDevProsListConfig(e);
    if (RoleDevUtils.IsProspectTimeValid(e)) {
      return 0;
    } else if (RoleDevUtils.IsGachaValid(t.GachaId)) {
      return 2;
    } else {
      return 3;
    }
  }
  static GetRoleRerunType(e) {
    var t = ConfigManager_1.ConfigManager.RoleDevConfig?.GetRoleDevProsListConfig(e);
    if (RoleDevUtils.IsProspectTimeValid(e)) {
      return 1;
    } else if (RoleDevUtils.IsGachaValid(t.GachaId)) {
      return 2;
    } else {
      return 3;
    }
  }
  static IsHotRole(t) {
    var e = ConfigManager_1.ConfigManager.RoleDevConfig?.GetAllRoleDevProsListConfig();
    return !!e && e.some(e => e.Id === t);
  }
  static GetRoleTypeTagByRoleId(t) {
    if ((ConfigManager_1.ConfigManager.RoleDevConfig?.GetAllRoleDevProsListConfig()).some(e => e.Id === t)) {
      var e = ConfigManager_1.ConfigManager.RoleDevConfig?.GetRoleDevProsListConfig(t);
      if (e?.TypeId === 1) {
        return 0;
      }
      if (e?.TypeId === 2) {
        return this.GetRoleProspectType(t);
      }
      if (e?.TypeId === 3) {
        return 1;
      }
      if (e?.TypeId === 4) {
        return this.GetRoleRerunType(t);
      }
      if (e?.TypeId === 5) {
        if (RoleDevUtils.IsGachaValid(e.GachaId)) {
          return 2;
        } else {
          return 3;
        }
      }
      if (e?.TypeId === 6 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("RoleDev", 88, "武器类型调用GetRoleTypeTagByRoleId方法", ["roleId", t]);
      }
      e?.TypeId;
    }
    return 3;
  }
  static IsGachaValid(e) {
    return ModelManager_1.ModelManager.GachaModel.CheckGachaValidByGachaId(e);
  }
  static GetCurrentProjectNum() {
    var e = ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel;
    if (e) {
      var t = ConfigManager_1.ConfigManager.RoleDevConfig?.GetLevelLimitConfigList();
      if (t) {
        for (const a of t) {
          var r = a.PlayerLevel;
          if (e >= r[0].Item1 && e <= r[0].Item2) {
            return a.ProjectNum;
          }
        }
      }
    }
    return 0;
  }
  static GroupMaterialsByType(e) {
    var t = new Map();
    for (const o of e) {
      if (t.has(o.ItemId)) {
        t.get(o.ItemId).RequiredCount += o.RequiredCount;
      } else {
        t.set(o.ItemId, {
          ...o
        });
      }
    }
    var r = [];
    for (const i of Array.from(t.values())) {
      var a = i.ItemId;
      const n = ConfigManager_1.ConfigManager.RoleDevConfig?.GetItemJumpGroupConfig(a)?.ItemType;
      if (n) {
        if (a = r.find(e => e.Type === n)) {
          a.Materials.push(i);
        } else {
          r.push({
            Type: n,
            Materials: [i]
          });
        }
      }
    }
    return r.sort((e, t) => e.Type - t.Type);
  }
  static GetFirstOpenDungeonIdByItemGroupId(e) {
    if (e !== 0 && (e = ConfigManager_1.ConfigManager.RoleDevConfig?.GetItemJumpGroupConfig(e))) {
      return this.GetFirstOpenDungeonId(e.JumpGroup);
    } else {
      return undefined;
    }
  }
  static GetFirstOpenDungeonId(e) {
    var t = ModelManager_1.ModelManager.AdventureGuideModel?.GetAllDetectSilentAreas();
    if (t) {
      for (const a of e) {
        var r = t.get(a);
        if (r && !r.IsLock) {
          return a;
        }
      }
    }
  }
  static GetFirstUnlockedTeleportId(e) {
    for (const t of e) {
      if (ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(t)) {
        return t;
      }
    }
    if (e.length > 0) {
      return e[e.length - 1];
    } else {
      return undefined;
    }
  }
  static BuildDetailItemData(t, r, a, o) {
    var i = [];
    var n = r.map(e => e.Type).sort((e, t) => e - t);
    for (let e = 0; e < n.length; e++) {
      const g = n[e];
      var s = ConfigManager_1.ConfigManager.RoleDevConfig?.GetTypeManageConfig(g)?.TypeDescribe ?? "";
      var l = r.find(e => e.Type === g)?.Materials ?? [];
      var l = this.b7d(l);
      var f = o ?? this.o9d(a, e);
      i.push({
        RoleId: t,
        MainPage: a,
        ButtonType: f,
        Title: s,
        ItemGroupId: 0,
        ItemGroup: l
      });
    }
    return i;
  }
  static o9d(e, t) {
    switch (e) {
      case 1:
        return this.n9d(t);
      case 2:
        return this.s9d(t);
      case 4:
        return this.a9d(t);
      default:
        return 0;
    }
  }
  static n9d(e) {
    switch (e) {
      case 0:
        return 3;
      case 1:
        return 4;
      case 2:
        return 5;
      default:
        return 0;
    }
  }
  static s9d(e) {
    switch (e) {
      case 0:
        return 13;
      case 1:
        return 14;
      default:
        return 0;
    }
  }
  static a9d(e) {
    switch (e) {
      case 0:
        return 22;
      case 1:
        return 23;
      case 2:
        return 24;
      default:
        return 0;
    }
  }
  static b7d(e) {
    return e.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.ItemId);
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.ItemId);
      return (e?.QualityId ?? 0) - (t?.QualityId ?? 0);
    });
  }
  static CheckAllItemsUp(e) {
    if (!e || e.length === 0) {
      return false;
    }
    for (const r of e) {
      for (const a of r.ItemGroup) {
        var t = a.RequiredCount;
        if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(a.ItemId) < t) {
          return false;
        }
      }
    }
    return true;
  }
  static IsProspectTimeValid(e) {
    var t;
    var r;
    var a = ModelManager_1.ModelManager.RoleDevModel;
    if (a && a.IsConfigDataInitialized) {
      if (a = a.GetRoleDevPropsConfig(e)) {
        t = TimeUtil_1.TimeUtil.GetServerTime();
        r = a.ProspectBeginTime;
        a = a.ProspectEndTime;
        if (r === 0 || a === 0) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("RoleDev", 88, "前瞻时间未配置", ["roleId", e]);
          }
          return false;
        } else if (t < r) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("RoleDev", 88, "前瞻时间未开始");
          }
          return false;
        } else if (a !== 0 && a < t) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("RoleDev", 88, "前瞻时间已结束", ["roleId", e]);
          }
          return false;
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("RoleDev", 88, "前瞻时间有效（服务器配置）", ["roleId", e]);
          }
          return true;
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RoleDev", 88, "未找到对应的前瞻配置", ["roleId", e]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RoleDev", 88, "角色养成配置数据未初始化", ["roleId", e]);
      }
      return false;
    }
  }
  static GetWeaponDefaultTabType(e, t) {
    if (ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e) === undefined || t) {
      return 0;
    } else {
      return 1;
    }
  }
  static CreateSkillDetailItemsData(e, t, r, a) {
    var o = [];
    this.a3d(a, o);
    this.h3d(a, o);
    this.g3d(e, t, r, o);
    var e = this.GroupMaterialsByType(o);
    return this.BuildDetailItemData(a, e, 4);
  }
  static a3d(e, t) {
    var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    var a = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(r.SkillId).filter(e => e.SkillType === 4);
    var o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    var i = r.SkillTreeGroupId;
    for (const g of a) {
      var n = g.Id;
      if (o) {
        var s = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndSkillId(i, n);
        if (s && o.GetSkillData().IsSkillTreeNodeActive(s.Id)) {
          continue;
        }
      }
      s = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillLevelConfigByGroupIdAndLevel(n, 1);
      if (s) {
        n = s.Consume;
        if (n && n.size !== 0) {
          for (var [l, f] of n) {
            if (!this.c3d(l)) {
              this.i3d(t, l, f);
            }
          }
        }
      }
    }
  }
  static h3d(e, t) {
    var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    var a = this.GetCultivateProject(e).SkillTreeConfigArray;
    var o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    for (const l of a) {
      var i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(r.SkillTreeGroupId, l);
      if (i && (!o || !o.GetSkillData().IsSkillTreeNodeActive(i.Id))) {
        for (var [n, s] of i.Consume) {
          if (!this.c3d(n)) {
            this.i3d(t, n, s);
          }
        }
      }
    }
  }
  static g3d(t, r, a, o) {
    for (let e = 0; e < t.length; e++) {
      var i = t[e];
      var n = r[e];
      var s = a[e];
      for (let e = n + 1; e <= s; e++) {
        var l = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(i.Id, e);
        if (l) {
          for (var [f, g] of l) {
            if (!this.c3d(f)) {
              this.i3d(o, f, g);
            }
          }
        }
      }
    }
  }
  static c3d(e) {
    return e === ItemDefines_1.EItemId.LevelExp || e === ItemDefines_1.EItemId.Gold;
  }
  static i3d(e, t, r) {
    var a = e.find(e => e.ItemId === t);
    if (a) {
      a.RequiredCount += r;
    } else {
      e.push({
        ItemId: t,
        RequiredCount: r
      });
    }
  }
  static GetDefaultSkillPlanByRoleId(e) {
    return this.GetRoleTypeTagByRoleId(e) === 0;
  }
}
exports.RoleDevUtils = RoleDevUtils;
//# sourceMappingURL=RoleDevUtils.js.map