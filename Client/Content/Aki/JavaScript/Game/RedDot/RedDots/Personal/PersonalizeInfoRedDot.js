"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalizeInfoRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class PersonalizeInfoRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPersonalCardRefreshRedDot, EventDefine_1.EEventName.OnPlayerTitleRefreshRedDot, EventDefine_1.EEventName.OnBirthChange, EventDefine_1.EEventName.OnFunctionOpenUpdateNotify];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PersonalModel.GetPersonalCardRedDotState() || ModelManager_1.ModelManager.PersonalModel.GetPersonalTitleRedDotState() || ModelManager_1.ModelManager.BirthdayModel.GetBirthdayRedDotState();
  }
}
exports.PersonalizeInfoRedDot = PersonalizeInfoRedDot;
//# sourceMappingURL=PersonalizeInfoRedDot.js.map