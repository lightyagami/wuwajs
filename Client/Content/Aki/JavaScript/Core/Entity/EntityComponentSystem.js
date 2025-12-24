"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityComponentSystem = undefined;
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const Deque_1 = require("../Container/Deque");
const PriorityQueue_1 = require("../Container/PriorityQueue");
const Queue_1 = require("../Container/Queue");
const Stack_1 = require("../Container/Stack");
const Quat_1 = require("../Utils/Math/Quat");
const Rotator_1 = require("../Utils/Math/Rotator");
const Transform_1 = require("../Utils/Math/Transform");
const Vector_1 = require("../Utils/Math/Vector");
const Vector2D_1 = require("../Utils/Math/Vector2D");
class EntityComponentSystem {
  constructor() {}
  static Initialize() {
    return true;
  }
  static Create(t, e, n) {
    if (e.UsePool && !EntityComponentSystem.ComponentTemplates.has(t.name)) {
      o = new t();
      EntityComponentSystem.ComponentTemplates.set(t.name, o);
    }
    var o = new t();
    if (o.Create(e, n)) {
      return o;
    }
  }
  static Destroy(t, e) {
    var n = e.Clear();
    return !!n && (t.UsePool && (EntityComponentSystem.PerformanceStateClearComponent.Start(), n = EntityComponentSystem.ClearComponent(e), EntityComponentSystem.PerformanceStateClearComponent.Stop()), n);
  }
  static ClearComponent(t) {
    var e = EntityComponentSystem.ComponentTemplates.get(t.constructor.name);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 29, "清理不存在的组件类型", ["Component", t.constructor.name]);
      }
      return false;
    }
    for (const n in t) {
      if (n !== "UnResetPropertySet" && !t.UnResetPropertySet?.has(n)) {
        if (e[n] === undefined) {
          t[n] = undefined;
        } else if (t[n] instanceof Object) {
          if (!EntityComponentSystem.HW(t[n])) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 29, "组件存在未定义清理方式的Object", ["Component", t.constructor.name], ["Object", n]);
            }
            return false;
          }
        } else {
          t[n] = e[n];
        }
      }
    }
    return true;
  }
  static HW(t) {
    return t instanceof Stats_1.Stat || t instanceof Function || (t instanceof Array ? !(t.length = 0) : t instanceof Vector_1.Vector || t instanceof Vector2D_1.Vector2D || t instanceof Rotator_1.Rotator || t instanceof Quat_1.Quat || t instanceof Transform_1.Transform ? (t.Reset(), true) : t instanceof Map || t instanceof Set ? (t.clear(), true) : t instanceof Queue_1.Queue || t instanceof PriorityQueue_1.PriorityQueue || t instanceof Deque_1.Deque || t instanceof Stack_1.Stack ? (t.Clear(), true) : t instanceof WeakMap || !!t.ClearObject && !!t.ClearObject());
  }
}
(exports.EntityComponentSystem = EntityComponentSystem).ComponentTemplates = new Map();
EntityComponentSystem.PerformanceStateClearComponent = Stats_1.Stat.Create("PerformanceStateClearComponent"); //# sourceMappingURL=EntityComponentSystem.js.map