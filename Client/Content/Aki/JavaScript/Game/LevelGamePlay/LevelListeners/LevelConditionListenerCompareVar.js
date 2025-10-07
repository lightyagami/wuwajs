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
    this.bBd = (...t) => {
      var i = t?.[0];
      if (i !== undefined) {
        let e = false;
        for (const n of Object.keys(i)) {
          if (this.RBd.has(n)) {
            e = true;
            break;
          }
        }
        if (e) {
          this.Callback?.(LevelGeneralContextDefine_1.ClientEventContext.Create(EventDefine_1.EEventName.OnReceivePlayerVar, ...t));
        }
      }
    };
    this.wBd = () => {
      this.Callback?.();
    };
    this.LBd = (e, ...t) => {
      var i = t?.[0];
      if (i !== undefined && this.PBd.get(e)?.has(i)) {
        this.Callback?.(LevelGeneralContextDefine_1.ClientEventContext.Create(EventDefine_1.EEventName.EntityVarUpdate, ...t));
      }
    };
    this.RBd = new Set();
    this.ABd = new Map();
    this.PBd = new Map();
    this.kHa = undefined;
  }
  OnListen(e, t, i) {
    this.DBd(e.Var1);
    this.DBd(e.Var2);
  }
  OnUnListen() {
    this.UBd();
    this.xBd();
    this.BBd();
    if (this.kHa) {
      this.kHa.Cancel();
    }
    this.kHa = undefined;
  }
  DBd(e) {
    switch (e.Source) {
      case "Constant":
        break;
      case "Self":
        this.kBd(e);
        break;
      case "Other":
        this.OBd(e);
        break;
      case "Global":
        this.qBd(e.Keyword);
    }
  }
  OBd(t) {
    if (t.Source === "Other") {
      switch (t.RefType) {
        case "Entity":
          this.kHa = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("LevelConditionListenerCompareVar", t.RefId, () => {
            this.kHa = undefined;
            var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(t.RefId)?.Entity;
            if (e?.Valid) {
              this.GBd(e, t.Name);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelCondition", 39, "实体变量条件监听失败: 实体无效");
            }
          }, undefined, false, true);
          break;
        case "Quest":
          var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t.RefId)?.Tree;
          if (e) {
            this.FBd(e, t.Name);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 39, "实体变量条件监听失败: 任务无效");
          }
          break;
        case "LevelPlay":
          e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(t.RefId)?.Tree;
          if (e) {
            this.FBd(e, t.Name);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 39, "实体变量条件监听失败: 玩法无效");
          }
      }
    }
  }
  kBd(e) {
    if (e.Source === "Self" && this.Context) {
      switch (this.Context.Type) {
        case 1:
        case 5:
          var t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(undefined, this.Context)?.Entity;
          if (t?.Valid) {
            this.GBd(t, e.Name);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 39, "实体变量条件监听失败: 实体无效");
          }
          break;
        case 6:
          t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.Context.TreeIncId, true);
          if (t) {
            this.FBd(t, e.Name);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 39, "实体变量条件监听失败: 行为树无效");
          }
      }
    }
  }
  qBd(e) {
    this.RBd.add(e);
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnReceivePlayerVar, this.bBd)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnReceivePlayerVar, this.bBd);
    }
  }
  UBd() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnReceivePlayerVar, this.bBd)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnReceivePlayerVar, this.bBd);
    }
    this.RBd.clear();
  }
  FBd(e, t) {
    let i = this.ABd.get(e);
    if (!i) {
      i = new Set();
      this.ABd.set(e, i);
    }
    if (!i.has(t)) {
      i.add(t);
      e.AddTreeVarUpdateDelegate(t, this.wBd);
    }
  }
  xBd() {
    for (var [e, t] of this.ABd) {
      if (e) {
        for (const i in t) {
          e.RemoveTreeVarUpdateDelegate(i, this.wBd);
        }
      }
    }
    this.ABd.clear();
  }
  GBd(t, i) {
    if (t?.Valid) {
      let e = this.PBd.get(t);
      if (!e) {
        e = new Set();
        this.PBd.set(t, e);
      }
      if (!e.has(i) && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.EntityVarUpdate, this.LBd.bind(this, t))) {
        e.add(i);
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t, EventDefine_1.EEventName.EntityVarUpdate, this.LBd.bind(this, t));
      }
    }
  }
  BBd() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    this.PBd.clear();
  }
}
exports.LevelConditionListenerCompareVar = LevelConditionListenerCompareVar;
//# sourceMappingURL=LevelConditionListenerCompareVar.js.map