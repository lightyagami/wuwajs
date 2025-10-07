"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigStatementLibSync = undefined;
const UE = require("ue");
class ConfigStatementLibSync {
  static CreateStatement(t, e) {
    if (ConfigStatementLibSync.AXd) {
      return UE.KuroPrepareStatementLib.GetOrCreateStatement(t, e);
    } else {
      return UE.KuroPrepareStatementLib.CreateStatement(t, e);
    }
  }
  static CloseAllConnection() {
    UE.KuroPrepareStatementLib.CloseAllConnection();
  }
  static IsHandleHoldingByCs(t) {
    return ConfigStatementLibSync.DbHandleSync?.IsHolding(t) ?? false;
  }
}
(exports.ConfigStatementLibSync = ConfigStatementLibSync).AXd = true;
ConfigStatementLibSync.DbHandleSync = undefined; //# sourceMappingURL=ConfigStatementLibSync.js.map