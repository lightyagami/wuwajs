"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCorniceMeetingButton = exports.ActivityCorniceMeetingSettleDetailPanel = exports.ActivityCorniceMeetingSettleView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const RewardExploreDescription_1 = require("../../../ItemReward/View/RewardExploreDescription");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityCorniceMeetingController_1 = require("./ActivityCorniceMeetingController");
const LEAVETIME = 30;
const ICON_PATH = "/Game/Aki/UI/UIResources/Common/Image/IconForceLogo/T_Logo_12_UI.T_Logo_12_UI";
const SUCCESS_OUTLINE_COLOR = "C48B29FF";
const FAIL_OUTLINE_COLOR = "B33100FF";
const FAIL_TEXT_COLOR = "F08086FF";
const SUCCESS_TEXT_COLOR = "f2efd5";
class ActivityCorniceMeetingSettleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ButtonMap = undefined;
    this.$Fe = undefined;
    this.Data = undefined;
    this.DetailPanel = undefined;
    this.RewardExploreDescription = undefined;
    this.JFe = () => {
      this.CloseMe(e => {
        if (e) {
          ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.CorniceMeetingChallengeTransRequest(this.Data._ps);
        }
      });
    };
    this.zFe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [20, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Data = this.OpenParam;
    this.ButtonMap = new Map();
    await this.ZFe();
    this.DetailPanel = new ActivityCorniceMeetingSettleDetailPanel();
    this.DetailPanel.Data = this.Data;
    await this.DetailPanel.CreateThenShowByResourceIdAsync("UiItem_ResultRecordAbnormalData", this.GetItem(20));
    var e = this.GetItem(20);
    this.RewardExploreDescription = new RewardExploreDescription_1.RewardExploreDescription();
    await this.RewardExploreDescription.CreateThenShowByResourceIdAsync("Uiitem_ResultDesc", e);
    this.RewardExploreDescription.Refresh("PrefabTextItem_3633647470_Text");
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
    var t;
    var i;
    if (this.Data !== undefined) {
      e = this.GetText(1);
      t = this.GetTexture(2);
      i = e.GetOwner().GetComponentByClass(UE.UIEffectOutline.StaticClass());
      this.SetTextureByPath(ICON_PATH, t);
      if (this.Data.SMs > 0) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "CorniceMeetingSettleSuccess");
        e.outlineColor = UE.Color.FromHex(SUCCESS_OUTLINE_COLOR);
        t.SetColor(UE.Color.FromHex("8C754D7F"));
        i.SetOutlineColor(UE.Color.FromHex(SUCCESS_OUTLINE_COLOR));
        e.SetColor(UE.Color.FromHex(SUCCESS_TEXT_COLOR));
        this.RewardExploreDescription?.SetUiActive(false);
        this.PlaySequence("Success");
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "GenericPromptTypes_4_GeneralText");
        t.SetColor(UE.Color.FromHex("6e363f"));
        e.SetColor(UE.Color.FromHex(FAIL_TEXT_COLOR));
        e.outlineColor = UE.Color.FromHex(FAIL_OUTLINE_COLOR);
        i.SetOutlineColor(UE.Color.FromHex(FAIL_OUTLINE_COLOR));
        this.RewardExploreDescription?.SetUiActive(true);
        this.PlaySequence("Fail");
      }
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
    var e = this.i3e(this.GetItem(5), 0, this.zFe);
    var t = this.i3e(this.GetItem(5), 1, this.JFe);
    await Promise.all([e, t]);
    var e = this.ButtonMap.get(0);
    var t = this.ButtonMap.get(1);
    e.SetBtnText("Leave");
    e.SetFloatText("InstanceDungeonLeftTimeToAutoLeave", LEAVETIME.toString());
    t.SetBtnText("ChallengeAgain");
  }
  async i3e(e, t, i) {
    var s = this.GetItem(5);
    var o = this.GetItem(4);
    var s = LguiUtil_1.LguiUtil.DuplicateActor(s.GetOwner(), o);
    var o = new ActivityCorniceMeetingButton();
    this.ButtonMap.set(t, o);
    await o.InitializeAsync(s, i);
    o.SetActive(true);
  }
}
exports.ActivityCorniceMeetingSettleView = ActivityCorniceMeetingSettleView;
class ActivityCorniceMeetingSettleDetailPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnStart() {
    var e;
    var t;
    if (this.Data !== undefined && (t = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData()) !== undefined && (e = t.GetLevelEntryData(this.Data._ps)) !== undefined) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Text_ItemCost_Text", e.CurrentScore.toString(), e?.GetMaxScoreConfig());
      t = TimeUtil_1.TimeUtil.GetTimeString(this.Data.ZS_);
      this.GetText(1).SetText(t);
      this.GetItem(5).SetUIActive(e.CurrentScore >= e.GetMaxScoreConfig());
      this.GetItem(4).SetUIActive(e.CurrentScore > 0);
      this.GetItem(3).SetUIActive(this.Data.iM_ && !this.Data.tM_);
      this.GetItem(2).SetUIActive(this.Data.tM_);
      this.GetItem(6).SetUIActive(false);
    }
  }
}
exports.ActivityCorniceMeetingSettleDetailPanel = ActivityCorniceMeetingSettleDetailPanel;
class ActivityCorniceMeetingButton extends UiPanelBase_1.UiPanelBase {
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
  SetFloatText(e, ...t) {
    this.GetText(2).SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), e, t);
  }
  SetBtnText(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), e, t);
  }
}
exports.ActivityCorniceMeetingButton = ActivityCorniceMeetingButton;
//# sourceMappingURL=ActivityCorniceMeetingSettleView.js.map