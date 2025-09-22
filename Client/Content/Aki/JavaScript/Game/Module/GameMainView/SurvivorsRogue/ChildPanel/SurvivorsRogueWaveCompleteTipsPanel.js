"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueWaveCompleteTipsPanel = undefined;
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const SurvivorsRogueController_1 = require("../../../SurvivorsRogue/SurvivorsRogueController");
const SurvivorsRogueTipsPanelBase_1 = require("./SurvivorsRogueTipsPanelBase");
class SurvivorsRogueWaveCompleteTipsPanel extends SurvivorsRogueTipsPanelBase_1.SurvivorsRogueTipsPanelBase {
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.SequencePlayer.BindSequenceCloseEvent(e => {
      if (e === "Start") {
        this.SequencePlayer.PlayOrReplaySequenceByName("Close");
      } else if (e === "Close") {
        this.Hide();
        SurvivorsRogueController_1.SurvivorsRogueController.RequestEnterStep("End");
      }
    });
  }
}
exports.SurvivorsRogueWaveCompleteTipsPanel = SurvivorsRogueWaveCompleteTipsPanel;
//# sourceMappingURL=SurvivorsRogueWaveCompleteTipsPanel.js.map