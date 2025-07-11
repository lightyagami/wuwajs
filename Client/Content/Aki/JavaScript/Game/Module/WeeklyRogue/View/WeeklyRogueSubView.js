"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueSubView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
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
      UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", ModelManager_1.ModelManager.WeeklyRogueModel.GetScoreRewardData(), (i, t) => {
        if (i && UiManager_1.UiManager.IsViewShow("CommonActivityView")) {
          UiManager_1.UiManager.GetViewByName("CommonActivityView")?.AddChildViewById(t);
        }
      });
    };
    this.DFe = () => {
      var i;
      ModelManager_1.ModelManager.ActivityModel?.SaveActivityData(this.ActivityBaseData.Id, this.ActivityBaseData.CycleId, 0, 0, 1);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
      if (this.ActivityBaseData?.GetPreGuideQuestFinishState()) {
        i = {
          MarkId: this.ActivityBaseData.GetCycleConfig().MapMark,
          MarkType: 6
        };
        UiManager_1.UiManager.OpenView("WorldMapView", i);
      } else if ((i = this.ActivityBaseData.GetUnFinishPreGuideQuestId()) > 0) {
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIText], [7, UE.UITexture]];
    this.BtnBindInfo = [[4, this.RQ_]];
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    await this.DNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await this.UNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i;
    var t;
    var e = this.ActivityBaseData.LocalConfig;
    if (e) {
      i = e.DescTheme;
      t = !StringUtils_1.StringUtils.IsEmpty(i);
      this.LNe.SetSubTitleVisible(t);
      if (t) {
        this.LNe.SetSubTitleByTextId(i);
      }
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
      t = e.Desc;
      this.DNe.SetContentByTextId(t);
      i = this.ActivityBaseData.GetPreviewReward();
      this.UNe.SetTitleByTextId("CollectActivity_reward");
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
      this.UNe.RefreshItemLayout(i);
      this.ANe.FunctionButton.SetFunction(this.DFe);
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectActivity_Button_ahead");
      this.ANe.FunctionButton.SetText(e);
      t = this.ActivityBaseData?.GetCycleConfig();
      this.SetTextureByPath(t.ViewBackground, this.GetTexture(7));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "PrefabTextItem_1382682910_Text", this.ActivityBaseData.Score.toString(), t.MaxScore);
      this.OnRefreshView();
    }
  }
  OnRefreshView() {
    this.FNe();
    this.BNe();
    this._Fe();
  }
  OnTimer(i) {
    this.FNe();
    this.BNe();
    this._Fe();
  }
  BNe() {
    this.GetItem(5).SetUIActive(this.ActivityBaseData.HasScoreRewardEnable());
    this.ANe.SetFunctionRedDotVisible(this.ActivityBaseData.HasNewCycle());
  }
  FNe() {
    var i;
    var t = this.ActivityBaseData?.GetCycleCountDownData();
    if (t) {
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("WeeklyRogue_Activity_Time");
      i = StringUtils_1.StringUtils.Format(i, t.CountDownText);
      this.LNe.SetTimeTextByText(i);
    }
  }
  _Fe() {
    if (this.ActivityBaseData.IsUnLock()) {
      this.ANe.FunctionButton?.SetUiActive(true);
      this.ANe.SetPanelConditionVisible(false);
    } else {
      this.ANe.FunctionButton?.SetUiActive(false);
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
  }
}
exports.WeeklyRogueSubView = WeeklyRogueSubView;
//# sourceMappingURL=WeeklyRogueSubView.js.map