"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntitySystem = undefined;
const Stats_1 = require("../Common/Stats");
const GameBudgetInterfaceController_1 = require("../GameBudgetAllocator/GameBudgetInterfaceController");
const ObjectSystem_1 = require("../Object/ObjectSystem");
const BINARY_SEARCH_THREADHOLD = 4;
class TickEntityGroup {
  constructor(t) {
    this.Priority = t;
    this.Entities = new Map();
  }
}
class TickEntityManager {
  constructor() {
    this.jW = new Map();
    this.WW = new Array();
    this.KW = new Map();
    this.QW = false;
    this.XW = new Array();
    this.$W = new Array();
  }
  Add(t, i) {
    this.KW.set(t.Id, i);
    if (this.QW) {
      this.XW.push(t);
    } else {
      this.YW(t, i);
    }
  }
  YW(t, i) {
    let e = this.jW.get(i);
    if (!e) {
      e = new TickEntityGroup(i);
      this.jW.set(i, e);
      this.WW.splice(this.JW(i), 0, e);
    }
    e.Entities.set(t.Id, t);
  }
  JW(i) {
    var e = this.WW.length;
    if (e < BINARY_SEARCH_THREADHOLD) {
      for (let t = 0; t < e; ++t) {
        if (this.WW[t].Priority < i) {
          return t;
        }
      }
      return e;
    }
    if (this.WW[0].Priority < i) {
      return 0;
    }
    let t = 0;
    let s = e;
    while (s - t > 1) {
      var r = t + s >> 1;
      if (this.WW[r].Priority > i) {
        t = r;
      } else {
        s = r;
      }
    }
    return s;
  }
  Delete(t) {
    var i = this.KW.get(t);
    if (i !== undefined) {
      if (this.QW) {
        this.$W.push(t);
      } else {
        this.zW(t, i);
      }
    }
  }
  zW(t, i) {
    this.KW.delete(t);
    this.jW.get(i).Entities.delete(t);
  }
  ForceTick(t) {
    TickEntityManager.ZW.Start();
    this.QW = true;
    for (const i of this.WW) {
      for (const e of i.Entities.values()) {
        if (e.Valid && e.IsInit) {
          e.ForceTick(t);
        }
      }
    }
    this.QW = false;
    this.eK();
    TickEntityManager.ZW.Stop();
  }
  Tick(t) {
    if (!GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
      TickEntityManager.gW.Start();
      this.QW = true;
      for (const i of this.WW) {
        for (const e of i.Entities.values()) {
          if (e.Valid && e.IsInit) {
            e.Tick(t);
          }
        }
      }
      this.QW = false;
      this.eK();
      TickEntityManager.gW.Stop();
    }
  }
  ForceAfterTick(t) {
    TickEntityManager.tK.Start();
    this.QW = true;
    for (const i of this.WW) {
      for (const e of i.Entities.values()) {
        if (e.Valid && e.IsInit) {
          e.ForceAfterTick(t);
        }
      }
    }
    this.QW = false;
    this.eK();
    TickEntityManager.tK.Stop();
  }
  AfterTick(t) {
    if (!GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
      TickEntityManager.fW.Start();
      this.QW = true;
      for (const i of this.WW) {
        for (const e of i.Entities.values()) {
          if (e.Valid && e.IsInit) {
            e.AfterTick(t);
          }
        }
      }
      this.QW = false;
      this.eK();
      TickEntityManager.fW.Stop();
    }
  }
  eK() {
    for (const e of this.XW) {
      var t;
      if (e.Valid && (t = this.KW.get(e.Id)) !== undefined) {
        this.YW(e, t);
      }
    }
    this.XW.length = 0;
    for (const s of this.$W) {
      var i = this.KW.get(s);
      if (i !== undefined) {
        this.zW(s, i);
      }
    }
    this.$W.length = 0;
  }
  Clear() {
    this.jW.clear();
    this.WW.length = 0;
  }
}
TickEntityManager.ZW = Stats_1.Stat.Create("TickEntityManager.ForceTick");
TickEntityManager.gW = Stats_1.Stat.Create("TickEntityManager.Tick");
TickEntityManager.tK = Stats_1.Stat.Create("TickEntityManager.ForceAfterTick");
TickEntityManager.fW = Stats_1.Stat.Create("TickEntityManager.AfterTick");
class EntitySystem {
  constructor() {}
  static Initialize() {
    this.iK.Clear();
    this.oK.Clear();
    return true;
  }
  static SetEntityDestroyHandle(t) {
    EntitySystem.$wa = t;
  }
  static Create(t, i = 0, e) {
    t = ObjectSystem_1.ObjectSystem.Create(t);
    if (t.Create(e)) {
      if (t.TickComponentManager.NeedTick) {
        this.iK.Add(t, i);
      }
      if (t.TickComponentManager.NeedAfterTick) {
        this.oK.Add(t, i);
      }
      return t;
    }
    ObjectSystem_1.ObjectSystem.Destroy(t);
  }
  static CreateExternal(t, i, e = 0, s) {
    return !!ObjectSystem_1.ObjectSystem.CreateExternal(i) && (i.Create(s) ? (i.TickComponentManager.NeedTick && this.iK.Add(i, e), i.TickComponentManager.NeedAfterTick && this.oK.Add(i, e), true) : (ObjectSystem_1.ObjectSystem.Destroy(i), false));
  }
  static Respawn(t, i = false, e = 0, s) {
    return (!!i || !!ObjectSystem_1.ObjectSystem.CreateExternal(t)) && !!t.Respawn(s) && !(t.TickComponentManager.NeedTick && this.iK.Add(t, e), t.TickComponentManager.NeedAfterTick && this.oK.Add(t, e), 0);
  }
  static InitData(t, i) {
    return t.InitData(i);
  }
  static Init(t) {
    return !!t.Init() || (ObjectSystem_1.ObjectSystem.Destroy(t), false);
  }
  static Start(t) {
    return !!t.Start() || (ObjectSystem_1.ObjectSystem.Destroy(t), false);
  }
  static Activate(t) {
    t.Activate();
  }
  static PostActive(t) {
    t.PostActivate();
  }
  static Destroy(t) {
    return !!ObjectSystem_1.ObjectSystem.Destroy(t) && !(GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen && t.UnregisterFromGameBudgetController(), t.TickComponentManager.NeedTick && this.iK.Delete(t.Id), t.TickComponentManager.NeedAfterTick && this.oK.Delete(t.Id), !t.End()) && !!t.Clear() && !(EntitySystem.$wa && EntitySystem.$wa(t), 0);
  }
  static DeSpawn(t) {
    return !!ObjectSystem_1.ObjectSystem.Destroy(t) && !(GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen && t.UnregisterFromGameBudgetController(), t.TickComponentManager.NeedTick && this.iK.Delete(t.Id), t.TickComponentManager.NeedAfterTick && this.oK.Delete(t.Id), !t.End()) && !!t.Clear() && !(EntitySystem.$wa && EntitySystem.$wa(t), 0);
  }
  static Get(t) {
    var i = ObjectSystem_1.ObjectSystem.Objects[t >>> ObjectSystem_1.ObjectSystem.VersionDigit];
    if (i && i.Id === t) {
      return i;
    }
  }
  static GetComponent(t, i) {
    return this.Get(t)?.GetComponent(i);
  }
  static ForceTick(t) {
    this.iK.ForceTick(t);
  }
  static Tick(t) {
    this.iK.Tick(t);
  }
  static ForceAfterTick(t) {
    this.iK.ForceAfterTick(t);
  }
  static AfterTick(t) {
    this.oK.AfterTick(t);
  }
}
(exports.EntitySystem = EntitySystem).iK = new TickEntityManager();
EntitySystem.oK = new TickEntityManager();
EntitySystem.$wa = undefined; //# sourceMappingURL=EntitySystem.js.map