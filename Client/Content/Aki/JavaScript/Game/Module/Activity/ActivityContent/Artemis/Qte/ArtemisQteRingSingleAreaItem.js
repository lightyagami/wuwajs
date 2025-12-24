"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisQteRingSingleAreaItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class ArtemisQteRingSingleAreaItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.awl = new UE.FName("Progress");
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture]];
  }
  OnBeforeDestroy() {
    this.awl = undefined;
  }
  SetFillAmount(e) {
    this.GetTexture(0)?.SetFillAmount(e);
    this.GetTexture(1)?.SetFillAmount(e);
  }
  SetCustomMaterialScalarParameter(e) {
    this.GetTexture(0)?.SetCustomMaterialScalarParameter(this.awl, e);
    this.GetTexture(1)?.SetCustomMaterialScalarParameter(this.awl, e);
  }
  SetHighLight(e) {
    this.GetTexture(0).SetUIActive(!e);
    this.GetTexture(1).SetUIActive(e);
  }
}
exports.ArtemisQteRingSingleAreaItem = ArtemisQteRingSingleAreaItem;
//# sourceMappingURL=ArtemisQteRingSingleAreaItem.js.map