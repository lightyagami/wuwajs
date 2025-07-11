"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotAchievementCategory = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDot/RedDotBase");
class RedDotAchievementCategory extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshAchievementRedPoint];
  }
  IsMultiple() {
    return true;
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.AchievementModel.GetCategoryRedPointState(e);
  }
}
exports.RedDotAchievementCategory = RedDotAchievementCategory;
//# sourceMappingURL=RedDotAchievementCategory.js.map