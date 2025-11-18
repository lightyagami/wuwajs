"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotSystem = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../../Core/Common/Log");
const List_1 = require("../../Core/Container/List");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const ModelManager_1 = require("../Manager/ModelManager");
class RedDotEventData {
  constructor(t, e, s) {
    this.Event = t;
    this.Id = e;
    this.RedDotName = s;
  }
  HandleEvent() {
    this.Event(this.Id);
  }
}
const TICK_TOTAL_TIME = 500;
class RedDotSystem {
  static PushToEventQueue(t, e, s) {
    var i = s + e;
    if (!this.whm.has(i)) {
      if (this.zah?.RedDotName === s && this.zah?.Id === e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RedDot", 69, "红点处理存在循环调用, 详情见堆栈", ["红点名", s]);
        }
      } else {
        t = this.GetRedDotEventData(t, e, s);
        e = this.xrl.AddTail(t);
        this.whm.set(i, e);
      }
    }
  }
  static PopRedDotEventData(t, e) {
    var s = e + t;
    if (this.whm.has(s)) {
      if (this.zah?.RedDotName === e && this.zah?.Id === t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RedDot", 10, "红点处理存在在当前事件中移除自身", ["红点名", e]);
        }
      } else if (t = this.whm.get(s)) {
        this.xrl.RemoveNode(t);
        this.whm.delete(s);
        this.Jah.push(t.Element);
      }
    }
  }
  static Prl() {
    var t = this.xrl.GetHeadNextNode();
    var e = t.Element;
    this.zah = e;
    this.xrl.RemoveNode(t);
    this.whm.delete(e.RedDotName + e.Id);
    e.HandleEvent();
    this.zah = undefined;
    this.Jah.push(e);
  }
  static Tick(t) {
    if (ModelManager_1.ModelManager.GameModeModel?.LoadingPhase === 1) {
      var e = this.xrl.Count;
      if (!(e <= 0)) {
        let t = e;
        while (this.wrl > 0 && t > 0) {
          var s = cpp_1.KuroTime.GetMicroseconds64();
          this.Prl();
          var s = cpp_1.KuroTime.GetMicroseconds64() - s;
          this.wrl -= s;
          t--;
        }
        cpp_1.FKuroPerfSightHelper.PostValueFloat1("RedDot", "RedDotCostPerFrame", (TICK_TOTAL_TIME - this.wrl) / 1000);
        this.wrl = TICK_TOTAL_TIME;
      }
    }
  }
  static GetRedDotEventData(t, e, s) {
    var i;
    if (this.Jah.length > 0) {
      (i = this.Jah.pop()).Event = t;
      i.Id = e;
      i.RedDotName = s;
      return i;
    } else {
      return new RedDotEventData(t, e, s);
    }
  }
}
(exports.RedDotSystem = RedDotSystem).xrl = new List_1.default(new RedDotEventData(t => {}, 0, ""));
RedDotSystem.Jah = [];
RedDotSystem.whm = new Map();
RedDotSystem.zah = undefined;
RedDotSystem.wrl = TICK_TOTAL_TIME;
RedDotSystem.IsOpenLogCallTime = false; //# sourceMappingURL=RedDotSystem.js.map