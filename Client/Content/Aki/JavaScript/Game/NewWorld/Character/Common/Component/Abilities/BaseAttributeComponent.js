"use strict";

var BaseAttributeComponent_1;
var __decorate = this && this.__decorate || function (t, e, r, i) {
  var s;
  var a = arguments.length;
  var o = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, r) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, r, i);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (s = t[n]) {
        o = (a < 3 ? s(o) : a > 3 ? s(e, r, o) : s(e, r)) || o;
      }
    }
  }
  if (a > 3 && o) {
    Object.defineProperty(e, r, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseAttributeComponent = exports.AttributeSnapshot = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const StatDefine_1 = require("../../../../../Common/StatDefine");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const AbilityUtils_1 = require("./AbilityUtils");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
class AttributeSnapshot {
  constructor() {
    this.BaseValues = {};
    this.CurrentValues = {};
  }
  GetBaseValue(t) {
    return this.BaseValues[CharacterAttributeTypes_1.EAttributeId[t]];
  }
  GetCurrentValue(t) {
    return this.CurrentValues[CharacterAttributeTypes_1.EAttributeId[t]];
  }
}
exports.AttributeSnapshot = AttributeSnapshot;
let BaseAttributeComponent = BaseAttributeComponent_1 = class BaseAttributeComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.BaseValues = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    this.CurrentValues = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    this.ModifierLists = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    this.BoundsLockerMap = new Map();
    this.CreatureDataComponent = undefined;
    this.BuffComponent = undefined;
    this.CurrentValueListenerMap = new Map();
    this.AnyCurrentValueListenerSet = new Set();
  }
  OnInit() {
    super.OnInit();
    this.CreatureDataComponent = this.Entity.CheckGetComponent(0);
    this.BuffComponent = this.Entity.GetComponent(220);
    return true;
  }
  OnCreate() {
    for (let t = 0; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t) {
      this.BaseValues[t] = 0;
    }
    for (let t = 0; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t) {
      this.CurrentValues[t] = 0;
    }
    for (let t = 0; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t) {
      this.ModifierLists[t] = new Map();
    }
    return true;
  }
  OnTick(t) {
    this.AutoRecoverAttr(t);
  }
  IsWritableAttribute(t) {
    if (CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.has(t) || CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.has(t)) {
      return true;
    }
    switch (t) {
      case CharacterAttributeTypes_1.EAttributeId.Proto_Tough:
      case CharacterAttributeTypes_1.EAttributeId.RIm:
        return true;
      default:
        if (CharacterAttributeTypes_1.specialEnergyIds.includes(t)) {
          return !this.BuffComponent || this.BuffComponent.HasBuffAuthority();
        } else {
          return false;
        }
    }
    return false;
  }
  IsLocalAttribute(t) {
    return t === CharacterAttributeTypes_1.EAttributeId.RIm || !!CharacterAttributeTypes_1.specialEnergyIds.includes(t) && (!this.BuffComponent || this.BuffComponent.HasBuffAuthority());
  }
  SetBaseValue(e, r) {
    if (this.IsWritableAttribute(e)) {
      let t = r;
      var i;
      var r = this.mbr(e);
      if (r !== undefined) {
        t = this.dbr(e, t, r);
      }
      if (!CharacterAttributeTypes_1.attrsNotClampZero.includes(e)) {
        t = Math.max(t, 0);
      }
      t = Math.floor(t);
      var r = this.BaseValues[e];
      if (r !== t) {
        this.BaseValues[e] = t;
        r = this.CurrentValues[e];
        this.UpdateCurrentValue(e);
        i = this.CurrentValues[e];
        this.DispatchCurrentValueEvent(e, i, r);
      }
    }
  }
  AddBaseValue(t, e) {
    this.SetBaseValue(t, this.BaseValues[t] + e);
  }
  GetBaseValue(t) {
    return this.BaseValues[t];
  }
  GetCurrentValue(t) {
    return this.CurrentValues[t];
  }
  mbr(t) {
    t = CharacterAttributeTypes_1.attributeIdsWithMax.get(t);
    if (t) {
      return this.GetCurrentValue(t);
    }
  }
  SyncValueFromServer(t, e, r) {
    if (!this.IsLocalAttribute(t) && (this.BaseValues[t] !== e && (this.BaseValues[t] = e), e = this.CurrentValues[t], this.CurrentValues[t] = r, this.DispatchCurrentValueEvent(t, r, e), r = CharacterAttributeTypes_1.attributeIdsMaxToAttrId.get(t))) {
      this.SetBaseValue(r, this.BaseValues[r]);
    }
  }
  UpdateCurrentValue(e) {
    BaseAttributeComponent_1.s__.Start();
    if (this.IsWritableAttribute(e)) {
      let t = this.Cbr(e);
      var r = CharacterAttributeTypes_1.attrsCurrentValueClamp.get(e);
      var r;
      if (r) {
        t = Math.min(t, r);
      }
      if (!CharacterAttributeTypes_1.attrsNotClampZero.includes(e)) {
        t = Math.max(t, 0);
      }
      if ((r = this.CurrentValues[e]) !== t) {
        this.CurrentValues[e] = t;
      }
    }
    BaseAttributeComponent_1.s__.Stop();
  }
  TakeSnapshot() {
    var e = new AttributeSnapshot();
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
      var r = CharacterAttributeTypes_1.EAttributeId[t];
      if (r) {
        e.BaseValues[r] = this.BaseValues[t] ?? 0;
        e.CurrentValues[r] = this.CurrentValues[t] ?? 0;
      }
    }
    return e;
  }
  AddModifier(t, e) {
    var r;
    var i;
    BaseAttributeComponent_1.a__.Start();
    if (!this.IsWritableAttribute(t) || t <= CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None || t >= CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX) {
      BaseAttributeComponent_1.a__.Stop();
      return -1;
    } else {
      r = BaseAttributeComponent_1.ModifierHandleGenerator++;
      this.ModifierLists[t] = this.ModifierLists[t] ?? new Map();
      this.ModifierLists[t].set(r, e);
      e = this.CurrentValues[t];
      this.UpdateCurrentValue(t);
      i = this.CurrentValues[t];
      this.DispatchCurrentValueEvent(t, i, e);
      BaseAttributeComponent_1.a__.Stop();
      return r;
    }
  }
  RemoveModifier(t, e) {
    var r;
    BaseAttributeComponent_1.h__.Start();
    if (this.ModifierLists[t]?.delete(e)) {
      e = this.CurrentValues[t];
      this.UpdateCurrentValue(t);
      r = this.CurrentValues[t];
      this.DispatchCurrentValueEvent(t, r, e);
    }
    BaseAttributeComponent_1.h__.Stop();
  }
  *GetAllModifiers(t) {
    if (this.ModifierLists[t]) {
      for (const e of this.ModifierLists[t].values()) {
        yield e;
      }
    }
  }
  Cbr(t) {
    BaseAttributeComponent_1.l__.Start();
    var e = this.BaseValues[t];
    if (!this.ModifierLists[t]) {
      BaseAttributeComponent_1.l__.Stop();
      return e;
    }
    let r = 0;
    let i = 0;
    let s = 1;
    var a = this.CheckIfNeedAdvanceMultiply(t);
    for (const n of this.GetAllModifiers(t)) {
      let e = 0;
      switch (n.Type) {
        case 0:
          e = n.Value1;
          break;
        case 1:
          i += n.Value1;
          break;
        case 2:
        case 4:
        case 9:
          {
            let t = n.SnapshotSource;
            if (t === undefined) {
              t = AbilityUtils_1.AbilityUtils.GetAttrValue(n.SourceEntity === 0 ? this : ModelManager_1.ModelManager.CreatureModel.GetEntity(n.SourceEntity)?.Entity?.GetComponent(182), n.SourceAttributeId, n.SourceCalculationType);
            }
            var o = n.Min;
            if (o && (t -= o) <= 0) {
              break;
            }
            o = n.Ratio;
            if (o) {
              t /= o;
            }
            if (n.Type === 9) {
              i += t * n.Value1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
              break;
            }
            e = t * n.Value1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + n.Value2;
            o = n.Max;
            if (o && e > o) {
              e = o;
            }
            if (n.Type === 4) {
              return e;
            }
            break;
          }
        case 3:
          return n.Value1;
        case -1:
          s *= n.Value1 * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
      }
      if (e !== 0) {
        if (a) {
          s *= e * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + 1;
        } else {
          r += e;
        }
      }
    }
    t = Math.floor((e * (i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + 1) + r) * s);
    BaseAttributeComponent_1.l__.Stop();
    return t;
  }
  SyncRecoverPropFromServer(t, e, r, i, s) {
    var a = CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.get(t);
    var o = CharacterAttributeTypes_1.attrsAutoRecoverMaxMap.get(t);
    if (a && o) {
      this.SyncValueFromServer(a, i, i);
      this.SyncValueFromServer(o, r, r);
      a = e + i * s * CommonDefine_1.SECOND_PER_MILLIONSECOND;
      this.SyncValueFromServer(t, a, a);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 35, "自动属性未注册", ["属性", t]);
    }
  }
  AutoRecoverAttr(t) {
    BaseAttributeComponent_1.___.Start();
    var e;
    var r;
    var i = t * Time_1.Time.FlowTimeDilation * CommonDefine_1.SECOND_PER_MILLIONSECOND;
    for ([e, r] of CharacterAttributeTypes_1.attrsAutoRecoverSpeedMap.entries()) {
      var s = this.GetCurrentValue(r);
      if (s !== 0) {
        this.AddBaseValue(e, s * i);
      }
    }
    BaseAttributeComponent_1.___.Stop();
  }
  AddBoundsLocker(t, e, r) {
    if (!this.IsWritableAttribute(t)) {
      return -1;
    }
    let i = this.BoundsLockerMap.get(t);
    if (!i) {
      this.BoundsLockerMap.set(t, i = new Map());
    }
    if (i.has(r)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 22, "重复添加属性BoundsLock", ["attrId", t], ["handle", r]);
      }
    } else {
      i.set(r, e);
      this.SetBaseValue(t, this.BaseValues[t]);
    }
    return r;
  }
  RemoveBoundsLocker(t, e) {
    var r = this.BoundsLockerMap.get(t);
    return !!r && !!r.delete(e) && (this.SetBaseValue(t, this.BaseValues[t]), true);
  }
  UpdateBoundsLocker(t, e, r, i, s) {
    var a = this.BoundsLockerMap.get(r);
    return !!a && !!(a = a.get(e)) && (t === 0 ? (a.LockUpperBounds = true, a.LockLowerBounds = false, a.UpperPercent = i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, a.UpperOffset = s, a.LowerPercent = 0, a.LowerOffset = 0) : (a.LockUpperBounds = false, a.LockLowerBounds = true, a.UpperPercent = 1, a.UpperOffset = 0, a.LowerPercent = i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND, a.LowerOffset = s), this.SetBaseValue(r, this.BaseValues[r]), true);
  }
  *GetAllBoundsLocker(t) {
    t = this.BoundsLockerMap.get(t);
    if (t) {
      for (const e of t.values()) {
        yield e;
      }
    }
  }
  dbr(t, e, r) {
    let i = e;
    let s = undefined;
    let a = r;
    for (const n of this.GetAllBoundsLocker(t)) {
      var o;
      if (n.LockLowerBounds) {
        o = n.LowerPercent * r + n.LowerOffset;
        s = Math.max(s ?? o, o);
      }
      if (n.LockUpperBounds) {
        o = n.UpperPercent * r + n.UpperOffset;
        a = Math.min(a ?? o, o);
      }
    }
    if (a !== undefined) {
      i = Math.min(a, i);
    }
    return i = s !== undefined ? Math.max(s, i) : i;
  }
  AddIntervalLock(t, e, r, i, s) {
    var a;
    if (r !== CharacterAttributeTypes_1.EAttributeId.Proto_Life) {
      i = {
        LockUpperBounds: !(a = {
          LockUpperBounds: true,
          LockLowerBounds: false,
          UpperPercent: i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
          UpperOffset: s,
          LowerPercent: 0,
          LowerOffset: 0
        }),
        LockLowerBounds: true,
        UpperPercent: 1,
        UpperOffset: 0,
        LowerPercent: i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        LowerOffset: s
      };
      this.AddBoundsLocker(r, t === 0 ? a : i, e);
    }
  }
  RemoveIntervalLock(t, e, r) {
    this.RemoveBoundsLocker(r, e);
  }
  AddStateAttributeLock(t, e, r, i) {
    r = {
      LockUpperBounds: true,
      LockLowerBounds: true,
      UpperPercent: r * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
      UpperOffset: i,
      LowerPercent: r * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
      LowerOffset: i
    };
    this.AddBoundsLocker(e, r, t);
  }
  RemoveStateAttributeLock(t, e) {
    this.RemoveBoundsLocker(e, t);
  }
  AddListener(t, e, r) {
    var i = this.CurrentValueListenerMap.get(t);
    if (i) {
      i.add(e);
    } else {
      (i = new Set()).add(e);
      this.CurrentValueListenerMap.set(t, i);
    }
  }
  AddListeners(t, e, r) {
    t.forEach(t => {
      this.AddListener(t, e, r);
    });
  }
  RemoveListener(t, e) {
    t = this.CurrentValueListenerMap.get(t);
    return !!t && (t.delete(e), true);
  }
  RemoveListeners(t, e) {
    t.forEach(t => {
      this.RemoveListener(t, e);
    });
  }
  AddGeneralListener(t) {
    this.AnyCurrentValueListenerSet.add(t);
  }
  RemoveGeneralListener(t) {
    this.AnyCurrentValueListenerSet.delete(t);
  }
  DispatchCurrentValueEvent(t, e, r) {
    if (r !== e) {
      this.DispatchCurrentValueEventImplement(t, e, r);
    }
  }
  DispatchCurrentValueEventImplement(e, r, i) {
    BaseAttributeComponent_1.c__.Start();
    var s = this.CurrentValueListenerMap.get(e);
    if (s) {
      let t = BaseAttributeComponent_1.pbr.get(e);
      if (!t) {
        BaseAttributeComponent_1.pbr.set(e, t = Stats_1.Stat.CreateNoFlameGraph(`CurrentAttr#${e} event`, StatDefine_1.BATTLESTAT_GROUP));
      }
      for (const a of s) {
        t?.Start();
        try {
          a(e, r, i);
        } catch (t) {
          CombatLog_1.CombatLog.ErrorWithStack("Attribute", this.Entity, "属性回调异常", t, ["属性", e]);
        }
        t?.Stop();
      }
    }
    for (const t of this.AnyCurrentValueListenerSet) {
      BaseAttributeComponent_1.vbr.Start();
      try {
        t(e, r, i);
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack("Attribute", this.Entity, "全局属性回调异常", t, ["属性", e]);
      }
      BaseAttributeComponent_1.vbr.Stop();
    }
    BaseAttributeComponent_1.c__.Stop();
  }
  CheckIfNeedAdvanceMultiply(t) {
    switch (t) {
      case CharacterAttributeTypes_1.EAttributeId.Proto_CdReduse:
      case CharacterAttributeTypes_1.EAttributeId.Proto_ToughChange:
      case CharacterAttributeTypes_1.EAttributeId.Proto_SkillToughRatio:
      case CharacterAttributeTypes_1.EAttributeId.vVn:
      case CharacterAttributeTypes_1.EAttributeId.Proto_AutoAttackSpeed:
      case CharacterAttributeTypes_1.EAttributeId.Proto_CastAttackSpeed:
        return true;
      default:
        return false;
    }
  }
  GetDebugString() {
    var e = [];
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; ++t) {
      var r = t;
      if (this.BaseValues[r] !== 0 || this.CurrentValues[r] !== 0) {
        e.push(`${r} ${this.BaseValues[r]} ${this.CurrentValues[r]}`);
      }
    }
    return e.join("|");
  }
  GetLockDebugString(i) {
    let s = "";
    this.BoundsLockerMap.forEach((t, r) => {
      t.forEach((t, e) => {
        if (!(i.length > 0) || !!i.some(t => String(r).startsWith(t))) {
          if (t.LockLowerBounds) {
            s += `属性:${r} 下限:${t.LowerPercent * 100}%+${t.LowerOffset} handle:${e}
`;
          }
          if (t.LockUpperBounds) {
            s += `属性:${r} 上限:${t.UpperPercent * 100}%+${t.UpperOffset} handle:${e}
`;
          }
        }
      });
    });
    return s;
  }
};
BaseAttributeComponent.ModifierHandleGenerator = 100;
BaseAttributeComponent.s__ = Stats_1.Stat.Create("BaseAttributeComponent.UpdateCurrentValue", StatDefine_1.BATTLESTAT_GROUP);
BaseAttributeComponent.a__ = Stats_1.Stat.Create("BaseAttributeComponent.AddModifier", StatDefine_1.BATTLESTAT_GROUP);
BaseAttributeComponent.h__ = Stats_1.Stat.Create("BaseAttributeComponent.RemoveModifier", StatDefine_1.BATTLESTAT_GROUP);
BaseAttributeComponent.l__ = Stats_1.Stat.Create("BaseAttributeComponent.EvaluateModifiers", StatDefine_1.BATTLESTAT_GROUP);
BaseAttributeComponent.___ = Stats_1.Stat.Create("BaseAttributeComponent.AutoRecoverAttr", StatDefine_1.BATTLESTAT_GROUP);
BaseAttributeComponent.c__ = Stats_1.Stat.Create("BaseAttributeComponent.DispatchCurrentValueEvent", StatDefine_1.BATTLESTAT_GROUP);
BaseAttributeComponent.pbr = new Map();
BaseAttributeComponent.vbr = Stats_1.Stat.Create("AnyCurrentAttr event", StatDefine_1.BATTLESTAT_GROUP);
BaseAttributeComponent = BaseAttributeComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(181)], BaseAttributeComponent);
exports.BaseAttributeComponent = BaseAttributeComponent; //# sourceMappingURL=BaseAttributeComponent.js.map