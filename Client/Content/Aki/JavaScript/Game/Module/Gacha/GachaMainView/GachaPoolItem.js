"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaPoolItem = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class GachaPoolItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.GachaPoolData = undefined;
    this.GachaViewInfo = undefined;
    this.GachaType = undefined;
    this.LevelSequencePlayer = undefined;
    this.GachaType = e;
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  async PlayStartSeqAsync() {
    this.OnPlayStartSeq();
    await this.LevelSequencePlayer?.PlaySequenceAsync("Start", new CustomPromise_1.CustomPromise(), false);
  }
  PlayStartSeq() {
    this.OnPlayStartSeq();
    this.LevelSequencePlayer?.PlayOrReplaySequenceByName("Start");
  }
  OnPlayStartSeq() {}
  PlaySwitchSeq() {
    this.OnPlaySwitchSeq();
    this.LevelSequencePlayer.PlayOrReplaySequenceByName("Switch");
  }
  async PlaySwitchSeqAsync() {
    this.OnPlaySwitchSeq();
    await this.LevelSequencePlayer?.PlaySequenceAsync("Switch", new CustomPromise_1.CustomPromise());
  }
  OnPlaySwitchSeq() {}
  async OnPlayingSwitchSeqAsync() {}
  Update(e) {
    this.GachaPoolData = e;
    if (this.GachaPoolData) {
      e = this.GachaPoolData.PoolInfo.Id;
      this.GachaViewInfo = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(e);
      this.Refresh();
    }
  }
  Refresh() {}
}
exports.GachaPoolItem = GachaPoolItem;
//# sourceMappingURL=GachaPoolItem.js.map