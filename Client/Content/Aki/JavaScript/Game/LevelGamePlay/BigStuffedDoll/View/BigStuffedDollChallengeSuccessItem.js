"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigStuffedDollChallengeSuccessItem = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BigStuffedDollChallengeSuccessItem extends UiPanelBase_1.UiPanelBase {
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
          ModelManager_1.ModelManager.BigStuffedDollModel.EnterNextGameStage();
      }
    };
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
  ShowTip() {
    this.ShowAsync();
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
}
exports.BigStuffedDollChallengeSuccessItem = BigStuffedDollChallengeSuccessItem;
//# sourceMappingURL=BigStuffedDollChallengeSuccessItem.js.map