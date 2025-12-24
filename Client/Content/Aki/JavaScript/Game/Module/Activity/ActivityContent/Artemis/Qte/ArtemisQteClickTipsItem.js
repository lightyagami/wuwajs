"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisQteClickTipsItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class ArtemisQteClickTipsItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.InProgressType = 0;
    this.yct = e => {
      let i = 0;
      switch (e) {
        case "Fail":
          i = 1;
          break;
        case "QteSuccess":
          i = 2;
          break;
        case "Success":
          i = 0;
      }
      if (i === this.InProgressType) {
        this.SetActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.yct);
  }
  OnBeforeHide() {
    this.InProgressType = 0;
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  Gti(e) {
    if (this.SPe.GetCurrentSequence() === e) {
      this.SPe.ReplaySequenceByKey(e);
    } else {
      this.SPe.StopPlayingSequence(false, true);
      this.SPe.PlayLevelSequenceByName(e, false);
    }
    this.SetActive(true);
  }
  ShowTip(e) {
    let i = "Success";
    switch (e) {
      case 0:
        return;
      case 1:
        this.Wt_();
        i = "Fail";
        break;
      case 2:
        this.Qt_();
        i = "QteSuccess";
    }
    this.InProgressType = e;
    this.Gti(i);
  }
  Wt_() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Activity_ArtemisChatFixTips_Miss");
  }
  Qt_() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Activity_ArtemisChatFixTips_Perfect");
  }
}
exports.ArtemisQteClickTipsItem = ArtemisQteClickTipsItem;
//# sourceMappingURL=ArtemisQteClickTipsItem.js.map