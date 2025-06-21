"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssSubView = void 0;
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityDescriptionTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList"),
  ActivityButtonItem_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityButtonItem"),
  ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA"),
  ActivitySubViewBase_1 = require("../../../Activity/View/SubView/ActivitySubViewBase");
class DangoAbyssSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments), this.Kn1 = void 0, this.LNe = void 0, this.DNe = void 0, this.UNe = void 0, this.ANe = void 0, this.Xn1 = void 0, this.s6e = void 0, this.DFe = () => {
      var t;
      ModelManager_1.ModelManager.DangoAbyssModel.SetAbyssDangoEnterNew(!1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id), this.ActivityBaseData.GetPreGuideQuestFinishState() ? ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenCurrentActivityAbyssEntrance() : (t = this.ActivityBaseData.GetUnFinishPreGuideQuestId(), UiManager_1.UiManager.OpenView("QuestView", t))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.SpineSkeletonAnimationComponent]
    ]
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA, t.push(this.LNe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())), this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA, t.push(this.DNe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())), this.UNe = new ActivityRewardList_1.ActivityRewardList, t.push(this.UNe.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())), this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData), t.push(this.ANe.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())), this.Xn1 = new ActivityButtonItem_1.ActivityButtonItem, t.push(this.Xn1.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())), this.Xn1.SetFunction(() => {
      ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssLimitRewardView(!1)
    }), this.s6e = new ActivityButtonItem_1.ActivityButtonItem, t.push(this.s6e.CreateThenShowByActorAsync(this.GetItem(9).GetOwner())), this.s6e.SetFunction(() => {
      ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssRewardView(!1)
    }), await Promise.all(t), this.ANe.SetRewardButtonVisible(!1), this.ANe.FunctionButton.SetFunction(this.DFe), this.UNe.InitGridLayout(this.UNe.InitCommonGridItem)
  }
  OnStart() {
    this.Kn1 = this.ActivityBaseData
  }
  OnBeforeShow() {
    this.K8e(), this.GetSpine(10).SetAnimation(0, "start", !1).AnimationComplete.Add(() => {
      this.GetSpine(10).SetAnimation(0, "idle", !0)
    })
  }
  OnBeforeHide() {
    this._Dn(), this.GetSpine(10).ClearTracks()
  }
  K8e() {
    this.Xn1?.BindRedDot("RedDotDangoLimitReward", this.ActivityBaseData.Id), this.s6e?.BindRedDot("RedDotDangoCommonReward", this.ActivityBaseData.Id)
  }
  _Dn() {
    this.Xn1?.UnBindGivenUid(this.ActivityBaseData.Id), this.s6e?.UnBindGivenUid(this.ActivityBaseData.Id)
  }
  OnRefreshView() {
    this.ActivityBaseData.LocalConfig && (this.Pqe(), this.mGe(), this.jqe(), this.VNe(), this._Oe(), this.Qbe())
  }
  Qbe() {
    var t = this.Kn1.CheckInLimitTime(),
      t = (this.Xn1?.SetActive(t), t && (t = this.Kn1.GetRemainTimeText(), this.Xn1?.SetText(t)), this.Kn1.GetRewardFinishProgressText());
    this.s6e.SetText(t)
  }
  Pqe() {
    var t = this.ActivityBaseData.LocalConfig,
      i = t.DescTheme,
      e = t.Desc,
      s = !StringUtils_1.StringUtils.IsEmpty(i),
      s = (this.LNe.SetSubTitleVisible(s), s && this.LNe.SetSubTitleByTextId(i), this.DNe.SetContentByTextId(e), t.DescThemeIcon);
    s && this.LNe?.SetSubTitleIconByPath(s)
  }
  mGe() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [t, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(t), t && this.LNe.SetTimeTextByText(i)
  }
  jqe() {
    var t = this.ActivityBaseData.GetPreviewReward();
    this.UNe.SetTitleByTextId("BossRushCollectReward"), this.UNe.RefreshItemLayout(t)
  }
  _Oe() {
    var t = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!t), t || this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id), this.ANe.FunctionButton.SetUiActive(t)
  }
  VNe() {
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DangoAbyssEnterText"),
      t = (this.ANe.FunctionButton.SetText(t), this.ActivityBaseData.IsUnLock()),
      t = t && ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssDangoEnterNew();
    this.ANe.FunctionButton.SetRedDotVisible(t)
  }
  OnTimer(t) {
    super.OnTimer(t), this.mGe()
  }
}
exports.DangoAbyssSubView = DangoAbyssSubView;
//# sourceMappingURL=DangoAbyssSubView.js.map