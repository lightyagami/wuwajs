"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckPickUpHonamiStoryItemType = undefined;
const Log_1 = require("../../../Core/Common/Log");
const HonamiStoryItemDataBase_1 = require("../../Module/HonamiStory/Data/HonamiStoryItemDataBase");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckPickUpHonamiStoryItemType extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o, ...t) {
    var a = e?.LimitParams?.get("ItemType");
    if (a) {
      a = Number(a);
      return !isNaN(a) && ([t] = t, t instanceof HonamiStoryItemDataBase_1.HonamiStoryItemDataBase ? t.GetItemType() === a : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelCondition", 95, "条件：检查穗波物语拾取物品类型 事件参数类型错误", ["eventArg", typeof t]), false));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 95, "条件：检查穗波物语拾取物品类型 需要配置目标类型作为参数", ["condition id", e?.Id]);
      }
      return false;
    }
  }
}
exports.LevelConditionCheckPickUpHonamiStoryItemType = LevelConditionCheckPickUpHonamiStoryItemType;
//# sourceMappingURL=LevelConditionHonamiStoryGuide.js.map