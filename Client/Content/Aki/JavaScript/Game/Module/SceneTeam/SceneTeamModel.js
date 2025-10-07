"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneTeamModel = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TrialRoleInfoById_1 = require("../../../Core/Define/ConfigQuery/TrialRoleInfoById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const StatDefine_1 = require("../../Common/StatDefine");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const RoleTeamComponent_1 = require("../../NewWorld/Character/Role/Component/RoleTeamComponent");
const GameModePromise_1 = require("../../World/Define/GameModePromise");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const WorldGlobal_1 = require("../../World/WorldGlobal");
const UiBlueprintFunctionLibrary_1 = require("../BpBridge/UiBlueprintFunctionLibrary");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
const SceneTeamData_1 = require("./SceneTeamData");
const SceneTeamDefine_1 = require("./SceneTeamDefine");
const SceneTeamItem_1 = require("./SceneTeamItem");
class SceneTeamModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Xpo = undefined;
    this.$po = new Map();
    this.aPr = new Array();
    this.Jpo = new Set();
    this.bhl = new Set();
    this.CurrentGroupType = undefined;
    this.Vpo = undefined;
    this.zpo = undefined;
    this.YBi = undefined;
    this.IsTeamReady = false;
    this.IsPhantomTeam = false;
    this.PanelQteHandleId = 0;
    this.PanelQteRoleIdSet = new Set();
    this.PanelQteShowTrialRoleTips = false;
    this.Wtc = -0;
    this.Qtc = -0;
    this.Zpo = undefined;
    this.LastEntityIsOnGround = true;
    this.LoadTeamPromise = undefined;
    this.vwa = undefined;
    this.BKl = 0;
    this.Kq1 = false;
    this.Mwa = e => {
      if (this.vwa !== e) {
        this.vwa = e;
      }
    };
  }
  get ChangingRole() {
    return !(this.BKl <= 0) && (!(Date.now() - this.BKl > SceneTeamDefine_1.CHANGING_ROLE_TIMEOUT) || !(this.BKl = 0, 1));
  }
  set ChangingRole(e) {
    this.Kq1 = e;
    this.BKl = e ? Date.now() : 0;
  }
  OnInit() {
    this.Qtc = CommonParamById_1.configCommonParamById.GetFloatConfig("change_role_cooldown");
    this.ResetChangeRoleCooldown();
    this.Xpo = Stats_1.Stat.Create("SceneTeamModel.OnChangeRoleStat", "", StatDefine_1.BATTLESTAT_GROUP);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGlobalFootstepMaterialChange, this.Mwa);
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGlobalFootstepMaterialChange, this.Mwa);
    return true;
  }
  OnLeaveLevel() {
    this.ResetChangeRoleCooldown();
    if (!ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel) {
      this.evo();
    }
    return true;
  }
  OnChangeMode() {
    this.ResetChangeRoleCooldown();
    this.evo();
    return true;
  }
  evo() {
    this.Zpo = undefined;
    for (const e of this.$po.values()) {
      e.Clear();
    }
    this.$po.clear();
    for (const t of this.aPr) {
      t.Reset();
    }
    this.aPr.length = 0;
    this.Jpo.clear();
    this.bhl.clear();
    this.PanelQteHandleId = 0;
    this.PanelQteRoleIdSet.clear();
    this.Vpo = undefined;
    this.YBi = undefined;
    this.IsPhantomTeam = false;
    this.zpo = undefined;
  }
  SwitchGroup(t, r, o = false, i = false) {
    var a = this.$po.get(t);
    if (a) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "切换编队组", ["PlayerId", t], ["GroupType", r]);
      }
      if (r !== a.GetCurrentGroupType()) {
        this.uMl(t, a, r);
        let e = i;
        if (!e) {
          a = this.CurrentGroupType;
          e = this.DGl(a, r);
        }
        this.tvo(e, o);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SceneTeam", 48, "切换编队组玩家不存在", ["PlayerId", t]);
    }
  }
  uMl(e, t, r) {
    t.SwitchGroup(r);
    if (e === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
      this.CurrentGroupType = r;
      this.IsPhantomTeam = r === 2;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUpdateTeamGroupType);
    }
  }
  UpdateGroupData(e, t) {
    let r = this.$po.get(e);
    if (!r) {
      r = SceneTeamData_1.SceneTeamPlayer.Create(e);
      this.$po.set(e, r);
    }
    r.UpdateGroup(t.GroupType, t.GroupRoleList, t.CurrentRoleId, t.LivingState ?? 1, t.IsFixedLocation ?? false);
    r.RefreshEntityEnable();
    if (t.GroupType === this.$po.get(e)?.GetCurrentGroupType()) {
      this.tvo(true);
    }
  }
  UpdateGroupDataAndSwitchGroup(e, t) {
    let r = this.$po.get(e);
    if (!r) {
      r = SceneTeamData_1.SceneTeamPlayer.Create(e);
      this.$po.set(e, r);
    }
    var o = t.GroupType;
    r.UpdateGroup(o, t.GroupRoleList, t.CurrentRoleId, t.LivingState ?? 1, t.IsFixedLocation ?? false);
    this.uMl(e, r, o);
    r.RefreshEntityEnable();
    this.tvo(true);
  }
  AddRoleAndSwitchGroup(e, t, r) {
    var o;
    var i = this.$po.get(e);
    if (i && (o = i.GetGroup(t)) && o.GetLivingState() !== 2) {
      o.AddRoleList(r);
      this.uMl(e, i, t);
      i.RefreshEntityEnable();
      this.tvo(true);
    }
  }
  UpdateAllPlayerData(t) {
    var r = [];
    for (const h of this.$po.keys()) {
      let e = false;
      for (const _ of t) {
        if (_.PlayerId === h) {
          e = true;
          break;
        }
      }
      if (!e) {
        r.push(h);
      }
    }
    for (const f of r) {
      this.$po.get(f)?.Clear();
      this.$po.delete(f);
    }
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var o = this.CurrentGroupType;
    for (const m of t) {
      var i = m.PlayerId;
      var a = m.CurrentGroupType;
      let t = this.$po.get(i);
      if (!t) {
        t = SceneTeamData_1.SceneTeamPlayer.Create(i);
        this.$po.set(i, t);
      }
      var n = t.GetCurrentGroup()?.GetCurrentRole()?.RoleId;
      var s = e === i && this.Kq1;
      this.uMl(i, t, a);
      for (const d of m.Groups) {
        let e = d.CurrentRoleId;
        if (s && d.GroupType === a) {
          for (const c of d.GroupRoleList) {
            if (c.RoleId === n) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("SceneTeam", 48, "更新编队组数据时，覆盖服务端当前角色", ["ServerRoleId", e], ["ClientRoleId", n]);
              }
              e = n;
              break;
            }
          }
        }
        t.UpdateGroup(d.GroupType, d.GroupRoleList, e, d.LivingState ?? 1, d.IsFixedLocation ?? false);
      }
      t.RefreshEntityEnable();
    }
    var l = this.CurrentGroupType;
    var o = this.DGl(o, l);
    this.tvo(o);
  }
  DGl(e = 0, t = 0) {
    return t === e || SceneTeamDefine_1.innerGroupType.includes(e) || SceneTeamDefine_1.innerGroupType.includes(t);
  }
  UpdateGroupLivingStates(e, t) {
    var r = this.$po.get(e);
    if (r) {
      for (var [o, i] of t) {
        r.GetGroup(o)?.UpdateLivingState(i);
      }
    }
  }
  tvo(i, a = false) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "刷新出战编队，开始");
    }
    this.IsTeamReady = false;
    this.RefreshLastTransform();
    this.aPr.length = 0;
    this.Jpo.clear();
    this.LoadTeamPromise ||= new GameModePromise_1.GameModePromise();
    if (this.Vpo) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "刷新出战编队，中断等待");
      }
      this.Vpo.Cancel();
    }
    let n = undefined;
    let s = false;
    var e = [];
    const l = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    for (const d of ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer() : [l]) {
      var t = this.$po.get(d)?.GetCurrentGroup();
      var r = t?.GetRoleList();
      if (r && r.length !== 0) {
        if (d === l) {
          s = !t.IsFixedLocation;
        }
        var o = t.GetGroupType();
        var h = t.GetCurrentRole();
        for (const c of r) {
          var _;
          var f;
          var m = c.CreatureDataId;
          if (!(m <= 0)) {
            f = c.RoleId;
            _ = c === h;
            f = SceneTeamItem_1.SceneTeamItem.Create(o, d, f, m);
            this.aPr.push(f);
            this.Jpo.add(d);
            e.push(m);
            if (f.IsMyRole()) {
              if (_) {
                n = f;
              }
            } else {
              f.SetRemoteIsControl(_);
            }
          }
        }
      }
    }
    if (this.GetTeamItems(true).length <= 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneTeam", 48, "刷新出战编队，当前玩家无角色实体");
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "刷新出战编队，等待加载开始");
      }
      this.Vpo = WaitEntityTask_1.WaitEntityTask.Create("SceneTeamModel.TeamGoBattle", e, e => {
        if (!e) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("SceneTeam", 48, "刷新出战编队，加载角色失败");
          }
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneTeam", 48, "刷新出战编队，等待加载结束");
        }
        this.RefreshLastTransform();
        this.Bvl(i);
        var e = n?.EntityHandle;
        var t = this.YBi?.EntityHandle;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBeforeUpdateSceneTeam, e, t);
        var r = e?.Entity;
        if (r?.Valid && r.Active && r.GetComponent(206)?.HasAnyTag([-1384309247, -1388400236])) {
          s = false;
        }
        if (n && n.CanControl()) {
          if (e && e.Id === t?.Id) {
            this.YBi = n;
          } else {
            if (n.GetGroupType() > 0) {
              ControllerHolder_1.ControllerHolder.SceneTeamController.SendSwitchRole(n);
            }
            this.ChangeRole(n.GetCreatureDataId(), {
              UseGoBattleSkill: a,
              AllowRefreshTransform: s
            });
          }
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("SceneTeam", 48, "刷新出战编队，当前角色不可上阵");
          }
          for (const o of this.aPr) {
            if (o.IsMyRole() && o.CanControl()) {
              ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(o.GetCreatureDataId(), {
                FilterSameRole: false
              });
              this.pHs();
              return;
            }
          }
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("SceneTeam", 48, "刷新出战编队，未找到存活角色");
          }
          if (n) {
            this.ChangeRole(n.GetCreatureDataId(), {
              ForceChangeRole: true,
              AllowRefreshTransform: true
            });
            n.EntityHandle?.Entity?.DisableByKey(1, true);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("SceneTeam", 48, "刷新出战编队，数据错误，当前玩家找不到可上阵角色", ["CurrentRole", this.$po.get(l)?.GetCurrentGroup()?.GetCurrentRole()]);
          }
        }
        this.pHs();
      }, -1);
    }
  }
  Bvl(e) {
    var t;
    if (this.YBi) {
      if ((t = this.YBi.EntityHandle?.Entity) && Global_1.Global.BaseCharacter?.IsValid()) {
        if (!e) {
          if (!this.GetTeamPlayerData(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.IsRoleOnStageWithoutControl(this.YBi.GetCreatureDataId())) {
            t.DisableByKey(1, true);
            t.GetComponent(94)?.SetTeamTag(2);
          }
          this.YBi = undefined;
        }
      } else {
        this.YBi = undefined;
      }
    }
  }
  pHs() {
    this.Vpo = undefined;
    this.IsTeamReady = true;
    this.LoadTeamPromise?.SetResult(true);
    this.LoadTeamPromise = undefined;
    this.ivo();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "刷新出战编队，结束");
    }
  }
  ivo() {
    var e = this.CurrentGroupType;
    if (e && !SceneTeamDefine_1.innerGroupType.includes(e)) {
      if (!ModelManager_1.ModelManager.GameModeModel.IsMulti && e === 1) {
        var t = this.zpo ?? [];
        var r = [];
        for (const a of this.GetTeamItems()) {
          r.push(a.GetConfigId);
        }
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          var o = t[e];
          var i = r[e];
          if (o !== i && (o && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotRoleChange, o), i)) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotRoleChange, i);
          }
        }
        this.zpo = r;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUpdateSceneTeam);
      if (GlobalData_1.GlobalData.GameInstance) {
        GlobalData_1.GlobalData.BpEventManager.当编队更新时.Broadcast();
      }
    }
  }
  OnAddEntity(e) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      e = e.Entity.GetComponent(0);
      if (e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
        var t;
        var r;
        var o = e.GetCreatureDataId();
        var i = ModelManager_1.ModelManager.CreatureModel;
        for (const a of this.GetTeamItems()) {
          if (o === a.GetCreatureDataId() && (t = i.GetEntity(o)?.Entity, r = i.GetScenePlayerData(a.GetPlayerId())?.IsRemoteSceneLoading(), t && r)) {
            t.DisableByKey(1, true);
          }
        }
        if (ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady) {
          for (const n of this.aPr) {
            if (n.GetCreatureDataId() === o) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("SceneTeam", 48, "更新联机场景队伍");
              }
              n.UpdateEntityHandle();
              this.ivo();
              break;
            }
          }
        }
      }
    }
  }
  OnRemoveEntity(e) {
    var t = e.Entity;
    var r = t.GetComponent(0).GetCreatureDataId();
    this.bhl.delete(r);
    if (e.Id === this.GetCurrentEntity?.Id) {
      this.LastEntityIsOnGround = t.GetComponent(102).PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
      if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        this.RefreshLastTransform();
      }
    }
  }
  AddPreloadEntity(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "添加预加载角色实体", ["CreatureDataId", e]);
    }
    this.bhl.add(e);
  }
  GetPreloadEntityData(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    for (const i of this.bhl) {
      var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(i);
      var o = r?.Entity;
      if (o?.Valid) {
        o = o.GetComponent(0);
        if (o && o.GetPlayerId() === t) {
          o = o.GetRoleId();
          if (this.Ghl(o, e)) {
            return [i, r];
          }
        }
      }
    }
  }
  Ghl(e, t) {
    if (e === t) {
      return true;
    }
    if (e > RoleDefine_1.ROBOT_DATA_MIN_ID && TrialRoleInfoById_1.configTrialRoleInfoById.GetConfig(e)?.GroupId === t) {
      return true;
    }
    return false;
  }
  get GetCurrentTeamItem() {
    return this.YBi;
  }
  get GetCurrentEntity() {
    return this.YBi?.EntityHandle;
  }
  get GetPhysMaterial() {
    return this.vwa;
  }
  GetTeamLength() {
    return this.aPr.length;
  }
  GetTeamPlayerSize() {
    return this.Jpo.size;
  }
  GetTeamItem(e, t) {
    for (const r of this.aPr) {
      if (this.ovo(r, e, t)) {
        return r;
      }
    }
  }
  ovo(e, t, r) {
    if (r.OnlyMyRole && !e.IsMyRole()) {
      return false;
    }
    if (r.IsControl && !e.IsControl()) {
      return false;
    }
    switch (r.ParamType) {
      case 0:
        return e.GetConfigId === t;
      case 1:
        return e.EntityHandle?.Id === t;
      case 2:
        return e.GetPlayerId() === t;
      case 3:
        return e.GetCreatureDataId() === t;
      default:
        return false;
    }
  }
  GetTeamItems(e = false) {
    var t = [];
    for (const r of this.aPr) {
      if (!e || !!r.IsMyRole()) {
        t.push(r);
      }
    }
    return t;
  }
  GetTeamItemsByPlayer(e) {
    var t = [];
    for (const r of this.aPr) {
      if (r.GetPlayerId() === e) {
        t.push(r);
      }
    }
    return t;
  }
  GetTeamRoleConfigIdList(e = false, t = false) {
    var r = [];
    for (const o of this.aPr) {
      if (!e || !!o.IsMyRole()) {
        r.push(t ? ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(o.GetConfigId) : o.GetConfigId);
      }
    }
    return r;
  }
  GetTeamEntities(e = false) {
    var t;
    var r = [];
    for (const o of this.aPr) {
      if (!e || !!o.IsMyRole()) {
        if (t = o.EntityHandle) {
          r.push(t);
        }
      }
    }
    return r;
  }
  GetAllGroupEntities(e) {
    var t = [];
    var e = this.$po.get(e);
    if (e) {
      var r = ModelManager_1.ModelManager.CreatureModel;
      for (const i of e.GetGroupList()) {
        for (const a of i.GetRoleList()) {
          var o = r.GetEntity(a.CreatureDataId);
          if (o?.IsInit) {
            t.push(o);
          }
        }
      }
    }
    return t;
  }
  GetTeamItemsInRange(e, t) {
    var r;
    var o = [];
    var i = t * t;
    for (const a of this.aPr) {
      if (a.EntityHandle?.Entity && (r = ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(a.GetPlayerId())?.GetLocation()) && Vector_1.Vector.DistSquared(e, r) <= i) {
        o.push(a);
      }
    }
    return o;
  }
  GetTeamPlayerData(e) {
    return this.$po.get(e);
  }
  ChangeRole(e, t = undefined) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "开始切换角色", ["CreatureDataId", e]);
    }
    var r;
    var o;
    var i;
    var a;
    var n;
    var s = this.GetTeamItem(e, {
      ParamType: 3
    });
    if (s && s.IsMyRole()) {
      if (!(t?.ForceChangeRole ?? false) && s.IsDead()) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SceneTeam", 48, "角色已经死亡", ["CreatureDataId", e]);
        }
      } else if (!s.IsAutoRole()) {
        r = this.GetCurrentTeamItem?.EntityHandle;
        if (o = s.EntityHandle) {
          i = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
          this.$po.get(i)?.GetCurrentGroup()?.SetCurrentRole(s.GetCreatureDataId());
          this.YBi = s;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBeforeChangeRole, o, r);
          i = t?.UseGoBattleSkill ?? false;
          s = t?.CoolDown ?? 0;
          a = t?.GoDownWaitSkillEnd ?? false;
          n = t?.AllowRefreshTransform ?? !o.Entity?.Active;
          t = t?.ForceInheritTransform ?? true;
          this.Xpo.Start();
          RoleTeamComponent_1.RoleTeamComponent.OnChangeRole(r, o, i, s, a, n, t);
          this.Xpo.Stop();
          if (r) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleGoDown, r.Id);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeRole, o, r);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SceneTeam", 48, "角色实体无效", ["CreatureDataId", e]);
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SceneTeam", 48, "队伍实例不存在或非本机角色", ["CreatureDataId", e]);
    }
  }
  OtherPlayerChangeRole(e, t) {
    this.$po.get(e)?.GetCurrentGroup()?.SetCurrentRole(t);
  }
  RefreshLastTransform() {
    var e = this.GetCurrentEntity;
    if (e?.Valid) {
      if ((e = ControllerHolder_1.ControllerHolder.CharacterController.GetActor(e))?.IsValid()) {
        e = e.D_GetTransform();
        this.Zpo = e;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneTeam", 48, "刷新继承位置信息成功", ["transform", e.ToString()]);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneTeam", 48, "刷新继承位置信息时，当前角色Actor已失效");
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneTeam", 48, "刷新继承位置信息时，当前角色实体已失效");
    }
  }
  SetLastTransform(e) {
    this.Zpo = e;
  }
  GetSpawnTransform() {
    var r = this.Zpo;
    if (r) {
      return r;
    }
    r = this.GetCurrentEntity;
    if (r?.Valid) {
      return r.Entity.GetComponent(3).Actor.D_GetTransform();
    }
    r = GlobalData_1.GlobalData.World;
    if (r) {
      let e = undefined;
      let t = undefined;
      var o = UiBlueprintFunctionLibrary_1.UiBlueprintFunctionLibrary.TestSceneLoadBornMode();
      if (o === 0) {
        e = UiBlueprintFunctionLibrary_1.UiBlueprintFunctionLibrary.TempLocation.ToUeVector();
        (t = UiBlueprintFunctionLibrary_1.UiBlueprintFunctionLibrary.TempRotator.ToUeRotator()).Roll = 0;
        t.Pitch = 0;
      } else if (o === 1) {
        o = (0, puerts_1.$ref)(undefined);
        UE.GameplayStatics.GetAllActorsOfClass(r, UE.PlayerStart.StaticClass(), o);
        r = (0, puerts_1.$unref)(o).Get(0).D_GetTransform();
        e = r.GetLocation();
        t = r.Rotator();
      }
      var o = UE.KismetMathLibrary.MakeTransformDouble(e, t, new UE.Vector(1, 1, 1));
      return o;
    }
  }
  GetChangeRoleCooldown() {
    return this.Wtc;
  }
  ResetChangeRoleCooldown() {
    this.Wtc = this.Qtc;
  }
  UpdateChangeRoleCooldown(e) {
    this.Wtc = e;
  }
  RoleDeathEnded(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "开始执行队伍角色死亡逻辑", ["EntityId", e]);
    }
    var e = this.GetTeamItem(e, {
      ParamType: 1
    });
    var t = e?.EntityHandle?.Entity;
    if (t) {
      var r = e.GetGroupType();
      var o = e.GetPlayerId();
      var o = this.$po.get(o)?.GetCurrentGroup();
      if (o && r === o.GetGroupType()) {
        if (o.GetLivingState() === 2 || e.IsAutoRole()) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneTeam", 48, "隐藏死亡角色");
          }
          t.DisableByKey(1, true);
        } else if (t.GetComponent(3)?.IsAutonomousProxy) {
          e = this.GetCurrentTeamItem;
          if (e) {
            if (e.IsDead()) {
              for (const a of this.GetTeamItems(true)) {
                if (a.CanControl()) {
                  var i = a.GetCreatureDataId();
                  if (Log_1.Log.CheckInfo()) {
                    Log_1.Log.Info("SceneTeam", 48, "前台角色死亡进行切人", ["CreatureDataId", i]);
                  }
                  ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(i, {
                    GoBattleInvincible: true
                  });
                  break;
                }
              }
            } else if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SceneTeam", 48, "当前角色未死亡");
            }
          } else if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SceneTeam", 48, "死亡时编队无当前角色");
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneTeam", 48, "非逻辑主控死亡不进行切人");
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "死亡角色非玩家当前编队", ["DeadGroupType", r], ["CurrentGroupType", o?.GetGroupType()]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "无法获取死亡角色Entity");
    }
  }
  IsAllDid() {
    for (const e of this.aPr) {
      if (!e.IsDead()) {
        return false;
      }
    }
    return true;
  }
  GetCurrentGroupLivingState(e) {
    e = this.$po.get(e)?.GetCurrentGroup();
    if (e) {
      return e.GetLivingState();
    } else {
      return 0;
    }
  }
  GetGroupLivingState(e, t) {
    e = this.$po.get(e)?.GetGroup(t);
    if (e) {
      return e.GetLivingState();
    } else {
      return 0;
    }
  }
  InitializeOfflineSceneTeam(e, t, r) {
    if (UE.Actor.GetKuroNetMode() !== 1) {
      var o = [ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(), ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(), ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId()];
      var i = 100003;
      var a = [e > 0 ? e : i, t > 0 ? t : i, r > 0 ? r : i];
      var n = this.GetSpawnTransform();
      if (n) {
        const f = [];
        var s = a.length;
        let t = s;
        for (let e = 1; e <= s; ++e) {
          var l = o[e - 1];
          const m = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
          var h = a[e - 1];
          var _ = Protocol_1.Aki.Protocol.c3s.create();
          _.s5n = MathUtils_1.MathUtils.NumberToLong(l);
          _.l8n = WorldGlobal_1.WorldGlobal.ToTsVector(n.GetLocation());
          _._8n = WorldGlobal_1.WorldGlobal.ToTsRotator(n.GetRotation().Rotator());
          _.rVn = true;
          _.W5n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
          _.zHn = Protocol_1.Aki.Protocol.kks.Proto_Player;
          _.ZHn = Protocol_1.Aki.Protocol.rLs.Proto_Character;
          _.v9n = a[e - 1];
          const d = ControllerHolder_1.ControllerHolder.CreatureController.CreateEntity(_, "InitializeOfflineSceneTeam");
          _ = new SceneTeamData_1.SceneTeamRole();
          _.CreatureDataId = l;
          _.RoleId = h;
          f.push(_);
          ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(d, e => {
            if (e && (t--, (e = d?.Entity) && (e.CheckGetComponent(94)?.SetTeamTag(2), e.DisableByKey(1, true)), t === 0)) {
              this.UpdateGroupData(m, {
                GroupType: 1,
                GroupRoleList: f,
                CurrentRoleId: f[0].RoleId
              });
              this.SwitchGroup(m, 1);
            }
          });
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneTeam", 48, "初始化失败队伍失败，GetSpawnTransform为空。");
      }
    }
  }
}
exports.SceneTeamModel = SceneTeamModel;
//# sourceMappingURL=SceneTeamModel.js.map