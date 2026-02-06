"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomPriorityManager = undefined;
const Log_1 = require("../../../Core/Common/Log");
const PriorityQueue_1 = require("../../../Core/Container/PriorityQueue");
const ModelManager_1 = require("../../Manager/ModelManager");
const DEBUG_KEY = "CustomPriorityManager";
class CustomPriorityManager {
  constructor(t) {
    this.L7g = t;
    this.m7 = new Map();
    this.c6g = new PriorityQueue_1.PriorityQueue((t, r) => {
      var e = this.m7.get(t);
      var i = this.m7.get(r);
      if (e && i) {
        return e.Priority - i.Priority;
      } else {
        this.jIo(`[Compare] config not registered for ${t} or ${r}`);
        return 0;
      }
    });
  }
  jIo(t, r = 0) {
    if (!(ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(DEBUG_KEY) < r)) {
      (r === 0 ? Log_1.Log.Error : r === 1 ? Log_1.Log.Warn : Log_1.Log.Info).bind(Log_1.Log)("Container", 72, `[PriorityManager] [${this.L7g}] ${t}`, ["Registry", [...this.m7.keys()]], ["Top", this.c6g.Empty ? undefined : this.c6g.Top]);
    }
  }
  Register(i, s) {
    var t;
    if (this.m7.has(i)) {
      this.jIo(`[Register] enumValue [${i}] already registered`);
      return false;
    } else if ((t = s.Priority ?? (typeof i == "number" ? i : undefined)) === undefined) {
      this.jIo(`[Register] String enum [${i}] must provide explicit Priority`);
      return false;
    } else {
      this.m7.set(i, {
        Enable: s.Enable,
        Enum: i,
        Priority: t,
        EnterWrapper: (t, r, e) => {
          this.jIo(`[Enter] [Reentrant: ${t}] [Force: ${r}] [Reason: ${e}] [Enum: ${i}]`, 2);
          return s.EnterCallback?.({
            IsReentrant: t,
            IsForce: r
          }) ?? false;
        },
        EnterReentrant: s.EnterReentrant,
        ForceEnterCallback: s.ForceEnterCallback,
        ExitWrapper: (t, r) => {
          this.jIo(`[Exit] [Force: ${t}] [Reason: ${r}] [Enum: ${i}]`, 2);
          return s.ExitCallback?.({
            IsForce: t
          }) ?? false;
        },
        ForceExitCallback: s.ForceExitCallback
      });
      if (s.Enable) {
        this.TryEnter(i, "Register");
      }
      return true;
    }
  }
  UnRegister(t) {
    this.TryExit(t, "UnRegister");
    this.m7.delete(t);
  }
  ClearObject() {
    this.TryExitAll("ClearObject");
    this.m7.clear();
    return true;
  }
  TryEnter(t, r = "") {
    this.jIo(`[TryEnter] [${r}] [${t}]`, 2);
    var e = this.m7.get(t);
    if (!e) {
      this.jIo(`[TryEnter] [${r}] [${t}] not registered`);
      return false;
    }
    e.Enable = true;
    var i = this.c6g.Empty ? undefined : this.c6g.Top;
    if (i === t) {
      if (e.EnterReentrant) {
        e.EnterWrapper(true, false, r + " [same as top]");
      } else if (e.ForceEnterCallback) {
        e.EnterWrapper(false, true, r + " [same as top]");
      }
      return false;
    } else if (this.c6g.Has(t)) {
      if (e.ForceEnterCallback) {
        e.EnterWrapper(false, true, r + " [lower priority than top]");
      }
      return false;
    } else {
      this.c6g.Push(t);
      if (i === this.c6g.Top) {
        this.jIo(`[TryEnter] [${r}] [${t}] [with lower priority than current ${i}]`, 1);
        if (e.ForceEnterCallback) {
          e.EnterWrapper(false, true, r + " [lower priority than top]");
        }
        return false;
      } else {
        if (i !== undefined) {
          this.m7.get(i)?.ExitWrapper(false, r);
        }
        e.EnterWrapper(false, false, r);
        return true;
      }
    }
  }
  TryExit(t, r = "") {
    this.jIo(`[TryExit] [${r}] [${t}]`, 2);
    var e;
    var i = this.m7.get(t);
    if (i) {
      i.Enable = false;
      if (this.c6g.Has(t)) {
        e = this.c6g.Empty ? undefined : this.c6g.Top;
        this.c6g.Remove(t);
        if (t === e && (i?.ExitWrapper(false, r), (e = this.c6g.Empty ? undefined : this.c6g.Top) !== undefined)) {
          this.m7.get(e)?.EnterWrapper(false, false, r);
        }
        return true;
      } else {
        if (i.ForceExitCallback) {
          i.ExitWrapper(false, r + " [not in priority queue]");
        }
        return false;
      }
    } else {
      this.jIo(`[Exit] [${r}] [${t}] not registered`);
      return false;
    }
  }
  TryExitAll(t = "") {
    while (!this.c6g.Empty) {
      var r = this.c6g.Top;
      if (r === undefined) {
        break;
      }
      this.TryExit(r, "TryExitAll: " + t);
    }
  }
}
exports.CustomPriorityManager = CustomPriorityManager;
//# sourceMappingURL=CustomPriorityManager.js.map