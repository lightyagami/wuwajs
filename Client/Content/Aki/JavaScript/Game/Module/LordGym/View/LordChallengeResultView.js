"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordChallengeResultView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const SUCCESS_OUTLINE_COLOR = "C48B29FF";
const SUCCESS_TEX = "/Game/Aki/UI/UIResources/Common/Image/IconForceLogo/T_Logo_10_UI.T_Logo_10_UI";
const FAIL_OUTLINE_COLOR = "B33100FF";
const FAIL_TEX = "/Game/Aki/UI/UIResources/Common/Image/IconForceLogo/T_Logo_10_UI.T_Logo_10_UI";
const CLOSE_BUTTON_KEY = -1;
class LordChallengeResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.$Fe = undefined;
    this.YFe = undefined;
    this.ButtonMap = undefined;
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
    const i = [];
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ConfirmBox_41_ButtonText_0");
    var e = this.i3e(this.GetItem(5), CLOSE_BUTTON_KEY, e, this.zFe);
    i.push(e);
    this.YFe.ButtonList.forEach((e, t) => {
      t = this.i3e(this.GetItem(5), t, e.Title, e.ClickFunc);
      i.push(t);
    });
    await Promise.all(i);
    var e = this.ButtonMap.get(CLOSE_BUTTON_KEY);
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_InstanceDungeonLeftTimeToAutoLeave_Text", this.YFe.AutoCloseTime.toString());
    e.SetFloatText(t);
  }
  async i3e(e, t, i, s) {
    var o = this.GetItem(5);
    var r = this.GetItem(4);
    var o = LguiUtil_1.LguiUtil.DuplicateActor(o.GetOwner(), r);
    var r = new Button();
    this.ButtonMap.set(t, r);
    await r.InitializeAsync(o, s);
    r.SetActive(true);
    r.SetBtnText(i);
  }
  OnStart() {
    this.YFe = this.OpenParam;
  }
  OnBeforeShow() {
    this.t3e();
    this.l3e();
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
    let t = this.YFe.AutoCloseTime + 1;
    this.$Fe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      var e;
      if (t <= 0) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.$Fe);
        this.zFe();
      } else {
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_InstanceDungeonLeftTimeToAutoLeave_Text", (t--).toString());
        this.ButtonMap.get(CLOSE_BUTTON_KEY).SetFloatText(e);
      }
    }, CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  u3e() {
    var e = this.YFe.PassTime !== undefined;
    this.GetText(13)?.SetUIActive(e);
    if (e) {
      e = TimeUtil_1.TimeUtil.GetTimeString(this.YFe.PassTime);
      this.GetText(10).SetText(e);
    }
  }
  l3e() {
    var e = this.YFe?.Score !== undefined;
    this.GetItem(12)?.SetUIActive(e);
    if (e) {
      this.GetText(8).SetText(this.YFe.Score.toString());
      this.GetItem(9).SetUIActive(this.YFe?.IsNewRecord ?? false);
    }
  }
  OnBeforeDestroy() {
    this.o3e();
  }
  t3e() {
    var e = this.YFe?.Result === 0;
    this.GetItem(12).SetUIActive(e);
    this.GetItem(13).SetUIActive(e);
    this.GetText(14).SetUIActive(!e);
    var t = this.GetTexture(2);
    var i = e ? SUCCESS_TEX : FAIL_TEX;
    var s = e ? SUCCESS_OUTLINE_COLOR : FAIL_OUTLINE_COLOR;
    var e = e ? "GenericPromptTypes_3_GeneralText" : "GenericPromptTypes_4_GeneralText";
    t.SetColor(UE.Color.FromHex(s));
    this.SetTextureByPath(i, t);
    var i = this.GetText(1);
    i.SetColor(UE.Color.FromHex(s));
    i.ShowTextNew(e);
  }
}
exports.LordChallengeResultView = LordChallengeResultView;
class Button extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RFe = undefined;
    this.UFe = () => {
      this.RFe?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.UFe]];
  }
  OnBeforeShow() {
    this.GetText(0).SetText("");
    this.GetText(2).SetText("");
  }
  async InitializeAsync(e, t) {
    this.RFe = t;
    await this.CreateByActorAsync(e);
  }
  SetFloatText(e) {
    this.GetText(2).SetUIActive(true);
    this.GetText(2).SetText(e);
  }
  SetBtnText(e) {
    this.GetText(0).SetText(e);
  }
}
//# sourceMappingURL=LordChallengeResultView.js.map