"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryMainQuestView = undefined;
const UE = require("ue");
const HonamiStroyViewBase_1 = require("./HonamiStroyViewBase");
class HonamiStoryMainQuestView extends HonamiStroyViewBase_1.HonamiStoryViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UISliderComponent], [6, UE.UISliderComponent], [7, UE.UIItem], [8, UE.UIItem]];
  }
  OnInitData() {
    this.HpTextType = 2;
    this.InTweenType = 7;
    this.OutTweenType = 8;
    this.DangerPercentConfigId = "HonamiStoryMainQuestDangerLifeSupportPercent";
    this.ShowFunctionType = 10103;
    this.HideFunctionType = 10105;
  }
  OnStart() {
    super.OnStart();
    this.GetSlider(5).SetValue(this.DangerPercent);
    this.GetSlider(6).SetValue(this.DangerPercent);
  }
  OnRefreshAttribute(t) {
    this.GetSprite(0).SetFillAmount(t);
    this.GetSprite(1).SetFillAmount(t);
  }
  OnRefreshState(t) {
    t = t === 0;
    this.GetItem(3).SetUIActive(t);
    this.GetItem(4).SetUIActive(!t);
    t = UE.Color.FromHex(t ? "#E3F1F5" : "#E5426A");
    this.GetSprite(0).SetColor(t);
    this.GetSprite(1).SetColor(t);
  }
}
exports.HonamiStoryMainQuestView = HonamiStoryMainQuestView;
//# sourceMappingURL=HonamiStoryMainQuestView.js.map