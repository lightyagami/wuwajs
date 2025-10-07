"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewShipTower = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ShipTowerDefine_1 = require("../../../ShipTower/ShipTowerDefine");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
class ActivitySubViewShipTower extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.fZc = undefined;
    this.gZc = undefined;
    this.o1c = false;
    this.OnBtnReward = () => {
      this.PlaySubViewSequence("HideInfo");
      ModelManager_1.ModelManager.ShipTowerModel.OpenViewReward();
    };
    this.Jk_ = () => {
      var e;
      if (ModelManager_1.ModelManager.ShipTowerModel.CheckCanOpen()) {
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ShipTowerSeason, ModelManager_1.ModelManager.ShipTowerModel.CurSeason);
        this.PlaySubViewSequence("HideView");
        e = ModelManager_1.ModelManager.ShipTowerModel.GetCurrentStage();
        ModelManager_1.ModelManager.ShipTowerModel.OpenViewMain({
          StageId: e?.Id
        });
      }
    };
    this.$Ge = e => {
      if (e === "ShipTowerRewardView") {
        this.PlaySubViewSequence("ShowInfo");
        this.OnRefreshView();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
      }
    };
    this.wNe = () => {
      var e = this.ActivityBaseData.HasNewCycle();
      this.CommonInfoPanel?.SetFunctionRedDotVisible(e);
      this.CommonInfoPanel?.SetPanelTipVisible(e);
    };
    this.n1c = () => {
      UiManager_1.UiManager.ResetToBattleView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[1, this.OnBtnReward]];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    await ModelManager_1.ModelManager.ShipTowerModel.CheckInitProto();
    var e = [];
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    this.CommonInfoPanel.SetClickFunc(this.Jk_);
    var i = this.GetItem(0).GetOwner();
    e.push(this.CommonInfoPanel.CreateThenShowByActorAsync(i));
    this.fZc = new ActivitySubViewShipTowerRewardProgress();
    e.push(this.fZc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.gZc = new ActivitySubViewShipTowerRewardProgress();
    e.push(this.gZc.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.CommonInfoPanel?.SetBtnText("LongShanStage_Join");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnBeforeShow() {
    RedDotController_1.RedDotController.BindRedDot("ShipTowerReward", this.GetItem(3));
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindGivenUi("ShipTowerReward", this.GetItem(3));
  }
  OnRefreshView() {
    this.c7_();
    this.jG_();
    var e = this.ActivityBaseData.HasNewCycle();
    this.CommonInfoPanel?.SetFunctionRedDotVisible(e);
    this.CommonInfoPanel?.SetPanelTipVisible(e);
  }
  d7_(e) {
    this.GetButton(1).RootUIComp.SetUIActive(e);
  }
  c7_() {
    var e = ModelManager_1.ModelManager.ShipTowerModel.GetRewardProgressText();
    var i = ModelManager_1.ModelManager.ShipTowerModel.GetCurrentStageSeasonName();
    this.GetText(2).SetText(e);
    this.GetText(4).SetText(i);
    this.d7_(true);
  }
  jG_() {
    var e = ModelManager_1.ModelManager.ShipTowerModel.GetAreaList().filter(e => e.Id !== ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON).sort((e, i) => e.Index - i.Index);
    this.fZc.SetData(e[0]);
    this.gZc.SetData(e[1]);
  }
  OnTimer(e) {
    if (!this.o1c) {
      if (ModelManager_1.ModelManager.ShipTowerModel.IsOpen() && ModelManager_1.ModelManager.ShipTowerModel.TimeIsOver() && ModelManager_1.ModelManager.ShipTowerModel.CheckIsNeedShowConfirmSeasonUpdate(this.n1c)) {
        this.o1c = true;
      }
    }
  }
}
exports.ActivitySubViewShipTower = ActivitySubViewShipTower;
class ActivitySubViewShipTowerRewardProgress extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  SetData(e) {
    var i = e.RewardList.filter(e => e.IsCompleted).length;
    var e = e.RewardList.length;
    this.GetText(1).SetText(`<color=#fff7a8ff>${i}</color>/<color=#ece5d8ff>${e}</color>`);
  }
}
//# sourceMappingURL=ActivitySubViewShipTower.js.map