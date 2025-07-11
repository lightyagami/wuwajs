"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionLevelUpSettingRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class VisionLevelUpSettingRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshVisionLevelUpSettingRedPoint];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckVisionLevelUpSettingRedDot();
  }
}
exports.VisionLevelUpSettingRedDot = VisionLevelUpSettingRedDot;
//# sourceMappingURL=VisionLevelUpSettingRedDot.js.map