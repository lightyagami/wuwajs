"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevUtils = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const RoleStatePlayContext_1 = require("../View/ViewData/RoleStatePlayContext");
const RoleViewViewModel_1 = require("../View/ViewData/RoleViewViewModel");
const RoleDevDefine_1 = require("./RoleDevDefine");
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
      if (e) {
        var r = RoleDevUtils.IsProspectTimeValid(e.Id);
        var a = RoleDevUtils.IsGachaValid(e.GachaId);
        if (e.TypeId === 1) {
          if (r) {
            return 0;
          } else {
            return 3;
          }
        }
        if (e.TypeId === 2) {
          return this.GetRoleProspectType(t);
        }
        if (e.TypeId === 3) {
          if (r) {
            return 1;
          } else {
            return 3;
          }
        }
        if (e.TypeId === 4) {
          return this.GetRoleRerunType(t);
        }
        if (e.TypeId === 5) {
          if (a) {
            return 2;
          } else {
            return 3;
          }
        }
        if (e.TypeId === 6 && Log_1.Log.CheckError()) {
          Log_1.Log.Error("RoleDev", 88, "武器类型调用GetRoleTypeTagByRoleId方法", ["roleId", t]);
        }
        e.TypeId;
      }
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
    for (const i of e) {
      if (t.has(i.ItemId)) {
        t.get(i.ItemId).RequiredCount += i.RequiredCount;
      } else {
        t.set(i.ItemId, {
          ...i
        });
      }
    }
    var r = [];
    for (const o of Array.from(t.values())) {
      var a = o.ItemId;
      const n = ConfigManager_1.ConfigManager.RoleDevConfig?.GetItemJumpGroupConfig(a)?.ItemType;
      if (n) {
        if (a = r.find(e => e.Type === n)) {
          a.Materials.push(o);
        } else {
          r.push({
            Type: n,
            Materials: [o]
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
  static BuildDetailItemData(e, t, r) {
    var a = [];
    for (const l of t.map(e => e.Type).sort((e, t) => e - t)) {
      var i = ConfigManager_1.ConfigManager.RoleDevConfig?.GetTypeManageConfig(l)?.TypeDescribe ?? "";
      var o = t.find(e => e.Type === l)?.Materials ?? [];
      var o = this.vzd(o);
      var n = this.MMm(r, l);
      a.push({
        RoleId: e,
        MainPage: r,
        ButtonType: n,
        Title: i,
        ItemGroupId: 0,
        ItemGroup: o
      });
    }
    return a;
  }
  static MMm(e, t) {
    let r = undefined;
    switch (e) {
      case 1:
        r = RoleDevDefine_1.roleTabMaterialTypeToSubPageButtonMap[t];
        break;
      case 2:
        r = RoleDevDefine_1.weaponTabMaterialTypeToSubPageButtonMap[t];
        break;
      case 4:
        r = RoleDevDefine_1.skillTabMaterialTypeToSubPageButtonMap[t];
        break;
      default:
        r = undefined;
    }
    return r || -1;
  }
  static vzd(e) {
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
    var r = ModelManager_1.ModelManager.RoleDevModel;
    return !!r && !!r.IsConfigDataInitialized && !!(r = r.GetRoleDevPropsConfig(e)) && !(e = TimeUtil_1.TimeUtil.GetServerTime(), t = r.ProspectBeginTime, r = r.ProspectEndTime, t === 0) && r !== 0 && !(e < t) && (r === 0 || !(r < e));
  }
  static GetWeaponDefaultTabType(e, t) {
    if (ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e) === undefined || t) {
      return 1;
    } else {
      return 2;
    }
  }
  static CreateSkillDetailItemsData(e, t, r, a) {
    var i = [];
    this.y9d(e, t, r, i);
    var e = this.GroupMaterialsByType(i);
    return this.BuildDetailItemData(a, e, 4);
  }
  static y9d(r, e, a, i) {
    for (let t = 0; t < r.length; t++) {
      var o = e[t];
      var n = a[t];
      for (let e = o + 1; e <= n; e++) {
        var l = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(r[t], e);
        if (l) {
          for (var [s, f] of l) {
            if (!this.g9d(s)) {
              this.s9d(i, s, f);
            }
          }
        }
      }
    }
  }
  static g9d(e) {
    return e === ItemDefines_1.EItemId.LevelExp || e === ItemDefines_1.EItemId.Gold;
  }
  static s9d(e, t, r) {
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
  static OpenWeaponReplaceView(e, t) {
    e = new RoleViewViewModel_1.RoleViewViewModel(e, false);
    e.WeaponIncId = t;
    e.NeedShowOnViewPlayingStartSequence = true;
    e.NeedHideOnViewPlayingCloseSequence = true;
    e.FadeInCurveId = "RoleFadeInCurve";
    e.FadeOutCurveId = "RoleFadeOutCurve";
    t = new RoleStatePlayContext_1.RoleStatePlayContext();
    t.RoleState = 6;
    t.ReLoop = true;
    e.RoleStatePlayContextOnShow = t;
    t = new RoleStatePlayContext_1.RoleStatePlayContext();
    t.RoleState = 1;
    e.RoleStatePlayContextOnHide = t;
    ControllerHolder_1.ControllerHolder.RoleController.OpenRoleViewByViewModel("WeaponReplaceView", e);
  }
}
exports.RoleDevUtils = RoleDevUtils;
//# sourceMappingURL=RoleDevUtils.js.map