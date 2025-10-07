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
    return `[RewardGot] Count: ${this.hbd().IEd.length} `;
  }
  OnBindView() {
    if (this.ViewProxy) {
      let r = false;
      var o = new Set();
      for (const s of this.hbd().IEd) {
        var e = s.fEd;
        switch (e.R5n) {
          case "lEd":
            r = true;
            break;
          case "uEd":
            var t = e.uEd.zys;
            o.add(t);
        }
      }
      this.ViewProxy.GetRoleStatePanel()?.RoleGrid?.SetSelectOn(r);
      for (const i of o) {
        this.ViewProxy.GetRoleStatePanel()?.GetWeaponGrid(i)?.SetSelectOn(true);
      }
    }
  }
  hbd() {
    return this.Data.gEd.MEd;
  }
  GetViewInfo() {
    var r = this.hbd();
    return {
      CaptionId: "SurvivorTreasure_ScreenName",
      TitleId: "SurvivorsTreasure_Title",
      ButtonId: "SurvivorsTreasure_ConfirtButton",
      ChooseData: this.GetChooseData(r),
      GoodsList: r.IEd
    };
  }
}
exports.SurvivorsRogueCommandRewardGot = SurvivorsRogueCommandRewardGot;
//# sourceMappingURL=SurvivorsRogueCommandRewardGot.js.map