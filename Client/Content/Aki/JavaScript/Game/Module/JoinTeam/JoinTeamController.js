"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JoinTeamController = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class JoinTeamController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {}
  static OnRemoveEvents() {}
  static async OpenJoinTeamView(e, a = false) {
    ModelManager_1.ModelManager.JoinTeamModel.SetRoleDescriptionId(e);
    return !UiManager_1.UiManager.IsViewShow("JoinTeamView") && (await UiManager_1.UiManager.OpenViewAsync("JoinTeamView", a)) !== undefined;
  }
  static CloseJoinTeamView() {
    if (UiManager_1.UiManager.IsViewShow("JoinTeamView")) {
      UiManager_1.UiManager.CloseView("JoinTeamView");
    }
    ModelManager_1.ModelManager.JoinTeamModel.SetRoleDescriptionId(undefined);
  }
}
exports.JoinTeamController = JoinTeamController;
//# sourceMappingURL=JoinTeamController.js.map