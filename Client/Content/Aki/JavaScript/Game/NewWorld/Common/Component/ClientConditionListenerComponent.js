"use strict";

var ClientConditionListenerComponent_1;
var __decorate = this && this.__decorate || function (e, t, n, o) {
  var i;
  var r = arguments.length;
  var s = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, n, o);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (i = e[l]) {
        s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(t, n, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientConditionListenerComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LevelConditionCenter_1 = require("../../../LevelGamePlay/LevelConditions/LevelConditionCenter");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralNetworks_1 = require("../../../LevelGamePlay/LevelGeneralNetworks");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
class ConditionListenInfo {
  constructor(e, t, n) {
    this.ListenType = e;
    this.ConditionListener = t;
    this.CheckResult = n;
  }
}
class EventHandleInfo {
  constructor(e, t, n) {
    this.EventName = e;
    this.EventHandle = t;
    this.ConditionEventType = n;
  }
}
let ClientConditionListenerComponent = ClientConditionListenerComponent_1 = class ClientConditionListenerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Cdc = undefined;
    this.pdc = undefined;
    this.vdc = undefined;
    this.VCc = undefined;
  }
  OnInitData(e) {
    this.Cdc = new Map();
    this.pdc = new Map();
    this.vdc = new Array();
    this.VCc = new Map();
    e = e?.GetParam(ClientConditionListenerComponent_1)?.[0];
    if (!e) {
      return false;
    }
    for (const t of e.Listeners) {
      this.ydc(t);
    }
    return true;
  }
  OnClear() {
    this.Cdc?.clear();
    this.pdc?.clear();
    this.Sdc();
    this.VCc?.clear();
    return true;
  }
  Sdc() {
    for (const e of this.vdc) {
      switch (e.ConditionEventType) {
        case 0:
          EventSystem_1.EventSystem.Remove(e.EventName, e.EventHandle);
          break;
        case 1:
          EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, e.EventName, e.EventHandle);
      }
    }
    this.vdc = undefined;
  }
  ydc(e) {
    var t = ModelManager_1.ModelManager.LevelGeneralModel.MakeConditionGroupIncId();
    var n = ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(e.Condition, undefined);
    if (n) {
      this.m8(e);
    }
    var n = new ConditionListenInfo(1, e, n);
    this.Cdc?.set(t, n);
    for (const o of e.Condition.Conditions) {
      if (!this.pdc?.has(o.Type)) {
        this.pdc?.set(o.Type, new Set());
      }
      this.pdc?.get(o.Type)?.add(t);
    }
    this.Mdc(e.Condition);
  }
  Mdc(e) {
    for (const r of e.Conditions) {
      var t = LevelConditionCenter_1.LevelConditionCenter.GetConditionListenerEventInfo(r.Type);
      if (t && t.size !== 0) {
        for (var [n, o] of t) {
          if (!this.VCc.has(n)) {
            this.VCc.set(n, this.Edc.bind(this, n));
          }
          var i = this.VCc.get(n);
          for (const s of o) {
            switch (s) {
              case 0:
                if (!EventSystem_1.EventSystem.Has(n, i)) {
                  EventSystem_1.EventSystem.Add(n, i);
                  this.vdc?.push(new EventHandleInfo(n, i, s));
                }
                break;
              case 1:
                if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, n, i)) {
                  EventSystem_1.EventSystem.AddWithTarget(this.Entity, n, i);
                  this.vdc?.push(new EventHandleInfo(n, i, s));
                }
            }
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 72, "[ClientConditionListenerComponent] 监听了一个没有注册触发事件的条件，不合法", ["condition", r]);
      }
    }
  }
  Edc(e, ...t) {
    var n = LevelConditionCenter_1.LevelConditionCenter.GetConditionsByEvent(e);
    if (n) {
      var o = new Set();
      var i = new Set();
      for (const _ of n) {
        var r = this.pdc?.get(_);
        if (r) {
          for (const d of r) {
            if (!o.has(d) && !i.has(d)) {
              var s = this.Cdc?.get(d);
              if (s) {
                var l = s.CheckResult;
                var a = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
                var C = LevelGeneralContextDefine_1.ClientEventContext.Create(e, ...t);
                var v = ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(s.ConditionListener.Condition, undefined, LevelGeneralContextDefine_1.CombinationContext.Create(a, C));
                ((s.CheckResult = v) ? o : i).add(d);
                switch (s.ListenType) {
                  case 1:
                    if (v) {
                      this.m8(s.ConditionListener);
                    }
                    break;
                  case 0:
                    if (v && l !== v) {
                      this.m8(s.ConditionListener);
                    }
                }
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelCondition", 72, "条件监听信息不存在", ["incId", d], ["condition", _], ["eventName", e]);
              }
            }
          }
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelCondition", 72, "[ClientConditionListenerComponent] 监听条件触发事件的时候没有对应条件", ["eventName", e], ["params", t]);
    }
  }
  m8(e) {
    var t;
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(e.Actions, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id));
    if (e.SendSelfEvent) {
      t = this.Entity.GetComponent(0);
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(t.GetCreatureDataId(), e.SendSelfEvent);
    }
  }
};
ClientConditionListenerComponent = ClientConditionListenerComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(259)], ClientConditionListenerComponent);
exports.ClientConditionListenerComponent = ClientConditionListenerComponent; //# sourceMappingURL=ClientConditionListenerComponent.js.map