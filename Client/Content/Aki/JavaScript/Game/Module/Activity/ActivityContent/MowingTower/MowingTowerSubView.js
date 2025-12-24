"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingTowerSubView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiManager_1 = require("../../../../Ui/UiManager");
const DifficultUnlockTipView_1 = require("../../../InstanceDungeon/DifficultUnlockTipView");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const MowingTowerController_1 = require("./MowingTowerController");
class MowingTowerSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.bLl = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.eRl = () => {
      this.BNe();
    };
    this.R2e = () => {
      ModelManager_1.ModelManager.MowingTowerModel.CurrentSelectActivityId = this.ActivityBaseData.Id;
      if (!UiManager_1.UiManager.IsViewOpen("MowingTowerRewardView")) {
        UiManager_1.UiManager.OpenView("MowingTowerRewardView");
      }
    };
    this.DFe = () => {
      var i;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        MowingTowerController_1.MowingTowerController.OpenMowingTowerView(this.ActivityBaseData.Id);
      } else {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIItem]];
    this.BtnBindInfo = [[4, this.R2e]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshMowingTowerData, this.eRl);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshMowingTowerData, this.eRl);
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var e = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    var t = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    var s = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await Promise.all([this.LNe.CreateThenShowByActorAsync(i.GetOwner()), this.DNe.CreateThenShowByActorAsync(e.GetOwner()), this.UNe.CreateThenShowByActorAsync(t.GetOwner()), this.ANe.CreateThenShowByActorAsync(s.GetOwner())]);
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.ANe.FunctionButton.SetFunction(this.DFe);
  }
  OnStart() {
    this.bLl = this.ActivityBaseData;
  }
  OnBeforeShow() {
    this.K8e();
  }
  OnBeforeHide() {
    this._Dn();
  }
  OnRefreshView() {
    if (this.ActivityBaseData.LocalConfig) {
      this.Pqe();
      this.mGe();
      this.jqe();
      this.VNe();
      this.BNe();
      this._Oe();
      this.IUl();
      this.Eyn();
    }
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot("MowingTowerReward", this.GetItem(6), undefined, this.bLl.Id);
  }
  _Dn() {
    RedDotController_1.RedDotController.UnBindGivenUi("MowingTowerReward", this.GetItem(6), this.bLl.Id);
  }
  Eyn() {
    var i;
    if (this.bLl.GetNewUnlockState()) {
      this.bLl.CacheNewUnlock();
      (i = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text = "MowTowerNewLevelTips";
      UiManager_1.UiManager.OpenView("DifficultUnlockTipView", i);
    }
  }
  _Oe() {
    this.GetItem(3)?.SetUIActive(true);
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!i);
    this.ANe.FunctionButton.SetUiActive(i);
    if (!i) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
  }
  IUl() {
    var i = this.ActivityBaseData;
    this.GetText(5).SetText("" + i.GetFullScore());
  }
  mGe() {
    this.LNe.SetActivityBaseData(this.ActivityBaseData);
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [i, e] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(e);
    }
  }
  Pqe() {
    var i = this.ActivityBaseData.LocalConfig;
    var e = i.DescTheme;
    var i = i.Desc;
    var t = !StringUtils_1.StringUtils.IsEmpty(e);
    this.LNe.SetSubTitleVisible(t);
    if (t) {
      this.LNe.SetSubTitleByTextId(e);
    }
    this.DNe.SetContentByTextId(i);
  }
  jqe() {
    var i = this.ActivityBaseData.GetPreviewReward();
    this.UNe.SetTitleByTextId("BossRushCollectReward");
    this.UNe.RefreshItemLayout(i);
  }
  OnTimer(i) {
    super.OnTimer(i);
    this.mGe();
  }
  VNe() {
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushEnterText");
    this.ANe.FunctionButton.SetText(i);
  }
  BNe() {
    var i = this.bLl.EntranceRedDot();
    var e = this.bLl.GetPreGuideQuestFinishState();
    this.ANe.FunctionButton.SetRedDotVisible(e && i);
  }
}
exports.MowingTowerSubView = MowingTowerSubView;
//# sourceMappingURL=MowingTowerSubView.js.map