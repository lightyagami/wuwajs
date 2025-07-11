"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemScratchTicketMain = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityScratchTicketController_1 = require("../../../Module/Activity/ActivityContent/ScratchTicket/ActivityScratchTicketController");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemScratchTicketMain extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    var r = ModelManager_1.ModelManager.ActivityScratchTicketModel.GetScratchTicketData();
    if (r === undefined) {
      return false;
    }
    if (!r.IsInit() && !(await ActivityScratchTicketController_1.ActivityScratchTicketController.SendScratchCardActivityInfoRequest())) {
      return false;
    }
    return ActivityScratchTicketController_1.ActivityScratchTicketController.OpenScratchTicketMainView();
  }
  GetViewName() {
    return "ScratchTicketMainView";
  }
}
exports.OpenSystemScratchTicketMain = OpenSystemScratchTicketMain;
//# sourceMappingURL=OpenSystemScratchTicketMain.js.map