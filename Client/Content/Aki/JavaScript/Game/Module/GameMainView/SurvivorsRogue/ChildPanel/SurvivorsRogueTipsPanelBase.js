"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueTipsPanelBase = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class SurvivorsRogueTipsPanelBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SequencePlayer = undefined;
    this.FQe = e => {
      if (e === "SurvivorsRogueExitView") {
        this.SequencePlayer.PauseSequence();
      }
    };
    this.$Ge = e => {
      if (e === "SurvivorsRogueExitView") {
        this.SequencePlayer.ResumeSequence();
      }
    };
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.SequencePlayer.BindSequenceCloseEvent(e => {
      if (e === "Close") {
        this.Hide();
      }
    });
  }
  OnBeforeShow() {
    this.OnAddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnBeforeHide() {
    this.OnRemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  ShowTips() {
    this.Show();
    this.SequencePlayer.StopPlayingSequence();
    this.SequencePlayer.PlayLevelSequenceByName("Start");
  }
  HideTips() {
    if (this.IsShowOrShowing) {
      this.SequencePlayer.StopPlayingSequence();
      this.SequencePlayer.PlayLevelSequenceByName("Close");
    }
  }
}
exports.SurvivorsRogueTipsPanelBase = SurvivorsRogueTipsPanelBase;
//# sourceMappingURL=SurvivorsRogueTipsPanelBase.js.map