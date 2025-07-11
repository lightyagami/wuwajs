"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRunFailView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityParkourButton_1 = require("./ActivityParkourButton");
const ActivityRunController_1 = require("./ActivityRunController");
const LEAVETIME = 30;
const FAIL_OUTLINE_COLOR = "63323AFF";
const TARGET_ICON_PATH = "/Game/Aki/UI/UIResources/Common/Image/IconForceLogo/T_Logo_10_UI.T_Logo_10_UI";
class ActivityRunFailView extends UiViewBase_1.UiViewBase {
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
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIText], [15, UE.UINiagara], [16, UE.UITexture], [17, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    this.ButtonMap = new Map();
    await this.ZFe();
  }
  OnStart() {
    this.YFe = this.OpenParam;
    this.e3e();
  }
  OnBeforeShow() {
    this.GetItem(12).SetUIActive(false);
    this.GetItem(13).SetUIActive(false);
    this.GetTexture(16).SetUIActive(false);
    this.GetTexture(17).SetUIActive(false);
    this.GetText(14).SetUIActive(true);
    this.GetUiNiagara(15)?.SetUIActive(false);
    this.t3e();
  }
  t3e() {
    var t = this.GetTexture(2);
    t.SetColor(UE.Color.FromHex(FAIL_OUTLINE_COLOR));
    this.SetTextureByPath(TARGET_ICON_PATH, t);
    this.GetText(1).ShowTextNew("GenericPromptTypes_4_GeneralText");
  }
  async ZFe() {
    this.GetItem(5)?.SetUIActive(false);
    var t = this.i3e(this.GetItem(5), 0, this.zFe);
    var i = this.i3e(this.GetItem(5), 1, this.JFe);
    await Promise.all([t, i]);
    var t = this.ButtonMap.get(0);
    var i = this.ButtonMap.get(1);
    t.SetBtnText("Leave");
    t.SetFloatText("InstanceDungeonLeftTimeToAutoLeave", LEAVETIME.toString());
    i.SetBtnText("ChallengeAgain");
  }
  o3e() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.$Fe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.$Fe);
    }
    this.$Fe = undefined;
  }
  e3e() {
    let t = LEAVETIME + 1;
    this.$Fe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      if (t <= 0) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.$Fe);
        this.zFe();
      } else {
        this.ButtonMap.get(0).SetFloatText("InstanceDungeonLeftTimeToAutoLeave", (t--).toString());
      }
    }, CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  OnBeforeDestroy() {
    this.GetUiNiagara(15)?.SetUIActive(true);
    this.GetTexture(16).SetUIActive(true);
    this.GetTexture(17).SetUIActive(true);
    this.o3e();
  }
  async i3e(t, i, e) {
    var s = this.GetItem(5);
    var r = this.GetItem(4);
    var s = LguiUtil_1.LguiUtil.DuplicateActor(s.GetOwner(), r);
    var r = new ActivityParkourButton_1.ActivityParkourButton();
    this.ButtonMap.set(i, r);
    await r.InitializeAsync(s, e);
    r.SetActive(true);
  }
}
exports.ActivityRunFailView = ActivityRunFailView;
//# sourceMappingURL=ActivityRunFailView.js.map