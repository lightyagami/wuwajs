"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureLoadingPanel = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class InfrastructureLoadingPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Hea = undefined;
    this.yct = e => {
      if (e === "Close") {
        ModelManager_1.ModelManager.InfrastructureModel.DestroyLoadingPanel();
      }
    };
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Hea.BindSequenceCloseEvent(this.yct);
    this.Hea.PlayLevelSequenceByName("Start");
  }
  CloseSelf() {
    this.Hea?.PlayLevelSequenceByName("Close");
  }
}
exports.InfrastructureLoadingPanel = InfrastructureLoadingPanel;
//# sourceMappingURL=InfrastructureLoadingPanel.js.map