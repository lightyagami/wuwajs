"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneTeamController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const PhantomFormationById_1 = require("../../../Core/Define/ConfigQuery/PhantomFormationById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IMatch_1 = require("../../../UniverseEditor/Interface/IMatch");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const StatDefine_1 = require("../../Common/StatDefine");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const AbilityEvent_1 = require("../../NewWorld/Character/Common/Component/Abilities/AbilityEvent");
const CharacterBuffIds_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
const SkillBehaviorMisc_1 = require("../../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorMisc");
const GameplayAbilityVisionMisc_1 = require("../../NewWorld/Character/Common/Component/Vision/GA/GameplayAbilityVisionMisc");
const RoleTeamComponent_1 = require("../../NewWorld/Character/Role/Component/RoleTeamComponent");
const FormationDataController_1 = require("../Abilities/FormationDataController");
const CombatMessage_1 = require("../CombatMessage/CombatMessage");
const SceneTeamData_1 = require("./SceneTeamData");
const SceneTeamDefine_1 = require("./SceneTeamDefine");
const SceneTeamEvent_1 = require("./SceneTeamEvent");
class SceneTeamController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.Tpo = Stats_1.Stat.Create("SceneTeamController.SwitchRoleRequestStat", "", StatDefine_1.BATTLESTAT_GROUP);
    this.Lpo = Stats_1.Stat.Create("SceneTeamController.SwitchRoleRefreshPosStat", "", StatDefine_1.BATTLESTAT_GROUP);
    this.Dpo = Stats_1.Stat.Create("SceneTeamController.SwitchRoleChangeRoleQTEStat", "", StatDefine_1.BATTLESTAT_GROUP);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, SceneTeamController.GUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, SceneTeamController.zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, SceneTeamController.Upo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PanelQteEnd, SceneTeamController.VOi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLevelEnvChange, SceneTeamController.PCl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStartFlow, SceneTeamController.$an);
    Net_1.Net.Register(17820, SceneTeamController.Apo);
    Net_1.Net.Register(16178, SceneTeamController.Ppo);
    Net_1.Net.Register(15182, SceneTeamController.xpo);
    Net_1.Net.Register(28847, SceneTeamController.r$s);
    Net_1.Net.Register(21122, SceneTeamController.Phl);
    Net_1.Net.Register(24741, SceneTeamController.Sjc);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, SceneTeamController.GUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, SceneTeamController.zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, SceneTeamController.Upo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PanelQteEnd, SceneTeamController.VOi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLevelEnvChange, SceneTeamController.PCl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStartFlow, SceneTeamController.$an);
    Net_1.Net.UnRegister(17820);
    Net_1.Net.UnRegister(16178);
    Net_1.Net.UnRegister(15182);
    Net_1.Net.UnRegister(28847);
    Net_1.Net.UnRegister(21122);
    Net_1.Net.UnRegister(24741);
    if (this.wpo) {
      TimerSystem_1.TimerSystem.Remove(this.wpo);
      this.wpo = undefined;
    }
    return true;
  }
  static ShowControlledRole(e) {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(e)) {
      var o = t.EntityHandle;
      if (o && t.IsControl()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneTeam", 48, "复活显示角色", ["EntityId", o.Id]);
        }
        t.EntityHandle.Entity?.EnableByKey(1, true);
      }
    }
  }
  static DisableAllRoleWithoutControl(e = undefined, o = undefined, t = false) {
    for (const n of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
      var a;
      var r;
      if (!n.IsControl()) {
        if ((r = n.EntityHandle?.Entity) && (a = r.GetComponent(94)) && a.GetTeamState() === 1) {
          r = r.GetComponent(1).ActorLocationProxy;
          if (!e || !o || !(Vector_1.Vector.DistSquared(e, r) > o)) {
            if (t) {
              a.DisableRoleWithEffect();
            } else {
              a.DisableRoleWithoutEffect();
            }
          }
        }
      }
    }
  }
  static RequestChangeRole(e, o = undefined) {
    var t = o?.FilterSameRole ?? true;
    const a = o?.GoDownWaitSkillEnd ?? false;
    const r = o?.ForceInheritTransform ?? true;
    var n = o?.GoBattleInvincible ?? false;
    const l = o?.CanUseGoBattleSkill ?? true;
    const _ = ModelManager_1.ModelManager.SceneTeamModel;
    var i;
    var c;
    var m;
    var s;
    var S;
    var v;
    var o = _.GetCurrentTeamItem;
    var g = _.GetTeamItem(e, {
      ParamType: 3
    });
    if (!!g && (!t || o?.GetCreatureDataId() !== e)) {
      if (t = g.EntityHandle?.Entity) {
        if ((v = SceneTeamController.Bpo()) !== Protocol_1.Aki.Protocol.f6s.Proto_SignleWorld || GlobalData_1.GlobalData.Networking()) {
          if (g.CanControl()) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SceneTeam", 48, "请求切换当前角色", ["CreatureDataId", e]);
            }
            _.ChangingRole = true;
            this.Tpo.Start();
            this.Cel(e, a, r, l);
            this.Tpo.Stop();
            i = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
            (c = new Protocol_1.Aki.Protocol.qis()).Q6n = g.GetConfigId;
            c.$Hn = v;
            if (ModelManager_1.ModelManager.GameModeModel.IsMulti && (g = o?.EntityHandle?.Entity?.GetComponent(94)?.GetTeamState() === 1, c.tku = g, _.GetCurrentTeamItem?.GetCreatureDataId() === e) && t.GetComponent(94)?.NeedSyncTransform() && (v = t.GetComponent(3))) {
              g = new Protocol_1.Aki.Protocol.wn1();
              m = new Protocol_1.Aki.Protocol.Gks();
              s = new Protocol_1.Aki.Protocol.D2s();
              S = v.ActorLocationProxy;
              v = v.ActorRotationProxy;
              m.X = S.X;
              m.Y = S.Y;
              m.Z = S.Z;
              s.Pitch = v.Pitch;
              s.Yaw = v.Yaw;
              s.Roll = v.Roll;
              g.l8n = m;
              g._8n = s;
              c.wn1 = g;
            }
            CombatMessage_1.CombatNet.Call(21005, t, c, e => {
              var o;
              _.ChangingRole = false;
              if (e) {
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("SceneTeam", 48, "切换当前角色响应");
                }
                if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
                  if ((e = e.Q6n) && e !== 0) {
                    if (o = _.GetTeamItem(e, {
                      ParamType: 0,
                      OnlyMyRole: true
                    })?.GetCreatureDataId()) {
                      if (Log_1.Log.CheckInfo()) {
                        Log_1.Log.Info("SceneTeam", 48, "请求换人失败，已更换正确角色", ["角色Id", e]);
                      }
                      this.Tpo.Start();
                      this.Cel(o, a, r, l);
                      this.Tpo.Stop();
                    } else if (Log_1.Log.CheckError()) {
                      Log_1.Log.Error("SceneTeam", 48, "请求换人失败，在队伍中未找到角色", ["角色Id", e]);
                    }
                  } else if (Log_1.Log.CheckInfo()) {
                    Log_1.Log.Info("SceneTeam", 48, "请求换人失败，全角色已死亡", ["角色Id", e]);
                  }
                }
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("SceneTeam", 48, "切换当前角色响应为空，前后端当前角色可能不一致");
              }
            }, undefined, i);
            if (n && _.GetCurrentTeamItem?.GetCreatureDataId() === e) {
              t.GetComponent(210)?.AddBuff(CharacterBuffIds_1.buffId.GoBattleInvincible, {
                InstigatorId: e,
                PreMessageId: i,
                Reason: "角色上场短暂无敌"
              });
            }
          } else if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneTeam", 48, "角色不允许请求切换", ["CreatureDataId", e]);
          }
        } else {
          S = o?.EntityHandle?.Entity?.GetComponent(99)?.IsInQte ?? false;
          v = ModelManager_1.ModelManager.SceneTeamModel.GetChangeRoleCooldown();
          _.ChangeRole(e, {
            UseGoBattleSkill: l && !S,
            CoolDown: v,
            GoDownWaitSkillEnd: a,
            ForceInheritTransform: r
          });
        }
      }
    }
  }
  static SendSwitchRole(e) {
    var o;
    var t;
    var a;
    var r = e.EntityHandle?.Entity;
    if (r) {
      o = SceneTeamController.Bpo();
      t = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
      (a = new Protocol_1.Aki.Protocol.qis()).Q6n = e.GetConfigId;
      a.$Hn = o;
      CombatMessage_1.CombatNet.Call(21005, r, a, () => {}, undefined, t);
    }
  }
  static Bpo() {
    if (ModelManager_1.ModelManager.EditBattleTeamModel.IsInInstanceDungeon) {
      return Protocol_1.Aki.Protocol.f6s.Proto_FbInstance;
    } else if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      return Protocol_1.Aki.Protocol.f6s.Proto_MultiWorld;
    } else {
      return Protocol_1.Aki.Protocol.f6s.Proto_SignleWorld;
    }
  }
  static Cel(e, o = false, t = true, a = true) {
    var r = ModelManager_1.ModelManager.SceneTeamModel;
    this.Lpo.Start();
    r.RefreshLastTransform();
    this.Lpo.Stop();
    var n = r.GetTeamItem(e, {
      ParamType: 3
    });
    var l = n?.EntityHandle.Entity;
    if (l && n.IsMyRole()) {
      n = l.GetComponent(99);
      this.Dpo.Start();
      r.ChangeRole(e, {
        UseGoBattleSkill: a && !n.IsInQte,
        CoolDown: r.GetChangeRoleCooldown(),
        GoDownWaitSkillEnd: o,
        ForceInheritTransform: t
      });
      this.Dpo.Stop();
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "队伍实体无法获取或非本机", ["CreatureDataId", e]);
    }
  }
  static RoleGoDownPush(e) {
    var o = Protocol_1.Aki.Protocol.yBu.create();
    CombatMessage_1.CombatNet.Send(19555, e, o);
  }
  static GetLivingSate(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.JEs.Proto_Alive:
        return 1;
      case Protocol_1.Aki.Protocol.JEs.Proto_Dead:
        return 2;
      default:
        Protocol_1.Aki.Protocol.JEs.Proto_Init;
        return 0;
    }
  }
  static Uvl(e, o, t, a) {
    var r = e !== ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType;
    var n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var l = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(n);
    if (!l) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneTeam", 48, "玩家编队数据不存在，不允许执行预加载角色入队");
      }
      return false;
    }
    if (!r && !o) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneTeam", 48, "玩家编队数据无任何变化");
      }
      return false;
    }
    let _ = true;
    var i = [];
    var c = [];
    var m = l.GetGroup(e);
    if (o) {
      l = o.size;
      if (l > SceneTeamDefine_1.SCENE_TEAM_MAX_NUM) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneTeam", 48, "传入角色列表人数超过编队设计上限");
        }
        return false;
      }
      if (m) {
        if (e === 1 && m.GetLivingState() === 2) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneTeam", 48, "玩家战斗编队组已死亡，不允许改变");
          }
          return false;
        }
        if (!t && l + m.GetRoleList().length > SceneTeamDefine_1.SCENE_TEAM_MAX_NUM) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneTeam", 48, "角色列表人数总和超过编队设计上限");
          }
          return false;
        }
      }
      for (const C of o) {
        var s = ModelManager_1.ModelManager.SceneTeamModel.GetPreloadEntityData(C);
        if (!s) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("SceneTeam", 48, "请求更新编队组时，未找到预加载角色", ["RoleId", C]);
          }
          return false;
        }
        var S;
        var v;
        var g = s[0];
        var s = s[1]?.Entity;
        if (!s?.Valid || !s.IsInit) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("SceneTeam", 48, "请求更新编队组时，角色实体无效", ["RoleId", C]);
          }
          return false;
        }
        if ((!m || !m.HasRole(g)) && !(S = s.GetComponent(0).GetRoleId(), (v = new SceneTeamData_1.SceneTeamRole()).CreatureDataId = g, v.RoleId = S, i.push(v), c.push(g), s.GetComponent(15)?.IsDead() ?? true)) {
          _ = false;
        }
      }
    }
    var l = SceneTeamController.Dvl(e);
    var o = r;
    var M = [];
    if (c) {
      for (const d of c) {
        M.push(MathUtils_1.MathUtils.NumberToLong(d));
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "请求更新编队组数据", ["GroupType", e], ["CreatureDataIdList", c], ["ReplaceAll", t], ["NeedReserve", o]);
    }
    var T = new Protocol_1.Aki.Protocol.Hg_();
    T.Avl = t;
    T.xvl = l;
    T.Pvl = o;
    T.X41 = a;
    if (M.length > 0) {
      T.PSs = M;
      l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
      if (!r && l) {
        o = MathUtils_1.MathUtils.NumberToLong(l.GetCreatureDataId());
        T.Bhl = o;
      } else {
        T.Bhl = M[0];
      }
    }
    Net_1.Net.Call(19507, T, e => {
      if (!e || e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneTeam", 48, "请求角色入队失败");
        }
      }
    });
    if (i.length <= 0) {
      ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(n, e, false, true);
    } else if (!m || t) {
      a = i[0].RoleId;
      r = _ ? 2 : 1;
      ModelManager_1.ModelManager.SceneTeamModel.UpdateGroupDataAndSwitchGroup(n, {
        GroupType: e,
        GroupRoleList: i,
        CurrentRoleId: a,
        LivingState: r
      });
    } else {
      ModelManager_1.ModelManager.SceneTeamModel.AddRoleAndSwitchGroup(n, e, i);
    }
    SceneTeamController.cTl(c);
    return true;
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
        return Protocol_1.Aki.Protocol.Z7s.Proto_GroupNone;
    }
  }
  static cTl(e) {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    var t = o?.EntityHandle?.Entity;
    if (o && t) {
      var a = [180, 0, -90, 90];
      var r = Vector_1.Vector.Create();
      var n = Vector_1.Vector.Create();
      var t = t.GetComponent(3);
      var l = t.ActorLocationProxy;
      var _ = t.ActorForwardProxy;
      var i = o.GetCreatureDataId();
      for (const v of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
        var c = v.GetCreatureDataId();
        if (v.IsAutoRole() && c !== i && e.includes(c)) {
          var m = v.EntityHandle?.Entity?.GetComponent(3);
          if (m) {
            var s = m.ScaledRadius * 2 + 10;
            s *= s;
            let e = false;
            while (a.length > 0) {
              var S = a.pop();
              if (S === undefined) {
                break;
              }
              n.DeepCopy(l);
              _.RotateAngleAxis(S, Vector_1.Vector.UpVectorProxy, r);
              r.MultiplyEqual(SceneTeamDefine_1.AUTO_ROLE_OFFSET_DISTANCE);
              n.AdditionEqual(r);
              S = (0, SkillBehaviorMisc_1.traceWall)(m, l, n, false);
              if (S && (!S[0] || !(Vector_1.Vector.DistSquared2D(l, n) < s)) && m.FixBornLocation("刷新Ai角色入队位置", true, n)) {
                e = true;
                break;
              }
            }
            if (!e) {
              m.SetActorLocation(l.ToUeVector(), "刷新Ai角色入队位置", false);
              m.FixBornLocation("刷新Ai角色入队位置");
            }
          }
        }
      }
    }
  }
  static RegisterPanelQteJoinTeam(e, o, t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "注册角色入队界面QTE", ["RoleIdList", o]);
    }
    ModelManager_1.ModelManager.SceneTeamModel.PanelQteHandleId = e;
    ModelManager_1.ModelManager.SceneTeamModel.PanelQteShowTrialRoleTips = t;
    var a = ModelManager_1.ModelManager.SceneTeamModel.PanelQteRoleIdSet;
    a.clear();
    for (const r of o) {
      a.add(r);
    }
  }
  static ChangePhantomTeam(e, o = undefined) {
    var t = PhantomFormationById_1.configPhantomFormationById.GetConfig(e);
    if (t) {
      var a = new Set();
      for (const n of t.Roles) {
        a.add(n);
      }
      if (a.size <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneTeam", 48, "声骸编队内无角色", ["Id", e]);
        }
      } else if (ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType === 2) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SceneTeam", 48, "声骸编队下不允许切换声骸");
        }
      } else if (SceneTeamController.Uvl(2, a, true, false)) {
        t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
        let e = undefined;
        if (o && t) {
          var r = t.GetComponent(206);
          for (const l of o) {
            if (r.HasTag(l.TagId)) {
              e = l;
              break;
            }
          }
        }
        o = t?.GetComponent(175);
        o?.AddBuff(GameplayAbilityVisionMisc_1.VISION_APPEAR_BUFF_ID, {
          InstigatorId: o.CreatureDataId,
          Reason: "开始切换声骸编队时，声骸自身的材质和粒子"
        });
        if (e) {
          t?.GetComponent(18)?.SendGameplayEventToActor(e);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneTeam", 48, "声骸编队配置不存在", ["Id", e]);
    }
  }
  static RevertPhantomTeam() {
    var e;
    if (ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType !== 2) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneTeam", 48, "非声骸编队下不允许还原声骸");
      }
    } else {
      e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      SceneTeamController.Uvl(1, undefined, false, false);
      if (e?.Valid) {
        e.Entity?.GetComponent(175)?.RemoveAllDurationBuffs("声骸还原清理持续型buff");
      }
    }
  }
  static TryUseMultiQte(e) {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    var t = o.EntityHandle.Entity.GetComponent(99);
    if (t.IsQteReady(e)) {
      e.Entity.GetComponent(99).UseExitSkill(o.EntityHandle);
      t.ExecuteMultiQte(e);
      return true;
    } else {
      if (!e.Entity.GetComponent(206).HasTag(166024319)) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TeammateQteDisable");
      }
      return false;
    }
  }
  static IsMatchRoleOption(e) {
    var o = ModelManager_1.ModelManager.SceneTeamModel;
    var t = o.IsPhantomTeam;
    var a = o.GetTeamItems();
    for (const r of e) {
      switch (r.Type) {
        case IMatch_1.EMatchRoleType.Player:
          if (t) {
            break;
          }
          return true;
        case IMatch_1.EMatchRoleType.Phantom:
          if (t) {
            for (const n of a) {
              if (n.GetConfigId === r.Id) {
                return true;
              }
            }
          }
      }
    }
    return false;
  }
  static EmitEvent(e, o, ...t) {
    var a;
    if (e && (EventSystem_1.EventSystem.EmitWithTarget(e, o, ...t), (a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e.Id, {
      ParamType: 1
    })) && (a.IsMyRole() && EventSystem_1.EventSystem.EmitWithTarget(SceneTeamEvent_1.SceneTeam.Local, o, ...t), EventSystem_1.EventSystem.EmitWithTarget(SceneTeamEvent_1.SceneTeam.All, o, ...t)), FormationDataController_1.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.Id === e.Id)) {
      EventSystem_1.EventSystem.EmitWithTarget(SceneTeamEvent_1.SceneTeam.Local, o, ...t);
      EventSystem_1.EventSystem.EmitWithTarget(SceneTeamEvent_1.SceneTeam.All, o, ...t);
    }
  }
  static EmitAbilityEvent(e, o, t, ...a) {
    var r;
    if (e && (AbilityEvent_1.AbilityEvent.Emit(e, o, t, ...a), (r = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e.Id, {
      ParamType: 1
    })) && (r.IsMyRole() && AbilityEvent_1.AbilityEvent.Emit(SceneTeamEvent_1.SceneTeam.Local, o, t, ...a), AbilityEvent_1.AbilityEvent.Emit(SceneTeamEvent_1.SceneTeam.All, o, t, ...a)), FormationDataController_1.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.Id === e.Id)) {
      AbilityEvent_1.AbilityEvent.Emit(SceneTeamEvent_1.SceneTeam.Local, o, t, ...a);
      AbilityEvent_1.AbilityEvent.Emit(SceneTeamEvent_1.SceneTeam.All, o, t, ...a);
    }
  }
}
exports.SceneTeamController = SceneTeamController;
(_a = SceneTeamController).Tpo = undefined;
SceneTeamController.Lpo = undefined;
SceneTeamController.Dpo = undefined;
SceneTeamController.wpo = undefined;
SceneTeamController.RQe = (e, o) => {
  if (e === 10036) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnConcertoResponseOpen, o);
  }
};
SceneTeamController.Zpe = e => {
  GlobalData_1.GlobalData.BpEventManager.小队战斗状态改变时.Broadcast(e);
};
SceneTeamController.Upo = () => {
  _a.wpo ||= TimerSystem_1.TimerSystem.Forever(_a.qpo, SceneTeamDefine_1.CHECK_ROLE_INTERVAL);
};
SceneTeamController.GUe = (e, o, t) => {
  ModelManager_1.ModelManager.SceneTeamModel.OnAddEntity(o);
};
SceneTeamController.zpe = (e, o) => {
  ModelManager_1.ModelManager.SceneTeamModel.OnRemoveEntity(o);
};
SceneTeamController.PCl = (e, o, t) => {
  switch (e) {
    case 1:
    case 4:
      var a = o ? Vector_1.Vector.Create(o) : undefined;
      var r = SceneTeamDefine_1.DATA_LAYER_CHANGE_RADIUS * SceneTeamDefine_1.DATA_LAYER_CHANGE_RADIUS;
      _a.DisableAllRoleWithoutControl(a, r);
      break;
    case 2:
      _a.DisableAllRoleWithoutControl();
  }
};
SceneTeamController.$an = () => {
  _a.DisableAllRoleWithoutControl();
};
SceneTeamController.xpo = e => {
  var o = MathUtils_1.MathUtils.LongToNumber(e.mUs);
  if (e.W5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "通过换人推送切换角色", ["UpCreatureId", o]);
    }
    SceneTeamController.Cel(o);
  } else {
    var t = MathUtils_1.MathUtils.LongToNumber(e.CUs);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "联机换人同步", ["UpCreatureId", o], ["DownCreatureDataId", t]);
    }
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    if (a?.Valid && r?.Valid) {
      var n = e.wn1;
      var l = n ? Vector_1.Vector.Create(n.l8n) : undefined;
      var n = n ? Rotator_1.Rotator.Create(n._8n) : undefined;
      RoleTeamComponent_1.RoleTeamComponent.OnSimulateChangeRole(r, a, e.tku, l, n);
      ModelManager_1.ModelManager.SceneTeamModel.OtherPlayerChangeRole(e.W5n, o);
      for (const _ of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(e.W5n)) {
        if (_.GetCreatureDataId() === t) {
          _.SetRemoteIsControl(false);
        } else if (_.GetCreatureDataId() === o) {
          _.SetRemoteIsControl(true);
        }
      }
      if (GlobalData_1.GlobalData.GameInstance) {
        GlobalData_1.GlobalData.BpEventManager.当换人完成时.Broadcast();
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOtherChangeRole, a, r);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "联机换人同步上下场实体不同时存在");
    }
  }
};
SceneTeamController.Sjc = e => {
  var e = MathUtils_1.MathUtils.LongToNumber(e.F4n);
  var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
  if (o?.Valid) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "联机前台不受控下场同步", ["creatureDataId", e]);
    }
    o.Entity.GetComponent(94).SimulateGoDown(true);
  } else if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("SceneTeam", 48, "联机前台不受控下场同步时，实体无效或不存在", ["creatureDataId", e]);
  }
};
SceneTeamController.Ppo = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("SceneTeam", 48, "切换编队组推送");
  }
  ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(e.W5n, e.USs);
};
SceneTeamController.Apo = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("SceneTeam", 48, "更新编队组推送", ["Data", e]);
  }
  var o = new Array();
  for (const n of e.yRs) {
    var t = new Array();
    for (const l of n.ERs) {
      var a = [];
      for (const _ of l.gRs) {
        var r = new SceneTeamData_1.SceneTeamRole();
        r.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(_.F4n);
        r.RoleId = _.Q6n;
        r.OnStageWithoutControl = _.eT_;
        a.push(r);
      }
      t.push({
        GroupType: l.USs,
        GroupRoleList: a,
        CurrentRoleId: l.NVn,
        LivingState: SceneTeamController.GetLivingSate(l.JEs),
        IsFixedLocation: l.I0a
      });
    }
    o.push({
      PlayerId: n.W5n,
      CurrentGroupType: n.ZI_,
      Groups: t
    });
  }
  ModelManager_1.ModelManager.SceneTeamModel.UpdateAllPlayerData(o);
};
SceneTeamController.r$s = e => {
  var o = e.W5n;
  var e = e.azs;
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("SceneTeam", 48, "更新编队组死亡状态", ["PlayerId", o], ["States", e]);
  }
  var t = new Map();
  for (const r of e) {
    var a = SceneTeamController.GetLivingSate(r.JEs);
    t.set(r.USs, a);
  }
  ModelManager_1.ModelManager.SceneTeamModel.UpdateGroupLivingStates(o, t);
};
SceneTeamController.Phl = e => {
  for (const t of e.vI_) {
    var o = MathUtils_1.MathUtils.LongToNumber(t);
    ModelManager_1.ModelManager.SceneTeamModel.AddPreloadEntity(o);
  }
};
SceneTeamController.VOi = e => {
  var o;
  if (e === ModelManager_1.ModelManager.SceneTeamModel.PanelQteHandleId) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneTeam", 48, "角色入队界面QTE交互完成，开始执行");
    }
    e = ModelManager_1.ModelManager.SceneTeamModel.PanelQteShowTrialRoleTips;
    o = ModelManager_1.ModelManager.SceneTeamModel.PanelQteRoleIdSet;
    SceneTeamController.Uvl(1, o, false, e);
    o.clear();
    ModelManager_1.ModelManager.SceneTeamModel.PanelQteHandleId = 0;
    ModelManager_1.ModelManager.SceneTeamModel.PanelQteShowTrialRoleTips = false;
  }
};
SceneTeamController.qpo = () => {
  var e;
  var o;
  var t;
  var a;
  if (Net_1.Net.IsServerConnected()) {
    e = (t = ModelManager_1.ModelManager.SceneTeamModel).GetCurrentTeamItem;
    o = t.GetCurrentEntity?.Entity;
    if (e && o) {
      if ((t = t.CurrentGroupType) && t !== -1) {
        (a = new Protocol_1.Aki.Protocol.Xe_()).W5n = e.GetPlayerId();
        a.YHn = e.GetConfigId;
        a.JHn = e.GetCreatureDataId();
        CombatMessage_1.CombatNet.Send(26444, o, a);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "检查当前角色，控制特殊角色中", ["groupType", t]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "检查当前角色，无法获取队伍实例或实体");
    }
  }
}; //# sourceMappingURL=SceneTeamController.js.map