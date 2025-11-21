"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCardComponentLvDesc = undefined;
const UE = require("ue");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SurvivorsRogueCardComponent_1 = require("./SurvivorsRogueCardComponent");
class SurvivorsRogueCardComponentLvDesc extends SurvivorsRogueCardComponent_1.SurvivorsRogueCardComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnGetResourceId() {
    return "UiItem_SurvivorsCardTips";
  }
  GetLayoutLevel() {
    return 1;
  }
  OnRefresh(e, r) {
    if (e) {
      switch (r) {
        case 2:
          this.SetText("SurvivorsCard_RoleLv", e.toString());
          break;
        case 1:
          this.SetText("SurvivorsCard_WeaponLv", e.toString());
      }
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
  SetText(e, ...r) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, ...r);
  }
}
exports.SurvivorsRogueCardComponentLvDesc = SurvivorsRogueCardComponentLvDesc;
//# sourceMappingURL=SurvivorsRogueCardComponentLvDesc.js.map