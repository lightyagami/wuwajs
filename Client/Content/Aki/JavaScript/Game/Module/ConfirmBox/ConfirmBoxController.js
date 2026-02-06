"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmBoxController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ReconnectDefine_1 = require("../ReConnect/ReconnectDefine");
const ConfirmBoxDefine_1 = require("./ConfirmBoxDefine");
class ConfirmBoxController extends UiControllerBase_1.UiControllerBase {
  static ShowConfirmBoxNew(o) {
    var e = ConfirmBoxController.GetUiViewName(o.ConfigId);
    if (o.FunctionMap.size > 0) {
      o.IsMultipleView = true;
    }
    return !!e && (Log_1.Log.CheckInfo() && Log_1.Log.Info("ConfirmBox", 10, "打开确认弹窗", ["ConfigId", o.ConfigId], ["UiViewName", e]), UiManager_1.UiManager.OpenView(e, o, o.FinishOpenFunction), true);
  }
  static CheckIsConfirmBoxOpen() {
    for (const o of ConfirmBoxController.mqt.values()) {
      if (UiManager_1.UiManager.IsViewOpen(o)) {
        return true;
      }
    }
    return false;
  }
  static CloseConfirmBoxView() {
    for (const o of ConfirmBoxController.mqt.values()) {
      UiManager_1.UiManager.CloseView(o);
    }
  }
  static ShowNetWorkConfirmBoxView(o, e = undefined) {
    o.NotAddChildToTopStackView = true;
    UiManager_1.UiManager.OpenView("NetWorkConfirmBoxView", o, e);
  }
  static CloseNetWorkConfirmBoxView(o, e = undefined) {
    UiManager_1.UiManager.CloseViewById(o, e);
  }
  static ShowFirstCurrencyConfirm() {
    var o = ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency();
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(63);
    var o = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(o);
    e.SetTextArgs(o);
    e.FunctionMap.set(2, () => {
      ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewToRecharge();
    });
    ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  static ShowExitGameConfirmBox() {
    var o;
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(5);
    } else {
      (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(51)).FunctionMap.set(2, () => {
        if (GlobalData_1.GlobalData.IsPlayInEditor) {
          UE.KismetSystemLibrary.QuitGame(GlobalData_1.GlobalData.World, undefined, 0, false);
        } else {
          cpp_1.KuroApplication.ExitWithReason(false, "ExitGameConfirmBox");
        }
      });
      ConfirmBoxController.ShowConfirmBoxNew(o);
    }
  }
  static ShowReturnLoginConfirmBox() {
    var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(270);
    o.IsEscViewTriggerCallBack = false;
    o.FunctionMap.set(2, () => {
      ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.ExitGameConfirmBox);
    });
    o.FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(5);
    });
    ConfirmBoxController.ShowConfirmBoxNew(o);
  }
  static GetUiViewName(o) {
    o = ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetUiShowType(o);
    return ConfirmBoxController.mqt.get(o);
  }
}
(exports.ConfirmBoxController = ConfirmBoxController).mqt = new Map([[0, "ConfirmBoxView"], [1, "ConfirmBoxMiddleView"], [2, "ConfirmBoxMiddleWithoutItemView"], [3, "RacingBetsConfirmBoxView"], [4, "FloroRanchConfirmBoxView"]]);
//# sourceMappingURL=ConfirmBoxController.js.map