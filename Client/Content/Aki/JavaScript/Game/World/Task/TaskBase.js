"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskBase = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
class TaskBase {
  constructor(t, s, e) {
    this.Name = t;
    this.LogPrefix = "";
    this.InitHandle = s;
    this.FinishedCallback = e;
    this.WEr = new CustomPromise_1.CustomPromise();
  }
  SetLogPrefix(t) {
    this.LogPrefix = t;
  }
  Init() {
    if (this.InitHandle && !this.InitHandle()) {
      return false;
    }
    return this.OnInit();
  }
  get Promise() {
    return this.WEr.Promise;
  }
  async Run() {
    var t = await this.OnRun();
    this.OnExit();
    this.WEr.SetResult(t);
    return t;
  }
  OnInit() {
    return true;
  }
  OnExit() {}
}
exports.TaskBase = TaskBase;
//# sourceMappingURL=TaskBase.js.map