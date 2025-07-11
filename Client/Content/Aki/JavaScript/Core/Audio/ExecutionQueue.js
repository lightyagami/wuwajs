"use strict";

var _ExecutionQueue_Handle;
var _ExecutionQueue_Executing;
var _ExecutionQueue_Pending;
var _ExecutionQueue_TaskQueue;
var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (e, t, i, u) {
  if (i === "a" && !u) {
    throw new TypeError("Private accessor was defined without a getter");
  }
  if (typeof t == "function" ? e === t && u : t.has(e)) {
    if (i === "m") {
      return u;
    } else if (i === "a") {
      return u.call(e);
    } else if (u) {
      return u.value;
    } else {
      return t.get(e);
    }
  }
  throw new TypeError("Cannot read private member from an object whose class did not declare it");
};
var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (e, t, i, u, n) {
  if (u === "m") {
    throw new TypeError("Private method is not writable");
  }
  if (u === "a" && !n) {
    throw new TypeError("Private accessor was defined without a setter");
  }
  if (typeof t == "function" ? e === t && n : t.has(e)) {
    if (u === "a") {
      n.call(e, i);
    } else if (n) {
      n.value = i;
    } else {
      t.set(e, i);
    }
    return i;
  }
  throw new TypeError("Cannot write private member to an object whose class did not declare it");
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExecutionQueue = undefined;
const Log_1 = require("../Common/Log");
const EXECUTION_QUEUE_ENABLE = true;
class ExecutionQueue {
  constructor() {
    _ExecutionQueue_Handle.set(this, 0);
    _ExecutionQueue_Executing.set(this, false);
    _ExecutionQueue_Pending.set(this, new Set());
    _ExecutionQueue_TaskQueue.set(this, []);
  }
  Enqueue(e) {
    var t;
    var i;
    __classPrivateFieldSet(this, _ExecutionQueue_Handle, (i = __classPrivateFieldGet(this, _ExecutionQueue_Handle, "f"), t = i++, i), "f");
    const u = t;
    if (EXECUTION_QUEUE_ENABLE) {
      __classPrivateFieldGet(this, _ExecutionQueue_Pending, "f").add(u);
      __classPrivateFieldGet(this, _ExecutionQueue_TaskQueue, "f").push(async () => {
        if (__classPrivateFieldGet(this, _ExecutionQueue_Pending, "f").delete(u)) {
          await e(u);
        }
      });
      if (!__classPrivateFieldGet(this, _ExecutionQueue_Executing, "f")) {
        this.m8();
      }
    } else {
      e(u);
    }
    return u;
  }
  Cancel(e) {
    return !!EXECUTION_QUEUE_ENABLE && __classPrivateFieldGet(this, _ExecutionQueue_Pending, "f").delete(e);
  }
  async m8() {
    for (__classPrivateFieldSet(this, _ExecutionQueue_Executing, true, "f");;) {
      var e = __classPrivateFieldGet(this, _ExecutionQueue_TaskQueue, "f").shift();
      if (!e) {
        __classPrivateFieldSet(this, _ExecutionQueue_Executing, false, "f");
        return;
      }
      try {
        await e();
      } catch (e) {
        if (e instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Audio", 56, "[Core.ExecutionQueue] 任务执行异常", e);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 56, "[Core.ExecutionQueue] 任务执行异常");
        }
      }
    }
  }
}
exports.ExecutionQueue = ExecutionQueue;
_ExecutionQueue_Handle = new WeakMap();
_ExecutionQueue_Executing = new WeakMap();
_ExecutionQueue_Pending = new WeakMap();
_ExecutionQueue_TaskQueue = new WeakMap(); //# sourceMappingURL=ExecutionQueue.js.map