"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRoundTips = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class TrapDefenseRoundTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.TDe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    this.Data = this.OpenParam;
    this.GetArtText(0)?.SetText(this.Data.Round.toString());
    var e = ModelManager_1.ModelManager.TrapDefenseModel.GetCurrentBatchData();
    var i = !StringUtils_1.StringUtils.IsBlank(e.WaveWarningTips);
    this.GetItem(1)?.SetUIActive(i);
    if (i) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.WaveWarningTips);
    }
    this.tGo();
  }
  OnBeforeDestroy() {
    var e = this.Data?.Callback;
    if (e) {
      e();
    }
    this.cG();
  }
  tGo() {
    this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
      this.TDe = undefined;
      this.CloseMe();
    }, 3000);
  }
  cG() {
    if (this.TDe) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
}
exports.TrapDefenseRoundTips = TrapDefenseRoundTips;
//# sourceMappingURL=TrapDefenseRoundTips.js.map