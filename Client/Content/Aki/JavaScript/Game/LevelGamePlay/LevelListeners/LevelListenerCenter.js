"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelListenerCenter = undefined;
const Log_1 = require("../../../Core/Common/Log");
const LevelConditionListenerCheckClientEvent_1 = require("./LevelConditionListenerCheckClientEvent");
const LevelConditionListenerCheckEntitiesExist_1 = require("./LevelConditionListenerCheckEntitiesExist");
const LevelConditionListenerCheckEntityHasSceneItemAttributeTag_1 = require("./LevelConditionListenerCheckEntityHasSceneItemAttributeTag");
const LevelConditionListenerCheckMusicBeatsEvent_1 = require("./LevelConditionListenerCheckMusicBeatsEvent");
const LevelConditionListenerCheckSceneItemDirection_1 = require("./LevelConditionListenerCheckSceneItemDirection");
const LevelConditionListenerCompareEntityState_1 = require("./LevelConditionListenerCompareEntityState");
const LevelConditionListenerCompareVar_1 = require("./LevelConditionListenerCompareVar");
const LevelListenerUtils_1 = require("./LevelListenerUtils");
const INVALID_LISTENER_ID = 0;
class LevelListenerCenter {
  static Init() {
    this.nqd = new Map();
    this.sqd = new Map();
    this.aqd = new Map();
    this.hqd = new Map();
    this.lqd = new Map();
    this._qd = INVALID_LISTENER_ID;
    this.uqd();
  }
  static Clear() {
    if (this.lqd) {
      for (const e of Array.from(this.lqd.keys())) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelListener", 39, "检测到有监听器未取消监听, 保底取消", ["ListenerId", e], ["Listener", this.lqd.get(e)?.constructor.name]);
        }
        this.UnListenTo(e);
      }
    }
    this.nqd = undefined;
    this.sqd = undefined;
    this.aqd = undefined;
    this.hqd = undefined;
    this.lqd = undefined;
    this._qd = INVALID_LISTENER_ID;
  }
  static uqd() {
    this.cqd(0, LevelConditionListenerCheckClientEvent_1.LevelConditionListenerCheckClientEvent);
    this.cqd(1, LevelConditionListenerCheckMusicBeatsEvent_1.LevelConditionListenerCheckMusicBeatsEvent);
    this.cqd(2, LevelConditionListenerCheckSceneItemDirection_1.LevelConditionListenerCheckSceneItemDirection);
    this.cqd(3, LevelConditionListenerCompareEntityState_1.LevelConditionListenerCompareEntityState);
    this.cqd(4, LevelConditionListenerCompareVar_1.LevelConditionListenerCompareVar);
    this.cqd(5, LevelConditionListenerCheckEntitiesExist_1.LevelConditionListenerCheckEntitiesExist);
    this.cqd(6, LevelConditionListenerCheckEntityHasSceneItemAttributeTag_1.LevelConditionListenerCheckEntityHasSceneItemAttributeTag);
    this.dqd("CheckClientEvent", 0);
    this.dqd("CheckMusicBeatsEvent", 1);
    this.dqd("CheckSceneItemDirection", 2);
    this.dqd("CompareEntityState", 3);
    this.dqd("CompareEntitySelfState", 3);
    this.dqd("CompareVar", 4);
    this.dqd("CheckEntitesExist", 5);
    this.dqd("CheckEntityHasSceneItemAttributeTag", 6);
  }
  static cqd(e, t) {
    if (this.nqd && this.aqd) {
      if (this.nqd.has(e)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelListener", 39, "注册监听失败: 监听已注册过", ["ListenerType", e]);
        }
      } else {
        this.nqd.set(e, t);
        this.aqd.set(t.name, new t());
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelListener", 39, "注册监听失败: 容器未初始化", ["ListenerType", e]);
    }
  }
  static dqd(e, t) {
    if (this.nqd && this.sqd) {
      if (this.nqd.has(t)) {
        if (this.sqd.has(e)) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("LevelListener", 39, "关联条件与监听失败: 条件已关联过监听", ["ConditionType", e], ["ListenerType", t], ["ExistedListenerType", this.sqd.get(e)]);
          }
        } else {
          this.sqd.set(e, t);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "关联条件与监听失败: 监听本身尚未注册", ["ConditionType", e], ["ListenerType", t]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelListener", 39, "关联条件与监听失败: 容器未初始化", ["ConditionType", e], ["ListenerType", t]);
    }
  }
  static mqd(e) {
    if (this.nqd && this.hqd) {
      var t = this.nqd.get(e);
      if (t) {
        let e = undefined;
        var i = this.hqd.get(t.name);
        if (i) {
          while (i.length > 0 && !e) {
            e = i.pop();
          }
        }
        return e = e || new t();
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "获取监听器失败: 找不到Constructor", ["ListenerType", e]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelListener", 39, "获取监听器失败: 容器未初始化", ["ListenerType", e]);
    }
  }
  static fqd(e) {
    if (this.sqd) {
      var t = this.sqd?.get(e);
      if (t !== undefined) {
        return this.mqd(t);
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "获取条件对应的监听器失败: 条件未注册监听器", ["ConditionType", e]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelListener", 39, "获取条件对应的监听器失败: 容器未初始化", ["ConditionType", e]);
    }
  }
  static gqd(t) {
    if (t) {
      if (t.IsListening) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelListener", 39, "释放监听器时, 发现监听器尚未取消监听", ["Listener", t.constructor.name]);
        }
        t.UnListen();
      }
      if (this.Cqd(t)) {
        if (this.hqd) {
          let e = this.hqd.get(t.constructor.name);
          if (!e) {
            e = [];
            this.hqd.set(t.constructor.name, e);
          }
          e.push(t);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "清理监听器失败, 不回池", ["Listener", t.constructor.name]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelListener", 39, "释放监听器失败: 监听器不合法");
    }
  }
  static Cqd(e) {
    var t;
    if (this.aqd) {
      if (t = this.aqd.get(e.constructor.name)) {
        return LevelListenerUtils_1.LevelListenerUtils.ClearListener(e, t);
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelListener", 39, "清理监听器失败: 找不到对应的监听器模板", ["Listener", e.constructor.name]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "清理监听器失败: 容器未初始化", ["Listener", e.constructor.name]);
      }
      return false;
    }
  }
  static ListenTo(e, ...t) {
    if (!this.lqd) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "开始监听失败: 容器未初始化", ["ListenerType", e]);
      }
      return INVALID_LISTENER_ID;
    }
    var i = this.mqd(e);
    if (!i) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "开始监听失败: 获取监听器出错", ["ListenerType", e]);
      }
      return INVALID_LISTENER_ID;
    }
    i.Listen(...t);
    e = ++this._qd;
    this.lqd.set(e, i);
    return e;
  }
  static ListenToCondition(e, ...t) {
    if (!this.lqd) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "开始监听失败: 容器未初始化", ["ConditionType", e]);
      }
      return INVALID_LISTENER_ID;
    }
    var i = this.fqd(e);
    if (!i) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "开始监听失败: 获取监听器出错", ["ConditionType", e]);
      }
      return INVALID_LISTENER_ID;
    }
    i.Listen(...t);
    e = ++this._qd;
    this.lqd.set(e, i);
    return e;
  }
  static UnListenTo(e) {
    var t = this.lqd?.get(e);
    this.lqd?.delete(e);
    if (t) {
      t.UnListen();
      this.gqd(t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelListener", 39, "取消监听失败: 获取监听器出错", ["ListenerId", e]);
    }
  }
}
(exports.LevelListenerCenter = LevelListenerCenter).nqd = undefined;
LevelListenerCenter.sqd = undefined;
LevelListenerCenter.aqd = undefined;
LevelListenerCenter.hqd = undefined;
LevelListenerCenter.lqd = undefined;
LevelListenerCenter._qd = INVALID_LISTENER_ID; //# sourceMappingURL=LevelListenerCenter.js.map