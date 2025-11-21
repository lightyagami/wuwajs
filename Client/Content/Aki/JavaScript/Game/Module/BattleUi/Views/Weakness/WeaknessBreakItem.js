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
    this.iym = undefined;
    this.sym = () => {
      this.iym = undefined;
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
    this.lym();
    this.iym = TimerSystem_1.TimerSystem.Delay(this.sym, 2000);
  }
  lym() {
    if (this.iym) {
      TimerSystem_1.TimerSystem.Remove(this.iym);
      this.iym = undefined;
    }
  }
  OnBeforeHide() {
    this.SPe?.StopPlayingSequence();
    this.sye = false;
    this.lym();
  }
}
exports.WeaknessBreakItem = WeaknessBreakItem;
//# sourceMappingURL=WeaknessBreakItem.js.map