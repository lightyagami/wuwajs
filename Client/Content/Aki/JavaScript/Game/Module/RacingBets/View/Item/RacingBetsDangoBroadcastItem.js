"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDangoBroadcastItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const RacingBetsDefine_1 = require("../../RacingBetsDefine");
class RacingBetsDangoBroadcastItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Kv1 = 0;
    this.Xv1 = 0;
    this.Yv1 = false;
    this.Kxc = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText]];
  }
  Init(e) {
    this.Kxc = e;
  }
  OnTick(e) {
    if (this.Yv1) {
      this.zv1(e);
      this.Xv1 += e;
      if (this.Xv1 > this.Kv1) {
        this.Xv1 = 0;
        this.Yv1 = false;
      }
    } else {
      this.Jv1();
    }
  }
  zv1(e) {
    var t = this.GetText(1);
    t.SetAnchorOffsetX(t.GetAnchorOffsetX() - e * RacingBetsDefine_1.RACING_BETS_DANGO_BROADCAST_MOVE_SPEED);
  }
  Jv1() {
    this.Yv1 = true;
    var e = this.GetText(1);
    var t = this.GetItem(0).Width;
    e.SetAnchorOffsetX(t);
    e.ShowTextNew(this.Kxc.GetDangoBroadcastText());
    this.Kv1 = (t + e.GetTextRenderSize().X) / RacingBetsDefine_1.RACING_BETS_DANGO_BROADCAST_MOVE_SPEED + RacingBetsDefine_1.RACING_BETS_DANGO_BROADCAST_INTERVAL;
  }
}
exports.RacingBetsDangoBroadcastItem = RacingBetsDangoBroadcastItem;
//# sourceMappingURL=RacingBetsDangoBroadcastItem.js.map