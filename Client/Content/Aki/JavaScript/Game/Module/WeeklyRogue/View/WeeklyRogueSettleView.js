"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueSettleView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ActivityCorniceMeetingSettleView_1 = require("../../Activity/ActivityContent/CorniceMeeting/ActivityCorniceMeetingSettleView");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeeklyRogueSettleInfoPanel_1 = require("../Components/WeeklyRogueSettleInfoPanel");
const LEAVETIME = 30;
class WeeklyRogueSettleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ButtonMap = undefined;
    this.$Fe = undefined;
    this.Data = undefined;
    this.InfoPanel = undefined;
    this.zFe = () => {
      this.CloseMe(e => {
        if (e) {
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
        }
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [20, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Data = this.OpenParam;
    this.ButtonMap = new Map();
    this.InfoPanel = new WeeklyRogueSettleInfoPanel_1.WeeklyRogueSettleInfoPanel();
    await Promise.all([this.ZFe(), this.InfoPanel.CreateThenShowByResourceIdAsync("UiItem_ResultScoreB", this.GetItem(20))]);
    this.InfoPanel.UpdateData(this.Data);
  }
  OnBeforeShow() {
    this.e3e();
    this.RefreshTitle();
  }
  OnBeforeDestroy() {
    this.o3e();
  }
  RefreshTitle() {
    var e;
    if (this.Data !== undefined) {
      e = this.GetText(1);
      this.GetTexture(2)?.SetUIActive(false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Text_ChallengeFinish_Text");
      this.PlaySequence("Success");
    }
  }
  o3e() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.$Fe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.$Fe);
    }
    this.$Fe = undefined;
  }
  e3e() {
    let e = LEAVETIME + 1;
    this.$Fe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      if (e <= 0) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.$Fe);
        this.zFe();
      } else {
        this.ButtonMap.get(0).SetFloatText("InstanceDungeonLeftTimeToAutoLeave", (e--).toString());
      }
    }, CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  async ZFe() {
    this.GetItem(5)?.SetUIActive(false);
    await this.i3e(this.GetItem(5), 0, this.zFe);
    var e = this.ButtonMap.get(0);
    e.SetBtnText("Leave");
    e.SetFloatText("InstanceDungeonLeftTimeToAutoLeave", LEAVETIME.toString());
  }
  async i3e(e, t, i) {
    var s = this.GetItem(5);
    var r = this.GetItem(4);
    var s = LguiUtil_1.LguiUtil.DuplicateActor(s.GetOwner(), r);
    var r = new ActivityCorniceMeetingSettleView_1.ActivityCorniceMeetingButton();
    this.ButtonMap.set(t, r);
    await r.InitializeAsync(s, i);
    r.SetActive(true);
  }
}
exports.WeeklyRogueSettleView = WeeklyRogueSettleView;
//# sourceMappingURL=WeeklyRogueSettleView.js.map