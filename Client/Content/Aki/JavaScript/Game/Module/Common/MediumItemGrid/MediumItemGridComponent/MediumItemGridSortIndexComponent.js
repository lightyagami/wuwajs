"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridSortIndexComponent = undefined;
const UE = require("ue");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridSortIndexComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  GetResourceId() {
    return "UiItem_ItemSortNum";
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
exports.MediumItemGridSortIndexComponent = MediumItemGridSortIndexComponent;
//# sourceMappingURL=MediumItemGridSortIndexComponent.js.map