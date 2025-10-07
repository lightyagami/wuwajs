"use strict";

var SceneItemRotatorComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var n = arguments.length;
  var h = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, o);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (s = t[r]) {
        h = (n < 3 ? s(h) : n > 3 ? s(e, i, h) : s(e, i)) || h;
      }
    }
  }
  if (n > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemRotatorComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
let SceneItemRotatorComponent = SceneItemRotatorComponent_1 = class SceneItemRotatorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.Hte = undefined;
    this.mBe = undefined;
    this.Lie = undefined;
    this.B4u = undefined;
    this.wMn = undefined;
    this.BMn = undefined;
    this.bMn = undefined;
    this.qMn = undefined;
    this.GMn = undefined;
    this.NMn = false;
    this.OMn = false;
    this.kMn = false;
    this.W1n = 0;
    this.FMn = undefined;
    this.EQl = 0;
    this.H7u = false;
    this.VMn = (t, e) => {
      this.GMn.delete(e);
      if (t) {
        this.bMn.set(e, t);
        if (!(this.GMn.size > 0)) {
          for (var [, i] of this.bMn) {
            if (!i) {
              return;
            }
          }
          this.NMn = true;
          if (this.OMn) {
            this.HMn();
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemRotatorComponent] 曲线加载失败，请检查实体配置", ["CurvePath", e], ["PbDataId", this.EIe?.GetPbDataId()]);
      }
    };
    this.jMn = () => {
      var t = this.Hte.GetInteractionMainActor();
      if (t) {
        for (var [e] of this.qMn ?? []) {
          var i = e === "" ? t : this.Hte?.GetActorInSceneInteraction(e);
          if (!i) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneItem", 39, "[SceneItemRotatorComponent] 找不到对应的旋转Actor，请检查实体配置和预制体", ["ActorKey", e], ["PbDataId", this.EIe?.GetPbDataId()]);
            }
            return;
          }
          this.qMn.set(e, i);
        }
        if (!this.FMn) {
          this.FMn = new Map();
          for (var [o, s] of this.qMn ?? []) {
            this.FMn.set(o, Rotator_1.Rotator.Create(s.RootComponent.D_GetRelativeTransform().Rotator()));
          }
        }
        this.OMn = true;
        if (this.NMn) {
          this.HMn();
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemRotatorComponent] 找不到对应的场景交互物MainActor，请检查实体配置和预制体", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
    };
    this.g_n = (t, e) => {
      if (this.kMn) {
        this.WMn(t, false);
      }
    };
    this.Kbu = () => {
      this.wMn?.OnRotateStopCallback.Remove(this.Kbu);
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemRotateStopped);
    };
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemRotatorComponent_1)[0];
    this.EIe = this.Entity.GetComponent(0);
    this.BMn = new Map();
    for (const s of t.Config) {
      var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s.State);
      if (!e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 39, `[SceneItemRotatorComponent] 配置出错，找不到${s.State}对应的状态Id`, ["PbDataId", this.EIe?.GetPbDataId()]);
        }
        return false;
      }
      var i = s.RotationConfig && s.RotationConfig.length > 0 ? s.RotationConfig : undefined;
      var o = s.KeyRotatorConfig && s.KeyRotatorConfig.length > 0 ? s.KeyRotatorConfig : undefined;
      if (i && o) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SceneItem", 39, "[SceneItemRotatorComponent] 该状态同时存在两种旋转配置列表，配置有误，跳过该状态的配置", ["PbDataId", this.EIe?.GetPbDataId()], ["State", s.State]);
        }
      } else if (i || o) {
        this.BMn.set(e, s);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "[SceneItemRotatorComponent] 该状态的旋转配置列表为空，跳过该状态的配置", ["PbDataId", this.EIe?.GetPbDataId()], ["State", s.State]);
      }
    }
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(203);
    if (!this.Hte) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemRotatorComponent] 实体缺少SceneItemActorComponent", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
      return false;
    }
    if (!this.Hte.Owner) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemRotatorComponent] 实体的SceneItemActorComponent.Owner不可用", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
      return false;
    }
    if (this.Entity.GameBudgetConfig.GroupName.op_Equality(FNameUtil_1.FNameUtil.GetDynamicFName("MoveSceneItemEntity"))) {
      this.H7u = true;
    }
    this.wMn = this.Hte.Owner.GetComponentByClass(UE.KuroSceneItemMoveComponent.StaticClass());
    if (!this.wMn?.IsValid()) {
      this.wMn = this.Hte.Owner.AddComponentByClass(UE.KuroSceneItemMoveComponent.StaticClass(), false, new UE.Transform(), false);
      if (!this.wMn?.IsValid()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 39, "[SceneItemRotatorComponent] 实体Actor缺少KuroSceneItemMoveComponent，且动态创建失败", ["PbDataId", this.EIe?.GetPbDataId()]);
        }
        return false;
      }
      this.wMn.Kuro_SetGravityDirect(this.Hte.ActorGravityDirectProxy.ToUeVectorOld());
      this.wMn.SetTickingMoveEnable(false);
      if (this.H7u) {
        this.wMn.SetKuroOnlyTickOutside(true);
      }
    }
    this.mBe = this.Entity.GetComponent(134);
    if (this.mBe) {
      this.Lie = this.Entity.GetComponent(197);
      if (this.Lie) {
        this.B4u = this.Entity.GetComponent(299);
        return !!this.B4u || (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "[SceneItemRotatorComponent] 实体缺少UeSceneItemMoveTickManagerComponent", ["PbDataId", this.EIe?.GetPbDataId()]), false);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 39, "[SceneItemRotatorComponent] 实体缺少LevelTagComponent", ["PbDataId", this.EIe?.GetPbDataId()]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemRotatorComponent] 实体缺少SceneItemStateComponent", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
      return false;
    }
  }
  OnActivate() {
    this.NMn = false;
    this.OMn = false;
    this.kMn = false;
    this.KMn();
    this.QMn();
    if (!this.kMn && this.NMn && this.OMn) {
      this.HMn();
    }
    return true;
  }
  OnTick(t) {
    if (this.H7u) {
      this.B4u?.TickMovement(t);
    }
  }
  OnDisable() {
    this.OMn = false;
    this.kMn = false;
    this.W1n = 0;
    this.EQl = 0;
    if (this.wMn?.IsRotating()) {
      this.wMn.StopRotate(0, true);
    }
  }
  OnEnable() {
    if (!this.OMn) {
      this.QMn();
    }
    if (!this.kMn && this.NMn && this.OMn) {
      this.HMn();
    }
  }
  KMn() {
    this.NMn = true;
    for (var [, t] of this.BMn) {
      var e;
      var i = t.RotationConfig && t.RotationConfig.length > 0 ? t.RotationConfig : undefined;
      var t = t.KeyRotatorConfig && t.KeyRotatorConfig.length > 0 ? t.KeyRotatorConfig : undefined;
      var i = i ?? t;
      if (i) {
        for (const n of i) {
          if (n.Curve && n.Curve !== "") {
            this.bMn ||= new Map();
            if (!this.bMn.has(n.Curve)) {
              if (e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(n.Curve, UE.CurveFloat)) {
                this.bMn.set(n.Curve, e);
              } else {
                this.bMn.set(n.Curve, undefined);
                this.NMn = false;
              }
            }
          }
        }
      }
    }
    if (!this.NMn) {
      this.GMn ||= new Map();
      for (var [o, s] of this.bMn) {
        if (!s) {
          s = ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.CurveFloat, this.VMn);
          this.GMn.set(o, s);
        }
      }
    }
  }
  QMn() {
    this.OMn = false;
    for (var [, t] of this.BMn) {
      t = t.RotatePoint ?? "";
      this.qMn ||= new Map();
      if (!this.qMn.has(t)) {
        this.qMn.set(t, undefined);
      }
    }
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.jMn)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.jMn);
    }
    if (this.Hte.GetIsSceneInteractionLoadCompleted()) {
      this.jMn();
    }
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.jMn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.jMn);
    }
    if (this.GMn) {
      for (var [, t] of this.GMn) {
        if (t) {
          ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t);
        }
      }
    }
    return true;
  }
  HMn() {
    if (!this.kMn && this.NMn && this.OMn) {
      let t = 0;
      for (var [e] of this.BMn) {
        if (this.Lie.HasTag(e)) {
          t = e;
          break;
        }
      }
      if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
      }
      this.kMn = true;
      this.WMn(t, true);
    }
  }
  WMn(n, t) {
    if (this.kMn && (t || this.W1n !== n)) {
      var t = this.BMn.get(this.W1n);
      var e = this.BMn.get(n);
      if (t?.KeepLastRotation && !e && this.wMn.IsRotating()) {
        this.EQl = this.W1n;
        this.W1n = n;
        this.wMn.SetTickingRotateEnable(false);
      } else if (!e?.KeepLastRotation || n !== this.EQl || t || this.wMn.IsRotating()) {
        e = !!n && this.BMn.has(n);
        if (this.wMn.IsRotating()) {
          this.wMn.StopRotate(0, !e);
        }
        this.W1n = n;
        if (e && !this.wMn.IsRotating()) {
          t = this.BMn.get(n);
          e = t.RotatePoint ? this.qMn.get(t.RotatePoint) : this.Hte.GetInteractionMainActor();
          if (this.wMn.InitRotationData(e, t.IsLoop)) {
            var h = this.FMn.get(t.RotatePoint ?? "");
            let s = Rotator_1.Rotator.Create(e.RootComponent.D_GetRelativeTransform().Rotator());
            var r = t.RotationConfig && t.RotationConfig.length > 0 ? t.RotationConfig : undefined;
            var a = t.KeyRotatorConfig && t.KeyRotatorConfig.length > 0 ? t.KeyRotatorConfig : undefined;
            var m = r ?? a;
            if (m) {
              for (let o = 0; o < m.length; o++) {
                let t = m[o];
                var _;
                var v = Rotator_1.Rotator.Create();
                if (r) {
                  t = r[o];
                  c = Vector_1.Vector.Create(t.Axis.X, t.Axis.Y, t.Axis.Z);
                  v.FromUeRotator(UE.KismetMathLibrary.D_RotatorFromAxisAndAngle(c.ToUeVector(), t.Angle));
                } else if (a) {
                  t = a[o];
                  v.Set(t.KeyRotator.Y ?? 0, t.KeyRotator.Z ?? 0, t.KeyRotator.X ?? 0);
                }
                var c = t.Curve ? this.bMn.get(t.Curve) : undefined;
                let e = undefined;
                let i = undefined;
                if (t.Type === "Relative") {
                  e = Rotator_1.Rotator.Create(s);
                  _ = v;
                  i = Rotator_1.Rotator.Create(e).AdditionEqual(_);
                  s = i;
                } else if (t.Type === "Absolute") {
                  e = Rotator_1.Rotator.Create(s);
                  i = Rotator_1.Rotator.Create(v).AdditionEqual(h);
                  s = i;
                }
                if (!e || !i || !this.wMn.AddRotationStep(e.ToUeRotator(), i.ToUeRotator(), t.Time, t.Cd ?? 0, c)) {
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("SceneItem", 39, "[SceneItemRotatorComponent] 添加旋转步骤失败", ["StateId", n], ["StepIndex", o], ["PbDataId", this.EIe?.GetPbDataId()]);
                  }
                }
              }
              if (this.wMn.StartRotate()) {
                this.wMn.OnRotateStopCallback.Add(this.Kbu);
              }
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 39, "[SceneItemRotatorComponent] 初始化旋转数据失败", ["StateId", n], ["PbDataId", this.EIe?.GetPbDataId()]);
          }
        }
      } else {
        this.EQl = 0;
        this.W1n = n;
        this.wMn.SetTickingRotateEnable(true);
      }
    }
  }
};
SceneItemRotatorComponent = SceneItemRotatorComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(168)], SceneItemRotatorComponent);
exports.SceneItemRotatorComponent = SceneItemRotatorComponent; //# sourceMappingURL=SceneItemRotatorComponent.js.map