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
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiManager_1 = require("../../../../Ui/UiManager");
const DifficultUnlockTipView_1 = require("../../../InstanceDungeon/DifficultUnlockTipView");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
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
      var e;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        e = {
          MarkId: ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushMarkByActivityId(this.ActivityBaseData.Id),
          MarkType: 0,
          OpenFogId: 0
        };
        WorldMapController_1.WorldMapController.OpenView(2, false, e);
      } else {
        e = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", e);
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
    var e = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var i = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    var t = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    var s = this.GetItem(3);
    this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea(this.ActivityBaseData);
    await Promise.all([this.LNe.CreateThenShowByActorAsync(e.GetOwner()), this.DNe.CreateThenShowByActorAsync(i.GetOwner()), this.UNe.CreateThenShowByActorAsync(t.GetOwner()), this.ANe.CreateThenShowByActorAsync(s.GetOwner())]);
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
    var e = this.pyn.GetFinishTaskCount();
    var i = this.pyn.GetAllTaskCount();
    this.GetText(5).SetText(e + "/" + i);
  }
  K8e() {
    RedDotController_1.RedDotController.BindRedDot("BossRushReward", this.GetItem(6), undefined, this.pyn.Id);
  }
  _Dn() {
    RedDotController_1.RedDotController.UnBindGivenUi("BossRushReward", this.GetItem(6));
  }
  Eyn() {
    var e;
    if (this.pyn.GetNewUnlockState()) {
      this.pyn.CacheNewUnlock();
      (e = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text = "BossRushUnlockTips";
      UiManager_1.UiManager.OpenView("DifficultUnlockTipView", e);
    }
  }
  _Oe() {
    var e = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!e);
    if (!e) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
    this.ANe.FunctionButton.SetUiActive(e);
  }
  mGe() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [e, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(e);
    if (e) {
      this.LNe.SetTimeTextByText(i);
    }
  }
  Pqe() {
    var e = this.ActivityBaseData.LocalConfig;
    var i = e.DescTheme;
    var e = e.Desc;
    var t = !StringUtils_1.StringUtils.IsEmpty(i);
    this.LNe.SetSubTitleVisible(t);
    if (t) {
      this.LNe.SetSubTitleByTextId(i);
    }
    this.DNe.SetContentByTextId(e);
  }
  jqe() {
    var e = this.ActivityBaseData.GetPreviewReward();
    this.UNe.SetTitleByTextId("BossRushCollectReward");
    this.UNe.RefreshItemLayout(e);
  }
  OnTimer(e) {
    super.OnTimer(e);
    this.mGe();
  }
  VNe() {
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushEnterText");
    this.ANe.FunctionButton.SetText(e);
  }
  BNe() {
    var e = this.pyn.EntranceRedDot();
    var i = this.pyn.GetPreGuideQuestFinishState();
    this.ANe.FunctionButton.SetRedDotVisible(i && e);
  }
}
exports.BossRushSubView = BossRushSubView;
//# sourceMappingURL=BossRushSubView.js.map