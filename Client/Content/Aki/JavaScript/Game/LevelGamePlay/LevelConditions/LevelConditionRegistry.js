"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionRegistry = exports.ConditionPassCallback = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const ConditionById_1 = require("../../../Core/Define/ConfigQuery/ConditionById");
const ConditionGroupById_1 = require("../../../Core/Define/ConfigQuery/ConditionGroupById");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralDefine_1 = require("../LevelGeneralDefine");
const LevelConditionCenter_1 = require("./LevelConditionCenter");
class ConditionPassCallback {
  constructor(e, t) {
    this.Callback = e;
    this.Params = t;
  }
}
exports.ConditionPassCallback = ConditionPassCallback;
class LevelConditionRegData {
  constructor(e, t, i) {
    var n;
    this.ConditionReached = false;
    this.nLe = undefined;
    this.sLe = (...e) => {
      this.nLe ||= Stats_1.Stat.CreateNoFlameGraph("OnEventInvokeCheckStat_" + this.ConditionConfig.Type);
      this.nLe.Start();
      var t = this.ConditionReached;
      var e = ControllerHolder_1.ControllerHolder.LevelGeneralController.HandleCondition(this.ConditionConfig, undefined, this.Owner.ConditionGroupId.toString(), ...e);
      if (t !== e && (this.ConditionReached = e)) {
        this.Owner.CheckReached();
      }
      this.nLe.Stop();
    };
    this.Owner = e;
    this.ConditionConfig = t;
    this.EventNames = i;
    if (this.ConditionConfig.Type === LevelGeneralDefine_1.ELevelGeneralCondition.PawnInRange) {
      e = this.ConditionConfig.LimitParams.get("PawnId");
      t = Number(this.ConditionConfig.LimitParams.get("Distance"));
      LevelConditionRegistry.AddPawnInRangeMap(e, t);
    }
    if (this.ConditionConfig.Type === LevelGeneralDefine_1.ELevelGeneralCondition.CheckRangeByPbDataId) {
      i = this.ConditionConfig.LimitParams.get("PbDataId");
      e = Number(this.ConditionConfig.LimitParams.get("Distance"));
      LevelConditionRegistry.AddPbDataInRangeMap(parseInt(i), e);
    }
    for (const s of this.EventNames) {
      if (s === EventDefine_1.EEventName.OnGlobalGameplayTagChanged) {
        EventSystem_1.EventSystem.AddWithTarget(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(this.ConditionConfig.LimitParams.get("Tag")), s, this.sLe);
      } else if (s === EventDefine_1.EEventName.OnEntityFightByBpType && this.ConditionConfig.Type === LevelGeneralDefine_1.ELevelGeneralCondition.FightWithMonster) {
        if (n = this.ConditionConfig.LimitParams.get("MonsterId")) {
          EventSystem_1.EventSystem.AddWithCondition(EventDefine_1.EEventName.OnEntityFightByBpType, this.sLe, n);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${this.ConditionConfig.Id}的MonsterId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.FightWithMonster}的定义`);
        }
      } else {
        EventSystem_1.EventSystem.Add(s, this.sLe);
      }
    }
  }
  Destroy() {
    var e;
    var t;
    if (this.ConditionConfig.Type === LevelGeneralDefine_1.ELevelGeneralCondition.PawnInRange) {
      e = this.ConditionConfig.LimitParams.get("PawnId");
      LevelConditionRegistry.RemovePawnInRangeMap(e);
    }
    if (this.ConditionConfig.Type === LevelGeneralDefine_1.ELevelGeneralCondition.CheckRangeByPbDataId) {
      e = this.ConditionConfig.LimitParams.get("PbDataId");
      LevelConditionRegistry.RemovePbDataInRangeMap(parseInt(e));
    }
    for (const i of this.EventNames) {
      if (i === EventDefine_1.EEventName.OnGlobalGameplayTagChanged) {
        EventSystem_1.EventSystem.RemoveWithTarget(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(this.ConditionConfig.LimitParams.get("Tag")), i, this.sLe);
      } else if (i === EventDefine_1.EEventName.OnEntityFightByBpType && this.ConditionConfig.Type === LevelGeneralDefine_1.ELevelGeneralCondition.FightWithMonster) {
        if (t = this.ConditionConfig.LimitParams.get("MonsterId")) {
          EventSystem_1.EventSystem.RemoveWithCondition(EventDefine_1.EEventName.OnEntityFightByBpType, this.sLe, t);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${this.ConditionConfig.Id}的MonsterId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.FightWithMonster}的定义`);
        }
      } else {
        EventSystem_1.EventSystem.Remove(i, this.sLe);
      }
    }
  }
}
class LevelConditionGroupRegData {
  constructor(e) {
    this.aLe = new Set();
    this.hLe = new Set();
    this.ConditionGroupId = e;
    e = ConditionGroupById_1.configConditionGroupById.GetConfig(this.ConditionGroupId);
    if (e) {
      this.lLe = e.Relation === 1;
      for (const n of e.GroupId) {
        var t;
        var i = ConditionById_1.configConditionById.GetConfig(n);
        if (i && (t = LevelConditionCenter_1.LevelConditionCenter.GetConditionEventNames(i.Type)).length) {
          this.aLe.add(new LevelConditionRegData(this, i, t));
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelConditionRegistry", 16, "初始化事件条件组时, 找不到条件组配置", ["条件组Id", this.ConditionGroupId]);
    }
  }
  IsValid() {
    return this.aLe.size > 0;
  }
  InvokeCallbacks() {
    for (const e of this.hLe) {
      e.Callback?.(e.Params);
    }
  }
  CheckReached() {
    if (this.lLe) {
      for (const e of this.aLe) {
        if (e.ConditionReached) {
          this.InvokeCallbacks();
          return;
        }
      }
    } else {
      for (const t of this.aLe) {
        if (!t.ConditionReached) {
          return;
        }
      }
      this.InvokeCallbacks();
    }
  }
  AddCallBack(e) {
    this.hLe.add(e);
  }
  RemoveCallBack(e) {
    if (!this.hLe.delete(e)) {
      return false;
    }
    if (this.hLe.size > 0) {
      return false;
    }
    for (const t of this.aLe) {
      t.Destroy();
      this.aLe.delete(t);
    }
    return true;
  }
}
class LevelConditionRegistry {
  static RegisterConditionGroup(e, t) {
    let i = this._Le.get(e);
    if (!i) {
      i = new LevelConditionGroupRegData(e);
      this._Le.set(e, i);
    }
    return !!i.IsValid() && (i.AddCallBack(t), true);
  }
  static UnRegisterConditionGroup(e, t) {
    var i = this._Le.get(e);
    if (i && i.RemoveCallBack(t) && !i.IsValid()) {
      this._Le.delete(e);
    }
  }
  static AddPawnInRangeMap(e, t) {
    this.uLe.set(e, t);
  }
  static RemovePawnInRangeMap(e) {
    this.uLe.delete(e);
  }
  static AddPbDataInRangeMap(e, t) {
    this.cLe.set(e, t);
  }
  static RemovePbDataInRangeMap(e) {
    this.cLe.delete(e);
  }
  static RegisterEntityPawnRange(e) {
    var t;
    var i = e?.GetComponent(0);
    if (i) {
      t = i.GetPbDataId();
      if (this.cLe.has(t)) {
        e?.GetComponent(130)?.SetGuideRange(this.cLe.get(t));
      } else if ((t = i.GetPbEntityInitData()?.BlueprintType) && this.uLe.has(t)) {
        e?.GetComponent(130)?.SetGuideRange(this.uLe.get(t));
      }
    }
  }
}
(exports.LevelConditionRegistry = LevelConditionRegistry)._Le = new Map();
LevelConditionRegistry.uLe = new Map();
LevelConditionRegistry.cLe = new Map(); //# sourceMappingURL=LevelConditionRegistry.js.map