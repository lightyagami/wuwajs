"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkDetectionModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const LauncherNetworkDetectionDefine_1 = require("../../../Launcher/NetworkDetection/LauncherNetworkDetectionDefine");
class NetworkDetectionModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CurrentSelectServerData = undefined;
    this.CurrentUiSelectSeverData = undefined;
    this.xic = 0;
  }
  NeedInterruptDetectionDoubleCheckTips() {
    return Date.now() * LauncherNetworkDetectionDefine_1.MS_TO_SECONDS - this.xic >= LauncherNetworkDetectionDefine_1.DOUBLE_CHECK_INTERVAL;
  }
  ConfirmInterruptDetection() {
    var e = Date.now() * LauncherNetworkDetectionDefine_1.MS_TO_SECONDS;
    this.xic = e;
  }
  ResetInterruptDetectionCheckTime() {
    this.xic = 0;
  }
  GetFinalErrorCodeString(e) {
    var t = [];
    for (const r of e) {
      if (r.ErrorCodeText !== undefined && r.ErrorCodeText !== "") {
        t.push(r.ErrorCodeText);
      }
    }
    return t.join("\n");
  }
}
exports.NetworkDetectionModel = NetworkDetectionModel;
//# sourceMappingURL=NetworkDetectionModel.js.map