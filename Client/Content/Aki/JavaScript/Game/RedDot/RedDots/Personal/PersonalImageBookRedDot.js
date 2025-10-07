"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalImageBookRedDot = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
class PersonalImageBookRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPersonalTipStateSet];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PersonalModel.CheckCanShowPersonalTip();
  }
}
exports.PersonalImageBookRedDot = PersonalImageBookRedDot;
//# sourceMappingURL=PersonalImageBookRedDot.js.map