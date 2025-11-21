"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCommandRewardSelect = undefined;
const SurvivorsRogueCommandBaseObtain_1 = require("./SurvivorsRogueCommandBaseObtain");
class SurvivorsRogueCommandRewardSelect extends SurvivorsRogueCommandBaseObtain_1.SurvivorsRogueCommandBaseObtain {
  constructor() {
    super(...arguments);
    this.StepSize = 1;
  }
  ToString() {
    return `[RewardSelect] Count: ${this.Uwd().zTd.length} `;
  }
  Uwd() {
    return this.Data.HTd.XTd;
  }
  GetViewInfo() {
    var e = this.Uwd();
    return {
      CaptionId: "SurvivorPropSelection_ScreenName",
      TitleId: "SurvivorsNewProp_Title",
      ButtonId: "SurvivorsNewProp_ConfirtButton",
      ChooseData: this.GetChooseData(e, 0),
      GoodsList: e.zTd
    };
  }
}
exports.SurvivorsRogueCommandRewardSelect = SurvivorsRogueCommandRewardSelect;
//# sourceMappingURL=SurvivorsRogueCommandRewardSelect.js.map