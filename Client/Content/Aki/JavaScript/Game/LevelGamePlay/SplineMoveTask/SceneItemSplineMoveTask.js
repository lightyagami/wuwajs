"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SceneItemSplineMoveTask = void 0;
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  IUtil_1 = require("../../../UniverseEditor/Interface/IUtil"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneItemMoveComponent_1 = require("../../NewWorld/SceneItem/Common/Component/SceneItemMoveComponent"),
  LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine"),
  SceneItemSplineMoveTaskUtils_1 = require("./SceneItemSplineMoveTaskUtils"),
  SplineMoveTaskBase_1 = require("./SplineMoveTaskBase"),
  MIN_SYNC_INTERVAL = 5e3;
class SceneItemSplineMoveTask extends SplineMoveTaskBase_1.SplineMoveTaskBase {
  constructor(e, t) {
    super(e), this.SplineId = t, this.SplineComp = void 0, this.SplineData = void 0, this.$t1 = void 0, this.Wt1 = void 0, this.Qt1 = !1, this.JHr = !1, this.nx = void 0, this.Kt1 = !1, this.jB1 = !1, this.HB1 = !1, this.ICl = void 0, this.TCl = void 0, this.enh = void 0, this.B7 = void 0, this.Xt1 = 0, this.Yt1 = () => {
      this.EndTask(!1)
    }, this.zt1 = () => {
      this.EndTask(!0)
    }, this.Kd_ = !1, this.$d_ = e => {
      if (Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 42, "[SceneItemSplineMoveTask] OnArrivePointIndexCallback", ["EntityId", this.EntityHandle.Entity?.Id], ["index", e]), !this.Kd_) {
        if (this.Kd_ = !0, this.SplineData?.Type === IComponent_1.ESplineType.ContinuesVariableSpeedMovement) {
          e = this.SplineData.Points[e].ConditionActions;
          if (e)
            for (const t of e) ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(t.Condition, void 0) && TimerSystem_1.TimerSystem.Next(() => {
              this.nx && t?.Action && ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(t.Action, LevelGeneralContextDefine_1.GeneralContext.Copy(this.nx) ?? LevelGeneralContextDefine_1.EntityContext.Create(this.EntityHandle.Id))
            })
        }
        this.Kd_ = !1
      }
    }
  }
  get IsEnableSplineMoveSync() {
    return this.Qt1
  }
  get IsEnableMovementSync() {
    return this.JHr
  }
  static Create(e, t) {
    var i = new SceneItemSplineMoveTask(e, t.SplineId);
    return i.$t1 = t.SplineMoveConfig, i.Qt1 = t.EnableSplineMoveSync, i.JHr = t.EnableMovementSync, i.Wt1 = t.SplineMoveRuntimeData ?? {}, i.Kt1 = t.NeedMoveToStartPoint, i.nx = t.Context ?? LevelGeneralContextDefine_1.EntityContext.Create(e.Id), i.B7 = t.Callback, i.Qt1 && i.JHr && (Log_1.Log.CheckWarn() && Log_1.Log.Warn("SceneItem", 39, "[SceneItemSplineMoveTask.Create] 同时开启样条移动协议同步和移动同步可能会发生冲突，关闭移动同步", ["EntityId", i.EntityHandle.Id], ["SplineId", i.SplineId]), i.JHr = !1), i.Kt1 && i.Qt1 && (Log_1.Log.CheckWarn() && Log_1.Log.Warn("SceneItem", 39, "[SceneItemSplineMoveTask.Create] 开启缓动到样条起点后无法支持样条移动协议同步，关闭缓动到样条起点", ["EntityId", i.EntityHandle.Id], ["SplineId", i.SplineId]), i.Kt1 = !1), i
  }
  CheckSplineMoveConfigEqual(e) {
    var t = this.$t1;
    return (0, IUtil_1.deepEquals)(t, e)
  }
  OnStartTask() {
    var e = this.EntityHandle.Entity?.GetComponent(128);
    e?.Valid ? this.Oih() && this.Jt1() && this.Zt1() ? (this.IsEnableSplineMoveSync && e.ActorComp?.IsMoveAutonomousProxy && ControllerHolder_1.ControllerHolder.SyncSplineMoveController.SendSyncSceneItemSplineMoveRunning(this.EntityHandle.CreatureDataId, this.SplineId, this.Wt1.DistanceAloneSpline, this.Wt1.CurPos), this.ei1()) : this.EndTask(!1) : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 39, "[SceneItemSplineMoveTask.OnStartTask] 实体SceneItemMoveComponent not valid", ["EntityId", this.EntityHandle.Id]), this.EndTask(!1))
  }
  OnEndTask(e) {
    var t, i, s = this.EntityHandle.Entity?.GetComponent(128);
    if (this.enh)
      for (var [, n] of this.enh) n !== ResourceSystem_1.ResourceSystem.InvalidId && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(n);
    this.enh?.clear(), EventSystem_1.EventSystem.RemoveAllTargetUseKey(this), this.IsEnableSplineMoveSync && s?.ActorComp?.IsMoveAutonomousProxy && (t = s?.GetDistanceAloneSpline() ?? 0, i = s?.ActorComp?.ActorLocationProxy, ControllerHolder_1.ControllerHolder.SyncSplineMoveController.SendSyncSceneItemSplineMoveEnd(this.EntityHandle.CreatureDataId, this.SplineId, t, i, !e)), s?.StopMove(), this.B7?.(e)
  }
  OnTickTask(e) {
    var t;
    this.IsEnableSplineMoveSync && (this.Xt1 += e, this.Xt1 < MIN_SYNC_INTERVAL || (this.Xt1 = 0, e = this.EntityHandle.Entity?.GetComponent(128), (t = this.EntityHandle.Entity?.GetComponent(1))?.IsMoveAutonomousProxy && e?.IsSplineMoving() && this.Wt1 && (e = e.GetDistanceAloneSpline(), t = t.ActorLocationProxy, void 0 !== this.Wt1.DistanceAloneSpline && this.Wt1.CurPos && MathUtils_1.MathUtils.IsNearlyEqual(this.Wt1.DistanceAloneSpline, e) && this.Wt1.CurPos.Equals(t) || (this.Wt1.DistanceAloneSpline = e, this.Wt1.CurPos || (this.Wt1.CurPos = Vector_1.Vector.Create()), this.Wt1.CurPos.DeepCopy(t), ControllerHolder_1.ControllerHolder.SyncSplineMoveController.SendSyncSceneItemSplineMoveRunning(this.EntityHandle.CreatureDataId, this.SplineId, this.Wt1.DistanceAloneSpline, this.Wt1.CurPos)))))
  }
  ti1() {
    EventSystem_1.EventSystem.HasWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveBroken, this.Yt1) || EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.EntityHandle.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveBroken, this.Yt1), EventSystem_1.EventSystem.HasWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStopped, this.zt1) || EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.EntityHandle.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStopped, this.zt1)
  }
  Oih() {
    var e = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(this.SplineId);
    if (!e) return Log_1.Log.CheckWarn() && Log_1.Log.Warn("SceneItem", 39, "[SceneItemSplineMoveTask.InitSplineData] 无法找到Spline EntityData", ["EntityId", this.EntityHandle.Id], ["SplineId", this.SplineId]), !1;
    var t = (0, IComponent_1.getComponent)(e.ComponentsData, "SplineComponent");
    if (!t) return Log_1.Log.CheckWarn() && Log_1.Log.Warn("SceneItem", 39, "[SceneItemSplineMoveTask.InitSplineData] 无法找到SplineComponent配置", ["EntityId", this.EntityHandle.Id], ["SplineId", this.SplineId]), !1;
    t = t.Option;
    if (t.Type !== IComponent_1.ESplineType.Patrol && t.Type !== IComponent_1.ESplineType.ContinuesVariableSpeedMovement) return Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "[SceneItemSplineMoveTask.InitSplineData] SplineComp配置类型不是Patrol或ContinuesVariableSpeedMovement", ["EntityId", this.EntityHandle.Id], ["SplineId", this.SplineId]), !1;
    this.SplineData = t, this.SplineComp = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(this.SplineId, this.EntityHandle.PbDataId);
    t = ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(this.SplineId);
    return t?.IsValid() ? (e = Vector_1.Vector.Create(e.Transform?.Pos.X ?? 0, e.Transform?.Pos.Y ?? 0, e.Transform?.Pos.Z ?? 0), t.D_K2_SetActorLocation(e.ToUeVector(), !1, void 0, !1), !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "[SceneItemSplineMoveTask.InitSplineData] 获取的spline actor非法", ["EntityId", this.EntityHandle.Id], ["SplineId", this.SplineId]), !1)
  }
  Jt1() {
    var e;
    return !!this.SplineComp && (this.Wt1 || (this.Wt1 = {}), void 0 === this.Wt1.DistanceAloneSpline || this.Wt1.CurPos ? this.Wt1.CurPos && void 0 === this.Wt1.DistanceAloneSpline ? (e = this.SplineComp.D_FindInputKeyClosestToWorldLocation(this.Wt1.CurPos.ToUeVector()), this.Wt1.DistanceAloneSpline = this.SplineComp.GetDistanceAlongSplineAtSplineInputKey(e)) : (this.Wt1.DistanceAloneSpline = 0, this.Wt1.CurPos = Vector_1.Vector.Create(this.SplineComp.D_GetLocationAtDistanceAlongSpline(0, 1))) : this.Wt1.CurPos = Vector_1.Vector.Create(this.SplineComp.D_GetLocationAtDistanceAlongSpline(this.Wt1.DistanceAloneSpline, 1)), !0)
  }
  ei1() {
    if (this.EntityHandle?.Valid) {
      var e, t, i, s, n = this.EntityHandle.Entity.GetComponent(128);
      if (n?.Valid) {
        if (this.ICl) {
          this.enh = new Map, this.TCl = new Map;
          for (const o of this.ICl) this.TCl.has(o) || (e = ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.CurveFloat, e => {
            this.TCl?.set(o, e), this.enh?.delete(o), this.$B1()
          })) === ResourceSystem_1.ResourceSystem.InvalidId || this.TCl?.has(o) || this.enh.set(o, e)
        }!this.Kt1 || (t = this.SplineData?.Type === IComponent_1.ESplineType.Patrol ? this.SplineData.Points[0].MoveSpeed : 0) <= 0 ? this.jB1 = !0 : (i = Vector_1.Vector.Create(this.SplineComp.D_GetLocationAtSplinePoint(0, 1)), s = Vector_1.Vector.Create(this.EntityHandle.Entity.GetComponent(1).ActorLocationProxy), s = Vector_1.Vector.Dist(i, s), n.AddStopMoveCallback(() => {
          this.jB1 = !0, this.$B1()
        }), n.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(i, s / t))), this.HB1 = !0, this.$B1()
      } else Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 39, "[SceneItemSplineMoveTask.LoadAssetAndStartMove] 实体SceneItemMoveComponent not valid", ["EntityId", this.EntityHandle.Id]), this.EndTask(!1)
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Level", 39, "[SceneItemSplineMoveTask.LoadAssetAndStartMove 实体不存在"), this.EndTask(!1)
  }
  $B1() {
    !this.HB1 || !this.jB1 || this.enh && 0 < this.enh.size || this.TCl?.size !== this.ICl?.size || (this.HB1 = !1, this.ii1())
  }
  ii1() {
    var e, t = this.EntityHandle.Entity.GetComponent(128);
    t?.Valid ? (e = this.ri1(this.SplineComp, this.$t1, this.Wt1)) ? (t.IsMoving && t.StopMove(), t.RemoveAllOnArrivePointCallbacks(), t.AddOnArrivePointCallback(this.$d_), Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneItem", 39, "[SceneItemSplineMoveTask.StartMoveWithSpline] 样条移动开始", ["EntityId", this.EntityHandle.Id], ["PbDataId]", this.EntityHandle.PbDataId], ["MoveParam", e]), t.StartSplineMoveAtConstantTimeImplement(e, void 0, this.JHr) ? this.ti1() : (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "[SceneItemSplineMoveTask.StartMoveWithSpline] 样条移动开始失败", ["EntityId", this.EntityHandle.Id], ["PbDataId]", this.EntityHandle.PbDataId], ["MoveParam", e]), this.EndTask(!1))) : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 39, "[SceneItemSplineMoveTask.StartMoveWithSpline] 创建SplineMoveParam失败", ["EntityId", this.EntityHandle.Id]), this.EndTask(!1)) : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 31, "[SceneItemSplineMoveTask.StartMoveWithSpline] 实体SceneItemMoveComponent not valid", ["EntityId", this.EntityHandle.Id]), this.EndTask(!1))
  }
  ri1(e, t, i) {
    var s;
    if (e?.IsValid()) return s = new SceneItemMoveComponent_1.SceneItemSplineMoveAtConstantTimeParam(e), SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseGeneralConfigAndRuntimeDataToSplineMoveParam(e, t, i, this.TCl, s) ? s : void 0
  }
  Zt1() {
    if (this.ICl ? this.ICl.clear() : this.ICl = new Set, this.$t1?.GlobalConfig) 1 === this.$t1.GlobalConfig.Type && this.$t1.GlobalConfig.TimeDisCurve && this.ICl.add(this.$t1.GlobalConfig.TimeDisCurve);
    else if (this.$t1?.PointConfigs)
      for (const e of this.$t1.PointConfigs) 1 === e.Type && e.TimeDisCurve && this.ICl.add(e.TimeDisCurve);
    return !0
  }
}
exports.SceneItemSplineMoveTask = SceneItemSplineMoveTask;
//# sourceMappingURL=SceneItemSplineMoveTask.js.map