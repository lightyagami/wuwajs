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
      let o = false;
      var r = new Set();
      for (const s of this.hbd().IEd) {
        var t = s.fEd;
        switch (t.R5n) {
          case "lEd":
            o = true;
            break;
          case "uEd":
            var e = t.uEd.zys;
            r.add(e);
        }
      }
      this.ViewProxy.GetRoleStatePanel()?.RoleGrid?.SetSelectOn(o);
      for (const i of r) {
        this.ViewProxy.GetRoleStatePanel()?.GetWeaponGrid(i)?.SetSelectOn(true);
      }
    }
  }
  hbd() {
    return this.Data.gEd.MEd;
  }
  GetViewInfo() {
    var o = this.hbd();
    return {
      TitleId: "SurvivorsTreasure_Title",
      ButtonId: "SurvivorsTreasure_ConfirtButton",
      ChooseData: this.GetChooseData(o),
      GoodsList: o.IEd
    };
  }
}
exports.SurvivorsRogueCommandRewardGot = SurvivorsRogueCommandRewardGot;
//# sourceMappingURL=SurvivorsRogueCommandRewardGot.js.map