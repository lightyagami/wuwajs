"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardQteSkipPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class DockyardQteSkipPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.ContinueFunc = undefined;
    this.ExitFunc = undefined;
    this.LockState = false;
    this.ei_ = () => {
      this.ContinueFunc?.();
    };
    this.ti_ = () => {
      this.ExitFunc?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.ei_], [2, this.ti_]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequencePlayer.BindSequenceCloseEvent(e => {
      if (e === "Hide") {
        this.SetActive(false);
      }
    });
  }
  SetPanelVisible(e) {
    if (!this.LockState) {
      if (e) {
        this.LevelSequencePlayer.StopCurrentSequence(true, true);
        this.LevelSequencePlayer.PlaySequencePurely("Show");
        this.SetActive(true);
      } else {
        this.LevelSequencePlayer.StopCurrentSequence(true, true);
        this.LevelSequencePlayer.PlaySequencePurely("Hide");
      }
    }
  }
  SetQtePanelText(e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Fishing_QTE_Unfish", i - e);
  }
  SetQtePanelTextVisible(e) {
    this.GetText(0).SetUIActive(e);
  }
  SetButtonContinueVisible(e) {
    this.GetButton(1).RootUIComp.SetUIActive(e);
  }
  SetButtonExitVisible(e) {
    this.GetButton(2).RootUIComp.SetUIActive(e);
  }
}
exports.DockyardQteSkipPanel = DockyardQteSkipPanel;
//# sourceMappingURL=DockyardQteSkipPanel.js.map