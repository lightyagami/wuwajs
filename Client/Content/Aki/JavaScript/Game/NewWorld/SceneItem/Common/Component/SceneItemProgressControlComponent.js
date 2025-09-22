"use strict";

var SceneItemProgressControlComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var r;
  var h = arguments.length;
  var a = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (r = t[n]) {
        a = (h < 3 ? r(a) : h > 3 ? r(e, i, a) : r(e, i)) || a;
      }
    }
  }
  if (h > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemProgressControlComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IUtil_1 = require("../../../../../UniverseEditor/Interface/IUtil");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CHARGING_DEVICE_DISABLE_OFFSET = 2000;
let SceneItemProgressControlComponent = SceneItemProgressControlComponent_1 = class SceneItemProgressControlComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Rne = undefined;
    this.Lo = undefined;
    this.EIe = undefined;
    this.mBe = undefined;
    this.Hte = undefined;
    this.Lie = undefined;
    this.u1n = undefined;
    this.c1n = undefined;
    this.m1n = (t, e) => {
      switch (t) {
        case -1152559349:
          this.d1n("[SceneItemProgressControlComponent.HandleUpdateState] 状态变为常态, 停止进度控制");
          this.C1n();
          this.H1t();
          this.g1n();
          break;
        case -3775711:
          this.f1n();
          break;
        case 1298716444:
          var i = this.Lo.Control;
          var s = this.EIe.GetBaseInfo().HeadStateViewConfig;
          if (i.Type === "ChargingDevice" && s?.HeadStateViewType === 10) {
            TimerSystem_1.TimerSystem.Delay(() => {
              this.d1n("[SceneItemProgressControlComponent.HandleUpdateState] 状态变为完成, 停止进度控制");
            }, CHARGING_DEVICE_DISABLE_OFFSET);
          } else {
            this.d1n("[SceneItemProgressControlComponent.HandleUpdateState] 状态变为完成, 停止进度控制");
          }
      }
    };
    this.vtn = undefined;
    this.p1n = false;
    this.v1n = undefined;
    this.M1n = 0;
    this.E1n = t => {
      var e = this.Lo.Control;
      if (e.Type === "CaptureStrategicPoint" || e.Type === "CaptureStrategicPoint2") {
        if (this.p1n !== t) {
          this.p1n = t;
          this.S1n();
        }
      }
    };
    this.y1n = (t, e) => {
      var i = this.Lo.Control;
      if ((i.Type === "CaptureStrategicPoint" || i.Type === "CaptureStrategicPoint2") && e?.Valid) {
        var s = e.Entity.GetComponent(3);
        if (!s?.IsRoleAndCtrlByMe) {
          if (t) {
            s = i.EnemyEntitiyMatch;
            t = e.Entity.GetComponent(0).GetBaseInfo()?.Category;
            if (!t) {
              return;
            }
            if (!(0, IUtil_1.isEntitiyMatch)(s, t)) {
              return;
            }
            this.v1n.add(e);
          } else {
            this.v1n.delete(e);
          }
          this.S1n();
        }
      }
    };
    this.zpe = (t, e) => {
      if (this.v1n.has(e)) {
        this.y1n(false, e);
      }
    };
    this.$br = undefined;
    this.Zln = t => {
      if (this.D1n() && this.lcn(t) && t.DamageId !== 0) {
        this.u1n.CurrentValue;
        var e;
        var i = this.Lo?.Control;
        switch (i?.Type) {
          case "ChargingDevice":
            if ((e = MathUtils_1.MathUtils.Clamp(this.u1n.CurrentValue + i.HitExtraValue, 0, i.MaxValue)) !== this.u1n.CurrentValue) {
              this.u1n.CurrentValue = e;
              this.H1t();
              this.g1n();
            }
            break;
          case "TimedStrikeDevice":
            if (this.Qk1 !== 0 && this.Qk1 !== 6 && this.u1n.CurrentValue < i.MaxValue) {
              this.Qk1 = 1;
              this.AMc(0);
            }
        }
      }
    };
    this.l_l = true;
    this.Qk1 = 0;
    this.LMc = 0;
    this.wMc = 0;
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemProgressControlComponent_1)[0];
    this.Lo = t;
    this.EIe = this.Entity.GetComponent(0);
    this.c1n = new Set();
    this.Rne = undefined;
    this.C1n();
    t = this.Lo.Control;
    switch (t.Type) {
      case "CaptureStrategicPoint":
      case "CaptureStrategicPoint2":
        this.p1n = false;
        this.v1n = new Set();
        break;
      case "ChargingDevice":
      case "TimedStrikeDevice":
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 39, "[SceneItemProgressControlComponent.OnCreate] 不支持的进度控制类型", ["PbDataId", this.EIe.GetPbDataId()]);
        }
        return false;
    }
    return true;
  }
  OnStart() {
    this.mBe = this.Entity.CheckGetComponent(134);
    this.Lie = this.Entity.CheckGetComponent(197);
    this.Hte = this.Entity.CheckGetComponent(203);
    if (!this.mBe || !this.Lie || !this.Hte) {
      return false;
    }
    switch (this.Lo.Control.Type) {
      case "CaptureStrategicPoint":
      case "CaptureStrategicPoint2":
        this.vtn = this.Entity.CheckGetComponent(86);
        if (!this.vtn) {
          return false;
        }
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.E1n);
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.y1n);
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
        break;
      case "ChargingDevice":
      case "TimedStrikeDevice":
        this.$br = this.Entity.CheckGetComponent(155);
        if (this.$br) {
          this.$br.RegisterComponent(this, this.Lo);
        }
        EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln);
    }
    return true;
  }
  OnActivate() {
    this.d1n("[SceneItemProgressControlComponent.OnActivate] 初始停止进度控制");
    this.I1n();
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Temp", 31, "SceneItemProgressControlComponent.OnActivate: 重复添加事件", ["PbDataId", this.EIe.GetPbDataId()]);
      }
    } else {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n);
    }
    this.g1n();
  }
  OnEnd() {
    switch (this.Lo.Control.Type) {
      case "CaptureStrategicPoint":
      case "CaptureStrategicPoint2":
        if (this.vtn) {
          EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.E1n);
          EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.y1n);
          this.vtn = undefined;
        }
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
        break;
      case "ChargingDevice":
      case "TimedStrikeDevice":
        if (EventSystem_1.EventSystem.HasWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln)) {
          EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln);
        }
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n);
    }
    return !(this.mBe = undefined);
  }
  OnTick(t) {
    switch (this.Lo.Control.Type) {
      case "CaptureStrategicPoint":
      case "CaptureStrategicPoint2":
        this.T1n(t);
        break;
      case "ChargingDevice":
        this.lQs(t);
        break;
      case "TimedStrikeDevice":
        this.AMc(t);
    }
  }
  I1n() {
    if (this.mBe?.IsInState(2)) {
      this.f1n();
    } else {
      this.d1n("[SceneItemProgressControlComponent.HandleUpdateState] 状态未激活, 停止进度控制");
    }
  }
  L1n() {
    var t = Protocol_1.Aki.Protocol.zls.create();
    t.F4n = MathUtils_1.MathUtils.NumberToLong(this.EIe.GetCreatureDataId());
    Net_1.Net.Call(25347, t, t => {});
  }
  g1n() {
    var t = this.Lo.Control;
    switch (t.Type) {
      case "CaptureStrategicPoint":
      case "CaptureStrategicPoint2":
      case "ChargingDevice":
      case "TimedStrikeDevice":
        if (this.u1n?.CurrentValue === t.MaxValue && !this.mBe?.IsInState(4)) {
          this.L1n();
        }
    }
  }
  D1n() {
    return this.Rne === undefined;
  }
  f1n() {
    if (!this.D1n() && this.Enable(this.Rne, "SceneItemProgressControlComponent.EnableProgressControl")) {
      this.Rne = undefined;
      this.R1n(true);
    }
  }
  d1n(t) {
    if (this.D1n()) {
      this.Rne = this.Disable(t);
      this.R1n(false);
    }
  }
  R1n(t) {
    var e = this.Lo.Control;
    switch (e.Type) {
      case "CaptureStrategicPoint":
      case "CaptureStrategicPoint2":
        this.S1n();
        break;
      case "TimedStrikeDevice":
        if (t) {
          if (this.u1n?.CurrentValue === e.InitValue) {
            this.Qk1 = 5;
          } else {
            this.Qk1 = 4;
          }
        } else {
          this.Qk1 = 0;
        }
        this.RMc();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAnyProgressControlEnableStateChange, this.Entity, t, this.u1n);
  }
  H1t() {
    this.c1n.forEach(t => {
      t?.(this.u1n);
    });
  }
  AddProgressDataChangedCallback(t) {
    return !!t && !!this.c1n && !(this.c1n.add(t), 0);
  }
  RemoveProgressDataChangedCallback(t) {
    return !!t && !!this.c1n && this.c1n.delete(t);
  }
  GetProgressData() {
    return this.u1n;
  }
  C1n() {
    var t = this.Lo.Control;
    switch (t.Type) {
      case "CaptureStrategicPoint":
      case "CaptureStrategicPoint2":
      case "TimedStrikeDevice":
        this.u1n = {
          ProgressCtrlType: t.Type,
          CurrentValue: t.InitValue,
          MaxValue: t.MaxValue
        };
        break;
      case "ChargingDevice":
        this.u1n = {
          ProgressCtrlType: t.Type,
          CurrentValue: t.InitValue,
          MaxValue: t.MaxValue
        };
        this.l_l = true;
    }
  }
  U1n(t, e = 0) {
    if (e === 0) {
      switch (t) {
        case 3:
          return 1803735224;
        case 1:
        case 2:
        case 4:
          return -1726296883;
      }
    } else if (e === 1) {
      switch (t) {
        case 1:
          return -975252567;
        case 2:
          return -582657804;
        case 3:
          return 852682560;
        case 4:
          return 1345839869;
      }
    }
  }
  e4a(t) {
    var e = this.Lo.Control;
    if (e.Type === "CaptureStrategicPoint") {
      switch (t) {
        case 1:
        case 2:
          return -e.DecreaseSpeed;
        case 3:
          return e.IncreaseSpeed;
        case 4:
          return -(e.UnoccupiedDecreaseSpeed ?? 0);
        default:
          return 0;
      }
    } else if (e.Type === "CaptureStrategicPoint2") {
      switch (t) {
        case 1:
          return e.PlayerInMonsterInCaptureSpeed;
        case 2:
          return e.PlayerOutMonsterInCaptureSpeed;
        case 3:
          return e.PlayerInMonsterOutCaptureSpeed;
        case 4:
          return e.PlayerOutMonsterOutCaptureSpeed;
        default:
          return 0;
      }
    }
    return 0;
  }
  S1n() {
    var i = this.Lo.Control;
    if (i.Type === "CaptureStrategicPoint" || i.Type === "CaptureStrategicPoint2") {
      var s = this.M1n;
      let e = 0;
      if (s !== (e = this.D1n() ? this.v1n.size > 0 ? this.p1n ? 1 : 2 : this.p1n ? 3 : 4 : e)) {
        this.M1n = e;
        if (i.ProgressPerformanceAttribute) {
          var r = i.ProgressPerformanceAttribute;
          var h = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r);
          if (this.Lie.HasTag(r) && this.Hte?.GetActiveTagSequencePlaybackProgress(h) === undefined) {
            this.Lie.RemoveTag(r);
          }
          let t = false;
          if (!this.Lie.HasTag(r)) {
            this.Lie.AddTag(r);
            t = true;
          }
          var a;
          var r = this.e4a(s);
          var n = this.e4a(e);
          if (!!t || r !== n) {
            if (n !== 0) {
              a = Math.abs(this.u1n.MaxValue / n);
              this.Hte?.SetActiveTagSequenceDurationTime(h, a);
            }
            a = MathUtils_1.MathUtils.Clamp(this.u1n.CurrentValue / this.u1n.MaxValue, 0, 1);
            if (n === 0) {
              this.Hte?.ResumeActiveTagSequence(h, r < 0);
              this.Hte?.PauseActiveTagSequence(h);
              this.Hte?.SetActiveTagSequencePlaybackProgress(h, r > 0 ? a : 1 - a);
            } else {
              this.Hte?.ResumeActiveTagSequence(h, n < 0);
              this.Hte?.SetActiveTagSequencePlaybackProgress(h, n > 0 ? a : 1 - a);
            }
          }
        }
        r = i.Type === "CaptureStrategicPoint" ? i.CaptureType ?? 0 : 1;
        h = this.U1n(s, r);
        n = this.U1n(e, r);
        if (h !== n && this.Lie) {
          this.Lie.NotifyLock++;
          if (h !== undefined) {
            this.Lie.RemoveTag(h);
          }
          if (n !== undefined) {
            this.Lie.AddTag(n);
          }
          this.Lie.NotifyLock--;
        }
      }
    }
  }
  T1n(t) {
    var e;
    var i = this.Lo.Control;
    if (i.Type === "CaptureStrategicPoint" || i.Type === "CaptureStrategicPoint2") {
      e = this.e4a(this.M1n);
      if ((t = MathUtils_1.MathUtils.Clamp(this.u1n.CurrentValue + t / CommonDefine_1.MILLIONSECOND_PER_SECOND * e, Math.min(0, i.MaxValue), Math.max(0, i.MaxValue))) !== this.u1n.CurrentValue) {
        this.u1n.CurrentValue = t;
        this.H1t();
        this.g1n();
      }
    }
  }
  lcn(t) {
    return !ModelManager_1.ModelManager.GameModeModel.IsMulti || !!t.Attacker?.Valid && t.Attacker.GetComponent(3).IsAutonomousProxy;
  }
  lQs(t) {
    var e;
    if (this.l_l) {
      this.l_l = false;
    } else if ((e = this.Lo?.Control)?.Type === "ChargingDevice" && (t = MathUtils_1.MathUtils.Clamp(this.u1n.CurrentValue + t / CommonDefine_1.MILLIONSECOND_PER_SECOND * e.IncreaseSpeed, 0, e.MaxValue)) !== this.u1n.CurrentValue) {
      this.u1n.CurrentValue = t;
      this.H1t();
      this.g1n();
    }
  }
  AMc(t) {
    var e = this.Lo?.Control;
    if (e?.Type === "TimedStrikeDevice") {
      switch (this.Qk1) {
        case 2:
          this.LMc = Math.max(0, this.LMc - t);
          if (!(this.LMc > 0)) {
            if (this.u1n.CurrentValue === e.MaxValue) {
              this.Qk1 = 6;
            } else {
              this.Qk1 = 3;
            }
          }
          break;
        case 4:
          this.wMc = Math.max(0, this.wMc - t);
          if (!(this.wMc > 0)) {
            if (this.u1n.CurrentValue === 0) {
              this.Qk1 = 5;
            } else {
              this.Qk1 = 3;
            }
          }
          break;
        case 3:
          var i = this.u1n.CurrentValue;
          var s = MathUtils_1.MathUtils.Clamp(i - e.FallbackValue, 0, e.MaxValue);
          if (s !== i) {
            this.u1n.CurrentValue = s;
            this.H1t();
            this.g1n();
            this.RMc();
          }
          this.wMc = e.FallbackInterval;
          this.Qk1 = 4;
          break;
        case 1:
          i = this.u1n.CurrentValue;
          s = MathUtils_1.MathUtils.Clamp(i + e.AddValue, 0, e.MaxValue);
          if (s !== i) {
            this.u1n.CurrentValue = s;
            this.H1t();
            this.g1n();
            this.RMc();
          }
          if (this.u1n.CurrentValue === e.MaxValue) {
            this.Qk1 = 6;
          } else {
            this.LMc = e.Timeout;
            this.Qk1 = 2;
          }
          break;
        case 5:
          this.RMc();
      }
    }
  }
  RMc() {
    var t = this.Lo?.Control;
    if (t?.Type === "TimedStrikeDevice") {
      var i = t.ZeroValuePerformanceAttribute;
      var s = !!i && this.Lie.HasTag(i);
      var r = t.ProgressPerformanceAttribute;
      var h = !!r && this.Lie.HasTag(r);
      var a = t.AscendPerformanceAttribute;
      var n = !!a && this.Lie.HasTag(a);
      var o = t.DescendPerformanceAttribute;
      var c = !!o && this.Lie.HasTag(o);
      var v = t.AddValue;
      switch (this.Qk1) {
        case 0:
          if (s) {
            this.Lie.RemoveTag(i);
          }
          break;
        case 1:
          {
            let e = false;
            if (s) {
              this.Lie.RemoveTag(i);
            }
            if (r) {
              var _ = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r);
              if (h) {
                if (this.Hte?.GetActiveTagSequencePlaybackProgress(_) === undefined) {
                  this.Lie.RemoveTag(r);
                  this.Lie.AddTag(r);
                  this.Hte?.PauseActiveTagSequence(_);
                  this.Hte?.SetActiveTagSequencePlaybackProgress(_, 0);
                }
              } else {
                this.Lie.AddTag(r);
                this.Hte?.PauseActiveTagSequence(_);
                this.Hte?.SetActiveTagSequencePlaybackProgress(_, 0);
              }
              var C = MathUtils_1.MathUtils.Clamp((this.u1n.CurrentValue - v) / this.u1n.MaxValue, 0, 1);
              var g = MathUtils_1.MathUtils.Clamp(this.u1n.CurrentValue / this.u1n.MaxValue, 0, 1);
              var l = this.Hte?.GetIsActiveTagSequencePlayReverseFromConfig(_);
              let t = this.Hte?.GetActiveTagSequencePlaybackProgress(_);
              if (l) {
                t = 1 - t;
                this.Hte?.ResumeActiveTagSequence(_, false);
                this.Hte?.PauseActiveTagSequence(_);
                this.Hte?.SetActiveTagSequencePlaybackProgress(_, t);
              }
              e = t === undefined || C > t || MathUtils_1.MathUtils.IsNearlyEqual(C, t);
              if (t !== g) {
                if (C > (t ?? 0)) {
                  this.Hte?.SetActiveTagSequencePlaybackProgress(_, C);
                }
                this.Hte?.PlayActiveTagSequenceTo(_, g, false);
              }
            }
            if (c) {
              this.Lie.RemoveTag(o);
            }
            if (a && e) {
              if (n) {
                this.Lie?.RemoveTag(a);
              }
              this.Lie?.AddTag(a);
            }
            break;
          }
        case 5:
          if (r) {
            l = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r);
            if ((C = this.Hte?.GetIsActiveTagSequencePlayReverseFromConfig(l)) === false) {
              this.Hte?.SetActiveTagSequencePlaybackProgress(l, 0);
            } else if (C === true) {
              this.Hte?.SetActiveTagSequencePlaybackProgress(l, 1);
            }
          }
          if (h) {
            this.Lie.RemoveTag(r);
          }
          if (!s && i) {
            this.Lie.AddTag(i);
          }
          if (c) {
            this.Lie.RemoveTag(o);
          }
          break;
        case 3:
          if (s) {
            this.Lie.RemoveTag(i);
          }
          if (r) {
            _ = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r);
            if (h) {
              if (this.Hte?.GetActiveTagSequencePlaybackProgress(_) === undefined) {
                this.Lie.RemoveTag(r);
                this.Lie.AddTag(r);
                this.Hte?.PauseActiveTagSequence(_);
                this.Hte?.SetActiveTagSequencePlaybackProgress(_, 0);
              }
            } else {
              this.Lie.AddTag(r);
              this.Hte?.PauseActiveTagSequence(_);
              this.Hte?.SetActiveTagSequencePlaybackProgress(_, 0);
            }
            g = MathUtils_1.MathUtils.Clamp(this.u1n.CurrentValue / this.u1n.MaxValue, 0, 1);
            C = this.Hte?.GetIsActiveTagSequencePlayReverseFromConfig(_);
            l = this.Hte?.GetActiveTagSequencePlaybackProgress(_);
            if (!C || l !== g) {
              this.Hte?.PlayActiveTagSequenceTo(_, 1 - g, true);
            }
          }
          if (n) {
            this.Lie.RemoveTag(a);
          }
          if (o) {
            if (c) {
              this.Lie?.RemoveTag(o);
            }
            this.Lie?.AddTag(o);
          }
      }
    }
  }
};
SceneItemProgressControlComponent = SceneItemProgressControlComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(130)], SceneItemProgressControlComponent);
exports.SceneItemProgressControlComponent = SceneItemProgressControlComponent; //# sourceMappingURL=SceneItemProgressControlComponent.js.map