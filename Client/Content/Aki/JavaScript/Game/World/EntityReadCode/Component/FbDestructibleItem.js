"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDestructibleItem = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbActionInfo_1 = require("../Action/FbActionInfo");
const FbAimPart_1 = require("./FbAimPart");
const FbDurabilityStateConfig_1 = require("./FbDurabilityStateConfig");
const FbDurabilityWorn_1 = require("./FbDurabilityWorn");
const FbElementDamage_1 = require("./FbElementDamage");
const FbHitTimeScaleRatio_1 = require("./FbHitTimeScaleRatio");
const FbSkillDamage_1 = require("./FbSkillDamage");
const FbWeaponDamage_1 = require("./FbWeaponDamage");
const UnionHitBulletTypeHelper_1 = require("./UnionHitBulletTypeHelper");
const UnionMatchRoleOptionHelper_1 = require("../Match/UnionMatchRoleOptionHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbDestructibleItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.jGh = false;
    this.HGh = undefined;
    this.WGh = false;
    this.QGh = undefined;
    this.KGh = false;
    this.$Gh = undefined;
    this.XGh = false;
    this.YGh = undefined;
    this.J2h = false;
    this.Z2h = 0;
    this.e3h = false;
    this.t3h = 0;
    this.i3h = false;
    this.r3h = undefined;
    this.o3h = false;
    this.n3h = undefined;
    this.s3h = false;
    this.a3h = undefined;
    this.h3h = false;
    this.l3h = undefined;
    this._3h = false;
    this.c3h = undefined;
    this.u3h = false;
    this.d3h = undefined;
    this.m3h = false;
    this.C3h = undefined;
    this.qDh = false;
    this.PAe = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDestructibleItem(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get HitBullet() {
    var t;
    var i;
    if (!this.jGh && (this.jGh = true, t = this.FbDataInternal.hitBulletType(), i = UnionHitBulletTypeHelper_1.UnionHitBulletTypeHelper.GetUnionHitBulletTypeObject(t))) {
      this.HGh = UnionHitBulletTypeHelper_1.UnionHitBulletTypeHelper.ReadUnionHitBulletType(t, this.FbDataInternal.hitBullet(i));
    }
    return this.HGh;
  }
  get AttackerHitTimeScaleRatio() {
    if (!this.WGh) {
      this.WGh = true;
      this.QGh = FbHitTimeScaleRatio_1.FbHitTimeScaleRatio.Create(this.FbDataInternal.attackerHitTimeScaleRatio());
    }
    return this.QGh;
  }
  get VictimHitTimeScaleRatio() {
    if (!this.KGh) {
      this.KGh = true;
      this.$Gh = FbHitTimeScaleRatio_1.FbHitTimeScaleRatio.Create(this.FbDataInternal.victimHitTimeScaleRatio());
    }
    return this.$Gh;
  }
  get AimParts() {
    if (!this.XGh) {
      this.XGh = true;
      this.YGh = new Array();
      var i = this.FbDataInternal.aimPartsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.aimParts(t, new fb_component_1.AimPart());
          this.YGh.push(FbAimPart_1.FbAimPart.Create(e));
        }
      }
    }
    return this.YGh;
  }
  get DurabilityId() {
    if (!this.J2h) {
      this.J2h = true;
      this.Z2h = this.FbDataInternal.durabilityId();
    }
    return this.Z2h;
  }
  get Durability() {
    if (!this.e3h) {
      this.e3h = true;
      this.t3h = this.FbDataInternal.durability();
    }
    return this.t3h;
  }
  get DurabilityWorn() {
    if (!this.i3h) {
      this.i3h = true;
      this.r3h = FbDurabilityWorn_1.FbDurabilityWorn.Create(this.FbDataInternal.durabilityWorn());
    }
    return this.r3h;
  }
  get DurabilityStateConfig() {
    if (!this.o3h) {
      this.o3h = true;
      this.n3h = FbDurabilityStateConfig_1.FbDurabilityStateConfig.Create(this.FbDataInternal.durabilityStateConfig());
    }
    return this.n3h;
  }
  get HitPoint() {
    if (!this.s3h) {
      this.s3h = true;
      this.a3h = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.hitPoint());
    }
    return this.a3h;
  }
  get DestructionActions() {
    if (!this.h3h) {
      this.h3h = true;
      this.l3h = new Array();
      var i = this.FbDataInternal.destructionActionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.destructionActions(t, new fb_action_1.ActionInfo());
          this.l3h.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
      }
    }
    return this.l3h;
  }
  get SkillDamage() {
    if (!this._3h) {
      this._3h = true;
      this.c3h = FbSkillDamage_1.FbSkillDamage.Create(this.FbDataInternal.skillDamage());
    }
    return this.c3h;
  }
  get ElementDamage() {
    if (!this.u3h) {
      this.u3h = true;
      this.d3h = FbElementDamage_1.FbElementDamage.Create(this.FbDataInternal.elementDamage());
    }
    return this.d3h;
  }
  get WeaponDamage() {
    if (!this.m3h) {
      this.m3h = true;
      this.C3h = FbWeaponDamage_1.FbWeaponDamage.Create(this.FbDataInternal.weaponDamage());
    }
    return this.C3h;
  }
  get MatchRoleOption() {
    if (!this.qDh) {
      this.qDh = true;
      this.PAe = new Array();
      var i = this.FbDataInternal.matchRoleOptionLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.matchRoleOptionType(t);
          var s = UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.GetUnionMatchRoleOptionObject(e);
          if (s && (e = UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.ReadUnionMatchRoleOption(e, this.FbDataInternal.matchRoleOption(t, s))) !== undefined) {
            this.PAe.push(e);
          }
        }
      }
    }
    return this.PAe;
  }
}
exports.FbDestructibleItem = FbDestructibleItem;
//# sourceMappingURL=FbDestructibleItem.js.map