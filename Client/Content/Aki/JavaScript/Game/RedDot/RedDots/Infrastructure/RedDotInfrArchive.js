"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotInfrArchive = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotInfrArchive extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "Infrastructure";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.InfrastructureArchiveTaskUpdate, EventDefine_1.EEventName.InfrastructurePhoneTaskUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.InfrastructureModel.GetArchiveRedDot();
  }
}
exports.RedDotInfrArchive = RedDotInfrArchive;
//# sourceMappingURL=RedDotInfrArchive.js.map