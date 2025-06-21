"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GridPopupViewModelEvent = void 0;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  GridPopupViewModelBase_1 = require("./GridPopupViewModelBase");
class GridPopupViewModelEvent extends GridPopupViewModelBase_1.GridPopupViewModelBase {
  constructor() {
    super(...arguments), this.RecommendTip = void 0, this.Button = void 0, this.InfoList = void 0, this.EventCost = void 0, this.HasBtnDetail = !1
  }
  async Init() {
    this.GridData.IsExplore || (this.RecommendTip = await this.View.InitRecommendTip()), this.Button = await this.View.InitComponentButton(), this.InfoList = await this.View.InitInfoList(), this.EventCost = await this.View.InitEventCost()
  }
  RefreshTop() {
    this.EventCost.Refresh(this.GridData)
  }
  GetSubTxtInfo() {
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RogueRes_Block_Level");
    return StringUtils_1.StringUtils.Format(t, this.GridData.Lv.toString())
  }
  RefreshBottom() {
    this.InfoList.Refresh(this.GridData)
  }
  RefreshFunctional() {
    this.GridData.IsExplore || (this.RecommendTip.SetTextChangeColor(this.GameInfo.TeamLv < this.GridData.Lv), this.RecommendTip.SetDescriptionByTextId("RogueRes_Block_Recommend_Level", this.GridData.Lv.toString()));
    var t = this.EventAvailable();
    this.Button.SetUiActive(t), t && (this.Button.SetButtonTextByTextId("RogueRes_Block_Move"), this.Button.SetButtonFunction(this.MoveButtonFunction))
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (0 !== t.length) return "EventCost" === t[0] ? this.EventCost?.GetGuideUiItemAndUiItemForShowEx(t) : "goto" === t[0] ? this.Button?.GetGuideUiItemAndUiItemForShowEx(t) : "InfoList" === t[0] && (t = this.InfoList?.GetRootItem()) ? [t, t] : void 0
  }
}
exports.GridPopupViewModelEvent = GridPopupViewModelEvent;
//# sourceMappingURL=GridPopupViewModelEvent.js.map