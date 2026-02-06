"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiConditionEvents = exports.AiAttributeRate = undefined;
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const TsFloatRange_1 = require("../../../Core/Utils/TsFloatRange");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class AiAttributeRate {
  constructor(t) {
    this.Denominator = t.Denominator;
    this.Numerator = t.Numerator;
    this.Range = new TsFloatRange_1.TsFloatRange(t.Range.LowerBound.Type === 0, t.Range.LowerBound.Value, t.Range.UpperBound.Value);
  }
}
exports.AiAttributeRate = AiAttributeRate;
class AiConditions {
  constructor(s) {
    this.Tags = new Map();
    this.Attributes = new Map();
    this.AttributeRates = new Array();
    this.AttributeRateDenominatorMap = new Map();
    this.AttributeRateNumeratorMap = new Map();
    this.Logic = s.Logic;
    let h = s.Tags.Num();
    for (let t = 0; t < h; ++t) {
      var i = s.Tags.GetKey(t);
      var e = s.Tags.Get(i);
      this.Tags.set(i.TagId, new TsFloatRange_1.TsFloatRange(e.LowerBound.Type === 0, e.LowerBound.Value, e.UpperBound.Value));
    }
    h = s.Attributes.Num();
    for (let t = 0; t < h; ++t) {
      var o = s.Attributes.GetKey(t);
      var n = s.Attributes.Get(o);
      this.Attributes.set(o, new TsFloatRange_1.TsFloatRange(n.LowerBound.Type === 0, n.LowerBound.Value, n.UpperBound.Value));
    }
    h = s.AttributeRates.Num();
    for (let i = 0; i < h; ++i) {
      var r = new AiAttributeRate(s.AttributeRates.Get(i));
      this.AttributeRates.push(r);
      let t = this.AttributeRateDenominatorMap.get(r.Denominator);
      if (!t) {
        t = [];
        this.AttributeRateDenominatorMap.set(r.Denominator, t);
      }
      t.push(i);
      if (!(t = this.AttributeRateNumeratorMap.get(r.Numerator))) {
        t = [];
        this.AttributeRateNumeratorMap.set(r.Numerator, t);
      }
      t.push(i);
    }
  }
}
class ConditionEventPair {
  constructor() {
    this.Qte = undefined;
    this.EventBinder = undefined;
    this.Xte = undefined;
    this.$te = undefined;
    this.Yte = new Set();
    this.Jte = new Set();
    this.zte = new Set();
    this.Zte = 0;
    this.eie = 0;
    this.tie = new Array();
    this.iie = undefined;
    this.oie = (t, i, s) => {
      if (this.Qte.Attributes.get(t).InRange(i)) {
        if (!this.Jte.has(t)) {
          this.Jte.add(t);
          this.rie();
        }
      } else if (this.Jte.has(t)) {
        this.Jte.delete(t);
        this.nie();
      }
    };
    this.sie = undefined;
    this.aie = (t, i, s) => {
      if (this.$te) {
        var h = this.Qte.AttributeRateNumeratorMap.get(t);
        if (h) {
          for (const v of h) {
            var e = this.Qte.AttributeRates[v];
            var o = this.$te.GetCurrentValue(e.Denominator);
            if (o !== 0) {
              if (e.Range.InRange(i / o)) {
                if (!this.zte.has(v)) {
                  this.zte.add(v);
                  this.rie();
                }
              } else if (this.zte.has(v)) {
                this.zte.delete(v);
                this.nie();
              }
            }
          }
        }
        h = this.Qte.AttributeRateDenominatorMap.get(t);
        if (h && i !== 0) {
          for (const a of h) {
            var n = this.Qte.AttributeRates[a];
            var r = this.$te.GetCurrentValue(n.Numerator);
            if (n.Range.InRange(r / i)) {
              if (!this.zte.has(a)) {
                this.zte.add(a);
                this.rie();
              }
            } else if (this.zte.has(a)) {
              this.zte.delete(a);
              this.nie();
            }
          }
        }
      }
    };
  }
  hie(i) {
    return t => {
      if (this.Qte.Tags.get(i).InRange(t)) {
        if (!this.Yte.has(i)) {
          this.Yte.add(i);
          this.rie();
        }
      } else if (this.Yte.has(i)) {
        this.Yte.delete(i);
        this.nie();
      }
    };
  }
  InitConditions(t, i, s) {
    this.Clear();
    this.Qte = new AiConditions(t);
    this.EventBinder = i;
    this.Xte = s.Entity.GetComponent(217);
    this.$te = s.Entity.GetComponent(184);
    this.eie = this.Qte.Tags.size + this.Qte.Attributes.size + this.Qte.AttributeRates.length;
    var h = s.Entity.GetComponent(217);
    if (h) {
      for (var [e] of this.Qte.Tags) {
        e = h.ListenForTagAnyCountChanged(e, this.hie(e));
        this.tie.push(e);
      }
    }
    if (this.$te) {
      var o;
      var n = new Set();
      for ([o] of this.Qte.Attributes) {
        n.add(o);
      }
      if (this.Qte.Attributes.size && this.$te) {
        this.iie = [...n];
        this.$te.AddListeners(this.iie, this.oie, "AiConditionEvent");
      }
      n.clear();
      for (const r of this.Qte.AttributeRates) {
        n.add(r.Numerator);
        n.add(r.Denominator);
      }
      if (this.Qte.AttributeRates.length && this.$te) {
        this.sie = [...n];
        this.$te.AddListeners(this.sie, this.aie, "AiConditionEvent2");
      }
    }
    this.ResetConditions(true);
  }
  Clear() {
    if (this.iie) {
      this.$te?.RemoveListeners(this.iie, this.oie);
      this.iie = undefined;
    }
    if (this.sie) {
      this.$te?.RemoveListeners(this.sie, this.aie);
      this.sie = undefined;
    }
    this.Qte = undefined;
    if (this.EventBinder) {
      this.EventBinder.Callback.Clear();
      this.EventBinder = undefined;
    }
    this.Xte = undefined;
    this.$te = undefined;
    this.Yte.clear();
    this.Jte.clear();
    this.zte.clear();
    this.Zte = 0;
    this.eie = 0;
    this.tie.forEach(t => {
      t.EndTask();
    });
    this.tie.splice(0, this.tie.length);
  }
  rie() {
    ++this.Zte;
    if (this.Qte.Logic === 0) {
      if (this.Zte === this.eie) {
        this.EventBinder.Callback.Broadcast(true);
      }
    } else if (this.Zte === 1) {
      this.EventBinder.Callback.Broadcast(true);
    }
  }
  nie() {
    --this.Zte;
    if (this.Qte.Logic === 0) {
      if (this.Zte === this.eie - 1) {
        this.EventBinder.Callback.Broadcast(false);
      }
    } else if (this.Zte === 0) {
      this.EventBinder.Callback.Broadcast(false);
    }
  }
  ResetConditions(t = false) {
    this.Zte = 0;
    if (this.Xte) {
      for (var [i, s] of this.Qte.Tags) {
        if (s.InRange(this.Xte.GetTagCount(i))) {
          this.Yte.add(i);
          ++this.Zte;
        }
      }
    }
    if (this.$te) {
      for (var [h, e] of this.Qte.Attributes) {
        var o = this.$te.GetCurrentValue(h);
        if (e.InRange(o)) {
          this.Jte.add(h);
          ++this.Zte;
        }
      }
      let t = 0;
      for (const v of this.Qte.AttributeRates) {
        var n = this.$te.GetCurrentValue(v.Numerator);
        var r = this.$te.GetCurrentValue(v.Denominator);
        if (r !== 0 && v.Range.InRange(n / r)) {
          this.zte.add(t);
          ++this.Zte;
        }
        ++t;
      }
    }
    if (this.Qte.Logic === 0) {
      if (this.Zte === this.eie) {
        this.EventBinder.Callback.Broadcast(true);
        return;
      }
    } else if (this.Zte > 0) {
      this.EventBinder.Callback.Broadcast(true);
      return;
    }
    if (!t) {
      this.EventBinder.Callback.Broadcast(false);
    }
  }
}
class AiConditionEvents {
  constructor(t) {
    this.Bte = t;
    this.lie = new Array();
    this._ie = new Map();
    this.uie = t => {
      var i = t.GetComponent(1);
      if (i?.Valid) {
        var s;
        var h;
        var e = Vector_1.Vector.DistSquared(this.Bte.CharActorComp.ActorLocationProxy, i.ActorLocationProxy);
        for ([s, h] of this._ie) {
          if (e < h) {
            s.Callback.Broadcast(i.Owner, true);
          }
        }
      }
    };
  }
  AddConditionEvent(t, i) {
    var s = new ConditionEventPair();
    s.InitConditions(t, i, this.Bte.CharActorComp);
    this.lie.push(s);
  }
  RemoveConditionEvent(t) {
    let i = 0;
    for (const s of this.lie) {
      if (s.EventBinder === t) {
        s.Clear();
        break;
      }
      ++i;
    }
    return i < this.lie.length && (this.lie.splice(i), true);
  }
  AddSceneItemDestroyEvent(t, i) {
    if (this._ie.size === 0) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemDurabilityEmpty, this.uie);
    }
    this._ie.set(i, t * t);
  }
  RemoveSceneItemDestroyEvent(t) {
    if (this._ie.delete(t) && this._ie.size === 0) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemDurabilityEmpty, this.uie);
    }
  }
  Clear() {
    this.lie.forEach((t, i, s) => {
      t.Clear();
    });
    this.lie.splice(0, this.lie.length);
    if (this._ie.size > 0) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemDurabilityEmpty, this.uie);
    }
    this._ie.clear();
  }
  ResetAllConditionEvent() {
    for (const t of this.lie) {
      t.ResetConditions();
    }
  }
}
exports.AiConditionEvents = AiConditionEvents;
//# sourceMappingURL=AiConditionEvents.js.map