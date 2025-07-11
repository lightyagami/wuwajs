"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionMode = exports.EcologyMode = exports.PlotMode = exports.PerformModeBase = undefined;
const Deque_1 = require("../../../../../../Core/Container/Deque");
class PerformModeBase {
  constructor(e, t, s) {
    this.Mode = e;
    this.PerformComp = t;
    this.Machine = s;
    this.CachePerformAction = new Deque_1.Deque();
  }
  PushAction(e, t) {
    if (t) {
      this.CachePerformAction.AddFront(e);
    } else {
      this.CachePerformAction.AddRear(e);
    }
  }
  PopAction() {
    if (!this.CachePerformAction.Empty) {
      return this.CachePerformAction.RemoveFront();
    }
  }
  CheckEnter() {
    return false;
  }
  CheckExit() {
    return false;
  }
  Clear() {
    this.CachePerformAction.Clear();
  }
}
class PlotMode extends (exports.PerformModeBase = PerformModeBase) {
  CheckEnter() {
    return this.PerformComp.IsInPlot;
  }
  CheckExit() {
    return !this.PerformComp.IsInPlot && this.CachePerformAction.Empty;
  }
}
exports.PlotMode = PlotMode;
class EcologyMode extends PerformModeBase {
  CheckEnter() {
    return !this.CachePerformAction.Empty;
  }
  CheckExit() {
    return this.Machine.Modes.get(1).CheckEnter() || this.Machine.Modes.get(2).CheckEnter() || this.CachePerformAction.Empty;
  }
}
exports.EcologyMode = EcologyMode;
class ActionMode extends PerformModeBase {
  CheckEnter() {
    return !this.CachePerformAction.Empty;
  }
  CheckExit() {
    return this.Machine.Modes.get(1).CheckEnter() || !this.Machine.CurrentAction;
  }
}
exports.ActionMode = ActionMode;
//# sourceMappingURL=PerformMode.js.map