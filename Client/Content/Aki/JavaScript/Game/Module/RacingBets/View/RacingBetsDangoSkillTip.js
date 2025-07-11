"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDangoSkillTip = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const DangoManager_1 = require("../../Dango/DangoLogic/DangoManager");
class RacingBetsDangoSkillTip extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    var e = DangoManager_1.DangoManager.GetDangoData(e[0]);
    this.SetTextureShowUntilLoaded(e.IconAttack, this.GetTexture(0));
    this.GetText(1).SetText(e.GetDangoActiveSkillDesc());
  }
  OnAfterPlayStartSequence() {
    TimerSystem_1.TimerSystem.Next(() => {
      var e = this.OpenParam;
      this.CloseMe();
      e[1].SetResult(undefined);
    });
  }
}
exports.RacingBetsDangoSkillTip = RacingBetsDangoSkillTip;
//# sourceMappingURL=RacingBetsDangoSkillTip.js.map