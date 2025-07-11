"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRunSuccessView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityParkourButton_1 = require("./ActivityParkourButton");
const ActivityRunController_1 = require("./ActivityRunController");
const LEAVETIME = 30;
const SUCCESS_OUTLINE_COLOR = "CC9548FF";
const TARGET_ICON_PATH = "/Game/Aki/UI/UIResources/Common/Image/IconForceLogo/T_Logo_10_UI.T_Logo_10_UI";
class ActivityRunSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.$Fe = undefined;
    this.YFe = undefined;
    this.ButtonMap = undefined;
    this.JFe = () => {
      ActivityRunController_1.ActivityRunController.RequestTransToParkourChallenge(this.YFe.CurrentChallengeId);
    };
    this.zFe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.ButtonMap = new Map();
    await this.ZFe();
  }
  async ZFe() {
    this.GetItem(5)?.SetUIActive(false);
    var e = this.i3e(this.GetItem(5), 0, this.zFe);
    var i = this.i3e(this.GetItem(5), 1, this.JFe);
    await Promise.all([e, i]);
    var e = this.ButtonMap.get(0);
    var i = this.ButtonMap.get(1);
    e.SetBtnText("Leave");
    e.SetFloatText("InstanceDungeonLeftTimeToAutoLeave", LEAVETIME.toString());
    i.SetBtnText("ChallengeAgain");
  }
  async i3e(e, i, t) {
    var s = this.GetItem(5);
    var r = this.GetItem(4);
    var s = LguiUtil_1.LguiUtil.DuplicateActor(s.GetOwner(), r);
    var r = new ActivityParkourButton_1.ActivityParkourButton();
    this.ButtonMap.set(i, r);
    await r.InitializeAsync(s, t);
    r.SetActive(true);
  }
  OnStart() {
    this.YFe = this.OpenParam;
  }
  OnBeforeShow() {
    this.t3e();
    this.l3e();
    this._3e();
    this.u3e();
    this.e3e();
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
  u3e() {
    var e = TimeUtil_1.TimeUtil.GetTimeString(this.YFe.CurrentTime);
    this.GetText(10).SetText(e);
  }
  OnBeforeDestroy() {
    this.o3e();
  }
  _3e() {
    this.GetItem(9).SetUIActive(this.YFe.IfNewRecord);
  }
  t3e() {
    this.GetItem(12).SetUIActive(true);
    this.GetItem(13).SetUIActive(true);
    this.GetText(14).SetUIActive(false);
    var e = this.GetTexture(2);
    e.SetColor(UE.Color.FromHex(SUCCESS_OUTLINE_COLOR));
    this.SetTextureByPath(TARGET_ICON_PATH, e);
    var e = this.GetText(1);
    e.SetColor(UE.Color.FromHex("FFFFFFFF"));
    e.ShowTextNew("GenericPromptTypes_3_GeneralText");
  }
  l3e() {
    this.GetText(8).SetText(this.YFe.CurrentScore.toString());
  }
}
exports.ActivityRunSuccessView = ActivityRunSuccessView;
//# sourceMappingURL=ActivityRunSuccessView.js.map