"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetBattleState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class NotifyData {
  constructor() {
    this.Entities = undefined;
    this.Target = undefined;
  }
}
class LevelEventSetBattleState extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.MRe = new Array();
    this.ERe = 0;
    this.SRe = 0;
    this.aDe = undefined;
    this.yRe = undefined;
    this.IRe = undefined;
  }
  ExecuteInGm(t, e) {
    this.FinishExecute(true);
  }
  ExecuteNew(t, e) {
    if (t) {
      this.aDe = t.StateOption;
      switch (this.aDe.Type) {
        case IAction_1.ESetBattleStateType.SetBattleTag:
          if (this.aDe.SetTags && this.aDe.SetTags.length !== 0) {
            var i = [];
            for (const a of this.aDe.SetTags) {
              i.push(a.EntityId);
              var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a.EntityId);
              if (a.BeforeHide) {
                o?.Entity?.GetComponent(205)?.AddTag(447365096);
              }
            }
            this.CreateWaitEntityTask(i);
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Event", 33, "LevelEventSetBattleState CreateWaitEntityTask", ["EntityIds", i]);
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Event", 33, "LevelEventSetBattleState 未配置具体操作对象");
            }
            this.FinishExecute(false);
          }
          break;
        case IAction_1.ESetBattleStateType.NotifyMonsterPerception:
          this.TRe(this.aDe);
          break;
        case IAction_1.ESetBattleStateType.NotifyMonsterPlayStandbyTags:
          this.LRe(this.aDe, e);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 33, "LevelEventSetBattleState 参数不合法");
      }
      this.FinishExecute(false);
    }
  }
  ExecuteWhenEntitiesReady() {
    switch (this.aDe.Type) {
      case IAction_1.ESetBattleStateType.SetBattleTag:
        this.DRe();
        break;
      case IAction_1.ESetBattleStateType.NotifyMonsterPerception:
        this.RRe(this.yRe);
    }
  }
  DRe() {
    var t = this.aDe;
    this.ERe = t.SetTags.length;
    for (const i of t.SetTags) {
      const o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i.EntityId);
      if (o?.IsInit) {
        const a = i.GameplayTag;
        var e = i.DelayTime;
        switch (i.SetType) {
          case IAction_1.ESetEntityTagType.Add:
            if (e && e > 0) {
              this.MRe.push(TimerSystem_1.TimerSystem.Delay(() => {
                this.URe(i.EntityId, o, a);
              }, e * TimeUtil_1.TimeUtil.InverseMillisecond));
            } else {
              this.URe(i.EntityId, o, a);
            }
            break;
          case IAction_1.ESetEntityTagType.Remove:
            if (e && e > 0) {
              this.MRe.push(TimerSystem_1.TimerSystem.Delay(() => {
                this.ARe(i.EntityId, o, a);
              }, e * TimeUtil_1.TimeUtil.InverseMillisecond));
            } else {
              this.ARe(i.EntityId, o, a);
            }
        }
      } else {
        this.SRe += 1;
      }
    }
    if (this.SRe >= this.ERe) {
      this.FinishExecute(true);
    }
  }
  URe(t, e, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Event", 33, "LevelEventSetBattleState AddTag", ["EntityId", t], ["TagName", i]);
    }
    e = e.Entity.GetComponent(205);
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 33, "LevelEventSetBattleState AddTagByName", ["EntityId", t], ["TagName", i]);
      }
      e.AddTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i));
      this.SRe += 1;
      if (this.SRe >= this.ERe) {
        this.FinishExecute(true);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  ARe(t, e, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Event", 33, "LevelEventSetBattleState RemoveTag", ["EntityId", t], ["TagName", i]);
    }
    e = e.Entity.GetComponent(205);
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 33, "LevelEventSetBattleState RemoveTagByName", ["EntityId", t], ["TagName", i]);
      }
      e.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i));
      this.SRe += 1;
      if (this.SRe >= this.ERe) {
        this.FinishExecute(true);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  TRe(t) {
    var e = [];
    var i = [];
    for (const s of t.EntityIds) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s);
      if (!o?.Valid) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 31, "被通知Entity不合法", ["ID", s]);
        }
        this.FinishExecute(false);
        return;
      }
      o = o.Entity.GetComponent(47);
      if (!o?.Valid) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 31, "被通知Entity没有AIComponent", ["ID", s]);
        }
        this.FinishExecute(false);
        return;
      }
      e.push(o.AiController);
      i.push(s);
    }
    this.yRe = new NotifyData();
    this.yRe.Entities = e;
    switch (t.PerceptionBehaviorOption.Type) {
      case IAction_1.EBattleStatePerceptionBehavior.NotifyGatherToEntity:
        var a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.PerceptionBehaviorOption.EntityId);
        if (a?.Valid) {
          if ((a = a.Entity.GetComponent(1))?.Valid) {
            this.yRe.Target = a;
            i.push(t.PerceptionBehaviorOption.EntityId);
            this.CreateWaitEntityTask(i);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Event", 33, "未能获取到该实体对应的有效Actor", ["entityId", t.PerceptionBehaviorOption.EntityId]);
            }
            this.FinishExecute(false);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 33, "中心实体不合法", ["ID", t.PerceptionBehaviorOption.EntityId]);
          }
          this.FinishExecute(false);
        }
        break;
      case IAction_1.EBattleStatePerceptionBehavior.NotifyGatherToPlayer:
        this.yRe.Target = Global_1.Global.BaseCharacter.CharacterActorComponent;
        this.CreateWaitEntityTask(i);
    }
  }
  RRe(t) {
    for (const a of t.Entities) {
      if (!a.CharActorComp.Entity.IsInit) {
        return;
      }
    }
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("qianxing_notify_interval");
    const i = Global_1.Global.BaseCharacter.CharacterActorComponent;
    if (i?.Valid) {
      t.Entities.sort((t, e) => {
        return Vector_1.Vector.DistSquared(i.ActorLocationProxy, t.CharActorComp.ActorLocationProxy) - Vector_1.Vector.DistSquared(i.ActorLocationProxy, e.CharActorComp.ActorLocationProxy);
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 31, "[NotifyGatherToEntity] 获取不到BaseCharacter的CharacterActorComponent，无法通知怪物靠近");
    }
    let o = 0;
    this.IRe = TimerSystem_1.TimerSystem.Loop(() => {
      t.Entities[o++].AiPerceptionEvents.ForceTriggerSceneItemDestroyEvent(t.Target.Owner);
    }, e, t.Entities.length);
  }
  LRe(t, e) {
    if (t.StandbyTags.length !== 0 && e.Type === 1) {
      e = EntitySystem_1.EntitySystem.Get(e.EntityId);
      if (e && e.GetComponent(47)?.AiController?.AiPatrol) {
        const o = e.GetComponent(1);
        e = e.GetComponent(48);
        if (e && e.GetLastPointRawIndex() !== -1) {
          var i = Math.floor(MathUtils_1.MathUtils.GetRandomFloatNumber(0, t.StandbyTags.length));
          const a = Protocol_1.Aki.Protocol.Mgs.create();
          a.F4n = MathUtils_1.MathUtils.NumberToLong(o.CreatureData.GetCreatureDataId());
          a.u5n = e.GetCurrentPatrolSplineId();
          a.c5n = e.GetLastPointRawIndex();
          a.m5n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.StandbyTags[i]);
          Net_1.Net.Call(25867, a, t => {
            if (t && t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("AI", 50, "请求状态机切换生态表演失败", ["CreatureId", a.F4n], ["PbDataId", o.CreatureData.GetPbDataId()], ["SplineId", a.u5n], ["Index", a.c5n], ["Tag", a.m5n]);
            }
          });
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 50, "[NotifyMonsterStandByTags] 获取不到巡逻组件，无法通知怪物切换表演状态");
        }
      }
    }
    this.FinishExecute(true);
  }
  OnReset() {
    for (const t of this.MRe) {
      if (TimerSystem_1.TimerSystem.Has(t)) {
        TimerSystem_1.TimerSystem.Remove(t);
      }
    }
    if (this.IRe !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.IRe);
    }
    this.MRe.length = 0;
    this.ERe = 0;
    this.SRe = 0;
  }
}
exports.LevelEventSetBattleState = LevelEventSetBattleState;
//# sourceMappingURL=LevelEventSetBattleState.js.map