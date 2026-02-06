"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var r = arguments.length;
  var a = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        a = (r < 3 ? h(a) : r > 3 ? h(e, i, a) : h(e, i)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterFightStateComponent = undefined;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
let CharacterFightStateComponent = class CharacterFightStateComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this._Xe = 0;
    this.rJo = undefined;
    this.CurrentState = 0;
    this.SubStatePriority = 0;
    this.IsLocal = false;
    this.WaitConfirm = false;
    this.CurrentHandle = 0;
  }
  OnStart() {
    this.rJo = this.Entity.GetComponent(186);
    return true;
  }
  PreSwitchRemoteFightState(t) {
    var e = t >> 8;
    var t = t & 255;
    var i = this.CheckSwitchState(e, t, false);
    if (!i) {
      CombatLog_1.CombatLog.Info("FightState", this.Entity, `预切换状态失败，${this.IF_(e, t)}，${this.TF_()}`);
    }
    return i;
  }
  TrySwitchHitState(t, e = false) {
    if (t === 12) {
      return this.TrySwitchState(6, 0, e);
    }
    if (t === 7) {
      return this.TrySwitchState(4, 0, e);
    }
    if (e && this.rJo.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
      return this.TrySwitchState(2, 2, e);
    }
    switch (t) {
      case 4:
      case 5:
        return this.TrySwitchState(2, 2, e);
      case 6:
        return this.TrySwitchState(2, 1, e);
    }
    return this.TrySwitchState(2, 0, e);
  }
  TrySwitchSkillState(t, e, i = false) {
    let s = t;
    if (s > 255) {
      s = 255;
    }
    if (e.OverrideType === 1) {
      return this.TrySwitchState(3, s, i);
    } else if (e.OverrideType === 2) {
      return this.TrySwitchState(5, s, i);
    } else if (e.OverrideType === 3) {
      return this.TrySwitchState(7, s, i);
    } else if (e.OverrideType === 4) {
      return this.TrySwitchState(9, s, i);
    } else {
      return this.TrySwitchState(1, s, i);
    }
  }
  CheckSwitchHitState(t, e = false) {
    if (t === 12) {
      return this.CheckSwitchState(6, 0, e);
    }
    if (t === 7) {
      return this.CheckSwitchState(4, 0, e);
    }
    if (e && this.rJo.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
      return this.CheckSwitchState(2, 2, e);
    }
    switch (t) {
      case 4:
      case 5:
        return this.CheckSwitchState(2, 2, e);
      case 6:
        return this.CheckSwitchState(2, 1, e);
    }
    return this.CheckSwitchState(2, 0, e);
  }
  SwitchHitState(t, e = false) {
    if (t === 12) {
      return this.p5r(6, 0, e);
    }
    if (t === 7) {
      return this.p5r(4, 0, e);
    }
    if (e && this.rJo.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
      return this.p5r(2, 2, e);
    }
    switch (t) {
      case 4:
      case 5:
        return this.p5r(2, 2, e);
      case 6:
        return this.p5r(2, 1, e);
    }
    return this.p5r(2, 0, e);
  }
  CheckSwitchState(t, e, i = false) {
    if (i) {
      return this.f5r(this.CurrentState, this.SubStatePriority, t, e);
    } else {
      return !this.WaitConfirm || !this.f5r(t, e, this.CurrentState, this.SubStatePriority);
    }
  }
  f5r(t, e, i, s) {
    if (i !== t) {
      return t < i;
    }
    if (s === e) {
      switch (i) {
        case 1:
        case 2:
        case 9:
        case 6:
          return true;
      }
    }
    return e < s;
  }
  TrySwitchState(t, e, i = false) {
    if (this.CheckSwitchState(t, e, i)) {
      this.p5r(t, e, i);
      return this.CurrentHandle;
    } else {
      CombatLog_1.CombatLog.Info("FightState", this.Entity, `切换${i ? "本地" : "远端"}主状态失败，${this.IF_(t, e)}，${this.TF_()}`);
      return 0;
    }
  }
  p5r(t, e, i = false) {
    this.CurrentState = t;
    this.SubStatePriority = e;
    this.IsLocal = i;
    this.WaitConfirm = i;
    this.CurrentHandle = ++this._Xe;
    CombatLog_1.CombatLog.Info("FightState", this.Entity, `切换${i ? "本地" : "远端"}主状态成功，${this.TF_()}`);
    return this.CurrentHandle;
  }
  ConfirmState(t) {
    if (this.CurrentHandle === t) {
      this.WaitConfirm = false;
    } else {
      CombatLog_1.CombatLog.Info("FightState", this.Entity, `确认状态失败[handle:${t}]，当前[handle:${this.CurrentHandle}]`);
    }
  }
  ResetState() {
    CombatLog_1.CombatLog.Info("FightState", this.Entity, `重置主状态[handle:${this.CurrentHandle}]`);
    this.CurrentState = 0;
    this.SubStatePriority = 0;
    this.IsLocal = false;
    this.WaitConfirm = false;
    this.CurrentHandle = 0;
  }
  ExitState(t) {
    if (this.CurrentHandle === t) {
      CombatLog_1.CombatLog.Info("FightState", this.Entity, "退出主状态，" + this.TF_());
      this.CurrentState = 0;
      this.SubStatePriority = 0;
      this.IsLocal = false;
      this.WaitConfirm = false;
      this.CurrentHandle = 0;
    } else {
      CombatLog_1.CombatLog.Info("FightState", this.Entity, `退出主状态失败，[handle:${t}]，${this.TF_()}`);
    }
  }
  GetFightState() {
    if (this.CurrentHandle) {
      return this.CurrentState << 8 | this.SubStatePriority;
    } else {
      return 0;
    }
  }
  TF_() {
    return `[当前状态(${this.CurrentHandle}):${this.bF_(this.CurrentState, this.SubStatePriority)}]`;
  }
  IF_(t, e) {
    return `[目标状态：${this.bF_(t, e)}]`;
  }
  bF_(t, e) {
    let i = "";
    switch (t) {
      case 1:
        i = `普通技能(${t}|${e})`;
        break;
      case 2:
        i = `普通受击(${t}|${e})`;
        break;
      case 3:
        i = `覆盖受击技能(${t}|${e})`;
        break;
      case 4:
        i = `被弹反受击(${t}|${e})`;
        break;
      case 5:
        i = `覆盖被弹反技能(${t}|${e})`;
        break;
      case 6:
        i = `被破弱(${t}|${e})`;
        break;
      case 7:
        i = `覆盖被破弱技能(${t}|${e})`;
        break;
      case 8:
        i = `抓取(${t}|${e})`;
        break;
      case 9:
        i = `特殊技能(${t}|${e})`;
        break;
      case 10:
        i = `状态机主状态(${t}|${e})`;
    }
    return i;
  }
};
CharacterFightStateComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(60)], CharacterFightStateComponent);
exports.CharacterFightStateComponent = CharacterFightStateComponent; //# sourceMappingURL=CharacterFightStateComponent.js.map