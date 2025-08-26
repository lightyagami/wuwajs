"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerVariationView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const TowerController_1 = require("../TowerController");
const TowerData_1 = require("../TowerData");
const TowerAreaItem_1 = require("./TowerAreaItem");
const TowerTitleItem_1 = require("./TowerTitleItem");
class TowerVariationView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.dRo = false;
    this._fe = true;
    this.y2t = undefined;
    this.gLt = undefined;
    this.CRo = [];
    this.YDo = () => {
      if (ModelManager_1.ModelManager.TowerModel?.GetDifficultyRewardProgress(ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties) === 1) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("HaveAllReward");
      }
      UiManager_1.UiManager.OpenView("TowerRewardView", undefined, (e, r) => {
        this.AddChildViewById(r);
      });
    };
    this.rzc = () => {
      this.YDo();
    };
    this.JDo = () => {
      if (UiManager_1.UiManager.GetViewByName("TowerNormalView")) {
        this.CloseMe();
      } else {
        UiManager_1.UiManager.OpenViewAsync("TowerNormalView");
      }
    };
    this.zDo = () => {
      ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(5, 0);
    };
    this.ZDo = () => {
      var e = ModelManager_1.ModelManager.TowerModel?.GetDifficultyRewardProgress(TowerData_1.VARIATION_RISK_DIFFICULTY);
      this.GetSprite(6)?.SetFillAmount(e);
      if (e === 1) {
        this.GetItem(10)?.SetUIActive(true);
        this.GetItem(11)?.SetUIActive(true);
      } else {
        this.GetItem(10)?.SetUIActive(false);
        this.GetItem(11)?.SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[2, this.YDo], [3, this.JDo], [7, this.zDo]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTowerRewardReceived, this.ZDo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTowerReviewGoToReward, this.rzc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTowerRewardReceived, this.ZDo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTowerReviewGoToReward, this.rzc);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties = TowerData_1.VARIATION_RISK_DIFFICULTY;
    RedDotController_1.RedDotController.BindRedDot("TowerReward", this.GetItem(5));
    RedDotController_1.RedDotController.BindRedDot("TowerRewardByDifficulties", this.GetItem(8), undefined, 5);
    this.ZDo();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotTowerReward);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotTowerRewardByDifficulties, 5);
    var e = !ModelManager_1.ModelManager.TowerModel.GetOverLockHasShow();
    var r = ModelManager_1.ModelManager.TowerModel.GetDifficultyIsClear(TowerData_1.VARIATION_RISK_DIFFICULTY);
    if (e && r) {
      this.GetItem(8)?.SetUIActive(true);
    }
  }
  OnBeforeDestroy() {
    this.gLt.Destroy();
    this.gLt = undefined;
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
  }
  async eRo() {
    if (UiManager_1.UiManager.GetViewByName("TowerNormalView")) {
      await UiManager_1.UiManager.CloseViewAsync("TowerNormalView");
    }
    this.CloseMe();
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.TowerModel.GetDifficultyAllAreaFirstFloor(TowerData_1.VARIATION_RISK_DIFFICULTY);
    const o = this.GetHorizontalLayout(1).RootUIComp;
    await e.reduce(async (e, r, t) => {
      await e;
      e = new TowerAreaItem_1.TowerAreaItem();
      this.CRo.push(e);
      return e.CreateThenShowByResourceIdAsync(t === 1 ? "UiItem_DailyTowerLevelRedItem" : "UiItem_DailyTowerLevelItem", o);
    }, Promise.resolve());
  }
  OnStart() {
    if (ModelManager_1.ModelManager.TowerModel.CheckInTower()) {
      TowerController_1.TowerController.ClearAllHatredInTower();
    }
    this.dRo = ModelManager_1.ModelManager.TowerModel.GetDifficultyIsClear(TowerData_1.HIGH_RISK_DIFFICULTY);
    ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties = TowerData_1.VARIATION_RISK_DIFFICULTY;
    this.gLt = new TowerTitleItem_1.TowerTitleItem(this.GetItem(0), () => {
      var e;
      if (ModelManager_1.ModelManager.TowerModel.CheckInTower()) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(137)).FunctionMap.set(2, () => {
          TowerController_1.TowerController.LeaveTower();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        this.eRo();
      }
    });
    this.gLt.RefreshText("InstanceDungeonTitle_31_CommonText");
    var e = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData();
    this.GetText(4).SetText(e.CountDownText);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotTowerRewardByDifficulties, 3);
    ModelManager_1.ModelManager.TowerModel.CurrentTowerLock = !this.dRo;
    var r = ModelManager_1.ModelManager.TowerModel.GetDifficultyAllAreaFirstFloor(TowerData_1.VARIATION_RISK_DIFFICULTY);
    for (let e = 0; e < this.CRo.length; e++) {
      this.CRo[e].Refresh(r[e]);
    }
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindGivenUi("TowerReward", this.GetItem(5));
    RedDotController_1.RedDotController.UnBindGivenUi("TowerRewardByDifficulties", this.GetItem(8), 5);
  }
  OnTick(e) {
    if (this._fe) {
      this.B2t();
    }
  }
  B2t() {
    var e;
    var r = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData().CountDownText;
    if (this.y2t !== r) {
      this.y2t = r;
      this.GetText(4).SetText(r);
    }
    if (MathUtils_1.MathUtils.LongToNumber(ModelManager_1.ModelManager.TowerModel.TowerEndTime) - TimeUtil_1.TimeUtil.GetServerTime() <= 1) {
      this._fe = false;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetToBattleView);
      (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(99)).FunctionMap.set(1, e = () => {
        if (ModelManager_1.ModelManager.TowerModel.CheckInTower()) {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
        }
      });
      r.FunctionMap.set(2, e);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
    }
  }
}
exports.TowerVariationView = TowerVariationView;
//# sourceMappingURL=TowerVariationView.js.map