"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridEmptySlotComponent = undefined;
const UE = require("ue");
const MediumItemGridVisibleComponent_1 = require("./MediumItemGridVisibleComponent");
class MediumItemGridEmptySlotComponent extends MediumItemGridVisibleComponent_1.MediumItemGridVisibleComponent {
  constructor() {
    super(...arguments);
    this.oft = undefined;
    this.Iwt = () => {
      if (this.oft) {
        this.oft();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.Iwt]];
  }
  GetResourceId() {
    return "UiItem_ItemBtnAdd";
  }
  GetLayoutLevel() {
    return 1;
  }
  OnDeactivate() {
    this.oft = undefined;
  }
  BindEmptySlotButtonCallback(t) {
    this.oft = t;
  }
  UnBindEmptySlotButtonCallback() {
    this.oft = undefined;
  }
}
exports.MediumItemGridEmptySlotComponent = MediumItemGridEmptySlotComponent;
//# sourceMappingURL=MediumItemGridEmptySlotComponent.js.map