"use strict";

var SceneItemTurntableControllerComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var h = arguments.length;
  var r = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (n = t[o]) {
        r = (h < 3 ? n(r) : h > 3 ? n(e, i, r) : n(e, i)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemTurntableControllerComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
class RotatingRing {
  constructor() {
    this.Index = 0;
    this.ControllerRingActor = undefined;
    this.RingRotator = undefined;
    this.CurSpeed = -0;
    this.AccumulateAngle = -0;
    this.IsSelected = false;
    this.IsAtTarget = false;
    this.IsRotating = false;
  }
}
let SceneItemTurntableControllerComponent = SceneItemTurntableControllerComponent_1 = class SceneItemTurntableControllerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.p_n = undefined;
    this.v_n = undefined;
    this.Rne = undefined;
    this.Xte = undefined;
    this.u1t = undefined;
    this.M_n = false;
    this.Rnn = () => {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
      if (this.E_n() && (this.S_n(), this.M_n = true, this.UpdateAllRingsAtTarget(true)) && !this.Xte?.HasTag(1298716444)) {
        this.y_n();
      }
    };
    this.m1n = (t, e) => {
      if (this.M_n && t === 1298716444) {
        this.SetAllowRotate(false);
        for (const s of this.v_n) {
          var i = this.p_n.ItemConfig[s.Index];
          if (!s?.IsAtTarget) {
            this.I_n(s, i.TargetAngle);
            this.UpdateRingAtTarget(s.Index, false);
          }
        }
        this.UpdateAllRingsAtTargetEffect();
        if (e) {
          EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnTurntableControllerBusyStateChange, false, false);
        }
      }
    };
  }
  OnInitData(t) {
    var t = t.GetParam(SceneItemTurntableControllerComponent_1)[0];
    var e = this.Entity?.GetComponent(0);
    if (!e) {
      return false;
    }
    if (t) {
      var i = t.Config.ItemConfig?.length;
      if (i === undefined || i <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 39, "稷廷开门机关组件创建错误，圈数不对");
        }
      } else {
        this.u1t = e;
        this.p_n = t.Config;
        this.v_n = [];
        for (let t = 0; t < i; t++) {
          var s = new RotatingRing();
          s.Index = t;
          s.IsAtTarget = false;
          s.IsSelected = false;
          s.IsRotating = false;
          s.CurSpeed = 0;
          s.AccumulateAngle = 0;
          this.v_n.push(s);
        }
        this.M_n = false;
      }
    }
    return true;
  }
  OnStart() {
    this.Xte = this.Entity.GetComponent(200);
    if (this.Xte) {
      if (this.p_n) {
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
      }
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "稷廷开门机关组件初始化错误，找不到LevelTagComponent");
      }
      return false;
    }
  }
  OnActivate() {
    this.SetAllowRotate(false);
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "SceneItemTurntableControllerComponent.OnActivate，重复添加事件", ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()]);
      }
    } else {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n);
    }
  }
  OnTick(t) {
    if (this.M_n) {
      if (this.GetControlType() === IComponent_1.EControllerType.FixedAngle) {
        this.T_n(t);
      } else {
        this.L_n(t);
      }
      this.D_n(t);
    }
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.m1n);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    return true;
  }
  E_n() {
    var t = this.Entity?.GetComponent(206);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "稷廷开门机关组件初始化错误，SceneItemActorComponent组件获取失败");
      }
      return false;
    }
    for (const s of this.v_n) {
      var e = "Ring" + s.Index;
      var i = t.GetActorInSceneInteraction(e);
      if (!i?.IsValid()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 39, "稷廷开门机关组件初始化错误，对应Actor无效", ["key", e]);
        }
        return false;
      }
      s.ControllerRingActor = i;
    }
    return true;
  }
  S_n() {
    var t = this.Xte?.HasTag(1298716444) ?? false;
    for (const i of this.v_n) {
      var e = this.p_n.ItemConfig[i.Index];
      if (t) {
        this.I_n(i, e.TargetAngle);
      } else {
        this.I_n(i, e.InitAngle);
      }
    }
  }
  DeselectAllRings(t) {
    for (const e of this.v_n) {
      e.IsSelected = false;
    }
    if (t) {
      this.UpdateAllRingsSelectedEffect();
    }
  }
  SelectRingByIndex(t, e) {
    t = this.v_n[t];
    if (t && (t.IsSelected = true, e)) {
      this.UpdateRingSelectedEffectByIndex(t.Index);
    }
  }
  DeselectRingByIndex(t, e) {
    t = this.v_n[t];
    if (t && (t.IsSelected = false, e)) {
      this.UpdateRingSelectedEffectByIndex(t.Index);
    }
  }
  R_n(t) {
    switch (t) {
      case 0:
        return 981971147;
      case 1:
        return 965193528;
      case 2:
        return 1015526385;
    }
    return 0;
  }
  U_n(t) {
    switch (t) {
      case 0:
        return -639326900;
      case 1:
        return -622549281;
      case 2:
        return -605771662;
    }
    return 0;
  }
  A_n(t, e) {
    t = this.v_n[t];
    if (t && this.M_n && this.GetRotateAllowed() && !this.IsBusyRotating()) {
      t.AccumulateAngle = 0;
      t.CurSpeed = Math.abs(this.p_n.RotationSpeed) * (e ? 1 : -1) / CommonDefine_1.MILLIONSECOND_PER_SECOND;
      t.IsRotating = true;
    }
  }
  P_n(t) {
    t = this.v_n[t];
    if (t && this.M_n && this.GetRotateAllowed()) {
      t.AccumulateAngle = 0;
      t.CurSpeed = 0;
      t.IsRotating = false;
    }
  }
  TriggerStartSelectedRingsRotate() {
    if (this.p_n.Type === IComponent_1.EControllerType.FixedAngle) {
      this.x_n();
    } else {
      this.w_n();
    }
  }
  x_n() {
    if (this.M_n && this.GetRotateAllowed() && this.p_n.Type === IComponent_1.EControllerType.FixedAngle) {
      this.v_n.forEach(t => {
        var e;
        if (t.IsSelected) {
          e = this.p_n.RotationSpeed > 0;
          this.A_n(t.Index, e);
        }
      });
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnTurntableControllerBusyStateChange, true, false);
    }
  }
  w_n() {
    if (this.M_n && this.GetRotateAllowed() && this.p_n.Type === IComponent_1.EControllerType.FreeAngle) {
      this.v_n.forEach(t => {
        var e;
        if (t.IsSelected) {
          e = this.p_n.RotationSpeed > 0;
          this.A_n(t.Index, e);
        }
      });
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnTurntableControllerBusyStateChange, true, false);
    }
  }
  TriggerStopAllRingsRotate() {
    if (this.p_n.Type === IComponent_1.EControllerType.FixedAngle) {
      this.B_n();
    } else {
      this.b_n();
    }
  }
  B_n() {
    if (this.M_n && this.GetRotateAllowed() && this.IsBusyRotating() && this.p_n.Type === IComponent_1.EControllerType.FixedAngle) {
      this.v_n.forEach(t => {
        if (t.IsRotating) {
          this.q_n(t, -t.AccumulateAngle);
        }
        this.P_n(t.Index);
      });
      if (this.UpdateAllRingsAtTarget(true)) {
        this.y_n();
      }
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnTurntableControllerBusyStateChange, false, this.IsAllRingsAtTarget());
    }
  }
  b_n() {
    if (this.M_n && this.GetRotateAllowed() && this.IsBusyRotating() && this.p_n.Type === IComponent_1.EControllerType.FreeAngle) {
      this.v_n.forEach(t => {
        this.P_n(t.Index);
      });
      if (this.UpdateAllRingsAtTarget(true)) {
        this.y_n();
      }
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnTurntableControllerBusyStateChange, false, this.IsAllRingsAtTarget());
    }
  }
  TriggerResetAllRingsToInitAngle(t = false) {
    if (!!this.M_n && !!this.GetRotateAllowed() && !this.IsBusyRotating() && (!this.IsAllRingsAtTarget() || !!t)) {
      this.v_n.forEach(t => {
        var e = this.p_n.ItemConfig[t.Index];
        this.I_n(t, e.InitAngle);
      });
      this.UpdateAllRingsAtTarget(true);
    }
  }
  T_n(e) {
    if (this.M_n) {
      var i = this.p_n;
      if (i) {
        for (const r of this.v_n) {
          if (r.IsRotating) {
            let t = r.CurSpeed * e;
            var s;
            var n = r.AccumulateAngle + t;
            var h = i.ItemConfig[r.Index].RotateAngle;
            if (Math.abs(n) >= Math.abs(h)) {
              s = r.CurSpeed > 0;
              t -= n - Math.abs(h) * (s ? 1 : -1);
              this.q_n(r, t);
              r.AccumulateAngle += t;
              this.P_n(r.Index);
              if (this.IsBusyRotating()) {
                this.UpdateRingAtTarget(r.Index, true);
              } else {
                if (this.UpdateAllRingsAtTarget(true)) {
                  this.y_n();
                }
                EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnTurntableControllerBusyStateChange, false, this.IsAllRingsAtTarget());
              }
            } else {
              this.q_n(r, t);
              r.AccumulateAngle += t;
              if (r.IsAtTarget) {
                this.UpdateRingAtTarget(r.Index, true);
              }
            }
          }
        }
      }
    }
  }
  L_n(t) {
    if (this.M_n) {
      for (const i of this.v_n) {
        var e;
        if (i.IsRotating && (e = i.CurSpeed * t, this.q_n(i, e), i.IsAtTarget)) {
          this.UpdateRingAtTarget(i.Index, true);
        }
      }
    }
  }
  D_n(t) {
    if (this.M_n) {
      for (const n of this.v_n) {
        var e;
        var i;
        var s;
        if (!n.IsRotating && !!n.IsAtTarget && !(s = this.p_n.ItemConfig[n.Index], s = this.G_n(this.N_n(n), s.TargetAngle), MathUtils_1.MathUtils.IsNearlyZero(s))) {
          e = s > 0;
          i = this.p_n.RotationSpeed / CommonDefine_1.MILLIONSECOND_PER_SECOND;
          s = Math.min(Math.abs(s), Math.abs(i * t)) * (e ? 1 : -1);
          this.q_n(n, s);
        }
      }
    }
  }
  N_n(t) {
    if (t?.ControllerRingActor?.IsValid()) {
      t.RingRotator ||= Rotator_1.Rotator.Create(t.ControllerRingActor.RootComponent.D_GetRelativeTransform().Rotator());
      return -t.RingRotator.Pitch;
    }
  }
  I_n(t, e) {
    if (t.ControllerRingActor?.IsValid()) {
      t.RingRotator ||= Rotator_1.Rotator.Create();
      t.RingRotator.Pitch = -e;
      t.ControllerRingActor.RootComponent.K2_SetRelativeRotation(t.RingRotator.ToUeRotator(), false, undefined, false);
    }
  }
  q_n(t, e) {
    if (t.ControllerRingActor?.IsValid()) {
      t.RingRotator ||= Rotator_1.Rotator.Create();
      t.RingRotator.Pitch -= e;
      t.ControllerRingActor.RootComponent.K2_SetRelativeRotation(t.RingRotator.ToUeRotator(), false, undefined, false);
    }
  }
  UpdateAllRingsAtTarget(t) {
    let e = true;
    for (const i of this.v_n) {
      if (!this.UpdateRingAtTarget(i.Index, false)) {
        e = false;
      }
    }
    if (t) {
      this.UpdateAllRingsAtTargetEffect();
    }
    return e;
  }
  UpdateRingAtTarget(t, e) {
    var i;
    var s;
    var n;
    var t = this.v_n[t];
    return !!t && !!this.M_n && !!t?.RingRotator && (n = this.N_n(t), i = (s = this.p_n).ItemConfig[t.Index]?.TargetAngle, s = this.p_n.Type === IComponent_1.EControllerType.FixedAngle ? 1 : s.IntervalAngle, n = Math.abs(this.G_n(n, i)), t.IsAtTarget = n <= s, e && this.UpdateRingAtTargetEffectByIndex(t.Index), t.IsAtTarget);
  }
  IsBusyRotating() {
    for (const t of this.v_n) {
      if (t.IsRotating) {
        return true;
      }
    }
    return false;
  }
  IsRingRotatingByIndex(t) {
    t = this.v_n[t];
    return !!t && !!this.M_n && t.IsRotating;
  }
  GetRingsNum() {
    return this.v_n?.length;
  }
  GetControlType() {
    return this.p_n.Type;
  }
  IsAllRingsAtTarget() {
    for (const t of this.v_n) {
      if (!t.IsAtTarget) {
        return false;
      }
    }
    return true;
  }
  IsRingAtTargetByIndex(t) {
    t = this.v_n[t];
    return !!t && !!this.M_n && t.IsAtTarget;
  }
  IsRingSelectedByIndex(t) {
    t = this.v_n[t];
    return !!t && !!this.M_n && t.IsSelected;
  }
  UpdateAllRingsAtTargetEffect() {
    if (this.Xte) {
      this.Xte.NotifyLock++;
      for (const e of this.v_n) {
        var t;
        if (e.IsAtTarget) {
          t = this.U_n(e.Index);
          if (!this.Xte.HasTag(t)) {
            this.Xte.AddTag(t);
          }
        } else {
          t = this.U_n(e.Index);
          if (this.Xte.HasTag(t)) {
            this.Xte.RemoveTag(t);
          }
        }
      }
      this.Xte.NotifyLock--;
    }
  }
  UpdateRingAtTargetEffectByIndex(t) {
    var e;
    var t = this.v_n[t];
    if (t && this.M_n) {
      if (t.IsAtTarget) {
        e = this.U_n(t.Index);
        if (!this.Xte.HasTag(e)) {
          this.Xte.AddTag(e);
        }
      } else {
        e = this.U_n(t.Index);
        if (this.Xte.HasTag(e)) {
          this.Xte.RemoveTag(e);
        }
      }
    }
  }
  UpdateAllRingsSelectedEffect() {
    if (this.Xte) {
      this.Xte.NotifyLock++;
      for (const e of this.v_n) {
        var t;
        if (e.IsSelected) {
          t = this.R_n(e.Index);
          if (!this.Xte.HasTag(t)) {
            this.Xte.AddTag(t);
          }
        } else {
          t = this.R_n(e.Index);
          if (this.Xte.HasTag(t)) {
            this.Xte.RemoveTag(t);
          }
        }
      }
      this.Xte.NotifyLock--;
    }
  }
  UpdateRingSelectedEffectByIndex(t) {
    var e;
    var t = this.v_n[t];
    if (t && this.M_n) {
      if (t.IsSelected) {
        e = this.R_n(t.Index);
        if (!this.Xte.HasTag(e)) {
          this.Xte.AddTag(e);
        }
      } else {
        e = this.R_n(t.Index);
        if (this.Xte.HasTag(e)) {
          this.Xte.RemoveTag(e);
        }
      }
    }
  }
  SetAllowRotate(t) {
    if (t && !this.GetRotateAllowed()) {
      this.Enable(this.Rne, "SceneItemTurntableControllerComponent.SetAllowRotate");
      this.Rne = undefined;
    } else if (!t && this.GetRotateAllowed()) {
      this.Rne = this.Disable("稷廷开门主控机关: 旋转被禁止，禁用组件");
    }
  }
  GetRotateAllowed() {
    return this.Rne === undefined;
  }
  y_n() {
    var t;
    if (this.u1t) {
      (t = Protocol_1.Aki.Protocol.f0s.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.u1t.GetCreatureDataId());
      Net_1.Net.Call(20949, t, t => {
        if (t?.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs && t?.G9n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrStateEntityStateNoChange) {
          if (this.M_n && this.GetRotateAllowed() && this.IsBusyRotating()) {
            this.TriggerStopAllRingsRotate();
          }
          this.TriggerResetAllRingsToInitAngle(true);
          EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnTurntableControllerBusyStateChange, false, false);
        }
      });
    }
  }
  G_n(t, e) {
    return this.O_n(e - t, -180, 180);
  }
  O_n(t, e, i) {
    let s = t;
    while (s < e) {
      s += 360;
    }
    while (s >= i) {
      s -= 360;
    }
    return s;
  }
};
SceneItemTurntableControllerComponent = SceneItemTurntableControllerComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(139)], SceneItemTurntableControllerComponent);
exports.SceneItemTurntableControllerComponent = SceneItemTurntableControllerComponent; //# sourceMappingURL=SceneItemTurntableControllerComponent.js.map