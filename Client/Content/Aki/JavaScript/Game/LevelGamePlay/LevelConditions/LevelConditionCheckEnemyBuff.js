"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckEnemyBuff = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckEnemyBuff extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    if (o?.length) {
      if (e.LimitParams.size === 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
        }
      } else {
        var i = Number(e.LimitParams.get("BuffId"));
        if (i) {
          for (const r of o[0]) {
            if ((EntitySystem_1.EntitySystem.Get(r)?.GetComponent(174)?.GetBuffTotalStackById(i) ?? 0) > 0) {
              return true;
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的BuffId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckEnemyBuff}的定义`);
        }
      }
    }
    return false;
  }
}
exports.LevelConditionCheckEnemyBuff = LevelConditionCheckEnemyBuff;
//# sourceMappingURL=LevelConditionCheckEnemyBuff.js.map