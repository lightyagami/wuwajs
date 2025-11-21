"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryView = undefined;
const UE = require("ue");
const HonamiStroyViewBase_1 = require("./HonamiStroyViewBase");
class HonamiStoryView extends HonamiStroyViewBase_1.HonamiStoryViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UISprite], [0, UE.UISprite], [3, UE.UISprite], [2, UE.UISprite], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  OnInitData() {
    this.HpTextType = 4;
    this.InTweenType = 7;
    this.OutTweenType = 8;
    this.DangerPercentConfigId = "HonamiStoryDangerLifeSupportPercent";
    this.ShowFunctionType = 10105;
  }
  OnRefreshAttribute(t, i) {
    if (i === 0) {
      i = (t - this.DangerPercent) / this.NormalPercent;
      this.GetSprite(1).SetFillAmount(i);
      this.GetSprite(3).SetFillAmount(i);
    } else {
      i = t / this.DangerPercent;
      this.GetSprite(0).SetFillAmount(i);
      this.GetSprite(2).SetFillAmount(i);
    }
  }
  OnRefreshState(t) {
    var i;
    var s;
    var t = t === 0;
    this.GetItem(5).SetUIActive(t);
    this.GetItem(6).SetUIActive(!t);
    if (t) {
      t = this.GetSprite(0);
      i = this.GetSprite(2);
      t.SetFillAmount(1);
      i.SetFillAmount(1);
      s = UE.Color.FromHex("#E3F1F5");
      t.SetColor(s);
      i.SetColor(s);
    } else {
      this.GetSprite(1).SetFillAmount(0);
      this.GetSprite(3).SetFillAmount(0);
      t = UE.Color.FromHex("#E5426A");
      this.GetSprite(0).SetColor(t);
      this.GetSprite(2).SetColor(t);
    }
  }
}
exports.HonamiStoryView = HonamiStoryView;
//# sourceMappingURL=HonamiStoryView.js.map