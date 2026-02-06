"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotSpringManorBrochureReward = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotSpringManorBrochureReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnBrochureBookItemStateUpdate, EventDefine_1.EEventName.SpringManorFunctionOpenNotify];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.SpringManorModel.CheckBookItemRedDot(2);
  }
  OnGetParentName() {
    return "SpringManorGameEntrance";
  }
}
exports.RedDotSpringManorBrochureReward = RedDotSpringManorBrochureReward;
//# sourceMappingURL=RedDotSpringManorBrochureReward.js.map