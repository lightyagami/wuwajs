"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaitEntityTask = undefined;
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTaskController_1 = require("../../Module/WaitEntityTask/WaitEntityTaskController");
const REASON_LENGTH_LIMIT = 4;
const WAIT_TIME = 60000;
class WaitEntityTask {
  constructor() {
    this.Kvr = undefined;
    this.Qvr = new Set();
    this.WaitType = undefined;
    this.Xvr = undefined;
    this.BOe = 0;
    this.$vr = false;
    this.Reason = undefined;
    this.Gvr = undefined;
    this.OnAddEntity = (t, i) => {
      if (this.WaitType === "CreatureDataId") {
        this.Qvr.delete(t);
      } else if (this.WaitType === "PbDataId") {
        this.Qvr.delete(i);
      }
      if (!(this.Qvr.size > 0)) {
        this.Bto(!this.$vr);
      }
    };
    this.OnRemoveEntity = (t, i) => {
      if (this.WaitType === "CreatureDataId") {
        if (!this.Qvr.has(t)) {
          return;
        }
        this.Qvr.delete(t);
      } else if (this.WaitType === "PbDataId") {
        if (!this.Qvr.has(i)) {
          return;
        }
        this.Qvr.delete(i);
      }
      this.$vr = true;
      if (!this.Qvr.size) {
        this.Bto(false);
      }
    };
  }
  qtg(i, t, s, e, a) {
    if (Array.isArray(i)) {
      for (const o of i) {
        this.Yvr(o);
        this.Qvr.add(o);
      }
    } else {
      this.Yvr(i);
      this.Qvr.add(i);
    }
    this.Gvr = t;
    this.Xvr = s >= 0 ? TimerSystem_1.TimerSystem.Delay(t => {
      if (a) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Entity", 3, "等待实体超时，强行等待", ["Id类型", "CreatureDataId"], ["实体列表", JSON.stringify(i)], ["Reason", this.Reason]);
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Entity", 3, "等待实体超时，强行回调", ["Id类型", "CreatureDataId"], ["实体列表", JSON.stringify(i)], ["Reason", this.Reason]);
        }
        this.Bto(undefined);
      }
    }, s) : undefined;
    if (Array.isArray(i)) {
      for (const r of i) {
        this.Wvr(r, e);
      }
    } else {
      this.Wvr(i, e);
    }
    if (this.Kvr) {
      for (const n of this.Kvr) {
        this.Wvr(n, e);
      }
      this.Kvr = undefined;
    }
    if (!(this.Qvr.size > 0)) {
      this.Bto(true);
    }
  }
  AddEntitiesWithPbDataId(i, t, s = WAIT_TIME, e = true, a = false) {
    if (Array.isArray(i)) {
      for (const o of i) {
        this.Qvr.add(o);
      }
    } else {
      this.Qvr.add(i);
    }
    this.Gvr = t;
    this.Xvr = s >= 0 ? TimerSystem_1.TimerSystem.Delay(t => {
      if (a) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Entity", 3, "等待实体超时，强行等待", ["Id类型", "PbDataId"], ["实体列表", JSON.stringify(i)], ["Reason", this.Reason]);
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Entity", 3, "等待实体超时，强行回调", ["Id类型", "PbDataId"], ["实体列表", JSON.stringify(i)], ["Reason", this.Reason]);
        }
        this.Bto(false);
      }
    }, s) : undefined;
    if (Array.isArray(i)) {
      for (const r of i) {
        this.Wvr(r, e);
      }
    } else {
      this.Wvr(i, e);
    }
    if (!(this.Qvr.size > 0)) {
      this.Bto(true);
    }
  }
  Wvr(t, i = true) {
    let s = undefined;
    if (!(s = this.WaitType === "PbDataId" ? ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t) : ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) && i) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Entity", 33, "WaitEntityTask期望监听的实体未创建或已死亡", ["EntityId", t], ["Reason", this.Reason]);
      }
      this.Qvr.delete(t);
    } else if (s) {
      if (s.IsInit) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Entity", 33, "WaitEntityTask期望监听的实体已创建", ["EntityId", t], ["Reason", this.Reason]);
        }
        this.Qvr.delete(t);
      } else {
        if (s.Priority < 101) {
          s.Priority = 101;
        }
        ControllerHolder_1.ControllerHolder.CharacterController.SortItem(s);
      }
    }
  }
  Bto(t) {
    if (this.Xvr !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.Xvr);
      this.Xvr = undefined;
    }
    this.Qvr.clear();
    WaitEntityTaskController_1.WaitEntityTaskController.RemoveTask(this.BOe);
    this.Gvr(t);
  }
  static Create(t, i, s, e = WAIT_TIME, a = true, o = false) {
    if (t) {
      var r;
      if (!(t.length < REASON_LENGTH_LIMIT)) {
        (r = new WaitEntityTask()).WaitType = "CreatureDataId";
        r.Reason = t;
        r.BOe = WaitEntityTaskController_1.WaitEntityTaskController.AddTask(r);
        r.qtg(i, s, e, a, o);
        return r;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "WaitEntityTask的Reason字符串长度必须大于等于限制字符数量", ["Reason", t], ["限制的字符数量", REASON_LENGTH_LIMIT]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "WaitEntityTask的Reason不能使用undefined");
    }
  }
  static CreateWithPbDataId(t, i, s, e = WAIT_TIME, a = true, o = false) {
    if (t) {
      var r;
      if (!(t.length < REASON_LENGTH_LIMIT)) {
        (r = new WaitEntityTask()).WaitType = "PbDataId";
        r.Reason = t;
        r.BOe = WaitEntityTaskController_1.WaitEntityTaskController.AddTask(r);
        r.AddEntitiesWithPbDataId(i, s, e, a, o);
        return r;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "WaitEntityTask的Reason字符串长度必须大于等于限制字符数量", ["Reason", t], ["限制的字符数量", REASON_LENGTH_LIMIT]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "WaitEntityTask的Reason不能使用undefined");
    }
  }
  Cancel() {
    if (this.Xvr !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.Xvr);
      this.Xvr = undefined;
    }
    this.Qvr.clear();
    WaitEntityTaskController_1.WaitEntityTaskController.RemoveTask(this.BOe);
  }
  Yvr(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    if (t && t.Entity.GetComponent(1)?.IsAutonomousProxy && t) {
      var i = t.Entity.GetComponent(0)?.CustomServerEntityIds;
      if (i) {
        this.Kvr ||= new Set();
        for (const s of i) {
          this.Kvr.add(s);
          this.Qvr.add(s);
        }
      }
      i = t.Entity.GetComponent(0)?.GetSummonerId();
      if (i) {
        this.Kvr ||= new Set();
        this.Kvr.add(i);
        this.Qvr.add(i);
      }
    }
  }
}
exports.WaitEntityTask = WaitEntityTask;
//# sourceMappingURL=WaitEntityTask.js.map