"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressStartupView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const SplashScreenController_1 = require("../../../../SplashScreen/SplashScreenController");
const ActivityController_1 = require("../../../ActivityController");
const RegressTransitionStateMachine_1 = require("./RegressTransitionStateMachine");
class ActivityRegressStartupView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Lle = undefined;
    this.xMo = () => {
      this.Lle.PlayNextState();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[1, this.xMo]];
  }
  OnStart() {
    this.Lle = new RegressTransitionStateMachine_1.RegressTransitionStateMachine();
    var e = ModelManager_1.ModelManager.ActivityRegressModel.Grade;
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
  GotoActivityViewAndCloseSelf() {
    ModelManager_1.ModelManager.ActivityRegressModel.SetFirstShowChecked();
    this.CloseMe();
    var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityId;
    if (e !== 0) {
      ActivityController_1.ActivityController.OpenActivityById(e);
    }
  }
}
exports.ActivityRegressStartupView = ActivityRegressStartupView;
//# sourceMappingURL=ActivityRegressStartupView.js.map