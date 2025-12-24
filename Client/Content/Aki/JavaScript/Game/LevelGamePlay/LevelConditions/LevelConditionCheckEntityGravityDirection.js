"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckEntityGravityDirection = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntityGravityDirection extends LevelGeneralBase_1.LevelConditionBase {
  Hj_(e) {
    switch (e) {
      case "PositiveX":
        return Vector_1.Vector.Create(1, 0, 0);
      case "PositiveY":
        return Vector_1.Vector.Create(0, 1, 0);
      case "PositiveZ":
        return Vector_1.Vector.Create(0, 0, 1);
      case "NegativeX":
        return Vector_1.Vector.Create(-1, 0, 0);
      case "NegativeY":
        return Vector_1.Vector.Create(0, -1, 0);
      case "NegativeZ":
        return Vector_1.Vector.Create(0, 0, -1);
    }
    return Vector_1.Vector.Create(0, 0, 0);
  }
  $j_(e) {
    var t;
    var i = e.Entity.GetComponent(187);
    if (i) {
      return i.GravityDirect;
    } else if (i = e.Entity.GetComponent(1)) {
      t = Vector_1.Vector.Create(0, 0, 0);
      i.ActorQuatProxy.RotateVector(LevelConditionCheckEntityGravityDirection.Wj_, t);
      return t;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 72, "[CheckEntityGravityDirection] 实体获取BaseActorComponent失败", ["entityHandle", e]);
      }
      return;
    }
  }
  Qj_(e, t, i) {
    t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(t, i);
    if (t?.Valid) {
      if (i = this.$j_(t)) {
        return !!i.Equals(e);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 72, "[CheckEntityGravityDirection] 使用实体朝向计算，重力方向计算错误", ["selfHandle", t]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 72, "[CheckEntityGravityDirection] 使用实体朝向计算，实体无效", ["selfHandle", t]);
      }
      return false;
    }
  }
  rLd(e, t, i) {
    var r = LevelGamePlayUtils_1.LevelGamePlayUtils.GetCheckTargetConditionEntityHandles(e.Target, t, i);
    if (r.length === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelCondition", 72, "[CheckEntityGravityDirection] 没有符合条件的联机判断的玩家或者指定的实体", ["config", e], ["inTrigger", t], ["context", i]);
      }
      return false;
    }
    for (const c of r) {
      if (!c?.Valid) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 72, "[CheckEntityGravityDirection] 联机条件判断的玩家或者指定的实体无效", ["entityHandle", c]);
        }
        return false;
      }
      var o = this.$j_(c);
      if (!o) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 72, "[CheckEntityGravityDirection] 联机条件判断的玩家或者指定的实体重力无效", ["entityHandle", c]);
        }
        return false;
      }
      switch (e.GravityDirection.Type) {
        case "SelfRotation":
          if (this.Qj_(o, t, i)) {
            break;
          }
          return false;
        case "VectorInfo":
          if (Vector_1.Vector.Create(e.GravityDirection.Direction.X, e.GravityDirection.Direction.Y, e.GravityDirection.Direction.Z).Equals(o)) {
            break;
          }
          return false;
        case "WorldAxis":
          if (this.Hj_(e.GravityDirection.WorldAxis).Equals(o)) {
            break;
          }
          return false;
        case "EntityGravity":
          var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.GravityDirection.EntityId);
          if (n?.Valid) {
            var a = this.$j_(n);
            if (a && a.Equals(o)) {
              break;
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 72, "[CheckEntityGravityDirection] 指定的实体无效", ["specificEntityHandle", n]);
          }
          return false;
        default:
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("LevelCondition", 72, "[CheckEntityGravityDirection] 未实现的重力方向配置");
          }
          return false;
      }
    }
    return true;
  }
  CheckNew(e, t, i) {
    t = this.rLd(e, t, i);
    if (e.IsNotInTargetDirection) {
      return !t;
    } else {
      return t;
    }
  }
}
(exports.LevelConditionCheckEntityGravityDirection = LevelConditionCheckEntityGravityDirection).Wj_ = Vector_1.Vector.DownVectorProxy;
//# sourceMappingURL=LevelConditionCheckEntityGravityDirection.js.map