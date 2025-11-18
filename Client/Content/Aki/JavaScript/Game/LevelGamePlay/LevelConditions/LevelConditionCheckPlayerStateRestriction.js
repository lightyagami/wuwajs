"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckPlayerStateRestriction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const PlayerStateRestrictionById_1 = require("../../../Core/Define/ConfigQuery/PlayerStateRestrictionById");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckPlayerStateRestriction extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) {
      return false;
    }
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (!t) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelCondition", 36, "[CheckPlayerStateRestriction]无法获取当前角色");
      }
      return false;
    }
    var a = t.Entity.GetComponent(209);
    if (!a) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelCondition", 36, "[CheckPlayerStateRestriction]无法获取当前角色BaseTagComponent组件");
      }
      return false;
    }
    t = PlayerStateRestrictionById_1.configPlayerStateRestrictionById.GetConfig(e.RestrictionId);
    if (t) {
      for (const o of t.IncludedTags) {
        if (!a.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o))) {
          return false;
        }
      }
      for (const i of t.ExcludedTags) {
        if (a.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i))) {
          return false;
        }
      }
    }
    return true;
  }
}
exports.LevelConditionCheckPlayerStateRestriction = LevelConditionCheckPlayerStateRestriction;
//# sourceMappingURL=LevelConditionCheckPlayerStateRestriction.js.map