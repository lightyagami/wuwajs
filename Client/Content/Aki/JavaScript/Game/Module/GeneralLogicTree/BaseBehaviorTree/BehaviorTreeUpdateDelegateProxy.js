"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorTreeUpdateDelegateProxy = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
class BehaviorTreeUpdateDelegateProxy {
  constructor() {
    this.u9u = new Map();
    this.Mkd = new Map();
  }
  Init() {
    this.Clear();
  }
  Clear() {
    this.Mkd.clear();
    this.u9u.clear();
  }
  SetBehaviorTreeVarRelation(e) {
    this.u9u.clear();
    var r;
    var a;
    var t = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
    for ([r, a] of e.entries()) {
      this.u9u.set(r, a);
      var o = this.Mkd.get(r);
      if (o && t && t.Tree) {
        for (const i of o) {
          t.Tree.AddTreeVarUpdateDelegate(a, i);
          i(undefined, t.Tree.GetTreeVarByKey(a));
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BehaviorTree", 37, "[BehaviorTree] 正式绑定变量名称更新回调成功", ["VarType", r], ["VarName", a]);
        }
        this.Mkd.delete(r);
      }
    }
  }
  GetBehaviorTreeVar(e) {
    e = this.u9u.get(e);
    if (e) {
      var r = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
      if (r) {
        return r.Tree?.GetTreeVarByKey(e);
      }
    }
  }
  GetBehaviorTreeVarToNumber(e) {
    e = this.GetBehaviorTreeVar(e);
    return MathUtils_1.MathUtils.LongToNumber(e?.oTs ?? 0);
  }
  AddTreeVarUpdateDelegate(e, r) {
    var a;
    var t = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
    if (t && t.Tree) {
      if (a = this.u9u.get(e)) {
        t.Tree.AddTreeVarUpdateDelegate(a, r);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BehaviorTree", 37, "[BehaviorTree] 绑定变量名称更新回调成功", ["VarType", e], ["VarName", a]);
        }
      } else {
        this.xFd(e, r);
      }
    }
  }
  RemoveTreeVarUpdateDelegate(e, r) {
    var a;
    var t = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
    if (t && t.Tree) {
      if (a = this.u9u.get(e)) {
        t.Tree.RemoveTreeVarUpdateDelegate(a, r);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BehaviorTree", 37, "[BehaviorTree] 移除变量名称更新回调成功", ["VarType", e], ["VarName", a]);
        }
      } else {
        this.Ikd(e, r);
      }
    }
  }
  xFd(e, r) {
    let a = this.Mkd.get(e);
    if (!a) {
      a = new Set();
      this.Mkd.set(e, a);
    }
    a.add(r);
  }
  Ikd(e, r) {
    e = this.Mkd.get(e);
    if (e) {
      e.delete(r);
    }
  }
}
exports.BehaviorTreeUpdateDelegateProxy = BehaviorTreeUpdateDelegateProxy;
//# sourceMappingURL=BehaviorTreeUpdateDelegateProxy.js.map