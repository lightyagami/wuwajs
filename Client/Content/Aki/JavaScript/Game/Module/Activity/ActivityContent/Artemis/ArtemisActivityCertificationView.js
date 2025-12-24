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
    this.g5f = false;
    this.wQf = false;
    this.HDe = () => {};
    this.LSf = (i, t) => {
      if (t === "Sequence_Bottom_In") {
        this.wQf = true;
      }
    };
    this.gzm = () => {
      if (this.wQf) {
        this.HDe?.();
      }
    };
    this.C5f = () => {
      this.HDe?.();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIArtText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText]];
    this.BtnBindInfo = [[0, this.gzm]];
  }
  OnStart() {
    this.RootActor?.OnSequencePlayEvent.Bind(this.LSf);
    this.GetText(6)?.ShowTextNew("Activity_ArtemisChatFixTips_1");
    this.GetText(5)?.ShowTextNew("Activity_ArtemisChatFixTips_2");
    this.GetText(7)?.ShowTextNew("Activity_ArtemisChatFixTips_3");
    this.GetArtText(2)?.SetText("100");
  }
  OnAddEventListener() {
    this.UiViewSequence?.AddSequenceFinishEvent("Fix_Done_02", this.C5f);
  }
  OnRemoveEventListener() {
    this.UiViewSequence.RemoveSequenceFinishEvent("Fix_Done_02", this.C5f);
  }
  OnBeforeShow() {
    var i = this.OpenParam;
    this.wQf = false;
    this.g5f = i?.IsPlayFixedDone;
    this.HDe = i?.CallBack;
    if (this.g5f) {
      this.UiViewSequence?.PlaySequence("Fix_Done_02", true);
    } else {
      this.UiViewSequence?.PlaySequence("Wanring", true);
    }
  }
}
exports.ArtemisActivityCertificationView = ArtemisActivityCertificationView;
//# sourceMappingURL=ArtemisActivityCertificationView.js.map