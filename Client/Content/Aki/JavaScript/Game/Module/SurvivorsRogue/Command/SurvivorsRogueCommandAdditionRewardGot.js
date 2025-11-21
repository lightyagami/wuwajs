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
    return `[AdditionRewardGot] Count: ${this.Uwd().zTd.length} `;
  }
  OnBindView() {
    if (this.ViewProxy) {
      let o = false;
      var r = new Set();
      for (const i of this.Uwd().zTd) {
        var t = i.VTd;
        switch (t.R5n) {
          case "kTd":
            o = true;
            break;
          case "qTd":
            var e = t.qTd.zys;
            r.add(e);
        }
      }
      this.ViewProxy.GetRoleStatePanel()?.RoleGrid?.SetSelectOn(o);
      for (const s of r) {
        this.ViewProxy.GetRoleStatePanel()?.GetWeaponGrid(s)?.SetSelectOn(true);
      }
    }
  }
  Uwd() {
    return this.Data.Wzd.XTd;
  }
  GetViewInfo() {
    var o = this.Uwd();
    return {
      CaptionId: "SurvivorPropObtain_ScreenName",
      TitleId: "SurvivorsItemAcquireAdditionallyTitle",
      ButtonId: "SurvivorsTreasure_ConfirtButton",
      ChooseData: this.GetChooseData(o),
      GoodsList: o.zTd
    };
  }
}
exports.SurvivorsRogueCommandAdditionRewardGot = SurvivorsRogueCommandAdditionRewardGot;
//# sourceMappingURL=SurvivorsRogueCommandAdditionRewardGot.js.map