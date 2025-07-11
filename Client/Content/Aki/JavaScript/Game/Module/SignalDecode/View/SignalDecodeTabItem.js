"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalDecodeTabItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const BLACK_COLOR = "#000000FF";
class SignalDecodeTabItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, s, t) {
    super();
    this.TabIndex = e;
    this.WaveformId = s;
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIText]];
  }
  OnStart() {
    this.GetText(3).SetText(this.TabIndex.toString());
  }
  OnProcess(e) {
    var e = this.TabIndex === e;
    var s = this.GetSprite(0);
    var t = this.GetSprite(1);
    s.SetUIActive(!e);
    t.SetUIActive(e);
    var s = this.GetText(3);
    if (e) {
      s.SetColor(UE.Color.FromHex(BLACK_COLOR));
      s.SetAnchorOffsetY(30);
    } else {
      s.SetAnchorOffsetY(0);
    }
  }
  UpdateColor(e) {
    if (e) {
      this.GetSprite(0).SetColor(UE.Color.FromHex(e.ActiveColor));
      this.GetText(3).SetColor(UE.Color.FromHex(e.ActiveColor));
      this.GetSprite(1).SetColor(UE.Color.FromHex(e.ActiveColor));
      this.GetSprite(2).SetColor(UE.Color.FromHex(e.ActiveColor));
    }
  }
  SetComplete() {
    this.GetSprite(2).SetUIActive(true);
  }
}
exports.SignalDecodeTabItem = SignalDecodeTabItem;
//# sourceMappingURL=SignalDecodeTabItem.js.map