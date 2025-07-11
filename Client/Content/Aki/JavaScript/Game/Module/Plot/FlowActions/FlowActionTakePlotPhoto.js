"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionTakePlotPhoto = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionTakePlotPhoto extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments);
    this.Oli = () => {
      this.FinishExecute(true);
    };
  }
  OnExecute() {
    if (this.ActionInfo.Params) {
      if (!UiManager_1.UiManager.IsViewShow("PlotPhotoView")) {
        UiManager_1.UiManager.OpenView("PlotPhotoView", this.Oli);
      }
    } else {
      this.FinishExecute(true);
    }
  }
}
exports.FlowActionTakePlotPhoto = FlowActionTakePlotPhoto;
//# sourceMappingURL=FlowActionTakePlotPhoto.js.map