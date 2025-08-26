"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCompareEntityState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareEntityState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, t, a) {
    if (!e) {
      return false;
    }
    let o = undefined;
    let l = "Eq";
    let i = "";
    if (e.Type === "CompareEntitySelfState") {
      l = e.Compare;
      i = e.State;
      o = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(t, a);
    } else if (e.Type === "CompareEntityState") {
      t = e;
      l = t.Compare;
      i = t.State;
      o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.EntityId);
    }
    if (o?.Valid) {
      if ((a = o.Entity?.GetComponent(206))?.Valid) {
        e = a.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i));
        if (l === "Eq") {
          return e;
        } else {
          return !e;
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelCondition", 39, "[LevelConditionCompareEntityState] 获取指定实体Tag组件失败");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelCondition", 39, "[LevelConditionCompareEntityState] 获取指定实体失败");
      }
      return false;
    }
  }
}
exports.LevelConditionCompareEntityState = LevelConditionCompareEntityState;
//# sourceMappingURL=LevelConditionCompareEntityState.js.map