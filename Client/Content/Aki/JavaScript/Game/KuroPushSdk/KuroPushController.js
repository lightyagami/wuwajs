"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuroPushController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const LanguageSystem_1 = require("../../Core/Common/LanguageSystem");
const Log_1 = require("../../Core/Common/Log");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const HotPatchPushSdk_1 = require("../../Launcher/HotPatchPushSdk/HotPatchPushSdk");
const LauncherStorageLib_1 = require("../../Launcher/Util/LauncherStorageLib");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../GameSettings/GameSettingsDefine");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine");
const SELFDEFINESN = "push";
class KuroPushController extends ControllerBase_1.ControllerBase {
  static IfCanUsePush() {
    var t = Info_1.Info.IsMobilePlatform();
    return !!UE.KuroStaticLibrary.IsModuleLoaded("KuroPushSdk") && !!t;
  }
  static OnInit() {
    if (UE.KuroLauncherLibrary.IsFirstIntoLauncher()) {
      this.oSe();
      this.BindCurrentLanguageTag();
      this.Ojs();
    }
    this.BindCurrentLanguageTag();
    this.nSe();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Push", 27, "current push clientId", ["clientId", this.GetClientId()]);
    }
    return true;
  }
  static async Ojs() {
    await this.Njs();
    await this.rSe();
  }
  static async Njs() {
    var t;
    if (!LauncherStorageLib_1.LauncherStorageLib.GetGlobal(LauncherStorageLib_1.ELauncherStorageGlobalKey.AndroidNotFirstTimeOpenPush, false) && !(LauncherStorageLib_1.LauncherStorageLib.SetGlobal(LauncherStorageLib_1.ELauncherStorageGlobalKey.AndroidNotFirstTimeOpenPush, true), Log_1.Log.CheckInfo() && Log_1.Log.Info("Push", 27, "KuroPush:检查安卓初次权限"), UE.AndroidPermissionFunctionLibrary.CheckPermission("android.permission.POST_NOTIFICATIONS"))) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Push", 27, "KuroPush:安卓没有推送权限，尝试获取");
      }
      (t = UE.NewArray(UE.BuiltinString)).Add("android.permission.POST_NOTIFICATIONS");
      if ((await this.HSr(t)).length > 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Push", 27, "KuroPush:安卓推送权限获取失败");
        }
        this.TurnOffPush();
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Push", 27, "KuroPush:安卓推送权限获取成功");
        }
        await this.TurnOnPush(false);
      }
    }
  }
  static async HSr(e) {
    return new Promise(t => {
      const n = UE.AndroidPermissionFunctionLibrary.AcquirePermissions(e);
      const u = (e, r) => {
        n.OnPermissionsGrantedDynamicDelegate.Remove(u);
        var o = new Array();
        var s = e.Num();
        for (let t = 0; t < s; t++) {
          var i = e.Get(t);
          if (!r.Get(t)) {
            o.push(i);
          }
        }
        t(o);
      };
      n.OnPermissionsGrantedDynamicDelegate.Add(u);
    });
  }
  static BindCurrentLanguageTag() {
    var t = LanguageSystem_1.LanguageSystem.PackageLanguage;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Push", 27, "current push Language Tag", ["Tag", t]);
    }
    UE.KuroPushSdkStaticLibrary.SetTag(t, SELFDEFINESN);
  }
  static nSe() {
    var t = this.GetPushState() ? 1 : 0;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "刷新推送状态", ["result", t]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMenuSetting, GameSettingsDefine_1.EFunction.PushMode);
  }
  static async rSe() {
    if (this.IfCanUsePush()) {
      if (await this.GetPushNotiPermissionEnableState()) {
        this.TurnOnPush(false);
      } else {
        this.TurnOffPush();
      }
    }
  }
  static oSe() {
    if (!this.sSe) {
      KuroPushController.PushFunctionDelegate = (0, puerts_1.toManualReleaseDelegate)(KuroPushController.aSe);
      UE.KuroPushSdkStaticLibrary.GetPushObject()?.PushSdkMessageBluePrintDelegate.Add(KuroPushController.aSe);
    }
    this.sSe = true;
  }
  static RemovePushDelegate() {
    if (KuroPushController.PushFunctionDelegate) {
      if (UE.KuroPushSdkStaticLibrary.GetPushObject()?.IsValid()) {
        UE.KuroPushSdkStaticLibrary.GetPushObject()?.PushSdkMessageBluePrintDelegate.Remove(KuroPushController.aSe);
      }
      (0, puerts_1.releaseManualReleaseDelegate)(KuroPushController.aSe);
      KuroPushController.PushFunctionDelegate = undefined;
      this.sSe = false;
    }
  }
  static SetPushNotifyCall(t) {
    this.lSe = t;
  }
  static SendLocalPush(t, e, r) {
    HotPatchPushSdk_1.HotPatchPushSdk.SendLocalPush(t, e, r);
  }
  static OpenNotification() {
    if (this.IfCanUsePush()) {
      UE.KuroPushSdkStaticLibrary.OpenNotification();
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Push", 27, " Not OpenNotification");
    }
  }
  static async GetPushNotiPermissionEnableState() {
    return !!this.IfCanUsePush() && new Promise(e => {
      const r = t => {
        UE.KuroPushSdkStaticLibrary.GetPushObject()?.AllowedNotificationsDelegate.Remove(r);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Push", 27, "当前推送权限状态", ["state", t]);
        }
        e(t);
      };
      UE.KuroPushSdkStaticLibrary.GetPushObject()?.AllowedNotificationsDelegate.Add(r);
      UE.KuroPushSdkStaticLibrary.AreNotificationEnable();
    });
  }
  static GetClientId() {
    if (this.IfCanUsePush()) {
      return UE.KuroPushSdkStaticLibrary.GetClientId();
    } else {
      return "";
    }
  }
  static async TurnOnPush(t = true) {
    HotPatchPushSdk_1.HotPatchPushSdk.TurnOnPush();
    this.nSe();
    if (t && !(await this.GetPushNotiPermissionEnableState())) {
      (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(171)).FunctionMap.set(1, () => {
        this.OpenNotification();
      });
      t.IsEscViewTriggerCallBack = false;
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    }
  }
  static TurnOffPush() {
    HotPatchPushSdk_1.HotPatchPushSdk.TurnOffPush();
    this.nSe();
  }
  static GetPushState() {
    var t = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(LauncherStorageLib_1.ELauncherStorageGlobalKey.CachePushOpenState, false);
    return t !== undefined && t;
  }
  static OnClear() {
    this.RemovePushDelegate();
    return true;
  }
}
exports.KuroPushController = KuroPushController;
(_a = KuroPushController).sSe = false;
KuroPushController.lSe = undefined;
KuroPushController.PushFunctionDelegate = undefined;
KuroPushController.aSe = (t, e) => {
  _a.lSe?.(t, e);
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Push", 27, "接收到push回调信息", ["functionName", t], ["result", e]);
  }
}; //# sourceMappingURL=KuroPushController.js.map