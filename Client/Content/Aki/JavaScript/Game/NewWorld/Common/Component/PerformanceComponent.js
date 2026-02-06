"use strict";

var PerformanceComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var n = arguments.length;
  var o = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (h = t[r]) {
        o = (n < 3 ? h(o) : n > 3 ? h(e, i, o) : h(e, i)) || o;
      }
    }
  }
  if (n > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformanceComponent = undefined;
const UE = require("ue");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
let PerformanceComponent = PerformanceComponent_1 = class PerformanceComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.inn = undefined;
    this.n$t = undefined;
    this.rnn = undefined;
    this.nnn = 0;
    this.snn = 0;
    this.ann = 0;
    this.Uei = 0;
    this.hnn = undefined;
    this.lnn = undefined;
    this._nn = 0;
    this.unn = undefined;
    this.cnn = undefined;
    this.mnn = undefined;
    this.nXr = undefined;
    this.dnn = false;
    this.Cnn = (t, e) => {
      if (!this.n$t.SkeletalMesh) {
        this.LoadAndChangeStaticMesh();
      }
      if (this.gnn()) {
        this.fnn();
      }
      this.pnn(t, e);
      this.vnn();
      this.Mnn(t, e);
      this.Enn(t, e);
      if ((0, RegisterComponent_1.isComponentInstance)(this.n$t, 214)) {
        this.n$t.TryRefreshShowActor();
      }
    };
    this.Snn = t => {
      var e;
      return !this.rnn.has(t) && (e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t), (e = this.nXr.场景交互物特效列表.Get(e)) !== undefined) && !!(0, RegisterComponent_1.isComponentInstance)(this.n$t, 214) && (this.n$t.PlaySceneInteractionEffect(e), this.rnn.set(t, e), true);
    };
    this.ynn = t => {
      var e;
      if (!this.lnn.has(t)) {
        e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t);
        if ((e = this.nXr.常驻特效列表.Get(e)) && (e = this.Inn(e.AssetPathName?.toString(), "[PerformanceComponent.CheckAndAddOwnEffectByTag]", undefined))) {
          this.lnn.set(t, e);
          t = this.n$t.CreatureData.GetVisible();
          this.Tnn(e, t);
        }
      }
    };
    this.Lnn = undefined;
    this.Dnn = undefined;
    this.Rnn = () => {
      this.Unn();
      this.Ann();
    };
    this.Pnn = (t, e) => {
      if (t === 5 && this?.Entity?.Valid && EffectSystem_1.EffectSystem.IsValid(e) && (this.hnn = EffectSystem_1.EffectSystem.GetNiagaraComponent(e), this.hnn)) {
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnAddCommonEffect);
      }
    };
  }
  SetIsSceneInteractionJumpToEnd(t) {
    this.dnn = t;
  }
  OnStart() {
    this.mnn = undefined;
    this.inn = this.Entity.CheckGetComponent(208);
    this.n$t = this.Entity.GetComponent(1);
    this.nXr = this.n$t.CreatureData.GetModelConfig();
    return !(this.dnn = false);
  }
  OnActivate() {
    if (!this.n$t.SkeletalMesh) {
      this.LoadAndChangeStaticMesh();
    }
    this.xnn();
    this.rnn = new Map();
    if ((0, RegisterComponent_1.isComponentInstance)(this.n$t, 214) && !this.n$t.GetIsSceneInteractionLoadCompleted()) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    this.eve();
    if (this.gnn()) {
      this.wnn();
    }
    this.lnn = new Map();
    this.Bnn();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnLevelTagChanged, this.Cnn);
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnLevelTagChanged, this.Cnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnLevelTagChanged, this.Cnn);
    }
    if ((0, RegisterComponent_1.isComponentInstance)(this.n$t, 214) && EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    return true;
  }
  OnClear() {
    if (this.rnn) {
      this.rnn.clear();
      this.rnn = undefined;
    }
    this.bnn();
    this.cnn = undefined;
    if (this.lnn) {
      for (const t of this.lnn.values()) {
        EffectSystem_1.EffectSystem.StopEffectById(t, "[PerformanceComponent.OnClear 1]", true);
      }
      this.lnn.clear();
      this.lnn = undefined;
    }
    if (this.Uei) {
      this.hnn = undefined;
      EffectSystem_1.EffectSystem.StopEffectById(this.Uei, "[PerformanceComponent.OnClear 2]", false);
      this.Uei = 0;
    }
    if (this._nn) {
      EffectSystem_1.EffectSystem.RemoveFinishCallback(this._nn, this.unn);
      EffectSystem_1.EffectSystem.StopEffectById(this._nn, "[PerformanceComponent.OnClear 3]", true);
      this._nn = 0;
    }
    return !(this.unn = undefined);
  }
  OnEnable() {
    if (this.Entity?.IsInit) {
      this.SetPerformanceVisible(this.n$t.CreatureData.GetVisible());
    }
  }
  OnDisable() {
    this.SetPerformanceVisible(false);
  }
  OnChangeTimeDilation(t) {
    var e = t * (this.Entity.GetComponent(133)?.CurrentTimeScale ?? 1);
    if (EffectSystem_1.EffectSystem.IsValid(this.Uei)) {
      EffectSystem_1.EffectSystem.SetTimeScale(this.Uei, e);
    }
    if (EffectSystem_1.EffectSystem.IsValid(this._nn)) {
      EffectSystem_1.EffectSystem.SetTimeScale(this._nn, e);
    }
    if (this.lnn?.size) {
      for (var [, i] of this.lnn) {
        if (EffectSystem_1.EffectSystem.IsValid(i)) {
          EffectSystem_1.EffectSystem.SetTimeScale(i, e);
        }
      }
    }
  }
  xnn() {
    this.qnn(true);
  }
  vnn() {
    this.qnn(false);
  }
  qnn(t) {
    var e = this.Gnn(this.nXr.场景交互物状态列表);
    if (e !== undefined) {
      if (e === this.nnn) {
        return;
      }
      this.nnn = e;
    } else {
      var e = -821437887;
      var i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e);
      if (e === this.nnn || this.nXr.场景交互物状态列表.Get(i) === undefined) {
        if ((0, RegisterComponent_1.isComponentInstance)(this.n$t, 214) && this.n$t.GetSceneInteractionLevelHandleId() === -1) {
          this.n$t.SetIsSceneInteractionLoadCompleted();
        }
        return;
      }
      this.nnn = e;
    }
    if ((0, RegisterComponent_1.isComponentInstance)(this.n$t, 214)) {
      let e = undefined;
      e = this.nnn === 1227933697 ? 20 : (i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(this.nnn), this.nXr.场景交互物状态列表.Get(i));
      if (t) {
        let t = false;
        if (this.nnn === -991879492) {
          t = true;
        }
        this.n$t.LoadSceneInteractionLevel(e, t);
      } else {
        this.n$t.SwitchToState(e, !this.dnn, this.dnn);
      }
    }
  }
  Unn() {
    if (this.inn) {
      if ((0, RegisterComponent_1.isComponentInstance)(this.n$t, 214) && this.rnn && this.rnn.size > 0) {
        for (var [, t] of this.rnn) {
          this.n$t?.EndSceneInteractionEffect(t);
          this.n$t?.PlaySceneInteractionEndEffect(t);
        }
        this.rnn?.clear();
      }
      for (const e of this.inn.GetTagIds()) {
        if (this.Snn(e)) {
          break;
        }
      }
    }
  }
  Ann() {
    if (this.inn) {
      for (const e of this.inn.GetTagIds()) {
        var t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e);
        if ((0, RegisterComponent_1.isComponentInstance)(this.n$t, 214) && t !== undefined) {
          this.n$t.PlayExtraEffect(t);
        }
      }
    }
  }
  Mnn(t, e) {
    for (const s of e) {
      var i;
      if (this.rnn.has(s) && (i = this.rnn.get(s), this.rnn.delete(s), (0, RegisterComponent_1.isComponentInstance)(this.n$t, 214)) && i !== undefined) {
        this.n$t.EndSceneInteractionEffect(i);
        this.n$t.PlaySceneInteractionEndEffect(i);
      }
    }
    for (const h of t) {
      this.Snn(h);
    }
  }
  Enn(t, e) {
    for (const h of e) {
      var i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(h);
      if ((0, RegisterComponent_1.isComponentInstance)(this.n$t, 214) && i !== undefined) {
        this.n$t.StopExtraEffect(i);
      }
    }
    for (const n of t) {
      var s = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(n);
      if ((0, RegisterComponent_1.isComponentInstance)(this.n$t, 214) && s !== undefined) {
        this.n$t.PlayExtraEffect(s, false);
      }
    }
  }
  LoadAndChangeStaticMesh() {
    if (!this.n$t.SkeletalMesh) {
      var t = this.Gnn(this.nXr.静态网格体列表);
      if (t !== undefined) {
        if (t === this.snn) {
          return;
        }
        this.snn = t;
      } else {
        var t = -821437887;
        var e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t);
        if (t === this.snn || this.nXr.静态网格体列表.Get(e) === undefined) {
          return;
        }
        this.snn = t;
      }
      if ((0, RegisterComponent_1.isComponentInstance)(this.n$t, 214)) {
        e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(this.snn);
        this.n$t.LoadAndChangeStaticMesh(e);
      }
    }
  }
  eve() {
    var t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-1133639932);
    var t = this.nXr.常驻特效列表.Get(t);
    if (t && (this.Uei = this.Inn(t.AssetPathName?.toString(), "[PerformanceComponent.InitCommonEffect]", this.Pnn), EffectSystem_1.EffectSystem.IsValid(this.Uei))) {
      EffectSystem_1.EffectSystem.GetEffectActor(this.Uei)?.K2_AttachToActor(this.n$t.Owner, undefined, 2, 1, 1, false);
      t = this.n$t.CreatureData.GetVisible();
      this.Tnn(this.Uei, t);
    }
  }
  gnn() {
    var t;
    return !!this.Uei && (t = this.Gnn(this.nXr.通用特效常驻参数)) !== this.ann && (this.ann = t, !!this.ann);
  }
  wnn() {
    var t;
    if (this.Uei && (t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(this.ann), t = this.nXr.通用特效常驻参数.Get(t))) {
      this.Nnn(t);
    }
  }
  fnn() {
    var t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(this.ann);
    var t = this.nXr.通用特效变化参数.Get(t);
    if (t) {
      if (t.ManualLifeTime > 0) {
        this.cnn ||= t => {
          this.wnn();
        };
        this.bnn();
        this.mnn = TimerSystem_1.TimerSystem.Loop(this.cnn, TimeUtil_1.TimeUtil.SetTimeMillisecond(t.ManualLifeTime), 1, 0);
      }
      this.Nnn(t);
    } else {
      this.wnn();
    }
  }
  Bnn() {
    if (this.inn) {
      for (const t of this.inn.GetTagIds()) {
        this.ynn(t);
      }
    }
  }
  pnn(t, e) {
    for (const n of e) {
      var i;
      if (this.lnn.has(n)) {
        i = this.lnn.get(n);
        this.lnn.delete(n);
        EffectSystem_1.EffectSystem.StopEffectById(i, "[PerformanceComponent.ChangeOwnEffects]", true);
      }
    }
    let s = undefined;
    for (const o of t) {
      var h = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(o);
      var h = this.nXr.变化特效列表.Get(h);
      if (h) {
        s = this.Inn(h.AssetPathName?.toString(), "[PerformanceComponent.ChangeOwnEffects]", undefined);
      } else {
        this.ynn(o);
      }
    }
    if (s) {
      this.unn ||= t => {
        this._nn = 0;
        this.Bnn();
      };
      EffectSystem_1.EffectSystem.AddFinishCallback(this._nn, this.unn);
      this._nn = s;
    }
  }
  Gnn(t) {
    if (this.inn.HasTag(PerformanceComponent_1.Onn)) {
      return PerformanceComponent_1.Onn;
    }
    this.Lnn = undefined;
    this.Dnn = t;
    if (this.inn) {
      for (const i of this.inn.GetTagIds()) {
        if (i !== PerformanceComponent_1.Onn) {
          var e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(i);
          if (this.Dnn.Get(e) !== undefined) {
            this.Lnn = i;
            break;
          }
        }
      }
    }
    this.Dnn = undefined;
    return this.Lnn;
  }
  Inn(t, e, i) {
    if (t && !(t.length <= 0) && this.n$t) {
      return EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.n$t.ActorTransform, t, e, new EffectContext_1.EffectContext(this.Entity.Id), 3, undefined, i);
    } else {
      return 0;
    }
  }
  Nnn(t) {
    EffectSystem_1.EffectSystem.SetEffectDataByNiagaraParam(this.Uei, t, true);
  }
  ApplyNiagaraParameters(t, e) {
    return !!this.Uei && !!this.hnn && !(e instanceof UE.Vector ? this.hnn.SetNiagaraVariableVec3(t, e) : this.hnn.SetNiagaraVariableFloat(t, e), 0);
  }
  bnn() {
    if (TimerSystem_1.TimerSystem.Has(this.mnn)) {
      TimerSystem_1.TimerSystem.Remove(this.mnn);
    }
  }
  SetPerformanceVisible(t) {
    this.Tnn(this.Uei, t);
    for (var [, e] of this.lnn ?? []) {
      this.Tnn(e, t);
    }
  }
  Tnn(t, e) {
    if (EffectSystem_1.EffectSystem.IsValid(t)) {
      EffectSystem_1.EffectSystem.SetEffectHidden(t, !e, "PerformanceComponent");
      EffectSystem_1.EffectSystem.SetTimeScale(t, e ? 1 : 0);
    }
  }
};
PerformanceComponent.Onn = 1227933697;
PerformanceComponent = PerformanceComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(115)], PerformanceComponent);
exports.PerformanceComponent = PerformanceComponent; //# sourceMappingURL=PerformanceComponent.js.map