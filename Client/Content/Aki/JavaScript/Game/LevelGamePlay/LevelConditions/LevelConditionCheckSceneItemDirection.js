"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckSceneItemDirection = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckSceneItemDirection extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, t, o) {
    var i;
    var r;
    var a;
    var n = e.Target;
    let l = undefined;
    switch (n.Type) {
      case "Self":
        l = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(t, o);
        break;
      case "Target":
        l = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n.EntityId);
        break;
      case "Triggered":
        {
          let e = undefined;
          if (o?.Type === 5) {
            e = o.OtherEntityId;
          } else if (o?.Type === 11) {
            e = o.GetContextByType(5)?.OtherEntityId;
          }
          if (e) {
            l = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e);
          }
          break;
        }
    }
    if (l?.Valid) {
      if ((a = l.Entity?.GetComponent(212))?.Valid) {
        if ((i = e.RotatePoint ? a.GetReferenceActor(e.RotatePoint) : a.GetInteractionMainActor())?.IsValid()) {
          r = e.Direction;
          MathUtils_1.MathUtils.CommonTempRotator.Set(r.Y ?? 0, r.Z ?? 0, r.X ?? 0);
          r = a.Owner.D_GetTransform().TransformRotation(MathUtils_1.MathUtils.CommonTempRotator.Quaternion().ToUeQuat());
          a = i.K2_GetActorQuaternion().AngularDistance(r) * MathUtils_1.MathUtils.RadToDeg;
          return Math.abs(a) <= e.AngleInterval;
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("LevelCondition", 39, "[LevelConditionCheckSceneItemDirection] 获取指定实体的指定旋转点Actor失败", ["Target", n], ["RotatePoint", e.RotatePoint]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelCondition", 39, "[LevelConditionCheckSceneItemDirection] 获取指定实体的SceneItemActorComponent失败", ["Target", n]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelCondition", 39, "[LevelConditionCheckSceneItemDirection] 获取指定实体失败", ["Target", n]);
      }
      return false;
    }
  }
}
exports.LevelConditionCheckSceneItemDirection = LevelConditionCheckSceneItemDirection;
//# sourceMappingURL=LevelConditionCheckSceneItemDirection.js.map