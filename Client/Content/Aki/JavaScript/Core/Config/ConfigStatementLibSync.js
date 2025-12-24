"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigStatementLibSync = undefined;
const UE = require("ue");
class ConfigStatementLibSync {
  static CreateStatement(t, e) {
    if (ConfigStatementLibSync.EEm) {
      return UE.KuroPrepareStatementLib.GetOrCreateStatement(t, e);
    } else {
      return UE.KuroPrepareStatementLib.CreateStatement(t, e);
    }
  }
  static CloseAllConnection() {
    UE.KuroPrepareStatementLib.CloseAllConnection();
  }
}
(exports.ConfigStatementLibSync = ConfigStatementLibSync).EEm = true;
//# sourceMappingURL=ConfigStatementLibSync.js.map