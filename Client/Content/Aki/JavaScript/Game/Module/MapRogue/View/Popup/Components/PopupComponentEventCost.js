"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupComponentEventCost = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class PopupComponentEventCost extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.InfoItem = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.InfoItem = new InfoItem();
    await this.InfoItem.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  Refresh(e) {
    var t = e.IsExplore;
    var i = e.EventCost;
    if (t || i === 0) {
      this.SetActive(false);
    } else {
      t = ModelManager_1.ModelManager.MapRogueModel.GameInfo.MoodItemId;
      i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RogueResEventMoodCost_2"), e.EventCost.toString());
      this.InfoItem.Refresh("RogueResEventMoodCost_1", t, i);
      this.SetActive(true);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && (e = this.InfoItem?.GetRootItem())) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.PopupComponentEventCost = PopupComponentEventCost;
class InfoItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText]];
  }
  Refresh(e, t, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
    this.SetItemIcon(this.GetTexture(1), t);
    this.GetText(2).SetText(i);
  }
}
//# sourceMappingURL=PopupComponentEventCost.js.map