"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisActivityCertificationView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
class ArtemisActivityCertificationView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.YWf = false;
    this.iag = false;
    this.HDe = () => {};
    this.CIf = (i, t) => {
      if (t === "Sequence_Bottom_In") {
        this.iag = true;
      }
    };
    this.ZZm = () => {
      if (this.iag) {
        this.HDe?.();
      }
    };
    this.zWf = () => {
      this.HDe?.();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIArtText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText]];
    this.BtnBindInfo = [[0, this.ZZm]];
  }
  OnStart() {
    this.RootActor?.OnSequencePlayEvent.Bind(this.CIf);
    this.GetText(6)?.ShowTextNew("Activity_ArtemisChatFixTips_1");
    this.GetText(5)?.ShowTextNew("Activity_ArtemisChatFixTips_2");
    this.GetText(7)?.ShowTextNew("Activity_ArtemisChatFixTips_3");
    this.GetArtText(2)?.SetText("100");
  }
  OnAddEventListener() {
    this.UiViewSequence?.AddSequenceFinishEvent("Fix_Done_02", this.zWf);
  }
  OnRemoveEventListener() {
    this.UiViewSequence.RemoveSequenceFinishEvent("Fix_Done_02", this.zWf);
  }
  OnBeforeShow() {
    var i = this.OpenParam;
    this.iag = false;
    this.YWf = i?.IsPlayFixedDone;
    this.HDe = i?.CallBack;
    if (this.YWf) {
      this.UiViewSequence?.PlaySequence("Fix_Done_02", true);
    } else {
      this.UiViewSequence?.PlaySequence("Wanring", true);
    }
  }
}
exports.ArtemisActivityCertificationView = ArtemisActivityCertificationView;
//# sourceMappingURL=ArtemisActivityCertificationView.js.map