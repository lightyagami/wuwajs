"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SdkTipsPopUpView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const AUTOCLOSETIME = 10;
const LOGINCLOSETIME = 2000;
class SdkTipsPopUpView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.bWe = false;
    this.Pe = undefined;
    this.Uqe = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem]];
  }
  OnStart() {
    var e = this.OpenParam;
    if ((this.Pe = e).ViewType === 1) {
      this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          this.bWe = true;
        }, LOGINCLOSETIME);
      });
    } else {
      this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
        this.UiViewSequence.PlaySequence("Loop");
      });
    }
    this.GetItem(2)?.SetUIActive(e.ViewType === 1);
    this.GetItem(0)?.SetUIActive(e.ViewType === 0);
    this.T2e(e);
  }
  OnBeforeShow() {
    if (this.Pe?.NeedMask) {
      UiLayer_1.UiLayer.SetShowMaskLayer("SdkLoading", true);
    }
  }
  OnBeforeHide() {
    if (this.Pe?.NeedMask) {
      UiLayer_1.UiLayer.SetShowMaskLayer("SdkLoading", false);
    }
  }
  OnTick(e) {
    if (this.bWe && this.IsShow) {
      this.bWe = false;
      this.CloseMe();
    }
    if (this.Pe?.ViewType === 0 && (this.Uqe += e / CommonDefine_1.MILLIONSECOND_PER_SECOND, this.Uqe >= AUTOCLOSETIME)) {
      this.CloseMe();
    }
  }
  T2e(e) {
    this.GetText(1)?.SetText(e.Text);
  }
}
exports.SdkTipsPopUpView = SdkTipsPopUpView;
//# sourceMappingURL=SdkTipsPopUpView.js.map