"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMonsterGachaBaseComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbMonsterFormation_1 = require("./FbMonsterFormation");
const FbMonsterGachaSlot_1 = require("./FbMonsterGachaSlot");
class FbMonsterGachaBaseComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Qvh = false;
    this.Kvh = undefined;
    this.bSh = false;
    this.TAe = undefined;
    this.Z7h = false;
    this.eWh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMonsterGachaBaseComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get MonsterEntityIds() {
    if (!this.Qvh) {
      this.Qvh = true;
      this.Kvh = new Array();
      var s = this.FbDataInternal.monsterEntityIdsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.Kvh.push(this.FbDataInternal.monsterEntityIds(t));
        }
      }
    }
    return this.Kvh;
  }
  get Config() {
    if (!this.bSh) {
      this.bSh = true;
      this.TAe = new Array();
      var s = this.FbDataInternal.configLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          var i = this.FbDataInternal.config(t, new fb_component_1.MonsterGachaSlot());
          this.TAe.push(FbMonsterGachaSlot_1.FbMonsterGachaSlot.Create(i));
        }
      }
    }
    return this.TAe;
  }
  get Formation() {
    if (!this.Z7h) {
      this.Z7h = true;
      this.eWh = new Array();
      var s = this.FbDataInternal.formationLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          var i = this.FbDataInternal.formation(t, new fb_component_1.MonsterFormation());
          this.eWh.push(FbMonsterFormation_1.FbMonsterFormation.Create(i));
        }
      }
    }
    return this.eWh;
  }
}
exports.FbMonsterGachaBaseComponent = FbMonsterGachaBaseComponent;
//# sourceMappingURL=FbMonsterGachaBaseComponent.js.map