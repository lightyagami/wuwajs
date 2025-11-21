"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueSettleExternalView = undefined;
const SurvivorsRogueSettleBaseView_1 = require("../../RogueFlow/View/SurvivorsRogueSettleBaseView");
class SurvivorsRogueSettleExternalView extends SurvivorsRogueSettleBaseView_1.SurvivorsRogueSettleBaseView {
  constructor() {
    super(...arguments);
    this.OnClickBtnReturnMain = () => {
      this.CloseMe();
    };
  }
  GetViewInfo() {
    return this.OpenParam;
  }
}
exports.SurvivorsRogueSettleExternalView = SurvivorsRogueSettleExternalView;
//# sourceMappingURL=SurvivorsRogueSettleExternalView.js.map