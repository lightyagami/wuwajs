"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckPlayerRelativeAngle = undefined;
const Log_1 = require("../../Core/Common/Log");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const ICondition_1 = require("../../UniverseEditor/Interface/ICondition");
const ModelManager_1 = require("../Manager/ModelManager");
const LevelGeneralBase_1 = require("./LevelGeneralBase");
class LevelConditionCheckPlayerRelativeAngle extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(o, e, n) {
    if (o) {
      let e = undefined;
      var i = o.TargetEntityId;
      if (i) {
        e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i)?.Entity;
      } else {
        if (!n) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 79, "上下文不合法");
          }
          return false;
        }
        if (!n.EntityId) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 31, "LevelConditionCheckPlayerRelativeAngle: entityId为空", ["pbDataId", i]);
          }
          return false;
        }
        e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(n.EntityId)?.Entity;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelCondition", 79, "LevelConditionCheckPlayerRelativeAngle: 没有配置目标实体, 尝试读取上下文实体", ["EntityId", n.EntityId]);
        }
      }
      if (e && e.Valid) {
        n = e.GetComponent(1);
        if (n) {
          var t = Vector_1.Vector.Create();
          t.FromConfigVector(o.BaseVector);
          if (o.BaseVectorSpace === ICondition_1.EVectorSpace.Local) {
            t.FromUeVector(n.ActorTransform.TransformVectorNoScale(t.ToUeVector()));
          }
          t.Normalize();
          var l = Vector_1.Vector.Create();
          var r = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
          if (r) {
            r = r.GetComponent(1);
            if (r) {
              l.DeepCopy(r.ActorLocationProxy);
              l.SubtractionEqual(n.ActorLocationProxy);
              l.Normalize();
              var a = Math.acos(t.DotProduct(l)) * (180 / Math.PI);
              for (const L of o.ValidAngleRanges) {
                if (a >= L.Min && a <= L.Max) {
                  return true;
                }
              }
            } else if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("LevelCondition", 31, "LevelConditionCheckPlayerRelativeAngle: 当前角色实体缺少BaseActorComponent组件");
            }
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("LevelCondition", 31, "LevelConditionCheckPlayerRelativeAngle: 未找到当前角色实体");
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelCondition", 31, "LevelConditionCheckPlayerRelativeAngle: 目标实体缺少BaseActorComponent组件", ["pbDataId", i]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelCondition", 31, "LevelConditionCheckPlayerRelativeAngle: 未找到目标实体", ["pbDataId", i]);
      }
    }
    return false;
  }
}
exports.LevelConditionCheckPlayerRelativeAngle = LevelConditionCheckPlayerRelativeAngle;
//# sourceMappingURL=LevelConditionCheckPlayerRelativeAngle.js.map