"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueEndlessWaveTipsPanel = undefined;
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const SurvivorsRogueTipsPanelBase_1 = require("./SurvivorsRogueTipsPanelBase");
class SurvivorsRogueEndlessWaveTipsPanel extends SurvivorsRogueTipsPanelBase_1.SurvivorsRogueTipsPanelBase {
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.SequencePlayer.BindSequenceCloseEvent(e => {
      if (e === "Start") {
        this.SequencePlayer.PlayOrReplaySequenceByName("Close");
      }
    });
  }
}
exports.SurvivorsRogueEndlessWaveTipsPanel = SurvivorsRogueEndlessWaveTipsPanel;
//# sourceMappingURL=SurvivorsRogueEndlessWaveTipsPanel.js.map