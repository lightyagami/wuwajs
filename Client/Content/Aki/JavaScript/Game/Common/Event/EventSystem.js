"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventSystem = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Event_1 = require("../../../Core/Event/Event");
const EventDefine_1 = require("./EventDefine");
class EventSystem {
  static Has(t, e) {
    return EventSystem.Me.Has(t, e);
  }
  static RemoveTargetEvents(t) {
    if (EventSystem._de.get(t)) {
      EventSystem._de.delete(t);
    }
  }
  static HasWithTarget(t, e, n) {
    t = EventSystem.hde(t);
    return !!t && t.Has(e, n);
  }
  static Add(t, e) {
    return EventSystem.Me.Add(t, e);
  }
  static AddWithTargetUseHoldKey(t, e, n, r) {
    var s = EventSystem.lde(e);
    if (!s.Add(n, r)) {
      return false;
    }
    let v = EventSystem.Cnh.get(t);
    if (!v) {
      v = new Array();
      EventSystem.Cnh.set(t, v);
    }
    s.AddHoldKeyHandle(n, t, r);
    v.push({
      Key: t,
      Handle: r,
      Target: e,
      EventName: n
    });
    return true;
  }
  static AddWithTarget(t, e, n) {
    return EventSystem.lde(t).Add(e, n);
  }
  static Once(t, e) {
    return EventSystem.Me.Once(t, e);
  }
  static OnceWithTarget(t, e, n) {
    return EventSystem.lde(t).Once(e, n);
  }
  static Remove(t, e) {
    return EventSystem.Me.Remove(t, e);
  }
  static RemoveWithTarget(t, e, n) {
    var r = EventSystem.hde(t);
    if (r) {
      if (Info_1.Info.IsBuildDevelopmentOrDebug) {
        var s = r.GetHoldKeyByHandle(e, n);
        if (s) {
          EventSystem.gnh(s, t, e, n);
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 66, "事件系统调用错误,请使用[RemoveWithTargetUseKey]", ["target", t]);
          }
          return true;
        }
      }
      return r.Remove(e, n);
    }
    return false;
  }
  static gnh(e, n, r, s) {
    EventSystem.fnh.Start();
    var v = EventSystem.Cnh.get(e);
    if (v) {
      var a = v.length;
      for (let t = 0; t < a; ++t) {
        var i = v[t];
        if (i.Handle === s && i.EventName === r && i.Target === n) {
          v.splice(t, 1);
          if (i = EventSystem.hde(n)) {
            i.Remove(r, s);
            i.RemoveHoldKeyHandle(r, s);
          }
          if (v.length === 0) {
            EventSystem.Cnh.delete(e);
          }
          EventSystem.fnh.Stop();
          return true;
        }
      }
    }
    EventSystem.fnh.Stop();
    return false;
  }
  static RemoveWithTargetUseKey(t, e, n, r) {
    return EventSystem.gnh(t, e, n, r);
  }
  static RemoveAllTargetUseKey(t) {
    var e = EventSystem.Cnh.get(t);
    if (!e) {
      return false;
    }
    var n = e.length;
    for (let t = 0; t < n; ++t) {
      var r = e[t];
      var s = EventSystem.hde(r.Target);
      if (s) {
        s.Remove(r.EventName, r.Handle);
        s.RemoveHoldKeyHandle(r.EventName, r.Handle);
      }
    }
    EventSystem.Cnh.delete(t);
    return true;
  }
  static Emit(t, ...e) {
    return EventSystem.Me.Emit(t, ...e);
  }
  static EmitWithTarget(t, e, ...n) {
    return EventSystem.hde(t)?.Emit(e, ...n) ?? false;
  }
  static EmitWithTargets(t, e, ...n) {
    if (t && !(t.length <= 0)) {
      for (const r of t) {
        EventSystem.hde(r)?.Emit(e, ...n);
      }
    }
  }
  static hde(t) {
    if (t) {
      return EventSystem._de.get(t);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 1, "事件系统目标不存在，请检查目标", ["target", t]);
    }
  }
  static lde(t) {
    let e = EventSystem.hde(t);
    if (!e) {
      e = new Event_1.Event(EventDefine_1.EEventName, 0);
      EventSystem._de.set(t, e);
    }
    return e;
  }
  static AddWithCondition(t, e, n) {
    if (n) {
      return EventSystem.Me.AddWithCondition(t, e, n);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 18, "添加条件监听事件时，条件参数为空", ["name", t]);
      }
      return false;
    }
  }
  static OnceWithCondition(t, e, n) {
    if (n) {
      return EventSystem.Me.OnceWithCondition(t, e, n);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 18, "添加一次性条件监听事件时，条件参数为空", ["name", t]);
      }
      return false;
    }
  }
  static RemoveWithCondition(t, e, n) {
    if (n) {
      return EventSystem.Me.RemoveWithCondition(t, e, n);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 18, "移除条件监听事件时，条件参数为空", ["name", t]);
      }
      return false;
    }
  }
  static HasWithCondition(t, e, n) {
    if (n) {
      return EventSystem.Me.HasWithCondition(t, e, n);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 18, "检查条件监听事件时，条件参数为空", ["name", t]);
      }
      return false;
    }
  }
}
(exports.EventSystem = EventSystem).Me = new Event_1.Event(EventDefine_1.EEventName);
EventSystem._de = new WeakMap();
EventSystem.Cnh = new WeakMap();
EventSystem.fnh = Stats_1.Stat.Create("EventSystem.RemoveWithTargetUseKey"); //# sourceMappingURL=EventSystem.js.map