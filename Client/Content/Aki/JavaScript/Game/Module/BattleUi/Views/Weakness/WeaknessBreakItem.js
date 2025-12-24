"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaknessBreakItem = undefined;
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class WeaknessBreakItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.sye = false;
    this.SLm = undefined;
    this.TLm = () => {
      this.SLm = undefined;
      this.sye = false;
      this.Hide();
    };
  }
  async InitializeAsync(e) {
    await this.CreateByResourceIdAsync("UiItem_FightJumpWords", e);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Play() {
    if (!this.sye) {
      this.sye = true;
      this.Show();
    }
  }
  OnAfterShow() {
    this.SPe?.PlayLevelSequenceByName("Start");
    this.wLm();
    this.SLm = TimerSystem_1.TimerSystem.Delay(this.TLm, 2000);
  }
  wLm() {
    if (this.SLm) {
      TimerSystem_1.TimerSystem.Remove(this.SLm);
      this.SLm = undefined;
    }
  }
  OnBeforeHide() {
    this.SPe?.StopPlayingSequence();
    this.sye = false;
    this.wLm();
  }
}
exports.WeaknessBreakItem = WeaknessBreakItem;
//# sourceMappingURL=WeaknessBreakItem.js.map