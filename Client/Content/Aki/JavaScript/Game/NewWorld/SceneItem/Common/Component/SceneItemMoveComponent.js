"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var s;
  var o = arguments.length;
  var h = o < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, n);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (s = e[a]) {
        h = (o < 3 ? s(h) : o > 3 ? s(t, i, h) : s(t, i)) || h;
      }
    }
  }
  if (o > 3 && h) {
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
  constructor(e, t, i = 0, n = -1, s = -1) {
    this.TargetPosData = e;
    this.MoveTime = t;
    this.StayTime = i;
    this.MaxSpeed = n;
    this.Acceleration = s;
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
    this.EIe = undefined;
    this.U4u = undefined;
    this.CZu = 0;
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
    this.H7u = false;
    this.ued = () => {
      if (this.o4o?.IsValid() && this.o4o.IsMoving(true)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SceneItem", 39, "当前SceneItem移动时被删除，保底停止移动", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()]);
        }
        this.StopMove(true);
      }
    };
    this.pZu = e => {
      this.vZu(e);
    };
    this.Xd_ = [];
    this.yZu = () => {
      var e = this.CZu;
      this.CZu = 0;
      if (e === 1) {
        this.SZu();
      } else if (e === 2) {
        this.MZu();
      }
    };
    this.SZu = () => {
      this.ActorComp?.ResetAllCachedTime();
      this.EZu();
      this.IZu();
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemMoveStopped, this.Entity);
    };
    this.MZu = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 39, "SceneItemMoveComponent 样条移动停止", ["EntityId", this.Entity.Id]);
      }
      this.ActorComp?.ResetAllCachedTime();
      this.jln = false;
      this.EZu();
      this.IZu();
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemMoveStopped, this.Entity);
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStopped, this.Entity);
    };
    this.Nbu = [];
    this.Fbu = [];
  }
  static get Dependencies() {
    return [206, 0];
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
    return !!this.IsMovingPrepareCompleted && !!this.o4o?.IsValid() && this.o4o.GetSplineRunState() !== 0;
  }
  GetDistanceAloneSpline() {
    if (this.IsMovingPrepareCompleted) {
      return this.o4o.GetDistanceAlongSpline();
    } else {
      return 0;
    }
  }
  OnInitData() {
    this.EIe = this.Entity.GetComponent(0);
    return true;
  }
  OnStart() {
    var e;
    this.ActorComp = this.Entity.GetComponent(206);
    this.Nln = this.Entity.GetComponent(162);
    this.Oln = this.Entity.GetComponent(134);
    this.U4u = this.Entity.GetComponent(303);
    this.Nln?.SetEnableMovementSync(false, "SceneItemMoveComponent OnStart");
    if (this.EIe && this.EIe.GetPbEntityInitData()) {
      if (this.Entity.GameBudgetConfig.GroupName.op_Equality(FNameUtil_1.FNameUtil.GetDynamicFName("MoveSceneItemEntity"))) {
        this.H7u = true;
      }
      if (!Info_1.Info.EnableForceTick) {
        this.o4o = this.ActorComp.Owner.GetComponentByClass(UE.KuroSceneItemMoveComponent.StaticClass());
        if (!this.o4o?.IsValid()) {
          this.o4o = this.ActorComp.Owner.AddComponentByClass(UE.KuroSceneItemMoveComponent.StaticClass(), false, new UE.Transform(), false);
        }
        this.o4o.Kuro_SetGravityDirect(this.ActorComp.ActorGravityDirectProxy.ToUeVectorOld());
        this.o4o.SetTickingMoveEnable(false);
        this.TZu(this.pZu);
        this.Qbu(this.yZu);
        if (this.H7u) {
          this.o4o.SetKuroOnlyTickOutside(true);
        }
        if ((e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(this.Entity.Id)) && !EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.ued)) {
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.ued);
        }
        if (ModelManager_1.ModelManager.AvoidanceModel.UseRVOAvoidance) {
          this.o4o.SetAvoidanceGroupMask(ModelManager_1.ModelManager.AvoidanceModel.SceneItemAvoidanceGroupMask);
          this.o4o.SetGroupsToAvoidMask(ModelManager_1.ModelManager.AvoidanceModel.SceneItemGroupsToAvoidMask);
          this.o4o.AvoidanceRadius = ModelManager_1.ModelManager.AvoidanceModel.SceneItemAvoidanceRadius;
          this.o4o.SetAvoidanceEnabled(true);
        }
      }
    }
    return true;
  }
  OnEnd() {
    if (this.o4o?.IsValid()) {
      this.bZu(this.pZu);
      this.jbu(this.yZu);
    }
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    return true;
  }
  OnActivate() {
    if (!Info_1.Info.EnableForceTick && this.Fln.length > 0) {
      for (const e of this.Fln) {
        this.o4o.AddMoveTarget(new UE.VectorDouble(e.TargetPosData.X ?? 0, e.TargetPosData.Y ?? 0, e.TargetPosData.Z ?? 0), e.MoveTime, e.StayTime);
      }
      this.CZu = 1;
      this.Fln = [];
      this.o4o.SetTickingMoveEnable(true);
      this.Oln.IsMoving = true;
    }
    this.Wln = true;
    if (this.EIe?.PbMoveSplineId) {
      this.OnRecvSyncSplineMoving(this.EIe.PbMoveSplineId, this.EIe.PbMoveSplineConfig, this.EIe.PbMoveSplineSceneItemRuntimeData);
    }
  }
  Kln() {
    return Vector_1.Vector.DistSquared(this._ae, this.Vln) >= this.Hln;
  }
  OnTick(e) {
    if (this.H7u) {
      this.U4u?.TickMovement(e);
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
      this.o4o.AddMoveTarget(t.ToUeVector(), e.MoveTime, e.StayTime, e.MaxSpeed, e.Acceleration);
      this.CZu = 1;
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
        Log_1.Log.Error("SceneItem", 31, "当前SceneItem正在巡逻中,不可再添加目标点", ["PbDataId", this.EIe?.GetPbDataId()]);
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
        Log_1.Log.Error("SceneItem", 31, "SceneItemMoveComponent不存在", ["PbDataId", this.EIe?.GetPbDataId()], ["IsEntityInit", this.Entity.IsInit]);
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
    t.M0a.v0a = e.MaxSpeed;
    t.M0a.p0a = e.Acceleration;
    Net_1.Net.Call(16737, t, e => {});
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
    if (this.EIe?.GetRemoveState()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "SceneItemMoveComponent 样条移动(ConstantTime)开始失败，Entity已删除", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe.GetPbDataId()]);
      }
      return false;
    }
    if (!this.o4o.StartMoveWithSplineAtConstantTime(e.Spline, e.IsRepeat, e.IsCycle, e.IsKeepLookAt, e.TimeSec, e.TimeDisCurve, e.StartTimeOffset, e.StartDis, e.EndDis)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "SceneItemMoveComponent 样条移动(ConstantTime)开始失败", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()]);
      }
      return false;
    }
    this.jln = true;
    this.kln = i;
    this.Nln?.SetEnableMovementSync(i, "SceneItemMoveComponent StartPatrolAtConstantTime");
    this.CZu = 2;
    if (t) {
      const n = () => {
        this.RemoveStopMoveCallback(n);
        t();
      };
      this.AddStopMoveCallback(n);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "SceneItemMoveComponent 样条移动(ConstantTime)开始", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()]);
    }
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStarted, this.Entity);
    return true;
  }
  StartSplineMoveAtDynamicSpeedImplement(e, t, i = true) {
    if (this.EIe?.GetRemoveState()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "SceneItemMoveComponent 样条移动(DynamicSpeed)开始失败，Entity已删除", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe.GetPbDataId()]);
      }
      return false;
    }
    if (!this.o4o.StartMoveWithSplineAtDynamicSpeed(e.Spline, e.MaxMoveTimes, e.IsCycle, e.IsKeepLookAt, e.InitSpeed, e.Acceleration, e.TargetSpeed, e.StartDis, e.EndDis)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "SceneItemMoveComponent 样条移动(DynamicSpeed)开始失败", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()]);
      }
      return false;
    }
    this.jln = true;
    this.kln = i;
    this.Nln?.SetEnableMovementSync(i, "SceneItemMoveComponent StartPatrolAtDynamicSpeed");
    this.CZu = 2;
    if (t) {
      const n = () => {
        this.RemoveStopMoveCallback(n);
        t();
      };
      this.AddStopMoveCallback(n);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "SceneItemMoveComponent 样条移动(DynamicSpeed)开始", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()]);
    }
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStarted, this.Entity);
    return true;
  }
  UpdatePatrolAtDynamicSpeedEditableParam(e) {
    var t;
    var i;
    var n;
    return !!this.IsSplineMoving() && !!this.o4o && (n = this.o4o.SplineMoveData.DynamicSpeedData, t = e.CurrentSpeed ?? n.CurrentSpeed, i = e.Acceleration ?? n.Acceleration, e = e.TargetSpeed ?? n.TargetSpeed, (n = this.o4o.UpdateDynamicSpeedSplineMoveParams(t, i, e)) ? (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(SCENEITEM_MOVE_DEBUG_KEY) && Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneItem", 39, "SceneItemMoveComponent 更新样条移动参数", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["当前速度", t], ["加速度", i], ["目标速度", e]), n) : (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "SceneItemMoveComponent 更新样条移动动态参数失败", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()]), false));
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
            Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.UpdateSplineMoveDistanceByRuntimeData] 样条移动进度相差过小，不更新", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["OldDistanceAlongSpline", this.o4o.GetDistanceAlongSpline()], ["NewDistanceAlongSpline", e.DistanceAloneSpline]);
          }
          return false;
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.UpdateSplineMoveDistanceByRuntimeData] 更新样条移动进度", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["OldDistanceAlongSpline", this.o4o.GetDistanceAlongSpline()], ["NewDistanceAlongSpline", e.DistanceAloneSpline]);
          }
          this.UpdateSplineMoveDistance(e.DistanceAloneSpline);
          return true;
        }
      }
      if (e.CurPos) {
        if (!SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CheckSplineMoveLocationNearlyEqual(this.ActorComp.ActorLocationProxy, e.CurPos, t)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.UpdateSplineMoveDistanceByRuntimeData] 更新样条移动进度", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["OldPos", this.ActorComp.ActorLocationProxy], ["NewPos", e.CurPos]);
          }
          this.UpdateSplineMoveDistanceByPos(e.CurPos);
          return true;
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.UpdateSplineMoveDistanceByRuntimeData] 样条移动进度相差过小，不更新", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["OldPos", this.ActorComp.ActorLocationProxy], ["NewPos", e.CurPos]);
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
          Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.UpdateSplineMoveRotationByRuntimeData] 更新样条移动旋转", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["OldRot", this.ActorComp.ActorRotationProxy], ["NewRot", e.CurRot]);
        }
        this.o4o.GetOwner()?.K2_SetActorRotation(MathUtils_1.MathUtils.CommonTempRotator.ToUeRotator(), false);
        return true;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.UpdateSplineMoveRotationByRuntimeData] 样条移动旋转相差过小，不更新", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["OldRot", this.ActorComp.ActorRotationProxy], ["NewRot", e.CurRot]);
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
      Log_1.Log.Debug("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 更新样条移动task", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e]);
    }
    var n;
    var s = SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CreateDefaultGeneralConfig();
    if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseProtoSplineMoveConfigToGeneralConfig(e, t, s)) {
      t = SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CreateDefaultGeneralRuntimeData();
      if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseProtoSplineMoveRuntimeDataToGeneralRuntimeData(i, t)) {
        if (i = this.GetCurSplineMoveTask()) {
          if (i.CheckSplineMoveConfigEqual(s)) {
            if (this.IsSplineMoving()) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 当前样条移动task参数与同步信息相同，更新样条运行时数据", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", s]);
              }
              n = false;
              if (n = (n ||= this.UpdateSplineMoveDistanceByRuntimeData(t)) || this.UpdateSplineMoveRotationByRuntimeData(t)) {
                this.U4u?.TickMovement(0, true);
              }
            } else {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 当前样条移动task未在进行样条移动，中断并开始新的样条移动task", ["EntityId", this.Entity.Id], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", s]);
              }
              i.EndTask(false);
              this.StartSplineMoveTask({
                SplineId: e,
                SplineMoveConfig: s,
                EnableSplineMoveSync: true,
                EnableMovementSync: false,
                NeedMoveToStartPoint: false,
                SplineMoveRuntimeData: t
              });
            }
          } else {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 当前样条移动task参数与同步信息不同，中断并开始新的样条移动task", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", s]);
            }
            i.EndTask(false);
            this.StartSplineMoveTask({
              SplineId: e,
              SplineMoveConfig: s,
              EnableSplineMoveSync: true,
              EnableMovementSync: false,
              NeedMoveToStartPoint: false,
              SplineMoveRuntimeData: t
            });
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 当前没有样条移动task，直接开始新的样条移动task", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", s]);
          }
          this.StartSplineMoveTask({
            SplineId: e,
            SplineMoveConfig: s,
            EnableSplineMoveSync: true,
            EnableMovementSync: false,
            NeedMoveToStartPoint: false,
            SplineMoveRuntimeData: t
          });
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 解析样条移动协议中的样条移动运行时数据失败", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineMoving] 解析样条移动协议中的样条移动配置失败", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e]);
    }
  }
  OnRecvSyncSplineStop(e, t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineStop] 停止样条移动task", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e]);
    }
    var n;
    var s = SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CreateDefaultGeneralConfig();
    if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseProtoSplineMoveConfigToGeneralConfig(e, t, s)) {
      t = SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CreateDefaultGeneralRuntimeData();
      if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseProtoSplineMoveRuntimeDataToGeneralRuntimeData(i, t)) {
        if (i = this.GetCurSplineMoveTask()) {
          if (i.CheckSplineMoveConfigEqual(s)) {
            if (this.o4o && this.IsSplineMoving() && (n = false, n = (n ||= this.UpdateSplineMoveDistanceByRuntimeData(t, 0)) || this.UpdateSplineMoveRotationByRuntimeData(t, 0))) {
              this.U4u?.TickMovement(0, true);
            }
            i.EndTask(true);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineStop] 当前样条移动task参数与同步信息不同，不处理停止", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", s]);
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineStop] 当前没有样条移动task，不需要处理停止", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", s]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineStop] 解析样条移动协议中的样条移动运行时数据失败", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineStop] 解析样条移动协议中的样条移动配置失败", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e]);
    }
  }
  OnRecvSyncSplineInterrupt(e, t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineInterrupt] 中断样条移动task", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e]);
    }
    var n;
    var s = SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CreateDefaultGeneralConfig();
    if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseProtoSplineMoveConfigToGeneralConfig(e, t, s)) {
      t = SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CreateDefaultGeneralRuntimeData();
      if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseProtoSplineMoveRuntimeDataToGeneralRuntimeData(i, t)) {
        if (i = this.GetCurSplineMoveTask()) {
          if (i.CheckSplineMoveConfigEqual(s)) {
            if (this.o4o && this.IsSplineMoving() && (n = false, n = (n ||= this.UpdateSplineMoveDistanceByRuntimeData(t, 0)) || this.UpdateSplineMoveRotationByRuntimeData(t, 0))) {
              this.U4u?.TickMovement(0, true);
            }
            i?.EndTask(false);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineInterrupt] 当前样条移动task参数与同步信息不同，不处理中断", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", s]);
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineInterrupt] 当前没有样条移动task，不需要处理中断", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e], ["SplineMoveRuntimeData", t], ["SplineMoveConfig", s]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineInterrupt] 解析样条移动协议中的样条移动运行时数据失败", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 39, "[SceneItemMoveComponent.OnRecvSyncSplineInterrupt] 解析样条移动协议中的样条移动配置失败", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()], ["SplineEntityId", e]);
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
            Log_1.Log.Info("SceneItem", 39, "SceneItemMoveComponent 简单移动中断", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()]);
          }
          EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemMoveBroken, this.Entity);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneItem", 39, "SceneItemMoveComponent 样条移动中断", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()]);
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
  TZu(e) {
    this.o4o.OnArrivePointCallback.Add(e);
  }
  bZu(e) {
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
  vZu(e) {
    for (const t of Array.from(this.Xd_)) {
      t(e);
    }
  }
  Qbu(e) {
    this.o4o.OnMoveStopCallback.Add(e);
  }
  jbu(e) {
    this.o4o.OnMoveStopCallback.Remove(e);
  }
  AddStopMoveCallback(e) {
    if (!this.Nbu.includes(e)) {
      this.Nbu.push(e);
    }
  }
  RemoveStopMoveCallback(e) {
    e = this.Nbu.indexOf(e);
    if (e !== -1) {
      this.Nbu.splice(e, 1);
    }
  }
  ClearStopMoveCallback() {
    this.Nbu.length = 0;
  }
  IZu() {
    for (const e of Array.from(this.Nbu)) {
      e();
    }
  }
  AddStopMoveCallbackWithEntity(e) {
    if (!this.Fbu.includes(e)) {
      this.Fbu.push(e);
    }
  }
  RemoveStopMoveCallbackWithEntity(e) {
    e = this.Fbu.indexOf(e);
    if (e !== -1) {
      this.Fbu.splice(e, 1);
    }
  }
  ClearStopMoveCallbacksWithEntity() {
    this.Fbu.length = 0;
  }
  EZu() {
    for (const e of Array.from(this.Fbu)) {
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
SceneItemMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(132)], SceneItemMoveComponent);
exports.SceneItemMoveComponent = SceneItemMoveComponent; //# sourceMappingURL=SceneItemMoveComponent.js.map