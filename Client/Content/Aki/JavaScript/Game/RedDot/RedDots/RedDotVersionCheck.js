"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotVersionCheck = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const RedDotBase_1 = require("../RedDotBase");
class RedDotVersionCheck extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FunctionSetting";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.WorldDone, EventDefine_1.EEventName.VersionCheckRefresh];
  }
  OnCheck() {
    var e = UE.KuroLauncherLibrary.GetAppVersion();
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VersionRedDotMap) !== e && ControllerHolder_1.ControllerHolder.ParallelPackageController.CheckIfNeedParallelPackage();
  }
}
exports.RedDotVersionCheck = RedDotVersionCheck;
//# sourceMappingURL=RedDotVersionCheck.js.map