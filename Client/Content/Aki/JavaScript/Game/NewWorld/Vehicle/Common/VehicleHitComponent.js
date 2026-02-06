"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, o);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (s = t[a]) {
        n = (r < 3 ? s(n) : r > 3 ? s(e, i, n) : s(e, i)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleHitComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BaseHitComponent_1 = require("../../Character/Common/Component/BaseHitComponent");
let VehicleHitComponent = class VehicleHitComponent extends BaseHitComponent_1.BaseHitComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Qr_ = undefined;
    this.ph_ = undefined;
    this.vHr = undefined;
    this.hXs = undefined;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(247);
    this.Qr_ = this.Entity.GetComponent(19);
    this.ph_ = this.Entity.GetComponent(250);
    this.vHr = this.Entity.GetComponent(133);
    var t = this.Hte?.Actor.CharRenderingComponent;
    if (t) {
      this.hXs = new BaseHitComponent_1.OnHitMaterialAction(t, this.vHr);
    }
    return true;
  }
  OnHit(t, e) {
    var i = t.DamageId;
    if (i >= 1) {
      o = e.ContextId;
      this.Qr_?.ExecuteBulletDamage(t.BulletEntityId, {
        DamageDataId: i,
        SkillLevel: t.SkillLevel,
        Attacker: t.Attacker,
        DirectTarget: t.DirectTarget ?? this.Entity,
        HitPosition: t.HitPosition.ToUeVector(),
        IsAddEnergy: false,
        IsCounterAttack: false,
        ForceCritical: false,
        IsBlocked: false,
        PartId: -1,
        ExtraRate: 1,
        BulletId: t.BulletId
      }, o);
    }
    var i = this.ph_?.CheckCanPerformHit() ?? true;
    if (i) {
      this.ph_?.OnBulletHit(t, e);
      this.ProcessOnHitMaterial(t);
    }
    var o = e.AttackerCreatureDataComp?.GetCreatureDataId() ?? 0;
    this.HitRequest(e.Entity, o, t);
  }
  ProcessOnHitMaterial(e) {
    if (ModelManager_1.ModelManager.BulletModel.OpenHitMaterial && this.hXs) {
      var i = e.ReBulletData.Render.OnHitMaterialEffect;
      if (!StringUtils_1.StringUtils.IsNothing(i)) {
        var o = e.Attacker;
        var e = e.BulletEntityId;
        var s = o.Id;
        if (this.hXs.ComparePriority(e, s)) {
          this.hXs.Stop(true);
          let t = undefined;
          o = o?.GetComponent(1);
          if (o) {
            t = o?.GetReplaceEffect(i);
          }
          this.hXs.Start(t || i, ModelManager_1.ModelManager.BulletModel.OnHitMaterialMsDelay, e, s, undefined);
        }
      }
    }
  }
};
VehicleHitComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(301)], VehicleHitComponent);
exports.VehicleHitComponent = VehicleHitComponent; //# sourceMappingURL=VehicleHitComponent.js.map