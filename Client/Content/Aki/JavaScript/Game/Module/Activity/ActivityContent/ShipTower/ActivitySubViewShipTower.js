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
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
class ActivitySubViewShipTower extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.o1c = false;
    this.OnBtnReward = () => {
      this.PlaySubViewSequence("HideInfo");
      ModelManager_1.ModelManager.ShipTowerModel.OpenViewReward();
    };
    this.Jk_ = () => {
      var e;
      if (ModelManager_1.ModelManager.ShipTowerModel.CheckCanOpen()) {
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
    this.n1c = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetToBattleView);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText]];
    this.BtnBindInfo = [[1, this.OnBtnReward]];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    await ModelManager_1.ModelManager.ShipTowerModel.CheckInitProto();
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    this.CommonInfoPanel.SetClickFunc(this.Jk_);
    var e = this.GetItem(0).GetOwner();
    await this.CommonInfoPanel.CreateThenShowByActorAsync(e);
  }
  OnStart() {
    this.CommonInfoPanel?.SetBtnText("LongShanStage_Join");
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ShipTowerSeason, ModelManager_1.ModelManager.ShipTowerModel.CurSeason);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnBeforeShow() {
    RedDotController_1.RedDotController.BindRedDot("ShipTowerReward", this.GetItem(3));
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindRedDot("ShipTowerReward");
  }
  OnRefreshView() {
    this.c7_();
  }
  d7_(e) {
    this.GetButton(1).RootUIComp.SetUIActive(e);
  }
  c7_() {
    var e = ModelManager_1.ModelManager.ShipTowerModel.GetRewardProgressText();
    var t = ModelManager_1.ModelManager.ShipTowerModel.GetCurrentStageSeasonName();
    this.GetText(2).SetText(e);
    this.GetText(4).SetText(t);
    this.d7_(true);
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
//# sourceMappingURL=ActivitySubViewShipTower.js.map