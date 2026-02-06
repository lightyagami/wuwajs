"use strict";

var __decorate = this && this.__decorate || function (t, e, r, o) {
  var i;
  var n = arguments.length;
  var s = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, r, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (i = t[h]) {
        s = (n < 3 ? i(s) : n > 3 ? i(e, r, s) : i(e, r)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(e, r, s);
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
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../Module/Phantom/PhantomUtil");
var EProtoSummonType = Protocol_1.Aki.Protocol.Summon.x3s;
let CharacterFollowComponent = class CharacterFollowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.u1t = undefined;
    this.YCg = [];
    this.zCg = 0;
    this.PJl = false;
  }
  get AttributeSharerIds() {
    return this.YCg;
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
    this.RemoveFromAttributeHolder();
    return true;
  }
  JCg(t) {
    this.zCg = t;
    if (this.zCg !== 0 && (t = EntitySystem_1.EntitySystem.Get(this.zCg)?.GetComponent(103))) {
      this.Entity.GetComponent(43)?.ResetRoleGrowComponent(t);
    }
  }
  GetRoleActor() {
    var t = EntitySystem_1.EntitySystem.Get(this.zCg);
    if (t?.Valid) {
      return t.GetComponent(1).Owner;
    }
  }
  GetAttributeSharerActors() {
    var t = this.YCg;
    var e = UE.NewArray(UE.Actor);
    if (t) {
      for (const o of t) {
        var r = EntitySystem_1.EntitySystem.Get(o);
        if (r?.Valid && (r = r.GetComponent(1).Owner)) {
          e.Add(r);
        }
      }
    }
    return e;
  }
  SetAttributeSharerId(t) {
    if (this.YCg.indexOf(t) !== -1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 22, "Add the Same Summon Id:", ["id", t]);
      }
    } else {
      this.YCg.push(t);
    }
  }
  RemoveFromAttributeHolder() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.u1t.GetSummonerId());
    if (t?.Valid) {
      t.Entity.GetComponent(61)?.ZCg(this.Entity.Id);
    }
  }
  GetAttributeHolder() {
    if (this.zCg !== 0) {
      var t = EntitySystem_1.EntitySystem.Get(this.zCg);
      if (t?.Valid) {
        return t;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 20, "FollowComp role is inValid", ["Id", this.zCg], ["SelfId", this.u1t?.GetPbDataId()]);
      }
    }
  }
  GetAttributeHolderExceptVisionSummon() {
    if (!this.PJl) {
      return this.GetAttributeHolder();
    }
  }
  Reset(t = 0) {
    this.ZCg(t);
    this.zCg = 0;
  }
  GetToRoleDistance() {
    var t;
    if (this.zCg && (t = EntitySystem_1.EntitySystem.Get(this.zCg)) && this.Entity && this.Entity.GetComponent(1) && t.GetComponent(1)) {
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
        this.SetRelationship(t);
      } else if (this.u1t.SummonType === EProtoSummonType.Proto_ESummonTypeConcomitantCustom && this.u1t.SummonCfgId && SummonCfgById_1.configSummonCfgById.GetConfig(this.u1t.SummonCfgId)?.ShareDamage) {
        this.SetRelationship(t);
      }
      var e;
      var r = this.Entity.GetComponent(217);
      if (r) {
        r.RemoveTag(-1615796724);
        switch (this.u1t?.SummonType) {
          case EProtoSummonType.Proto_ESummonTypeConcomitantVision:
            r.AddTag(-1885259054);
            break;
          case EProtoSummonType.Proto_ESummonTypeConcomitantCustom:
            r.AddTag(231190961);
            break;
          case EProtoSummonType.Proto_ESummonTypeConcomitantPhantomRole:
            r.AddTag(-260700306);
            break;
          default:
            EProtoSummonType.Proto_ESummonTypeDefault;
            r.AddTag(1450201850);
        }
      }
    }
  }
  ZCg(t) {
    if (t !== 0) {
      if ((t = this.YCg.indexOf(t)) !== -1) {
        this.YCg.splice(t, 1);
      }
    } else {
      this.YCg = [];
    }
  }
  SetRelationship(t) {
    this.JCg(t.Id);
    t.Entity.GetComponent(61).SetAttributeSharerId(this.Entity.Id);
    EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.OnCharacterSetMaster, t.Id);
  }
};
CharacterFollowComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(61)], CharacterFollowComponent);
exports.CharacterFollowComponent = CharacterFollowComponent; //# sourceMappingURL=CharacterFollowComponent.js.map