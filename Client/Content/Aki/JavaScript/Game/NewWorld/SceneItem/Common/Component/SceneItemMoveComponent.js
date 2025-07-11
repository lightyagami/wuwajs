"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var o;
  var s = arguments.length;
  var h = s < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, n);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (o = e[a]) {
        h = (s < 3 ? o(h) : s > 3 ? o(t, i, h) : o(t, i)) || h;
      }
    }
  }
  if (s > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemMoveComponent = exports.SceneItemSplineMoveAtDynamicSpeedEditableParam = exports.SceneItemSplineMoveAtDynamicSpeedParam = exports.SceneItemSplineMoveAtConstantTimeParam = exports.MoveTarget = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const SceneItemSplineMoveTask_1 = require("../../../../LevelGamePlay/SplineMoveTask/SceneItemSplineMoveTask");
const SceneItemSplineMoveTaskDefine_1 = require("../../../../LevelGamePlay/SplineMoveTask/SceneItemSplineMoveTaskDefine");
const SceneItemSplineMoveTaskUtils_1 = require("../../../../LevelGamePlay/SplineMoveTask/SceneItemSplineMoveTaskUtils");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SCENEITEM_MOVE_DEBUG_KEY = "SCENEITEM_MOVE_DEBUG";
const OFFSET = 100;
class MoveTarget {
  constructor(e, t, i = 0, n = -1, o = -1) {
    this.TargetPosData = e;
    this.MoveTime = t;
    this.StayTime = i;
    this.MaxSpees = n;
    this.Acceleration = o;
  }
}
exports.MoveTarget = MoveTarget;
class SceneItemSplineMoveBaseParam {
  constructor(e) {
    this.Spline = e;
    this.IsCycle = false;
    this.IsKeepLookAt = false;
    this.StartDis = -1;
    this.EndDis = -1;
  }
}
class SceneItemSplineMoveAtConstantTimeParam extends SceneItemSplineMoveBaseParam {
  constructor() {
    super(...arguments);
    this.IsRepeat = false;
    this.TimeSec = 0;
    this.TimeDisCurve = undefined;
    this.StartTimeOffset = 0;
  }
}
exports.SceneItemSplineMoveAtConstantTimeParam = SceneItemSplineMoveAtConstantTimeParam;
class SceneItemSplineMoveAtDynamicSpeedParam extends SceneItemSplineMoveBaseParam {
  constructor() {
    super(...arguments);
    this.MaxMoveTimes = -1;
    this.InitSpeed = 0;
    this.TargetSpeed = 0;
    this.Acceleration = 0;
  }
}
exports.SceneItemSplineMoveAtDynamicSpeedParam = SceneItemSplineMoveAtDynamicSpeedParam;
class SceneItemSplineMoveAtDynamicSpeedEditableParam {
  constructor() {
    this.CurrentSpeed = undefined;
    this.TargetSpeed = undefined;
    this.Acceleration = undefined;
  }
  Clear() {
    this.CurrentSpeed = undefined;
    this.TargetSpeed = undefined;
    this.Acceleration = undefined;
  }
  Equals(e) {
    return !!e && this.CurrentSpeed === e.CurrentSpeed && this.TargetSpeed === e.TargetSpeed && this.Acceleration === e.Acceleration;
  }
}
exports.SceneItemSplineMoveAtDynamicSpeedEditableParam = SceneItemSplineMoveAtDynamicSpeedEditableParam;
let SceneItemMoveComponent = class SceneItemMoveComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.o4o = undefined;
    this.Nln = undefined;
    this.Oln = undefined;
    this.vFu = undefined;
    this.y$c = 0;
    this.kln = false;
    this.ZPl = false;
    this.Anr = Vector_1.Vector.Create();
    this.Fln = [];
    this._ii = 1;
    this._ae = Vector_1.Vector.Create();
    this.Due = Vector_1.Vector.Create();
    this.Vln = Vector_1.Vector.Create();
    this.Hln = -0;
    this.jln = false;
    this.Wln = false;
    this.h7c = false;
    this.S$c = e => {
      this.M$c(e);
    };
    this.Xd_ = [];
    this.E$c = () => {
      var e = this.y$c;
      this.y$c = 0;
      if (e === 1) {
        this.I$c();
      } else if (e === 2) {
        this.T$c();
      }
    };
    this.I$c = () => {
      this.ActorComp?.ResetAllCachedTime();
      this.b$c();
      this.R$c();
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemMoveStopped, this.Entity);
    };
    this.T$c = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 39, "SceneItemMoveComponent 样条移动停止", ["EntityId", this.Entity.Id]);
      }
      this.ActorComp?.ResetAllCachedTime();
      this.jln = false;
      this.b$c();
      this.R$c();
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemMoveStopped, this.Entity);
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStopped, this.Entity);
    };
    this.Sbu = [];
    this.ybu = [];
  }
  static get Dependencies() {
    return [202, 0];
  }
  get IsMovingPrepareCompleted() {
    return this.Wln;
  }
  get IsMoving() {
    if (Info_1.Info.EnableForceTick) {
      return this.Fln.length > 0 || this._ii === 0;
    } else if (this.IsMovingPrepareCompleted) {
      return this.o4o.IsMoving();
    } else {
      return this.Fln.length > 0;
    }
  }
  get ForceSyncing() {
    return this.ZPl;
  }
  set ForceSyncing(e) {
    this.ZPl = e;
    if (this.ZPl) {
      this.Nln?.SetEnableMovementSync(true, "SceneItemMoveComponent ForceSyncing");
    }
  }
  IsSplineMoving() {
    return !!this.IsMovingPrepareCompleted && this.o4o.GetSplineRunState() !== 0;
  }
  GetDistanceAloneSpline() {
    if (this.IsMovingPrepareCompleted) {
      return this.o4o.GetDistanceAlongSpline();
    } else {
      return 0;
    }
  }
  OnStart() {
    var e = this.Entity.GetComponent(0);
    this.ActorComp = this.Entity.GetComponent(202);
    this.Nln = this.Entity.GetComponent(158);
    this.Oln = this.Entity.GetComponent(130);
    this.vFu = this.Entity.GetComponent(293);
    this.Nln?.SetEnableMovementSync(false, "SceneItemMoveComponent OnStart");
    if (e && e.GetPbEntityInitData()) {
      if (this.Entity.GameBudgetConfig.GroupName.op_Equality(FNameUtil_1.FNameUtil.GetDynamicFName("MoveSceneItemEntity"))) {
        this.h7c = true;
      }
      if (!Info_1.Info.EnableForceTick) {
        this.o4o = this.ActorComp.Owner.GetComponentByClass(UE.KuroSceneItemMoveComponent.StaticClass());
        if (!this.o4o?.IsValid()) {
          this.o4o = this.ActorComp.Owner.AddComponentByClass(UE.KuroSceneItemMoveComponent.StaticClass(), false, new UE.Transform(), false);
        }
        this.o4o.Kuro_SetGravityDirect(this.ActorComp.ActorGravityDirectProxy.ToUeVectorOld());
        this.o4o.SetTickingMoveEnable(false);
        this.w$c(this.S$c);
        this.Rbu(this.E$c);
        if (this.h7c) {
          this.o4o.SetKuroOnlyTickOutside(true);
        }
      }
    }
    return true;
  }
  OnEnd() {
    if (this.o4o?.IsValid()) {
      this.L$c(this.S$c);
      this.Ebu(this.E$c);
    }
    return true;
  }
  OnActivate() {
    if (!Info_1.Info.EnableForceTick && this.Fln.length > 0) {
      for (const t of this.Fln) {
        this.o4o.AddMoveTarget(new UE.VectorDouble(t.TargetPosData.X ?? 0, t.TargetPosData.Y ?? 0, t.TargetPosData.Z ?? 0), t.MoveTime, t.StayTime);
      }
      this.y$c = 1;
      this.Fln = [];
      this.o4o.SetTickingMoveEnable(true);
      this.Oln.IsMoving = true;
    }
    this.Wln = true;
    var e = this.Entity.GetComponent(0);
    if (e?.PbMoveSplineId) {
      this.OnRecvSyncSplineMoving(e.PbMoveSplineId, e.PbMoveSplineConfig, e.PbMoveSplineSceneItemRuntimeData);
    }
  }
  Kln() {
    return Vector_1.Vector.DistSquared(this._ae, this.Vln) >= this.Hln;
  }
  OnTick(e) {
    if (this.h7c) {
      this.vFu?.TickMovement(e);
    }
    if (this.Oln.IsMoving) {
      if (!this.IsMoving || this.o4o.GetSimpleRunState() === 2) {
        this.Oln.IsMoving = false;
      }
    } else if (this.IsMoving && this.o4o.GetSimpleRunState() === 1) {
      this.Oln.IsMoving = true;
    }
    if (!!this.kln && !this.IsMoving && !this.ForceSyncing) {
      this.kln = false;
      if (this.Nln?.GetEnableMovementSync()) {
        this.Nln?.SetEnableMovementSync(false, "SceneItemMoveComponent MoveStop");
      }
    }
  }
  OnForceTick(e) {
    var t;
    var i;
    super.OnTick(e);
    if (this._ii === 0) {
      this.Anr.Addition(this.ActorComp.ActorLocationProxy, this.Vln);
      if (this.Kln()) {
        this.ActorComp.SetActorLocation(this.Due.ToUeVector());
        this._ii = 1;
      } else {
        this.ActorComp.SetActorLocation(this.Vln.ToUeVector());
      }
    } else if (this.Fln && this.Fln.length !== 0) {
      t = this.Fln[0];
      this.Fln.splice(0, 1);
      this.Due = Vector_1.Vector.Create(t.TargetPosData.X, t.TargetPosData.Y, t.TargetPosData.Z);
      if (t.MoveTime <= MathUtils_1.MathUtils.KindaSmallNumber) {
        this.ActorComp.SetActorLocation(this.Due.ToUeVector());
      } else {
        this._ae.DeepCopy(this.ActorComp.ActorLocationProxy);
        this.Hln = Vector_1.Vector.DistSquared(this._ae, this.Due);
        i = Vector_1.Vector.Create();
        this.Due.Subtraction(this._ae, i);
        i.Division(t.MoveTime * TimeUtil_1.TimeUtil.InverseMillisecond / e, i);
        this.Anr = i;
        this._ii = 0;
      }
    }
  }
  AddSimpleRotation(e, t, i, n) {
    this.o4o.InitRotationData(e, false);
    this.o4o.AddRotationStep(t.ToUeRotator(), i.ToUeRotator(), n, 0, undefined);
    this.o4o.StartRotate();
  }
  bSa(e) {
    var t;
    if (!Info_1.Info.EnableForceTick && this.IsMovingPrepareCompleted) {
      t = Vector_1.Vector.Create(e.TargetPosData.X ?? 0, e.TargetPosData.Y ?? 0, e.TargetPosData.Z ?? 0);
      this.o4o.AddMoveTarget(t.ToUeVector(), e.MoveTime, e.StayTime, e.MaxSpees, e.Acceleration);
      this.y$c = 1;
      this.o4o.SetTickingMoveEnable(true);
      t = Vector_1.Vector.Dist(t, this.ActorComp.ActorLocationProxy);
      if (this.o4o.GetSimpleRunState() === 0 && t > OFFSET) {
        this.Oln.IsMoving = true;
      }
    } else {
      this.Fln.push(e);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 31, "添加路径点", ["moveTargetX", e.TargetPosData.X], ["moveTargetY", e.TargetPosData.Y], ["moveTargetZ", e.TargetPosData.Z], ["Time", e.MoveTime]);
    }
  }
  AddMoveTarget(t) {
    if (this.jln) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "当前SceneItem正在巡逻中,不可再添加目标点", ["PbDataId", this.Entity.GetComponent(0).GetPbDataId()]);
      }
    } else {
      let e = undefined;
      var i;
      e = t instanceof MoveTarget ? t : (i = t.MoveMotion?.Type === IAction_1.EMoveMotion.VariableMotion ? -1 : t.MoveMotion?.Time ?? 0, new MoveTarget(t.Point, i));
      this.bSa(e);
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        this.RequestMoveToTarget(e);
      }
    }
  }
  GetNextTarget() {
    var e;
    var t;
    if (this.o4o?.IsValid()) {
      e = (0, puerts_1.$ref)(new UE.VectorDouble());
      t = (0, puerts_1.$ref)(new UE.VectorDouble());
      return {
        HasTarget: this.o4o.GetNextMoveTarget(e, t),
        Target: (0, puerts_1.$unref)(e),
        Velocity: (0, puerts_1.$unref)(t)
      };
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "SceneItemMoveComponent不存在", ["PbDataId", this.Entity.GetComponent(0).GetPbDataId()], ["IsEntityInit", this.Entity.IsInit]);
      }
      return {
        HasTarget: false,
        Target: new UE.VectorDouble(),
        Velocity: new UE.VectorDouble()
      };
    }
  }
  RequestMoveToTarget(e) {
    var t = Protocol_1.Aki.Protocol.d0a.create();
    t.M0a = Protocol_1.Aki.Protocol.E0a.create();
    t.M0a.F4n = this.ActorComp.CreatureData.GetCreatureDataId();
    t.M0a.P5n = {
      X: e.TargetPosData.X,
      Y: e.TargetPosData.Y,
      Z: e.TargetPosData.Z
    };
    t.M0a.g0a = e.MoveTime;
    t.M0a.f0a = e.StayTime;
    t.M0a.v0a = e.MaxSpees;
    t.M0a.p0a = e.Acceleration;
    Net_1.Net.Call(23476, t, e => {});
  }
  HandleMoveToTarget(e) {
    e = new MoveTarget({
      X: e.M0a.P5n.X,
      Y: e.M0a.P5n.Y,
      Z: e.M0a.P5n.Z
    }, e.M0a.g0a, e.M0a.f0a, e.M0a.v0a, e.M0a.p0a);
    this.bSa(e);
  }
  StartSplineMoveTask(e) {
    if (this.GetCurSplineMoveTask()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "SceneItemMoveComponent 样条移动任务未结束时开始新任务，清除旧任务", ["EntityId", this.Entity.Id]);
      }
      ControllerHolder_1.ControllerHolder.SplineMoveTaskController.EndEntityTasks(this.Entity.Id);
    }
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id);
    SceneItemSplineMoveTask_1.SceneItemSplineMoveTask.Create(t, e).StartTask();
  }
  GetCurSplineMoveTask() {
    var e = ControllerHolder_1.ControllerHolder.SplineMoveTaskController.GetEntityCurSplineMoveTask(this.Entity.Id);
    if (e) {
      return e;
    }
  }
  StartSplineMoveAtConstantTimeImplement(e, t, i = true) {
    if (!this.o4o.StartMoveWithSplineAtConstantTime(e.Spline, e.IsRepeat, e.IsCycle, e.IsKeepLookAt, e.TimeSec, e.TimeDisCurve, e.StartTimeOffset, e.StartDis, e.EndDis)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "SceneItemMoveComponent 样条移动(ConstantTime)开始失败", ["EntityId", this.Entity.Id]);
      }
      return false;
    }
    this.jln = true;
    this.kln = i;
    this.Nln?.SetEnableMovementSync(i, "SceneItemMoveComponent StartPatrolAtConstantTime");
    this.y$c = 2;
    if (t) {
      const n = () => {
        this.RemoveStopMoveCallback(n);
        t();
      };
      this.AddStopMoveCallback(n);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "SceneItemMoveComponent 样条移动(ConstantTime)开始", ["EntityId", this.Entity.Id]);
    }
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStarted, this.Entity);
    return true;
  }
  StartSplineMoveAtDynamicSpeedImplement(e, t, i = true) {
    if (!this.o4o.StartMoveWithSplineAtDynamicSpeed(e.Spline, e.MaxMoveTimes, e.IsCycle, e.IsKeepLookAt, e.InitSpeed, e.Acceleration, e.TargetSpeed, e.StartDis, e.EndDis)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "SceneItemMoveComponent 样条移动(DynamicSpeed)开始失败", ["EntityId", this.Entity.Id]);
      }
      return false;
    }
    this.jln = true;
    this.kln = i;
    this.Nln?.SetEnableMovementSync(i, "SceneItemMoveComponent StartPatrolAtDynamicSpeed");
    this.y$c = 2;
    if (t) {
      const n = () => {
        this.RemoveStopMoveCallback(n);
        t();
      };
      this.AddStopMoveCallback(n);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "SceneItemMoveComponent 样条移动(DynamicSpeed)开始", ["EntityId", this.Entity.Id]);
    }
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStarted, this.Entity);
    return true;
  }
  UpdatePatrolAtDynamicSpeedEditableParam(e) {
    var t;
    var i;
    var n;
    return !!this.IsSplineMoving() && !!this.o4o && (n = this.o4o.SplineMoveData.DynamicSpeedData, t = e.CurrentSpeed ?? n.CurrentSpeed, i = e.Acceleration ?? n.Acceleration, e = e.TargetSpeed ?? n.TargetSpeed, (n = this.o4o.UpdateDynamicSpeedSplineMoveParams(t, i, e)) ? (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(SCENEITEM_MOVE_DEBUG_KEY) && Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneItem", 39, "SceneItemMoveComponent 更新样条移动参数", ["EntityId", this.Entity.Id], ["当前速度", t], ["加速度", i], ["目标速度", e]), n) : (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "SceneItemMoveComponent 更新样条移动动态参数失败", ["EntityId", this.Entity.Id]), false));
  }
  UpdateSplineMoveDistance(e) {
    return !!this.IsSplineMoving() && !!this.o4o && this.o4o.UpdateSplineMoveDistance(e);
  }
  UpdateSplineMoveDistanceByPos(e) {
    return !!this.IsSplineMoving() && !!this.o4o && this.o4o.UpdateSplineMoveDistanceByPosition(e.ToUeVector());
  }
  UpdateSplineMoveDistanceByRuntimeData(e, t = SceneItemSplineMoveTaskDefine_1.SCENEITEM_SPLINEMOVE_SYNC_DIST_DEVIATION_TOLERANCE) {
    if (this.IsSplineMoving() && this.o4o) {
      if (e.DistanceAloneSpline !== undefined && e.DistanceAloneSpline >= 0) {
        if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CheckSplineMoveDistanceNearlyEqual(e.DistanceAloneSpline, this.o4o.GetDistanceAlongSpline(), t)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.UpdateSplineMoveDistanceByRuntimeData] 样条移动进度相差过小，不更新", ["EntityId", this.Entity.Id], ["OldDistanceAlongSpline", this.o4o.GetDistanceAlongSpline()], ["NewDistanceAlongSpline", e.DistanceAloneSpline]);
          }
          return false;
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.UpdateSplineMoveDistanceByRuntimeData] 更新样条移动进度", ["EntityId", this.Entity.Id], ["OldDistanceAlongSpline", this.o4o.GetDistanceAlongSpline()], ["NewDistanceAlongSpline", e.DistanceAloneSpline]);
          }
          this.UpdateSplineMoveDistance(e.DistanceAloneSpline);
          return true;
        }
      }
      if (e.CurPos) {
        if (!SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CheckSplineMoveLocationNearlyEqual(this.ActorComp.ActorLocationProxy, e.CurPos, t)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.UpdateSplineMoveDistanceByRuntimeData] 更新样条移动进度", ["EntityId", this.Entity.Id], ["OlPos", this.ActorComp.ActorLocationProxy], ["NewPos", e.CurPos]);
          }
          this.UpdateSplineMoveDistanceByPos(e.CurPos);
          return true;
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.UpdateSplineMoveDistanceByRuntimeData] 样条移动进度相差过小，不更新", ["EntityId", this.Entity.Id], ["OldPos", this.ActorComp.ActorLocationProxy], ["NewPos", e.CurPos]);
        }
      }
    }
    return false;
  }
  UpdateSplineMoveRotationByRuntimeData(e, t = SceneItemSplineMoveTaskDefine_1.SCENEITEM_SPLINEMOVE_SYNC_ROT_RAD_DEVIATION_TOLERANCE) {
    if (this.IsSplineMoving() && this.o4o && e.CurRot) {
      MathUtils_1.MathUtils.CommonTempRotator.DeepCopy(e.CurRot);
      if (!SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CheckSplineMoveRotatorNearlyEqual(MathUtils_1.MathUtils.CommonTempRotator, this.ActorComp.ActorRotationProxy, t)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.UpdateSplineMoveRotationByRuntimeData] 更新样条移动旋转", ["EntityId", this.Entity.Id], ["OldRot", this.ActorComp.ActorRotationProxy], ["NewRot", e.CurRot]);
        }
        this.o4o.GetOwner()?.K2_SetActorRotation(MathUtils_1.MathUtils.CommonTempRotator.ToUeRotator(), false);
        return true;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.UpdateSplineMoveRotationByRuntimeData] 样条移动旋转相差过小，不更新", ["EntityId", this.Entity.Id], ["OldRot", this.ActorComp.ActorRotationProxy], ["NewRot", e.CurRot]);
      }
    }
    return false;
  }
  GetSplineMoveDynamicSpeedData() {
    if (this.o4o?.IsMoving()) {
      return this.o4o.SplineMoveData.DynamicSpeedData;
    }
  }
  OnRecvSyncSplineMoving(e, t, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 更新样条移动task", ["EntityId", this.Entity.Id], ["SplineEntityId", e]);
    }
    var n;
    var o = SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CreateDefaultGeneralConfig();
    if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseProtoSplineMoveConfigToGeneralConfig(e, t, o)) {
      t = SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CreateDefaultGeneralRuntimeData();
      if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseProtoSplineMoveRuntimeDataToGeneralRuntimeData(i, t)) {
        if (i = this.GetCurSplineMoveTask()) {
          if (i.CheckSplineMoveConfigEqual(o)) {
            if (this.o4o && this.IsSplineMoving() && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 当前样条移动task参数与同步信息相同，更新样条运行时数据", ["EntityId", this.Entity.Id], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", o]), n = false, n = (n ||= this.UpdateSplineMoveDistanceByRuntimeData(t)) || this.UpdateSplineMoveRotationByRuntimeData(t))) {
              this.vFu?.TickMovement(0, true);
            }
          } else {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 当前样条移动task参数与同步信息不同，中断并开始新的样条移动task", ["EntityId", this.Entity.Id], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", o]);
            }
            i.EndTask(false);
            this.StartSplineMoveTask({
              SplineId: e,
              SplineMoveConfig: o,
              EnableSplineMoveSync: true,
              EnableMovementSync: false,
              NeedMoveToStartPoint: false,
              SplineMoveRuntimeData: t
            });
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 当前没有样条移动task，直接开始新的样条移动task", ["EntityId", this.Entity.Id], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", o]);
          }
          this.StartSplineMoveTask({
            SplineId: e,
            SplineMoveConfig: o,
            EnableSplineMoveSync: true,
            EnableMovementSync: false,
            NeedMoveToStartPoint: false,
            SplineMoveRuntimeData: t
          });
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 解析样条移动协议中的样条移动运行时数据失败", ["EntityId", this.Entity.Id], ["SplineEntityId", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 解析样条移动协议中的样条移动配置失败", ["EntityId", this.Entity.Id], ["SplineEntityId", e]);
    }
  }
  OnRecvSyncSplineStop(e, t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineStop] 停止样条移动task", ["EntityId", this.Entity.Id], ["SplineEntityId", e]);
    }
    var n;
    var o = SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CreateDefaultGeneralConfig();
    if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseProtoSplineMoveConfigToGeneralConfig(e, t, o)) {
      t = SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CreateDefaultGeneralRuntimeData();
      if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseProtoSplineMoveRuntimeDataToGeneralRuntimeData(i, t)) {
        if (i = this.GetCurSplineMoveTask()) {
          if (i.CheckSplineMoveConfigEqual(o)) {
            if (this.o4o && this.IsSplineMoving() && (n = false, n = (n ||= this.UpdateSplineMoveDistanceByRuntimeData(t, 0)) || this.UpdateSplineMoveRotationByRuntimeData(t, 0))) {
              this.vFu?.TickMovement(0, true);
            }
            i.EndTask(true);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineStop] 当前样条移动task参数与同步信息不同，不处理停止", ["EntityId", this.Entity.Id], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", o]);
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineStop] 当前没有样条移动task，不需要处理停止", ["EntityId", this.Entity.Id], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", o]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineStop] 解析样条移动协议中的样条移动运行时数据失败", ["EntityId", this.Entity.Id], ["SplineEntityId", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineStop] 解析样条移动协议中的样条移动配置失败", ["EntityId", this.Entity.Id], ["SplineEntityId", e]);
    }
  }
  OnRecvSyncSplineInterrupt(e, t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineInterrupt] 中断样条移动task", ["EntityId", this.Entity.Id], ["SplineEntityId", e]);
    }
    var n;
    var o = SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CreateDefaultGeneralConfig();
    if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseProtoSplineMoveConfigToGeneralConfig(e, t, o)) {
      t = SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CreateDefaultGeneralRuntimeData();
      if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseProtoSplineMoveRuntimeDataToGeneralRuntimeData(i, t)) {
        if (i = this.GetCurSplineMoveTask()) {
          if (i.CheckSplineMoveConfigEqual(o)) {
            if (this.o4o && this.IsSplineMoving() && (n = false, n = (n ||= this.UpdateSplineMoveDistanceByRuntimeData(t, 0)) || this.UpdateSplineMoveRotationByRuntimeData(t, 0))) {
              this.vFu?.TickMovement(0, true);
            }
            i?.EndTask(false);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineInterrupt] 当前样条移动task参数与同步信息不同，不处理中断", ["EntityId", this.Entity.Id], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", o]);
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineInterrupt] 当前没有样条移动task，不需要处理中断", ["EntityId", this.Entity.Id], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", o]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineInterrupt] 解析样条移动协议中的样条移动运行时数据失败", ["EntityId", this.Entity.Id], ["SplineEntityId", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineInterrupt] 解析样条移动协议中的样条移动配置失败", ["EntityId", this.Entity.Id], ["SplineEntityId", e]);
    }
  }
  StopMove(e = true, t = true) {
    var i;
    var n;
    if (Info_1.Info.EnableForceTick) {
      this.Fln = [];
      this._ii = 1;
    } else if (this.IsMovingPrepareCompleted) {
      n = !!(i = this.o4o?.IsMoving(true)) && this.o4o?.GetSimpleRunState() !== 0;
      if (i) {
        if (n) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneItem", 39, "SceneItemMoveComponent 简单移动中断", ["EntityId", this.Entity.Id]);
          }
          EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemMoveBroken, this.Entity);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneItem", 39, "SceneItemMoveComponent 样条移动中断", ["EntityId", this.Entity.Id]);
          }
          EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemMoveBroken, this.Entity);
          EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveBroken, this.Entity);
        }
      }
      this.o4o.StopAllMove(e, t);
    } else {
      this.Fln = [];
    }
  }
  w$c(e) {
    this.o4o.OnArrivePointCallback.Add(e);
  }
  L$c(e) {
    this.o4o.OnArrivePointCallback.Remove(e);
  }
  AddOnArrivePointCallback(e) {
    if (!this.Xd_.includes(e)) {
      this.Xd_.push(e);
    }
  }
  RemoveOnArrivePointCallback(e) {
    e = this.Xd_.indexOf(e);
    if (e !== -1) {
      this.Xd_.splice(e, 1);
    }
  }
  ClearOnArrivePointCallbacks() {
    this.Xd_.length = 0;
  }
  M$c(e) {
    for (const t of Array.from(this.Xd_)) {
      t(e);
    }
  }
  Rbu(e) {
    this.o4o.OnMoveStopCallback.Add(e);
  }
  Ebu(e) {
    this.o4o.OnMoveStopCallback.Remove(e);
  }
  AddStopMoveCallback(e) {
    if (!this.Sbu.includes(e)) {
      this.Sbu.push(e);
    }
  }
  RemoveStopMoveCallback(e) {
    e = this.Sbu.indexOf(e);
    if (e !== -1) {
      this.Sbu.splice(e, 1);
    }
  }
  ClearStopMoveCallback() {
    this.Sbu.length = 0;
  }
  R$c() {
    for (const e of Array.from(this.Sbu)) {
      e();
    }
  }
  AddStopMoveCallbackWithEntity(e) {
    if (!this.ybu.includes(e)) {
      this.ybu.push(e);
    }
  }
  RemoveStopMoveCallbackWithEntity(e) {
    e = this.ybu.indexOf(e);
    if (e !== -1) {
      this.ybu.splice(e, 1);
    }
  }
  ClearStopMoveCallbacksWithEntity() {
    this.ybu.length = 0;
  }
  b$c() {
    for (const e of Array.from(this.ybu)) {
      e(this.Entity);
    }
  }
  GetDebugString() {
    let e = "";
    var t;
    if (this.o4o?.IsValid() && (t = this.o4o.IsMoving(true), e += `移动中: ${t}
`, t) && (t = this.o4o.GetSimpleRunState(), e += `简单移动状态: ${t}
`, t = this.o4o.GetSplineRunState(), e += `样条移动状态: ${t}
`, t !== 0)) {
      t = this.o4o.SplineMoveData.DynamicSpeedData;
      e = `${e = `${e = `${e = `${e += `动态速度参数:
`}	CurrentSpeed: ${t.CurrentSpeed.toFixed(2)}
`}	TargetSpeed: ${t.TargetSpeed.toFixed(2)}
`}	Acceleration: ${t.Acceleration.toFixed(2)}
`}	EndDis: ${t.EndDis.toFixed(2)}
`;
      t = this.o4o.SplineMoveData.StaticTimeDisData;
      e = `${e += `固定时间参数:
`}	TimeDisCurveValid: ${!!t.TimeDisCurve?.IsValid()}
`;
    }
    return e;
  }
};
SceneItemMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(128)], SceneItemMoveComponent);
exports.SceneItemMoveComponent = SceneItemMoveComponent; //# sourceMappingURL=SceneItemMoveComponent.js.map