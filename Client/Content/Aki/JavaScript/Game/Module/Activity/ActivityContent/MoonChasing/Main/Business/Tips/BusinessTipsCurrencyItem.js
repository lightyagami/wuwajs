"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessTipsCurrencyItem = undefined;
const TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem");
const CommonCurrencyItem_1 = require("../../../../../../Common/CommonCurrencyItem");
const MoonChasingDefine_1 = require("../../MoonChasingDefine");
class BusinessTipsCurrencyItem extends CommonCurrencyItem_1.CommonCurrencyItem {
  constructor() {
    super(...arguments);
    this.GOe = undefined;
  }
  AddEventListener() {}
  RemoveEventListener() {}
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.xHe();
  }
  PlayReduceTweener(e, s) {
    if (this.GOe !== undefined) {
      this.xHe();
    }
    let t = 0;
    let i = e;
    const r = MoonChasingDefine_1.BUSINESS_TIPS_CURRENCY_TWEEN_TIME;
    this.GOe = TimerSystem_1.GameplayTimerSystem.Forever(e => {
      t = Math.min(t + e, r);
      e = i + Math.floor((s - i) * (e / r) * Math.random());
      i = e;
      this.RefreshCountText(e.toString());
      if (t >= r) {
        this.RefreshCountText(s.toString());
        this.xHe();
      }
    }, TimerSystem_1.MIN_TIME);
  }
  xHe() {
    if (this.GOe && TimerSystem_1.GameplayTimerSystem.Has(this.GOe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
}
exports.BusinessTipsCurrencyItem = BusinessTipsCurrencyItem;
//# sourceMappingURL=BusinessTipsCurrencyItem.js.map