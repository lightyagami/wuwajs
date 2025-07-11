"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuccessFinishPanel = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class SuccessFinishPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.AMo = () => {
      var e = ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayId;
      GeneralLogicTreeController_1.GeneralLogicTreeController.RequestFinishUiGameplay(Protocol_1.Aki.Protocol.h3s.Proto_MorseCode, e.toString());
      UiManager_1.UiManager.CloseView("SignalDecodeView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.AMo]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Open() {
    let e = ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 2 ? "SignalSendSuccess" : "SignalReceiveSuccess";
    if (ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 3) {
      e = "SignalMusicSucceedTips";
    }
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), e);
    this.SetUiActive(true);
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
  Close() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Close");
  }
}
exports.SuccessFinishPanel = SuccessFinishPanel;
//# sourceMappingURL=SuccessFinishPanel.js.map