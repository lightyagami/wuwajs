"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityUniversalData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivityData_1 = require("../../ActivityData");
class ActivityUniversalData extends ActivityData_1.ActivityBaseData {
  PhraseEx(t) {}
  NeedSelfControlFirstRedPoint() {
    return false;
  }
  GetExtraConfig() {
    return ConfigManager_1.ConfigManager.ActivityUniversalConfig.GetActivityUniversalConfig(this.Id);
  }
}
exports.ActivityUniversalData = ActivityUniversalData;
//# sourceMappingURL=ActivityUniversalData.js.map