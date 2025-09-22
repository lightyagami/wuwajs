"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotPhotoTipsView = undefined;
const UE = require("ue");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const PlotTipsViewBase_1 = require("./PlotTipsViewBase");
class PlotPhotoTipsView extends PlotTipsViewBase_1.PlotTipsViewBase {
  constructor() {
    super();
    this.ResourceId = "UiView_PhotoTips_Prefab";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  OnInit() {
    this.IconItem = this.GetTexture(0);
    this.SubtitleItem = this.GetText(1);
  }
  GetParentItem() {
    return UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.BattleFloat);
  }
}
exports.PlotPhotoTipsView = PlotPhotoTipsView;
//# sourceMappingURL=PlotPhotoTipsView.js.map