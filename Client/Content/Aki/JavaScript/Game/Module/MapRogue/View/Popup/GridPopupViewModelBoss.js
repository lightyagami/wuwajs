"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPopupViewModelBoss = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const GridPopupViewModelBase_1 = require("./GridPopupViewModelBase");
class GridPopupViewModelBoss extends GridPopupViewModelBase_1.GridPopupViewModelBase {
  constructor() {
    super(...arguments);
    this.RecommendTip = undefined;
    this.Button = undefined;
    this.EventCost = undefined;
    this.HasBtnDetail = true;
  }
  async Init() {
    this.RecommendTip = await this.View.InitRecommendTip();
    this.Button = await this.View.InitComponentButton();
    this.EventCost = await this.View.InitEventCost();
  }
  GetSubTxtInfo() {
    var i;
    if (this.GridData.Lv !== 0) {
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RogueRes_Block_Level");
      return StringUtils_1.StringUtils.Format(i, this.GridData.Lv.toString());
    }
  }
  RefreshTop() {
    this.EventCost.Refresh(this.GridData);
  }
  RefreshFunctional() {
    this.RecommendTip.SetActive(this.GridData.Lv !== 0);
    this.RecommendTip.SetTextChangeColor(this.GameInfo.TeamLv < this.GridData.Lv);
    this.RecommendTip.SetDescriptionByTextId("RogueRes_Block_Recommend_Level", this.GridData.Lv.toString());
    var i = this.EventAvailable();
    this.Button.SetUiActive(i);
    if (i) {
      this.Button.SetButtonTextByTextId("RogueRes_Block_Move");
      this.Button.SetButtonFunction(this.MoveButtonFunction);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i.length !== 0) {
      if (i[0] === "EventCost") {
        return this.EventCost?.GetGuideUiItemAndUiItemForShowEx(i);
      } else if (i[0] === "goto") {
        return this.Button?.GetGuideUiItemAndUiItemForShowEx(i);
      } else {
        return undefined;
      }
    }
  }
}
exports.GridPopupViewModelBoss = GridPopupViewModelBoss;
//# sourceMappingURL=GridPopupViewModelBoss.js.map