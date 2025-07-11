"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcPerformComponent = undefined;
const FbNpcAwakeShow_1 = require("./FbNpcAwakeShow");
const FbNpcBumpShow_1 = require("./FbNpcBumpShow");
const FbNpcDeathInteract_1 = require("./FbNpcDeathInteract");
const FbNpcHitShow_1 = require("./FbNpcHitShow");
const FbNpcPerformOnInteract_1 = require("./FbNpcPerformOnInteract");
const FbNpcPerformOnMonsterCloseby_1 = require("./FbNpcPerformOnMonsterCloseby");
const FbNpcPerformState_1 = require("./FbNpcPerformState");
const UnionNpcRideInVehiclePerformTypeHelper_1 = require("./UnionNpcRideInVehiclePerformTypeHelper");
const UnionNpcStandbyShowOptionHelper_1 = require("./UnionNpcStandbyShowOptionHelper");
const UnionNpcUiInteractOptionHelper_1 = require("./UnionNpcUiInteractOptionHelper");
const UnionSpecialNpcPerformTypeHelper_1 = require("./UnionSpecialNpcPerformTypeHelper");
class FbNpcPerformComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.o4h = false;
    this.n4h = undefined;
    this.s4h = false;
    this.a4h = false;
    this.h4h = false;
    this.l4h = undefined;
    this._4h = false;
    this.c4h = false;
    this.u4h = false;
    this.d4h = undefined;
    this.SO1 = false;
    this.MO1 = undefined;
    this.m4h = false;
    this.C4h = undefined;
    this.g4h = false;
    this.f4h = undefined;
    this.p4h = false;
    this.v4h = undefined;
    this.y4h = false;
    this.S4h = undefined;
    this.M4h = false;
    this.E4h = undefined;
    this.I4h = false;
    this.T4h = undefined;
    this.b4h = false;
    this.L4h = undefined;
    this.A4h = false;
    this.x4h = false;
  }
  static Create(t) {
    if (t) {
      return new FbNpcPerformComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get SpecialNpcPerformConfig() {
    var t;
    var i;
    if (!this.o4h && (this.o4h = true, t = this.FbDataInternal.specialNpcPerformConfigType(), i = UnionSpecialNpcPerformTypeHelper_1.UnionSpecialNpcPerformTypeHelper.GetUnionSpecialNpcPerformTypeObject(t))) {
      this.n4h = UnionSpecialNpcPerformTypeHelper_1.UnionSpecialNpcPerformTypeHelper.ReadUnionSpecialNpcPerformType(t, this.FbDataInternal.specialNpcPerformConfig(i));
    }
    return this.n4h;
  }
  get IsStare() {
    if (!this.s4h) {
      this.s4h = true;
      this.a4h = this.FbDataInternal.isStare();
    }
    return this.a4h;
  }
  get NpcHitShow() {
    if (!this.h4h) {
      this.h4h = true;
      this.l4h = FbNpcHitShow_1.FbNpcHitShow.Create(this.FbDataInternal.npcHitShow());
    }
    return this.l4h;
  }
  get IsShowStrike() {
    if (!this._4h) {
      this._4h = true;
      this.c4h = this.FbDataInternal.isShowStrike();
    }
    return this.c4h;
  }
  get NpcBumpShow() {
    if (!this.u4h) {
      this.u4h = true;
      this.d4h = FbNpcBumpShow_1.FbNpcBumpShow.Create(this.FbDataInternal.npcBumpShow());
    }
    return this.d4h;
  }
  get ShowOnAwake() {
    if (!this.SO1) {
      this.SO1 = true;
      this.MO1 = FbNpcAwakeShow_1.FbNpcAwakeShow.Create(this.FbDataInternal.showOnAwake());
    }
    return this.MO1;
  }
  get ShowOnStandby() {
    var t;
    var i;
    if (!this.m4h && (this.m4h = true, t = this.FbDataInternal.showOnStandbyType(), i = UnionNpcStandbyShowOptionHelper_1.UnionNpcStandbyShowOptionHelper.GetUnionNpcStandbyShowOptionObject(t))) {
      this.C4h = UnionNpcStandbyShowOptionHelper_1.UnionNpcStandbyShowOptionHelper.ReadUnionNpcStandbyShowOption(t, this.FbDataInternal.showOnStandby(i));
    }
    return this.C4h;
  }
  get ShowOnInteract() {
    if (!this.g4h) {
      this.g4h = true;
      this.f4h = FbNpcPerformOnInteract_1.FbNpcPerformOnInteract.Create(this.FbDataInternal.showOnInteract());
    }
    return this.f4h;
  }
  get ShowOnUiInteract() {
    var t;
    var i;
    if (!this.p4h && (this.p4h = true, t = this.FbDataInternal.showOnUiInteractType(), i = UnionNpcUiInteractOptionHelper_1.UnionNpcUiInteractOptionHelper.GetUnionNpcUiInteractOptionObject(t))) {
      this.v4h = UnionNpcUiInteractOptionHelper_1.UnionNpcUiInteractOptionHelper.ReadUnionNpcUiInteractOption(t, this.FbDataInternal.showOnUiInteract(i));
    }
    return this.v4h;
  }
  get ShowOnRideInVehicle() {
    if (!this.y4h) {
      this.y4h = true;
      this.S4h = new Array();
      var i = this.FbDataInternal.showOnRideInVehicleLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.showOnRideInVehicleType(t);
          var r = UnionNpcRideInVehiclePerformTypeHelper_1.UnionNpcRideInVehiclePerformTypeHelper.GetUnionNpcRideInVehiclePerformTypeObject(e);
          if (r && (e = UnionNpcRideInVehiclePerformTypeHelper_1.UnionNpcRideInVehiclePerformTypeHelper.ReadUnionNpcRideInVehiclePerformType(e, this.FbDataInternal.showOnRideInVehicle(t, r))) !== undefined) {
            this.S4h.push(e);
          }
        }
      }
    }
    return this.S4h;
  }
  get NpcMonsterClosePerform() {
    if (!this.M4h) {
      this.M4h = true;
      this.E4h = FbNpcPerformOnMonsterCloseby_1.FbNpcPerformOnMonsterCloseby.Create(this.FbDataInternal.npcMonsterClosePerform());
    }
    return this.E4h;
  }
  get NpcPerformState() {
    if (!this.I4h) {
      this.I4h = true;
      this.T4h = FbNpcPerformState_1.FbNpcPerformState.Create(this.FbDataInternal.npcPerformState());
    }
    return this.T4h;
  }
  get DeathInteract() {
    if (!this.b4h) {
      this.b4h = true;
      this.L4h = FbNpcDeathInteract_1.FbNpcDeathInteract.Create(this.FbDataInternal.deathInteract());
    }
    return this.L4h;
  }
  get FixedPosition() {
    if (!this.A4h) {
      this.A4h = true;
      this.x4h = this.FbDataInternal.fixedPosition();
    }
    return this.x4h;
  }
}
exports.FbNpcPerformComponent = FbNpcPerformComponent;
//# sourceMappingURL=FbNpcPerformComponent.js.map