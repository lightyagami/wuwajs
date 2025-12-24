"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuVersionCheckData = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MenuData_1 = require("../MenuData");
class MenuVersionCheckData extends MenuData_1.MenuData {
  constructor(e) {
    super(e);
  }
  get FunctionName() {
    return "CurrentVersion";
  }
  get ButtonTextId() {
    if (ControllerHolder_1.ControllerHolder.ParallelPackageController.CheckParallelPackage()) {
      return "NewVersionTip02";
    } else {
      return "NewVersionTip01";
    }
  }
  get CustomTitleArgs() {
    return [UE.KuroLauncherLibrary.GetAppVersion()];
  }
  get EnableRedDot() {
    return ControllerHolder_1.ControllerHolder.ParallelPackageController.CheckParallelPackage();
  }
  OnRefresh() {
    this.JKd();
  }
  JKd() {
    if (ModelManager_1.ModelManager.RedDotModel?.GetRedDot("RedDotVersionCheck")?.IsRedDotActive()) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VersionRedDotMap, UE.KuroLauncherLibrary.GetAppVersion());
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VersionCheckRefresh);
    }
  }
  GetButtonEnable() {
    return ControllerHolder_1.ControllerHolder.ParallelPackageController.CheckParallelPackage();
  }
}
exports.MenuVersionCheckData = MenuVersionCheckData;
//# sourceMappingURL=MenuVersionCheckData.js.map