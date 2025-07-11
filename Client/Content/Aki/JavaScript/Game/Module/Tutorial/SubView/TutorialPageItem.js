"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialPageItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TutorialPageItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Xxt = undefined;
    this.Xxt = e;
  }
  Init() {
    this.CreateThenShowByActor(this.Xxt.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  UpdateShow(e) {
    this.GetItem(0).SetUIActive(e);
  }
}
exports.TutorialPageItem = TutorialPageItem;
//# sourceMappingURL=TutorialPageItem.js.map