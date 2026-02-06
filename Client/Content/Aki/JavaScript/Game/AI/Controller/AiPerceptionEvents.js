"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiPerceptionEvents = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const CombatLog_1 = require("../../Utils/CombatLog");
class AiPerceptionEvents {
  constructor(t) {
    this.Bte = t;
    this.Xoe = new Array();
    this.$oe = new Array();
    this.Yoe = new Array();
    this.Joe = new Array();
    this.zoe = new Array();
    this.Zoe = new Array();
    this.ere = new Array();
    this.tre = UE.NewArray(UE.Actor);
    this.ire = UE.NewArray(UE.Actor);
    this.ore = UE.NewArray(UE.BuiltinInt);
    this.rre = UE.NewArray(UE.Actor);
    this.nre = UE.NewArray(UE.Actor);
    this.sre = UE.NewArray(UE.BuiltinInt);
    this.are = UE.NewArray(UE.Actor);
    this.hre = new Array();
    this.lre = new Array();
    this._re = new Array();
    this.ure = true;
    this.cre = true;
    this.mre = true;
    this.dre = undefined;
    this.Cre = 0;
    this.gre = new Set();
    this.uie = t => {
      t = t.GetComponent(1);
      if (t?.Valid && Vector_1.Vector.DistSquared(this.Bte.CharActorComp.ActorLocationProxy, t.ActorLocationProxy) < this.Cre && !this.gre.has(t.Entity.Id)) {
        this.gre.add(t.Entity.Id);
        this.dre.Callback.Broadcast(t.Owner, true);
      }
    };
  }
  Clear(t = false) {
    this.Xoe.splice(0, this.Xoe.length);
    this.$oe.splice(0, this.$oe.length);
    this.Yoe.splice(0, this.Yoe.length);
    this.Joe.splice(0, this.Joe.length);
    this.zoe.splice(0, this.zoe.length);
    this.Zoe.splice(0, this.Zoe.length);
    this.ere.splice(0, this.ere.length);
    this.tre.Empty();
    this.ire.Empty();
    this.ore.Empty();
    this.rre.Empty();
    this.nre.Empty();
    this.sre.Empty();
    this.are.Empty();
    if (t && (this.hre.splice(0, this.hre.length), this.lre.splice(0, this.lre.length), this._re.splice(0, this._re.length), this.dre)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemDurabilityEmpty, this.uie);
      this.dre = undefined;
      this.gre.clear();
    }
  }
  TickPerception() {
    if (this.lre.length !== 0) {
      this.fre();
    }
  }
  TickHate() {
    if (this._re.length > 0) {
      this.pre();
    }
    if (this.hre.length > 0) {
      this.vre();
    }
  }
  pre() {
    for (const i of this.Xoe) {
      var t = this.ere.indexOf(i);
      if (t !== -1) {
        this.ere.slice(t, 1);
      }
    }
    if (this.ere.length > 0) {
      this.Mre("超出距离被伤害没添加仇恨事件广播", this.ere, undefined);
      this.Ere(this.ere, this.are);
      for (const s of this._re) {
        s.Callback.Broadcast(this.are, undefined, undefined, 0);
      }
      this.ere.splice(0, this.ere.length);
      this.are.Empty();
    }
  }
  vre() {
    var t = this.Xoe.length > 0;
    var i = this.$oe.length > 0;
    if (t || i) {
      var s = this.Bte.AiHateList.GetHatredMap().size;
      if (t) {
        if (i) {
          this.Mre("仇恨广播", this.Xoe, this.$oe);
          this.Ere(this.Xoe, this.tre);
          this.Ere(this.$oe, this.ire);
          this.Sre(this.Yoe, this.ore);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("AI", 6, "CallHate Other", ["Count", this.hre.length]);
          }
          for (const h of this.hre) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("AI", 6, "Before CallHate Callback");
            }
            h.Callback.Broadcast(this.tre, this.ire, this.ore, s);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("AI", 6, "After CallHate Callback");
            }
          }
          this.Xoe.splice(0, this.Xoe.length);
          this.$oe.splice(0, this.$oe.length);
          this.tre.Empty();
          this.ire.Empty();
          this.Yoe.splice(0, this.Yoe.length);
          this.ore.Empty();
        } else {
          this.Mre("仇恨广播", this.Xoe, undefined);
          this.Ere(this.Xoe, this.tre);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("AI", 6, "CallHate no remove", ["Count", this.hre.length]);
          }
          for (const e of this.hre) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("AI", 6, "Before CallHate Callback");
            }
            e.Callback.Broadcast(this.tre, undefined, undefined, s);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("AI", 6, "After CallHate Callback");
            }
          }
          this.Xoe.splice(0, this.Xoe.length);
          this.tre.Empty();
        }
      } else {
        this.Mre("仇恨广播", undefined, this.$oe);
        this.Ere(this.$oe, this.ire);
        this.Sre(this.Yoe, this.ore);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AI", 6, "CallHate no add", ["Count", this.hre.length]);
        }
        for (const o of this.hre) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("AI", 6, "Before Hatred Callback");
          }
          o.Callback.Broadcast(undefined, this.ire, this.ore, s);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("AI", 6, "After Hatred Callback");
          }
        }
        this.$oe.splice(0, this.$oe.length);
        this.ire.Empty();
        this.Yoe.splice(0, this.Yoe.length);
        this.ore.Empty();
      }
    }
  }
  fre() {
    var t = this.Joe.length > 0;
    var i = this.zoe.length > 0;
    if (t || i) {
      var s = this.Bte.AiPerception.AllEnemies.size;
      if (t) {
        if (i) {
          this.Mre("感知广播", this.Joe, this.zoe);
          this.Ere(this.Joe, this.rre);
          this.Ere(this.zoe, this.nre);
          this.Sre(this.Zoe, this.sre);
          for (const h of this.lre) {
            h.Callback.Broadcast(this.rre, this.nre, this.sre, s);
          }
          this.Joe.splice(0, this.Joe.length);
          this.zoe.splice(0, this.zoe.length);
          this.rre.Empty();
          this.nre.Empty();
          this.Zoe.splice(0, this.Zoe.length);
          this.sre.Empty();
        } else {
          this.Mre("感知广播", this.Joe, undefined);
          this.Ere(this.Joe, this.rre);
          for (const e of this.lre) {
            e.Callback.Broadcast(this.rre, undefined, undefined, s);
          }
          this.Joe.splice(0, this.Joe.length);
          this.rre.Empty();
        }
      } else {
        this.Mre("感知广播", undefined, this.zoe);
        this.Ere(this.zoe, this.nre);
        this.Sre(this.Zoe, this.sre);
        for (const o of this.lre) {
          o.Callback.Broadcast(undefined, this.nre, this.sre, s);
        }
        this.zoe.splice(0, this.zoe.length);
        this.nre.Empty();
        this.Zoe.splice(0, this.Zoe.length);
        this.sre.Empty();
      }
    }
  }
  Ere(t, i) {
    for (const h of t) {
      var s = EntitySystem_1.EntitySystem.Get(h);
      if (s && s.Active && s.Valid && (s = s.GetComponent(1)?.Owner)) {
        i.Add(s);
      }
    }
    t.splice(0, t.length);
  }
  Sre(t, i) {
    for (const s of t) {
      i.Add(s);
    }
  }
  AddAiHateEvent(t) {
    if (!this.hre.includes(t)) {
      var i;
      if (this.Bte?.AiHateList) {
        for ([i] of this.Bte?.AiHateList.GetHatredMap()) {
          this.Bte?.AiPerceptionEvents.CollectAiHateEventById(true, i);
        }
      }
      this.hre.push(t);
    }
  }
  yre(t, i, s, h) {
    if (t && s) {
      t = h.indexOf(i.Id);
      if (t !== -1) {
        h.slice(t, t + 1);
        s.push(i.Id);
      } else if (!s.includes(i.Id)) {
        s.push(i.Id);
      }
    } else {
      if (s) {
        t = s.indexOf(i.Id);
        if (t !== -1) {
          s.slice(t, t + 1);
          h.push(i.Id);
          return;
        }
      }
      if (!h.includes(i.Id)) {
        h.push(i.Id);
      }
    }
  }
  Ire(t, i, s, h) {
    if (t && s) {
      t = h.indexOf(i);
      if (t !== -1) {
        h.slice(t, t + 1);
        s.push(i);
      } else if (!s.includes(i)) {
        s.push(i);
      }
    } else {
      if (s) {
        t = s.indexOf(i);
        if (t !== -1) {
          s.slice(t, t + 1);
          h.push(i);
          return;
        }
      }
      if (!h.includes(i)) {
        h.push(i);
      }
    }
  }
  CollectAiHateEvent(t, i) {
    this.yre(t, i, this.Xoe, this.$oe);
  }
  CollectAiHateEventById(t, i) {
    this.Ire(t, i, this.Xoe, this.Yoe);
  }
  AddAiHateOutRangeEvent(t) {
    if (!this._re.includes(t)) {
      this._re.push(t);
    }
  }
  CollectAiHateOutRangeEvent(t) {
    if (!this.ere.includes(t.Id)) {
      this.ere.push(t.Id);
    }
  }
  AddAiPerceptionEvent(t, i, s, h) {
    if (!this.lre.includes(t)) {
      this.ure = i;
      this.cre = s;
      this.mre = h;
      if (this.Bte?.AiPerception) {
        for (const e of this.Bte?.AiPerception.AllEnemies) {
          this.Bte?.AiPerceptionEvents.CollectAiPerceptionEventById(true, e, 2);
        }
      }
      this.lre.push(t);
    }
  }
  SetPerceptionEventState(t, i, s) {
    this.ure = t;
    this.cre = i;
    this.mre = s;
  }
  CollectAiPerceptionEventByActorComp(t, i, s) {
    switch (s) {
      case 1:
        if (this.ure) {
          break;
        }
        return;
      case 2:
        if (this.cre) {
          break;
        }
        return;
      default:
        if (this.mre) {
          break;
        }
        return;
    }
    this.yre(t, i.Entity, this.Joe, this.zoe);
  }
  CollectAiPerceptionEventById(t, i, s) {
    switch (s) {
      case 1:
        if (this.ure) {
          break;
        }
        return;
      case 2:
        if (this.cre) {
          break;
        }
        return;
      default:
        if (this.mre) {
          break;
        }
        return;
    }
    this.Ire(t, i, this.Joe, this.zoe);
  }
  CollectAiRemovePerceptionEventByEntityId(t, i, s) {
    switch (s) {
      case 1:
        if (this.ure) {
          break;
        }
        return;
      case 2:
        if (this.cre) {
          break;
        }
        return;
      default:
        if (this.mre) {
          break;
        }
        return;
    }
    this.Ire(t, i, undefined, this.Zoe);
  }
  AddSceneItemDestroyEvent(t, i) {
    if (!this.dre) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneItemDurabilityEmpty, this.uie);
    }
    this.dre = i;
    this.Cre = t * t;
  }
  RemoveSceneItemDestroyEvent(t) {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneItemDurabilityEmpty, this.uie);
    this.dre = undefined;
    this.gre.clear();
  }
  ForceTriggerSceneItemDestroyEvent(t) {
    if (this.dre?.IsValid()) {
      this.dre.Callback.Broadcast(t, true);
    }
  }
  OnSenseSceneItem(t) {
    var i;
    if (this.dre && !this.gre.has(t.Entity.Id) && (i = t.Entity.GetComponent(112))?.Valid && i.IsDestroyed) {
      this.gre.add(t.Entity.Id);
      this.dre.Callback.Broadcast(t.Owner, true);
    }
  }
  Mre(t, i, s) {
    CombatLog_1.CombatLog.Info("Ai", this.Bte.CharActorComp.Entity, t, ["addIds", i], ["removeIds:", s]);
  }
}
exports.AiPerceptionEvents = AiPerceptionEvents;
//# sourceMappingURL=AiPerceptionEvents.js.map