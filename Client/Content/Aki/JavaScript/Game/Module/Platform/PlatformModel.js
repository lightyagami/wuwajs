"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformModel = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const NetworkDefine_1 = require("../../../Launcher/NetworkDefine");
const Platform_1 = require("../../../Launcher/Platform/Platform");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const InputSettings_1 = require("../../InputSettings/InputSettings");
const CloudGameManager_1 = require("../../Manager/CloudGameManager");
const MobileSwitchInputController_1 = require("../../Ui/Input/Moblie/MobileSwitchInputController");
const LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager");
const PlatformDefine_1 = require("./PlatformDefine");
class PlatformModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.LastGamepadAttachedState = false;
    this.Iya = (e, t) => {
      this.nEa();
      this.sEa();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InputControllerChange, e, t);
    };
    this.Tya = (e, t) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShowTypeChange, e, t);
    };
    this.Lya = (e, t) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InputControllerMainTypeChange, e, t);
    };
    this.aY_ = () => {
      this.sEa();
    };
  }
  OnInit() {
    Info_1.Info.SetInputTypeChangeFunc(this.Iya);
    Info_1.Info.SetShowTypeChangeFunc(this.Tya);
    Info_1.Info.SetInputMainTypeChangeFunc(this.Lya);
    this.nEa();
    this.sEa();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InitializeLguiEventSystemActor, this.aY_);
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InitializeLguiEventSystemActor, this.aY_);
    Info_1.Info.ClearInputTypeChangeFunc();
    Info_1.Info.ClearShowTypeChangeFunc();
    Info_1.Info.ClearInputMainTypeChangeFunc();
    return true;
  }
  nEa() {
    if (Info_1.Info.IsInGamepad()) {
      AudioSystem_1.AudioSystem.SetState("input_controller_type", "gamepad");
    } else if (Info_1.Info.IsInKeyBoard()) {
      AudioSystem_1.AudioSystem.SetState("input_controller_type", "Keyboard");
    } else {
      AudioSystem_1.AudioSystem.SetState("input_controller_type", "touch");
    }
  }
  sEa() {
    let e = 0;
    if (Info_1.Info.IsInKeyBoard()) {
      e = 1;
    } else if (Info_1.Info.IsInGamepad()) {
      e = 2;
    } else if (Info_1.Info.IsInTouch()) {
      e = 3;
    }
    var t = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    if (t?.IsValid()) {
      t.SetCurrentInputKeyType(e);
    }
    UE.BasePlayerController.SetUseSonyGamepadState(Info_1.Info.IsPsGamepad());
  }
  cWa() {
    var t = UE.RawInputFunctionLibrary.GetRegisteredDevices();
    if (!t || t.Num() === 0) {
      return 0;
    }
    for (let e = 0; e < t.Num(); e++) {
      var r = t.Get(e);
      var r = r.VendorID + "_" + r.ProductID;
      var r = PlatformDefine_1.deviceIdMap.get(r);
      if (r) {
        return r;
      }
    }
    return 2;
  }
  bj1() {
    var e = UE.KismetSystemLibrary.GetCurrentActiveGamepadName();
    if (e.includes("xbox")) {
      return 2;
    } else if (e.includes("ps4")) {
      return 3;
    } else if (e.includes("ps5")) {
      return 4;
    } else {
      return 2;
    }
  }
  zu_() {
    var e = CloudGameManager_1.CloudGameManager.CloudGamePadInfo;
    if (e === undefined) {
      return 0;
    } else {
      e = e.VendorId + "_" + e.ProductId;
      return PlatformDefine_1.deviceIdMap.get(e) || 2;
    }
  }
  mWa(e) {
    if (this.IsKeyFromGamepadKey(e.KeyName.toString())) {
      if (e = this.GetCurrentDeviceInputController()) {
        MobileSwitchInputController_1.MobileSwitchInputController.SwitchToGamepad(e, "PressAnyKey");
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MobileInputSwitch", 10, "有手柄按钮输入但是识别不到对应的手柄设备");
      }
    }
  }
  dWa(e) {
    if (UE.KismetInputLibrary.Key_IsGamepadKey(e)) {
      if (!this.RefreshPlatformByDevice("PressAnyKey")) {
        Info_1.Info.SwitchInputControllerType(2, "PressAnyKey");
      }
    } else if (UE.KismetInputLibrary.Key_IsKeyboardKey(e) || UE.KismetInputLibrary.Key_IsMouseButton(e)) {
      Info_1.Info.SwitchInputControllerType(1, "PressAnyKey");
    } else {
      Info_1.Info.SwitchInputControllerType(5, "PressAnyKey");
    }
  }
  OnPressAnyKey(e) {
    if (Info_1.Info.IsMobileInputModel()) {
      this.mWa(e);
    } else {
      this.dWa(e);
    }
  }
  RefreshPlatformByDevice(e) {
    if (Info_1.Info.IsPs5Platform()) {
      Info_1.Info.SwitchInputControllerType(4, e);
      return true;
    }
    if (CloudGameManager_1.CloudGameManager.IsCloudGame) {
      return (t = this.zu_()) !== 0 && (Info_1.Info.SwitchInputControllerType(t, e), true);
    }
    if (Info_1.Info.IsWindowsPlatform()) {
      var t = this.cWa();
      if (t !== 0) {
        Info_1.Info.SwitchInputControllerType(t, e);
        return true;
      }
    }
    if (Info_1.Info.IsMacPlatform()) {
      t = this.bj1();
      if (t !== 0) {
        Info_1.Info.SwitchInputControllerType(t, e);
        return true;
      }
    }
    return false;
  }
  GetNetStatus() {
    if (Info_1.Info.IsMobilePlatform()) {
      if (UE.MobilePatchingLibrary.HasActiveWiFiConnection()) {
        return Protocol_1.Aki.Protocol.yNs.Proto_Wifi;
      } else if (UE.KuroLauncherLibrary.GetNetworkConnectionType() === NetworkDefine_1.ENetworkType.Cell) {
        return Protocol_1.Aki.Protocol.yNs.Proto_Stream;
      } else {
        return Protocol_1.Aki.Protocol.yNs.Proto_Other;
      }
    } else if (Info_1.Info.IsPcOrGamepadPlatform()) {
      return Protocol_1.Aki.Protocol.yNs.Proto_Wired;
    } else {
      return Protocol_1.Aki.Protocol.yNs.Proto_Other;
    }
  }
  IsKeyFromGamepadKey(e) {
    return !e.includes("Android") && InputSettings_1.InputSettings.IsGamepadKey(e);
  }
  GetCurrentDeviceInputController() {
    if (Platform_1.Platform.IsPcPlatform()) {
      if (CloudGameManager_1.CloudGameManager.IsCloudGame) {
        return this.GetCloudGameInputController();
      } else {
        return this.cWa();
      }
    }
    var e = UE.KismetSystemLibrary.GetCurrentActiveGamepadName();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MobileInputSwitch", 10, "当前激活的手柄", ["设备名", e]);
    }
    if (Platform_1.Platform.IsAndroidPlatform()) {
      if (e === "None") {
        return 0;
      }
      var t;
      var r;
      var n = PlatformDefine_1.deviceIdMap.get(e);
      if (n) {
        return n;
      }
      for ([t, r] of PlatformDefine_1.deviceIdMap) {
        if (t.includes("*")) {
          var o = t.split("*")[0];
          if (e.startsWith(o)) {
            return r;
          }
        }
      }
      return 2;
    }
    if (Platform_1.Platform.IsIOSPlatform()) {
      if (e.includes("Xbox")) {
        return 2;
      } else if (e.includes("DualShock")) {
        return 4;
      } else if (e.includes("BackBoneOne")) {
        return 6;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  IsGamepadAttached() {
    if (Platform_1.Platform.IsPcPlatform()) {
      if (Platform_1.Platform.CloudGamePlatform) {
        return this.zu_() !== 0;
      } else {
        return this.cWa() !== 0;
      }
    } else {
      return UE.KismetSystemLibrary.IsGamepadAttached();
    }
  }
  GetCloudGameInputController() {
    var e = this.zu_();
    if (e !== 0) {
      return e;
    } else if (Platform_1.Platform.CloudGamePlatform === "Mac" || Platform_1.Platform.CloudGamePlatform == "Windows") {
      return 1;
    } else {
      return 5;
    }
  }
}
exports.PlatformModel = PlatformModel;
//# sourceMappingURL=PlatformModel.js.map