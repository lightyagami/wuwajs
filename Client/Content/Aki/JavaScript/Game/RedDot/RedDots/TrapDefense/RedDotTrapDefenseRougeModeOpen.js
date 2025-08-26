"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotTrapDefenseRougeModeOpen = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotTrapDefenseRougeModeOpen extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "TrapDefenseRougeLevel";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateTrapDefenseRougeModeOpen];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.RedDotModeOpen();
  }
}
exports.RedDotTrapDefenseRougeModeOpen = RedDotTrapDefenseRougeModeOpen;
//# sourceMappingURL=RedDotTrapDefenseRougeModeOpen.js.map