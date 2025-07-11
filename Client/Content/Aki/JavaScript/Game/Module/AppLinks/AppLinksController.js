"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppLinksController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const AppLinks_1 = require("../../../Launcher/AppLinks");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const FunctionController_1 = require("../Functional/FunctionController");
class AppLinksController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.h2n();
    return super.OnInit();
  }
  static OnClear() {
    this.l2n();
    return super.OnClear();
  }
  static h2n() {
    AppLinks_1.AppLinks.SetDeepValueHandle("10009", this._2n);
    AppLinks_1.AppLinks.SetDeepValueHandle("10053", this.y4e);
  }
  static l2n() {
    AppLinks_1.AppLinks.RemoveDeepValueHandle("10009");
    AppLinks_1.AppLinks.RemoveDeepValueHandle("10053");
  }
  static iVe() {
    return !!ModelManager_1.ModelManager.GameModeModel.WorldDone && !ModelManager_1.ModelManager.GameModeModel.Loading && !!UiManager_1.UiManager.IsViewShow("BattleView");
  }
}
exports.AppLinksController = AppLinksController;
(_a = AppLinksController)._2n = (e, r) => {
  if (_a.iVe()) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Functional", 21, "打开抽卡界面");
    }
    FunctionController_1.FunctionController.OpenFunctionRelateView(10009);
  } else if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Functional", 21, "未完成游戏登录");
  }
};
AppLinksController.y4e = (e, r) => {
  if (_a.iVe()) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Functional", 21, "打开活动界面");
    }
    FunctionController_1.FunctionController.OpenFunctionRelateView(10053);
  } else if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Functional", 21, "未完成游戏登录");
  }
}; //# sourceMappingURL=AppLinksController.js.map