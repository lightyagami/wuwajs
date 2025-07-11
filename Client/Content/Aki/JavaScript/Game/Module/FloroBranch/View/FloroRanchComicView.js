"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchComicView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const FloroRanchController_1 = require("../FloroRanchController");
const nextViewMap = new Map([["FloroRanchComicView", "FloroRanchComicView2"], ["FloroRanchComicView2", "FloroRanchComicView3"], ["FloroRanchComicView3", "FloroRanchComicView4"], ["FloroRanchComicView4", "FloroRanchMainView"]]);
class FloroRanchComicView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TimerHandle = undefined;
    this.OnNextBtnClick = () => {
      var e = nextViewMap.get(this.Info.Name);
      if (e) {
        UiManager_1.UiManager.CloseAndOpenView(this.Info.Name, e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 71, "弗洛洛漫画缺少下一个界面的声明", ["viewName", this.Info.Name]);
      }
    };
    this.OnSkipBtnClick = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(340);
      e.FunctionMap.set(2, () => {
        FloroRanchController_1.FloroRanchController.RequestComicRead();
        this.OnCloseBtnClick();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.OnCloseBtnClick = () => {
      UiManager_1.UiManager.CloseAndOpenView(this.Info.Name, "FloroRanchMainView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnNextBtnClick], [1, this.OnSkipBtnClick], [2, this.OnCloseBtnClick]];
  }
  OnStart() {
    this.GetButton(2)?.RootUIComp.SetUIActive(false);
    this.GetButton(0)?.SetSelfInteractive(false);
    this.GetItem(3)?.SetUIActive(false);
  }
  OnAfterShow() {
    if (this.Info.Name === "FloroRanchComicView4") {
      FloroRanchController_1.FloroRanchController.RequestComicRead();
    }
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetFloroRanchParamConfig().ComicIntervalTime;
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.GetButton(0)?.SetSelfInteractive(true);
      this.GetItem(3)?.SetUIActive(true);
    }, e);
  }
}
exports.FloroRanchComicView = FloroRanchComicView;
//# sourceMappingURL=FloroRanchComicView.js.map