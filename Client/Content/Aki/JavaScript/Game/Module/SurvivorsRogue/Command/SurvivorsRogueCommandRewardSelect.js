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
    return `[RewardSelect] Count: ${this.hbd().IEd.length} `;
  }
  hbd() {
    return this.Data.CEd.MEd;
  }
  GetViewInfo() {
    var e = this.hbd();
    return {
      TitleId: "SurvivorsNewProp_Title",
      ButtonId: "SurvivorsNewProp_ConfirtButton",
      ChooseData: this.GetChooseData(e, 0),
      GoodsList: e.IEd
    };
  }
}
exports.SurvivorsRogueCommandRewardSelect = SurvivorsRogueCommandRewardSelect;
//# sourceMappingURL=SurvivorsRogueCommandRewardSelect.js.map