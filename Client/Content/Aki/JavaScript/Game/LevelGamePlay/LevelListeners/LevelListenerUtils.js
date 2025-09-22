"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelListenerUtils = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Deque_1 = require("../../../Core/Container/Deque");
const PriorityQueue_1 = require("../../../Core/Container/PriorityQueue");
const Queue_1 = require("../../../Core/Container/Queue");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
class LevelListenerUtils {
  static ClearListener(e, t) {
    for (const r in e) {
      if (t[r] === undefined) {
        e[r] = undefined;
      } else if (e[r] instanceof Object) {
        if (!this.HW(e[r])) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelListener", 39, "监听器存在未定义清理方式的Object", ["Listener", e.constructor.name], ["Property", r]);
          }
          return false;
        }
      } else {
        e[r] = t[r];
      }
    }
    return true;
  }
  static HW(e) {
    return !!(e instanceof Stats_1.Stat) || !!(e instanceof Function) || !(e instanceof Array ? e.length = 0 : e instanceof Vector_1.Vector || e instanceof Vector2D_1.Vector2D || e instanceof Rotator_1.Rotator || e instanceof Quat_1.Quat || e instanceof Transform_1.Transform ? (e.Reset(), 0) : e instanceof Map || e instanceof Set ? (e.clear(), 0) : e instanceof Queue_1.Queue || e instanceof PriorityQueue_1.PriorityQueue || e instanceof Deque_1.Deque ? (e.Clear(), 0) : !e.ClearObject || typeof e.ClearObject != "function" || !e.ClearObject());
  }
}
exports.LevelListenerUtils = LevelListenerUtils;
//# sourceMappingURL=LevelListenerUtils.js.map