"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalBirthdayRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class PersonalBirthdayRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnBirthChange, EventDefine_1.EEventName.OnFunctionOpenUpdateNotify];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.BirthdayModel.GetBirthdayRedDotState();
  }
}
exports.PersonalBirthdayRedDot = PersonalBirthdayRedDot;
//# sourceMappingURL=PersonalBirthdayRedDot.js.map