"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemSplineMoveTask = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const IUtil_1 = require("../../../UniverseEditor/Interface/IUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneItemMoveComponent_1 = require("../../NewWorld/SceneItem/Common/Component/SceneItemMoveComponent");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const SceneItemSplineMoveTaskUtils_1 = require("./SceneItemSplineMoveTaskUtils");
const SplineMoveTaskBase_1 = require("./SplineMoveTaskBase");
const MIN_SYNC_INTERVAL = 2500;
class SceneItemSplineMoveTask extends SplineMoveTaskBase_1.SplineMoveTaskBase {
  constructor(e, t) {
    super(e);
    this.SplineId = t;
    this.SplineComp = undefined;
    this.SplineData = undefined;
    this.ci1 = undefined;
    this.ui1 = undefined;
    this.di1 = false;
    this.JHr = false;
    this.nx = undefined;
    this.mi1 = false;
    this.yk1 = false;
    this.Sk1 = false;
    this.ICl = undefined;
    this.TCl = undefined;
    this.enh = undefined;
    this.B7 = undefined;
    this.aYu = 0;
    this.hYu = false;
    this.fi1 = 0;
    this.gi1 = () => {
      this.hYu = true;
    };
    this.Ci1 = () => {
      if (!(this.aYu >= 5)) {
        this.aYu = 5;
        this.EndTask(!this.hYu);
      }
    };
    this.Kd_ = false;
    this.$d_ = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 42, "[SceneItemSplineMoveTask] OnArrivePointIndexCallback", ["EntityId", this.EntityHandle.Entity?.Id], ["index", e]);
      }
      if (!this.Kd_) {
        this.Kd_ = true;
        if (this.SplineData?.Type === IComponent_1.ESplineType.ContinuesVariableSpeedMovement) {
          e = this.SplineData.Points[e].ConditionActions;
          if (e) {
            for (const t of e) {
              if (ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(t.Condition, undefined)) {
                TimerSystem_1.TimerSystem.Next(() => {
                  if (this.nx && t?.Action) {
                    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(t.Action, LevelGeneralContextDefine_1.GeneralContext.Copy(this.nx) ?? LevelGeneralContextDefine_1.EntityContext.Create(this.EntityHandle.Id));
                  }
                });
              }
            }
          }
        }
        this.Kd_ = false;
      }
    };
  }
  get IsEnableSplineMoveSync() {
    return this.di1;
  }
  get IsEnableMovementSync() {
    return this.JHr;
  }
  static Create(e, t) {
    var i = new SceneItemSplineMoveTask(e, t.SplineId);
    i.ci1 = t.SplineMoveConfig;
    i.di1 = t.EnableSplineMoveSync;
    i.JHr = t.EnableMovementSync;
    i.ui1 = t.SplineMoveRuntimeData ?? {};
    i.mi1 = t.NeedMoveToStartPoint;
    i.nx = t.Context ?? LevelGeneralContextDefine_1.EntityContext.Create(e.Id);
    i.B7 = t.Callback;
    if (i.di1 && i.JHr) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "[SceneItemSplineMoveTask.Create] 同时开启样条移动协议同步和移动同步可能会发生冲突，关闭移动同步", ["EntityId", i.EntityHandle.Id], ["SplineId", i.SplineId]);
      }
      i.JHr = false;
    }
    if (i.mi1 && i.di1) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "[SceneItemSplineMoveTask.Create] 开启缓动到样条起点后无法支持样条移动协议同步，关闭缓动到样条起点", ["EntityId", i.EntityHandle.Id], ["SplineId", i.SplineId]);
      }
      i.mi1 = false;
    }
    return i;
  }
  CheckSplineMoveConfigEqual(e) {
    var t = this.ci1;
    return (0, IUtil_1.deepEquals)(t, e);
  }
  OnStartTask() {
    var e;
    if (!(this.aYu >= 1)) {
      this.aYu = 1;
      if ((e = this.EntityHandle.Entity?.GetComponent(139))?.Valid) {
        if (this.Oih() && this.pi1() && this.vi1()) {
          if (this.IsEnableSplineMoveSync && e.ActorComp?.IsMoveAutonomousProxy) {
            ControllerHolder_1.ControllerHolder.SyncSplineMoveController.SendSyncSceneItemSplineMoveRunning(this.EntityHandle.CreatureDataId, this.SplineId, this.ui1.DistanceAloneSpline, this.ui1.CurPos, this.ui1.CurRot);
          }
          this.yi1();
        } else {
          this.EndTask(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 39, "[SceneItemSplineMoveTask.OnStartTask] 实体SceneItemMoveComponent not valid", ["EntityId", this.EntityHandle.Id]);
        }
        this.EndTask(false);
      }
    }
  }
  OnEndTask(e) {
    if (!(this.aYu >= 6)) {
      this.aYu = 6;
      if (this.enh) {
        for (var [, t] of this.enh) {
          if (t !== ResourceSystem_1.ResourceSystem.InvalidId) {
            ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t);
          }
        }
      }
      this.enh?.clear();
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
      const i = this.EntityHandle.Entity?.GetComponent(139);
      i?.StopMove();
      if (this.IsEnableSplineMoveSync) {
        const i = this.EntityHandle.Entity?.GetComponent(139);
        if (i?.ActorComp?.IsMoveAutonomousProxy) {
          this.lYu();
        }
      }
      i?.RemoveOnArrivePointCallback(this.$d_);
      this.B7?.(e);
    }
  }
  OnTickTask(e) {
    if (this.IsEnableSplineMoveSync && this.EntityHandle.Entity?.GetComponent(1)?.IsMoveAutonomousProxy && this.aYu === 4) {
      this.fi1 += e;
      if (!(this.fi1 < MIN_SYNC_INTERVAL)) {
        this.fi1 = 0;
        this._Yu();
      }
    }
  }
  lYu() {
    var e;
    var t = this.EntityHandle.Entity?.GetComponent(1);
    if (t?.IsMoveAutonomousProxy) {
      e = t.ActorLocationProxy;
      t = t.ActorRotationProxy;
      ControllerHolder_1.ControllerHolder.SyncSplineMoveController.SendSyncSceneItemSplineMoveEnd(this.EntityHandle.CreatureDataId, this.SplineId, undefined, e, t, this.hYu);
    }
  }
  _Yu() {
    var e;
    var t = this.EntityHandle.Entity?.GetComponent(139);
    var i = this.EntityHandle.Entity?.GetComponent(1);
    if (i?.IsMoveAutonomousProxy && t?.IsSplineMoving() && this.ui1) {
      t = t.GetDistanceAloneSpline();
      e = i.ActorLocationProxy;
      i = i.ActorRotationProxy;
      if (this.ui1.DistanceAloneSpline === undefined || !this.ui1.CurPos || !this.ui1.CurRot || !SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CheckSplineMoveDistanceNearlyEqual(this.ui1.DistanceAloneSpline, t) || !SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CheckSplineMoveLocationNearlyEqual(this.ui1.CurPos, e) || !SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CheckSplineMoveRotatorNearlyEqual(this.ui1.CurRot, i)) {
        this.ui1.DistanceAloneSpline = t;
        this.ui1.CurPos ||= Vector_1.Vector.Create();
        this.ui1.CurPos.DeepCopy(e);
        this.ui1.CurRot ||= Rotator_1.Rotator.Create();
        this.ui1.CurRot.DeepCopy(i);
        ControllerHolder_1.ControllerHolder.SyncSplineMoveController.SendSyncSceneItemSplineMoveRunning(this.EntityHandle.CreatureDataId, this.SplineId, this.ui1.DistanceAloneSpline, this.ui1.CurPos, this.ui1.CurRot);
      }
    }
  }
  Si1() {
    if (!EventSystem_1.EventSystem.HasWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveBroken, this.gi1)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.EntityHandle.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveBroken, this.gi1);
    }
    if (!EventSystem_1.EventSystem.HasWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStopped, this.Ci1)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.EntityHandle.Entity, EventDefine_1.EEventName.OnSceneItemSplineMoveStopped, this.Ci1);
    }
  }
  Oih() {
    var e = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(this.SplineId);
    if (!e) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "[SceneItemSplineMoveTask.InitSplineData] 无法找到Spline EntityData", ["EntityId", this.EntityHandle.Id], ["SplineId", this.SplineId]);
      }
      return false;
    }
    var t = (0, IComponent_1.getComponent)(e.ComponentsData, "SplineComponent");
    if (!t) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "[SceneItemSplineMoveTask.InitSplineData] 无法找到SplineComponent配置", ["EntityId", this.EntityHandle.Id], ["SplineId", this.SplineId]);
      }
      return false;
    }
    t = t.Option;
    if (t.Type !== IComponent_1.ESplineType.Patrol && t.Type !== IComponent_1.ESplineType.ContinuesVariableSpeedMovement) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemSplineMoveTask.InitSplineData] SplineComp配置类型不是Patrol或ContinuesVariableSpeedMovement", ["EntityId", this.EntityHandle.Id], ["SplineId", this.SplineId]);
      }
      return false;
    }
    this.SplineData = t;
    this.SplineComp = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(this.SplineId, this.EntityHandle.PbDataId);
    t = ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(this.SplineId);
    if (t?.IsValid()) {
      e = Vector_1.Vector.Create(e.Transform?.Pos.X ?? 0, e.Transform?.Pos.Y ?? 0, e.Transform?.Pos.Z ?? 0);
      t.D_K2_SetActorLocation(e.ToUeVector(), false, undefined, false);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemSplineMoveTask.InitSplineData] 获取的spline actor非法", ["EntityId", this.EntityHandle.Id], ["SplineId", this.SplineId]);
      }
      return false;
    }
  }
  pi1() {
    var e;
    return !!this.SplineComp && (this.ui1 ||= {}, this.ui1.DistanceAloneSpline === undefined || this.ui1.CurPos ? this.ui1.CurPos && this.ui1.DistanceAloneSpline === undefined ? (e = this.SplineComp.D_FindInputKeyClosestToWorldLocation(this.ui1.CurPos.ToUeVector()), this.ui1.DistanceAloneSpline = this.SplineComp.GetDistanceAlongSplineAtSplineInputKey(e)) : (this.ui1.DistanceAloneSpline = 0, this.ui1.CurPos = Vector_1.Vector.Create(this.SplineComp.D_GetLocationAtDistanceAlongSpline(0, 1))) : this.ui1.CurPos = Vector_1.Vector.Create(this.SplineComp.D_GetLocationAtDistanceAlongSpline(this.ui1.DistanceAloneSpline, 1)), true);
  }
  yi1() {
    if (!(this.aYu >= 2)) {
      this.aYu = 2;
      if (this.EntityHandle?.Valid) {
        const n = this.EntityHandle.Entity.GetComponent(139);
        if (n?.Valid) {
          if (this.ICl) {
            this.enh = new Map();
            this.TCl = new Map();
            for (const o of this.ICl) {
              var e;
              if (!this.TCl.has(o) && (e = ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.CurveFloat, e => {
                this.TCl?.set(o, e);
                this.enh?.delete(o);
                this.Mk1();
              })) !== ResourceSystem_1.ResourceSystem.InvalidId && !this.TCl?.has(o)) {
                this.enh.set(o, e);
              }
            }
          }
          if (this.mi1) {
            var t = this.SplineData?.Type === IComponent_1.ESplineType.Patrol ? this.SplineData.Points[0].MoveSpeed : 0;
            if (t <= 0) {
              this.yk1 = true;
            } else {
              var i = Vector_1.Vector.Create(this.SplineComp.D_GetLocationAtSplinePoint(0, 1));
              var s = Vector_1.Vector.Create(this.EntityHandle.Entity.GetComponent(1).ActorLocationProxy);
              var s = Vector_1.Vector.Dist(i, s);
              const h = () => {
                n.RemoveStopMoveCallback(h);
                this.yk1 = true;
                TimerSystem_1.TimerSystem.Next(() => {
                  this.Mk1();
                });
              };
              n.AddStopMoveCallback(h);
              n.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(i, s / t));
            }
          } else {
            this.yk1 = true;
          }
          this.Sk1 = true;
          this.Mk1();
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 39, "[SceneItemSplineMoveTask.LoadAssetAndStartMove] 实体SceneItemMoveComponent not valid", ["EntityId", this.EntityHandle.Id]);
          }
          this.EndTask(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 39, "[SceneItemSplineMoveTask.LoadAssetAndStartMove 实体不存在");
        }
        this.EndTask(false);
      }
    }
  }
  Mk1() {
    if (!!this.Sk1 && !!this.yk1 && (!this.enh || !(this.enh.size > 0)) && this.TCl?.size === this.ICl?.size) {
      this.Sk1 = false;
      this.Mi1();
    }
  }
  Mi1() {
    var e;
    var t;
    if (!(this.aYu >= 4)) {
      this.aYu = 4;
      if ((e = this.EntityHandle.Entity.GetComponent(139))?.Valid) {
        if (t = this.Ei1(this.SplineComp, this.ci1, this.ui1)) {
          if (e.IsMoving) {
            e.StopMove();
          }
          e.ClearOnArrivePointCallbacks();
          e.AddOnArrivePointCallback(this.$d_);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("SceneItem", 39, "[SceneItemSplineMoveTask.StartMoveWithSpline] 样条移动开始", ["EntityId", this.EntityHandle.Id], ["PbDataId]", this.EntityHandle.PbDataId], ["MoveParam", t]);
          }
          if (e.StartSplineMoveAtConstantTimeImplement(t, undefined, this.JHr)) {
            this.Si1();
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneItem", 39, "[SceneItemSplineMoveTask.StartMoveWithSpline] 样条移动开始失败", ["EntityId", this.EntityHandle.Id], ["PbDataId]", this.EntityHandle.PbDataId], ["MoveParam", t]);
            }
            this.EndTask(false);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 39, "[SceneItemSplineMoveTask.StartMoveWithSpline] 创建SplineMoveParam失败", ["EntityId", this.EntityHandle.Id]);
          }
          this.EndTask(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 31, "[SceneItemSplineMoveTask.StartMoveWithSpline] 实体SceneItemMoveComponent not valid", ["EntityId", this.EntityHandle.Id]);
        }
        this.EndTask(false);
      }
    }
  }
  Ei1(e, t, i) {
    var s;
    if (e?.IsValid()) {
      s = new SceneItemMoveComponent_1.SceneItemSplineMoveAtConstantTimeParam(e);
      if (SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseGeneralConfigAndRuntimeDataToSplineMoveParam(e, t, i, this.TCl, s)) {
        return s;
      } else {
        return undefined;
      }
    }
  }
  vi1() {
    if (this.ICl) {
      this.ICl.clear();
    } else {
      this.ICl = new Set();
    }
    if (this.ci1?.GlobalConfig) {
      if (this.ci1.GlobalConfig.Type === 1 && this.ci1.GlobalConfig.TimeDisCurve) {
        this.ICl.add(this.ci1.GlobalConfig.TimeDisCurve);
      }
    } else if (this.ci1?.PointConfigs) {
      for (const e of this.ci1.PointConfigs) {
        if (e.Type === 1 && e.TimeDisCurve) {
          this.ICl.add(e.TimeDisCurve);
        }
      }
    }
    return true;
  }
}
exports.SceneItemSplineMoveTask = SceneItemSplineMoveTask;
//# sourceMappingURL=SceneItemSplineMoveTask.js.map