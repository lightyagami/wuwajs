"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicMaskButton = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
class DynamicMaskButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Gke = undefined;
    this.nPr = undefined;
    this.Bxo = undefined;
    this.sPr = undefined;
    this.ije = () => {
      this.Gke?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  OnAfterShow() {
    var i;
    var t;
    if (this.nPr?.IsValid()) {
      t = this.RootItem.D_K2_GetComponentToWorld().Inverse();
      i = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.nPr.RelativeLocation);
      i = this.nPr.GetParentAsUIItem().D_K2_GetComponentToWorld().TransformPosition(i);
      t = t.TransformPosition(i);
      this.nPr.SetUIParent(this.RootItem, true);
      this.nPr.K2_SetRelativeLocation(t.op_ToVector(), false, undefined, false);
    }
  }
  SetButtonFunction(i) {
    this.Gke = i;
  }
  async Init(i) {
    if (i) {
      await this.CreateByResourceIdAsync("UiItem_BtnMask", i);
    } else {
      await this.CreateByResourceIdAsync("UiItem_BtnMask", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop));
    }
  }
  SetAttachChildItem(i) {
    this.nPr = i;
    this.Bxo = i.GetParentAsUIItem();
    this.sPr = i.D_GetRelativeTransform();
  }
  ResetItemParent() {
    if (this.nPr && this.Bxo) {
      this.nPr.SetUIParent(this.Bxo);
      this.nPr.D_K2_SetRelativeTransform(this.sPr, false, undefined, false);
    }
  }
}
exports.DynamicMaskButton = DynamicMaskButton;
//# sourceMappingURL=DynamicMaskButton.js.map