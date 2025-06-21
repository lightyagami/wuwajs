"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SceneTeamController = void 0;
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  PhantomFormationById_1 = require("../../../Core/Define/ConfigQuery/PhantomFormationById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IMatch_1 = require("../../../UniverseEditor/Interface/IMatch"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  StatDefine_1 = require("../../Common/StatDefine"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines"),
  AbilityEvent_1 = require("../../NewWorld/Character/Common/Component/Abilities/AbilityEvent"),
  SkillBehaviorMisc_1 = require("../../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorMisc"),
  GameplayAbilityVisionMisc_1 = require("../../NewWorld/Character/Common/Component/Vision/GA/GameplayAbilityVisionMisc"),
  FormationDataController_1 = require("../Abilities/FormationDataController"),
  CombatMessage_1 = require("../CombatMessage/CombatMessage"),
  SceneTeamData_1 = require("./SceneTeamData"),
  SceneTeamDefine_1 = require("./SceneTeamDefine"),
  SceneTeamEvent_1 = require("./SceneTeamEvent");
class SceneTeamController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.Tpo = Stats_1.Stat.Create("SceneTeamController.SwitchRoleRequestStat", "", StatDefine_1.BATTLESTAT_GROUP), this.Lpo = Stats_1.Stat.Create("SceneTeamController.SwitchRoleRefreshPosStat", "", StatDefine_1.BATTLESTAT_GROUP), this.Dpo = Stats_1.Stat.Create("SceneTeamController.SwitchRoleChangeRoleQTEStat", "", StatDefine_1.BATTLESTAT_GROUP), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, SceneTeamController.GUe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, SceneTeamController.zpe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, SceneTeamController.Upo), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PanelQteEnd, SceneTeamController.VOi), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLevelEnvChange, SceneTeamController.PCl), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStartFlow, SceneTeamController.$an), Net_1.Net.Register(28286, SceneTeamController.Apo), Net_1.Net.Register(25628, SceneTeamController.Ppo), Net_1.Net.Register(15237, SceneTeamController.xpo), Net_1.Net.Register(16231, SceneTeamController.r$s), Net_1.Net.Register(23399, SceneTeamController.Phl), !0
  }
  static OnClear() {
    return EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, SceneTeamController.GUe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, SceneTeamController.zpe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, SceneTeamController.Upo), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PanelQteEnd, SceneTeamController.VOi), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLevelEnvChange, SceneTeamController.PCl), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStartFlow, SceneTeamController.$an), Net_1.Net.UnRegister(28286), Net_1.Net.UnRegister(25628), Net_1.Net.UnRegister(15237), Net_1.Net.UnRegister(16231), Net_1.Net.UnRegister(23399), this.wpo && (TimerSystem_1.TimerSystem.Remove(this.wpo), this.wpo = void 0), !0
  }
  static ShowControlledRole(e) {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(e)) {
      var o = t.EntityHandle;
      o && t.IsControl() && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneTeam", 48, "复活显示角色", ["EntityId", o.Id]), t.EntityHandle.Entity?.EnableByKey(1, !0))
    }
  }
  static HH1(e = void 0, o = void 0) {
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0)) {
      var t, a;
      r.IsControl() || (a = r.EntityHandle?.Entity) && (t = a.GetComponent(93)) && 1 === t.GetTeamState() && (a = a.GetComponent(1).ActorLocationProxy, e && o && Vector_1.Vector.DistSquared(e, a) > o || t.DisableRoleWithoutEffect())
    }
  }
  static RequestChangeRole(e, o = void 0) {
    var t = o?.FilterSameRole ?? !0;
    const a = o?.GoDownWaitSkillEnd ?? !1,
      r = o?.ForceInheritTransform ?? !0;
    var n = o?.GoBattleInvincible ?? !1;
    const l = o?.CanUseGoBattleSkill ?? !0,
      _ = ModelManager_1.ModelManager.SceneTeamModel;
    var i, c, m, o = _.GetCurrentTeamItem,
      s = _.GetTeamItem(e, {
        ParamType: 3
      });
    !s || t && o?.GetCreatureDataId() === e || (t = s.EntityHandle?.Entity) && ((i = SceneTeamController.Bpo()) !== Protocol_1.Aki.Protocol.f6s.Proto_SignleWorld || GlobalData_1.GlobalData.Networking() ? s.CanControl() ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "请求切换当前角色", ["CreatureDataId", e]), _.ChangingRole = !0, c = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId(), (m = new Protocol_1.Aki.Protocol.qis).Q6n = s.GetConfigId, m.$Hn = i, CombatMessage_1.CombatNet.Call(16892, t, m, e => {
      var o;
      _.ChangingRole = !1, e ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "切换当前角色响应"), e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ((e = e.Q6n) && 0 !== e ? (o = _.GetTeamItem(e, {
        ParamType: 0,
        OnlyMyRole: !0
      })?.GetCreatureDataId()) ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "请求换人失败，已更换正确角色", ["角色Id", e]), this.Tpo.Start(), this.Cel(o, a, r, l), this.Tpo.Stop()) : Log_1.Log.CheckError() && Log_1.Log.Error("SceneTeam", 48, "请求换人失败，在队伍中未找到角色", ["角色Id", e]) : Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "请求换人失败，全角色已死亡", ["角色Id", e]))) : Log_1.Log.CheckError() && Log_1.Log.Error("SceneTeam", 48, "切换当前角色响应为空，前后端当前角色可能不一致")
    }, void 0, c), this.Tpo.Start(), this.Cel(e, a, r, n, l, c), this.Tpo.Stop()) : Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "角色不允许请求切换", ["CreatureDataId", e]) : (s = (o?.EntityHandle?.Entity?.GetComponent(98))?.IsInQte ?? !1, i = ModelManager_1.ModelManager.SceneTeamModel.GetChangeRoleCooldown(), _.ChangeRole(e, {
      UseGoBattleSkill: l && !s,
      CoolDown: i,
      GoDownWaitSkillEnd: a,
      ForceInheritTransform: r
    })))
  }
  static SendSwitchRole(e) {
    var o, t, a, r = e.EntityHandle?.Entity;
    r && (o = SceneTeamController.Bpo(), t = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId(), (a = new Protocol_1.Aki.Protocol.qis).Q6n = e.GetConfigId, a.$Hn = o, CombatMessage_1.CombatNet.Call(16892, r, a, () => {}, void 0, t))
  }
  static Bpo() {
    return ModelManager_1.ModelManager.EditBattleTeamModel.IsInInstanceDungeon ? Protocol_1.Aki.Protocol.f6s.Proto_FbInstance : ModelManager_1.ModelManager.GameModeModel.IsMulti ? Protocol_1.Aki.Protocol.f6s.Proto_MultiWorld : Protocol_1.Aki.Protocol.f6s.Proto_SignleWorld
  }
  static Cel(e, o = !1, t = !0, a = !1, r = !0, n = void 0) {
    var l = ModelManager_1.ModelManager.SceneTeamModel,
      _ = (this.Lpo.Start(), l.RefreshLastTransform(), this.Lpo.Stop(), l.GetTeamItem(e, {
        ParamType: 3
      })),
      i = _?.EntityHandle.Entity;
    i && _.IsMyRole() ? (_ = i.GetComponent(98), this.Dpo.Start(), l.ChangeRole(e, {
      UseGoBattleSkill: r && !_.IsInQte,
      GoBattleInvincible: a,
      CoolDown: l.GetChangeRoleCooldown(),
      GoDownWaitSkillEnd: o,
      ForceInheritTransform: t,
      MessageId: n
    }), this.Dpo.Stop()) : Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "队伍实体无法获取或非本机", ["CreatureDataId", e])
  }
  static GetLivingSate(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.JEs.Proto_Alive:
        return 1;
      case Protocol_1.Aki.Protocol.JEs.Proto_Dead:
        return 2;
      default:
        Protocol_1.Aki.Protocol.JEs.Proto_Init;
        return 0
    }
  }
  static Uvl(e, o, t, a) {
    var r = e !== ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType,
      n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      l = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(n);
    if (!l) return Log_1.Log.CheckError() && Log_1.Log.Error("SceneTeam", 48, "玩家编队数据不存在，不允许执行预加载角色入队"), !1;
    if (!r && !o) return Log_1.Log.CheckWarn() && Log_1.Log.Warn("SceneTeam", 48, "玩家编队数据无任何变化"), !1;
    let _ = !0;
    var i = [],
      c = [],
      m = l.GetGroup(e);
    if (o) {
      l = o.size;
      if (l > SceneTeamDefine_1.SCENE_TEAM_MAX_NUM) return Log_1.Log.CheckError() && Log_1.Log.Error("SceneTeam", 48, "传入角色列表人数超过编队设计上限"), !1;
      if (m) {
        if (1 === e && 2 === m.GetLivingState()) return Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "玩家战斗编队组已死亡，不允许改变"), !1;
        if (!t && l + m.GetRoleList().length > SceneTeamDefine_1.SCENE_TEAM_MAX_NUM) return Log_1.Log.CheckError() && Log_1.Log.Error("SceneTeam", 48, "角色列表人数总和超过编队设计上限"), !1
      }
      for (const f of o) {
        var s = ModelManager_1.ModelManager.SceneTeamModel.GetPreloadEntityData(f);
        if (!s) return Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneTeam", 48, "请求更新编队组时，未找到预加载角色", ["RoleId", f]), !1;
        var S, v, g = s[0],
          s = s[1]?.Entity;
        if (!s?.Valid || !s.IsInit) return Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneTeam", 48, "请求更新编队组时，角色实体无效", ["RoleId", f]), !1;
        m && m.HasRole(g) || (S = s.GetComponent(0).GetRoleId(), (v = new SceneTeamData_1.SceneTeamRole).CreatureDataId = g, v.RoleId = S, i.push(v), c.push(g), s.GetComponent(15)?.IsDead() ?? !0) || (_ = !1)
      }
    }
    var l = SceneTeamController.Dvl(e),
      o = r,
      T = [];
    if (c)
      for (const C of c) T.push(MathUtils_1.MathUtils.NumberToLong(C));
    Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "请求更新编队组数据", ["GroupType", e], ["CreatureDataIdList", c], ["ReplaceAll", t], ["NeedReserve", o]);
    var M = new Protocol_1.Aki.Protocol.Hg_;
    return M.Avl = t, M.xvl = l, M.Pvl = o, M.p41 = a, 0 < T.length && (M.PSs = T, l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem, !r && l ? (o = MathUtils_1.MathUtils.NumberToLong(l.GetCreatureDataId()), M.Bhl = o) : M.Bhl = T[0]), Net_1.Net.Call(25060, M, e => {
      e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "请求角色入队失败")
    }), i.length <= 0 ? ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(n, e, !1, !0) : !m || t ? (a = i[0].RoleId, r = _ ? 2 : 1, ModelManager_1.ModelManager.SceneTeamModel.UpdateGroupDataAndSwitchGroup(n, {
      GroupType: e,
      GroupRoleList: i,
      CurrentRoleId: a,
      LivingState: r
    })) : ModelManager_1.ModelManager.SceneTeamModel.AddRoleAndSwitchGroup(n, e, i), SceneTeamController.cTl(c), !0
  }
  static Dvl(e) {
    switch (e) {
      case -1:
      case 0:
        return Protocol_1.Aki.Protocol.Z7s.Proto_GroupNone;
      case 1:
        return Protocol_1.Aki.Protocol.Z7s.Proto_Battle;
      case 2:
        return Protocol_1.Aki.Protocol.Z7s.hxs;
      case 3:
        return Protocol_1.Aki.Protocol.Z7s.Proto_Plot;
      default:
        return Protocol_1.Aki.Protocol.Z7s.Proto_GroupNone
    }
  }
  static cTl(e) {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem,
      t = o?.EntityHandle?.Entity;
    if (o && t) {
      var a = [180, 0, -90, 90],
        r = Vector_1.Vector.Create(),
        n = Vector_1.Vector.Create(),
        t = t.GetComponent(3),
        l = t.ActorLocationProxy,
        _ = t.ActorForwardProxy,
        i = o.GetCreatureDataId();
      for (const v of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0)) {
        var c = v.GetCreatureDataId();
        if (v.IsAutoRole() && c !== i && e.includes(c)) {
          var m = v.EntityHandle?.Entity?.GetComponent(3);
          if (m) {
            var s = 2 * m.ScaledRadius + 10;
            s *= s;
            let e = !1;
            for (; 0 < a.length;) {
              var S = a.pop();
              if (void 0 === S) break;
              n.DeepCopy(l), _.RotateAngleAxis(S, Vector_1.Vector.UpVectorProxy, r), r.MultiplyEqual(SceneTeamDefine_1.AUTO_ROLE_OFFSET_DISTANCE), n.AdditionEqual(r);
              S = (0, SkillBehaviorMisc_1.traceWall)(m, l, n, !1);
              if (S && (!(S[0] && Vector_1.Vector.DistSquared2D(l, n) < s) && m.FixBornLocation("刷新Ai角色入队位置", !0, n))) {
                e = !0;
                break
              }
            }
            e || (m.SetActorLocation(l.ToUeVector(), "刷新Ai角色入队位置", !1), m.FixBornLocation("刷新Ai角色入队位置"))
          }
        }
      }
    }
  }
  static RegisterPanelQteJoinTeam(e, o, t) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "注册角色入队界面QTE", ["RoleIdList", o]), ModelManager_1.ModelManager.SceneTeamModel.PanelQteHandleId = e, ModelManager_1.ModelManager.SceneTeamModel.PanelQteShowTrialRoleTips = t;
    var a = ModelManager_1.ModelManager.SceneTeamModel.PanelQteRoleIdSet;
    a.clear();
    for (const r of o) a.add(r)
  }
  static ChangePhantomTeam(e, o = void 0) {
    var t = PhantomFormationById_1.configPhantomFormationById.GetConfig(e);
    if (t) {
      var a = new Set;
      for (const n of t.Roles) a.add(n);
      if (a.size <= 0) Log_1.Log.CheckError() && Log_1.Log.Error("SceneTeam", 48, "声骸编队内无角色", ["Id", e]);
      else if (2 === ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType) Log_1.Log.CheckWarn() && Log_1.Log.Warn("SceneTeam", 48, "声骸编队下不允许切换声骸");
      else if (SceneTeamController.Uvl(2, a, !0, !1)) {
        t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
        let e = void 0;
        if (o && t) {
          var r = t.GetComponent(205);
          for (const l of o)
            if (r.HasTag(l.TagId)) {
              e = l;
              break
            }
        }
        o = t?.GetComponent(174);
        o?.AddBuff(GameplayAbilityVisionMisc_1.VISION_APPEAR_BUFF_ID, {
          InstigatorId: o.CreatureDataId,
          Reason: "开始切换声骸编队时，声骸自身的材质和粒子"
        }), e && (t?.GetComponent(18))?.SendGameplayEventToActor(e)
      }
    } else Log_1.Log.CheckError() && Log_1.Log.Error("SceneTeam", 48, "声骸编队配置不存在", ["Id", e])
  }
  static RevertPhantomTeam() {
    var e;
    2 !== ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType ? Log_1.Log.CheckWarn() && Log_1.Log.Warn("SceneTeam", 48, "非声骸编队下不允许还原声骸") : (e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity, SceneTeamController.Uvl(1, void 0, !1, !1), e?.Valid && (e.Entity?.GetComponent(174))?.RemoveAllDurationBuffs("声骸还原清理持续型buff"))
  }
  static TryUseMultiQte(e) {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem,
      t = o.EntityHandle.Entity.GetComponent(98);
    return t.IsQteReady(e) ? (e.Entity.GetComponent(98).UseExitSkill(o.EntityHandle), t.ExecuteMultiQte(e), !0) : (e.Entity.GetComponent(205).HasTag(166024319) || ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TeammateQteDisable"), !1)
  }
  static IsMatchRoleOption(e) {
    var o = ModelManager_1.ModelManager.SceneTeamModel,
      t = o.IsPhantomTeam,
      a = o.GetTeamItems();
    for (const r of e) switch (r.Type) {
      case IMatch_1.EMatchRoleType.Player:
        if (t) break;
        return !0;
      case IMatch_1.EMatchRoleType.Phantom:
        if (t)
          for (const n of a)
            if (n.GetConfigId === r.Id) return !0
    }
    return !1
  }
  static EmitEvent(e, o, ...t) {
    var a;
    e && (EventSystem_1.EventSystem.EmitWithTarget(e, o, ...t), (a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e.Id, {
      ParamType: 1
    })) && (a.IsMyRole() && EventSystem_1.EventSystem.EmitWithTarget(SceneTeamEvent_1.SceneTeam.Local, o, ...t), EventSystem_1.EventSystem.EmitWithTarget(SceneTeamEvent_1.SceneTeam.All, o, ...t)), FormationDataController_1.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.Id === e.Id) && (EventSystem_1.EventSystem.EmitWithTarget(SceneTeamEvent_1.SceneTeam.Local, o, ...t), EventSystem_1.EventSystem.EmitWithTarget(SceneTeamEvent_1.SceneTeam.All, o, ...t))
  }
  static EmitAbilityEvent(e, o, t, ...a) {
    var r;
    e && (AbilityEvent_1.AbilityEvent.Emit(e, o, t, ...a), (r = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e.Id, {
      ParamType: 1
    })) && (r.IsMyRole() && AbilityEvent_1.AbilityEvent.Emit(SceneTeamEvent_1.SceneTeam.Local, o, t, ...a), AbilityEvent_1.AbilityEvent.Emit(SceneTeamEvent_1.SceneTeam.All, o, t, ...a)), FormationDataController_1.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.Id === e.Id) && (AbilityEvent_1.AbilityEvent.Emit(SceneTeamEvent_1.SceneTeam.Local, o, t, ...a), AbilityEvent_1.AbilityEvent.Emit(SceneTeamEvent_1.SceneTeam.All, o, t, ...a))
  }
}
exports.SceneTeamController = SceneTeamController, (_a = SceneTeamController).Tpo = void 0, SceneTeamController.Lpo = void 0, SceneTeamController.Dpo = void 0, SceneTeamController.wpo = void 0, SceneTeamController.RQe = (e, o) => {
  10036 === e && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnConcertoResponseOpen, o)
}, SceneTeamController.Zpe = e => {
  GlobalData_1.GlobalData.BpEventManager.小队战斗状态改变时.Broadcast(e)
}, SceneTeamController.Upo = () => {
  _a.wpo || (_a.wpo = TimerSystem_1.TimerSystem.Forever(_a.qpo, SceneTeamDefine_1.CHECK_ROLE_INTERVAL))
}, SceneTeamController.GUe = (e, o, t) => {
  ModelManager_1.ModelManager.SceneTeamModel.OnAddEntity(o)
}, SceneTeamController.zpe = (e, o) => {
  ModelManager_1.ModelManager.SceneTeamModel.OnRemoveEntity(o)
}, SceneTeamController.PCl = (e, o, t) => {
  1 !== e && 4 !== e || (e = o ? Vector_1.Vector.Create(o) : void 0, o = SceneTeamDefine_1.DATA_LAYER_CHANGE_RADIUS * SceneTeamDefine_1.DATA_LAYER_CHANGE_RADIUS, _a.HH1(e, o))
}, SceneTeamController.$an = () => {
  _a.HH1()
}, SceneTeamController.xpo = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 5, "9603 换人同步", ["massage", e]);
  var o = MathUtils_1.MathUtils.LongToNumber(e.mUs),
    t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o),
    a = t.Entity.GetComponent(0);
  if (t?.Valid) {
    var r = a.GetRoleId();
    if (e.W5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 5, "通过换人同步切换角色", ["massage", e]), SceneTeamController.Cel(o);
    else {
      var n = MathUtils_1.MathUtils.LongToNumber(e.CUs),
        l = ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
      if (l?.Valid) {
        t.IsInit && ((_ = t.Entity.GetComponent(3)).SetActorTransform(l.Entity.GetComponent(3).ActorTransform, "SwitchRoleNotify", !1), l.Entity.GetComponent(205)?.HasAnyTag(SceneTeamDefine_1.needFixLocationTagList)) && _.FixSwitchLocation("模拟端换人地面修正", !0, !0), a.SetVisible(!0), t.Entity?.EnableByKey(1, !0);
        var _ = t.Entity.GetComponent(177).MainAnimInstance,
          a = l.Entity.GetComponent(177).MainAnimInstance,
          _ = (UE.KuroStaticLibrary.IsObjectClassByName(_, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE) && UE.KuroStaticLibrary.IsObjectClassByName(a, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE) && _.替换角色时同步动作数据(a), t.Entity.GetComponent(68)),
          a = l.Entity.GetComponent(68),
          i = (_.CloneMoveSampleInfos(a), l.Entity.GetComponent(0));
        i.SetVisible(!1), ModelManager_1.ModelManager.SceneTeamModel.OtherPlayerChangeRole(e.W5n, o);
        for (const c of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(e.W5n)) c.GetConfigId === i.GetRoleId() ? c.SetRemoteIsControl(!1) : c.GetConfigId === r && c.SetRemoteIsControl(!0);
        l.Entity?.DisableByKey(1, !0), GlobalData_1.GlobalData.GameInstance && GlobalData_1.GlobalData.BpEventManager.当换人完成时.Broadcast(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOtherChangeRole, t, l)
      } else Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 5, "[SceneTeam.SwitchRoleNotify] 不存在下阵的Entity。", ["DownCreatureDataId", n])
    }
  } else Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 5, "[SceneTeam.SwitchRoleNotify] 不存在上阵的Entity。", ["UpCreatureId", o])
}, SceneTeamController.Ppo = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "切换编队组推送"), ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(e.W5n, e.USs)
}, SceneTeamController.Apo = e => {
  Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "更新编队组推送", ["Data", e]);
  var o = new Array;
  for (const n of e.yRs) {
    var t = new Array;
    for (const l of n.ERs) {
      var a = [];
      for (const _ of l.gRs) {
        var r = new SceneTeamData_1.SceneTeamRole;
        r.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(_.F4n), r.RoleId = _.Q6n, r.OnStageWithoutControl = _.eT_, a.push(r)
      }
      t.push({
        GroupType: l.USs,
        GroupRoleList: a,
        CurrentRoleId: l.NVn,
        LivingState: SceneTeamController.GetLivingSate(l.JEs),
        IsFixedLocation: l.I0a
      })
    }
    o.push({
      PlayerId: n.W5n,
      CurrentGroupType: n.ZI_,
      Groups: t
    })
  }
  ModelManager_1.ModelManager.SceneTeamModel.UpdateAllPlayerData(o)
}, SceneTeamController.r$s = e => {
  var o = e.W5n,
    e = e.azs,
    t = (Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "更新编队组死亡状态", ["PlayerId", o], ["States", e]), new Map);
  for (const r of e) {
    var a = SceneTeamController.GetLivingSate(r.JEs);
    t.set(r.USs, a)
  }
  ModelManager_1.ModelManager.SceneTeamModel.UpdateGroupLivingStates(o, t)
}, SceneTeamController.Phl = e => {
  for (const t of e.vI_) {
    var o = MathUtils_1.MathUtils.LongToNumber(t);
    ModelManager_1.ModelManager.SceneTeamModel.AddPreloadEntity(o)
  }
}, SceneTeamController.VOi = e => {
  var o;
  e === ModelManager_1.ModelManager.SceneTeamModel.PanelQteHandleId && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneTeam", 48, "角色入队界面QTE交互完成，开始执行"), e = ModelManager_1.ModelManager.SceneTeamModel.PanelQteShowTrialRoleTips, o = ModelManager_1.ModelManager.SceneTeamModel.PanelQteRoleIdSet, SceneTeamController.Uvl(1, o, !1, e), o.clear(), ModelManager_1.ModelManager.SceneTeamModel.PanelQteHandleId = 0, ModelManager_1.ModelManager.SceneTeamModel.PanelQteShowTrialRoleTips = !1)
}, SceneTeamController.qpo = () => {
  var e, o, t, a;
  Net_1.Net.IsServerConnected() && (e = (t = ModelManager_1.ModelManager.SceneTeamModel).GetCurrentTeamItem, o = t.GetCurrentEntity?.Entity, e && o ? (t = t.CurrentGroupType) && -1 !== t ? ((a = new Protocol_1.Aki.Protocol.Xe_).W5n = e.GetPlayerId(), a.YHn = e.GetConfigId, a.JHn = e.GetCreatureDataId(), CombatMessage_1.CombatNet.Send(26813, o, a)) : Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "检查当前角色，控制特殊角色中", ["groupType", t]) : Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneTeam", 48, "检查当前角色，无法获取队伍实例或实体"))
};
//# sourceMappingURL=SceneTeamController.js.map