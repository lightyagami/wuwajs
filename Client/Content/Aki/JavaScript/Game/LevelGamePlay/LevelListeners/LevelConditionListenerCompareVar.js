"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionListenerCompareVar = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const LevelListenerBase_1 = require("./LevelListenerBase");
class LevelConditionListenerCompareVar extends LevelListenerBase_1.LevelListenerBase {
  constructor() {
    super(...arguments);
    this.HOd = (...t) => {
      var i = t?.[0];
      if (i !== undefined) {
        let e = false;
        for (const n of Object.keys(i)) {
          if (this.$Od.has(n)) {
            e = true;
            break;
          }
        }
        if (e) {
          this.Callback?.(LevelGeneralContextDefine_1.ClientEventContext.Create(EventDefine_1.EEventName.OnReceivePlayerVar, ...t));
        }
      }
    };
    this.WOd = () => {
      this.Callback?.();
    };
    this.QOd = (e, ...t) => {
      var i = t?.[0];
      if (i !== undefined && this.KOd.get(e)?.has(i)) {
        this.Callback?.(LevelGeneralContextDefine_1.ClientEventContext.Create(EventDefine_1.EEventName.EntityVarUpdate, ...t));
      }
    };
    this.$Od = new Set();
    this.XOd = new Map();
    this.KOd = new Map();
    this.kHa = undefined;
  }
  OnListen(e, t, i) {
    this.YOd(e.Var1);
    this.YOd(e.Var2);
  }
  OnUnListen() {
    this.zOd();
    this.JOd();
    this.ZOd();
    if (this.kHa) {
      this.kHa.Cancel();
    }
    this.kHa = undefined;
  }
  YOd(e) {
    switch (e.Source) {
      case "Constant":
        break;
      case "Self":
        this.eqd(e);
        break;
      case "Other":
        this.tqd(e);
        break;
      case "Global":
        this.iqd(e.Keyword);
    }
  }
  tqd(t) {
    if (t.Source === "Other") {
      switch (t.RefType) {
        case "Entity":
          this.kHa = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelConditionListenerCompareVar", t.RefId, () => {
            this.kHa = undefined;
            var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(t.RefId)?.Entity;
            if (e?.Valid) {
              this.rqd(e, t.Name);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelCondition", 39, "实体变量条件监听失败: 实体无效");
            }
          }, undefined, false, true);
          break;
        case "Quest":
          var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t.RefId)?.Tree;
          if (e) {
            this.oqd(e, t.Name);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 39, "实体变量条件监听失败: 任务无效");
          }
          break;
        case "LevelPlay":
          e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(t.RefId)?.Tree;
          if (e) {
            this.oqd(e, t.Name);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 39, "实体变量条件监听失败: 玩法无效");
          }
      }
    }
  }
  eqd(e) {
    if (e.Source === "Self" && this.Context) {
      switch (this.Context.Type) {
        case 1:
        case 5:
          var t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(undefined, this.Context)?.Entity;
          if (t?.Valid) {
            this.rqd(t, e.Name);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 39, "实体变量条件监听失败: 实体无效");
          }
          break;
        case 6:
          t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.Context.TreeIncId, true);
          if (t) {
            this.oqd(t, e.Name);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 39, "实体变量条件监听失败: 行为树无效");
          }
      }
    }
  }
  iqd(e) {
    this.$Od.add(e);
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnReceivePlayerVar, this.HOd)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnReceivePlayerVar, this.HOd);
    }
  }
  zOd() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnReceivePlayerVar, this.HOd)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnReceivePlayerVar, this.HOd);
    }
    this.$Od.clear();
  }
  oqd(e, t) {
    let i = this.XOd.get(e);
    if (!i) {
      i = new Set();
      this.XOd.set(e, i);
    }
    if (!i.has(t)) {
      i.add(t);
      e.AddTreeVarUpdateDelegate(t, this.WOd);
    }
  }
  JOd() {
    for (var [e, t] of this.XOd) {
      if (e) {
        for (const i in t) {
          e.RemoveTreeVarUpdateDelegate(i, this.WOd);
        }
      }
    }
    this.XOd.clear();
  }
  rqd(t, i) {
    if (t?.Valid) {
      let e = this.KOd.get(t);
      if (!e) {
        e = new Set();
        this.KOd.set(t, e);
      }
      if (!e.has(i) && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.EntityVarUpdate, this.QOd.bind(this, t))) {
        e.add(i);
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t, EventDefine_1.EEventName.EntityVarUpdate, this.QOd.bind(this, t));
      }
    }
  }
  ZOd() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    this.KOd.clear();
  }
}
exports.LevelConditionListenerCompareVar = LevelConditionListenerCompareVar;
//# sourceMappingURL=LevelConditionListenerCompareVar.js.map