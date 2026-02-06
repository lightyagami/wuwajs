"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerCardBackItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class GuessJokerCardBackItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
  }
}
exports.GuessJokerCardBackItem = GuessJokerCardBackItem;
//# sourceMappingURL=GuessJokerCardBackItem.js.map