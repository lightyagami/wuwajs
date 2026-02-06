"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventClientModifyTargetTag = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventClientModifyTargetTag extends LevelGeneralBase_1.LevelEventBase {
  V0d(e, a) {
    let r = undefined;
    switch (a.Target.Type) {
      case "Self":
        if (e) {
          r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
        }
        break;
      case "Player":
        r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    }
    if (!r?.Valid || !r.Entity?.Valid) {
      return false;
    }
    var l = r.Entity.CheckGetComponent(217);
    if (!l) {
      return false;
    }
    if (a.IsAddTag) {
      for (const i of a.PerformanceTag) {
        var o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i);
        ControllerHolder_1.ControllerHolder.LevelGamePlayController.ClientAddTagToTarget(r, o);
        l.AddTag(o);
      }
    } else {
      for (const n of a.PerformanceTag) {
        var t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(n);
        if (ControllerHolder_1.ControllerHolder.LevelGamePlayController.ClientRemoveTagFromTarget(r.Id, t)) {
          l.RemoveTag(t);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 72, "ClientModifyTargetTag 不能删除非本行为添加的Tag", ["Params", a]);
        }
      }
    }
    return true;
  }
  ExecuteNew(e, a) {
    var r = e;
    if (r) {
      switch (a.Type) {
        case 1:
          this.V0d(a.EntityId, r);
          break;
        case 5:
          this.V0d(a.TriggerEntityId, r);
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 72, "ClientModifyTargetTag 没有支持的类型 " + a.Type, ["Params", e], ["Context", a]);
          }
      }
    }
  }
}
exports.LevelEventClientModifyTargetTag = LevelEventClientModifyTargetTag;
//# sourceMappingURL=LevelEventClientModifyTargetTag.js.map