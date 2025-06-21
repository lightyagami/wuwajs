"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PerformMachine = void 0;
const Log_1 = require("../../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  PerformActionCenter_1 = require("./Action/PerformActionCenter"),
  PerformMode_1 = require("./PerformMode");
class PerformMachine {
  constructor(t) {
    this.ph_ = t, this.NUe = 0, this.Modes = new Map, this.bj_ = 0, this.cG1 = new Map, this.CurrentAction = void 0, this.EntityHandle = void 0, this.wj_ = () => {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 执行行为-完毕", ["id", this.CurrentAction.Id], ["name", this.CurrentAction.constructor.name], ["PbDataId", this.EntityHandle.PbDataId], ["valid", this.CurrentAction.IsValid]), PerformActionCenter_1.PerformActionPool.ReturnAction(this.CurrentAction), this.CurrentAction = void 0, this.bl()
    }
  }
  Init() {
    this.Modes.set(1, new PerformMode_1.PlotMode(1, this.ph_, this)), this.Modes.set(2, new PerformMode_1.ActionMode(2, this.ph_, this)), this.Modes.set(3, new PerformMode_1.EcologyMode(3, this.ph_, this)), this.EntityHandle = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.ph_.Entity.Id)
  }
  Clear() {
    this.Modes.forEach(t => {
      t.Clear()
    }), this.Modes.clear(), this.CurrentAction && PerformActionCenter_1.PerformActionPool.ReturnAction(this.CurrentAction), this.CurrentAction = void 0, this.cG1.clear(), this.EntityHandle = void 0
  }
  CleanAction() {
    this.CurrentAction && (PerformActionCenter_1.PerformActionPool.ReturnAction(this.CurrentAction), this.CurrentAction = void 0), this.Modes.forEach(t => {
      t.Clear()
    }), Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 清理所有行为", ["PbDataId", this.EntityHandle.PbDataId])
  }
  GetCurrentMode() {
    return this.bj_
  }
  DoAction(t, i, e, s, r, h = !1) {
    this.NUe++;
    var o = this.NUe,
      i = PerformActionCenter_1.PerformActionPool.GetAction(i, o, e, this.ph_, this.wj_, s, r);
    return i.IsValid = !0, i.Mode = t, i.IsPersistent = h, this.cG1.set(o, i), Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 行为入队", ["id", i.Id], ["mode", t], ["PbDataId", this.EntityHandle.PbDataId]), this.Modes.get(t).PushAction(i, !1), this.bl(), o
  }
  EnableAction(t, i) {
    return !!this.cG1.has(t) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 禁用行为", ["id", t], ["PbDataId", this.EntityHandle.PbDataId]), this.cG1.get(t).IsValid = i, !0)
  }
  Update() {
    0 < this.cG1.size && this.bl()
  }
  bl() {
    if (!this.CurrentAction?.IsAtomic) {
      let t = !0;
      var i;
      0 !== this.bj_ && this.Modes.get(this.bj_).CheckExit() && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 状态切换-退出 [1-Plot 2-Action 3-Ecology]", ["mode", this.bj_], ["PbDataId", this.EntityHandle.PbDataId]), this.bj_ = 0), (t = 0 === this.bj_ ? this.Rj_(1) || this.Rj_(2) || this.Rj_(3) : t) && (i = this.Modes.get(this.bj_).PopAction()) && (this.cG1.delete(i.Id), this.CurrentAction && (this.CurrentAction.IsPersistent && this.CurrentAction.Mode !== this.bj_ ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 执行行为-打断并入栈", ["id", this.CurrentAction.Id], ["name", this.CurrentAction.constructor.name], ["PbDataId", this.EntityHandle.PbDataId]), this.CurrentAction.Interrupt(), this.cG1.set(i.Id, i), this.Modes.get(this.CurrentAction.Mode).PushAction(this.CurrentAction, !0)) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 执行行为-中止", ["id", this.CurrentAction.Id], ["name", this.CurrentAction.constructor.name], ["PbDataId", this.EntityHandle.PbDataId]), PerformActionCenter_1.PerformActionPool.ReturnAction(this.CurrentAction))), this.CurrentAction = void 0, this.Aj_(i), this.bl())
    }
  }
  Rj_(t) {
    return !!this.Modes.get(t).CheckEnter() && (this.bj_ = t, Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 状态切换-进入 [1-Plot 2-Action 3-Ecology]", ["mode", this.bj_], ["PbDataId", this.EntityHandle.PbDataId]), !0)
  }
  Aj_(t) {
    this.CurrentAction = t, Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 执行行为-开始", ["id", this.CurrentAction.Id], ["name", this.CurrentAction.constructor.name], ["PbDataId", this.EntityHandle.PbDataId]), t.Execute()
  }
}
exports.PerformMachine = PerformMachine;
//# sourceMappingURL=PerformMachine.js.map