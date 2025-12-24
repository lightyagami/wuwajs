"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileSwitchInputController = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const CloudGameManager_1 = require("../../../Manager/CloudGameManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../Module/ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../../Module/ScrollingTips/ScrollingTipsController");
const UiConfig_1 = require("../../Define/UiConfig");
const UiLayerType_1 = require("../../Define/UiLayerType");
const InputDistributeDefine_1 = require("../../InputDistribute/InputDistributeDefine");
const UiManager_1 = require("../../UiManager");
const UiModel_1 = require("../../UiModel");
class MobileSwitchInputController {
  static async CWa() {
    var e = UiModel_1.UiModel.MainViewName;
    await UiManager_1.UiManager.NormalResetToViewAsync(e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MobileInputSwitch", 10, "重置回主界面成功");
    }
    await Promise.all([UiManager_1.UiManager.CloseViewAsync("PingView"), UiManager_1.UiManager.CloseViewAsync(e)]);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MobileInputSwitch", 10, "关闭主界面成功");
    }
  }
  static fk_() {
    for (const e of this.gk_.values()) {
      UiManager_1.UiManager.OpenView(e.UiViewName, e.Param);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MobileInputSwitch", 10, "重新打开切换期间打开的界面数据", ["viewName", e.UiViewName]);
      }
    }
    this.gk_.clear();
  }
  static _Wa(e) {
    UiManager_1.UiManager.AddOpenViewCheckFunction("All", MobileSwitchInputController.Ck_, "MobileSwitchInput");
    UiManager_1.UiManager.OpenView("MobileSwitchInputView", e);
  }
  static Brl() {
    return !!Info_1.Info.IsMobileInputModel() && !!UiModel_1.UiModel.IsInMainView && !!ModelManager_1.ModelManager.BattleUiModel?.IsEnableChangeInputControllerOnMobile() && !!ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchAnyCurrentInputTag(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag);
  }
  static SwitchToGamepadByMenuSetting() {
    if (Info_1.Info.IsMobileInputModel() && !Info_1.Info.IsInGamepad()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MobileInputSwitch", 10, "[MenuSetting]触屏切换手柄");
      }
      const e = ModelManager_1.ModelManager.PlatformModel.GetCurrentDeviceInputController();
      MobileSwitchInputController.CWa().finally(() => {
        MobileSwitchInputController._Wa(true);
        Info_1.Info.SwitchInputControllerType(e, "MenuSetting");
      });
    }
  }
  static SwitchToGamepad(e, o) {
    if (e) {
      if (this.Brl()) {
        MobileSwitchInputController.gWa = e;
        if (!Info_1.Info.IsInGamepad() && !MobileSwitchInputController.fWa) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("MobileInputSwitch", 10, "触屏切换手柄");
          }
          MobileSwitchInputController.fWa = true;
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(212)).FunctionMap.set(1, MobileSwitchInputController.Sbo);
          e.FunctionMap.set(2, MobileSwitchInputController.pWa);
          e.SetCloseFunction(MobileSwitchInputController.vWa);
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MobileInputSwitch", 10, "触屏切换手柄异常,传入无效的输入设备类型", ["reason", o]);
    }
  }
  static SwitchToTouch() {
    if (!!Info_1.Info.IsMobileInputModel() && !Info_1.Info.IsInTouch()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MobileInputSwitch", 10, "手柄切换触屏");
      }
      MobileSwitchInputController.CWa().finally(() => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MobileGamepadDisconnect);
        MobileSwitchInputController._Wa(false);
        Info_1.Info.SwitchInputControllerType(5, "MobileSwitch");
      });
    }
  }
  static SwitchToTouchByDisconnectGamepad() {
    return !!this.Brl() && !Info_1.Info.IsInTouch() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("MobileInputSwitch", 10, "手柄切换触屏DisconnectGamepad"), MobileSwitchInputController.CWa().finally(() => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MobileGamepadDisconnect);
      MobileSwitchInputController._Wa(false);
      Info_1.Info.SwitchInputControllerType(5, "MobileSwitch");
    }), true);
  }
}
exports.MobileSwitchInputController = MobileSwitchInputController;
(_a = MobileSwitchInputController).MWa = false;
MobileSwitchInputController.fWa = false;
MobileSwitchInputController.gWa = undefined;
MobileSwitchInputController.gk_ = new Map();
MobileSwitchInputController.Sbo = () => {
  MobileSwitchInputController.fWa = false;
};
MobileSwitchInputController.pWa = () => {
  if (GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MobileGamepadMode) === 1) {
    MobileSwitchInputController.MWa = true;
  } else {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Controler_Notconnect_tips");
  }
};
MobileSwitchInputController.vWa = () => {
  const e = MobileSwitchInputController.gWa;
  MobileSwitchInputController.gWa = undefined;
  MobileSwitchInputController.fWa = false;
  if (MobileSwitchInputController.MWa) {
    MobileSwitchInputController.MWa = false;
    MobileSwitchInputController.CWa().finally(() => {
      MobileSwitchInputController._Wa(true);
      Info_1.Info.SwitchInputControllerType(e, "MobileSwitch");
    });
  }
};
MobileSwitchInputController.Ck_ = (e, o) => {
  var t;
  return e === "MobileSwitchInputView" || !!(t = UiConfig_1.UiConfig.TryGetViewInfo(e)) && !!((t.Type & UiLayerType_1.MOBILE_SWITCH_ALLOW_VIEW_TYPE) > 0) || (_a.gk_.set(e, {
    UiViewName: e,
    Param: o
  }), Log_1.Log.CheckInfo() && Log_1.Log.Info("MobileInputSwitch", 10, "缓存切换期间打开的界面数据", ["viewName", e]), false);
};
MobileSwitchInputController.ReOpenBattleView = () => {
  UiManager_1.UiManager.RemoveOpenViewCheckFunction("All", MobileSwitchInputController.Ck_);
  ControllerHolder_1.ControllerHolder.BattleUiControl.OpenMainView();
  if (!CloudGameManager_1.CloudGameManager.IsCloudGame) {
    UiManager_1.UiManager.OpenView("PingView");
  }
  MobileSwitchInputController.fk_();
}; //# sourceMappingURL=MobileSwitchInputController.js.map