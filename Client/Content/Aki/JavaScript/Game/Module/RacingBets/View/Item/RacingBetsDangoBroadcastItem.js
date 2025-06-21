"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsDangoBroadcastItem = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  RacingBetsDefine_1 = require("../../RacingBetsDefine");
class RacingBetsDangoBroadcastItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Iv1 = 0, this.Tv1 = 0, this.bv1 = !1, this.Kxc = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText]
    ]
  }
  Init(e) {
    this.Kxc = e
  }
  OnTick(e) {
    this.bv1 ? (this.Rv1(e), this.Tv1 += e, this.Tv1 > this.Iv1 && (this.Tv1 = 0, this.bv1 = !1)) : this.Lv1()
  }
  Rv1(e) {
    var t = this.GetText(1);
    t.SetAnchorOffsetX(t.GetAnchorOffsetX() - e * RacingBetsDefine_1.RACING_BETS_DANGO_BROADCAST_MOVE_SPEED)
  }
  Lv1() {
    this.bv1 = !0;
    var e = this.GetText(1),
      t = this.GetItem(0).Width;
    e.SetAnchorOffsetX(t), e.ShowTextNew(this.Kxc.GetDangoBroadcastText()), this.Iv1 = (t + e.GetTextRenderSize().X) / RacingBetsDefine_1.RACING_BETS_DANGO_BROADCAST_MOVE_SPEED + RacingBetsDefine_1.RACING_BETS_DANGO_BROADCAST_INTERVAL
  }
}
exports.RacingBetsDangoBroadcastItem = RacingBetsDangoBroadcastItem;
//# sourceMappingURL=RacingBetsDangoBroadcastItem.js.map