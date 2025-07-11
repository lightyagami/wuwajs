"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalTitleRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class PersonalTitleRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPlayerTitleRefreshRedDot];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PersonalModel.GetPersonalTitleRedDotState();
  }
}
exports.PersonalTitleRedDot = PersonalTitleRedDot;
//# sourceMappingURL=PersonalTitleRedDot.js.map