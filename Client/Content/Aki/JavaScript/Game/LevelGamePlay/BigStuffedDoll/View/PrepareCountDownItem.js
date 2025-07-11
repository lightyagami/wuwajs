"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrepareCountDownItem = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PrepareCountDownItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RemainTime = 0;
    this.LevelSequencePlayer = undefined;
    this.yct = e => {
      if (e === "Start") {
        this.HideAsync();
        ModelManager_1.ModelManager.BigStuffedDollModel.EnterNextGameStage();
      }
    };
  }
  OnRegisterComponent() {}
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequencePlayer.BindSequenceCloseEvent(this.yct);
  }
  async StartCountDown() {
    await this.ShowAsync();
    this.LevelSequencePlayer?.PlayLevelSequenceByName("Start");
  }
}
exports.PrepareCountDownItem = PrepareCountDownItem;
//# sourceMappingURL=PrepareCountDownItem.js.map