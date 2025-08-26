"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefensePlayerController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const KscEntityHandle_1 = require("../KscEntityHandle");
const KscEnv_1 = require("../KscEnv");
const KscLog_1 = require("../KscLog");
const KscUtil_1 = require("../KscUtil");
const TDFollowerProxy_1 = require("./TDFollowerProxy");
const TDPlayerModel_1 = require("./TDPlayerModel");
const EKSC_REMOVE_REASON_FOLLOWER = new UE.FName("Follower");
class TowerDefensePlayerController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return true;
  }
  static OnStart() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh);
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPlayerFollowerDestroy, this.Iku)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerDestroy, this.Iku);
    }
    this.Model.PendingRoleHandle = this.GetPlayerEntityHandle();
    this.Model.TowerDefenseWorldDone = true;
    this.DoPossessRole(this.Model.PendingRoleHandle);
    var t = this.GetPlayerFollower();
    if (t && this.CheckPlayerFollowerMatch(t)) {
      this.Eku(t);
    } else if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPlayerFollowerCreate, this.Eku)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerCreate, this.Eku);
    }
    this.TryInitKSCEnityt();
    this.aJc();
    return true;
  }
  static SyncMainLocations(t) {
    this.Model.PossessedPlayerHandle?.SyncEntityLocation();
    this.Model.PossessedFollowerHandle?.SyncEntityLocation();
  }
  static OnClear() {
    this.hJc();
    this.ClearFollowerKSCData();
    return true;
  }
  static OnStop() {
    this.hJc();
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPlayerFollowerDestroy, this.Iku)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerDestroy, this.Iku);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPlayerFollowerCreate, this.Eku)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerCreate, this.Eku);
    }
    this.ClearFollowerKSCData();
    return true;
  }
  static GetPlayerFollower() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    return ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(t)?.GetComponent(225)?.GetFollower();
  }
  static CheckPlayerFollowerMatch(t) {
    return t.Entity.GetComponent(0).TrapAuxiliaryConfigIds !== undefined;
  }
  static GetPlayerEntityHandle() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(t)?.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId;
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(t ?? 0);
  }
  static TryInitKSCEnityt() {
    var t;
    if (this.Model.TowerDefenseWorldDone && this.Model.PendingFollowerCreatureId !== undefined && this.Model.PendingFollowers !== undefined && !this.Model.HasInitKSCEntity) {
      this.Model.HasInitKSCEntity = true;
      this.Model.PossessedFollowerHandle = new KscEntityHandle_1.KscEntityHandle(undefined, this.Model.PendingFollowerCreatureId);
      this.jHu(this.Model.PendingFollowers);
      if (this.Model.CurrentFollowerProxyId === undefined) {
        if ((t = this.HHu())?.ProxyId) {
          this.SetFollowerProxy(t.ProxyId);
        }
      } else {
        this.SetFollowerProxy(this.Model.CurrentFollowerProxyId);
      }
      this.EnablePlayerFollower(this.Model.CurrentFollowerEnable);
      this.DoPlayerFollowerEnableChange(this.Model.CurrentFollowerEnable);
    }
  }
  static get Model() {
    return ModelManager_1.ModelManager.TowerDefensePlayerModel;
  }
  static SetPendingFollowers(t) {
    if (this.Model.PendingFollowers === undefined) {
      this.Model.PendingFollowers = new Array();
    }
    this.Model.PendingFollowers = t;
  }
  static DoPossessRole(t) {
    if (KscEnv_1.KscEnv.KscWorld) {
      if (t?.Valid) {
        KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防感知玩家角色", ["Spawned Player", t]);
        this.$Hu(t);
      } else {
        KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防感知玩家角色,entity非法");
      }
    } else {
      KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防感知玩家角色,世界非法");
    }
  }
  static $Hu(e) {
    var t;
    if (this.Model.PossessedPlayerHandle) {
      t = this.Model.PossessedPlayerHandle.CreatureDataId;
      this.Model.PossessedPlayerHandle.CreatureDataId = e.CreatureDataId;
      ControllerHolder_1.ControllerHolder.TowerDefenseInputController.AddInputLayer();
      KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防绑定玩家战斗实体刷新", ["old creature", t], ["new creature", e.CreatureDataId]);
    } else {
      ControllerHolder_1.ControllerHolder.TowerDefenseInputController.AddInputLayer();
      if (e.Entity) {
        t = e.Entity.GetComponent(3)?.Actor?.D_GetTransform() ?? new UE.TransformDouble();
        ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.AddEntityDt(e.CreatureDataId, TDPlayerModel_1.TowerDefensePlayerModel.PlayerEntityKey, undefined, t, t => {
          this.Model.PossessedPlayerHandle = new KscEntityHandle_1.KscEntityHandle(t, e.CreatureDataId);
          KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防绑定玩家战斗实体", ["entity", e.Entity], ["creature", e.CreatureDataId]);
        });
      } else {
        KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防绑定玩家战斗实体失败");
      }
    }
  }
  static GetPossessedPlayer() {
    return this.Model?.PossessedPlayerHandle;
  }
  static GetPossessedPlayerEntity() {
    return this.Model?.PendingRoleHandle;
  }
  static jHu(t) {
    if (this.Model.PossessedFollowerProxies === undefined) {
      this.Model.PossessedFollowerProxies = new Map();
    }
    this.Model.PossessedFollowerProxies.clear();
    for (const o of t) {
      var e = new TDFollowerProxy_1.TowerDefenseFollowerProxy(o);
      var s = KscUtil_1.KscUtil.GetFollowerSkillIdsByProxy(o);
      var i = KscUtil_1.KscUtil.GetFollowerPropertyIdByProxy(o);
      e.SkillIds = s;
      e.PropertyId = i;
      this.Model.PossessedFollowerProxies.set(o, e);
    }
  }
  static WHu(t) {
    return this.Model.PossessedFollowerProxies?.get(t);
  }
  static HHu() {
    var t = this.Model.PossessedFollowerProxies?.keys()?.next()?.value;
    if (t !== undefined) {
      return this.WHu(t);
    }
  }
  static aJc() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(t)?.GetComponent(206)?.AddTag(-1383501816);
  }
  static hJc() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(t)?.GetComponent(206)?.RemoveTag(-1383501816);
  }
  static TogglePlayerFollower() {
    var t = this.IsPlayerFollowerEnabled();
    this.EnablePlayerFollower(!t);
  }
  static EnablePlayerFollower(t) {
    this.Model.CurrentFollowerEnable = t;
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.GetComponent(225)?.SetFollowerEnable(t);
    if (!t) {
      this.RemoveChargeEffect();
      this.SetFollowerSKillAutoCast(false, true);
    }
  }
  static DoPlayerFollowerEnableChange(e) {
    if (e && this.Model.PossessedFollowerHandle?.Valid === false && !this.Model.IsInFollowerInit) {
      var t = this.Model.PossessedFollowerHandle.CreatureDataId;
      const r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t ?? 0)?.Entity;
      if (r) {
        KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防跟随物更新", ["entity", r]);
        var s = r.GetComponent(3)?.Actor?.D_GetTransform() ?? new UE.TransformDouble();
        var i = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel.EntityDataDt.get(TDPlayerModel_1.TowerDefensePlayerModel.FollowerEntityKey)?.[1];
        const l = r.GetComponent(0).ComponentDataMap.get("sEu")?.sEu;
        if (i) {
          this.Model.IsInFollowerInit = true;
          ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.AsyncAddEntity({
            CreatureId: t,
            SimpleCombatId: TDPlayerModel_1.TowerDefensePlayerModel.FollowerEntityKey,
            AssetPath: i,
            PropertyId: 0,
            Transform: s,
            Buffs: l?.dju,
            FinishCallback: t => {
              KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防跟随物绑定", ["entity", r], ["buff", l?.dju], ["kscHandle", this.Model.PossessedFollowerHandle], ["kscEntity", t]);
              this.Model.PossessedFollowerHandle?.SetKscEntity(t);
              this.dfd();
              this.F1d();
              this.ListenFollowerCDAttribute();
              this.Model.IsInFollowerInit = false;
            }
          });
        }
      } else {
        KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防跟随物更新可用性;绑定实体不存在", ["creatureId", t]);
      }
    } else {
      KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防跟随物更新可用性", ["isEnable", e], ["kscValid", this.Model.PossessedFollowerHandle?.Valid]);
      this.Model.PossessedFollowerKscEntity?.SetActorHiddenInGame(!e);
      var i = (0, puerts_1.$ref)(undefined);
      this.Model.PossessedFollowerKscEntity?.GetAttachedActors(i, true);
      var o = (0, puerts_1.$unref)(i);
      for (let t = 0; t < o.Num(); ++t) {
        o.Get(t).SetActorHiddenInGame(!e);
      }
    }
  }
  static dfd() {
    var t = this.Model.PossessedFollowerKscEntity;
    var e = this.QHu(t);
    if (e) {
      var s;
      var t = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.GetAllSkillDataDt();
      if (this.Model.AllSkillId2SkillData === undefined) {
        this.Model.AllSkillId2SkillData = new Map();
      } else {
        this.Model.AllSkillId2SkillData.clear();
      }
      for ([, s] of t) {
        var i = s[0];
        var o = s[1];
        var r = i.Id;
        var l = i.SkillId;
        i.OperateType;
        if (l > 0) {
          l = {
            SkillType: 1,
            SkillId: l,
            Time: i.PressTime,
            ChargeCueId: i.ChargeCueId,
            ChargeFullCueId: i.ChargeFullCueId,
            PsFeedback: i.PsFeedbackId,
            OperateType: i.OperateType
          };
          this.Model.AllSkillId2SkillData.set(r, l);
        } else if (l = KscUtil_1.KscUtil.AssetPath2Name(o)) {
          if ((o = e.get(l)) === undefined) {
            KscLog_1.KscLog.Info("Skill", 84, KscEnv_1.KscEnv.KscWorld, "跟随物技能初始化忽略,索引异常", ["rowId", r], ["name", l]);
          } else {
            l = {
              SkillType: 0,
              SkillId: o,
              Time: i.PressTime,
              ChargeCueId: i.ChargeCueId,
              ChargeFullCueId: i.ChargeFullCueId,
              PsFeedback: i.PsFeedbackId,
              OperateType: i.OperateType
            };
            this.Model.AllSkillId2SkillData.set(r, l);
          }
        } else {
          KscLog_1.KscLog.Info("Skill", 84, KscEnv_1.KscEnv.KscWorld, "跟随物技能初始化忽略,名称异常", ["rowId", r]);
        }
      }
    } else {
      KscLog_1.KscLog.Warn("Skill", 84, KscEnv_1.KscEnv.KscWorld, "辅助机技能索引异常");
    }
  }
  static SetFollowerProxy(t) {
    var e;
    this.Model.CurrentFollowerProxyId = t;
    if (this.Model.PossessedFollowerProxies) {
      if (this.Model.PossessedFollowerProxies.size <= 0) {
        KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防辅助机切换索引异常,没有捕获数据", ["id", t]);
      } else if (e = this.Model.PossessedFollowerProxies.get(t)) {
        KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防辅助机切换索引", ["proxy id", t], ["proxy", e]);
        this.F1d();
      } else {
        KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防辅助机切换索引异常,找不到id", ["id", t]);
      }
    } else {
      KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防辅助机数据未初始化完成,等待初始化完成", ["id", t]);
    }
  }
  static F1d() {
    this.UnBindFollowerOperateSkills();
    var t = this.Model.PossessedFollowerKscEntity;
    this.BindFollowerOperateSkills(t, this.Model.CurrentFollowerProxyId);
    this.BindFollowerAttrs(t, this.Model.CurrentFollowerProxyId);
    this.SetListenSkillCD(t, this.Model.CurrentFollowerProxyId);
    this.N1d();
    this.RemoveChargeEffect();
    this.RefreshFollowerCue();
    this.SetFollowerState(0);
    this.ClearFollowerCdCue();
    this.RefreshFolloerCdCue();
    this.Model.IsInCharge = false;
  }
  static IsPlayerFollowerEnabled() {
    return this.Model.PossessedFollowerEnabled;
  }
  static DoPlayerFollowerCreate(t) {
    var e;
    if (t && t.CreatureDataId !== undefined) {
      if ((e = t.Entity.GetComponent(0).TrapAuxiliaryConfigIds) === undefined) {
        KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防辅助机监听创建不匹配", ["entity", t.Entity], ["creatureId", t.CreatureDataId]);
      } else {
        KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "检测到塔防辅助机实体加入", ["entity", t.Entity], ["configs", e]);
        this.Model.PendingFollowerCreatureId = t.CreatureDataId;
        this.SetPendingFollowers(e);
        this.TryInitKSCEnityt();
      }
    } else {
      KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防跟随物记录Id失败");
    }
  }
  static DoPlayerFollowerDestroy() {
    var t = this.Model.PossessedFollowerHandle?.CreatureDataId;
    KscLog_1.KscLog.Info("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防跟随物移除战斗实体", ["creatureId", t], ["kscEntity", this.Model.PossessedFollowerHandle?.KscEntity]);
    if (t) {
      ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.RemoveEntity(t, EKSC_REMOVE_REASON_FOLLOWER);
    }
    this.Model.PossessedFollowerHandle = undefined;
    this.UnBindFollowerOperateSkills();
  }
  static D_Fire(t, e) {
    this.Model.PossessedFollowerKscEntity?.D_Fire(t, e);
  }
  static BeginSkillFollower(t) {
    if (t.SkillType === 0) {
      this.BeginKSCSkillFollower(t);
    } else {
      this.BeginMontageSkillFollower(t);
    }
  }
  static BeginKSCSkillFollower(t) {
    var e = this.Model.PossessedFollowerActor;
    if (e) {
      e = e.D_GetTransform();
      this.D_Fire(e, t.SkillId);
    }
  }
  static dcd(t, e) {
    var s;
    if (this.Model.CurrentFollowerProxyId && (s = this.GetFollowListenSkillData(this.Model.CurrentFollowerProxyId)) && s === t && (s = e?.GetGroupSkillCdInfo(t.SkillId)?.CurMaxCd) && s > 0) {
      this.OnFollowerEnterSkillCd(0, s);
    }
  }
  static BeginMontageSkillFollower(e) {
    var t = e.SkillId;
    var s = this.Model.PossessedFollowerEntity?.GetComponent(39);
    const i = this.Model.PossessedFollowerEntity?.GetComponent(208);
    if (s && i && !i.IsSkillInCd(t) && s.Active) {
      s.BeginSkillAsync(t, {
        Reason: "TDPlayerController.BeginSkillFollower"
      }).then(t => {
        if (t) {
          this.dcd(e, i);
        }
      }).catch(t => {
        KscLog_1.KscLog.Warn("Load", 85, KscEnv_1.KscEnv.KscWorld, "塔防辅助机:播放技能异常", ["error", t]);
      });
    }
  }
  static GetFollowerSkillByOperateType(t, e) {
    if (this.Model.BindFollowerSkills && this.Model.BindFollowerSkills.size !== 0) {
      t = this.Model.BindFollowerSkills.get(t);
      if (t !== undefined) {
        for (const s of t) {
          if (e >= s.Time) {
            return s;
          }
        }
      }
    }
  }
  static mcd() {
    var t = this.Model.BindFollowerSkills?.get(3);
    if (t) {
      for (const e of t) {
        if (e.SkillType === 1) {
          this.BeginMontageSkillFollower(e);
        }
      }
    }
  }
  static SetFollowerSKillAutoCast(e, s) {
    if (this.Model.IsInAutoCast !== e || s) {
      this.Model.IsInAutoCast = e;
      let t = false;
      var i = this.Model.BindFollowerSkills?.get(3);
      if (i) {
        var o = this.Model.PossessedFollowerKscEntity;
        var r = this.Model.PossessedFollowerEntity;
        if (o && r) {
          for (const l of i) {
            if (l.SkillType === 1) {
              if (e) {
                this.BeginMontageSkillFollower(l);
              }
              t = true;
            } else {
              o.SetSkillAutoCast(l.SkillId, e ? 1 : 2);
            }
          }
          if (t || s) {
            if (e) {
              if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharSkillCountChanged, this.OnCharSkillCountChanged)) {
                EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharSkillCountChanged, this.OnCharSkillCountChanged);
              }
              if (!EventSystem_1.EventSystem.HasWithTarget(r, EventDefine_1.EEventName.OnSkillEnd, this.OnFollowerMontageSkillEnd)) {
                EventSystem_1.EventSystem.AddWithTarget(r, EventDefine_1.EEventName.OnSkillEnd, this.OnFollowerMontageSkillEnd);
              }
            } else {
              if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharSkillCountChanged, this.OnCharSkillCountChanged)) {
                EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharSkillCountChanged, this.OnCharSkillCountChanged);
              }
              if (EventSystem_1.EventSystem.HasWithTarget(r, EventDefine_1.EEventName.OnSkillEnd, this.OnFollowerMontageSkillEnd)) {
                EventSystem_1.EventSystem.RemoveWithTarget(r, EventDefine_1.EEventName.OnSkillEnd, this.OnFollowerMontageSkillEnd);
              }
            }
          }
        } else {
          KscLog_1.KscLog.Warn("Input", 85, KscEnv_1.KscEnv.KscWorld, "塔防辅助机:自动射击更改失败");
        }
      }
    }
  }
  static SetFollowerState(t) {
    if (this.Model.FollowerState !== (this.Model.FollowerState = t)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshTrapDefensePsFeedback);
    }
  }
  static ClearFollowerCdCue() {
    if (this.Model.FollowerCdCueHandle) {
      var t = this.Model.PossessedFollowerEntity?.GetComponent(21);
      for (const e of this.Model.FollowerCdCueHandle) {
        t?.RemoveCueByHandle(e);
      }
      this.Model.FollowerCdCueHandle.length = 0;
    }
  }
  static RemoveFollowerCue() {
    if (this.Model.FollowCueHandle) {
      var t = this.Model.PossessedFollowerEntity?.GetComponent(21);
      for (const e of this.Model.FollowCueHandle) {
        t?.RemoveCueByHandle(e);
      }
      this.Model.FollowCueHandle.length = 0;
    }
  }
  static RefreshFollowerCue() {
    this.RemoveFollowerCue();
    if (this.Model.CurrentFollowerProxyId) {
      var t = KscUtil_1.KscUtil.GetFollowerCueIds(this.Model.CurrentFollowerProxyId);
      if (t && !(t.length <= 0)) {
        var e = this.Model.PossessedFollowerEntity?.GetComponent(21);
        if (e) {
          if (this.Model.FollowCueHandle === undefined) {
            this.Model.FollowCueHandle = [];
          }
          for (const i of t) {
            var s = e.AddCue(i);
            this.Model.FollowCueHandle?.push(s);
          }
        }
      }
    }
  }
  static SetPsFeedbackId(t) {
    if (this.Model.PsFeedbackId !== (this.Model.PsFeedbackId = t)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshTrapDefensePsFeedback);
    }
  }
  static RemoveChargeEffect() {
    if (this.Model.ChargeCueHandle > 0) {
      this.Model.PossessedFollowerEntity?.GetComponent(21)?.RemoveCueByHandle(this.Model.ChargeCueHandle);
      this.Model.ChargeCueHandle = 0;
    }
    this.Model.LastSkillChargeFull = false;
    this.Model.ChargeSkill = undefined;
    this.SetPsFeedbackId(undefined);
    this.Model.PsFeedbackId = undefined;
  }
  static TryPlayCharageEffect(i, o) {
    if (i !== 2) {
      this.RemoveChargeEffect();
    } else {
      var r = this.Model.BindFollowerSkills?.get(1);
      if (r !== undefined && r.length !== 0) {
        let t = false;
        let e = undefined;
        let s = -1;
        if (o > r[0].Time) {
          t = true;
          e = r[0];
          s = 0;
        } else {
          for (let t = r.length - 1; t >= 0; t--) {
            if (o <= r[t].Time) {
              e = r[t];
              s = t;
              break;
            }
          }
        }
        var i = this.Model;
        var l = i.PossessedFollowerEntity?.GetComponent(21);
        if (l !== undefined && (t && !i.LastSkillChargeFull && (i.LastSkillChargeFull = true, e.ChargeFullCueId > 0 && l.AddCue(e.ChargeFullCueId, {
          Instant: true
        }), this.SetPsFeedbackId(e.PsFeedback)), i.ChargeSkill !== e)) {
          if (i.ChargeSkill && i.ChargeSkill.ChargeFullCueId > 0) {
            l.AddCue(i.ChargeSkill.ChargeFullCueId, {
              Instant: true
            });
          }
          if (i.ChargeCueHandle > 0) {
            l.RemoveCueByHandle(i.ChargeCueHandle);
            i.ChargeCueHandle = 0;
          }
          if (e?.ChargeCueId && e.ChargeCueId > 0) {
            i.ChargeCueHandle = l.AddCue(e.ChargeCueId);
          }
          this.SetPsFeedbackId(r[s + 1]?.PsFeedback);
          i.ChargeSkill = e;
        }
      }
    }
  }
  static QHu(t) {
    if (t) {
      var e = t.GetSkillComp()?.Skills_;
      var s = e?.Num();
      if (s) {
        var i = new Map();
        for (let t = 0; t < s; ++t) {
          var o = e.Get(t)?.DaSkill_;
          if (o === undefined) {
            KscLog_1.KscLog.Info("Skill", 84, KscEnv_1.KscEnv.KscWorld, "获取跟随物<技能名,索引>忽略", ["index", t]);
          } else {
            o = o.GetName();
            i.set(o, t);
          }
        }
        return i;
      }
      KscLog_1.KscLog.Warn("Skill", 84, KscEnv_1.KscEnv.KscWorld, "获取跟随物<技能名,索引>异常,实体没有技能");
    } else {
      KscLog_1.KscLog.Warn("Skill", 84, KscEnv_1.KscEnv.KscWorld, "获取跟随物<技能名,索引>异常,错误的逻辑实体");
    }
  }
  static mfd(t) {
    if (this.Model.PossessedFollowerProxies && !(this.Model.PossessedFollowerProxies.size <= 0)) {
      return this.WHu(t)?.SkillIds;
    }
  }
  static BindFollowerOperateSkills(t, e) {
    if (t) {
      if (e === undefined) {
        KscLog_1.KscLog.Warn("Skill", 84, KscEnv_1.KscEnv.KscWorld, "跟随物输入非法的proxy id", ["kscEntity", t]);
      } else {
        e = this.mfd(e);
        if (e) {
          if (this.Model.BindFollowerSkills === undefined) {
            this.Model.BindFollowerSkills = new Map();
          }
          if (this.Model.SkillId2SkillData === undefined) {
            this.Model.SkillId2SkillData = new Map();
          }
          for (const r of e) {
            var s = this.Model.AllSkillId2SkillData?.get(r);
            if (s) {
              var i = s.OperateType;
              let t = this.Model.BindFollowerSkills.get(i);
              if (t === undefined) {
                t = [];
                this.Model.BindFollowerSkills.set(i, t);
              }
              KscLog_1.KscLog.Info("Skill", 84, KscEnv_1.KscEnv.KscWorld, "跟随物技能操作绑定", ["skillId", r], ["skillData", s]);
              t.push(s);
              this.Model.SkillId2SkillData.set(r, s);
            } else {
              KscLog_1.KscLog.Info("Skill", 85, KscEnv_1.KscEnv.KscWorld, "辅助机技能操作绑定失败", ["skillId", r]);
            }
          }
          for (var [, o] of this.Model.BindFollowerSkills) {
            o.sort((t, e) => e.Time - t.Time);
          }
        } else {
          KscLog_1.KscLog.Warn("Skill", 84, KscEnv_1.KscEnv.KscWorld, "跟随物Proxy没有技能", ["kscEntity", t]);
        }
      }
    } else {
      KscLog_1.KscLog.Warn("Skill", 84, KscEnv_1.KscEnv.KscWorld, "跟随物锚定战斗实体非法");
    }
  }
  static UnBindFollowerOperateSkills() {
    this.SetFollowerSKillAutoCast(false, true);
    this.Model.BindFollowerSkills?.clear();
    this.Model.SkillId2SkillData?.clear();
  }
  static ClearFollowerKSCData() {
    this.RemoveChargeEffect();
    this.RemoveFollowerCue();
    this.ClearFollowerCdCue();
    var t = this.Model.PossessedFollowerKscEntity;
    if (t && (t.OnSkillCD?.Unbind(), t.OnSkillReady?.Unbind(), t = t.GetSkillComp()?.AttrSet_)) {
      t.RemoveAttrListen(117);
      t.RemoveAttrListen(118);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharSkillCountChanged, this.RefreshFolloerCdCue)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharSkillCountChanged, this.RefreshFolloerCdCue);
    }
    (0, puerts_1.releaseManualReleaseDelegate)(TowerDefensePlayerController.V1d);
    (0, puerts_1.releaseManualReleaseDelegate)(TowerDefensePlayerController.j1d);
  }
  static ListenFollowerCDAttribute() {
    var t = this.Model.PossessedFollowerKscEntity?.GetSkillComp()?.AttrSet_;
    if (t) {
      t.AssignAttrListen(117, (0, puerts_1.toManualReleaseDelegate)(TowerDefensePlayerController.V1d));
      t.AssignAttrListen(118, (0, puerts_1.toManualReleaseDelegate)(TowerDefensePlayerController.j1d));
    } else {
      KscLog_1.KscLog.Warn("Skill", 85, KscEnv_1.KscEnv.KscWorld, "塔防辅助机:监听CD属性异常");
    }
  }
  static N1d() {
    var t = this.Model.PossessedFollowerKscEntity?.GetSkillComp();
    if (t) {
      var e = t.GetSkillCollDown();
      var s = this.Model.PossessedFollowerEntity?.GetComponent(208);
      if (s) {
        t = this.Model.SkillId2SkillData;
        if (t) {
          for (var [, i] of t) {
            if (i.SkillType === 1) {
              s.ModifyCdInfo(i.SkillId, e);
            }
          }
        }
      }
    }
  }
  static GetFollowListenSkillData(t) {
    var e = KscUtil_1.KscUtil.GetFollowerCdSkillByProxy(t);
    if (e === 1) {
      e = this.mfd(t);
      if (e && e.length === 1) {
        return this.Model.AllSkillId2SkillData?.get(e[0]);
      }
    }
  }
  static GetSkillDataByRowId(t) {
    return this.Model.SkillId2SkillData?.get(t);
  }
  static SetListenSkillCD(t, e) {
    var s;
    if (e !== undefined && t) {
      t.OnSkillCD?.Unbind();
      t.OnSkillReady?.Unbind();
      if (s = this.GetFollowListenSkillData(e)) {
        if (s.SkillType === 0) {
          KscLog_1.KscLog.Info("Skill", 85, KscEnv_1.KscEnv.KscWorld, "塔防辅助机监听KSC技能CD", ["KSCSkillId", s.SkillId]);
          t.ListenCDSkillIndex = s.SkillId;
          t.OnSkillCD?.Bind(this.OnFollowerEnterSkillCd);
          t.ListenSkillReadyIndex = s.SkillId;
          t.OnSkillReady?.Bind(this.RefreshFolloerCdCue);
        } else if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharSkillCountChanged, this.RefreshFolloerCdCue)) {
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharSkillCountChanged, this.RefreshFolloerCdCue);
        }
      } else if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharSkillCountChanged, this.RefreshFolloerCdCue)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharSkillCountChanged, this.RefreshFolloerCdCue);
      }
    } else {
      KscLog_1.KscLog.Warn("Skill", 85, KscEnv_1.KscEnv.KscWorld, "塔防辅助机输入非法的proxy id", ["proxyId", e]);
    }
  }
  static GetFollowerSkillRemainCD(t) {
    return this.Zrd(t, true);
  }
  static GetFollowerSkillCD(t) {
    return this.Zrd(t, false);
  }
  static Zrd(t, e) {
    var s;
    var i;
    var o = this.GetFollowListenSkillData(t);
    if (o) {
      if (i = this.Model.PossessedFollowerKscEntity) {
        if (o.SkillType === 1) {
          if ((s = this.Model.PossessedFollowerEntity?.GetComponent(208)?.GetGroupSkillCdInfo(o.SkillId)) === undefined) {
            return 0;
          } else if (e) {
            return s.CurRemainingCd;
          } else {
            return s.CurMaxCd;
          }
        } else {
          i = (s = i.GetSkillComp()?.Skills_)?.Num();
          o = o.SkillId;
          if (!i || i <= o) {
            KscLog_1.KscLog.Warn("Skill", 85, KscEnv_1.KscEnv.KscWorld, "塔防辅助机CDSkill不合法", ["proxyId", t]);
            return 0;
          } else if ((i = s.Get(o)) && i.IsValid()) {
            if (e) {
              return i.GetSkillCoolDownRemain();
            } else {
              return i.GetSkillCoolDownMax();
            }
          } else {
            KscLog_1.KscLog.Warn("Skill", 85, KscEnv_1.KscEnv.KscWorld, "塔防辅助机技能不合法", ["proxyId", t]);
            return 0;
          }
        }
      } else {
        KscLog_1.KscLog.Warn("Skill", 85, KscEnv_1.KscEnv.KscWorld, "塔防监听辅助机实体不存在", ["proxyId", t]);
        return 0;
      }
    } else {
      KscLog_1.KscLog.Warn("Skill", 85, KscEnv_1.KscEnv.KscWorld, "塔防辅助机没有CD技能", ["proxyId", t]);
      return 0;
    }
  }
  static BindFollowerAttrs(t, e) {
    var s;
    if (t) {
      if (e === undefined) {
        KscLog_1.KscLog.Warn("Attr", 84, KscEnv_1.KscEnv.KscWorld, "跟随物输入非法的proxy id", ["kscEntity", t]);
      } else if (s = this.Model.PossessedFollowerProxies?.get(e)) {
        if ((s = s.PropertyId) === undefined) {
          KscLog_1.KscLog.Warn("Attr", 84, KscEnv_1.KscEnv.KscWorld, "跟随物proxy的属性数据异常", ["kscEntity", t], ["proxy id", e]);
        } else {
          ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubController?.SetAttrs(t, s);
        }
      } else {
        KscLog_1.KscLog.Warn("Attr", 84, KscEnv_1.KscEnv.KscWorld, "跟随物输入非法的proxy", ["kscEntity", t], ["proxy id", e]);
      }
    } else {
      KscLog_1.KscLog.Warn("Attr", 84, KscEnv_1.KscEnv.KscWorld, "跟随物锚定战斗实体非法");
    }
  }
  static XHu(t, e) {
    if (this.IsPlayerFollowerEnabled()) {
      if ((t === 0 || !!this.Model.IsInCharge) && !(t === 0 ? this.Model.IsInCharge = true : t === 1 && (this.Model.IsInCharge = false), this.TryPlayCharageEffect(t, e), t === 0 && this.SetFollowerSKillAutoCast(!this.Model.IsInAutoCast, false), (e = this.GetFollowerSkillByOperateType(t, e)) === undefined)) {
        ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.BeginSkillFollower(e);
      }
    } else if (t === 0 && !Info_1.Info.IsInTouch() || t === 1 && Info_1.Info.IsInTouch()) {
      KscLog_1.KscLog.Info("Input", 84, KscEnv_1.KscEnv.KscWorld, "塔防输入层请求陷阱");
      ControllerHolder_1.ControllerHolder.TowerDefenseEventController.OccupyTrap();
    }
  }
  static YHu() {
    var t;
    var e = this.Model.PossessedPlayerHandle?.CreatureDataId;
    if (e !== undefined && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity) && (t = e?.GetComponent(179)) && t.Valid) {
      t.JumpPress();
    }
  }
  static zHu() {
    var t;
    var e = this.Model.PossessedPlayerHandle?.CreatureDataId;
    if (e !== undefined && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity) && (t = e?.GetComponent(176)) && t.Valid) {
      t.SprintPress();
    }
  }
  static hed() {
    var t;
    var e;
    if (ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(false) && ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelDataHasShop() && (t = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetExploreSkillId()) && (t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseItemByExploreToolId(t)) && (e = ModelManager_1.ModelManager.TrapDefenseModel?.BattleInventoryData.GetItemData(t.Id)) && !(e.InventoryCount <= 0)) {
      ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseUseItem(t.Id);
    }
  }
  static HandleJumpStart() {
    this.YHu();
  }
  static HandleSprintStart() {
    this.zHu();
  }
  static HandleUseItem() {
    this.hed();
  }
  static HandleTowerDefenseCommitFast() {
    this.XHu(0, 0);
  }
  static HandleTowerDefenseCommit(t, e) {
    this.XHu(t, e);
  }
  static HandleTowerFollowerSelect(t) {
    ControllerHolder_1.ControllerHolder.TowerDefenseEventController.CancelCurrentPreviewTrap();
    this.SetFollowerProxy(t);
    this.EnablePlayerFollower(true);
  }
  static PlayerDoSkill(t) {
    var e = ModelManager_1.ModelManager.TowerDefensePlayerModel?.PendingRoleHandle?.Entity;
    if (e) {
      this.DoSkill(e, t);
    }
  }
  static DoSkill(t, e) {
    var s = t.GetComponent(0)?.GetCreatureDataId();
    if (s) {
      if ((s = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel.GetKscEntityHandle(s)) && s.Valid) {
        if (s = s.KscEntity) {
          if (s instanceof UE.KSC_Entity_AssistMachine) {
            if (t = t?.GetComponent(3)?.Actor) {
              t = t.D_GetTransform();
              s.D_Fire(t, e);
            }
          } else {
            s.TryActiveSKill(e);
          }
        }
      } else {
        KscLog_1.KscLog.Warn("Input", 85, KscEnv_1.KscEnv.KscWorld, "塔防触发技能失败:无绑定的kscEntity");
      }
    } else {
      KscLog_1.KscLog.Warn("Input", 85, KscEnv_1.KscEnv.KscWorld, "塔防触发技能失败:无creatureId");
    }
  }
}
exports.TowerDefensePlayerController = TowerDefensePlayerController;
(_a = TowerDefensePlayerController).xrh = t => {
  if (KscEnv_1.KscEnv.KscWorld) {
    _a.DoPlayerFollowerEnableChange(t);
  }
};
TowerDefensePlayerController.Eku = t => {
  _a.DoPlayerFollowerCreate(t);
};
TowerDefensePlayerController.Iku = () => {
  _a.DoPlayerFollowerDestroy();
};
TowerDefensePlayerController.OnCharSkillCountChanged = t => {
  _a.mcd();
};
TowerDefensePlayerController.OnFollowerMontageSkillEnd = (t, e) => {
  _a.mcd();
};
TowerDefensePlayerController.RefreshFolloerCdCue = () => {
  var e = ModelManager_1.ModelManager.TowerDefensePlayerModel?.CurrentFollowerProxyId;
  if (e) {
    let t = 0;
    if ((t = _a.GetFollowerSkillRemainCD(e) > 0 ? 1 : 2) !== _a.Model.FollowerState) {
      _a.ClearFollowerCdCue();
      _a.SetFollowerState(t);
      var s = _a.Model.PossessedFollowerEntity?.GetComponent(21);
      var e = KscUtil_1.KscUtil.GetFollowerCdCueIds(e, t);
      if (e !== undefined && s) {
        if (_a.Model.FollowerCdCueHandle === undefined) {
          _a.Model.FollowerCdCueHandle = [];
        }
        for (const o of e) {
          var i = s.AddCue(o);
          _a.Model.FollowerCdCueHandle.push(i);
        }
      }
    }
  }
};
TowerDefensePlayerController.V1d = (t, e) => {
  _a.N1d();
};
TowerDefensePlayerController.j1d = (t, e) => {
  _a.N1d();
};
TowerDefensePlayerController.OnFollowerEnterSkillCd = (t, e) => {
  if (_a.Model.CurrentFollowerProxyId) {
    _a.RefreshFolloerCdCue();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapFollowerSkillCd, _a.Model.CurrentFollowerProxyId, e);
  }
}; //# sourceMappingURL=TDPlayerController.js.map