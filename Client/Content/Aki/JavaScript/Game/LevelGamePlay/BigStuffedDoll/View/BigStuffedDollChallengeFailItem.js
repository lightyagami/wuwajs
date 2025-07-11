"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigStuffedDollChallengeFailItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Module/Util/LguiUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BigStuffedDollChallengeFailItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.yct = e => {
      switch (e) {
        case "Start":
          this.LevelSequencePlayer.PlayLevelSequenceByName("Close");
          break;
        case "Close":
          this.HideAsync();
          ModelManager_1.ModelManager.BigStuffedDollModel.SetGameStage(5);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    super.OnStart();
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequencePlayer.BindSequenceCloseEvent(this.yct);
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear();
    this.LevelSequencePlayer = undefined;
  }
  ShowTip(e) {
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
    this.ShowAsync();
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
}
exports.BigStuffedDollChallengeFailItem = BigStuffedDollChallengeFailItem;
//# sourceMappingURL=BigStuffedDollChallengeFailItem.js.map