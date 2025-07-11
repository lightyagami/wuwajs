"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessTipsBurstView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase");
class BusinessTipsBurstView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData();
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(e.TriggerEventRoleId);
    await this.SetTextureAsync(e.HeadIcon, this.GetTexture(0));
  }
  OnBeforeShow() {
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      ControllerHolder_1.ControllerHolder.MoonChasingController.OpenResultView();
    }, 2000);
  }
}
exports.BusinessTipsBurstView = BusinessTipsBurstView;
//# sourceMappingURL=BusinessTipsBurstView.js.map