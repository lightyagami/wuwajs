"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryLeaveTip = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const HonamiStoryController_1 = require("../HonamiStoryController");
const HonamiStoryUtil_1 = require("../HonamiStoryUtil");
class HonamiStoryLeaveTip extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dcm = false;
    this.Fhf = false;
    this.osa = undefined;
    this.rsa = undefined;
    this.Ldu = () => {
      this.dcm = false;
      this.CloseMe();
      this.rsa?.();
    };
    this.Htu = () => {
      this.dcm = true;
      this.CloseMe();
      this.osa?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UIText]];
    this.BtnBindInfo = [[4, this.Ldu], [5, this.Htu], [6, this.Ldu], [7, this.Ldu]];
  }
  OnStart() {
    var i = this.OpenParam;
    this.Fhf = i.ShowSafeLeaveUpdate ?? false;
    this.osa = i.ConfirmCallback;
    this.rsa = i.CancelCallback;
    var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryTopTower() ? 3 : i.LeaveType;
    let o = "";
    let t = "";
    let a = "";
    let n = "";
    let r = "";
    let s = "";
    switch (i) {
      case 0:
        o = "HonamiStory_EvacuationWindow_1";
        t = "HonamiStory_EvacuationWindow_4";
        a = "HonamiStory_EvacuationWindow_5";
        n = "HonamiStory_EvacuationWindow_6";
        r = "HonamiStory_EvacuationWindow_2";
        s = "HonamiStory_EvacuationWindow_3";
        break;
      case 1:
        o = "HonamiStory_EvacuationWindow_9";
        t = "HonamiStory_EvacuationWindow_12";
        a = "HonamiStory_EvacuationWindow_13";
        n = "HonamiStory_EvacuationWindow_14";
        r = "HonamiStory_EvacuationWindow_10";
        s = "HonamiStory_EvacuationWindow_11";
        break;
      case 2:
        o = "HonamiStory_EvacuationWindow_1";
        t = "HonamiStory_EvacuationWindow_4";
        a = "HonamiStory_EvacuationWindow_5";
        n = "HonamiStory_EvacuationWindow_6";
        r = "HonamiStory_EvacuationWindow_7";
        s = "HonamiStory_EvacuationWindow_8";
        break;
      case 3:
        o = "HonamiStory_EvacuationWindow_15";
        t = "HonamiStory_EvacuationWindow_18";
        a = "HonamiStory_EvacuationWindow_19";
        n = "HonamiStory_EvacuationWindow_20";
        r = "HonamiStory_EvacuationWindow_16";
        s = "HonamiStory_EvacuationWindow_17";
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), o);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), s);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), a);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), n);
    this.UiViewSequence.StartSequenceName = i === 1 ? "FailStart" : "SuccessStart";
  }
  async OnPlayingCloseSequenceAsync() {
    await this.PlaySequenceAsync(this.dcm ? "Close1" : "Close2", true);
  }
  OnBeforeDestroy() {
    if (this.Fhf) {
      HonamiStoryController_1.HonamiStoryController.ShowSafeLeaveUpdate();
      this.Fhf = false;
    }
  }
}
exports.HonamiStoryLeaveTip = HonamiStoryLeaveTip;
//# sourceMappingURL=HonamiStoryLeaveTip.js.map