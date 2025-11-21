"use strict";

var __decorate = this && this.__decorate || function (e, t, r, i) {
  var a;
  var o = arguments.length;
  var n = o < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, r) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, r, i);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (a = e[s]) {
        n = (o < 3 ? a(n) : o > 3 ? a(t, r, n) : a(t, r)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(t, r, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterDamageComponent = undefined;
const Time_1 = require("../../../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const BaseDamageComponent_1 = require("./BaseDamageComponent");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const CharacterDamageCalculations_1 = require("./CharacterDamageCalculations");
let CharacterDamageComponent = class CharacterDamageComponent extends BaseDamageComponent_1.BaseDamageComponent {
  constructor() {
    super(...arguments);
    this.ActorComponent = undefined;
    this.$br = undefined;
    this.HBr = undefined;
    this.o4o = undefined;
    this.eqr = 0;
    this.tqr = 0;
  }
  OnStart() {
    return !!super.OnStart() && (this.ActorComponent = this.Entity.CheckGetComponent(3), this.$br = this.Entity.CheckGetComponent(61), this.HBr = this.Entity.GetComponent(179), this.o4o = this.Entity.GetComponent(182), this.eqr = this.oqr(), true);
  }
  OnTick(e) {
    if ((this.o4o?.GravityDirect ?? Vector_1.Vector.DownVectorProxy).DotProduct(this.ActorComponent.ActorVelocityProxy) >= this.eqr) {
      if (this.tqr === 0) {
        this.tqr = Time_1.Time.WorldTimeSeconds;
      }
    } else {
      this.tqr = 0;
    }
  }
  FallInjure() {
    var e;
    var t;
    var r;
    var i;
    if (!this.TagComponent.HasTag(1918148596) && !!this.HBr?.IsInGame && !ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure && !this.TagComponent.HasTag(560942831) && !(e = (this.o4o?.GravityUp ?? Vector_1.Vector.UpVectorProxy).DotProduct(this.ActorComponent.ActorVelocityProxy), r = this.Pqr(), -e < this.eqr && (this.tqr = 0), t = this.tqr ? Time_1.Time.WorldTimeSeconds - this.tqr : 0, r = Math.ceil(this.xqr(-e, r, t)), this.Entity.GetComponent(117)?.DumpVelocityCacheInfo("跌落伤害处理"), r <= 0)) {
      i = this.CreatureDataComponent.GetCreatureDataId();
      this.Entity.GetComponent(68).CollectSampleAndSend();
      ControllerHolder_1.ControllerHolder.CreatureController.LandingDamageRequest(i, e, t * CommonDefine_1.MILLIONSECOND_PER_SECOND);
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnFallInjure, r, false);
      this.BuffComponent?.RemoveBuffByEffectType(36, "跌落伤害移除冰冻buff");
      this.$br.NeedCalculateFallInjure = false;
    }
  }
  xqr(e, t, r) {
    let i = 0;
    var a = this.AttributeComponent.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n);
    if ((i = this.CreatureDataComponent.IsRealMonster() ? CharacterDamageCalculations_1.Calculation.LandingDamageCalculationMonster(t, a) : CharacterDamageCalculations_1.Calculation.LandingDamageCalculationRole(e, r, a)) <= 0) {
      return 0;
    } else {
      return i;
    }
  }
  Pqr() {
    var e;
    var t;
    if (this.$br.NeedCalculateFallInjure && (e = this.$br.BeHitLocation.Z, (t = this.ActorComponent.ActorLocationProxy.Z) < e)) {
      return e - t;
    } else {
      return 0;
    }
  }
  oqr() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("landing_damage_args_role")[1];
  }
};
CharacterDamageComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(20)], CharacterDamageComponent);
exports.CharacterDamageComponent = CharacterDamageComponent; //# sourceMappingURL=CharacterDamageComponent.js.map