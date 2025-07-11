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
    }
  }
  static Destroy() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Core", 41, "Application.Destroy OnEditorPreEndPIE");
    }
    if (Application.gU) {
      Application.A6.clear();
      Application.PLn.clear();
      (0, puerts_1.releaseManualReleaseDelegate)(Application.R6);
      (0, puerts_1.releaseManualReleaseDelegate)(Application.U6);
      UE.KuroApplicationLibrary.UnBind();
      Application.gU = false;
    }
  }
  static AddApplicationHandler(i, p) {
    if (!Application.A6.has(i)) {
      Application.A6.set(i, new Set());
    }
    Application.A6.get(i).add(p);
  }
  static RemoveApplicationHandler(i, p) {
    if (Application.A6.has(i)) {
      Application.A6.get(i).delete(p);
    }
  }
  static AddEditorPreEndPIEHandler(i) {
    Application.PLn.add(i);
  }
  static RemoveEditorPreEndPIEHandler(i) {
    Application.PLn.delete(i);
  }
  static IsPublicationApp() {
    return this.GmSimulatePublication || UE.KuroLauncherLibrary.GetAppInternalUseType() === CommonDefine_1.PUBLICATION_TYPE;
  }
}
(exports.Application = Application).A6 = new Map();
Application.PLn = new Set();
Application.gU = false;
Application.R6 = i => {
  var p = i;
  if (Application.A6.has(p) && (Application.A6.get(p).forEach(i => {
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
Application.GmSimulatePublication = false; //# sourceMappingURL=Application.js.map