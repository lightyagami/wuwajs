"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotCommonActivityPage = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDot/RedDotBase");
class RedDotCommonActivityPage extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "ActivityEntrance";
  }
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshCommonActivityRedDot];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityRedDotState(e);
  }
}
exports.RedDotCommonActivityPage = RedDotCommonActivityPage;
//# sourceMappingURL=RedDotCommonActivityPage.js.map