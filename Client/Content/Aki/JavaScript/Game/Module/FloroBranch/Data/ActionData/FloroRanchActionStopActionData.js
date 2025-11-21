"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchActionStopActionData = undefined;
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const FloroRanchActionBase_1 = require("./FloroRanchActionBase");
class FloroRanchActionStopActionData extends FloroRanchActionBase_1.FloroRanchActionDataBase {
  constructor(o) {
    super(o);
    this.Fre = undefined;
    this.Fre = o.q_d;
  }
  async OnExecute() {
    if (!this.IsIgnoreCasterAnim) {
      await this.CasterEntity.GetUiItemComponent().PlayNormalAnim();
    }
    await this.WaitIfPause();
    if (!this.IsExit()) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(this.Fre.j_d);
    }
  }
}
exports.FloroRanchActionStopActionData = FloroRanchActionStopActionData;
//# sourceMappingURL=FloroRanchActionStopActionData.js.map