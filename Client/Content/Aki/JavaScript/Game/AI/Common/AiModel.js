"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const AiBehaviorTreeById_1 = require("../../../Core/Define/ConfigQuery/AiBehaviorTreeById");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const LevelGeneralController_1 = require("../../LevelGamePlay/LevelGeneralController");
const ModelManager_1 = require("../../Manager/ModelManager");
const FlowController_1 = require("../../Module/Plot/Flow/FlowController");
const RangeCheck_1 = require("../../Module/Util/RangeCheck");
const PlayMontageUtils_1 = require("../../NewWorld/Character/Npc/Logics/PlayMontageUtils");
const AiTeam_1 = require("../Team/AiTeam");
const ScoreUpdateManager_1 = require("./ScoreUpdateManager");
class AiModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ActiveAiTeams = new Map();
    this.ActiveAiControllers = new Map();
    this.AiScoreManager = new ScoreUpdateManager_1.ScoreUpdateManager();
    this.HatredGroups = new Map();
    this.a6_ = new Map();
    this.Lte = 0;
    this.k9u = new Map();
    this.OnCharHoldingHandsChanged = (e, t, i, o) => {
      if (this.k9u.size > 0) {
        this.CheckAiRemoveCondition();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "[AiBehaviorTree] 牵手状态变更，检查移除条件", ["entityId", e], ["isEnter", t], ["state", i], ["handType", o]);
      }
    };
    this.O9u = new Map();
    this.Vzc = new Map();
    this.jzc = new Map();
    this.lad = new Map();
    this._ad = new Map();
    this.Hzc = new Map();
    this.$zc = new Map();
  }
  OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharHoldingHandsChanged, this.OnCharHoldingHandsChanged);
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharHoldingHandsChanged, this.OnCharHoldingHandsChanged);
    return true;
  }
  AddAiScore(e) {
    this.AiScoreManager.AddScore(e);
  }
  RemoveObject(e) {
    this.AiScoreManager.RemoveObject(e);
  }
  GetAiTeam(e = 1) {
    let t = this.ActiveAiTeams.get(e);
    if (!t) {
      (t = new AiTeam_1.AiTeam()).TeamId = ++this.Lte;
      t.Init(e);
      this.ActiveAiTeams.set(e, t);
    }
    return t;
  }
  AddActiveAiController(i) {
    var o = i.CharAiDesignComp.Entity.Id;
    if (!this.ActiveAiControllers.has(o) && (this.ActiveAiControllers.set(o, i), i.HatredGroupId)) {
      o = i.CharActorComp.Actor.Camp;
      this.a6_.set(i, o);
      let e = this.HatredGroups.get(o);
      if (!e) {
        e = new Map();
        this.HatredGroups.set(o, e);
      }
      let t = e.get(i.HatredGroupId);
      if (!t) {
        t = new Set();
        e.set(i.HatredGroupId, t);
      }
      t.add(i);
    }
  }
  RemoveActiveAiController(e) {
    var t;
    if (this.ActiveAiControllers.delete(e.CharAiDesignComp.Entity.Id) && e.HatredGroupId && (t = this.a6_.get(e))) {
      this.HatredGroups.get(t)?.get(e.HatredGroupId)?.delete(e);
      this.a6_.delete(e);
    }
  }
  CheckAiRemoveCondition() {
    var e = [];
    for (const i of this.k9u) {
      var t = i[1].RemoveCondition;
      if (t && LevelGeneralController_1.LevelGeneralController.CheckConditionNew(t, undefined)) {
        e.push(i[0]);
      }
    }
    for (const o of e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "[AiBehaviorTree] 覆盖AI行为树满足移除条件", ["Key", o]);
      }
      this.ResetAiBehaviorTree(o);
    }
  }
  SetAiBehaviorTree(e) {
    if (this.k9u.has(e.Key) && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "[AiBehaviorTree] 覆盖AI行为树标识被覆盖", ["Key", e.Key]);
    }
    var t = AiBehaviorTreeById_1.configAiBehaviorTreeById.GetConfig(e.BehaviorTree);
    if (t) {
      if (LevelGeneralController_1.LevelGeneralController.CheckConditionNew(e.RemoveCondition, undefined)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("AI", 42, "[AiBehaviorTree] 触发覆盖AI行为树时，满足移除条件，不处理", ["Entities", e.EntityIds], ["Id", e.BehaviorTree]);
        }
      } else {
        this.k9u.set(e.Key, e);
        for (const o of e.EntityIds) {
          var i = EntitySystem_1.EntitySystem.Get(o);
          if (i?.Valid) {
            i.GetComponent(47)?.ChangeAiBehaviorTree(t.BtPath);
          }
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("AI", 42, "[AiBehaviorTree] a.AI行为树查询失败", ["Entities", e.EntityIds], ["Id", e.BehaviorTree]);
    }
  }
  ResetAiBehaviorTree(e) {
    if (this.k9u.has(e)) {
      for (const i of this.k9u.get(e).EntityIds) {
        var t = EntitySystem_1.EntitySystem.Get(i);
        if (t?.Valid) {
          t.GetComponent(47)?.ResetAiBehaviorTree();
        }
      }
      this.k9u.delete(e);
    }
  }
  UpdateEntityLookAt() {
    if (Global_1.Global.BaseCharacter && (this.Hzc.size || this.$zc.size)) {
      this.jzc.clear();
      this.Wzc();
      this.Qzc();
      for (const i of this.O9u) {
        for (const o of i[1]) {
          var e = this.jzc.has(o);
          var t = this.jzc.get(o);
          if (e && t) {
            let e = false;
            if (this.Vzc.get(o.Id) !== t.Target.Id) {
              this.Vzc.set(o.Id, t.Target.Id);
              this.uad(o.Id, t.Perform);
              e = true;
            }
            this.Kzc(o, t.Target, true, e);
          } else if (this.Vzc.has(o.Id)) {
            this.Kzc(o, undefined, false, true);
            this.Vzc.delete(o.Id);
            this.cad(o.Id);
          }
        }
      }
    }
  }
  Wzc() {
    for (const i of this.$zc) {
      var e = i[0];
      if (this.O9u.has(e)) {
        for (const o of this.O9u.get(e)) {
          for (const r of i[1]) {
            var t = o.Entity?.GetComponent(1);
            if (t && r.RangeCheck.MapCheckReachedPosition(t.ActorLocationProxy) && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r.Target))?.Valid) {
              this.Xzc(o, t, r.Perform);
            }
          }
        }
      }
    }
  }
  Qzc() {
    var e = FlowController_1.FlowController.GetFlowName();
    if (e) {
      for (const i of this.Hzc) {
        var t = i[0];
        if (this.O9u.has(t)) {
          for (const o of i[1]) {
            if (e === o.PlotName) {
              for (const r of this.O9u.get(t)) {
                this.Yzc(r, o.Target, o.Perform);
              }
            }
          }
        }
      }
    }
  }
  uad(e, t) {
    var i;
    var o;
    var r;
    var s;
    if (t && !this.lad.has(e) && e === (o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.EntityId))?.Id && (i = o?.Entity?.GetComponent(188), r = o?.Entity?.GetComponent(178), o?.Valid) && i && r && (t.OverlapMontageId && t.OverlapMontageId && (o = new PlayMontageUtils_1.PlayMontageConfig(t.OverlapMontageConfig?.OverlapMontageRepeatTimes ?? -1, t.OverlapMontageConfig?.OverlapMontageLoopDuration ?? -1), r = PlayMontageUtils_1.PlayMontageUtils.LoadAndPlayMontageByOverlapId(r, t.OverlapMontageId, o)) && this.lad.set(e, r), t.FaceExpressionId) && (s = i?.ExpressionController?.ChangeFaceForExpressionFromAnimNotify(t.FaceExpressionId))) {
      this._ad.set(e, s);
    }
  }
  cad(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    var i = t?.Entity?.GetComponent(188);
    var o = t?.Entity?.GetComponent(178);
    if (t?.Valid && i && o && (this._ad.has(e) && (t = this._ad.get(e), i?.ExpressionController?.ResetFaceForExpressionFromAnimNotify(t)), this.lad.has(e))) {
      o = this.lad.get(e);
      PlayMontageUtils_1.PlayMontageUtils.ClearAndEndMontage(o, true);
    }
    this.lad.delete(e);
    this._ad.delete(e);
  }
  Kzc(e, t, i, o) {
    var r;
    if (e.Entity?.Valid) {
      r = e.Entity.GetComponent(178);
      if (i && t?.Entity && r) {
        if (o) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("AI", 42, "[AiEntityLookAt] 设置实体看向", ["Key", e?.Id], ["Target", t?.Id]);
          }
          r.SetBlendSpaceLookAt(true);
          r.SetSightLimit([-40, 40], [-18, 31]);
        }
        r.SetSightTargetItem(t.Entity.GetComponent(1));
      } else {
        if (o && (r?.ResetSightLimit(), r?.SetBlendSpaceLookAt(false), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("AI", 42, "[AiEntityLookAt] 清空实体看向", ["Key", e?.Id]);
        }
        r?.SetSightTargetItem(undefined);
      }
    }
  }
  Xzc(e, t, i) {
    return !!t.Entity?.GetComponent(31)?.IsPlayingFlow() && (this.jzc.set(e, {
      Target: t,
      Perform: i
    }), true);
  }
  Yzc(e, t, i) {
    switch (t.Type) {
      case 1:
        var o = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(Global_1.Global.BaseCharacter.EntityId);
        var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
        if (o?.Valid) {
          this.jzc.set(e, {
            Target: o,
            Perform: i
          });
        }
        break;
      case 0:
        o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.EntityId);
        if (o?.Valid) {
          this.jzc.set(e, {
            Target: o,
            Perform: i
          });
        }
    }
  }
  EnableEntityLookAt(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "[AiEntityLookAt] EnableEntityLookAt", ["Key", e.Key]);
    }
    this.O9u.set(e.Key, []);
    for (const o of e.EntityIds) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o);
      if (t?.Valid) {
        this.O9u.get(e.Key).push(t);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AI", 42, "[AiEntityLookAt] AddEntity", ["PbDataId", o]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AI", 42, "[AiEntityLookAt] InvalidEntity", ["PbDataId", o]);
      }
    }
    if (e.OverrideLookAtType?.Type === 0) {
      if (this.Hzc.has(e.Key)) {
        this.Hzc.get(e.Key).length = 0;
      } else {
        this.Hzc.set(e.Key, []);
      }
      for (const r of e.OverrideLookAtType.CheckFlowLookAtConfigs) {
        this.Hzc.get(e.Key).push({
          PlotName: r.Flow.FlowListName + "," + r.Flow.FlowId + "," + r.Flow.StateId,
          Target: r.Target,
          Perform: r.EntityLookAtPerform
        });
      }
    }
    if (e.DefaultLookAtType.Type === 0) {
      if (this.$zc.has(e.Key)) {
        this.$zc.get(e.Key).length = 0;
      } else {
        this.$zc.set(e.Key, []);
      }
      for (const s of e.DefaultLookAtType.BubbleEntityConfig) {
        var i = new RangeCheck_1.RangeCheck();
        this.$zc.get(e.Key).push({
          Target: s.BubbleEntity,
          RangeCheck: i,
          Perform: s.EntityLookAtPerform
        });
        for (const a of s.RangeEntities) {
          if (!i.MakeRange(a)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("AI", 42, "[AiEntityLookAt] 区域检测MakeRange失败", ["Key", e.Key], ["RangeId", a]);
            }
          }
        }
      }
    }
  }
  DisableEntityLookAt(e) {
    var t = this.O9u.get(e);
    if (t) {
      for (const i of t) {
        this.Vzc.delete(i.Id);
      }
      this.O9u.delete(e);
      this.Hzc.delete(e);
      this.$zc.delete(e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "[AiEntityLookAt] DisableEntityLookAt", ["Key", e]);
      }
    }
  }
}
exports.AiModel = AiModel;
//# sourceMappingURL=AiModel.js.map