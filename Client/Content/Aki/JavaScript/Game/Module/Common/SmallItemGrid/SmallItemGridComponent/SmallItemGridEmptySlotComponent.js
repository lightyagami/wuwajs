"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallItemGridEmptySlotComponent = undefined;
const UE = require("ue");
const SmallItemGridVisibleComponent_1 = require("./SmallItemGridVisibleComponent");
class SmallItemGridEmptySlotComponent extends SmallItemGridVisibleComponent_1.SmallItemGridVisibleComponent {
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
    return "UiItem_ItemBStateAdd";
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
exports.SmallItemGridEmptySlotComponent = SmallItemGridEmptySlotComponent;
//# sourceMappingURL=SmallItemGridEmptySlotComponent.js.map