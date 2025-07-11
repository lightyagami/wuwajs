"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AntiCheatModel = undefined;
const UE = require("ue");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const AntiCheatData_1 = require("./AntiCheatData");
const BUNDLE_DATA_EVENT_ID = "8";
const HEARTBEAT_DATA_EVENT_ID = "9";
class AntiCheatModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Qre = "";
    this.qje = "";
    this.Gje = 0;
  }
  GetVersion() {
    return this.Qre;
  }
  GetBundleId() {
    return this.qje;
  }
  OnInit() {
    var e = UE.KuroLauncherLibrary.GetAppVersion();
    this.Qre = LocalStorage_1.LocalStorage.GetDeviceSaved(LocalStorageDefine_1.ELocalStorageDeviceKey.PatchVersion, e);
    this.qje = UE.KismetSystemLibrary.GetGameBundleId();
    return true;
  }
  static GetBundleData() {
    var e = new AntiCheatData_1.AntiCheatBundleData();
    e.event_id = BUNDLE_DATA_EVENT_ID;
    let t = ModelManager_1.ModelManager.LoginModel.GetAccount();
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      t = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid;
    }
    e.unique_id = t;
    e.s_bundle_id = ModelManager_1.ModelManager.AntiCheatModel.GetBundleId();
    e.s_version = ModelManager_1.ModelManager.AntiCheatModel.GetVersion();
    return e;
  }
  ResetHeartbeatException() {
    this.Gje = 0;
  }
  HitHeartbeatException() {
    this.Gje += 1;
  }
  GetHeartbeatException() {
    return this.Gje;
  }
  HasHeartbeatException() {
    return this.Gje > 0;
  }
  GetHeartbeatData() {
    var e = new AntiCheatData_1.AntiCheatHeartbeatData();
    e.event_id = HEARTBEAT_DATA_EVENT_ID;
    let t = ModelManager_1.ModelManager.LoginModel.GetAccount();
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      t = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid;
    }
    e.unique_id = t;
    e.i_exception_count = this.Gje;
    return e;
  }
}
exports.AntiCheatModel = AntiCheatModel;
//# sourceMappingURL=AntiCheatModel.js.map