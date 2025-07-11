"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var r;
  var n = arguments.length;
  var s = n < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, o, i);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (r = t[h]) {
        s = (n < 3 ? r(s) : n > 3 ? r(e, o, s) : r(e, o)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(e, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterFollowComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const SummonCfgById_1 = require("../../../../../Core/Define/ConfigQuery/SummonCfgById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../Module/Phantom/PhantomUtil");
var EProtoSummonType = Protocol_1.Aki.Protocol.Summon.x3s;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
let CharacterFollowComponent = class CharacterFollowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.u1t = undefined;
    this.v5r = [];
    this.RJl = 0;
    this.PJl = false;
  }
  get FollowIds() {
    return this.v5r;
  }
  OnStart() {
    this.u1t = this.Entity.GetComponent(0);
    return true;
  }
  OnActivate() {
    this.fJs();
    return true;
  }
  OnEnd() {
    this.DeleteFollowEntity();
    return true;
  }
  kZl(t) {
    this.RJl = t;
    if (this.RJl !== 0 && (t = EntitySystem_1.EntitySystem.Get(this.RJl)?.GetComponent(95))) {
      this.Entity.GetComponent(40)?.ResetRoleGrowComponent(t);
    }
  }
  GetRoleActor() {
    var t = EntitySystem_1.EntitySystem.Get(this.RJl);
    if (t?.Valid) {
      return t.GetComponent(1).Owner;
    }
  }
  GetFollowActor() {
    var t = this.v5r;
    var e = UE.NewArray(UE.Actor);
    if (t) {
      for (const i of t) {
        var o = EntitySystem_1.EntitySystem.Get(i);
        if (o?.Valid && (o = o.GetComponent(1).Owner)) {
          e.Add(o);
        }
      }
    }
    return e;
  }
  SetFollowId(t) {
    if (this.v5r.indexOf(t) !== -1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 22, "Add the Same Summon Id:", ["id", t]);
      }
    } else {
      this.v5r.push(t);
    }
  }
  DeleteFollowEntity() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.u1t.GetSummonerId());
    if (t?.Valid) {
      t.Entity.GetComponent(56).pJs(this.Entity.Id);
    }
  }
  GetAttributeHolder() {
    if (this.RJl !== 0) {
      var t = EntitySystem_1.EntitySystem.Get(this.RJl);
      if (t?.Valid) {
        return t;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 20, "FollowComp role is inValid", ["Id", this.RJl], ["SelfId", this.u1t?.GetCreatureDataId()]);
      }
    }
  }
  GetAttributeHolderExceptVisionSummon() {
    if (!this.PJl) {
      return this.GetAttributeHolder();
    }
  }
  Reset(t = 0) {
    this.pJs(t);
    this.RJl = 0;
  }
  GetToRoleDistance() {
    var t;
    if (this.RJl && (t = EntitySystem_1.EntitySystem.Get(this.RJl)) && this.Entity && this.Entity.GetComponent(1) && t.GetComponent(1)) {
      return UE.VectorDouble.Dist(this.Entity.GetComponent(1).ActorLocation, t.GetComponent(1).ActorLocation);
    } else {
      return -1;
    }
  }
  fJs() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.u1t.GetSummonerId());
    if (t?.Valid) {
      if (this.u1t.SummonType === EProtoSummonType.Proto_ESummonTypeConcomitantVision) {
        if ((e = this.u1t.GetVisionComponent()) && (e = PhantomUtil_1.PhantomUtil.GetVisionData(e.VisionId))) {
          this.PJl = e.类型 === 0;
        }
        this.OZl(t);
      } else if (this.u1t.SummonType === EProtoSummonType.Proto_ESummonTypeConcomitantCustom && this.u1t.SummonCfgId && SummonCfgById_1.configSummonCfgById.GetConfig(this.u1t.SummonCfgId)?.ShareDamage) {
        this.OZl(t);
      }
      var e;
      var o = this.Entity.GetComponent(205);
      if (o) {
        o.RemoveTag(-1615796724);
        switch (this.u1t?.SummonType) {
          case EProtoSummonType.Proto_ESummonTypeConcomitantVision:
            o.AddTag(-1885259054);
            break;
          case EProtoSummonType.Proto_ESummonTypeConcomitantCustom:
            o.AddTag(231190961);
            break;
          case EProtoSummonType.Proto_ESummonTypeConcomitantPhantomRole:
            o.AddTag(-260700306);
            break;
          default:
            EProtoSummonType.Proto_ESummonTypeDefault;
            o.AddTag(1450201850);
        }
      }
    }
  }
  pJs(t) {
    if (t !== 0) {
      if ((t = this.v5r.indexOf(t)) !== -1) {
        this.v5r.splice(t, 1);
      }
    } else {
      this.v5r = [];
    }
  }
  OZl(t) {
    this.kZl(t.Id);
    t.Entity.GetComponent(56).SetFollowId(this.Entity.Id);
    EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.OnCharacterSetMaster, t.Id);
  }
};
CharacterFollowComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(56)], CharacterFollowComponent);
exports.CharacterFollowComponent = CharacterFollowComponent; //# sourceMappingURL=CharacterFollowComponent.js.map