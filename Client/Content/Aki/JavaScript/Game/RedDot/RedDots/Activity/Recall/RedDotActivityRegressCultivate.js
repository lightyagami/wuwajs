"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotActivityRegressCultivate = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotActivityRegressCultivate extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RecallActivityInfoUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.HasReachableCultivateTask();
  }
}
exports.RedDotActivityRegressCultivate = RedDotActivityRegressCultivate;
//# sourceMappingURL=RedDotActivityRegressCultivate.js.map