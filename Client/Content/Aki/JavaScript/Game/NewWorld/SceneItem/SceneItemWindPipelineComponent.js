"use strict";

var SceneItemWindPipelineComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, s) {
  var n;
  var r = arguments.length;
  var o = r < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(e, t, i, s);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (n = e[h]) {
        o = (r < 3 ? n(o) : r > 3 ? n(t, i, o) : n(t, i)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(t, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemWindPipelineComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectParameterNiagara_1 = require("../../Effect/EffectParameter/EffectParameterNiagara");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
const GameSplineUtils_1 = require("../../LevelGamePlay/Common/GameSplineUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const BASE_DIAMETER = 2000;
let SceneItemWindPipelineComponent = SceneItemWindPipelineComponent_1 = class SceneItemWindPipelineComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Hte = undefined;
    this.SplineData = undefined;
    this.Zsh = undefined;
    this.eah = undefined;
    this.zie = undefined;
    this.Ygl = [];
    this.iah = [];
    this.zgl = [];
    this.rah = undefined;
    this.oah = undefined;
    this.Jgl = undefined;
    this.TDe = undefined;
    this.Zgl = 0;
    this.e0l = 0;
    this.Etn = e => {
      if (e) {
        ModelManager_1.ModelManager.GameSplineModel.CurWindPipelineResistance = this.SplineData.Resistance;
        ModelManager_1.ModelManager.GameSplineModel.CurWindPipelineSpeedLimit = this.SplineData.SpeedLimit;
      }
    };
    this.sah = () => {
      var e = this.Ygl[this.Zgl];
      var t = this.t0l(this.Zgl) ? this.SplineData.TailCircleEffect : this.SplineData.MiddleCircleEffect;
      if (!StringUtils_1.StringUtils.IsEmpty(t)) {
        e = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, e.ToUeTransform(), t, "[WindPipeline] GenerateEffectsAlongSpline");
        this.iah.push(e);
      }
      this.Zgl++;
      if (this.Zgl >= this.Ygl.length) {
        TimerSystem_1.TimerSystem.Remove(this.oah);
      }
    };
    this.i0l = (e, t) => {
      if (t) {
        if (e === -3775711) {
          if (!StringUtils_1.StringUtils.IsEmpty(this.SplineData?.MiddleCircleOverlyingEffect)) {
            this.e0l = 0;
            this.Jgl = TimerSystem_1.TimerSystem.Forever(this.r0l, 100);
          }
        } else {
          if (this.Jgl !== undefined) {
            TimerSystem_1.TimerSystem.Remove(this.Jgl);
            this.Jgl = undefined;
          }
          this.zgl.forEach(e => {
            EffectSystem_1.EffectSystem.StopEffectById(e, "[WindPipeline] OnEnd", false);
          });
          this.zgl.length = 0;
        }
      }
    };
    this.r0l = () => {
      var e = this.Ygl[this.e0l];
      var e = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, e.ToUeTransform(), this.SplineData?.MiddleCircleOverlyingEffect, "[WindPipeline] GenerateEffectsAlongSpline");
      this.zgl.push(e);
      this.e0l++;
      if (this.e0l >= this.Ygl.length) {
        TimerSystem_1.TimerSystem.Remove(this.Jgl);
      }
    };
  }
  OnInitData(e) {
    e = e.GetParam(SceneItemWindPipelineComponent_1)[0];
    this.Lo = e;
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(214);
    var e = this.Hte.CreatureData.GetPbEntityInitData();
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[SceneItemWindPipelineComponent]找不到entityData", ["PbDataId", this.Hte.CreatureData.GetPbDataId()]);
      }
      return false;
    } else if ((e = (0, IComponent_1.getComponent)(e.ComponentsData, "SplineComponent")) === undefined || e.Option.Type !== IComponent_1.ESplineType.AirPassage) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[SceneItemWindPipelineComponent]获取不到正确的Spline数据", ["PbDataId", this.Hte.CreatureData.GetPbDataId()]);
      }
      return false;
    } else {
      this.SplineData = e.Option;
      this.Zsh = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass());
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.i0l);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn);
      return true;
    }
  }
  OnActivate() {
    this.aah();
    this.hah();
    this.lah();
  }
  OnEnd() {
    this.cTa();
    this.An1();
    return true;
  }
  OnDisable(e) {
    this.cTa();
    this.An1();
  }
  cTa() {
    this.iah.forEach(e => {
      EffectSystem_1.EffectSystem.StopEffectById(e, "[WindPipeline] OnEnd", true);
    });
    if (void (this.iah.length = 0) !== this.rah) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rah, "[WindPipeline] OnEnd", true);
      this.rah = undefined;
    }
    if (this.oah !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.oah);
    }
    if (this.Jgl !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.Jgl);
      this.Jgl = undefined;
    }
    this.zgl.forEach(e => {
      EffectSystem_1.EffectSystem.StopEffectById(e, "[WindPipeline] OnEnd", false);
    });
    this.zgl.length = 0;
  }
  An1() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.i0l)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.i0l);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn);
    }
  }
  aah() {
    var e;
    if (this.Hte && this.SplineData && (e = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffectWithSplineData(this.Hte.ActorTransform, this.SplineData.Points, this.SplineData.MiddleLineEffect), this.zie = e?.SplineComp, this.rah = e?.EffectHandle, (e = new EffectParameterNiagara_1.EffectParameterNiagara()).UserParameterFloat = [], e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("BeamWidth"), this.SplineData.MiddleCircleRadius * 4]), this.rah)) {
      EffectSystem_1.EffectSystem.SetEffectParameterNiagara(this.rah, e);
    }
  }
  hah() {
    if (this.Hte && this.SplineData && this.zie && this.SplineData) {
      var e = this.zie.GetSplineLength();
      var t = Math.ceil(e / this.SplineData?.MiddleCircleSpace);
      var i = this.SplineData.MiddleCircleRadius * 2 / BASE_DIAMETER;
      for (let e = 0; e < t; e++) {
        var s = this.zie.D_GetLocationAtDistanceAlongSpline(e * this.SplineData?.MiddleCircleSpace, 1);
        var n = this.zie.D_GetTangentAtDistanceAlongSpline(e * this.SplineData?.MiddleCircleSpace, 1).Rotation();
        this.Ygl.push(Transform_1.Transform.Create(Rotator_1.Rotator.Create(n.Pitch, n.Yaw, n.Roll).Quaternion(), Vector_1.Vector.Create(s.X, s.Y, s.Z), Vector_1.Vector.Create(i, i, i)));
      }
      var r = this.zie.D_GetLocationAtDistanceAlongSpline(e, 1);
      var e = this.zie.D_GetTangentAtDistanceAlongSpline(e, 1).Rotation();
      this.Ygl.push(Transform_1.Transform.Create(Rotator_1.Rotator.Create(e.Pitch, e.Yaw, e.Roll).Quaternion(), Vector_1.Vector.Create(r.X, r.Y, r.Z), Vector_1.Vector.Create(i, i, i)));
      this.Zgl = 0;
      this.oah = TimerSystem_1.TimerSystem.Forever(this.sah, 100);
    }
  }
  lah() {
    var e;
    var t = this.Lo?.ActorRef;
    if (t !== undefined) {
      e = t.PathName.split(".")[1] + "." + t.PathName.split(".")[2];
      this.eah = this.Zsh.GetActor(FNameUtil_1.FNameUtil.GetDynamicFName(e));
      if (this.eah === undefined) {
        if (this.TDe === undefined) {
          this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
            this.lah();
          }, 500);
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 31, "[SceneItemWindPipelineComponent] CylinderTriggerActor不存在", ["ActorPath", t]);
        }
      } else if (this.TDe !== undefined) {
        TimerSystem_1.TimerSystem.Remove(this.TDe);
        this.TDe = undefined;
      }
    }
  }
  t0l(e) {
    return e === 0 || e === this.Ygl.length - 1;
  }
};
SceneItemWindPipelineComponent = SceneItemWindPipelineComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(288)], SceneItemWindPipelineComponent);
exports.SceneItemWindPipelineComponent = SceneItemWindPipelineComponent; //# sourceMappingURL=SceneItemWindPipelineComponent.js.map