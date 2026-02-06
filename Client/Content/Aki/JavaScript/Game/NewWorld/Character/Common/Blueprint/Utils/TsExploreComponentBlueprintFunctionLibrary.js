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
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 58);
    if (o?.Valid && o.InteractingTarget?.Valid) {
      return o.InteractingTarget.HookLocation.ToUeVector();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "[TsExploreComponentBlueprintFunctionLibrary] 角色获取当前交互钩锁点坐标失败", ["CharacterEntityId", t], ["ExploreComponent", o?.Valid], ["EntityConfigId", o?.InteractingTarget?.EntityConfigId]);
    }
  }
  static MotorcycleGetHookLocation(t) {
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 59);
    if (o?.Valid && o.InteractingTarget?.Valid) {
      return o.InteractingTarget.HookLocation.ToUeVector();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "[TsExploreComponentBlueprintFunctionLibrary] 摩托车获取当前交互钩锁点坐标失败", ["MotorcycleEntityId", t], ["ExploreComponent", o?.Valid], ["EntityConfigId", o?.InteractingTarget?.EntityConfigId]);
    }
  }
  static CharacterGetInteractingHookEntityId(t) {
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 58);
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
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 59);
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
    t = EntitySystem_1.EntitySystem.GetComponent(t, 59);
    return !!t?.Valid && t.TryPullCollection();
  }
  static IsMotorcyclePullingCollectionWithProgress(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 59);
    return !!t?.Valid && (t.PullingTarget?.PullCollectionWithProgress ?? false);
  }
  static MotorcycleCheckPullCollectionFinished(t) {
    var o = EntitySystem_1.EntitySystem.GetComponent(t, 59);
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
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 59);
    var r = EntitySystem_1.EntitySystem.GetComponent(o, 90);
    if (e?.Valid && r?.Valid) {
      return e.ForceLockTarget(r, "MotorcycleForceLockTarget");
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 79, "[TsExploreComponentBlueprintFunctionLibrary] 摩托车强制锁定目标失败", ["MotorcycleEntityId", t], ["TargetEntityId", o], ["TargetEntityConfigId", r?.EntityConfigId]);
      }
      return false;
    }
  }
  static CharacterForceLockTarget(t, o) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 58);
    var r = EntitySystem_1.EntitySystem.GetComponent(o, 90);
    if (e?.Valid && r?.Valid) {
      return e.ForceLockTarget(r, "CharacterForceLockTarget");
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 79, "[TsExploreComponentBlueprintFunctionLibrary] 角色强制锁定目标失败", ["CharacterEntityId", t], ["TargetEntityId", o], ["TargetEntityConfigId", r?.EntityConfigId]);
      }
      return false;
    }
  }
  static MotorcycleGetFixHookParams(t, o, e, r, n, i) {
    var c = EntitySystem_1.EntitySystem.GetComponent(t, 59);
    var y = c?.InteractingTarget;
    if (c?.Valid && y?.Valid) {
      y.GetMotorcycleFixHookParams(o, e, r, n, i);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 79, "[TsExploreComponentBlueprintFunctionLibrary] 摩托车获取钩锁配置失败", ["MotorcycleEntityId", t], ["TargetEntityConfigId", y?.EntityConfigId]);
      }
      return false;
    }
  }
  static SetExploreComponentSyncEnabled(t, o) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 57);
    if (e?.Valid) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, "[TsExploreComponentBlueprintFunctionLibrary] 探索组件同步开关", ["EntityId", t], ["SyncEnabled(Before)", e.SyncEnabled], ["SyncEnabled(After))", o]);
      }
      e.SyncEnabled = o;
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, "[TsExploreComponentBlueprintFunctionLibrary] 探索组件同步开关设置失败", ["EntityId", t], ["ExploreComponent", e?.Valid]);
    }
  }
}
exports.default = TsExploreComponentBlueprintFunctionLibrary;
//# sourceMappingURL=TsExploreComponentBlueprintFunctionLibrary.js.map