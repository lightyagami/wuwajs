"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSuccessView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CommonSuccessData_1 = require("./CommonSuccessData");
class CommonSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.TimerId = undefined;
    this.Rvt = () => {
      if (!this.Pe.GetNeedDelay()) {
        this.$Oe();
      }
    };
  }
  OnBeforeCreate() {
    this.Pe = this.OpenParam ?? new CommonSuccessData_1.CommonSuccessData();
    this.Dbt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[3, this.Rvt]];
  }
  OnAfterPlayStartSequence() {
    this.UiViewSequence.PlaySequencePurely("Xunhuan");
    this.Rbt();
  }
  OnAfterShow() {
    this.Ubt();
    this.Abt();
    this.Pbt();
  }
  Dbt() {
    var i = this.Pe.GetAudioPath();
    if (i) {
      this.SetAudioEvent(i);
    }
  }
  Ubt() {
    var i;
    var e = this.Pe.GetTitleText();
    if (e) {
      i = this.GetText(0);
      LguiUtil_1.LguiUtil.SetLocalText(i, e);
    }
  }
  Abt() {
    var i = this.Pe.GetSubTitleText();
    var e = this.GetText(1);
    if (i) {
      e.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalText(e, i);
    } else {
      e.SetUIActive(false);
    }
  }
  Pbt() {
    var i;
    var e = this.Pe.GetClickText();
    if (e) {
      this.GetItem(4).SetUIActive(true);
      i = this.GetText(2);
      LguiUtil_1.LguiUtil.SetLocalText(i, e);
    }
  }
  Rbt() {
    if (this.Pe.GetNeedDelay()) {
      this.TimerId = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.$Oe();
      }, CommonSuccessView.rbt);
    }
  }
  $Oe() {
    var i = this.Pe.GetClickFunction();
    if (i) {
      i();
    }
    this.TimerId = undefined;
    this.CloseMe();
  }
  OnBeforeDestroy() {
    if (this.TimerId !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TimerId);
      this.TimerId = undefined;
    }
  }
}
(exports.CommonSuccessView = CommonSuccessView).rbt = 1500;
//# sourceMappingURL=CommonSuccessView.js.map