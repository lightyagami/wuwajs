"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanoramicPointUnlockTipsView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TimeUtil_1 = require("../../Common/TimeUtil");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const LguiUtil_1 = require("../Util/LguiUtil");
class PanoramicPointUnlockTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.nZ1 = 0;
    this.sZ1 = false;
    this.r1t = CommonParamById_1.configCommonParamById.GetFloatConfig("PanoramicPointTipsDuration") * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.eTt = () => {
      const i = {
        SelectedId: this.OpenParam.ConfigId
      };
      UiManager_1.UiManager.OpenView("HandBookEntranceView", {
        SelectedTabType: 2
      }, () => {
        UiManager_1.UiManager.OpenView("GeographyHandBookView", i);
      });
      this.UiViewSequence.PlaySequence("CloseTips", true);
    };
    this.aZ1 = () => {
      this.UiViewSequence.PlaySequence("StartAtOnce");
      this.sZ1 = true;
    };
    this.hZ1 = () => {
      this.sZ1 = false;
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UIButtonComponent], [3, UE.UISprite], [4, UE.UIText]];
    this.BtnBindInfo = [[2, this.eTt]];
  }
  async OnBeforeStartAsync() {
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("PanoramicPointTipsIcon");
    await this.SetSpriteAsync(i, this.GetSprite(1), false);
  }
  OnStart() {
    this.sZ1 = false;
    this.nZ1 = 0;
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("PanoramicPointTipsTitle");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i);
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("PanoramicPointTipsDescription");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i);
    this.UiViewSequence.AddSequenceFinishEvent("StartTips", this.aZ1);
    this.UiViewSequence.AddSequenceFinishEvent("CloseTips", this.hZ1);
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("StartTips");
  }
  OnTick(i) {
    var t;
    if (this.sZ1) {
      if (this.nZ1 >= this.r1t) {
        this.UiViewSequence.PlaySequence("CloseTips", true);
        this.sZ1 = false;
      } else {
        t = this.GetSprite(3);
        this.nZ1 += i;
        i = Math.max(this.r1t - this.nZ1, 0);
        t?.SetFillAmount(i / this.r1t);
      }
    }
  }
}
exports.PanoramicPointUnlockTipsView = PanoramicPointUnlockTipsView;
//# sourceMappingURL=PanoramicPointUnlockTipsView.js.map