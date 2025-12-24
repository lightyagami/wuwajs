"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushSubView = undefined;
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
const ActivityFunctionalArea_1 = require("../UniversalComponents/Functional/ActivityFunctionalArea");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const BossRushController_1 = require("./BossRushController");
class BossRushSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.pyn = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.xB_ = () => {
      ModelManager_1.ModelManager.BossRushModel.OnlyOpenRewardView = true;
      BossRushController_1.BossRushController.OpenBossRushView(this.ActivityBaseData.Id);
    };
    this.lDn = () => {
      this.BNe();
    };
    this.DFe = () => {
      var i;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        BossRushController_1.BossRushController.OpenBossRushView(this.ActivityBaseData.Id);
      } else {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIItem]];
    this.BtnBindInfo = [[4, this.xB_]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BossRushDataUpdate, this.lDn);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BossRushDataUpdate, this.lDn);
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var t = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    var e = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    var s = this.GetItem(3);
    this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea(this.ActivityBaseData);
    await Promise.all([this.LNe.CreateThenShowByActorAsync(i.GetOwner()), this.DNe.CreateThenShowByActorAsync(t.GetOwner()), this.UNe.CreateThenShowByActorAsync(e.GetOwner()), this.ANe.CreateThenShowByActorAsync(s.GetOwner())]);
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.ANe.FunctionButton.SetFunction(this.DFe);
    this.ANe.SetRewardButtonVisible(false);
  }
  OnStart() {
    this.pyn = this.ActivityBaseData;
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
      this.Eyn();
      this.Qbe();
    }
  }
  Qbe() {
    var i = this.pyn.GetFinishTaskCount();
    var t = this.pyn.GetAllTaskCount();
    this.GetText(5).SetText(i + "/" + t);
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot("BossRushReward", this.GetItem(6), undefined, this.pyn.Id);
  }
  _Dn() {
    RedDotController_1.RedDotController.UnBindGivenUi("BossRushReward", this.GetItem(6));
  }
  Eyn() {
    var i;
    if (this.pyn.GetNewUnlockState()) {
      this.pyn.CacheNewUnlock();
      (i = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text = "BossRushUnlockTips";
      UiManager_1.UiManager.OpenView("DifficultUnlockTipView", i);
    }
  }
  _Oe() {
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!i);
    if (!i) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
    this.ANe.FunctionButton.SetUiActive(i);
  }
  mGe() {
    this.LNe.SetActivityBaseData(this.ActivityBaseData);
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
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
    var i = this.pyn.EntranceRedDot();
    var t = this.pyn.GetPreGuideQuestFinishState();
    this.ANe.FunctionButton.SetRedDotVisible(t && i);
  }
}
exports.BossRushSubView = BossRushSubView;
//# sourceMappingURL=BossRushSubView.js.map