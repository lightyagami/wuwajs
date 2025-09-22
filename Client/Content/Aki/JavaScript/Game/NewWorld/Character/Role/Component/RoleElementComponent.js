"use strict";

var __decorate = this && this.__decorate || function (t, e, i, n) {
  var s;
  var o = arguments.length;
  var r = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, n);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        r = (o < 3 ? s(r) : o > 3 ? s(e, i, r) : s(e, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleElementComponent = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController");
const PhantomUtil_1 = require("../../../../Module/Phantom/PhantomUtil");
const CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds");
const RoleQteComponent_1 = require("./RoleQteComponent");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
let RoleElementComponent = class RoleElementComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.n$t = undefined;
    this.$te = undefined;
    this.m1t = undefined;
    this.Gin = undefined;
    this.Xte = undefined;
    this.Nin = false;
    this.TriggerEnergy = 0;
    this.jAl = 0;
    this.o$e = (t, e, i) => {
      this.Fin(e);
      var n = this.RoleElementType;
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnElementEnergyChanged, n, e, i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharOnElementEnergyChanged, n, e, i);
    };
    this.I3r = t => {
      if (FormationDataController_1.FormationDataController.GlobalIsInFight) {
        this.Nin = true;
      }
    };
    this.Zpe = t => {
      if (!(this.Nin = t)) {
        this.kin = false;
      }
    };
    this.Vin = () => {
      if (this.Nin) {
        this.Fin(this.RoleElementEnergy);
        this.Nin = false;
      }
    };
    this.g7r = () => {
      if (this.n$t?.IsAutonomousProxy) {
        this.ClearElementEnergy(this.Entity);
      }
    };
    this.Jze = () => {
      if (this.n$t?.IsAutonomousProxy) {
        this.ClearElementEnergy(this.Entity);
      }
    };
  }
  OnStart() {
    this.n$t = this.Entity.GetComponent(3);
    this.$te = this.Entity.GetComponent(174);
    this.m1t = this.Entity.GetComponent(175);
    this.Xte = this.Entity.CheckGetComponent(206);
    this.$te.AddListener(EAttributeId.Proto_ElementEnergy, this.o$e, "RoleElementComponent");
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRevive, this.g7r);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharHitLocal, this.Vin);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitLocal, this.Vin);
    this.Gin = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom);
    var t = this.Gin?.Entity;
    if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharHitLocal, this.Vin)) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharHitLocal, this.Vin);
    }
    return this.Nin = true;
  }
  OnEnd() {
    this.$te.RemoveListener(EAttributeId.Proto_ElementEnergy, this.o$e);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRevive, this.g7r);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharHitLocal, this.Vin);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitLocal, this.Vin);
    if (this.Gin?.Valid) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Gin.Entity, EventDefine_1.EEventName.CharHitLocal, this.Vin);
    }
    this.Gin = undefined;
    return !(this.Nin = false);
  }
  set kin(t) {
    if (this.kin !== t && this.n$t?.IsAutonomousProxy) {
      if (t) {
        t = (0, FormationDataController_1.isBattleMulti)();
        this.jAl = t ? CharacterBuffIds_1.buffId.ActivateMultiQte : CharacterBuffIds_1.buffId.ActivateQte;
        this.m1t.AddBuff(this.jAl, {
          InstigatorId: this.m1t.CreatureDataId,
          Reason: "RoleElementComponent获取激活QTE的Tag"
        });
        if (t) {
          this.JPa();
        }
      } else {
        this.m1t.RemoveBuff(this.jAl, -1, "RoleElementComponent移除激活QTE的Tag");
      }
    }
  }
  get kin() {
    return this.Xte.HasExactTag(166024319);
  }
  get RoleElementType() {
    return this.$te.GetCurrentValue(EAttributeId.Proto_ElementPropertyType);
  }
  get RoleElementEnergy() {
    return this.$te.GetCurrentValue(EAttributeId.Proto_ElementEnergy);
  }
  get RoleElementEnergyMax() {
    return this.$te.GetCurrentValue(EAttributeId.Proto_ElementEnergyMax);
  }
  Fin(t) {
    if (t >= this.TriggerEnergy - Number.EPSILON) {
      t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Entity.Id, {
        ParamType: 1
      })?.IsControl();
      if (!this.kin && t && FormationDataController_1.FormationDataController.GlobalIsInFight) {
        this.kin = true;
        this.m1t.TriggerEvents(9, this.m1t, {
          ElementType: this.RoleElementType
        });
      }
    } else {
      this.kin = false;
    }
  }
  TriggerEvents(t) {
    var t = t.GetComponent(92);
    var e = {
      ElementType: this.RoleElementType,
      ElementType2: t
    };
    this.m1t.TriggerEvents(10, t.m1t, e);
    t.m1t.TriggerEvents(13, this.m1t, e);
  }
  ClearElementEnergy(t, e = CharacterBuffIds_1.buffId.ElementClean) {
    this.m1t.AddBuff(e, {
      InstigatorId: t.GetComponent(0).GetCreatureDataId(),
      Reason: "ClearElementEnergy消耗元素能量"
    });
  }
  JPa() {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsInRange(this.n$t.ActorLocationProxy, RoleQteComponent_1.MAX_MULTI_QTE_DISTANCE).filter(t => !t.IsMyRole())) {
      t.EntityHandle?.Entity?.GetComponent(175)?.AddBuff(CharacterBuffIds_1.buffId.MultiQteGuide, {
        InstigatorId: this.m1t.CreatureDataId,
        Reason: "用于联机QTE引导提示"
      });
    }
  }
};
RoleElementComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(92)], RoleElementComponent);
exports.RoleElementComponent = RoleElementComponent; //# sourceMappingURL=RoleElementComponent.js.map