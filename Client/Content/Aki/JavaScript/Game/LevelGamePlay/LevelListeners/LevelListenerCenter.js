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
    this.NBd = new Map();
    this.VBd = new Map();
    this.jBd = new Map();
    this.HBd = new Map();
    this.$Bd = new Map();
    this.WBd = INVALID_LISTENER_ID;
    this.QBd();
  }
  static Clear() {
    if (this.$Bd) {
      for (const e of Array.from(this.$Bd.keys())) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelListener", 39, "检测到有监听器未取消监听, 保底取消", ["ListenerId", e], ["Listener", this.$Bd.get(e)?.constructor.name]);
        }
        this.UnListenTo(e);
      }
    }
    this.NBd = undefined;
    this.VBd = undefined;
    this.jBd = undefined;
    this.HBd = undefined;
    this.$Bd = undefined;
    this.WBd = INVALID_LISTENER_ID;
  }
  static QBd() {
    this.KBd(0, LevelConditionListenerCheckClientEvent_1.LevelConditionListenerCheckClientEvent);
    this.KBd(1, LevelConditionListenerCheckMusicBeatsEvent_1.LevelConditionListenerCheckMusicBeatsEvent);
    this.KBd(2, LevelConditionListenerCheckSceneItemDirection_1.LevelConditionListenerCheckSceneItemDirection);
    this.KBd(3, LevelConditionListenerCompareEntityState_1.LevelConditionListenerCompareEntityState);
    this.KBd(4, LevelConditionListenerCompareVar_1.LevelConditionListenerCompareVar);
    this.KBd(5, LevelConditionListenerCheckEntitiesExist_1.LevelConditionListenerCheckEntitiesExist);
    this.KBd(6, LevelConditionListenerCheckEntityHasSceneItemAttributeTag_1.LevelConditionListenerCheckEntityHasSceneItemAttributeTag);
    this.XBd("CheckClientEvent", 0);
    this.XBd("CheckMusicBeatsEvent", 1);
    this.XBd("CheckSceneItemDirection", 2);
    this.XBd("CompareEntityState", 3);
    this.XBd("CompareEntitySelfState", 3);
    this.XBd("CompareVar", 4);
    this.XBd("CheckEntitesExist", 5);
    this.XBd("CheckEntityHasSceneItemAttributeTag", 6);
  }
  static KBd(e, t) {
    if (this.NBd && this.jBd) {
      if (this.NBd.has(e)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelListener", 39, "注册监听失败: 监听已注册过", ["ListenerType", e]);
        }
      } else {
        this.NBd.set(e, t);
        this.jBd.set(t.name, new t());
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelListener", 39, "注册监听失败: 容器未初始化", ["ListenerType", e]);
    }
  }
  static XBd(e, t) {
    if (this.NBd && this.VBd) {
      if (this.NBd.has(t)) {
        if (this.VBd.has(e)) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("LevelListener", 39, "关联条件与监听失败: 条件已关联过监听", ["ConditionType", e], ["ListenerType", t], ["ExistedListenerType", this.VBd.get(e)]);
          }
        } else {
          this.VBd.set(e, t);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "关联条件与监听失败: 监听本身尚未注册", ["ConditionType", e], ["ListenerType", t]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelListener", 39, "关联条件与监听失败: 容器未初始化", ["ConditionType", e], ["ListenerType", t]);
    }
  }
  static YBd(e) {
    if (this.NBd && this.HBd) {
      var t = this.NBd.get(e);
      if (t) {
        let e = undefined;
        var i = this.HBd.get(t.name);
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
  static zBd(e) {
    if (this.VBd) {
      var t = this.VBd?.get(e);
      if (t !== undefined) {
        return this.YBd(t);
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "获取条件对应的监听器失败: 条件未注册监听器", ["ConditionType", e]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelListener", 39, "获取条件对应的监听器失败: 容器未初始化", ["ConditionType", e]);
    }
  }
  static JBd(t) {
    if (t) {
      if (t.IsListening) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelListener", 39, "释放监听器时, 发现监听器尚未取消监听", ["Listener", t.constructor.name]);
        }
        t.UnListen();
      }
      if (this.ZBd(t)) {
        if (this.HBd) {
          let e = this.HBd.get(t.constructor.name);
          if (!e) {
            e = [];
            this.HBd.set(t.constructor.name, e);
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
  static ZBd(e) {
    var t;
    if (this.jBd) {
      if (t = this.jBd.get(e.constructor.name)) {
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
    if (!this.$Bd) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "开始监听失败: 容器未初始化", ["ListenerType", e]);
      }
      return INVALID_LISTENER_ID;
    }
    var i = this.YBd(e);
    if (!i) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "开始监听失败: 获取监听器出错", ["ListenerType", e]);
      }
      return INVALID_LISTENER_ID;
    }
    i.Listen(...t);
    e = ++this.WBd;
    this.$Bd.set(e, i);
    return e;
  }
  static ListenToCondition(e, ...t) {
    if (!this.$Bd) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "开始监听失败: 容器未初始化", ["ConditionType", e]);
      }
      return INVALID_LISTENER_ID;
    }
    var i = this.zBd(e);
    if (!i) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelListener", 39, "开始监听失败: 获取监听器出错", ["ConditionType", e]);
      }
      return INVALID_LISTENER_ID;
    }
    i.Listen(...t);
    e = ++this.WBd;
    this.$Bd.set(e, i);
    return e;
  }
  static UnListenTo(e) {
    var t = this.$Bd?.get(e);
    this.$Bd?.delete(e);
    if (t) {
      t.UnListen();
      this.JBd(t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelListener", 39, "取消监听失败: 获取监听器出错", ["ListenerId", e]);
    }
  }
}
(exports.LevelListenerCenter = LevelListenerCenter).NBd = undefined;
LevelListenerCenter.VBd = undefined;
LevelListenerCenter.jBd = undefined;
LevelListenerCenter.HBd = undefined;
LevelListenerCenter.$Bd = undefined;
LevelListenerCenter.WBd = INVALID_LISTENER_ID; //# sourceMappingURL=LevelListenerCenter.js.map