"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSceneItemMove = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSceneItemMove extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
    this.CRe = undefined;
    this.nIn = e => {
      this.CRe?.RemoveStopMoveCallbackWithEntity(this.nIn);
      if (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.OnSceneItemMoveBroken, this.nIn)) {
        EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnSceneItemMoveBroken, this.nIn);
      }
      if (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.OnSceneItemMoveBroken, ControllerHolder_1.ControllerHolder.SceneItemMoveController.OnStopCallback)) {
        EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnSceneItemMoveBroken, ControllerHolder_1.ControllerHolder.SceneItemMoveController.OnStopCallback);
      }
      this.FinishExecute(true);
    };
  }
  ExecuteInGm(e, t, i) {
    if (e) {
      var s = e;
      var n = s.EntityId;
      var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n);
      if (n?.Valid) {
        var o = n.Entity?.GetComponent(0);
        if (!o?.IsPlayer()) {
          o = n.Entity?.GetComponent(1);
          if (o) {
            var r = Vector_1.Vector.Create();
            switch (s.MoveConfig.Type) {
              case IAction_1.EMoveSceneItemType.MoveToPoint:
                r.FromConfigVector(s.MoveConfig.Point);
                break;
              case IAction_1.EMoveSceneItemType.MoveToRelativePosition:
                var a = ModelManager_1.ModelManager.CreatureModel?.GetEntityData(s.EntityId)?.Transform;
                if (!a) {
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("Event", 39, "Entity找不到EntityData配置的Transform", ["PbDataId", s.EntityId]);
                  }
                  this.FinishExecute(false);
                  return;
                }
                r.FromConfigVector(s.MoveConfig.Point);
                MathUtils_1.MathUtils.CommonTempRotator.Set(a.Rot?.Y ?? 0, a.Rot?.Z ?? 0, a.Rot?.X ?? 0);
                MathUtils_1.MathUtils.CommonTempRotator.Quaternion(MathUtils_1.MathUtils.CommonTempQuat);
                MathUtils_1.MathUtils.CommonTempVector.Set(a.Pos.X ?? 0, a.Pos.Y ?? 0, a.Pos.Z ?? 0);
                MathUtils_1.MathUtils.CommonTempQuat.RotateVector(r, r);
                MathUtils_1.MathUtils.CommonTempVector.Addition(r, r);
                break;
              case IAction_1.EMoveSceneItemType.CycleMoveToPoints:
                this.ExecuteNew(e, t);
                return;
            }
            o.SetActorLocation(r.ToUeVector(), "LevelEventSceneItemMove:Gm推进", false);
          }
        }
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 39, "[LevelEventCharacterMove] 参数不合法");
      }
      this.FinishExecute(false);
    }
  }
  ExecuteNew(e, t) {
    if (e) {
      this.OPt = e;
      this.CreateWaitEntityTask(this.OPt.EntityId);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 33, "参数配置错误");
      }
      this.FinishExecute(false);
    }
  }
  ExecuteWhenEntitiesReady() {
    if (this.OPt) {
      var e = this.OPt.EntityId;
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
      if (t?.Valid) {
        var i = t.Entity.GetComponent(137);
        this.CRe = i;
        switch (this.OPt.MoveConfig.Type) {
          case IAction_1.EMoveSceneItemType.MoveToPoint:
            this.sIn(this.OPt, t);
            break;
          case IAction_1.EMoveSceneItemType.MoveToRelativePosition:
            this.k4l(this.OPt, t);
            break;
          case IAction_1.EMoveSceneItemType.CycleMoveToPoints:
            this.aIn(this.OPt, t);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 33, "实体不合法", ["entityId", e]);
        }
        this.FinishExecute(false);
      }
    }
  }
  sIn(e, t) {
    var i;
    var s = e.MoveConfig;
    if (s) {
      if (this.CRe?.Valid) {
        if (e.StopBeforeMove) {
          this.CRe.StopMove();
        }
        i = [Vector_1.Vector.Create(t.Entity.GetComponent(1).ActorLocationProxy), s.Point];
        s = s.MoveMotion ?? {
          Type: IAction_1.EMoveMotion.UniformMotion,
          Time: 0
        };
        ControllerHolder_1.ControllerHolder.SceneItemMoveController.AddSceneItemMove(t.Entity, i, false, s, 0);
        if (this.IsAsync) {
          this.FinishExecute(true);
        } else {
          EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.OnSceneItemMoveBroken, this.nIn);
          this.CRe.ClearStopMoveCallbacksWithEntity();
          this.CRe.AddStopMoveCallbackWithEntity(this.nIn);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 31, "Entity找不到SceneItemMoveComponent", ["entityId", e.EntityId]);
        }
        this.FinishExecute(false);
      }
    }
  }
  k4l(e, t) {
    var i;
    var s;
    var n;
    var o = e.MoveConfig;
    if (o) {
      if (this.CRe?.Valid) {
        if (n = ModelManager_1.ModelManager.CreatureModel?.GetEntityData(e.EntityId)?.Transform) {
          if (e.StopBeforeMove) {
            this.CRe.StopMove();
          }
          s = Transform_1.Transform.Create();
          MathUtils_1.MathUtils.CommonTempVector.Set(n.Pos.X ?? 0, n.Pos.Y ?? 0, n.Pos.Z ?? 0);
          s.SetLocation(MathUtils_1.MathUtils.CommonTempVector);
          MathUtils_1.MathUtils.CommonTempRotator.Set(n.Rot?.Y ?? 0, n.Rot?.Z ?? 0, n.Rot?.X ?? 0);
          s.SetRotation(MathUtils_1.MathUtils.CommonTempRotator.Quaternion());
          MathUtils_1.MathUtils.CommonTempVector.Set(n.Scale?.X ?? 1, n.Scale?.Y ?? 1, n.Scale?.Z ?? 1);
          s.SetScale3D(MathUtils_1.MathUtils.CommonTempVector);
          n = Vector_1.Vector.Create(t.Entity.GetComponent(1).ActorLocationProxy);
          i = Vector_1.Vector.Create();
          MathUtils_1.MathUtils.CommonTempVector.Set(o.Point.X ?? 0, o.Point.Y ?? 0, o.Point.Z ?? 0);
          s.TransformPositionNoScale(MathUtils_1.MathUtils.CommonTempVector, i);
          s = [n, i];
          n = o.MoveMotion ?? {
            Type: IAction_1.EMoveMotion.UniformMotion,
            Time: 0
          };
          ControllerHolder_1.ControllerHolder.SceneItemMoveController.AddSceneItemMove(t.Entity, s, false, n, 0);
          if (this.IsAsync) {
            this.FinishExecute(true);
          } else {
            EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.OnSceneItemMoveBroken, this.nIn);
            this.CRe.ClearStopMoveCallbacksWithEntity();
            this.CRe.AddStopMoveCallbackWithEntity(this.nIn);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 39, "Entity找不到EntityData配置的Transform", ["PbDataId", e.EntityId]);
          }
          this.FinishExecute(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 31, "Entity找不到SceneItemMoveComponent", ["PbDataId", e.EntityId]);
        }
        this.FinishExecute(false);
      }
    }
  }
  aIn(e, t) {
    var i = e.MoveConfig;
    if (i) {
      if (this.CRe?.Valid) {
        if (e.StopBeforeMove) {
          this.CRe.StopMove();
        }
        ControllerHolder_1.ControllerHolder.SceneItemMoveController.AddSceneItemMove(t.Entity, i.Points, i.IsLoop ?? false, i.MoveMotion, i.StopTime);
        if (this.IsAsync) {
          this.FinishExecute(true);
        } else {
          EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.OnSceneItemMoveBroken, this.nIn);
          this.CRe.ClearStopMoveCallbacksWithEntity();
          this.CRe.AddStopMoveCallbackWithEntity(this.nIn);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 31, "Entity找不到SceneItemMoveComponent", ["entityId", e.EntityId]);
        }
        this.FinishExecute(false);
      }
    }
  }
  OnReset() {
    this.CRe = undefined;
    this.OPt = undefined;
  }
}
exports.LevelEventSceneItemMove = LevelEventSceneItemMove;
//# sourceMappingURL=LevelEventSceneItemMove.js.map