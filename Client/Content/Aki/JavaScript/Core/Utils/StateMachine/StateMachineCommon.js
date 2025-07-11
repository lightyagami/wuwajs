"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateMachineCommon = undefined;
const Log_1 = require("../../Common/Log");
class StateMachineCommon {
  constructor(t, i, s = undefined) {
    this.Parent = s;
    this.FirstState = undefined;
    this.kh = new Map();
    this.Gz = false;
    this.Nz = false;
    this.CurrentNode = undefined;
    this.Owner = t;
    this.State = i;
  }
  get HasSubNode() {
    return this.Gz;
  }
  get Activated() {
    return this.Nz;
  }
  get CurrentLeafNode() {
    if (this.CurrentNode) {
      return this.CurrentNode.CurrentLeafNode;
    } else {
      return this;
    }
  }
  get Root() {
    if (this.Parent) {
      return this.Parent.Root;
    } else {
      return this;
    }
  }
  Tick(t) {
    if (this.CurrentNode) {
      this.CurrentNode.Tick(t);
    }
    this.OnTick(t);
  }
  Start(...t) {
    if (this.Parent) {
      this.Parent.Start();
      this.Parent.CurrentNode = this;
    }
    this.Enter(undefined, true, false, ...t);
  }
  Enter(t, i = true, s = true, ...h) {
    this.Nz = true;
    this.OnActivate(t, ...h);
    if (i) {
      this.OnEnter(t, ...h);
    }
    if (s && this.Gz && this.FirstState) {
      this.CurrentNode = this.GetState(this.FirstState);
      if (this.CurrentNode) {
        this.CurrentNode.Enter(undefined, i, true, ...h);
        if (this.OnSwitchState) {
          this.OnSwitchState(undefined, this.CurrentNode);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("StateMachine", 14, "状态机切换失败，子节点查找失败");
      }
    }
  }
  Oz() {
    this.OnReEnter();
  }
  Exit(t = undefined, i = true, s = true, ...h) {
    if (s && this.CurrentNode) {
      if (this.OnSwitchState) {
        this.OnSwitchState(this.CurrentNode, undefined);
      }
      this.CurrentNode.Exit(t, i, s, ...h);
    }
    this.OnDeactivate(t, ...h);
    this.OnExit(t, ...h);
    this.Nz = false;
    this.CurrentNode = undefined;
  }
  Clear() {
    for (const t of this.kh.values()) {
      t.Clear();
    }
    this.OnClear();
    this.kh.clear();
    this.Parent = undefined;
    this.FirstState = undefined;
  }
  CanReEnter() {
    return false;
  }
  OnTick(t) {}
  OnEnter(t) {}
  OnReEnter() {}
  OnExit(t) {}
  OnClear() {}
  OnActivate(t) {}
  OnDeactivate(t) {}
  OnSwitchState(t, i) {}
  GetState(t) {
    var i = this.kh.get(t);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("StateMachine", 11, "状态不存在", ["state", t]);
      }
    }
    return i;
  }
  AddState(t, i) {
    this.FirstState ||= t;
    i = new i(this.Owner, t, this);
    if (this.kh.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("StateMachine", 14, "状态重复添加", ["state", t]);
      }
    } else {
      this.kh.set(t, i);
    }
    this.Gz = true;
  }
  AddStateInstance(t, i) {
    this.FirstState ||= t;
    if (this.kh.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("StateMachine", 14, "状态重复添加", ["state", t]);
      }
    } else {
      this.kh.set(t, i);
    }
    this.Gz = true;
  }
  Switch(t, i = true, s = true, ...h) {
    var e;
    var o;
    if (this.CurrentNode === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("StateMachine", 14, "状态机没有启动", ["state", t]);
      }
      return false;
    } else if (e = this.GetState(t)) {
      if (t === this.CurrentNode.State) {
        return !!this.CurrentNode.CanReEnter() && (this.CurrentNode.Oz(), true);
      } else {
        (o = this.CurrentNode).Exit(e, i, s, ...h);
        (this.CurrentNode = e).Enter(o, i, s, ...h);
        if (this.OnSwitchState) {
          this.OnSwitchState(o, e);
        }
        return true;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("StateMachine", 14, "状态机切换失败，目标节点不存在", ["state", t]);
      }
      return false;
    }
  }
}
exports.StateMachineCommon = StateMachineCommon;
//# sourceMappingURL=StateMachineCommon.js.map