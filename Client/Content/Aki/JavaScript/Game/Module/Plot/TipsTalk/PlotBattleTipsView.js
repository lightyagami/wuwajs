"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotBattleTipsView = undefined;
const UE = require("ue");
const PlotTipsViewBase_1 = require("./PlotTipsViewBase");
class PlotBattleTipsView extends PlotTipsViewBase_1.PlotTipsViewBase {
  constructor() {
    super();
    this.ResourceId = "UiView_BattleTips_Prefab";
    this.OverrideAudioEventName = "play_external_vo_subtitle_assist";
    this.OverrideAudioSrcName = "external_plot_voice_assist";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText]];
  }
  OnInit() {
    this.IconItem = this.GetTexture(1);
    this.SubtitleItem = this.GetText(3);
    this.NameItem = this.GetText(2);
  }
}
exports.PlotBattleTipsView = PlotBattleTipsView;
//# sourceMappingURL=PlotBattleTipsView.js.map