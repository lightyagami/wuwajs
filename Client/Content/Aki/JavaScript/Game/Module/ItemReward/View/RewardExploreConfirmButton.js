"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardExploreConfirmButton = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreConfirmButton extends UiPanelBase_1.UiPanelBase {
  constructor(i, t) {
    super();
    this.gfi = undefined;
    this.ffi = undefined;
    this.pfi = undefined;
    this.gWs = undefined;
    this.fWs = undefined;
    this.vfi = () => {
      --this.ffi;
      if (this.ffi <= 0 && (this.Mfi(), this.gfi.OnTimeDownOnCallback && this.gfi.OnTimeDownOnCallback(), this.gfi.IsTimeDownCloseView)) {
        UiManager_1.UiManager.CloseView("ExploreRewardView");
      }
      var i = this.gfi.DescriptionTextId;
      var t = this.GetText(2);
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, i, this.ffi);
    };
    this.pWs = () => {
      var i;
      var t;
      var e;
      --this.gWs;
      if (this.gWs <= 0) {
        this.vWs();
        this.Sfi(this.gfi.ButtonTextId);
        this.GetButton(3)?.SetSelfInteractive(true);
      } else {
        i = this.GetText(0);
        t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.gfi.ButtonTextId);
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("OnClickCd");
        e = StringUtils_1.StringUtils.Format(e, this.gWs.toString());
        i?.SetText(t + e);
      }
    };
    this.UFe = () => {
      var i;
      var t;
      var e;
      var s = this.gfi.OnClickedCallback;
      if (s) {
        s(this.Efi);
      }
      var s = this.gfi?.ClickCd;
      if (s && s > 0) {
        this.MWs(s);
        this.GetButton(3)?.SetSelfInteractive(false);
        i = this.GetText(0);
        t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.gfi.ButtonTextId);
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("OnClickCd");
        e = StringUtils_1.StringUtils.Format(e, (s / TimeUtil_1.TimeUtil.InverseMillisecond).toString());
        i?.SetText(t + e);
      }
      if (this.gfi.IsClickedCloseView) {
        UiManager_1.UiManager.CloseView("ExploreRewardView");
      }
    };
    this.Efi = t;
    this.CreateThenShowByActor(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.UFe]];
  }
  OnBeforeDestroy() {
    this.Mfi();
    this.gfi = undefined;
  }
  Refresh(i) {
    this.gfi = i;
    this.Sfi(i.ButtonTextId);
    i = !StringUtils_1.StringUtils.IsEmpty(i.DescriptionTextId);
    this.yfi(i);
    if (i) {
      this.Ifi();
    }
  }
  Sfi(i) {
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, i);
  }
  yfi(i) {
    this.GetItem(1).SetUIActive(i);
  }
  Ifi() {
    var i = this.gfi.DescriptionTextId;
    var t = this.gfi.DescriptionArgs;
    var e = this.gfi.TimeDown;
    var s = this.GetText(2);
    if (e && e > 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, i, e / TimeUtil_1.TimeUtil.InverseMillisecond);
      this.Mfi();
      this.Tfi(e);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, i, ...t);
    }
  }
  Tfi(i) {
    this.ffi ||= i / TimeUtil_1.TimeUtil.InverseMillisecond;
    this.pfi = TimerSystem_1.GameplayTimerSystem.Forever(this.vfi, 1000);
  }
  Mfi() {
    if (this.pfi && TimerSystem_1.GameplayTimerSystem.Has(this.pfi)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.pfi);
      this.pfi = undefined;
    }
  }
  MWs(i) {
    this.gWs = i / TimeUtil_1.TimeUtil.InverseMillisecond;
    this.fWs = TimerSystem_1.GameplayTimerSystem.Forever(this.pWs, 1000);
  }
  vWs() {
    if (this.fWs && TimerSystem_1.GameplayTimerSystem.Has(this.fWs)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.fWs);
      this.fWs = undefined;
    }
  }
}
exports.RewardExploreConfirmButton = RewardExploreConfirmButton;
//# sourceMappingURL=RewardExploreConfirmButton.js.map