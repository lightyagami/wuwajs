"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotVisionRefine = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotVisionRefine extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnVisionRefineStorage, EventDefine_1.EEventName.RedDotStart];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineRedDot();
  }
}
exports.RedDotVisionRefine = RedDotVisionRefine;
//# sourceMappingURL=RedDotVisionRefine.js.map