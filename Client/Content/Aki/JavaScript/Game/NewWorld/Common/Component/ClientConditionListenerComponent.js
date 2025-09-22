"use strict";

var ClientConditionListenerComponent_1;
var __decorate = this && this.__decorate || function (e, t, n, o) {
  var i;
  var r = arguments.length;
  var l = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(e, t, n, o);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (i = e[s]) {
        l = (r < 3 ? i(l) : r > 3 ? i(t, n, l) : i(t, n)) || l;
      }
    }
  }
  if (r > 3 && l) {
    Object.defineProperty(t, n, l);
  }
  return l;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientConditionListenerComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralNetworks_1 = require("../../../LevelGamePlay/LevelGeneralNetworks");
const LevelListenerCenter_1 = require("../../../LevelGamePlay/LevelListeners/LevelListenerCenter");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
class ConditionListenInfo {
  constructor(e, t, n) {
    this.ListenType = e;
    this.ConditionListener = t;
    this.CheckResult = n;
    this.LevelListenerIds = [];
  }
}
let ClientConditionListenerComponent = ClientConditionListenerComponent_1 = class ClientConditionListenerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Cdc = undefined;
  }
  OnInitData(e) {
    this.Cdc = new Map();
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
    this.Rkd();
    this.Cdc?.clear();
    return true;
  }
  Rkd() {
    if (this.Cdc) {
      for (const e of this.Cdc.values()) {
        for (const t of e.LevelListenerIds) {
          LevelListenerCenter_1.LevelListenerCenter.UnListenTo(t);
        }
      }
    }
  }
  ydc(e) {
    var t = ModelManager_1.ModelManager.LevelGeneralModel.MakeConditionGroupIncId();
    var n = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
    var n = ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(e.Condition, undefined, n);
    if (n) {
      this.m8(e);
    }
    var o = new ConditionListenInfo(1, e, n);
    this.Cdc?.set(t, o);
    for (const r of e.Condition.Conditions) {
      var i = LevelListenerCenter_1.LevelListenerCenter.ListenToCondition(r.Type, r, this.wkd.bind(this, t), LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id));
      o.LevelListenerIds.push(i);
    }
  }
  wkd(e, t) {
    var n = this.Cdc?.get(e);
    if (n) {
      var o = n.CheckResult;
      var i = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
      let e = undefined;
      e = t && t instanceof LevelGeneralContextDefine_1.ClientEventContext ? LevelGeneralContextDefine_1.CombinationContext.Create(i, t) : i;
      var r = ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(n.ConditionListener.Condition, undefined, e);
      n.CheckResult = r;
      switch (n.ListenType) {
        case 1:
          if (r) {
            this.m8(n.ConditionListener);
          }
          break;
        case 0:
          if (r && o !== r) {
            this.m8(n.ConditionListener);
          }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelCondition", 72, "条件监听信息不存在", ["incId", e]);
    }
  }
  m8(e) {
    var t = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
    t.ClientExecuteActions = true;
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(e.Actions, t);
    if (e.SendSelfEvent) {
      t = this.Entity.GetComponent(0);
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(t.GetCreatureDataId(), e.SendSelfEvent);
    }
  }
};
ClientConditionListenerComponent = ClientConditionListenerComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(263)], ClientConditionListenerComponent);
exports.ClientConditionListenerComponent = ClientConditionListenerComponent; //# sourceMappingURL=ClientConditionListenerComponent.js.map