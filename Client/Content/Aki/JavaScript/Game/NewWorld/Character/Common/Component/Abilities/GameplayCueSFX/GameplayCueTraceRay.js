"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueTraceRay = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../../../../Core/Define/QueryTypeDefine");
const Quat_1 = require("../../../../../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon");
const EffectSystem_1 = require("../../../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../../../GlobalData");
const GameplayCueEffectCommonItem_1 = require("./CommonItem/GameplayCueEffectCommonItem");
const GameplayCueEffect_1 = require("./GameplayCueEffect");
const DEFAULT_TRACE_LENGTH = 1000;
const DEFAULT_TRACE_RADIUS = 10;
const PROFILE_GAMEPLAY_CUE_TRACE_RAY = "ProfileGameplayCueTraceRay";
class GameplayCueTraceRay extends GameplayCueEffect_1.GameplayCueEffect {
  constructor() {
    super(...arguments);
    this.mWi = undefined;
    this.XKl = 0;
    this.YKl = DEFAULT_TRACE_LENGTH;
    this.zKl = DEFAULT_TRACE_RADIUS;
    this.JKl = Vector_1.Vector.Create();
    this.ZKl = Vector_1.Vector.Create();
    this.e$l = Vector_1.Vector.Create();
    this.t$l = Transform_1.Transform.Create();
    this.i$l = Quat_1.Quat.Create();
    this.ege = undefined;
    this.r$l = undefined;
    this.o$l = false;
    this.n$l = Vector_1.Vector.Create();
    this.s$l = undefined;
    this.a$l = 0;
    this.h$l = Vector_1.Vector.Create(1, 1, 1);
    this.l$l = 0;
    this._$l = 0;
    this.c$l = undefined;
    this.vq = true;
    this.u$l = (t, e, i, s) => {
      if (this.vq && !(i < this.l$l) && (i !== this.l$l || !(s < this._$l))) {
        this.l$l = i;
        this._$l = s;
        var h = e.HitResult?.GetHitCount();
        if (h) {
          for (let t = this.s$l.length = 0; t < h; t++) {
            this.s$l.push({
              Distance: e.HitResult.DistanceArray.Get(t),
              Index: t
            });
          }
          if (this.s$l.length > 0) {
            this.s$l.sort((t, e) => t.Distance - e.Distance);
            if (this.a$l === 0) {
              this.h$l.X = this.s$l[0].Distance / this.YKl;
            } else if (this.a$l === 1) {
              this.h$l.Y = this.s$l[0].Distance / this.YKl;
            } else {
              this.h$l.Z = this.s$l[0].Distance / this.YKl;
            }
            this.ege?.D_SetActorScale3D(this.h$l.ToUeVector());
            const s = this.s$l[0].Index;
            this.n$l.X = e.HitResult?.LocationX_Array.Get(s) ?? this.n$l.X;
            this.n$l.Y = e.HitResult?.LocationY_Array.Get(s) ?? this.n$l.Y;
            this.n$l.Z = e.HitResult?.LocationZ_Array.Get(s) ?? this.n$l.Z;
            this.r$l?.Refresh(true, this.n$l, this.t$l.GetRotation().Rotator());
          }
        } else {
          this.r$l?.Refresh(false);
        }
      }
    };
  }
  OnInit() {
    super.OnInit();
    this.d$l();
    this.s$l = [];
  }
  OnCreate() {
    var t;
    super.OnCreate();
    if (this.TargetSocket) {
      this.o$l = this.TargetSocket.toString() !== "None";
    }
    this.ege = EffectSystem_1.EffectSystem.GetEffectActor(this.EffectViewHandle);
    if (this.CueConfig.Resources.length > 0) {
      t = Vector_1.Vector.Create();
      this.r$l = GameplayCueEffectCommonItem_1.GameplayCueEffectCommonItem.Spawn(this.ActorInternal, t.ToUeVector(), this.CueConfig.Resources);
    }
  }
  OnDestroy() {
    super.OnDestroy();
    this.mWi?.Dispose();
    this.mWi = undefined;
    this.ege = undefined;
    this.r$l?.Destroy();
    this.r$l = undefined;
    if (this.c$l) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.u$l);
      this.c$l = undefined;
    }
  }
  OnEnable() {
    super.OnEnable();
    this.vq = true;
    this.r$l?.SetVisible(true);
  }
  OnDisable() {
    super.OnDisable();
    this.vq = false;
    this.r$l?.SetVisible(false);
  }
  OnTick(t) {
    super.OnTick(t);
    if (this.vq) {
      this.m$l();
    }
  }
  d$l() {
    var e = this.CueConfig.Parameters;
    if (e.length > 0) {
      this.XKl = Math.min(Number(e[0]), 1);
    }
    var i = [];
    if (e.length > 1) {
      for (let t = 0; t < e[1].length; t++) {
        if (e[1][t] === "1") {
          if (t === 0) {
            i.push(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
            i.push(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic);
          } else if (t === 1) {
            i.push(QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer);
          } else if (t === 2) {
            i.push(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
          }
        }
      }
    }
    if (e.length > 2) {
      this.YKl = Number(e[2]);
    }
    if (e.length > 3) {
      this.a$l = Math.min(Number(e[3]), 2);
    }
    if (e.length > 4 && this.XKl === 1) {
      this.zKl = Number(e[4]);
    }
    let t = undefined;
    if (this.XKl === 1) {
      (t = UE.NewObject(UE.TraceSphereElement.StaticClass())).Radius = this.zKl;
    } else {
      t = UE.NewObject(UE.TraceLineElement.StaticClass());
    }
    t.WorldContextObject = GlobalData_1.GlobalData.World;
    t.bIsSingle = true;
    t.bTraceComplex = false;
    t.bIgnoreSelf = true;
    t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
    for (const s of i) {
      t.AddObjectTypeQuery(s);
    }
    this.mWi = t;
    this.c$l = (0, puerts_1.toManualReleaseDelegate)(this.u$l);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[GameplayCueTraceRay]射线特效参数初始化", ["TraceType", this.XKl], ["Parameters", this.CueConfig.Parameters]);
    }
  }
  m$l() {
    if (this.mWi) {
      var i = this.ActorInternal;
      var s = this.JKl;
      var h = this.ZKl;
      let t = undefined;
      t = this.o$l ? i.Mesh.D_GetSocketTransform(this.TargetSocket) : i.GetTransform();
      this.t$l.FromUeTransform(t);
      s.FromUeVector(t.GetLocation());
      this.i$l.FromUeQuat(t.GetRotation());
      this.i$l.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.e$l);
      h.FromUeVector(this.e$l);
      h.MultiplyEqual(this.YKl);
      h.AdditionEqual(s);
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, s);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, h);
      let e = undefined;
      if (e = this.XKl === 1 ? TraceElementCommon_1.TraceElementCommon.AsyncSphereTrace(this.mWi, PROFILE_GAMEPLAY_CUE_TRACE_RAY, this.c$l) : TraceElementCommon_1.TraceElementCommon.AsyncLineTrace(this.mWi, PROFILE_GAMEPLAY_CUE_TRACE_RAY, this.c$l)) {
        this.l$l = e.Frame;
        this._$l = e.Index;
      }
    }
  }
}
exports.GameplayCueTraceRay = GameplayCueTraceRay;
//# sourceMappingURL=GameplayCueTraceRay.js.map