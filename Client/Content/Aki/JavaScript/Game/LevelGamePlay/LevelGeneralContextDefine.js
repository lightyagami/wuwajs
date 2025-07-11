"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombinationContext = exports.ClientEventContext = exports.GeneralLogicTreeContext = exports.PlotContext = exports.GmLevelActionContext = exports.GuaranteeContext = exports.TriggerContext = exports.InstanceDungeonContext = exports.LevelPlayContext = exports.QuestContext = exports.EntityContext = exports.GeneralContext = undefined;
class GeneralContext {
  constructor() {
    this.Type = undefined;
    this.SubType = undefined;
    this.DUe = false;
  }
  Reset() {
    this.SubType = undefined;
  }
  static GetObj(t, e, n) {
    let s = undefined;
    let o = GeneralContext.RUe.get(t);
    if (!o) {
      o = [];
      GeneralContext.RUe.set(t, o);
    }
    if (o.length > 0) {
      (s = o.pop()).DUe = false;
    } else {
      s = new n();
    }
    s.SubType = e;
    return s;
  }
  Release() {
    this.Reset();
    if (!this.DUe) {
      let t = GeneralContext.RUe.get(this.Type);
      if (!t) {
        t = [];
        GeneralContext.RUe.set(this.Type, t);
      }
      t.push(this);
      this.DUe = true;
    }
  }
  static Copy(e) {
    if (e) {
      let t = undefined;
      switch (e.Type) {
        case 2:
          t = QuestContext.Create(e.QuestId, e.SubType);
          break;
        case 3:
          t = LevelPlayContext.Create(e.LevelPlayId, e.SubType);
          break;
        case 1:
          t = EntityContext.Create(e.EntityId, e.SubType);
          break;
        case 4:
          t = InstanceDungeonContext.Create(e.InstanceDungeonId, e.SubType);
          break;
        case 5:
          t = TriggerContext.Create(e.TriggerEntityId, e.OtherEntityId, e.SubType, e.TriggerType);
          break;
        case 6:
          t = GeneralLogicTreeContext.Create(e.BtType, e.TreeIncId, e.TreeConfigId, e.NodeId, e.SubType);
          break;
        case 7:
          t = TriggerContext.Create(e.SubType);
          break;
        case 10:
          t = ClientEventContext.Create(e.EventName, ...e.Params);
          break;
        case 11:
          t = CombinationContext.Create(...e.Contexts);
      }
      return t;
    }
  }
}
(exports.GeneralContext = GeneralContext).RUe = new Map();
class EntityContext extends GeneralContext {
  constructor() {
    super();
    this.EntityId = 0;
    this.ClientExecuteActions = false;
    this.Type = 1;
  }
  Reset() {
    this.EntityId = 0;
  }
  static Create(t = 0, e) {
    e = GeneralContext.GetObj(1, e, EntityContext);
    e.EntityId = t;
    return e;
  }
}
exports.EntityContext = EntityContext;
class QuestContext extends GeneralContext {
  constructor() {
    super();
    this.QuestId = 0;
    this.Type = 2;
  }
  Reset() {
    this.QuestId = 0;
  }
  static Create(t = 0, e) {
    e = GeneralContext.GetObj(2, e, QuestContext);
    e.QuestId = t;
    return e;
  }
}
exports.QuestContext = QuestContext;
class LevelPlayContext extends GeneralContext {
  constructor() {
    super();
    this.LevelPlayId = 0;
    this.Type = 3;
  }
  Reset() {
    this.LevelPlayId = 0;
  }
  static Create(t = 0, e) {
    e = GeneralContext.GetObj(3, e, LevelPlayContext);
    e.LevelPlayId = t;
    return e;
  }
}
exports.LevelPlayContext = LevelPlayContext;
class InstanceDungeonContext extends GeneralContext {
  constructor() {
    super();
    this.InstanceDungeonId = 0;
    this.Type = 4;
  }
  Reset() {
    this.InstanceDungeonId = 0;
  }
  static Create(t = 0, e, n) {
    n = GeneralContext.GetObj(4, n, InstanceDungeonContext);
    n.InstanceDungeonId = t;
    return n;
  }
}
exports.InstanceDungeonContext = InstanceDungeonContext;
class TriggerContext extends GeneralContext {
  constructor() {
    super();
    this.TriggerEntityId = 0;
    this.OtherEntityId = 0;
    this.TriggerType = 0;
    this.IsClientPrePerform = false;
    this.Type = 5;
  }
  static Create(t = 0, e = 0, n, s, o) {
    n = GeneralContext.GetObj(5, n, TriggerContext);
    n.TriggerEntityId = t;
    n.OtherEntityId = e;
    n.TriggerType = s ?? 0;
    n.IsClientPrePerform = o ?? false;
    return n;
  }
}
exports.TriggerContext = TriggerContext;
class GuaranteeContext extends GeneralContext {
  constructor() {
    super();
    this.Type = 7;
  }
  static Create(t) {
    return GeneralContext.GetObj(7, t, GuaranteeContext);
  }
}
exports.GuaranteeContext = GuaranteeContext;
class GmLevelActionContext extends GeneralContext {
  constructor() {
    super();
    this.Type = 8;
  }
  Reset() {}
  static Create(t) {
    return GeneralContext.GetObj(8, t, GmLevelActionContext);
  }
}
exports.GmLevelActionContext = GmLevelActionContext;
class PlotContext extends GeneralContext {
  constructor() {
    super();
    this.FlowIncId = 0;
    this.Type = 9;
  }
  Reset() {
    this.FlowIncId = 0;
  }
  static Create(t, e) {
    e = GeneralContext.GetObj(8, e, PlotContext);
    e.FlowIncId = t;
    return e;
  }
}
exports.PlotContext = PlotContext;
class GeneralLogicTreeContext extends GeneralContext {
  constructor() {
    super();
    this.TreeIncId = BigInt(0);
    this.TreeConfigId = 0;
    this.NodeId = 0;
    this.BtType = 0;
    this.Type = 6;
  }
  Reset() {
    this.TreeIncId = BigInt(0);
    this.NodeId = 0;
  }
  static Create(t, e = BigInt(0), n = 0, s = 0, o) {
    o = GeneralContext.GetObj(6, o, GeneralLogicTreeContext);
    o.BtType = t;
    o.TreeIncId = e;
    o.TreeConfigId = n;
    o.NodeId = s;
    return o;
  }
}
exports.GeneralLogicTreeContext = GeneralLogicTreeContext;
class ClientEventContext extends GeneralContext {
  constructor() {
    super();
    this.EventName = undefined;
    this.Params = undefined;
    this.Type = 10;
  }
  GetEventHandleParams() {
    return this.Params;
  }
  Reset() {
    this.EventName = undefined;
    this.Params = undefined;
  }
  static Create(t, ...e) {
    var n = GeneralContext.GetObj(10, undefined, ClientEventContext);
    n.EventName = t;
    n.Params = e;
    return n;
  }
}
exports.ClientEventContext = ClientEventContext;
class CombinationContext extends GeneralContext {
  constructor() {
    super();
    this.Contexts = undefined;
    this.Type = 11;
  }
  Reset() {
    this.Contexts = undefined;
  }
  static Create(...t) {
    var e = GeneralContext.GetObj(11, undefined, CombinationContext);
    e.Contexts = [];
    for (const n of t) {
      if (n.Type !== e.Type) {
        e.Contexts.push(n);
      }
    }
    return e;
  }
  GetContextByType(t) {
    if (this.Contexts) {
      for (const e of this.Contexts) {
        if (e.Type === t) {
          return e;
        }
      }
    }
  }
}
exports.CombinationContext = CombinationContext;
//# sourceMappingURL=LevelGeneralContextDefine.js.map