"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterNpcAttackHeadStateData = undefined;
const CharacterAttributeTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const HeadStateData_1 = require("./HeadStateData");
class MonsterNpcAttackHeadStateData extends HeadStateData_1.HeadStateData {
  constructor() {
    super(...arguments);
    this.Qgd = undefined;
    this.Kgd = undefined;
    this.Xgd = undefined;
    this.Ygd = undefined;
    this.zgd = undefined;
    this.Jgd = undefined;
    this.Zgd = undefined;
    this.e0d = undefined;
    this.t0d = undefined;
    this.i0d = undefined;
    this.r0d = undefined;
    this.o0d = undefined;
    this.n0d = undefined;
    this.Agd = (t, i, s) => {
      if (this.Zgd) {
        this.Zgd(t, i, s);
      }
    };
    this.xgd = (t, i) => {
      if (this.e0d) {
        this.e0d(t, i);
      }
    };
    this.Bgd = (t, i) => {
      if (this.t0d) {
        this.t0d(t, i);
      }
    };
    this.Ogd = (t, i) => {
      if (this.i0d) {
        this.i0d(t, i);
      }
    };
    this.Ggd = (t, i) => {
      if (this.r0d) {
        this.r0d(t, i);
      }
    };
    this.Ngd = (t, i) => {
      if (this.o0d) {
        this.o0d(t, i);
      }
    };
    this.jgd = (t, i) => {
      if (this.n0d) {
        this.n0d(t, i);
      }
    };
  }
  UnBindAllCallback() {
    super.UnBindAllCallback();
    this.Zgd = undefined;
    this.e0d = undefined;
    this.t0d = undefined;
    this.i0d = undefined;
    this.r0d = undefined;
    this.o0d = undefined;
    this.n0d = undefined;
  }
  AddEntityEvents() {
    super.AddEntityEvents();
    var t = this.Entity?.GetComponent(174);
    if (t?.Valid) {
      t.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4, this.Agd, "SpecialEnergy4.MonsterNpcAttackHeadState");
      t.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4Max, this.Agd, "SpecialEnergy4Max.HeadState");
    }
    var t = this.Entity?.GetComponent(206);
    if (t?.Valid) {
      this.Qgd = t.ListenForTagAddOrRemove(792676641, this.xgd);
      this.Kgd = t.ListenForTagAddOrRemove(-325960901, this.Bgd);
      this.Xgd = t.ListenForTagAddOrRemove(314261857, this.Ogd);
      this.Ygd = t.ListenForTagAddOrRemove(1921770646, this.Ggd);
      this.zgd = t.ListenForTagAddOrRemove(897633166, this.Ngd);
      this.Jgd = t.ListenForTagAddOrRemove(-1737347985, this.jgd);
    }
  }
  RemoveEntityEvents() {
    super.RemoveEntityEvents();
    var t = this.Entity?.GetComponent(174);
    if (t?.Valid) {
      t.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4, this.Agd);
      t.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4Max, this.Agd);
    }
    this.Kgd?.EndTask();
    this.Kgd = undefined;
    this.Qgd?.EndTask();
    this.Qgd = undefined;
    this.Xgd?.EndTask();
    this.Xgd = undefined;
    this.Ygd?.EndTask();
    this.Ygd = undefined;
    this.zgd?.EndTask();
    this.zgd = undefined;
    this.Jgd?.EndTask();
    this.Jgd = undefined;
  }
  BindOnSpecialEnergy4Changed(t) {
    this.Zgd = t;
  }
  BindOnSlowChargeStateChanged(t) {
    this.e0d = t;
  }
  BindOnFastChargeStateChanged(t) {
    this.t0d = t;
  }
  BindOnAttackReadyStateChanged(t) {
    this.i0d = t;
  }
  BindOnAttackBeginStateChanged(t) {
    this.r0d = t;
  }
  BindOnAttackEndStateChanged(t) {
    this.o0d = t;
  }
  BindOnAttackBrokenStateChanged(t) {
    this.n0d = t;
  }
}
exports.MonsterNpcAttackHeadStateData = MonsterNpcAttackHeadStateData;
//# sourceMappingURL=MonsterNpcAttackHeadStateData.js.map