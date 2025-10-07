"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCommandAdditionRewardGot = undefined;
const SurvivorsRogueCommandBaseObtain_1 = require("./SurvivorsRogueCommandBaseObtain");
class SurvivorsRogueCommandAdditionRewardGot extends SurvivorsRogueCommandBaseObtain_1.SurvivorsRogueCommandBaseObtain {
  constructor() {
    super(...arguments);
    this.StepSize = 1;
  }
  ToString() {
    return `[AdditionRewardGot] Count: ${this.hbd().IEd.length} `;
  }
  OnBindView() {
    if (this.ViewProxy) {
      let o = false;
      var t = new Set();
      for (const i of this.hbd().IEd) {
        var r = i.fEd;
        switch (r.R5n) {
          case "lEd":
            o = true;
            break;
          case "uEd":
            var e = r.uEd.zys;
            t.add(e);
        }
      }
      this.ViewProxy.GetRoleStatePanel()?.RoleGrid?.SetSelectOn(o);
      for (const s of t) {
        this.ViewProxy.GetRoleStatePanel()?.GetWeaponGrid(s)?.SetSelectOn(true);
      }
    }
  }
  hbd() {
    return this.Data.L7d.MEd;
  }
  GetViewInfo() {
    var o = this.hbd();
    return {
      TitleId: "SurvivorsItemAcquireAdditionallyTitle",
      ButtonId: "SurvivorsTreasure_ConfirtButton",
      ChooseData: this.GetChooseData(o),
      GoodsList: o.IEd
    };
  }
}
exports.SurvivorsRogueCommandAdditionRewardGot = SurvivorsRogueCommandAdditionRewardGot;
//# sourceMappingURL=SurvivorsRogueCommandAdditionRewardGot.js.map