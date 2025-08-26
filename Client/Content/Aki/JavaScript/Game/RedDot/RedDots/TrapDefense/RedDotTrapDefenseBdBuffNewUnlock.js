"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotTrapDefenseBdBuffNewUnlock = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotTrapDefenseBdBuffNewUnlock extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "TrapDefenseBdSum";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateTrapDefenseBdBuffNewUnlock];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.RedDotNewUnlockBdBuff();
  }
}
exports.RedDotTrapDefenseBdBuffNewUnlock = RedDotTrapDefenseBdBuffNewUnlock;
//# sourceMappingURL=RedDotTrapDefenseBdBuffNewUnlock.js.map