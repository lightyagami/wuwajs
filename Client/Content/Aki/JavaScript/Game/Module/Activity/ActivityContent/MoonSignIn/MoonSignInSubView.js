"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonSignInSubView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const MoonSignInController_1 = require("./MoonSignInController");
class MoonSignInSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.DFe = () => {
      var i;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("MoonSignInMainView");
      } else {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
    this.YDo = () => {
      var i;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("MoonSignInRewardView");
      } else {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIItem], [7, UE.SpineSkeletonAnimationComponent], [8, UE.SpineSkeletonAnimationComponent], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[4, this.YDo]];
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var t = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    var e = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    var s = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await Promise.all([this.LNe.CreateThenShowByActorAsync(i.GetOwner()), this.DNe.CreateThenShowByActorAsync(t.GetOwner()), this.UNe.CreateThenShowByActorAsync(e.GetOwner()), this.ANe.CreateThenShowByActorAsync(s.GetOwner())]);
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.ANe.FunctionButton.SetFunction(this.DFe);
  }
  OnStart() {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1;
    this.GetItem(9).SetUIActive(i);
    this.GetItem(10).SetUIActive(!i);
    (i ? this.GetSpine(7) : this.GetSpine(8)).SetAnimation(0, "Idle", true);
  }
  OnTimer(i) {
    this.FNe();
  }
  OnRefreshView() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetActivityViewCurrency, [this.ActivityBaseData.UseItemId]);
    if (this.ActivityBaseData.LocalConfig) {
      this.Pqe();
      this.mGe();
      this.jqe();
      this._Oe();
      this.gtd();
      this.Ctd();
    }
  }
  Pqe() {
    var i = this.ActivityBaseData.LocalConfig;
    var t = i.DescTheme;
    var i = i.Desc;
    var e = !StringUtils_1.StringUtils.IsEmpty(t);
    this.LNe.SetSubTitleVisible(e);
    if (e) {
      this.LNe.SetSubTitleByTextId(t);
    }
    this.DNe.SetContentByTextId(i);
  }
  mGe() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    this.FNe();
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
    }
  }
  jqe() {
    var i = this.ActivityBaseData.GetPreviewReward();
    this.UNe.RefreshItemLayout(i);
  }
  _Oe() {
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!i);
    if (!i) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
    this.ANe.FunctionButton.SetUiActive(i);
  }
  gtd() {
    var i = MoonSignInController_1.MoonSignInController.GetData();
    if (i) {
      this.GetText(5).SetText(i.GetMoonPhaseProgress());
    }
  }
  Ctd() {
    var i = MoonSignInController_1.MoonSignInController.GetData();
    if (i) {
      this.GetItem(6).SetUIActive(i.GetCanGetMoonGrandReward());
      this.ANe.SetFunctionRedDotVisible(i.GetAnyRedDot());
    }
  }
}
exports.MoonSignInSubView = MoonSignInSubView;
//# sourceMappingURL=MoonSignInSubView.js.map