"use strict";

var SceneItemTimeStopMachineComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, n) {
  var s;
  var o = arguments.length;
  var h = o < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, n);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (s = e[r]) {
        h = (o < 3 ? s(h) : o > 3 ? s(t, i, h) : s(t, i)) || h;
      }
    }
  }
  if (o > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemTimeStopMachineComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const TOLERANCE_TIME = 3;
const TIME_STOP_BUFF_ID = 600000009;
class TimeStopData {
  constructor(e, t, i) {
    this.TimeScaleComponent = undefined;
    this.TimeScaleId = undefined;
    this.IsSceneItem = false;
    this.TimeScaleComponent = e;
    this.TimeScaleId = t;
    this.IsSceneItem = i;
  }
}
let SceneItemTimeStopMachineComponent = SceneItemTimeStopMachineComponent_1 = class SceneItemTimeStopMachineComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.A1r = undefined;
    this.u1t = undefined;
    this.$Mn = new Map();
    this.YMn = new Set();
    this.bJa = false;
    this.g_n = (e, t) => {
      if (e !== this.A1r && this.bJa) {
        this.bJa = false;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Temp", 31, "[结束时停]");
        }
        this.JMn();
      } else if (e === this.A1r && !this.bJa) {
        this.bJa = true;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Temp", 31, "[开始时停]");
        }
        this.zMn();
      }
    };
    this.Fm = (e, t) => {
      if (this.$Mn.has(t)) {
        this.ZMn(t);
        this.$Mn.delete(t);
        EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.Fm);
      }
    };
    this.eEn = (e, t, i) => {
      var n = t.Entity.GetComponent(0).GetPbDataId();
      if (this.YMn.has(n) && (this.YMn.delete(n), this.tEn(t), this.YMn.size === 0)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.eEn);
      }
    };
  }
  OnInitData(e) {
    e = e.GetParam(SceneItemTimeStopMachineComponent_1)[0];
    this.Lo = e;
    this.A1r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.Lo.ActiveState);
    return true;
  }
  OnStart() {
    this.u1t = this.Entity.CheckGetComponent(0);
    this.dde();
    this.$Mn.clear();
    this.YMn.clear();
    return true;
  }
  OnEnd() {
    this.Cde();
    this.$Mn.clear();
    this.YMn.clear();
    return true;
  }
  dde() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
  }
  Cde() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.eEn)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.eEn);
    }
  }
  zMn() {
    var e = this.Lo?.Target.EntityIds;
    if (e) {
      for (const i of e) {
        var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
        if (t?.Valid) {
          this.tEn(t);
        } else {
          this.YMn.add(i);
          this.iEn();
        }
      }
    }
  }
  tEn(e) {
    var t;
    var i;
    var n = e.Entity?.GetComponent(133);
    if (n) {
      t = n.SetTimeScale(1, 0, undefined, this.Lo.StopTime + TOLERANCE_TIME, 8);
      if ((i = e.Entity.GetComponent(0).GetEntityType()) === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
        e.Entity.GetComponent(208)?.AddTag(-1201477412);
      } else {
        e.Entity.GetComponent(222)?.AddBuff(TIME_STOP_BUFF_ID, {
          InstigatorId: this.u1t.GetCreatureDataId(),
          Level: 1,
          Reason: "TimeStopMachine"
        });
      }
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.Fm);
      this.$Mn.set(e, new TimeStopData(n, t, i === Protocol_1.Aki.Protocol.kks.Proto_SceneItem));
    }
  }
  JMn() {
    for (var [e] of this.$Mn) {
      this.ZMn(e);
    }
    this.$Mn.clear();
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.eEn)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.eEn);
      this.YMn.clear();
    }
  }
  ZMn(e) {
    var t = this.$Mn.get(e);
    if (t) {
      t.TimeScaleComponent.RemoveTimeScale(t.TimeScaleId);
      if (t.IsSceneItem) {
        e.Entity.GetComponent(208)?.RemoveTag(-1201477412);
      } else {
        e.Entity.GetComponent(222)?.RemoveBuff(TIME_STOP_BUFF_ID, -1, "TimeStopMachine");
      }
    }
  }
  iEn() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.eEn)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.eEn);
    }
  }
};
SceneItemTimeStopMachineComponent = SceneItemTimeStopMachineComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(226)], SceneItemTimeStopMachineComponent);
exports.SceneItemTimeStopMachineComponent = SceneItemTimeStopMachineComponent; //# sourceMappingURL=SceneItemTimeStopMachineComponent.js.map