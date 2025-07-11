"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameModePromise = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Net_1 = require("../../../Core/Net/Net");
const GlobalData_1 = require("../../GlobalData");
class GameModePromise {
  constructor() {
    this.g8 = undefined;
    this.d8 = undefined;
    this.Bvr = undefined;
    this.g8 = new Promise((e, o) => {
      this.d8 = e;
      this.Bvr = o;
    });
  }
  get Promise() {
    return this.g8;
  }
  SetResult(e) {
    var o;
    if (GlobalData_1.GlobalData.Networking() && !Net_1.Net.IsServerConnected()) {
      o = "账号已经登出";
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, o);
      }
      this.Bvr(new Error(o));
    } else {
      this.d8(e);
    }
  }
}
exports.GameModePromise = GameModePromise;
//# sourceMappingURL=GameModePromise.js.map