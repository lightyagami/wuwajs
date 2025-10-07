"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectDbObject = undefined;
const UE = require("ue");
const Log_1 = require("../Common/Log");
const ConfigStatementLibSync_1 = require("./ConfigStatementLibSync");
class ConnectDbObject {
  constructor() {
    this.YPo = 0;
  }
  static fNd() {
    ConnectDbObject.N9 ||= "" + UE.BlueprintPathsLibrary.ProjectContentDir();
    return ConnectDbObject.N9;
  }
  get HandleId() {
    return this.YPo;
  }
  gNd(t, e) {
    var n = ConfigStatementLibSync_1.ConfigStatementLibSync.CreateStatement(t, e);
    switch (n) {
      case -1:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonDbConnect", 10, "找不到Db连接", ["path", t]);
        }
        break;
      case -2:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonDbConnect", 10, "创建语句失败", ["path", t], ["command", e]);
        }
    }
    return n;
  }
  DisConnectStatement() {
    if (this.YPo > 0) {
      if (!ConfigStatementLibSync_1.ConfigStatementLibSync.IsHandleHoldingByCs(this.YPo)) {
        UE.KuroPrepareStatementLib.CloseConnection(this.YPo);
      }
      this.YPo = 0;
    }
  }
  ConnectStatement(t) {
    var e;
    if (t.Culture !== "") {
      e = `${ConnectDbObject.fNd()}Aki/ConfigDB/${t.Culture}/${t.DbName}`;
      this.YPo = this.gNd(e, t.Command);
    } else {
      e = ConnectDbObject.fNd() + "Aki/ConfigDB/" + t.DbName;
      this.YPo = this.gNd(e, t.Command);
    }
  }
}
(exports.ConnectDbObject = ConnectDbObject).N9 = undefined;
//# sourceMappingURL=ConnectDbObject.js.map