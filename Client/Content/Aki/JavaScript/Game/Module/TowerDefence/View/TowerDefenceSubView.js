"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseSubView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList");
const ActivityButtonItem_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityButtonItem");
const ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA");
const ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase");
const DifficultUnlockTipView_1 = require("../../InstanceDungeon/DifficultUnlockTipView");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const TowerDefenceController_1 = require("../TowerDefenceController");
class TowerDefenseSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.Dsc = undefined;
    this.kZs = () => {
      var e;
      ModelManager_1.ModelManager.TowerDefenseModel.IsEnterInActivityClicked = true;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        if ((e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseConfigByActivityId(this.ActivityBaseData.Id)).EntranceId !== 0) {
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(e.EntranceId);
        } else {
          e = {
            MarkId: TowerDefenceController_1.TowerDefenseController.GetMarkIdByActivityId(this.ActivityBaseData.Id),
            MarkType: 0,
            OpenFogId: 0
          };
          WorldMapController_1.WorldMapController.OpenView(2, false, e);
        }
      } else {
        e = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", e);
      }
    };
    this.ZPa = () => {
      this.Dsc.SetRedDotVisible(TowerDefenceController_1.TowerDefenseController.CheckHasReward());
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, this.ZPa);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, this.ZPa);
  }
  async Bsc() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_LordGymBg01");
    await this.LoadPrefabAsync(e, this.GetItem(4));
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var t = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    var i = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    var r = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    var n = this.GetItem(5);
    this.Dsc = new ActivityButtonItem_1.ActivityButtonItem();
    await Promise.all([this.LNe.CreateThenShowByActorAsync(e.GetOwner()), this.DNe.CreateThenShowByActorAsync(t.GetOwner()), this.UNe.CreateThenShowByActorAsync(i.GetOwner()), this.ANe.CreateThenShowByActorAsync(r.GetOwner()), this.Dsc.CreateThenShowByActorAsync(n.GetOwner()), this.Bsc()]);
    this.ANe.FunctionButton.SetFunction(this.kZs);
    this.Dsc.SetFunction(TowerDefenceController_1.TowerDefenseController.HandleOnClickReward);
  }
  OnRefreshView() {
    if (this.ActivityBaseData.LocalConfig) {
      this.Pqe();
      this.mGe();
      this.FNe();
      this.jqe();
      this.VNe();
      this.Eyn();
      this.ZPa();
      this.ewa();
    }
  }
  OnTimer(e) {
    this.FNe();
    this.VNe();
  }
  Eyn() {
    var e;
    if (TowerDefenceController_1.TowerDefenseController.GetIsFirstOpen()) {
      (e = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text = "BossRushUnlockTips";
      UiManager_1.UiManager.OpenView("DifficultUnlockTipView", e);
    }
  }
  mGe() {
    var e = TowerDefenceController_1.TowerDefenseController.GetActivitySubViewTitle();
    this.LNe.SetActivityBaseData(this.ActivityBaseData);
    this.LNe.SetTitleByText(e);
  }
  FNe() {
    var [e, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(e);
    if (e) {
      this.LNe.SetTimeTextByText(t);
    }
  }
  Pqe() {
    var e = TowerDefenceController_1.TowerDefenseController.GetActivityCfg();
    var t = e.DescTheme;
    var e = e.Desc;
    var i = !StringUtils_1.StringUtils.IsEmpty(t);
    this.DNe.SetContentVisible(i);
    if (i) {
      this.DNe.SetContentByTextId(t);
    }
    this.DNe.SetContentByTextId(e);
  }
  jqe() {
    var e = TowerDefenceController_1.TowerDefenseController.GetActivityPreviewReward();
    this.UNe.SetTitleByTextId("FragmentMemoryCollectReward");
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.UNe.RefreshItemLayout(e);
  }
  VNe() {
    var e;
    var t;
    if (TowerDefenceController_1.TowerDefenseController.CheckActivityUnlockByMulti()) {
      e = TowerDefenceController_1.TowerDefenseController.CheckActivityUnlockByCondition();
      this.ANe.SetPanelConditionVisible(!e);
      this.ANe.FunctionButton.SetUiActive(e);
      if (e) {
        t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushEnterText");
        this.ANe.FunctionButton.SetText(t);
      } else {
        this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
      }
      t = ModelManager_1.ModelManager.TowerDefenseModel.GetPreviewRewardCount();
      this.Dsc.SetText(t[0] + "/" + t[1]);
      this.Dsc.SetUiActive(e);
    } else {
      this.ANe.SetPanelConditionVisible(true);
      this.ANe.SetLockTextByTextId("TowerDefence_Cantplay");
      this.Dsc.SetUiActive(false);
      this.ANe.FunctionButton.SetUiActive(false);
    }
  }
  ewa() {
    this.ANe.SetFunctionRedDotVisible(TowerDefenceController_1.TowerDefenseController.CheckHasNewStage());
  }
}
exports.TowerDefenseSubView = TowerDefenseSubView;
//# sourceMappingURL=TowerDefenceSubView.js.map