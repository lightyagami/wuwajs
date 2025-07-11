"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkTrackComponent = undefined;
const UE = require("ue");
const MarkPanelBase_1 = require("../MarkPanelBase");
class MarkTrackComponent extends MarkPanelBase_1.MarkPanelBase {
  constructor() {
    super(...arguments);
    this.MapType = 2;
    this.TrackFxScale = 1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UINiagara]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    var e = this.GetUiNiagara(0);
    if (e) {
      if (this.MapType === 2) {
        e.bAdaptPosAndSizeChanged = true;
      } else {
        e.bAdaptPosAndSizeChanged = false;
      }
    }
    var e = new UE.Vector(this.TrackFxScale, this.TrackFxScale, 1);
    this.RootItem.SetUIRelativeScale3D(e);
  }
}
exports.MarkTrackComponent = MarkTrackComponent;
//# sourceMappingURL=MarkTrackComponent.js.map