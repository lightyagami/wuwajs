"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssSubView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityDescriptionTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList");
const ActivityButtonItem_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityButtonItem");
const ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA");
const ActivitySubViewBase_1 = require("../../../Activity/View/SubView/ActivitySubViewBase");
class DangoAbyssSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ms1 = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.fs1 = undefined;
    this.s6e = undefined;
    this.DFe = () => {
      var t;
      ModelManager_1.ModelManager.DangoAbyssModel.SetAbyssDangoEnterNew(false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenCurrentActivityAbyssEntrance();
      } else {
        t = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIItem], [10, UE.SpineSkeletonAnimationComponent]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    t.push(this.LNe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    t.push(this.DNe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    t.push(this.UNe.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    t.push(this.ANe.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.fs1 = new ActivityButtonItem_1.ActivityButtonItem();
    t.push(this.fs1.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.fs1.SetFunction(() => {
      ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssLimitRewardView(false);
    });
    this.s6e = new ActivityButtonItem_1.ActivityButtonItem();
    t.push(this.s6e.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()));
    this.s6e.SetFunction(() => {
      ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssRewardView(false);
    });
    await Promise.all(t);
    this.ANe.SetRewardButtonVisible(false);
    this.ANe.FunctionButton.SetFunction(this.DFe);
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
  }
  OnStart() {
    this.ms1 = this.ActivityBaseData;
  }
  OnBeforeShow() {
    this.K8e();
    this.GetSpine(10).SetAnimation(0, "start", false).AnimationComplete.Add(() => {
      this.GetSpine(10).SetAnimation(0, "idle", true);
    });
  }
  OnBeforeHide() {
    this._Dn();
    this.GetSpine(10).ClearTracks();
  }
  K8e() {
    this.fs1?.BindRedDot("RedDotDangoLimitReward", this.ActivityBaseData.Id);
    this.s6e?.BindRedDot("RedDotDangoCommonReward", this.ActivityBaseData.Id);
  }
  _Dn() {
    this.fs1?.UnBindGivenUid(this.ActivityBaseData.Id);
    this.s6e?.UnBindGivenUid(this.ActivityBaseData.Id);
  }
  OnRefreshView() {
    if (this.ActivityBaseData.LocalConfig) {
      this.Pqe();
      this.mGe();
      this.jqe();
      this.VNe();
      this._Oe();
      this.Qbe();
    }
  }
  Qbe() {
    var t = this.ms1.CheckInLimitTime();
    this.fs1?.SetActive(t);
    if (t) {
      t = this.ms1.GetRemainTimeText();
      this.fs1?.SetText(t);
    }
    var t = this.ms1.GetRewardFinishProgressText();
    this.s6e.SetText(t);
  }
  Pqe() {
    var t = this.ActivityBaseData.LocalConfig;
    var i = t.DescTheme;
    var e = t.Desc;
    var s = !StringUtils_1.StringUtils.IsEmpty(i);
    this.LNe.SetSubTitleVisible(s);
    if (s) {
      this.LNe.SetSubTitleByTextId(i);
    }
    this.DNe.SetContentByTextId(e);
    var s = t.DescThemeIcon;
    if (s) {
      this.LNe?.SetSubTitleIconByPath(s);
    }
  }
  mGe() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [t, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(t);
    if (t) {
      this.LNe.SetTimeTextByText(i);
    }
    this.LNe.SetActivityBaseData(this.ActivityBaseData);
  }
  jqe() {
    var t = this.ActivityBaseData.GetPreviewReward();
    this.UNe.SetTitleByTextId("BossRushCollectReward");
    this.UNe.RefreshItemLayout(t);
  }
  _Oe() {
    var t = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!t);
    if (!t) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
    this.ANe.FunctionButton.SetUiActive(t);
  }
  VNe() {
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DangoAbyssEnterText");
    this.ANe.FunctionButton.SetText(t);
    var t = this.ActivityBaseData.IsUnLock();
    var t = t && ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssDangoEnterNew();
    this.ANe.FunctionButton.SetRedDotVisible(t);
  }
  OnTimer(t) {
    super.OnTimer(t);
    this.mGe();
  }
}
exports.DangoAbyssSubView = DangoAbyssSubView;
//# sourceMappingURL=DangoAbyssSubView.js.map