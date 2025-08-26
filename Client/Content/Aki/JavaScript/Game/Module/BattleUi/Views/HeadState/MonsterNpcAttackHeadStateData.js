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
    this.y1d = undefined;
    this.S1d = undefined;
    this.M1d = undefined;
    this.E1d = undefined;
    this.I1d = undefined;
    this.T1d = undefined;
    this.b1d = undefined;
    this.R1d = undefined;
    this.w1d = undefined;
    this.L1d = undefined;
    this.P1d = undefined;
    this.A1d = undefined;
    this.D1d = undefined;
    this.o1d = (t, i, s) => {
      if (this.b1d) {
        this.b1d(t, i, s);
      }
    };
    this.s1d = (t, i) => {
      if (this.R1d) {
        this.R1d(t, i);
      }
    };
    this.h1d = (t, i) => {
      if (this.w1d) {
        this.w1d(t, i);
      }
    };
    this._1d = (t, i) => {
      if (this.L1d) {
        this.L1d(t, i);
      }
    };
    this.c1d = (t, i) => {
      if (this.P1d) {
        this.P1d(t, i);
      }
    };
    this.m1d = (t, i) => {
      if (this.A1d) {
        this.A1d(t, i);
      }
    };
    this.g1d = (t, i) => {
      if (this.D1d) {
        this.D1d(t, i);
      }
    };
  }
  UnBindAllCallback() {
    super.UnBindAllCallback();
    this.b1d = undefined;
    this.R1d = undefined;
    this.w1d = undefined;
    this.L1d = undefined;
    this.P1d = undefined;
    this.A1d = undefined;
    this.D1d = undefined;
  }
  AddEntityEvents() {
    super.AddEntityEvents();
    var t = this.Entity?.GetComponent(174);
    if (t?.Valid) {
      t.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4, this.o1d, "SpecialEnergy4.MonsterNpcAttackHeadState");
      t.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4Max, this.o1d, "SpecialEnergy4Max.HeadState");
    }
    var t = this.Entity?.GetComponent(206);
    if (t?.Valid) {
      this.y1d = t.ListenForTagAddOrRemove(792676641, this.s1d);
      this.S1d = t.ListenForTagAddOrRemove(-325960901, this.h1d);
      this.M1d = t.ListenForTagAddOrRemove(314261857, this._1d);
      this.E1d = t.ListenForTagAddOrRemove(1921770646, this.c1d);
      this.I1d = t.ListenForTagAddOrRemove(897633166, this.m1d);
      this.T1d = t.ListenForTagAddOrRemove(-1737347985, this.g1d);
    }
  }
  RemoveEntityEvents() {
    super.RemoveEntityEvents();
    var t = this.Entity?.GetComponent(174);
    if (t?.Valid) {
      t.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4, this.o1d);
      t.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4Max, this.o1d);
    }
    this.S1d?.EndTask();
    this.S1d = undefined;
    this.y1d?.EndTask();
    this.y1d = undefined;
    this.M1d?.EndTask();
    this.M1d = undefined;
    this.E1d?.EndTask();
    this.E1d = undefined;
    this.I1d?.EndTask();
    this.I1d = undefined;
    this.T1d?.EndTask();
    this.T1d = undefined;
  }
  BindOnSpecialEnergy4Changed(t) {
    this.b1d = t;
  }
  BindOnSlowChargeStateChanged(t) {
    this.R1d = t;
  }
  BindOnFastChargeStateChanged(t) {
    this.w1d = t;
  }
  BindOnAttackReadyStateChanged(t) {
    this.L1d = t;
  }
  BindOnAttackBeginStateChanged(t) {
    this.P1d = t;
  }
  BindOnAttackEndStateChanged(t) {
    this.A1d = t;
  }
  BindOnAttackBrokenStateChanged(t) {
    this.D1d = t;
  }
}
exports.MonsterNpcAttackHeadStateData = MonsterNpcAttackHeadStateData;
//# sourceMappingURL=MonsterNpcAttackHeadStateData.js.map