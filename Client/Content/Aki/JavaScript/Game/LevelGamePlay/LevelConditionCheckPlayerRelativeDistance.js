"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckPlayerRelativeDistance = undefined;
const Log_1 = require("../../Core/Common/Log");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../Manager/ModelManager");
const LevelGeneralBase_1 = require("./LevelGeneralBase");
class LevelConditionCheckPlayerRelativeDistance extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, o) {
    if (!e) {
      return false;
    }
    var r = e.TargetEntityId;
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r)?.Entity;
    if (!t || !t.Valid) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 31, "LevelConditionCheckPlayerRelativeDistance: 未找到目标实体", ["pbDataId", r]);
      }
      return false;
    }
    t = t.GetComponent(1);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 31, "LevelConditionCheckPlayerRelativeDistance: 目标实体缺少BaseActorComponent组件", ["pbDataId", r]);
      }
      return false;
    }
    r = Vector_1.Vector.Create(t.ActorLocationProxy);
    t = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 31, "LevelConditionCheckPlayerRelativeDistance: 未找到当前角色实体");
      }
      return false;
    }
    t = t.GetComponent(1);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 31, "LevelConditionCheckPlayerRelativeDistance: 当前角色实体缺少BaseActorComponent组件");
      }
      return false;
    }
    var t = Vector_1.Vector.Create(t.ActorLocationProxy);
    var n = Vector_1.Vector.Distance(t, r);
    for (const i of e.ValidDistanceRanges) {
      if (i.Min && n < i.Min) {
        return false;
      }
      if (i.Max && n > i.Max) {
        return false;
      }
    }
    return true;
  }
}
exports.LevelConditionCheckPlayerRelativeDistance = LevelConditionCheckPlayerRelativeDistance;
//# sourceMappingURL=LevelConditionCheckPlayerRelativeDistance.js.map