"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueSubView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA");
const ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRogueSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.RQ_ = () => {
      UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", ModelManager_1.ModelManager.WeeklyRogueModel.GetScoreRewardData(), (t, i) => {
        if (t && UiManager_1.UiManager.IsViewShow("CommonActivityView")) {
          UiManager_1.UiManager.GetViewByName("CommonActivityView")?.AddChildViewById(i);
        }
      });
    };
    this.DFe = () => {
      var t;
      if (this.ActivityBaseData?.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("WeeklyRogueActivityView");
      } else if ((t = this.ActivityBaseData.GetUnFinishPreGuideQuestId()) > 0) {
        UiManager_1.UiManager.OpenView("QuestView", t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIText], [7, UE.UITexture]];
    this.BtnBindInfo = [[4, this.RQ_]];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(t.GetOwner());
    var t = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    await this.DNe.CreateThenShowByActorAsync(t.GetOwner());
    var t = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await this.UNe.CreateThenShowByActorAsync(t.GetOwner());
    var t = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await this.ANe.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnStart() {
    var t;
    var i;
    var e = this.ActivityBaseData.LocalConfig;
    if (e) {
      t = e.DescTheme;
      i = !StringUtils_1.StringUtils.IsEmpty(t);
      this.LNe.SetSubTitleVisible(i);
      if (i) {
        this.LNe.SetSubTitleByTextId(t);
      }
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
      i = e.Desc;
      this.DNe.SetContentByTextId(i);
      t = this.ActivityBaseData.GetPreviewReward();
      this.UNe.SetTitleByTextId("CollectActivity_reward");
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
      this.UNe.RefreshItemLayout(t);
      this.ANe.FunctionButton.SetFunction(this.DFe);
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectActivity_Button_ahead");
      this.ANe.FunctionButton.SetText(e);
      i = this.ActivityBaseData?.GetCycleConfig();
      this.SetTextureByPath(i.ViewBackground, this.GetTexture(7));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "PrefabTextItem_1382682910_Text", this.ActivityBaseData.Score.toString(), i.MaxScore);
      this.OnRefreshView();
    }
  }
  OnAddEventListener() {
    RedDotController_1.RedDotController.BindRedDot("WeeklyRogueScoreReward", this.GetItem(5));
  }
  OnRemoveEventListener() {
    RedDotController_1.RedDotController.UnBindGivenUi("WeeklyRogueScoreReward", this.GetItem(5));
  }
  OnRefreshView() {
    this.FNe();
    this.BNe();
    this._Fe();
  }
  OnTimer(t) {
    this.FNe();
  }
  BNe() {
    var t = this.ActivityBaseData.HasNewCycle();
    if (t) {
      this.ANe.SetPanelTipByTextId("WeRougeCycleUpdateBubbleText");
    }
    this.ANe.SetPanelTipVisible(t);
    this.ANe.SetFunctionRedDotVisible(t);
  }
  FNe() {
    var t;
    var i = this.ActivityBaseData?.GetCycleCountDownData();
    if (i) {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("WeeklyRogue_Activity_Time");
      t = StringUtils_1.StringUtils.Format(t, i.CountDownText);
      this.LNe.SetTimeTextByText(t);
    }
  }
  _Fe() {
    if (this.ActivityBaseData.IsUnLock()) {
      this.ANe.FunctionButton?.SetUiActive(true);
      this.ANe.SetPanelConditionVisible(false);
    } else {
      this.ANe.SetPanelTipVisible(false);
      this.ANe.FunctionButton?.SetUiActive(false);
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
  }
}
exports.WeeklyRogueSubView = WeeklyRogueSubView;
//# sourceMappingURL=WeeklyRogueSubView.js.map