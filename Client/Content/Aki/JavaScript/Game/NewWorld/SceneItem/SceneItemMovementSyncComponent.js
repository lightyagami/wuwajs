"use strict";

var __decorate = this && this.__decorate || function (e, t, o, r) {
  var n;
  var a = arguments.length;
  var i = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, o, r);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (n = e[s]) {
        i = (a < 3 ? n(i) : a > 3 ? n(t, o, i) : n(t, o)) || i;
      }
    }
  }
  if (a > 3 && i) {
    Object.defineProperty(t, o, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemMovementSyncComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Event_1 = require("../../../Core/Event/Event");
const Net_1 = require("../../../Core/Net/Net");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatLog_1 = require("../../Utils/CombatLog");
const BaseMovementSyncComponent_1 = require("../Character/Common/Component/BaseMovementSyncComponent");
var ESceneItemParamKey = Protocol_1.Aki.Protocol.Ww_;
const INVALID_ID = 0;
let SceneItemMovementSyncComponent = class SceneItemMovementSyncComponent extends BaseMovementSyncComponent_1.BaseMovementSyncComponent {
  constructor() {
    super(...arguments);
    this.Fpl = 0;
    this.rLl = new Map();
    this.oLl = new Event_1.Event(EventDefine_1.EEventName, 0);
  }
  OnInitData(e) {
    super.OnInitData();
    e = e.ComponentDataMap.get("Yys")?.Yys;
    if (e) {
      this.ModifyBlackboardFromRemote(e.CI_);
    }
    return true;
  }
  OnStart() {
    super.OnStart();
    this.SetAutonomousId(this.CreatureDataComp?.AutonomousId ?? INVALID_ID);
    var e = this.CreatureDataComp?.ComponentDataMap.get("Yys")?.Yys;
    if (e) {
      this.ModifyBlackboardFromRemote(e.CI_);
    }
    return true;
  }
  SetAutonomousId(e) {
    var e = e ?? INVALID_ID;
    var t = this.Fpl;
    var o = (this.Fpl = e) !== INVALID_ID;
    var r = ModelManager_1.ModelManager.CreatureModel?.GetPlayerId();
    var t = r === t;
    var r = o && r === e;
    this.ActorComp?.SetAutonomous(this.ActorComp.IsAutonomousProxy, r);
    this.SetEnableMovementSync(o, "SceneItemManipulatableComponent.SetAutonomousId");
    if (t != r) {
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSwitchMoveControl, r);
    }
  }
  GetAutonomousId() {
    return this.Fpl;
  }
  HasMoveController() {
    return this.Fpl !== INVALID_ID;
  }
  HasMoveAuthority() {
    return this.ActorComp?.IsMoveAutonomousProxy ?? false;
  }
  nLl(e, t, o, r) {
    this.rLl.set(e, t);
    this.oLl.Emit(e, t, o, r ?? "");
  }
  ListenBlackboard(e, t) {
    this.oLl.Add(e, t);
  }
  RemoveBlackboardListener(e, t) {
    this.oLl.Remove(e, t);
  }
  ModifyBlackboardFromRemote(e, t = false) {
    if (t) {
      for (var [o] of this.rLl) {
        this.nLl(o, undefined, true, "ModifyStateFromRemote");
      }
      this.rLl.clear();
    } else {
      for (const a of e) {
        var r = a.e5n;
        var n = a.Z4n;
        if (r === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Level", 19, "ModifyStateFromRemote blackboardType is undefined", ["Entity Id", this.Entity.Id], ["blackboards", e]);
          }
        } else {
          let e = undefined;
          switch (r) {
            case "V8n":
            case "vKn":
            case "MKn":
            case "j8n":
              e = a[r];
              break;
            case "CKn":
            case "SKn":
              e = a[r] ? [...a[r].gKn] : undefined;
              break;
            case "fKn":
              e = a[r] ? MathUtils_1.MathUtils.LongToNumber(a[r]) : undefined;
              break;
            case "pKn":
              e = a[r]?.gKn.map(e => MathUtils_1.MathUtils.LongToNumber(e));
              break;
            case "yKn":
              e = a[r] ? Vector_1.Vector.Create(a[r]) : undefined;
              break;
            case "TKn":
              e = a[r] ? Rotator_1.Rotator.Create(a[r]) : undefined;
          }
          this.nLl(n, e, true, "ModifyStateFromRemote");
        }
      }
    }
  }
  GetBlackboard(e) {
    return this.rLl.get(e);
  }
  ModifyBlackboard(e, t, o) {
    if (!this.HasMoveAuthority()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 19, "[ModifyState] 尝试设置状态但没有移动控制权", ["creatureId", this.CreatureDataComp?.GetCreatureDataId()], ["entityId", this.Entity.Id], ["pbDataId", this.CreatureDataComp?.GetPbDataId()], ["stateType", e], ["stateId", t], ["reason", o]);
      }
      return false;
    }
    this.nLl(e, t, false, o);
    var r = Protocol_1.Aki.Protocol.Cp_.create();
    r.F4n = this.CreatureDataComp?.GetCreatureDataId() ?? INVALID_ID;
    var n = Protocol_1.Aki.Protocol.Fw_.create();
    if ((n.Z4n = e) !== ESceneItemParamKey.Proto_SceneItemBBKey_ManipulatableState) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 19, "[ModifyState] 未知的黑板值字段", ["creatureId", this.CreatureDataComp?.GetCreatureDataId()], ["entityId", this.Entity.Id], ["pbDataId", this.CreatureDataComp?.GetPbDataId()], ["stateType", e], ["stateId", t], ["reason", o]);
      }
      return false;
    } else {
      n.V8n = t;
      n.e5n = "V8n";
      r.C6n = [n];
      Net_1.Net.Call(24851, r, () => {});
      this.CollectSampleAndSend(true);
      return true;
    }
  }
};
SceneItemMovementSyncComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(158)], SceneItemMovementSyncComponent);
exports.SceneItemMovementSyncComponent = SceneItemMovementSyncComponent; //# sourceMappingURL=SceneItemMovementSyncComponent.js.map