"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridRightTopValueComponent = undefined;
const UE = require("ue");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridRightTopValueComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  GetResourceId() {
    return "UiItem_EnemyCount";
  }
  OnRefresh(e) {
    var t = !!e;
    this.SetActive(t);
    if (t) {
      this.GetText(0)?.SetText(e);
    }
  }
  GetLayoutLevel() {
    return 1;
  }
}
exports.MediumItemGridRightTopValueComponent = MediumItemGridRightTopValueComponent;
//# sourceMappingURL=MediumItemGridRightTopValueComponent.js.map