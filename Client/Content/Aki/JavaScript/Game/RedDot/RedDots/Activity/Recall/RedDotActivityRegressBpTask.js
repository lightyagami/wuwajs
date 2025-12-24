"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotActivityRegressBpTask = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotActivityRegressBpTask extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "ActivityRegressBp";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RecallActivityInfoUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.ActivityRegressModel.ActivityData?.HasReachableConstantTask() ?? false;
  }
}
exports.RedDotActivityRegressBpTask = RedDotActivityRegressBpTask;
//# sourceMappingURL=RedDotActivityRegressBpTask.js.map