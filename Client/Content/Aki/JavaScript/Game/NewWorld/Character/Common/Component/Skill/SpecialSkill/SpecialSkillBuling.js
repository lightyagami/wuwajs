"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillBuling = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const CharacterAttributeTypes_1 = require("../../Abilities/CharacterAttributeTypes");
const SpecialSkillBase_1 = require("./SpecialSkillBase");
const SLOT_COUNT = 4;
const SLOT_BITS = 2;
const SLOT_MASK = (1 << SLOT_BITS) - 1;
const slotSpecialEnergyType = CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1;
class SpecialSkillBuling extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments);
    this.Jh = undefined;
    this.$te = undefined;
    this.Xte = undefined;
    this.n$t = undefined;
    this.ewu = [];
    this.gFd = undefined;
    this.CFd = false;
    this.pFd = undefined;
    this.vFd = [];
    this._yo = (t, i, e) => {
      if (i === 0 && this.ewu.length !== 0 && (this.ewu.length = 0, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Battle", 67, "SpecialSkillBuling 卜灵特殊能量被清空");
      }
    };
  }
  OnStart() {
    this.Jh = this.SpecialSkillComponent.Entity;
    this.$te = this.Jh.GetComponent(183);
    this.Xte = this.Jh.GetComponent(205);
    this.n$t = this.Jh.CheckGetComponent(3);
    this.fwu();
    if (this.n$t?.IsRoleAndCtrlByMe) {
      if (this.$te) {
        this.$te.AddListener(slotSpecialEnergyType, this._yo);
        this.CFd = true;
      }
      this.yFd();
      this.SFd();
    }
  }
  OnEnd() {
    if (this.CFd) {
      this.$te?.RemoveListener(slotSpecialEnergyType, this._yo);
    }
  }
  fwu() {
    this.ewu.length = 0;
    var i = this.$te?.GetCurrentValue(slotSpecialEnergyType) ?? 0;
    for (let t = 0; t < SLOT_COUNT; t++) {
      var e = (SLOT_COUNT - t - 1) * SLOT_BITS;
      var e = (i & SLOT_MASK << e) >> e;
      this.vFd.push(0);
      if (e > 0) {
        this.ewu.push(e);
        if (e = this.MFd(t, e)) {
          this.Xte?.AddTag(e);
        }
        this.vFd[t] = e;
      }
    }
  }
  ModifySlotSpecialEnergy(t) {
    var i;
    var e = t[1];
    if (e !== undefined && CharacterAttributeTypes_1.specialEnergyIds.includes(e)) {
      if ((i = t[2]) === undefined || i < 0 || i >= 3) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "SpecialSkillBuling 槽位型特殊能量标记值不合法", ["slotEnergyType", i]);
        }
      } else if (i === 0) {
        t = t[3] ?? 1;
        this.RemoveSlotSpecialEnergy(e, t);
      } else {
        this.AddSlotSpecialEnergy(e, i);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "SpecialSkillBuling 槽位型特殊能量Id不合法", ["specialEnergyId", e]);
    }
  }
  AddSlotSpecialEnergy(t, i) {
    if (this.ewu.length === SLOT_COUNT) {
      this.ewu.shift();
    }
    this.ewu.push(i);
    this.SFd();
    this.gwu();
  }
  RemoveSlotSpecialEnergy(t, i = 1) {
    for (let t = 0; t < i; t++) {
      if (this.ewu.length > 0) {
        this.ewu.pop();
      }
    }
    this.SFd();
    this.gwu();
  }
  gwu() {
    let t = 0;
    for (const i of this.ewu) {
      t = (t <<= SLOT_BITS) + i;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "SpecialSkillBuling", ["卜灵特殊能量", this.ewu], ["", t]);
    }
    this.$te?.SetBaseValue(slotSpecialEnergyType, t);
  }
  GetSpecialEnergyType(t) {
    return this.ewu[t] ?? 0;
  }
  yFd() {
    var t;
    if (!this.gFd) {
      this.gFd = new Map();
      t = 2 + (1 << SLOT_BITS);
      this.gFd.set(t, -763924872);
      t = 1 + (2 << SLOT_BITS);
      this.gFd.set(t, -1011739628);
      t = 1 + (1 << SLOT_BITS);
      this.gFd.set(t, -1546961632);
      t = 2 + (2 << SLOT_BITS);
      this.gFd.set(t, 1061036332);
      this.gFd.set(1, 726762077);
      this.gFd.set(2, -1605189918);
      this.gFd.set(0, 481974939);
    }
  }
  EFd() {
    var t;
    if (this.ewu.length === 0) {
      return this.gFd?.get(0);
    } else if (this.ewu.length === 1) {
      return this.gFd?.get(this.ewu[0]);
    } else {
      t = this.ewu.length - 1;
      t = (this.ewu[t - 1] << SLOT_BITS) + this.ewu[t];
      return this.gFd?.get(t);
    }
  }
  SFd() {
    var t = this.EFd();
    if (!t && this.pFd || t) {
      this.Xte?.RemoveTag(this.pFd);
      this.pFd = undefined;
    }
    if (t) {
      this.Xte?.AddTag(t);
      this.pFd = t;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "SpecialSkillBuling", ["卜灵特殊能量Tag", this.pFd]);
    }
    for (let t = 0; t < SLOT_COUNT; t++) {
      var i = this.vFd[t];
      var e = this.MFd(t, this.ewu[t] ?? 0);
      if (!i || i !== e) {
        if (i) {
          this.Xte?.RemoveTag(i);
        }
        if (e) {
          this.Xte?.AddTag(e);
        }
        this.vFd[t] = e;
      }
    }
  }
  MFd(t, i) {
    if (i === 1) {
      switch (t) {
        case 0:
          return -684077214;
        case 1:
          return 1503565066;
        case 2:
          return -2131570346;
        case 3:
          return -1330179523;
      }
    } else if (i === 2) {
      switch (t) {
        case 0:
          return 1362022063;
        case 1:
          return -963438012;
        case 2:
          return -1745025559;
        case 3:
          return 498792026;
      }
    }
    return 0;
  }
}
exports.SpecialSkillBuling = SpecialSkillBuling;
//# sourceMappingURL=SpecialSkillBuling.js.map