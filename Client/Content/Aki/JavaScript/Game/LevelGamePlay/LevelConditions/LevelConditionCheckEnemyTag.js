"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckEnemyTag = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckEnemyTag extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, i, ...n) {
    if (n?.length) {
      if (e.LimitParams.size === 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
        }
      } else {
        var t = e.LimitParams.get("Tag");
        if (t) {
          for (const o of n[0]) {
            if (EntitySystem_1.EntitySystem.Get(o)?.GetComponent(217)?.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t))) {
              return true;
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的tag参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckEnemyTag}的定义`);
        }
      }
    }
    return false;
  }
}
exports.LevelConditionCheckEnemyTag = LevelConditionCheckEnemyTag;
//# sourceMappingURL=LevelConditionCheckEnemyTag.js.map