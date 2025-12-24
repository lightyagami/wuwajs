"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleViewProxy = undefined;
class BattleViewProxy {
  constructor() {
    this.HeadStatePanel = undefined;
    this.BattleView = undefined;
  }
  RegisterBattleView(t) {
    this.BattleView = t;
  }
  GetTopPanelPhoneMsgButtonItem() {
    return this.BattleView.GetTopPanelPhoneMsgButtonItem();
  }
  GetTopPanelPhoneMsgButton() {
    return this.BattleView.GetTopPanelPhoneMsgButton();
  }
}
exports.BattleViewProxy = BattleViewProxy;
//# sourceMappingURL=BattleViewProxy.js.map