"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCommandRewardGot = undefined;
const SurvivorsRogueCommandBaseObtain_1 = require("./SurvivorsRogueCommandBaseObtain");
class SurvivorsRogueCommandRewardGot extends SurvivorsRogueCommandBaseObtain_1.SurvivorsRogueCommandBaseObtain {
  constructor() {
    super(...arguments);
    this.StepSize = 1;
  }
  ToString() {
    return `[RewardGot] Count: ${this.Uwd().zTd.length} `;
  }
  OnBindView() {
    if (this.ViewProxy) {
      let r = false;
      var o = new Set();
      for (const s of this.Uwd().zTd) {
        var e = s.VTd;
        switch (e.R5n) {
          case "kTd":
            r = true;
            break;
          case "qTd":
            var t = e.qTd.zys;
            o.add(t);
        }
      }
      this.ViewProxy.GetRoleStatePanel()?.RoleGrid?.SetSelectOn(r);
      for (const i of o) {
        this.ViewProxy.GetRoleStatePanel()?.GetWeaponGrid(i)?.SetSelectOn(true);
      }
    }
  }
  Uwd() {
    return this.Data.jTd.XTd;
  }
  GetViewInfo() {
    var r = this.Uwd();
    return {
      CaptionId: "SurvivorTreasure_ScreenName",
      TitleId: "SurvivorsTreasure_Title",
      ButtonId: "SurvivorsTreasure_ConfirtButton",
      ChooseData: this.GetChooseData(r),
      GoodsList: r.zTd
    };
  }
}
exports.SurvivorsRogueCommandRewardGot = SurvivorsRogueCommandRewardGot;
//# sourceMappingURL=SurvivorsRogueCommandRewardGot.js.map