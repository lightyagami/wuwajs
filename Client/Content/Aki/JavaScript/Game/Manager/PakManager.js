"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PakManager = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const MultiTextLang_1 = require("../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const AppUtil_1 = require("../../Launcher/Update/AppUtil");
const PakKeyUpdate_1 = require("../../Launcher/Update/PakKeyUpdate");
const ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine");
const LoginDefine_1 = require("../Module/Login/Data/LoginDefine");
const LoginController_1 = require("../Module/Login/LoginController");
const ControllerHolder_1 = require("./ControllerHolder");
class PakManager {
  static Init() {
    if (PakManager.xBe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(PakManager.xBe);
      PakManager.xBe = undefined;
    }
    UE.KuroPakKeyLibrary.BindPakMountedCallback((0, puerts_1.toManualReleaseDelegate)(PakManager.Kdm));
    PakManager.vih();
    PakManager.Mih();
  }
  static TestPakMounted() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Event", 21, "测试Pak挂载");
    }
    var e = UE.KuroLauncherLibrary.GameSavedDir() + "Saved/Paks/pakchunk103-WindowsNoEditor.pak";
    UE.KuroPakMountStatic.MountPak(e, 9999);
  }
  static vih() {
    var e;
    if (PakKeyUpdate_1.PakKeyUpdate.NeedExtPakKeys && PakKeyUpdate_1.PakKeyUpdate.UpdateCheckInterval > 0) {
      e = PakKeyUpdate_1.PakKeyUpdate.UpdateCheckInterval * 1000;
      PakManager.xBe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(undefined, undefined).catch(e => {});
      }, e, 1, undefined, undefined, false);
    }
  }
  static Mih() {
    if (PakManager.Sih !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(PakManager.Sih);
      PakManager.Sih = undefined;
    }
    if (PakManager.yih > 0) {
      PakManager.Sih = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        PakManager.Eih();
      }, PakManager.yih, 1, undefined, undefined, false);
    }
  }
  static Eih() {
    var e;
    var a;
    if (!UE.KuroPakMountStatic.IsSha1CheckWorking()) {
      if ((e = UE.KuroPakMountStatic.GetSha1CheckFailedCount()) > 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("ErrorCode", 21, "文件Sha1校验失败", ["Count", e]);
        }
        e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33);
        a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ResourceVerificationFailed_Text");
        e.SetTextArgs(a);
        e.FunctionMap.set(1, () => {
          PakManager.Iih();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else if (PakManager.Sih !== undefined) {
        TimerSystem_1.GameplayTimerSystem.Remove(PakManager.Sih);
        PakManager.Sih = undefined;
      }
    }
  }
  static Iih() {
    LoginController_1.LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.PatchVerifyFail);
    UE.KuroPakMountStatic.UnmountAllPaks();
    UE.KuroPakMountStatic.DeleteSha1CheckFailedFiles();
    AppUtil_1.AppUtil.QuitGame("Pak");
  }
  static Clear() {
    if (PakManager.Sih !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(PakManager.Sih);
      PakManager.Sih = undefined;
    }
    (0, puerts_1.releaseManualReleaseDelegate)(PakManager.Kdm);
    UE.KuroPakKeyLibrary.UnbindPakMountedCallback();
  }
}
(exports.PakManager = PakManager).xBe = undefined;
PakManager.Sih = undefined;
PakManager.yih = 60000;
PakManager.Kdm = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Event", 21, "Pak挂载", ["Filename", e]);
  }
  (0, MultiTextLang_1.ClearMultiTextLangStatementIdsAndCache)();
}; //# sourceMappingURL=PakManager.js.map