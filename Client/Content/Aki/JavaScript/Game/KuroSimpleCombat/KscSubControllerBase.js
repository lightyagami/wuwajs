"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscSubControllerBase = exports.KscEntityRedirectFilter = undefined;
const UE = require("ue");
const Time_1 = require("../../Core/Common/Time");
const KSCBasePropertyByKscGameplayType_1 = require("../../Core/Define/ConfigQuery/KSCBasePropertyByKscGameplayType");
const KSCDamageByKscGameplayType_1 = require("../../Core/Define/ConfigQuery/KSCDamageByKscGameplayType");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const KscEnv_1 = require("./KscEnv");
const KscLog_1 = require("./KscLog");
const KscUtil_1 = require("./KscUtil");
const DIVIDED_TEN_THOUSAND = 0.0001;
class KscEntityRedirectFilter {
  constructor() {
    this.bHu = new Set();
    this.TryCreateEntity = t => {
      var e = KscEntityRedirectFilter.ZNu;
      e.clear();
      for (const r of t.zEs) {
        var i = r.C3s;
        e.set(i, r);
      }
      var s = e.has("sEu");
      if (e.get("XBu")?.XBu?.JBu?.GNc !== undefined) {
        KscLog_1.KscLog.Info("Common", 60, undefined, "塔防辅助机不拦截", ["CreatureDataId", t.s5n]);
        return false;
      } else {
        if (s) {
          this.bHu.add(MathUtils_1.MathUtils.LongToNumber(t.s5n));
          if (!this.OnCreateEntity(t, e)) {
            KscLog_1.KscLog.Error("Common", 60, undefined, "创建KSC实体数据失败", ["CreatureDataId", t.s5n]);
          }
        }
        e.clear();
        return s;
      }
    };
    this.InstantiateEntities = () => {
      this.OnInstantiateEntities();
    };
    this.TryRemoveEntity = t => !!this.bHu.has(t) && (this.bHu.delete(t), this.OnRemoveEntity(t) || KscLog_1.KscLog.Error("Common", 60, undefined, "移除KSC实体数据失败", ["CreatureDataId", t]), true);
  }
  Reset() {
    this.bHu.clear();
  }
  OnCreateEntity(t, e) {
    return false;
  }
  OnInstantiateEntities() {}
  OnRemoveEntity(t) {
    return false;
  }
}
(exports.KscEntityRedirectFilter = KscEntityRedirectFilter).ZNu = new Map();
class KscSubControllerBase {
  constructor() {
    this.hdd = 1;
    this.SubModel = undefined;
    this.RedirectFilter = undefined;
  }
  get Model() {
    return this.SubModel;
  }
  Init() {
    this.CreateModel();
    this.OnInit();
  }
  InitMap() {
    this.Model.Init();
    this.InitPropertyConfigs();
    this.InitEntityAndSkillDt();
    this.InitEntityFilter();
    this.OnInitMap();
    this.AddEvents();
  }
  MapLoaded() {
    this.kHu();
    this.hdd = 1;
    this.InitDamageConfigs();
  }
  WorldDone() {
    this.OnWorldDone();
  }
  WorldReset() {
    this.OHu();
    this.OnWorldReset();
  }
  ClearMap() {
    this.RemoveEvents();
    this.ResetEntityFilter();
    this.OnClearMap();
    this.Model.Clear();
  }
  Tick() {
    this.OnTick();
    if (Time_1.Time.TimeDilation !== this.hdd) {
      this.hdd = Time_1.Time.TimeDilation;
      KscEnv_1.KscEnv.KscWorld?.SetWorldTimeDilation(this.hdd);
    }
  }
  Clear() {
    this.OnClear();
  }
  CreateModel() {}
  ClearModel() {}
  OnInit() {}
  OnInitMap() {}
  OnWorldDone() {}
  OnWorldReset() {}
  OnClearMap() {}
  OnTick() {}
  OnClear() {}
  AddEvents() {}
  RemoveEvents() {}
  kHu() {
    KscEnv_1.KscEnv.Start();
  }
  OHu() {
    KscEnv_1.KscEnv.Stop();
  }
  OnEntityRemoved(t, e) {}
  InitPropertyConfigs() {
    if (this.Model) {
      for (const t of KSCBasePropertyByKscGameplayType_1.configKSCBasePropertyByKscGameplayType.GetConfigList(this.Model.GameplayType)) {
        this.Model.PropertyConfigs.set(t.Id, t);
      }
    }
  }
  SetAttrs(t, e) {
    if (t) {
      var i = this.GetAttrsDefault(e);
      if (!i || i.size <= 0) {
        KscLog_1.KscLog.Warn("Attr", 84, KscEnv_1.KscEnv.KscWorld, "塔防属性设置失败:异常配置", ["entityId", t.EntityId_], ["propertyId", e]);
      } else {
        KscLog_1.KscLog.Info("Attr", 84, KscEnv_1.KscEnv.KscWorld, "塔防属性设置成功", ["entityId", t.EntityId_], ["propertyId", e], ["attrConfig", i]);
        for (var [s, r] of i) {
          t.SetAttr(s, r);
        }
      }
    } else {
      KscLog_1.KscLog.Warn("Attr", 84, KscEnv_1.KscEnv.KscWorld, "塔防属性设置失败:异常Entity", ["propertyId", e]);
    }
  }
  GetAttrsDefault(t) {
    var e = new Map();
    var t = this.Model.PropertyConfigs.get(t);
    if (t) {
      e.set(1, t.Lv);
      e.set(2, t.LifeMax);
      e.set(3, t.Life);
      e.set(4, t.Sheild);
      e.set(7, t.Atk);
      e.set(8, t.Crit);
      e.set(9, t.CritDamage);
      e.set(10, t.Def);
      e.set(190, t.MoveSpeed);
      e.set(117, t.SkillCoolDown);
      e.set(119, t.SkillCoolDownChangeMin);
      e.set(21, t.DamageChangePhys);
      e.set(22, t.DamageChangeElement1);
      e.set(23, t.DamageChangeElement2);
      e.set(24, t.DamageChangeElement3);
      e.set(25, t.DamageChangeElement4);
      e.set(26, t.DamageChangeElement5);
      e.set(27, t.DamageChangeElement6);
      e.set(28, t.DamageResistancePhys);
      e.set(29, t.DamageResistanceElement1);
      e.set(30, t.DamageResistanceElement2);
      e.set(31, t.DamageResistanceElement3);
      e.set(32, t.DamageResistanceElement4);
      e.set(33, t.DamageResistanceElement5);
      e.set(34, t.DamageResistanceElement6);
      e.set(35, t.HealChange);
      e.set(36, t.HealedChange);
      e.set(37, t.DamageReducePhys);
      e.set(38, t.DamageReduceElement1);
      e.set(39, t.DamageReduceElement2);
      e.set(40, t.DamageReduceElement3);
      e.set(41, t.DamageReduceElement4);
      e.set(42, t.DamageReduceElement5);
      e.set(43, t.DamageReduceElement6);
      e.set(99, t.IgnoreDefRate);
      e.set(100, t.IgnoreDamageResistancePhys);
      e.set(101, t.IgnoreDamageResistanceElement1);
      e.set(102, t.IgnoreDamageResistanceElement2);
      e.set(103, t.IgnoreDamageResistanceElement3);
      e.set(104, t.IgnoreDamageResistanceElement4);
      e.set(105, t.IgnoreDamageResistanceElement5);
      e.set(106, t.IgnoreDamageResistanceElement6);
    }
    return e;
  }
  InitDamageConfigs() {
    var t = KscEnv_1.KscEnv.KscWorld;
    if (!t) {
      KscLog_1.KscLog.Error("Load", 85, KscEnv_1.KscEnv.KscWorld, "塔防InitDamageIdConfig failed");
    }
    var e = t?.DamageData;
    if (!e || !e.IsValid()) {
      KscLog_1.KscLog.Error("Load", 85, KscEnv_1.KscEnv.KscWorld, "塔防InitDamageIdConfig failed");
    }
    for (const s of KSCDamageByKscGameplayType_1.configKSCDamageByKscGameplayType.GetConfigList(this.Model.GameplayType)) {
      var i = new UE.KSCDamage(s.CalculateType, s.Element, s.Amplify * DIVIDED_TEN_THOUSAND, s.RelatedProperty);
      e.AddDamageData(s.Id, i);
    }
  }
  InitEntityAndSkillDt() {
    KscUtil_1.KscUtil.LoadDt(KscEnv_1.KscEnv.KscWorld, this.Model.GetEntityDtPath(), this.Model.EntityDataDt);
    KscUtil_1.KscUtil.LoadDt(KscEnv_1.KscEnv.KscWorld, this.Model.GetSkillDtPath(), this.Model.SkillDataDt);
  }
  InitEntityFilter() {
    this.CreateEntityFilter();
    ControllerHolder_1.ControllerHolder.CreatureController.RegisterCreateEntityFilter(this.RedirectFilter);
  }
  CreateEntityFilter() {
    this.RedirectFilter = new KscEntityRedirectFilter();
  }
  ResetEntityFilter() {
    this.RedirectFilter.Reset();
    ControllerHolder_1.ControllerHolder.CreatureController.UnregisterCreateEntityFilter(this.RedirectFilter);
  }
}
exports.KscSubControllerBase = KscSubControllerBase;
//# sourceMappingURL=KscSubControllerBase.js.map