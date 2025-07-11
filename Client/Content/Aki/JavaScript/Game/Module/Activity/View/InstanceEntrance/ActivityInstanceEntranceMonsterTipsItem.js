"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityInstanceEntranceMonsterTipsItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivityInstanceEntranceMonsterTipsItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.Gli = () => {
      var e = this.$8i.GetActivityEntranceSelectItemData().GetCurrentSelectData().GetSelectDataIndex();
      var s = this.$8i.GetActivityEntranceMonsterPreviewData().GetPreviewCallBack();
      if (s) {
        s(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.Gli]];
  }
  RefreshView(e) {
    this.$8i = e;
    var e = this.$8i.GetActivityEntranceSelectItemData().GetCurrentSelectData().GetSelectDataIndex();
    var s = this.$8i.GetActivityEntranceMonsterPreviewData();
    var t = s.GetMonsterTips(e);
    var s = s.GetMonsterPreviewState(e);
    this.GetText(0)?.SetText(t);
    this.GetButton(1)?.RootUIComp.SetUIActive(s);
  }
}
exports.ActivityInstanceEntranceMonsterTipsItem = ActivityInstanceEntranceMonsterTipsItem;
//# sourceMappingURL=ActivityInstanceEntranceMonsterTipsItem.js.map