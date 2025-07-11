"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiLevelVarEvent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
class LevelVarEventPair {
  constructor() {
    this.LevelVar = undefined;
    this.EventBinder = undefined;
    this.CurrentValueInternal = false;
    this.IsInit = false;
  }
  set CurrentValue(e) {
    if (this.CurrentValueInternal !== e && (this.CurrentValueInternal = e, this.EventBinder instanceof UE.KuroBooleanEventBinder || this.EventBinder instanceof UE.KuroIntEventBinder)) {
      this.EventBinder.Callback.Broadcast(e);
    }
  }
  get CurrentValue() {
    return this.CurrentValueInternal;
  }
  Init(e, t) {
    this.LevelVar = e;
    this.EventBinder = t;
    return true;
  }
  Clear() {
    this.LevelVar = undefined;
    this.EventBinder = undefined;
  }
  ParseValue(e, t = true) {
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 31, "添加监听的变量未找到", ["Key", this.LevelVar.VarName], ["QuestId", this.LevelVar.Id]);
      }
      return false;
    } else if (this.EventBinder instanceof UE.KuroBooleanEventBinder) {
      if (e.rTs === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AI", 31, "添加监听的变量类型不正确", ["Key", this.LevelVar.VarName], ["QuestId", this.LevelVar.Id]);
        }
        return false;
      } else {
        if (t) {
          this.CurrentValueInternal = e.rTs;
        } else {
          this.CurrentValue = e.rTs;
        }
        return true;
      }
    } else {
      return this.EventBinder instanceof UE.KuroIntEventBinder && (e.oTs === undefined ? (Log_1.Log.CheckError() && Log_1.Log.Error("AI", 31, "添加监听的变量类型不正确", ["Key", this.LevelVar.VarName], ["QuestId", this.LevelVar.Id]), false) : (t ? this.CurrentValueInternal = MathUtils_1.MathUtils.LongToNumber(e.oTs) : this.CurrentValue = MathUtils_1.MathUtils.LongToNumber(e.oTs), true));
    }
  }
}
class EntityVarEventPair extends LevelVarEventPair {
  constructor() {
    super(...arguments);
    this.Jh = undefined;
    this.z_c = (e, t) => {
      if (e === this.LevelVar.VarName) {
        this.ParseValue(t, false);
      }
    };
  }
  Init(e, t) {
    super.Init(e, t);
    var s;
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.Id);
    if (t && t.Entity) {
      if (s = t.Entity?.GetComponent(0)) {
        if ((s = s.GetEntityVar(e.VarName)) === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("AI", 31, "添加监听的变量未找到", ["Key", e.VarName], ["EntityId", e.Id]);
          }
          return false;
        } else {
          this.ParseValue(s, true);
          this.Jh = t.Entity;
          EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.EntityVarUpdate, this.z_c);
          return this.IsInit = true;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AI", 31, "未找到对应实体的CreatureDataComponent", ["Key", e.VarName], ["EntityId", e.Id]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 31, "添加监听的变量来源实体未找到", ["Key", e.VarName], ["EntityId", e.Id]);
      }
      return false;
    }
  }
  Clear() {
    super.Clear();
    if (this.Jh && EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.EntityVarUpdate, this.z_c)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.EntityVarUpdate, this.z_c);
    }
  }
}
class TreeVarEventPair extends LevelVarEventPair {
  constructor() {
    super(...arguments);
    this.TreeIncId = undefined;
  }
  Init(e, t) {
    super.Init(e, t);
    var s = e.VarSource;
    switch (s) {
      case 4:
        if (this.J_c()) {
          break;
        }
        return false;
      case 3:
        if (this.Z_c()) {
          break;
        }
        return false;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AI", 31, "添加监听的变量来源非树", ["Key", e.VarName], ["Source", s]);
        }
        return false;
    }
    return this.IsInit = true;
  }
  OnReceiveTreeVar() {
    if (this.IsInit) {
      var e = this.LevelVar.VarSource;
      switch (e) {
        case 4:
          this.J_c(false);
          break;
        case 3:
          this.Z_c(false);
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("AI", 31, "添加监听的变量来源非树", ["Key", this.LevelVar.VarName], ["Source", e]);
          }
      }
    }
  }
  Z_c(e = true) {
    var t;
    var s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.LevelVar.Id)?.Tree;
    if (s) {
      t = s.GetTreeVarByKey(this.LevelVar.VarName);
      this.TreeIncId = s.TreeIncId;
      return this.ParseValue(t, e);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 31, "添加监听的变量来源树未找到", ["Key", this.LevelVar.VarName], ["QuestId", this.LevelVar.Id]);
      }
      return false;
    }
  }
  J_c(e = true) {
    var t;
    var s = this.LevelVar.Id;
    let i = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(s)?.Tree;
    if (!i) {
      if ((t = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo())?.TreeConfigId === s) {
        i = t.Tree;
      }
    }
    if (i) {
      s = i.GetTreeVarByKey(this.LevelVar.VarName);
      this.TreeIncId = i.TreeIncId;
      return this.ParseValue(s, e);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 31, "添加监听的变量来源树未找到", ["Key", this.LevelVar.VarName], ["QuestId", this.LevelVar.Id]);
      }
      return false;
    }
  }
}
class PlayerVarEventPair extends LevelVarEventPair {
  Init(e, t) {
    super.Init(e, t);
    t = ModelManager_1.ModelManager.WorldModel.GetWorldState(e.VarName);
    if (t === undefined || typeof t == "string") {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 31, "添加监听的玩家变量类型不正确或未找到", ["Key", e.VarName], ["Value", t]);
      }
      return false;
    } else {
      this.CurrentValue = t;
      return this.IsInit = true;
    }
  }
  OnReceivePlayerVar() {
    if (this.IsInit) {
      this.CurrentValue = ModelManager_1.ModelManager.WorldModel.GetWorldState(this.LevelVar.VarName);
    }
  }
}
class AiLevelVarEvent {
  constructor() {
    this.ecc = new Array();
    this.tcc = new Array();
    this.icc = new Array();
    this.rcc = e => {
      for (const t of this.tcc) {
        if (t.TreeIncId === e) {
          t.OnReceiveTreeVar();
        }
      }
    };
    this.bir = () => {
      for (const e of this.icc) {
        e.OnReceivePlayerVar();
      }
    };
  }
  AddLevelVarEvent(e, t) {
    switch (e.VarSource) {
      case 1:
      case 2:
        var s = new EntityVarEventPair();
        if (s.Init(e, t)) {
          this.ecc.push(s);
        }
        break;
      case 4:
      case 3:
        s = new TreeVarEventPair();
        if (s.Init(e, t)) {
          this.tcc.push(s);
        }
        break;
      case 0:
        s = new PlayerVarEventPair();
        if (s.Init(e, t)) {
          this.icc.push(s);
        }
    }
    if (this.tcc.length > 0) {
      if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh, this.rcc)) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh, this.rcc);
      }
    }
    if (this.tcc.length > 0) {
      if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnReceivePlayerVar, this.bir)) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnReceivePlayerVar, this.bir);
      }
    }
  }
  RemoveLevelVarEvent(e) {
    let t = 0;
    for (const s of this.ecc) {
      if (s.EventBinder === e) {
        s.Clear();
        break;
      }
      t++;
    }
    if (t < this.ecc.length) {
      this.ecc.splice(t);
      return true;
    }
    t = 0;
    for (const i of this.tcc) {
      if (i.EventBinder === e) {
        i.Clear();
        break;
      }
      t++;
    }
    if (t < this.tcc.length) {
      this.tcc.splice(t);
      if (this.tcc.length === 0 && EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh, this.rcc)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh, this.rcc);
      }
      return true;
    }
    t = 0;
    for (const r of this.icc) {
      if (r.EventBinder === e) {
        r.Clear();
        break;
      }
      t++;
    }
    return t < this.icc.length && (this.icc.splice(t), this.icc.length === 0 && EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnReceivePlayerVar, this.bir) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnReceivePlayerVar, this.bir), true);
  }
  Clear() {
    for (const e of this.ecc) {
      e.Clear();
    }
    this.ecc.length = 0;
    for (const t of this.tcc) {
      t.Clear();
    }
    this.tcc.length = 0;
    for (const s of this.icc) {
      s.Clear();
    }
    this.icc.length = 0;
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh, this.rcc)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh, this.rcc);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnReceivePlayerVar, this.bir)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnReceivePlayerVar, this.bir);
    }
  }
}
exports.AiLevelVarEvent = AiLevelVarEvent;
//# sourceMappingURL=AiLevelVarEvent.js.map