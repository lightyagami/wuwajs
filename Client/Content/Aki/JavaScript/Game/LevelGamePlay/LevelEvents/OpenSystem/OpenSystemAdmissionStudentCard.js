"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemAdmissionStudentCard = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemAdmissionStudentCard extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, s) {
    await UiManager_1.UiManager.OpenViewAsync("AdmissionStudentCardView");
    return true;
  }
  GetViewName(e) {
    return "AdmissionStudentCardView";
  }
}
exports.OpenSystemAdmissionStudentCard = OpenSystemAdmissionStudentCard;
//# sourceMappingURL=OpenSystemAdmissionStudentCard.js.map