"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
class TsExploreComponentBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static CharacterGetHookLocation(t) {
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 56);
    if (o?.Valid && o.InteractingTarget?.Valid) {
      return o.InteractingTarget.HookLocation.ToUeVector();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "[TsExploreComponentBlueprintFunctionLibrary] 角色获取当前交互钩锁点坐标失败", ["CharacterEntityId", t], ["ExploreComponent", o?.Valid], ["EntityConfigId", o?.InteractingTarget?.EntityConfigId]);
    }
  }
  static MotorcycleGetHookLocation(t) {
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    if (o?.Valid && o.InteractingTarget?.Valid) {
      return o.InteractingTarget.HookLocation.ToUeVector();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "[TsExploreComponentBlueprintFunctionLibrary] 摩托车获取当前交互钩锁点坐标失败", ["MotorcycleEntityId", t], ["ExploreComponent", o?.Valid], ["EntityConfigId", o?.InteractingTarget?.EntityConfigId]);
    }
  }
  static CharacterGetInteractingHookEntityId(t) {
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 56);
    if (o?.Valid && o.InteractingTarget?.Valid) {
      return o.InteractingTarget.Entity.Id;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, "[TsExploreComponentBlueprintFunctionLibrary] 摩托车获取当前交互钩锁点实体Id失败", ["CharacterEntityId", t], ["ExploreComponent", o?.Valid], ["EntityConfigId", o?.InteractingTarget?.EntityConfigId]);
      }
      return 0;
    }
  }
  static MotorcycleGetInteractingHookEntityId(t) {
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    if (o?.Valid && o.InteractingTarget?.Valid) {
      return o.InteractingTarget.Entity.Id;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, "[TsExploreComponentBlueprintFunctionLibrary] 摩托车获取当前交互钩锁点实体Id失败", ["MotorcycleEntityId", t], ["ExploreComponent", o?.Valid], ["EntityConfigId", o?.InteractingTarget?.EntityConfigId]);
      }
      return 0;
    }
  }
  static MotorcyclePullCollection(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    return !!t?.Valid && t.TryPullCollection();
  }
  static MotorcycleCheckPullCollectionFinished(t) {
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    if (o?.Valid) {
      return !o.PullingTarget?.Valid || o.PullingTarget.MoveFinish;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, "[TsExploreComponentBlueprintFunctionLibrary] 检查摩托车拉取采集物是否完成失败", ["MotorcycleEntityId", t], ["ExploreComponent", o?.Valid], ["EntityConfigId", o?.PullingTarget?.EntityConfigId]);
      }
      return false;
    }
  }
  static MotorcycleForceLockTarget(t, o) {
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    var e = EntitySystem_1.EntitySystem.GetComponent(o, 88);
    if (r?.Valid && e?.Valid) {
      return r.ForceLockTarget(e, "MotorcycleForceLockTarget");
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 79, "[TsExploreComponentBlueprintFunctionLibrary] 摩托车强制锁定目标失败", ["MotorcycleEntityId", t], ["TargetEntityId", o], ["TargetEntityConfigId", e?.EntityConfigId]);
      }
      return false;
    }
  }
  static CharacterForceLockTarget(t, o) {
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 56);
    var e = EntitySystem_1.EntitySystem.GetComponent(o, 88);
    if (r?.Valid && e?.Valid) {
      return r.ForceLockTarget(e, "CharacterForceLockTarget");
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 79, "[TsExploreComponentBlueprintFunctionLibrary] 角色强制锁定目标失败", ["CharacterEntityId", t], ["TargetEntityId", o], ["TargetEntityConfigId", e?.EntityConfigId]);
      }
      return false;
    }
  }
  static MotorcycleGetFixHookParams(t, o, r, e, n, i) {
    var c = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    var y = c?.InteractingTarget;
    if (c?.Valid && y?.Valid) {
      y.GetMotorcycleFixHookParams(o, r, e, n, i);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 79, "[TsExploreComponentBlueprintFunctionLibrary] 摩托车获取钩锁配置失败", ["MotorcycleEntityId", t], ["TargetEntityConfigId", y?.EntityConfigId]);
      }
      return false;
    }
  }
}
exports.default = TsExploreComponentBlueprintFunctionLibrary;
//# sourceMappingURL=TsExploreComponentBlueprintFunctionLibrary.js.map