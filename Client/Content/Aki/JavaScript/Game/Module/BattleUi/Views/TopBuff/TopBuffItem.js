"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopBuffItem = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const VisibleStateUtil_1 = require("../../VisibleStateUtil");
const BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer");
class TopBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.InnerVisibleState = 1;
    this.TweenAnimPlayer = undefined;
  }
  SetActive(e) {
    if (this.GetVisible() !== e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "不要直接调用SetActive, 请调用SetVisible");
      }
    } else {
      super.SetActive(e);
    }
  }
  SetVisible(e, i) {
    var t = this.GetVisible();
    this.rJe(e, i);
    var e = this.GetVisible();
    if (t !== e) {
      this.SetActive(e);
    }
  }
  rJe(e, i) {
    this.InnerVisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(this.InnerVisibleState, i, e);
  }
  GetVisible() {
    return this.InnerVisibleState === 0;
  }
  InitTweenAnim(e) {
    this.TweenAnimPlayer ||= new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.TweenAnimPlayer.InitTweenAnim(e, this.GetItem(e));
  }
  PlayTweenAnim(e) {
    this.TweenAnimPlayer?.PlayTweenAnim(e);
  }
  StopTweenAnim(e) {
    this.TweenAnimPlayer?.StopTweenAnim(e);
  }
  ClearAllTweenAnim() {
    this.TweenAnimPlayer?.Clear();
  }
  SetTweenTimeScale(e, i) {
    this.TweenAnimPlayer?.SetTweenTimeScale(e, i);
  }
}
exports.TopBuffItem = TopBuffItem;
//# sourceMappingURL=TopBuffItem.js.map