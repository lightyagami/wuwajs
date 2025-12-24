"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var r = arguments.length;
  var h = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (o = t[a]) {
        h = (r < 3 ? o(h) : r > 3 ? o(e, i, h) : o(e, i)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UeSkeletalTickManageComponent = exports.UeSkeletalTickController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Time_1 = require("../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const PerformanceController_1 = require("../../../../Core/Performance/PerformanceController");
const PerformanceDecorators_1 = require("../../../../Core/Performance/PerformanceDecorators");
const TickProcessSystem_1 = require("../../../../Core/Tick/TickProcessSystem");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../Global");
const MAX_TIME_DELAY_ANIM = 2;
const MAX_COLLECT_PERIOD_DELAY_ANIM = 0.125;
class UeSkeletalTickController {
  static iM1(t, e, i, s) {
    for (const o of t.SkeletalComps) {
      o.SetUseProxyDataBuffer(e);
      o.bUseDelayComplete = e;
      o.bUseKuroParallel = i;
      o.bUseParallelSkelCtrlNodeEval = s;
    }
  }
  static AddManager(t) {
    if (t.TickMode === 1) {
      this.Managers.add(t);
      this.iM1(t, this.EnabledNewSkelTickTiming, this.EnabledKuroParallel, this.EnabledKawaiiParallel);
    } else {
      this.NotParallelManagers.add(t);
    }
  }
  static DeleteManager(t) {
    this.Managers.delete(t);
    this.NotParallelManagers.delete(t);
    for (const e of t.SkeletalComps) {
      e.SetUseProxyDataBuffer(false);
      e.bUseDelayComplete = false;
      e.bUseKuroParallel = false;
      e.bUseParallelSkelCtrlNodeEval = false;
    }
  }
  static TickManagers(t) {
    if (this.EnabledNewSkelTickTiming) {
      this.TickedManagers.length = 0;
      for (const e of this.Managers) {
        if (e.Active) {
          this.TickedManagers.push(e);
          e.ProxyTick(t, true);
        }
      }
      for (const i of this.NotParallelManagers) {
        if (i.Active) {
          this.TickedManagers.push(i);
          i.ProxyTick(t, true);
        }
      }
    } else {
      for (const s of this.Managers) {
        if (s.Active) {
          s.ProxyTick(t);
        }
      }
      for (const o of this.NotParallelManagers) {
        if (o.Active) {
          o.ProxyTick(t);
        }
      }
    }
  }
  static TickManagersStep2() {
    for (const t of this.TickedManagers) {
      t.UnlockEvaluation();
    }
  }
  static DealCompleteSkeletalComp() {
    for (const t of this.TickedManagers) {
      t.DealComplete();
    }
    this.TickedManagers.length = 0;
  }
  static AfterTickManagers(t) {
    for (const e of this.Managers) {
      if (e.Active) {
        e.AfterProxyTick(t);
      }
    }
    for (const i of this.NotParallelManagers) {
      if (i.Active) {
        i.AfterProxyTick(t);
      }
    }
  }
  static RefreshSkeletalMeshConfig() {
    for (const t of this.Managers) {
      this.iM1(t, this.EnabledNewSkelTickTiming, this.EnabledKuroParallel, this.EnabledKawaiiParallel);
    }
  }
  static get EnabledNewSkelTickTiming() {
    return this.ftc;
  }
  static set EnabledNewSkelTickTiming(t) {
    if (this.ftc !== t) {
      this.ftc = t;
      this.RefreshSkeletalMeshConfig();
    }
  }
  static get EnabledKuroParallel() {
    return this.rM1;
  }
  static set EnabledKuroParallel(t) {
    if (this.rM1 !== t) {
      this.rM1 = t;
      this.RefreshSkeletalMeshConfig();
    }
  }
  static get EnabledKawaiiParallel() {
    return this.yU1;
  }
  static set EnabledKawaiiParallel(t) {
    if (this.yU1 !== t) {
      this.yU1 = t;
      this.RefreshSkeletalMeshConfig();
    }
  }
  static get MainRoleParallel() {
    if (!this.gU) {
      this.MainRoleParallel = true;
    }
    return this.dGl;
  }
  static set MainRoleParallel(t) {
    this.dGl = t;
    this.gU = true;
  }
}
(exports.UeSkeletalTickController = UeSkeletalTickController).Managers = new Set();
UeSkeletalTickController.NotParallelManagers = new Set();
UeSkeletalTickController.TickedManagers = new Array();
UeSkeletalTickController.ftc = true;
UeSkeletalTickController.rM1 = true;
UeSkeletalTickController.yU1 = false;
UeSkeletalTickController.gU = false;
UeSkeletalTickController.dGl = false;
let UeSkeletalTickManageComponent = class UeSkeletalTickManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Tsn = false;
    this.Hte = undefined;
    this.I5r = undefined;
    this.d3r = -1;
    this.Lsn = false;
    this.Dsn = 0;
    this.Rsn = undefined;
    this.MainSkelComp = undefined;
    this.mYs = undefined;
    this.ForceDisableAnimDelaySet = new Set();
    this.TickType = 0;
    this.SkeletalComps = new Array();
    this.Asn = new Array();
    this.gtc = new Array();
  }
  get TickMode() {
    return this.Dsn;
  }
  set TickMode(t) {
    if (this.Dsn !== t) {
      var e = this.Dsn;
      if ((this.Dsn = t) === 1) {
        if (e === 2) {
          if (this.SkeletalComps.length > 0) {
            TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(0, this.SkeletalComps[0], 0);
          }
        } else {
          for (const i of this.SkeletalComps) {
            TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(0, i, 0);
          }
          for (const s of this.Asn) {
            TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(4, s, 0);
          }
        }
      } else if (t === 2) {
        if (e === 1) {
          if (this.SkeletalComps.length > 0) {
            TickSystem_1.TickSystem.CleanSkeletalMeshProxyTickFunction(this.SkeletalComps[0]);
          }
        } else {
          let t = 0;
          for (const o of this.SkeletalComps) {
            if (t > 0) {
              TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(0, o, 0);
            }
            ++t;
          }
          for (const r of this.Asn) {
            TickSystem_1.TickSystem.SetSkeletalMeshProxyTickFunction(4, r, 0);
          }
        }
      } else {
        for (const h of this.SkeletalComps) {
          if (!h) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Test", 6, "NoSkeletalMesh", ["EntityId", this.Entity.Id], ["Actor", this.Hte?.Owner?.GetName()]);
            }
          }
          TickSystem_1.TickSystem.CleanSkeletalMeshProxyTickFunction(h);
        }
        for (const a of this.Asn) {
          if (!a) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Test", 6, "NoSkeletalMesh", ["EntityId", this.Entity.Id], ["Actor", this.Hte?.Owner?.GetName()]);
            }
          }
          TickSystem_1.TickSystem.CleanSkeletalMeshProxyTickFunction(a);
        }
      }
      UeSkeletalTickController.DeleteManager(this);
      if (t === 1 || t === 2) {
        UeSkeletalTickController.AddManager(this);
      }
      if (t === 4) {
        for (const n of this.SkeletalComps) {
          n.SetTickGroup(1);
          n.SetComponentTickEnabled(this.Active);
          n.SetKuroOnlyTickOutside(false);
        }
        for (const l of this.Asn) {
          l.SetTickGroup(1);
          l.SetComponentTickEnabled(this.Active);
          l.SetKuroOnlyTickOutside(false);
        }
      } else {
        for (const c of this.SkeletalComps) {
          c.SetTickGroup(0);
          c.SetComponentTickEnabled(false);
          c.SetKuroOnlyTickOutside(true);
        }
        for (const f of this.Asn) {
          f.SetTickGroup(4);
          f.SetComponentTickEnabled(false);
          f.SetKuroOnlyTickOutside(true);
        }
      }
    }
  }
  static get Dependencies() {
    return [1];
  }
  OnInit() {
    return true;
  }
  OnActivate() {
    this.Hte = this.Entity.GetComponent(1);
    this.I5r = this.Entity.GetComponent(109);
    var e = this.Hte.Owner.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    var i = e.Num();
    for (let t = 0; t < i; ++t) {
      var s = e.Get(t);
      if (s instanceof UE.SkeletalMeshComponent) {
        s.bConsumeAllRootMotion = true;
        if (s.MasterPoseComponent) {
          this.Asn.push(s);
        } else {
          this.SkeletalComps.push(s);
          if (this.MainSkelComp) {
            s.PrerequisiteComp = this.MainSkelComp;
          } else {
            this.MainSkelComp = s;
          }
        }
        this.mYs ||= s.GetAnimInstance();
      }
    }
    if (this.mYs) {
      this.mYs.SetDelayAnimTime(0, 0);
    }
    if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest) {
      this.TickMode = 1;
    } else {
      this.Psn();
    }
    var t = this.Entity.GetComponent(186);
    if (!this.Active && t) {
      TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(5, true, t.EndAnimNotifyStates);
    }
    this.TickType = 1;
    this.Rsn = Stats_1.Stat.CreateNoFlameGraph("ProxyTick " + this.Hte?.Owner?.GetName());
  }
  OnEnd() {
    this.TickMode = 0;
    this.TickType = 0;
    for (const t of this.SkeletalComps) {
      t.SetComponentTickEnabled(false);
    }
    return true;
  }
  OnTick(t) {
    t = t * MathUtils_1.MathUtils.MillisecondToSecond * (this.Entity.GetComponent(131)?.CurrentTimeScale ?? 1);
    if (this.Entity.GetTickInterval() > 1 && this.ForceDisableAnimDelaySet.size === 0) {
      this.mYs?.SetDelayAnimTime(Math.min(MAX_TIME_DELAY_ANIM, t), Math.min(MAX_COLLECT_PERIOD_DELAY_ANIM, t / 2));
    } else if (this.I5r?.IsInFighting) {
      this.mYs?.SetDelayAnimTime(0, MAX_TIME_DELAY_ANIM);
    } else {
      this.mYs?.SetDelayAnimTime(0, Math.min(MAX_COLLECT_PERIOD_DELAY_ANIM, t));
    }
    if (this.TickMode === 3) {
      this.TakeOverModeTick(t);
    }
    this.Psn();
  }
  TakeOverModeTick(t) {
    if (this.TickMode === 3) {
      this.d3r = Time_1.Time.Frame;
      this.mYs?.AddDeltaForDelayAnim(t);
      for (const e of this.SkeletalComps) {
        if (this.TickType !== 2 || !!this.CheckMainMesh(e)) {
          e.KuroTickComponentOutside(t);
        }
      }
      if (this.TickType !== 2) {
        for (const i of this.Asn) {
          i.KuroTickComponentOutside(t);
        }
      }
    }
  }
  ProxyTick(t, e = false) {
    if (this.TickType === 1 || this.TickType === 2) {
      this.Rsn?.Start();
      this.d3r = Time_1.Time.Frame;
      var i = this.Entity.GetComponent(131)?.CurrentTimeScale;
      var s = t * this.TimeDilation * (i === undefined || this.Tsn && i === 0 ? 1 : i);
      this.mYs?.AddDeltaForDelayAnim(s);
      this.gtc.length = 0;
      for (const r of this.SkeletalComps) {
        var o = this.CheckMainMesh(r);
        if (this.TickType !== 2 || !!o) {
          if (r) {
            if (!!e && (!o || this.TickMode !== 2)) {
              this.gtc.push(r);
            }
            r.KuroTickComponentOutside(s);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Test", 6, "NoSkeletalMesh", ["EntityId", this.Entity.Id], ["Actor", this.Hte?.Owner?.GetName()]);
          }
        }
      }
      this.Rsn?.Stop();
    }
  }
  UnlockEvaluation() {
    for (const t of this.gtc) {
      t.UnlockKuroEvaluation();
    }
  }
  DealComplete() {
    for (const t of this.gtc) {
      t.DealCompleteParallelEvaluation();
    }
  }
  AfterProxyTick(t) {
    if (this.TickType === 1) {
      this.Rsn?.Start();
      var e = this.Entity.GetComponent(131)?.CurrentTimeScale;
      var i = t * this.TimeDilation * (e === undefined || this.Tsn && e === 0 ? 1 : e);
      if (this.Tsn && (this.Tsn = false, this.d3r !== Time_1.Time.Frame)) {
        for (const s of this.SkeletalComps) {
          s.KuroTickComponentOutside(t);
        }
      }
      if (this.MainSkelComp?.RenderedAndNotSkipUpdate()) {
        for (const o of this.Asn) {
          if (o) {
            o.KuroTickComponentOutside(i);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Test", 6, "NoSkeletalMesh", ["EntityId", this.Entity.Id], ["Actor", this.Hte?.Owner?.GetName()]);
          }
        }
      }
      this.Rsn?.Stop();
    }
  }
  OnEnable() {
    if (this.TickMode !== 3) {
      this.Tsn = true;
    }
    if (this.TickMode === 4) {
      for (const t of this.SkeletalComps) {
        t.SetComponentTickEnabled(true);
      }
    }
  }
  OnDisable() {
    if (this.TickMode === 4) {
      for (const t of this.SkeletalComps) {
        t.SetComponentTickEnabled(false);
      }
    }
  }
  SetTakeOverTick(t) {
    this.Lsn = t;
    this.Psn();
  }
  SetLodBias(t) {
    for (const e of this.SkeletalComps) {
      e.SetLODBias(t);
    }
  }
  SetSkeletalMeshTickType(t) {
    var e;
    if (this.TickType !== t && (e = this.Hte?.CreatureData.GetPbDataId(), this.TickType = t, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Character", 50, "[SetSkeletalMeshTickType] 设置SkeletalMeshTickType", ["Type", t], ["PbDataId", e]);
    }
    return true;
  }
  CheckMainMesh(t) {
    return !!t.IsValid() && t.GetName() === "CharacterMesh0";
  }
  Psn() {
    if (this.Lsn) {
      this.TickMode = 3;
    } else if (!UeSkeletalTickController.MainRoleParallel && this.IsMainRole()) {
      this.TickMode = 2;
    } else {
      this.TickMode = 1;
    }
  }
  IsMainRole() {
    return this.Hte?.Owner === Global_1.Global.BaseCharacter;
  }
  StartForceDisableAnimDelay(t) {
    if (this.ForceDisableAnimDelaySet.has(t)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 31, "动画缓动强制关闭 - 重复", ["Reason", t]);
      }
      return false;
    } else {
      this.ForceDisableAnimDelaySet.add(t);
      return true;
    }
  }
  CancelForceDisableAnimDelay(t) {
    this.ForceDisableAnimDelaySet.delete(t);
  }
  RefreshCharacterAnimInstance() {
    this.mYs = this.Hte?.SkeletalMesh?.GetAnimInstance();
    this.mYs?.SetDelayAnimTime(0, 0);
  }
};
UeSkeletalTickManageComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(123)], UeSkeletalTickManageComponent);
exports.UeSkeletalTickManageComponent = UeSkeletalTickManageComponent; //# sourceMappingURL=UeSkeletalTickManageComponent.js.map