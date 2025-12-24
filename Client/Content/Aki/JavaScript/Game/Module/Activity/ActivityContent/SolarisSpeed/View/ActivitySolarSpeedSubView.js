"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySolarSpeedSubView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySolarSpeedSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.k6_ = undefined;
    this.q6_ = undefined;
    this.pz_ = undefined;
    this.vz_ = undefined;
    this.yz_ = undefined;
    this.kZs = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.ActivitySolarSpeedController.HandleConfirmClickInActivitySubView();
    };
    this.A3_ = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.ActivitySolarSpeedController.HandleOnClickRewardInActivitySubView();
    };
    this.O6_ = () => {
      if (this.k6_ !== undefined) {
        this.GetItem(5)?.SetUIActive(this.k6_());
      }
      if (this.pz_ !== undefined) {
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(7), this.vz_, this.pz_(), this.yz_);
      }
    };
    this.G6_ = () => {
      if (this.q6_ !== undefined) {
        this.ANe?.SetFunctionRedDotVisible(this.q6_());
      }
    };
    this.Ycc = i => {
      if (i === ModelManager_1.ModelManager.SolarSpeedModel.CurrentActivityId && this.q6_ !== undefined) {
        this.ANe?.SetFunctionRedDotVisible(this.q6_());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText]];
    this.BtnBindInfo = [[4, this.A3_]];
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
  }
  OnStart() {
    var i = this.ActivityBaseData.LocalConfig;
    var t = ModelManager_1.ModelManager.SolarSpeedModel.BuildActivitySubViewData();
    this.LNe.SetActivityBaseData(this.ActivityBaseData);
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    this.LNe.SetSubTitleVisible(!StringUtils_1.StringUtils.IsEmpty(i?.DescTheme));
    if (i?.DescTheme) {
      this.LNe.SetSubTitleByTextId(i.DescTheme);
    }
    this.FNe();
    this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(i?.Desc));
    if (i?.Desc) {
      this.DNe.SetContentByTextId(i.Desc);
    }
    var i = this.ActivityBaseData.GetPreviewReward();
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.UNe.RefreshItemLayout(i);
    this.UNe.SetTitleByTextId(t.RewardTextId);
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!i);
    this.ANe.FunctionButton.SetActive(i);
    if (i) {
      this.ANe.FunctionButton.SetFunction(this.kZs);
      this.ANe.FunctionButton.SetLocalTextNew(t.ButtonTextId);
    } else {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
    this.GetItem(6)?.SetUIActive(i);
    this.pz_ = t.RewardProgressCurrentGetter;
    this.vz_ = t.RewardProgressTextId;
    this.yz_ = t.RewardProgressTotal;
    if (i) {
      i = this.pz_ === undefined ? "0" : this.pz_();
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(7), t.RewardProgressTextId, i, t.RewardProgressTotal);
    }
    this.k6_ = t.RewardRedDotStateGetter;
    if (this.k6_ !== undefined) {
      this.GetItem(5)?.SetUIActive(this.k6_());
    }
    this.q6_ = t.ConfirmRedDotStateGetter;
    if (this.q6_ !== undefined) {
      this.ANe?.SetFunctionRedDotVisible(this.q6_());
    }
  }
  OnBeforeShow() {
    super.OnBeforeShow();
  }
  OnAfterHide() {
    super.OnAfterHide();
  }
  OnRefreshView() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SolarSpeedSubViewOnRefreshView);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SolarSpeedRewarded, this.O6_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChallengeInstanceRedDot, this.G6_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Ycc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SolarSpeedRewarded, this.O6_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChallengeInstanceRedDot, this.G6_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Ycc);
  }
  OnTimer(i) {
    this.FNe();
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
    }
  }
}
exports.ActivitySolarSpeedSubView = ActivitySolarSpeedSubView;
//# sourceMappingURL=ActivitySolarSpeedSubView.js.map