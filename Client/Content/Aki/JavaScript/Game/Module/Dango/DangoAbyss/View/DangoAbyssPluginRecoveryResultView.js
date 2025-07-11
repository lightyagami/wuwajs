"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssPluginRecoveryResultView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const DangoAbyssPluginRecoveryView_1 = require("./DangoAbyssPluginRecoveryView");
class DangoAbyssPluginRecoveryResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.c3a = undefined;
    this.W2e = () => {
      return new DangoAbyssPluginRecoveryView_1.RecoveryRewardItem();
    };
    this.D1c = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIGridLayout], [3, UE.UIItem], [4, UE.UIGridLayout]];
    this.BtnBindInfo = [[1, this.D1c]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(3).SetUIActive(false);
    this.GetGridLayout(4).RootUIComp.SetUIActive(false);
    this.GetGridLayout(2).SetAlign(1);
    var e = this.OpenParam;
    if (!e || e.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Calabash", 75, "Proto_AbyssPluginSynthesisResponse.Proto_OutputItems为空");
      }
    } else {
      var s = [];
      for (const t of e) {
        var i = {
          ItemId: t.s5n,
          Count: t.m9n,
          IncId: t.b9n
        };
        s.push(i);
      }
      this.c3a = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.W2e, this.GetItem(0).GetOwner());
      await this.c3a.RefreshByDataAsync(s);
    }
  }
}
exports.DangoAbyssPluginRecoveryResultView = DangoAbyssPluginRecoveryResultView;
//# sourceMappingURL=DangoAbyssPluginRecoveryResultView.js.map