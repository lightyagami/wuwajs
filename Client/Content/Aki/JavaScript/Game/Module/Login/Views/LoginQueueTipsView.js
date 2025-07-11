"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginQueueTipsView = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class LoginQueueTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.vSi = undefined;
    this.MSi = 0;
    this.ESi = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.ESi]];
  }
  OnBeforeDestroy() {
    if (ModelManager_1.ModelManager.LoginModel.HasAutoLoginPromise()) {
      ModelManager_1.ModelManager.LoginModel.FinishAutoLoginPromise(false);
    }
  }
  OnStart() {
    this.vSi = this.OpenParam;
    switch (this.vSi?.K9n) {
      case 0:
        this.GetText(0).ShowTextNew("NormalWaitTipsText");
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "ExpectWaitingTimeText", Math.round(this.vSi.Q9n / TimeUtil_1.TimeUtil.Minute).toString().padStart(2, "0"));
        this.SSi();
        break;
      case 1:
        this.GetText(0).ShowTextNew("specialWaitTipsText");
        this.GetText(1).SetUIActive(false);
        this.GetText(2).SetUIActive(false);
    }
  }
  OnTick(i) {
    this.MSi += i;
    this.SSi();
  }
  SSi() {
    var i;
    var e;
    if (this.GetText(2).IsUIActiveInHierarchy()) {
      i = Math.round(TimeUtil_1.TimeUtil.SetTimeSecond(this.MSi));
      e = Math.floor(i / TimeUtil_1.TimeUtil.Minute);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "AddWaitingTimeText", e.toString().padStart(2, "0"), (i % TimeUtil_1.TimeUtil.Minute).toString().padStart(2, "0"));
    }
  }
}
exports.LoginQueueTipsView = LoginQueueTipsView;
//# sourceMappingURL=LoginQueueTipsView.js.map