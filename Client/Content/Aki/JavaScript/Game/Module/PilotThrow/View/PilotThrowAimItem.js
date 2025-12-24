"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PilotThrowAimItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PilotThrowAimItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    this.GetItem(0)?.SetUIActive(true);
    this.GetItem(1)?.SetUIActive(false);
  }
  OnFocusTarget(e) {
    if (e) {
      this.GetItem(0)?.SetUIActive(false);
      this.GetItem(1)?.SetUIActive(true);
      this.GetText(2)?.SetText(e);
    } else {
      this.GetItem(0)?.SetUIActive(true);
      this.GetItem(1)?.SetUIActive(false);
    }
  }
}
exports.PilotThrowAimItem = PilotThrowAimItem;
//# sourceMappingURL=PilotThrowAimItem.js.map