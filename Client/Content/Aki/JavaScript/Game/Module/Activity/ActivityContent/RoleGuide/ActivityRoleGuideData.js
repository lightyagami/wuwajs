"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleGuideData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivityData_1 = require("../../ActivityData");
class ActivityRoleGuideData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.RoleGuideConfig = undefined;
    this.RoleId = 0;
    this.RoleQuestId = 0;
    this.RoleTrialId = 0;
    this.ShowQuestId = 0;
  }
  PhraseEx(t) {
    this.RoleGuideConfig = ConfigManager_1.ConfigManager.ActivityRoleGuideConfig.GetRoleTrialActivityConfig(this.Id);
    if (this.RoleGuideConfig) {
      this.RoleId = this.RoleGuideConfig.RoleId;
      this.RoleQuestId = this.RoleGuideConfig.RoleQuestId;
      this.RoleTrialId = this.RoleGuideConfig.RoleTrialId;
      this.ShowQuestId = this.RoleGuideConfig.ShowQuestId;
    }
  }
  GetRoleResourcePath() {
    var t = this.RoleGuideConfig.RoleUi;
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t) ?? "";
  }
  NeedSelfControlFirstRedPoint() {
    return false;
  }
  GetExDataRedPointShowState() {
    return false;
  }
}
exports.ActivityRoleGuideData = ActivityRoleGuideData;
//# sourceMappingURL=ActivityRoleGuideData.js.map