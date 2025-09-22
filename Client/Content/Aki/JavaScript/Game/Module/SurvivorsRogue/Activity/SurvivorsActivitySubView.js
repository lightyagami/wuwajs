"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsActivitySubView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA");
const ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class SurvivorsActivitySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.PWa = i => {
      if (this.ActivityBaseData.Id === i) {
        this.Kqd();
        this.BNe();
      }
    };
    this.RQ_ = () => {
      UiManager_1.UiManager.OpenView("SurvivorsRogueRewardView", undefined, (i, t) => {
        if (i && UiManager_1.UiManager.IsViewShow("CommonActivityView")) {
          UiManager_1.UiManager.GetViewByName("CommonActivityView")?.AddChildViewById(t);
        }
      });
    };
    this.DFe = () => {
      var i;
      if (!this.ActivityBaseData.SaveCacheState(0, 0)) {
        this.ActivityBaseData.RefreshActivityRedDot();
      }
      if (this.ActivityBaseData?.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("SurvivorsRogueMainView");
      } else if ((i = this.ActivityBaseData.GetUnFinishPreGuideQuestId()) > 0) {
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIItem]];
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
      this.UNe.SetCommonTitle();
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
      this.UNe.RefreshItemLayout(t);
      this.ANe.FunctionButton.SetFunction(this.DFe);
      this.OnRefreshView();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
  }
  OnRefreshView() {
    this.FNe();
    this.BNe();
    this._Fe();
  }
  OnTimer(i) {
    this.FNe();
  }
  BNe() {
    this.GetItem(6).SetUIActive(this.ActivityBaseData.GetRewardRedDotState());
    this.ANe.SetFunctionRedDotVisible(this.ActivityBaseData.GetActivityRedDotState());
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
    }
  }
  _Fe() {
    this.Kqd();
    var i = {
      UnlockBtnFunction: this.DFe
    };
    this.ANe.RefreshGeneralPerformance(i);
    var i = this.ActivityBaseData.GetLevelUnlockRedDotState();
    if (i) {
      this.ANe.SetPanelTipByTextId("SurvivorsNewLevelUnlock");
    }
    this.ANe.SetPanelTipVisible(i);
  }
  Kqd() {
    var i = this.ActivityBaseData.GetFinishedRewardTaskCount();
    var t = this.ActivityBaseData.RewardTaskMap.size;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "SurvivorsReward", i, t);
  }
}
exports.SurvivorsActivitySubView = SurvivorsActivitySubView;
//# sourceMappingURL=SurvivorsActivitySubView.js.map