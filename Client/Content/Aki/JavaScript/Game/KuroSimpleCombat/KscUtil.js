"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscUtil = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const KSCBasePropertyById_1 = require("../../Core/Define/ConfigQuery/KSCBasePropertyById");
const TrapDefenseAuxiliaryById_1 = require("../../Core/Define/ConfigQuery/TrapDefenseAuxiliaryById");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const KscLog_1 = require("./KscLog");
class KscUtil {
  static SetKscWorldHandle(e) {
    this.xfd = e;
  }
  static GetDtRows(e) {
    var r = new Array();
    cpp_1.FKuroDataTableFunctionLibrary.GetDataTableAllRowNames(e, r);
    var t = new Array();
    for (const a of r) {
      var s = (0, puerts_1.$ref)(undefined);
      var o = cpp_1.FKuroDataTableFunctionLibrary.GetDataTableRowFromName(e, a, s);
      var s = (0, puerts_1.$unref)(s);
      if (o) {
        t.push(s);
      }
    }
    return t;
  }
  static LoadDt(e, r, t) {
    r = ResourceSystem_1.ResourceSystem.Load(r, UE.DataTable);
    if (r) {
      for (const o of KscUtil.GetDtRows(r)) {
        var s = o.RuntimeDA.ToAssetPathName();
        t?.set(o.Id, [o, s]);
      }
    }
  }
  static AssetPath2Name(e) {
    if (e) {
      return e.split(".").pop();
    }
  }
  static AsyncLoadKscAsset(o) {
    ResourceSystem_1.ResourceSystem.LoadAsync(o.Path, UE.Object, (e, r) => {
      if (e?.IsValid()) {
        if (o.KscWorldHandle !== this.xfd) {
          var t = `[加载Ksc资产] 场景不一致, ${o.Path}, LoadHandle: ${o.KscWorldHandle}, CurHandle: ${this.xfd}`;
          KscLog_1.KscLog.Info("Load", 69, o.Context, t);
          const s = e;
          o.NativeContainer?.Add(s, o.Id);
          o.FailCallback?.(t);
        } else {
          KscLog_1.KscLog.Info("Load", 84, o.Context, "[加载Ksc资产] 成功", ["Name", e?.GetName()]);
          const s = e;
          o.NativeContainer?.Add(s, o.Id);
          o.Callback?.(s);
        }
      } else {
        t = "[加载Ksc资产] 失败 " + o.Path;
        KscLog_1.KscLog.Error("Load", 84, o.Context, t);
        o.FailCallback?.(t);
      }
    });
  }
  static AsyncLoadKscAssetDt(a, e, i, r, l) {
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Object, (e, r) => {
      if (e?.IsValid()) {
        KscLog_1.KscLog.Info("Load", 84, a, "[DT加载] 成功", ["Name", e.GetName()]);
        for (const o of KscUtil.GetDtRows(e)) {
          var t = o.Id;
          var s = o.RuntimeDA.ToAssetPathName();
          if (i) {
            i.set(t, s);
          }
          KscLog_1.KscLog.Info("Load", 84, a, "[DT加载] 开始加载Ksc Da", ["Id", t]);
          this.AsyncLoadKscAsset({
            Context: a,
            Id: t,
            Path: s,
            NativeContainer: l,
            KscWorldHandle: this.xfd
          });
        }
      } else {
        KscLog_1.KscLog.Error("Load", 84, a, "[DT加载] 失败", ["Path", r]);
      }
    }, 100);
  }
  static GetFollowerSkillIdsByProxies(e) {
    var r = new Map();
    if (e.length > 0) {
      for (const s of e) {
        var t = TrapDefenseAuxiliaryById_1.configTrapDefenseAuxiliaryById.GetConfig(s)?.InitSkills;
        if (t) {
          r.set(s, t);
        }
      }
    }
    return r;
  }
  static GetFollowerSkillIdsByProxy(e) {
    let r = new Array();
    e = TrapDefenseAuxiliaryById_1.configTrapDefenseAuxiliaryById.GetConfig(e)?.InitSkills;
    return r = e ? e : r;
  }
  static GetFollowerCdSkillByProxy(e) {
    return TrapDefenseAuxiliaryById_1.configTrapDefenseAuxiliaryById.GetConfig(e)?.CDSkill;
  }
  static GetFollowerCueIds(e) {
    return TrapDefenseAuxiliaryById_1.configTrapDefenseAuxiliaryById.GetConfig(e)?.CueIds;
  }
  static GetFollowerCdCueIds(e, r) {
    e = TrapDefenseAuxiliaryById_1.configTrapDefenseAuxiliaryById.GetConfig(e);
    if (e) {
      if (r === 1) {
        return e.CDCueId;
      } else if (r === 2) {
        return e.ReadyCueId;
      } else {
        return undefined;
      }
    }
  }
  static GetFollowerPropertyIdByProxy(e) {
    return TrapDefenseAuxiliaryById_1.configTrapDefenseAuxiliaryById.GetConfig(e)?.InitProperty;
  }
  static GetFollowerAttrsByProxy(e) {
    var r = new Map();
    var t = this.GetFollowerPropertyIdByProxy(e);
    if (t === undefined) {
      KscLog_1.KscLog.Warn("Attr", 84, GlobalData_1.GlobalData.GameInstance, "塔防获取辅助机属性配置异常", ["辅助机proxy id", e]);
      return r;
    } else if (e = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubController) {
      return e.GetAttrsDefault(t);
    } else if (r = KSCBasePropertyById_1.configKSCBasePropertyById.GetConfig(t)) {
      return this.GetAttrsDataByPropertyConfig(r);
    } else {
      KscLog_1.KscLog.Error("Attr", 17, GlobalData_1.GlobalData.GameInstance, "KSC获取属性配置异常", ["propertyId", t]);
      return;
    }
  }
  static GetAttrsDataByPropertyConfig(e) {
    var r = new Map();
    r.set(1, e.Lv);
    r.set(2, e.LifeMax);
    r.set(3, e.Life);
    r.set(4, e.Sheild);
    r.set(7, e.Atk);
    r.set(8, e.Crit);
    r.set(9, e.CritDamage);
    r.set(10, e.Def);
    r.set(190, e.MoveSpeed);
    r.set(117, e.SkillCoolDown);
    r.set(119, e.SkillCoolDownChangeMin);
    r.set(21, e.DamageChangePhys);
    r.set(22, e.DamageChangeElement1);
    r.set(23, e.DamageChangeElement2);
    r.set(24, e.DamageChangeElement3);
    r.set(25, e.DamageChangeElement4);
    r.set(26, e.DamageChangeElement5);
    r.set(27, e.DamageChangeElement6);
    r.set(28, e.DamageResistancePhys);
    r.set(29, e.DamageResistanceElement1);
    r.set(30, e.DamageResistanceElement2);
    r.set(31, e.DamageResistanceElement3);
    r.set(32, e.DamageResistanceElement4);
    r.set(33, e.DamageResistanceElement5);
    r.set(34, e.DamageResistanceElement6);
    r.set(35, e.HealChange);
    r.set(36, e.HealedChange);
    r.set(37, e.DamageReducePhys);
    r.set(38, e.DamageReduceElement1);
    r.set(39, e.DamageReduceElement2);
    r.set(40, e.DamageReduceElement3);
    r.set(41, e.DamageReduceElement4);
    r.set(42, e.DamageReduceElement5);
    r.set(43, e.DamageReduceElement6);
    r.set(99, e.IgnoreDefRate);
    r.set(100, e.IgnoreDamageResistancePhys);
    r.set(101, e.IgnoreDamageResistanceElement1);
    r.set(102, e.IgnoreDamageResistanceElement2);
    r.set(103, e.IgnoreDamageResistanceElement3);
    r.set(104, e.IgnoreDamageResistanceElement4);
    r.set(105, e.IgnoreDamageResistanceElement5);
    r.set(106, e.IgnoreDamageResistanceElement6);
    return r;
  }
}
(exports.KscUtil = KscUtil).xfd = 0;
//# sourceMappingURL=KscUtil.js.map