"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookContentItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class HandBookContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.HandBookContentItemData = e;
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    var e;
    if (this.HandBookContentItemData) {
      e = this.GetText(0);
      if (this.HandBookContentItemData.Title) {
        e.SetUIActive(true);
        e.SetText(this.HandBookContentItemData.Title);
      } else {
        e.SetUIActive(false);
      }
      e = this.GetText(1);
      if (this.HandBookContentItemData.Desc) {
        e.SetUIActive(true);
        e.SetText(this.HandBookContentItemData.Desc);
      } else {
        e.SetUIActive(false);
      }
    }
  }
  OnBeforeDestroy() {}
}
exports.HandBookContentItem = HandBookContentItem;
//# sourceMappingURL=HandBookContentItem.js.map