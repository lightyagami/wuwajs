"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewLoopTower = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiManager_1 = require("../../../../Ui/UiManager");
const TowerData_1 = require("../../../TowerDetailUi/TowerData");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const TOWER_MAP_MARK_ID = 301203;
class ActivitySubViewLoopTower extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this._fe = true;
    this.ONe = () => {
      var e = {
        MarkId: TOWER_MAP_MARK_ID,
        MarkType: 6
      };
      ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, e);
    };
    this.Ita = () => {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerIsClickShop, true);
      this.GetItem(7)?.SetUIActive(false);
      ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(5, 0);
    };
    this.Tta = () => {
      if (ModelManager_1.ModelManager.TowerModel?.GetDifficultyRewardProgress(TowerData_1.VARIATION_RISK_DIFFICULTY) === 1) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("HaveAllReward");
      }
      UiManager_1.UiManager.OpenView("TowerRewardView", TowerData_1.VARIATION_RISK_DIFFICULTY, (e, t) => {
        UiManager_1.UiManager.GetViewByName("CommonActivityView")?.AddChildViewById(t);
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[4, this.Ita], [5, this.Tta]];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(e.GetOwner());
    var e = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    await this.DNe.CreateThenShowByActorAsync(e.GetOwner());
    var e = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await this.UNe.CreateThenShowByActorAsync(e.GetOwner());
    var e = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await this.ANe.CreateThenShowByActorAsync(e.GetOwner());
    await ControllerHolder_1.ControllerHolder.TowerController.RefreshTower();
  }
  OnStart() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    this.DNe.SetContentByTextId(this.ActivityBaseData.LocalConfig.Desc);
    this.kNe();
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerIsClickSeason, ModelManager_1.ModelManager.TowerModel.CurrentSeason);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
    if (StringUtils_1.StringUtils.IsEmpty(this.ActivityRemainTimeText)) {
      this.ActivityRemainTimeText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    }
  }
  OnBeforeShow() {
    this.OnRefreshView();
    this.KYc();
    ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties = TowerData_1.VARIATION_RISK_DIFFICULTY;
    RedDotController_1.RedDotController.BindRedDot("TowerReward", this.GetItem(8));
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotTowerReward);
    this.GetItem(7)?.SetUIActive(!LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerIsClickShop));
  }
  OnRefreshView() {
    this.FNe();
    this.VNe();
    this.Lta();
  }
  OnTimer(e) {
    if (this._fe) {
      this.FNe();
    }
  }
  FNe() {
    var e = MathUtils_1.MathUtils.LongToNumber(ModelManager_1.ModelManager.TowerModel.TowerEndTime);
    if (e - TimeUtil_1.TimeUtil.GetServerTime() <= 0) {
      ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
      this._fe = false;
    } else {
      e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(e, this.ActivityRemainTimeText);
      this.LNe.SetTimeTextByText(e);
    }
  }
  kNe() {
    var e = this.ActivityBaseData.GetPreviewReward();
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.UNe.RefreshItemLayout(e);
  }
  VNe() {
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectActivity_Button_ahead");
    this.ANe.FunctionButton.SetText(e);
    this.ANe.FunctionButton.SetFunction(this.ONe);
  }
  KYc() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerSeason) ?? -1;
    var t = ModelManager_1.ModelManager.TowerModel.CurrentSeason;
    var e = e !== t;
    this.ANe?.SetPanelTipVisible(e);
    if (e) {
      this.ANe?.SetPanelTipByTextId("CycleTowerNewPeriod");
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerSeason, t);
    }
  }
  Lta() {
    var e = ModelManager_1.ModelManager.TowerModel;
    var t = e.GetDifficultyMaxStars(TowerData_1.VARIATION_RISK_DIFFICULTY);
    var e = e.GetDifficultyAllStars(TowerData_1.VARIATION_RISK_DIFFICULTY);
    this.GetText(6).SetText(t + "/" + e);
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindGivenUi("TowerReward", this.GetItem(8));
  }
}
exports.ActivitySubViewLoopTower = ActivitySubViewLoopTower;
//# sourceMappingURL=ActivitySubViewLoopTower.js.map