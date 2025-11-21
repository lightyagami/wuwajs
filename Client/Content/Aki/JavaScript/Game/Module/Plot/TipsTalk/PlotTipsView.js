"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotTipsView = undefined;
const UE = require("ue");
const PlotTipsViewBase_1 = require("./PlotTipsViewBase");
class PlotTipsView extends PlotTipsViewBase_1.PlotTipsViewBase {
  constructor() {
    super();
    this.ResourceId = "UiView_MascotTips";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  OnInit() {
    this.IconItem = this.GetTexture(0);
    this.SubtitleItem = this.GetText(1);
  }
}
exports.PlotTipsView = PlotTipsView;
//# sourceMappingURL=PlotTipsView.js.map