"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightFailView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivityCorniceMeetingSettleView_1 = require("../../CorniceMeeting/ActivityCorniceMeetingSettleView");
const FAIL_OUTLINE_COLOR = "B33100FF";
const FAIL_TEXT_COLOR = "F08086FF";
class MotorFightFailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ButtonMap = undefined;
    this.nbf = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.ReChallengeMotorFightDungeon();
    };
    this.sbf = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.LeaveInstanceDungeon();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [14, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.ButtonMap = new Map();
    await this.ZFe();
  }
  OnBeforeShow() {
    var i = this.GetText(1);
    var t = i.GetOwner().GetComponentByClass(UE.UIEffectOutline.StaticClass());
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, "GenericPromptTypes_4_GeneralText");
    i.SetColor(UE.Color.FromHex(FAIL_TEXT_COLOR));
    i.outlineColor = UE.Color.FromHex(FAIL_OUTLINE_COLOR);
    t.SetOutlineColor(UE.Color.FromHex(FAIL_OUTLINE_COLOR));
    this.PlaySequence("Fail");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), "MotorFightGame_FailInfo");
    this.GetText(14)?.SetUIActive(true);
  }
  async ZFe() {
    this.GetItem(5)?.SetUIActive(false);
    var i = this.i3e(this.GetItem(5), 0, this.sbf);
    var t = this.i3e(this.GetItem(5), 1, this.nbf);
    await Promise.all([i, t]);
    var i = this.ButtonMap.get(0);
    var t = this.ButtonMap.get(1);
    i.SetBtnText("Leave");
    t.SetBtnText("ChallengeAgain");
  }
  async i3e(i, t, e) {
    var r = this.GetItem(5);
    var s = this.GetItem(4);
    var r = LguiUtil_1.LguiUtil.DuplicateActor(r.GetOwner(), s);
    var s = new ActivityCorniceMeetingSettleView_1.ActivityCorniceMeetingButton();
    this.ButtonMap.set(t, s);
    await s.InitializeAsync(r, e);
    s.SetActive(true);
  }
}
exports.MotorFightFailView = MotorFightFailView;
//# sourceMappingURL=MotorFightFailView.js.map