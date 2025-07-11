"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformMachine = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const PerformActionCenter_1 = require("./Action/PerformActionCenter");
const PerformMode_1 = require("./PerformMode");
class PerformMachine {
  constructor(t) {
    this.ph_ = t;
    this.NUe = 0;
    this.Modes = new Map();
    this.bj_ = 0;
    this.jG1 = new Map();
    this.CurrentAction = undefined;
    this.EntityHandle = undefined;
    this.wj_ = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 执行行为-完毕", ["id", this.CurrentAction.Id], ["name", this.CurrentAction.constructor.name], ["PbDataId", this.EntityHandle.PbDataId], ["valid", this.CurrentAction.IsValid]);
      }
      PerformActionCenter_1.PerformActionPool.ReturnAction(this.CurrentAction);
      this.CurrentAction = undefined;
      this.bl();
    };
  }
  Init() {
    this.Modes.set(1, new PerformMode_1.PlotMode(1, this.ph_, this));
    this.Modes.set(2, new PerformMode_1.ActionMode(2, this.ph_, this));
    this.Modes.set(3, new PerformMode_1.EcologyMode(3, this.ph_, this));
    this.EntityHandle = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.ph_.Entity.Id);
  }
  Clear() {
    this.Modes.forEach(t => {
      t.Clear();
    });
    this.Modes.clear();
    if (this.CurrentAction) {
      PerformActionCenter_1.PerformActionPool.ReturnAction(this.CurrentAction);
    }
    this.CurrentAction = undefined;
    this.jG1.clear();
    this.EntityHandle = undefined;
  }
  CleanAction() {
    if (this.CurrentAction) {
      PerformActionCenter_1.PerformActionPool.ReturnAction(this.CurrentAction);
      this.CurrentAction = undefined;
    }
    this.Modes.forEach(t => {
      t.Clear();
    });
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 清理所有行为", ["PbDataId", this.EntityHandle.PbDataId]);
    }
  }
  GetCurrentMode() {
    return this.bj_;
  }
  DoAction(t, i, e, s, r, h = false) {
    this.NUe++;
    var o = this.NUe;
    var i = PerformActionCenter_1.PerformActionPool.GetAction(i, o, e, this.ph_, this.wj_, s, r);
    i.IsValid = true;
    i.Mode = t;
    i.IsPersistent = h;
    this.jG1.set(o, i);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 行为入队", ["id", i.Id], ["mode", t], ["PbDataId", this.EntityHandle.PbDataId]);
    }
    this.Modes.get(t).PushAction(i, false);
    this.bl();
    return o;
  }
  EnableAction(t, i) {
    return !!this.jG1.has(t) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 禁用行为", ["id", t], ["PbDataId", this.EntityHandle.PbDataId]), this.jG1.get(t).IsValid = i, true);
  }
  Update() {
    if (this.jG1.size > 0) {
      this.bl();
    }
  }
  bl() {
    if (!this.CurrentAction?.IsAtomic) {
      let t = true;
      var i;
      if (this.bj_ !== 0 && this.Modes.get(this.bj_).CheckExit()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 状态切换-退出 [1-Plot 2-Action 3-Ecology]", ["mode", this.bj_], ["PbDataId", this.EntityHandle.PbDataId]);
        }
        this.bj_ = 0;
      }
      if ((t = this.bj_ === 0 ? this.Rj_(1) || this.Rj_(2) || this.Rj_(3) : t) && (i = this.Modes.get(this.bj_).PopAction())) {
        this.jG1.delete(i.Id);
        if (this.CurrentAction) {
          if (this.CurrentAction.IsPersistent && this.CurrentAction.Mode !== this.bj_) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 执行行为-打断并入栈", ["id", this.CurrentAction.Id], ["name", this.CurrentAction.constructor.name], ["PbDataId", this.EntityHandle.PbDataId]);
            }
            this.CurrentAction.Interrupt();
            this.jG1.set(i.Id, i);
            this.Modes.get(this.CurrentAction.Mode).PushAction(this.CurrentAction, true);
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 执行行为-中止", ["id", this.CurrentAction.Id], ["name", this.CurrentAction.constructor.name], ["PbDataId", this.EntityHandle.PbDataId]);
            }
            PerformActionCenter_1.PerformActionPool.ReturnAction(this.CurrentAction);
          }
        }
        this.CurrentAction = undefined;
        this.Aj_(i);
        this.bl();
      }
    }
  }
  Rj_(t) {
    return !!this.Modes.get(t).CheckEnter() && (this.bj_ = t, Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 状态切换-进入 [1-Plot 2-Action 3-Ecology]", ["mode", this.bj_], ["PbDataId", this.EntityHandle.PbDataId]), true);
  }
  Aj_(t) {
    this.CurrentAction = t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 执行行为-开始", ["id", this.CurrentAction.Id], ["name", this.CurrentAction.constructor.name], ["PbDataId", this.EntityHandle.PbDataId]);
    }
    t.Execute();
  }
}
exports.PerformMachine = PerformMachine;
//# sourceMappingURL=PerformMachine.js.map