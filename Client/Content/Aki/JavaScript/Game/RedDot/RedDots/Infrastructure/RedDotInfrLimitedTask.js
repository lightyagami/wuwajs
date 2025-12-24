"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotInfrLimitedTask = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotInfrLimitedTask extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "Infrastructure";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.InfrastructureActivityTaskDataUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.InfrastructureModel.GetActivityData()?.GetLimitedTaskReadDot() ?? false;
  }
}
exports.RedDotInfrLimitedTask = RedDotInfrLimitedTask;
//# sourceMappingURL=RedDotInfrLimitedTask.js.map