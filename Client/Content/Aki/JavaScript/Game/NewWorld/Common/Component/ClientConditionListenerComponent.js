"use strict";

var ClientConditionListenerComponent_1;
var __decorate = this && this.__decorate || function (e, n, t, o) {
  var i;
  var r = arguments.length;
  var l = r < 3 ? n : o === null ? o = Object.getOwnPropertyDescriptor(n, t) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(e, n, t, o);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (i = e[s]) {
        l = (r < 3 ? i(l) : r > 3 ? i(n, t, l) : i(n, t)) || l;
      }
    }
  }
  if (r > 3 && l) {
    Object.defineProperty(n, t, l);
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
  constructor(e, n, t) {
    this.ListenType = e;
    this.ConditionListener = n;
    this.CheckResult = t;
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
    for (const n of e.Listeners) {
      this.ydc(n);
    }
    return true;
  }
  OnClear() {
    this.$qd();
    this.Cdc?.clear();
    return true;
  }
  $qd() {
    if (this.Cdc) {
      for (const e of this.Cdc.values()) {
        for (const n of e.LevelListenerIds) {
          LevelListenerCenter_1.LevelListenerCenter.UnListenTo(n);
        }
      }
    }
  }
  ydc(e) {
    var n = ModelManager_1.ModelManager.LevelGeneralModel.MakeConditionGroupIncId();
    var t = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
    var o = ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(e.Condition, undefined, t);
    if (o) {
      this.m8(e, t);
    }
    var i = new ConditionListenInfo(1, e, o);
    this.Cdc?.set(n, i);
    for (const l of e.Condition.Conditions) {
      var r = LevelListenerCenter_1.LevelListenerCenter.ListenToCondition(l.Type, l, this.Wqd.bind(this, n), LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id));
      i.LevelListenerIds.push(r);
    }
  }
  Wqd(e, n) {
    var t = this.Cdc?.get(e);
    if (t) {
      var o = t.CheckResult;
      var i = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
      let e = undefined;
      e = n && n instanceof LevelGeneralContextDefine_1.ClientEventContext ? LevelGeneralContextDefine_1.CombinationContext.Create(i, n) : i;
      var r = ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(t.ConditionListener.Condition, undefined, e);
      t.CheckResult = r;
      switch (t.ListenType) {
        case 1:
          if (r) {
            this.m8(t.ConditionListener, e);
          }
          break;
        case 0:
          if (r && o !== r) {
            this.m8(t.ConditionListener, e);
          }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelCondition", 72, "条件监听信息不存在", ["incId", e]);
    }
  }
  m8(e, n) {
    if (n instanceof LevelGeneralContextDefine_1.EntityContext) {
      n.ClientExecuteActions = true;
    }
    if (n instanceof LevelGeneralContextDefine_1.CombinationContext && n.Contexts) {
      for (const t of n.Contexts) {
        if (t instanceof LevelGeneralContextDefine_1.EntityContext) {
          t.ClientExecuteActions = true;
        }
      }
    }
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(e.Actions, n);
    if (e.SendSelfEvent) {
      n = this.Entity.GetComponent(0);
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(n.GetCreatureDataId(), e.SendSelfEvent);
    }
  }
};
ClientConditionListenerComponent = ClientConditionListenerComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(267)], ClientConditionListenerComponent);
exports.ClientConditionListenerComponent = ClientConditionListenerComponent; //# sourceMappingURL=ClientConditionListenerComponent.js.map