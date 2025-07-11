"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskSystem = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
class TaskSystem {
  static get Promise() {
    return this.KEr?.Promise;
  }
  static Initialize() {
    return this.Ife = true;
  }
  static async Run(s) {
    return !!this.Ife && (this.Running ? this.KEr.Promise : (this.QEr = s, this.Running = true, this.KEr = new CustomPromise_1.CustomPromise(), this.XEr()));
  }
  static AddTask(s) {
    if (this.Ife && s.Init()) {
      this.$Er.Push(s);
    }
  }
  static Clear() {
    this.Ife = false;
    this.AW();
  }
  static AW() {
    this.$Er.Clear();
    this.QEr = undefined;
    this.HasLoadingTask = false;
    this.Running = false;
  }
  static async XEr() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 3, "TaskSystem:开始", ["Task个数", this.$Er.Size]);
    }
    let s = true;
    let t = -1;
    while (this.$Er.Size) {
      var e = this.$Er.Pop();
      t++;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 3, "TaskSystem:执行Task前", ["Index", t], ["Name", e.Name], ["剩余Task个数", this.$Er.Size]);
      }
      var i = await e.Run();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 3, "TaskSystem:执行Task后", ["Index", t], ["Name", e.Name], ["Result", i], ["剩余Task个数", this.$Er.Size]);
      }
      if (!this.Ife) {
        break;
      }
      if (!i) {
        s = false;
        break;
      }
    }
    if (!this.Ife) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 3, "TaskSystem:结束", ["InitState", this.Ife], ["Success", s]);
      }
      return false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 3, "TaskSystem:结束", ["Success", s]);
    }
    this.Running = false;
    this.KEr.SetResult(s);
    var a = this.QEr;
    this.AW();
    a?.(s);
    return s;
  }
}
(exports.TaskSystem = TaskSystem).$Er = new Queue_1.Queue();
TaskSystem.HasLoadingTask = false;
TaskSystem.Running = false;
TaskSystem.Ife = false; //# sourceMappingURL=TaskSystem.js.map