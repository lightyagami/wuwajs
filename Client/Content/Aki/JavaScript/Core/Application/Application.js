"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Application = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../Common/Log");
const CommonDefine_1 = require("../Define/CommonDefine");
class Application {
  static Initialize() {
    if (!Application.gU) {
      Application.gU = true;
      UE.KuroApplicationLibrary.AddApplicationLifetimeDelegate((0, puerts_1.toManualReleaseDelegate)(Application.R6));
      UE.KuroApplicationLibrary.AddEditorPreEndPIEDelegate((0, puerts_1.toManualReleaseDelegate)(Application.U6));
      UE.KuroApplicationLibrary.AddWindowActivationDelegate((0, puerts_1.toManualReleaseDelegate)(Application.krm));
    }
  }
  static Destroy() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Core", 41, "Application.Destroy OnEditorPreEndPIE");
    }
    if (Application.gU) {
      Application.A6.clear();
      Application.PLn.clear();
      Application.Zom.clear();
      (0, puerts_1.releaseManualReleaseDelegate)(Application.R6);
      (0, puerts_1.releaseManualReleaseDelegate)(Application.U6);
      (0, puerts_1.releaseManualReleaseDelegate)(Application.krm);
      UE.KuroApplicationLibrary.UnBind();
      Application.gU = false;
    }
  }
  static AddApplicationHandler(i, t) {
    if (!Application.A6.has(i)) {
      Application.A6.set(i, new Set());
    }
    Application.A6.get(i).add(t);
  }
  static RemoveApplicationHandler(i, t) {
    if (Application.A6.has(i)) {
      Application.A6.get(i).delete(t);
    }
  }
  static AddEditorPreEndPIEHandler(i) {
    Application.PLn.add(i);
  }
  static RemoveEditorPreEndPIEHandler(i) {
    Application.PLn.delete(i);
  }
  static AddWindowActivationHandler(i) {
    Application.Zom.add(i);
  }
  static RemoveWindowActivationHandler(i) {
    Application.Zom.delete(i);
  }
  static GetWindowActivationState() {
    return Application.qrm;
  }
  static IsPublicationApp() {
    return this.GmSimulatePublication || UE.KuroLauncherLibrary.GetAppInternalUseType() === CommonDefine_1.PUBLICATION_TYPE;
  }
}
(exports.Application = Application).A6 = new Map();
Application.PLn = new Set();
Application.Zom = new Set();
Application.gU = false;
Application.qrm = undefined;
Application.R6 = i => {
  var t = i;
  if (Application.A6.has(t) && (Application.A6.get(t).forEach(i => {
    i();
  }), Log_1.Log.CheckDebug())) {
    Log_1.Log.Debug("Core", 30, "ApplicationLifeTime: " + i);
  }
};
Application.U6 = i => {
  Application.PLn.forEach(i => {
    i();
  });
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Core", 41, "OnEditorPreEndPIE: " + i);
  }
};
Application.krm = t => {
  if (t !== Application.qrm && (Application.qrm = t, Application.Zom.forEach(i => {
    i(t);
  }), Log_1.Log.CheckDebug())) {
    Log_1.Log.Debug("Core", 41, "WindowActivation: " + t);
  }
};
Application.GmSimulatePublication = false; //# sourceMappingURL=Application.js.map