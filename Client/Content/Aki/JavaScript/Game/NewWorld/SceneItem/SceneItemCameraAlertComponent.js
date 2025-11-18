"use strict";

var SceneItemCameraAlertComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var r = arguments.length;
  var h = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (n = t[o]) {
        h = (r < 3 ? n(h) : r > 3 ? n(e, i, h) : n(e, i)) || h;
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
exports.SceneItemCameraAlertComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const LevelGeneralNetworks_1 = require("../../LevelGamePlay/LevelGeneralNetworks");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController");
const PROFILE_KEY = "SceneItemCameraAlertComponent_LineTrace";
const INTERACTION_BODY = "Body";
let SceneItemCameraAlertComponent = SceneItemCameraAlertComponent_1 = class SceneItemCameraAlertComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.vtn = undefined;
    this.Hte = undefined;
    this.mBe = undefined;
    this.zqa = Vector_1.Vector.Create();
    this.iOl = Vector_1.Vector.Create();
    this.Zqa = Vector_1.Vector.Create();
    this.e2a = 0;
    this.t2a = 0;
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.i2a = false;
    this.r2a = false;
    this.o2a = false;
    this.uoe = undefined;
    this.JGa = false;
    this.wJl = undefined;
    this.KHr = t => {
      SceneItemCameraAlertComponent_1.l2a.Start();
      this.a2a();
      SceneItemCameraAlertComponent_1.l2a.Stop();
    };
    this.Rnn = () => {
      this.r2a = true;
      this.n2a();
      this.s2a();
      var t = this.Hte.GetActorInSceneInteraction(INTERACTION_BODY) ?? this.Hte?.GetInteractionMainActor();
      this.vtn?.SetRangeActorParent(t);
      if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
      }
    };
    this.g_n = () => {
      this.s2a();
      if (!this.UJl()) {
        this.o2a = false;
      }
    };
    this.H0n = t => {
      this.i2a = t;
      if (this.r2a) {
        this.s2a();
        if (t) {
          this.a2a();
        } else {
          this.h2a(false);
        }
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemCameraAlertComponent_1)[0];
    if (t.AvailableStates) {
      this.wJl = new Set();
      for (const i of t.AvailableStates) {
        var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i);
        if (e === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 39, "[CameraAlertComp] 探测状态Tag有误", ["TagName", i], ["EntityId", this.Entity.Id]);
          }
          return false;
        }
        this.wJl.add(e);
      }
    }
    return true;
  }
  OnStart() {
    var t;
    this.vtn = this.Entity.GetComponent(86);
    this.mBe = this.Entity.GetComponent(137);
    this.Hte = this.Entity.GetComponent(206);
    if (this.vtn && this.Hte) {
      if (t = this.vtn.GetShapeConfig()) {
        if (t.Type !== "Cone") {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 57, "[CameraAlert] 组件初始化类型错误", ["type", t.Type]);
          }
          return false;
        } else {
          this.t2a = t.Radius;
          this.e2a = t.Height;
          this.Zqa.Set(t.Center.X ?? 0, t.Center.Y ?? 0, t.Center.Z ?? 0);
          if (this.t2a < 0 || this.e2a < 0) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneItem", 57, "[CameraAlert] 组件初始化参数错误", ["ConeRadius", this.t2a], ["ConeHeight", this.e2a]);
            }
            return false;
          } else {
            this.Rmt();
            if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.H0n)) {
              EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.H0n);
            }
            return true;
          }
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 57, "[CameraAlert] 组件初始化数据为空");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 57, "[CameraAlertComp] 组件缺失", ["RangeComponent", !!this.vtn], ["StateComp", !!this.mBe], ["ActorComp", !!this.Hte]);
      }
      return false;
    }
  }
  OnActivate() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    if (this.Hte.GetIsSceneInteractionLoadCompleted()) {
      this.Rnn();
    } else {
      this.s2a();
    }
  }
  Rmt() {
    this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.uoe.WorldContextObject = GlobalData_1.GlobalData.World;
    this.uoe.bIgnoreSelf = true;
    this.uoe.bIsSingle = true;
    this.uoe.ActorsToIgnore.Empty();
    this.uoe.ActorsToIgnore.Add(this.vtn.GetRangeActor());
    this.uoe.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
  }
  kmn() {
    return this.i2a && this.r2a && !this.mBe.IsInState(0) && !this.mBe.IsInState(3) && this.UJl();
  }
  UJl() {
    return !this.wJl || this.wJl.has(this.mBe.StateTagId);
  }
  _2a(t) {
    return !!MathUtils_1.MathUtils.IsLocationInsideCone(this.zqa, this.iOl, this.e2a, this.t2a, this.cz) && !this.uye(t, this.zqa);
  }
  uye(t, e) {
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, e);
    return TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY);
  }
  u2a() {
    var t = this.Hte.GetActorInSceneInteraction(INTERACTION_BODY) ?? this.Hte?.GetInteractionMainActor();
    var e = this.Entity.GetComponent(1);
    if (t) {
      this.iOl.DeepCopy(t.D_GetActorUpVector());
    } else {
      this.iOl.DeepCopy(e.ActorUpProxy);
    }
    this.iOl.MultiplyEqual(-1);
    this.iOl.Multiply(-this.e2a / 2, this.cz);
    if (t) {
      this.fz.FromUeVector(t.D_GetTransform().TransformPositionNoScale(this.Zqa.ToUeVector()));
    } else {
      e.ActorQuatProxy.RotateVector(this.Zqa, this.fz);
      e.ActorLocationProxy.Addition(this.fz, this.fz);
    }
    this.fz.Addition(this.cz, this.cz);
    this.zqa.DeepCopy(this.cz);
  }
  a2a() {
    var t;
    var e;
    if (this.kmn()) {
      if ((t = Global_1.Global.BaseCharacter?.CharacterActorComponent) && (e = this.Hte.CreatureData.GetEntityOnlineInteractType(), LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(e, false)) && (this.u2a(), t.ActorUpProxy.Multiply(t.ScaledHalfHeight, this.fz), this.cz.DeepCopy(t.ActorLocationProxy), this.cz.SubtractionEqual(this.fz), this._2a(this.cz) || (this.cz.AdditionEqual(this.fz), this._2a(this.cz)) || (this.cz.AdditionEqual(this.fz), this._2a(this.cz)))) {
        this.h2a(true);
      } else {
        this.h2a(false);
      }
    }
  }
  n2a() {
    var e = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(this.Hte.GetSceneInteractionLevelHandleId());
    for (let t = 0; t < e?.Num(); t++) {
      this.uoe.ActorsToIgnore.Add(e.Get(t));
    }
  }
  h2a(t) {
    var e;
    if (this.UJl() && this.o2a !== t) {
      this.o2a = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneItemCameraAlertStateChange, this.o2a);
      e = this.Entity.GetComponent(0).GetCreatureDataId();
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityCameraAlertStateChange(e, t);
    }
  }
  s2a() {
    if (this.kmn() && !this.JGa) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterTick(this, this.KHr);
      this.JGa = true;
    } else if (this.JGa) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
      this.JGa = false;
    }
  }
  IsAlertState() {
    return this.o2a;
  }
  OnEnd() {
    this.o2a = false;
    this.i2a = false;
    this.r2a = false;
    if (this.JGa) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
      this.JGa = false;
    }
    if (this.uoe) {
      this.uoe.Dispose();
      this.uoe = undefined;
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.H0n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.H0n);
    }
    return true;
  }
};
SceneItemCameraAlertComponent.l2a = Stats_1.Stat.Create("SceneItemCameraAlertComponentStat");
SceneItemCameraAlertComponent = SceneItemCameraAlertComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(221)], SceneItemCameraAlertComponent);
exports.SceneItemCameraAlertComponent = SceneItemCameraAlertComponent; //# sourceMappingURL=SceneItemCameraAlertComponent.js.map