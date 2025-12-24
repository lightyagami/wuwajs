"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressStartupView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SplashScreenController_1 = require("../../../../SplashScreen/SplashScreenController");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const ActivityController_1 = require("../../../ActivityController");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const RegressTransitionStateMachine_1 = require("./RegressTransitionStateMachine");
class ActivityRegressStartupView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.o9f = false;
    this.Lle = undefined;
    this.H3e = undefined;
    this.W2e = () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      e.ShowReceivedCallBack = () => ModelManager_1.ModelManager.ActivityRegressModel.DisposableReward;
      return e;
    };
    this.RefreshReward = () => {
      for (const e of this.H3e.GetLayoutItemList()) {
        e.SetReceivedVisible(ModelManager_1.ModelManager.ActivityRegressModel.DisposableReward);
      }
    };
    this.xMo = () => {
      this.Lle.PlayNextState();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[1, this.xMo]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.RefreshReward);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.RefreshReward);
  }
  OnStart() {
    this.o9f = this.OpenParam ?? false;
    this.Lle = new RegressTransitionStateMachine_1.RegressTransitionStateMachine();
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.W2e);
    var e = ModelManager_1.ModelManager.ActivityRegressModel.Grade;
    this.H3e.RefreshByData(this.GetRewardList(e), () => {
      for (const e of this.H3e.GetLayoutItemList()) {
        e.SetReceivedVisible(ModelManager_1.ModelManager.ActivityRegressModel.DisposableReward);
      }
    });
    this.GetItem(2).SetUIActive(e === 1);
    this.GetItem(3).SetUIActive(e === 2);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.ActivityRegressModel.AlreadyStartView = true;
    ModelManager_1.ModelManager.ActivityRegressModel.RecordActivityRecallSplashFirstShow();
    SplashScreenController_1.SplashScreenController.FinishCurTask(4);
    this.Lle.Start();
  }
  OnBeforeDestroy() {
    this.Lle.ShutDown();
  }
  GetRewardList(e) {
    var t;
    var r;
    var i = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressDisposableReward(ModelManager_1.ModelManager.ActivityRegressModel.ActivityId);
    var n = [];
    for ([t, r] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e === 2 ? i.HighDropId : i.DropId).DropPreview) {
      n.push([{
        ItemId: t,
        IncId: 0
      }, r]);
    }
    return n;
  }
  GotoActivityViewAndCloseSelf() {
    ModelManager_1.ModelManager.ActivityRegressModel.SetFirstShowChecked();
    this.CloseMe();
    const e = ModelManager_1.ModelManager.ActivityRegressModel.DisposableReward;
    var t = ModelManager_1.ModelManager.ActivityRegressModel.ActivityId;
    if (t === 0 || this.o9f) {
      if (!e) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RegressDisposableRewardRequest();
      }
    } else {
      ActivityController_1.ActivityController.OpenActivityById(t, 4, undefined, () => {
        if (!e) {
          ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RegressDisposableRewardRequest();
        }
      });
    }
  }
}
exports.ActivityRegressStartupView = ActivityRegressStartupView;
//# sourceMappingURL=ActivityRegressStartupView.js.map