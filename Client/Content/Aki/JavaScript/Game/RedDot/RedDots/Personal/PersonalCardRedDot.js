"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalCardRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class PersonalCardRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPersonalCardRefreshRedDot];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PersonalModel.GetPersonalCardRedDotState();
  }
}
exports.PersonalCardRedDot = PersonalCardRedDot;
//# sourceMappingURL=PersonalCardRedDot.js.map