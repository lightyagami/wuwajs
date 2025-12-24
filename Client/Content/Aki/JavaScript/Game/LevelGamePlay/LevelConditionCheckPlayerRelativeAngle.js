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
  CheckNew(e, o) {
    if (e) {
      var n = e.TargetEntityId;
      var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n)?.Entity;
      if (i && i.Valid) {
        i = i.GetComponent(1);
        if (i) {
          var r = Vector_1.Vector.Create();
          r.FromConfigVector(e.BaseVector);
          if (e.BaseVectorSpace === ICondition_1.EVectorSpace.Local) {
            r.FromUeVector(i.ActorTransform.TransformVectorNoScale(r.ToUeVector()));
          }
          r.Normalize();
          var l = Vector_1.Vector.Create();
          var t = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
          if (t) {
            t = t.GetComponent(1);
            if (t) {
              l.DeepCopy(t.ActorLocationProxy);
              l.SubtractionEqual(i.ActorLocationProxy);
              l.Normalize();
              var a = Math.acos(r.DotProduct(l)) * (180 / Math.PI);
              for (const v of e.ValidAngleRanges) {
                if (a >= v.Min && a <= v.Max) {
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
          Log_1.Log.Warn("LevelCondition", 31, "LevelConditionCheckPlayerRelativeAngle: 目标实体缺少BaseActorComponent组件", ["pbDataId", n]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelCondition", 31, "LevelConditionCheckPlayerRelativeAngle: 未找到目标实体", ["pbDataId", n]);
      }
    }
    return false;
  }
}
exports.LevelConditionCheckPlayerRelativeAngle = LevelConditionCheckPlayerRelativeAngle;
//# sourceMappingURL=LevelConditionCheckPlayerRelativeAngle.js.map