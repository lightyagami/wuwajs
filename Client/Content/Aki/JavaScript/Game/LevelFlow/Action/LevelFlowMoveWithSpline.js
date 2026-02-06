"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowMoveWithSpline = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGameplayActionsDefine_1 = require("../../LevelGamePlay/LevelGameplayActionsDefine");
const CharacterSplineMoveTask_1 = require("../../LevelGamePlay/SplineMoveTask/CharacterSplineMoveTask");
const SceneItemSplineMoveTaskUtils_1 = require("../../LevelGamePlay/SplineMoveTask/SceneItemSplineMoveTaskUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowMoveWithSpline extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.sDe = undefined;
    this.OPt = undefined;
    this.CXd = false;
    this.E0 = 0;
    this.YLe = false;
    this.wDe = 0;
    this.UCl = e => {
      if (!this.CXd) {
        this.FinishExecute(true);
      }
    };
    this.DCl = e => {
      if (!this.CXd) {
        this.FinishExecute(e);
      }
    };
    this.cwl = e => {
      if (!this.CXd) {
        this.FinishExecute(e);
      }
    };
    this.zpe = (e, t) => {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelEvent", 42, "[LevelEventMoveWithSpline]检测到移动实体被销毁，直接设置节点执行成功");
      }
      this.FinishExecute(true);
    };
  }
  Init(e, t) {
    this.OPt = e;
    this.CXd = t;
    return this;
  }
  OnExecute() {
    if (this.OPt) {
      switch (this.OPt.MoveTarget.Type) {
        case "Entity":
          this.YLe = false;
          this.E0 = this.OPt.MoveTarget.EntityId;
          break;
        case "Player":
          this.YLe = true;
          this.ExecuteWhenEntitiesReady();
          return;
      }
      if (this.E0) {
        this.CreateWaitEntityTask(this.E0);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 7, "[MoveWithSpline]配置的目标Id无效", ["PbDataId", this.E0]);
        }
        this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  ExecuteWhenEntitiesReady() {
    var e;
    var t;
    var i;
    var o;
    var n;
    if (this.YLe) {
      this.sDe = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    } else {
      this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.E0);
    }
    if (this.sDe && !EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.AddWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
    if (this.sDe?.IsInit) {
      e = this.sDe.Entity.GetComponent(50);
      i = this.sDe.Entity.GetComponent(1);
      if (e?.IsAiDriver) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelEvent", 7, "当前实体正在由行为树AI驱动，请检查需求设计是否合理（沿着样条移动）", ["PbDataId", this.E0], ["Name", i.Owner.GetName()]);
        }
        this.FinishExecute(false);
      } else {
        e = this.OPt.SplineEntityId;
        if (i = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e)) {
          if (t = (0, IComponent_1.getComponent)(i.ComponentsData, "SplineComponent")) {
            i = Vector_1.Vector.Create(i.Transform?.Pos.X ?? 0, i.Transform?.Pos.Y ?? 0, i.Transform?.Pos.Z ?? 0);
            if (t.Option.Type !== IComponent_1.ESplineType.Patrol && t.Option.Type !== IComponent_1.ESplineType.ContinuesVariableSpeedMovement) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Level", 31, "[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] SplineComponent配置类型不是patrol或ContinuesVariableSpeedMovement", ["SplineEntityId", e]);
              }
              this.FinishExecute(false);
            } else {
              this.wDe = this.sDe.Entity.GetComponent(0).GetPbDataId();
              o = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(e, this.wDe);
              if ((n = ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(e))?.IsValid()) {
                n.D_K2_SetActorLocation(i.ToUeVector(), false, undefined, false);
                this.NDe(o, t.Option);
              } else {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Level", 31, "[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] 获取的spline actor非法", ["SplineEntityId", e]);
                }
                this.FinishExecute(false);
              }
            }
          } else {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Level", 31, "[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] 无法找到SplineComponent配置", ["SplineEntityId", e]);
            }
            this.FinishExecute(false);
          }
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Level", 31, "[LevelEventMoveWithSpline.ExecuteWhenEntitiesReady] 无法找到Spline Entity", ["SplineEntityId", e]);
          }
          this.FinishExecute(false);
        }
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelEvent", 7, "[MoveWithSpline]实体无效", ["PbDataId", this.E0]);
      }
      this.FinishExecute(false);
    }
  }
  NDe(t, e) {
    var i = t.GetNumberOfSplinePoints();
    var o = this.OPt.StartPointIndex ? MathUtils_1.MathUtils.Clamp(this.OPt.StartPointIndex, 0, i - 1) : 0;
    var n = this.OPt.EndPointIndex ? MathUtils_1.MathUtils.Clamp(this.OPt.EndPointIndex, 0, i - 1) : i - 1;
    var s = [];
    for (let e = o; e <= n; ++e) {
      s.push(Vector_1.Vector.Create(t.D_GetLocationAtSplinePoint(e, 1)));
    }
    if (this.OPt.IsForceToFirstPoint && (i = s[0], o = t.GetRotationAtSplinePoint(o, 1), i = {
      TelePortConfig: {
        TargetPos: {
          X: i.X,
          Y: i.Y,
          Z: i.Z,
          A: o.Yaw
        },
        Type: IAction_1.ETeleportType.FixedPos
      }
    }, (o = new LevelGameplayActionsDefine_1.CommonActionInfo()).Name = "SetPlayerPos", o.Params = i, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Level", 31, "[LevelEventMoveWithSpline.SetMoveAction] SetPlayerPos已为服务端行为，无法执行", ["ActionInfo", o]);
    }
    if (this.YLe && (this.sDe.Entity.GetComponent(3).ClearInput(), (i = this.sDe.Entity.GetComponent(67)).ClearMoveVectorCache(), i.SetActive(false), o = this.sDe.Entity.GetComponent(43))) {
      o.EndOwnerAndFollowSkills();
    }
    this.ODe(t, e);
  }
  ODe(e, t) {
    switch (this.sDe.Entity.GetComponent(0)?.GetEntityType()) {
      case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
        this.SceneItemMoveAlongPath(e, t);
        break;
      case Protocol_1.Aki.Protocol.kks.HI_:
        this.VehicleMoveAlongPath(e, t);
        break;
      default:
        this.CharacterMoveAlongPath(e, t);
    }
  }
  SceneItemMoveAlongPath(e, t) {
    var i = this.sDe?.Entity?.GetComponent(139);
    if (i) {
      switch (t?.Type) {
        case IComponent_1.ESplineType.Patrol:
        case IComponent_1.ESplineType.ContinuesVariableSpeedMovement:
          var o = SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.CreateDefaultGeneralConfig();
          SceneItemSplineMoveTaskUtils_1.SceneItemSplineMoveTaskUtils.ParseSplineDataToGeneralConfig(t, o);
          o.IsLookDir = this.OPt?.IsLookDir ?? false;
          o.SplineMoveRange = {
            Type: 0,
            StartIndex: this.OPt?.StartPointIndex ?? -1,
            EndIndex: this.OPt?.EndPointIndex ?? -1
          };
          i.StartSplineMoveTask({
            SplineId: this.OPt.SplineEntityId,
            SplineMoveConfig: o,
            Callback: this.CXd ? undefined : this.DCl,
            EnableSplineMoveSync: false,
            EnableMovementSync: !this.CXd,
            SplineMoveRuntimeData: {},
            NeedMoveToStartPoint: t.Type === IComponent_1.ESplineType.Patrol
          });
          if (this.CXd) {
            this.FinishExecute(true);
          }
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Level", 39, "[LevelEventMoveWithSpline.SceneItemMoveAlongPath] 场景物件样条移动暂不支持该样条类型");
          }
          this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  CharacterMoveAlongPath(e, t) {
    if (this.sDe?.Valid) {
      if (t?.Type !== IComponent_1.ESplineType.Patrol) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 39, "[LevelEventMoveWithSpline.CharacterMoveAlongPath] 角色样条移动暂不支持该样条类型");
        }
        this.FinishExecute(false);
      } else {
        if (ControllerHolder_1.ControllerHolder.SplineMoveTaskController.GetEntityCurSplineMoveTask(this.sDe.Id)) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Level", 39, "CharacterMoveComponent 样条移动任务未结束时开始新任务，清理旧任务", ["EntityId", this.sDe.Id]);
          }
          ControllerHolder_1.ControllerHolder.SplineMoveTaskController.EndEntityTasks(this.sDe.Id);
        }
        CharacterSplineMoveTask_1.CharacterSplineMoveTask.Create(this.sDe, {
          Spline: e,
          SplineData: t,
          EventParam: this.OPt,
          NoSyncPoint: this.CXd,
          Callback: this.CXd ? undefined : this.UCl
        }).StartTask();
        if (this.CXd) {
          this.FinishExecute(true);
        }
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 39, "[LevelEventMoveWithSpline.CharacterMoveAlongPath] EntityHandle非Valid");
      }
      this.FinishExecute(false);
    }
  }
  VehicleMoveAlongPath(e, t) {
    var i = this.OPt?.SplineEntityId;
    var o = this.sDe?.Entity;
    if (i && (o = o && o.GetComponent(249))) {
      o.MoveAlongPath({
        SplineId: i,
        SimulateRotation: this.OPt?.IsFollowStrictly,
        ForceToFirstPoint: !!this.OPt?.IsForceToFirstPoint,
        StartFromNearest: true,
        KeepForward: this.OPt?.IsLookDir,
        OnMoveEndHandle: this.CXd ? undefined : this.cwl
      });
      if (this.CXd) {
        this.FinishExecute(true);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  OnComplete() {
    if (this.sDe && EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
    var e;
    var t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataIdByPbDataId(this.E0);
    if (!this.YLe && t) {
      (e = Protocol_1.Aki.Protocol.f1s.create()).F4n = MathUtils_1.MathUtils.NumberToLong(t);
      Net_1.Net.Call(22395, e, e => {
        if (e && e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.BEs, 21000);
        }
      });
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["EntityId", this.E0], ["SplineEntityId", this.OPt?.SplineEntityId]);
    }
  }
}
exports.LevelFlowMoveWithSpline = LevelFlowMoveWithSpline;
//# sourceMappingURL=LevelFlowMoveWithSpline.js.map