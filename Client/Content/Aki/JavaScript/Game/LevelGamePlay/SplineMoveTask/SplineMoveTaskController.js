"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplineMoveTaskController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class SplineMoveTaskController extends ControllerBase_1.ControllerBase {
  static OnTick(e) {
    for (var [, t] of this.Ti1) {
      for (const n of t) {
        n.TickTask(e);
      }
    }
  }
  static OnInit() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.ClearWorld, this.OnClearWorld)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.OnClearWorld);
    }
    return true;
  }
  static OnClear() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.ClearWorld, this.OnClearWorld)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.OnClearWorld);
    }
    return true;
  }
  static GetEntitySplineMoveTasks(e) {
    return this.Ti1.get(e);
  }
  static GetEntityCurSplineMoveTask(e) {
    return this.Ti1.get(e)?.[0];
  }
  static EndEntityTasks(e) {
    e = this.GetEntitySplineMoveTasks(e);
    if (e && e.length !== 0) {
      for (const t of Array.from(e)) {
        t.EndTask(false);
      }
    }
  }
  static RegisterTask(e) {
    if (!e.EntityHandle.Valid) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 39, "[SplineMoveTaskController] Task所属实体非valid，不允许注册", ["EntityId", e.EntityHandle.Id]);
      }
      return false;
    }
    let t = this.Ti1.get(e.EntityHandle.Id);
    if (t) {
      if (t.includes(e)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelPlay", 39, "[SplineMoveTaskController] Task已注册过，可能存在错误导致重复注册", ["EntityId", e.EntityHandle.Id]);
        }
        return true;
      }
    } else {
      t = [];
      this.Ti1.set(e.EntityHandle.Id, t);
    }
    t.push(e);
    if (e.EntityHandle && !EventSystem_1.EventSystem.HasWithTarget(e.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity)) {
      EventSystem_1.EventSystem.AddWithTarget(e.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
    }
    return true;
  }
  static UnregisterTask(e) {
    var t = this.Ti1.get(e.EntityHandle.Id);
    var n = t?.indexOf(e);
    if (n !== undefined && n !== -1) {
      t?.splice(n);
    }
    if (e.EntityHandle && EventSystem_1.EventSystem.HasWithTarget(e.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
    }
    return true;
  }
}
exports.SplineMoveTaskController = SplineMoveTaskController;
(_a = SplineMoveTaskController).Ti1 = new Map();
SplineMoveTaskController.OnRemoveEntity = (e, t) => {
  if (Log_1.Log.CheckWarn()) {
    Log_1.Log.Warn("LevelPlay", 39, "[SplineMoveTaskController] 检测到移动实体被销毁，直接结束Task", ["EntityId", t.Id]);
  }
  t = _a.GetEntitySplineMoveTasks(t.Id);
  if (t && t.length !== 0) {
    for (const n of Array.from(t)) {
      n.EndTask(false);
    }
  }
};
SplineMoveTaskController.OnClearWorld = () => {
  if (Log_1.Log.CheckWarn()) {
    Log_1.Log.Warn("LevelPlay", 39, "[SplineMoveTaskController]检测到世界清理，结束所有Task");
  }
  var e;
  var t = [];
  for ([, e] of _a.Ti1) {
    if (e && e.length !== 0) {
      t.push(...e);
    }
  }
  for (const n of t) {
    n.EndTask(false);
  }
}; //# sourceMappingURL=SplineMoveTaskController.js.map