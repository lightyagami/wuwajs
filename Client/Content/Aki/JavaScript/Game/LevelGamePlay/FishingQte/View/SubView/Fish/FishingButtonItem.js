"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingButtonItem = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const LevelSequencePlayer_1 = require("../../../../../Module/Common/LevelSequencePlayer");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const FIXED_DIGITS = 1;
const ANIM_BUTTON_PAUSE = "BtnChange";
const ANIM_BUTTON_START = "BtnChangeBack";
class FishingButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.Gke = undefined;
    this.CurrentCdTime = 0;
    this.TotalCdTime = 0;
    this.ije = () => {
      this.Gke?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UIText]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(3).SetUIActive(false);
  }
  OnTick(t) {
    if (!(this.TotalCdTime <= 0)) {
      this.CurrentCdTime += t;
      this.sc_();
      if (this.CurrentCdTime >= this.TotalCdTime) {
        this.ac_();
      }
    }
  }
  OnBeforeDestroy() {
    this.Gke = undefined;
  }
  SetEnableClick(t) {
    this.GetButton(0)?.SetSelfInteractive(t);
  }
  IsButtonEnable() {
    return this.GetButton(0).GetEnable();
  }
  SetFunction(t) {
    this.Gke = t;
  }
  SetPauseWithoutAnim(t) {
    this.GetSprite(1).SetUIActive(!t);
    this.GetSprite(2).SetUIActive(t);
  }
  SetPause(t) {
    t = t ? ANIM_BUTTON_PAUSE : ANIM_BUTTON_START;
    this.LevelSequencePlayer.StopPlayingSequence(false, true);
    this.LevelSequencePlayer.PlayLevelSequenceByName(t);
  }
  sc_() {
    var t = (this.TotalCdTime - this.CurrentCdTime) / this.TotalCdTime;
    var e = (this.TotalCdTime - this.CurrentCdTime) / TimeUtil_1.TimeUtil.InverseMillisecond;
    this.GetSprite(4).SetFillAmount(t);
    this.GetText(5).SetText("" + e.toFixed(FIXED_DIGITS));
  }
  SetForbiddenStart(t) {
    if (!(t <= 0)) {
      this.SetEnableClick(false);
      this.CurrentCdTime = 0;
      this.TotalCdTime = t;
      this.sc_();
      this.GetItem(3).SetUIActive(true);
    }
  }
  ac_() {
    this.SetEnableClick(true);
    this.TotalCdTime = 0;
    this.GetItem(3).SetUIActive(false);
  }
}
exports.FishingButtonItem = FishingButtonItem;
//# sourceMappingURL=FishingButtonItem.js.map