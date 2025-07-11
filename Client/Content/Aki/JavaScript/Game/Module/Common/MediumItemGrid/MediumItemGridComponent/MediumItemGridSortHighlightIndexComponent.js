"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridSortHighlightIndexComponent = undefined;
const UE = require("ue");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridSortHighlightIndexComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  GetResourceId() {
    return "UiItem_ItemSortNumYellow";
  }
  OnRefresh(e) {
    if (e === undefined || e === 0) {
      this.SetActive(false);
    } else {
      this.GetText(0).SetText(e.toString());
      this.SetActive(true);
    }
  }
}
exports.MediumItemGridSortHighlightIndexComponent = MediumItemGridSortHighlightIndexComponent;
//# sourceMappingURL=MediumItemGridSortHighlightIndexComponent.js.map