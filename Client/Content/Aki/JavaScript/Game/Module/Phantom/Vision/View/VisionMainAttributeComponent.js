"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionMainAttributeComponent = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const VisionIdentifyAttributeItem_1 = require("./VisionIdentifyAttributeItem");
class VisionMainAttributeComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Layout = undefined;
    this.sGe = () => new VisionIdentifyAttributeItem_1.VisionIdentifyAttributeItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.Layout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.sGe);
    this.SetActive(true);
    this.GetItem(1).SetUIActive(false);
  }
  Update(e) {
    this.Layout.RefreshByData(e);
  }
}
exports.VisionMainAttributeComponent = VisionMainAttributeComponent;
//# sourceMappingURL=VisionMainAttributeComponent.js.map