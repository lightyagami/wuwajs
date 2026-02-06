"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineAttributePanelLite = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const VisionRefineAttributeSelectItem_1 = require("./VisionRefineAttributeSelectItem");
class VisionRefineAttributePanelLite extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.I1c = undefined;
    this.Nji = undefined;
    this.T1c = () => {
      if (this.Nji) {
        this.Nji();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.T1c]];
  }
  async OnBeforeStartAsync() {
    this.I1c = new VisionRefineAttributeSelectItem_1.AttributeSelectItem();
    await this.I1c.CreateThenShowByActorAsync(this.GetButton(1).GetOwner());
  }
  RefreshItemSwitch(e) {
    this.I1c.RefreshUi(e);
  }
  RefreshTitle(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
  RefreshInteractive(e) {
    this.GetButton(1)?.SetSelfInteractive(e);
  }
  BindClickCallBack(e) {
    this.Nji = e;
  }
}
exports.VisionRefineAttributePanelLite = VisionRefineAttributePanelLite;
//# sourceMappingURL=VisionRefineAttributePanelLite.js.map