"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractSecondConfirmContext = exports.CustomContext = exports.CombinationContext = exports.ClientEventContext = exports.GeneralLogicTreeContext = exports.PlotContext = exports.GmLevelActionContext = exports.GuaranteeContext = exports.TriggerContext = exports.InstanceDungeonContext = exports.LevelPlayContext = exports.QuestContext = exports.DynamicInteractContext = exports.EntityContext = exports.GeneralContext = undefined;
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
    let r = GeneralContext.RUe.get(t);
    if (!r) {
      r = [];
      GeneralContext.RUe.set(t, r);
    }
    if (r.length > 0) {
      (s = r.pop()).DUe = false;
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
          break;
        case 13:
          t = DynamicInteractContext.Create(e.EntityId, e.FinalContext);
      }
      return t;
    }
  }
  static ExtractContext(t, e) {
    if (t.Type === e) {
      return t;
    } else {
      return t.Type === 11 && t.GetContextByType(e) || undefined;
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
class DynamicInteractContext extends GeneralContext {
  constructor() {
    super();
    this.EntityId = 0;
    this.FinalContext = undefined;
    this.Type = 13;
  }
  Reset() {
    this.EntityId = 0;
  }
  static Create(t = 0, e, n) {
    n = GeneralContext.GetObj(13, n, DynamicInteractContext);
    n.EntityId = t;
    n.FinalContext = e;
    return n;
  }
}
exports.DynamicInteractContext = DynamicInteractContext;
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
    this.IsClientTrigger = false;
    this.Type = 5;
  }
  static Create(t = 0, e = 0, n, s, r) {
    n = GeneralContext.GetObj(5, n, TriggerContext);
    n.TriggerEntityId = t;
    n.OtherEntityId = e;
    n.TriggerType = s ?? 0;
    n.IsClientTrigger = r ?? false;
    return n;
  }
}
exports.TriggerContext = TriggerContext;
class GuaranteeContext extends GeneralContext {
  constructor() {
    super();
    this.GuaranteeReason = 0;
    this.Type = 7;
  }
  static Create(t, e = 0) {
    t = GeneralContext.GetObj(7, t, GuaranteeContext);
    t.GuaranteeReason = e;
    return t;
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
  static Create(t, e = BigInt(0), n = 0, s = 0, r) {
    r = GeneralContext.GetObj(6, r, GeneralLogicTreeContext);
    r.BtType = t;
    r.TreeIncId = e;
    r.TreeConfigId = n;
    r.NodeId = s;
    return r;
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
class CustomContext extends GeneralContext {
  constructor() {
    super();
    this.jWc = undefined;
    this.Type = 12;
    this.jWc = {};
  }
  SetValueRestricted(t, e) {
    this.jWc[t] = e;
  }
  GetValueRestricted(t) {
    var e = this.jWc;
    if (e && t in e) {
      return e[t];
    }
  }
  static Create() {
    return GeneralContext.GetObj(12, undefined, CustomContext);
  }
}
exports.CustomContext = CustomContext;
class InteractSecondConfirmContext extends GeneralContext {
  constructor() {
    super();
    this.Handle = 0;
    this.Option = undefined;
    this.ConfirmCallback = undefined;
    this.Type = 14;
  }
  static Create(t, e) {
    var n = GeneralContext.GetObj(14, undefined, InteractSecondConfirmContext);
    n.Handle = t;
    n.Option = e;
    return n;
  }
}
exports.InteractSecondConfirmContext = InteractSecondConfirmContext;
//# sourceMappingURL=LevelGeneralContextDefine.js.map