"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridPhantomSortNumComponent = undefined;
const UE = require("ue");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridPhantomSortNumComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  GetResourceId() {
    return "UiItem_ItemBSortNumA";
  }
  OnRefresh(e) {
    this.GetText(0).SetText(e.toString());
    this.SetActive(e > 0);
  }
}
exports.MediumItemGridPhantomSortNumComponent = MediumItemGridPhantomSortNumComponent;
//# sourceMappingURL=MediumItemGridPhantomSortNumComponent.js.map