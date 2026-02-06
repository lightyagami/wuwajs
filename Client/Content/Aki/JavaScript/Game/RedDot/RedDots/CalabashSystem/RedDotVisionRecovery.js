"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotVisionRecovery = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotVisionRecovery extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnVisionRecoveryStorage];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRecoveryBatchRedDot() || ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRecoveryBatchAimRedDot();
  }
}
exports.RedDotVisionRecovery = RedDotVisionRecovery;
//# sourceMappingURL=RedDotVisionRecovery.js.map