"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueBattleModel = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  RogueResDungeonConfigById_1 = require("../../../Core/Define/ConfigQuery/RogueResDungeonConfigById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  StateRef_1 = require("../../../Core/Utils/Audio/StateRef"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RoleRobotData_1 = require("../RoleUi/RoleData/RoleRobotData"),
  RoleDefine_1 = require("../RoleUi/RoleDefine"),
  RogueBattleRoleData_1 = require("./RogueBattleRoleData"),
  ROLELEVEL_EFFECTSHOW_TAG = 34,
  SKILLLEVEL_EFFECTSHOW_TAG = 33,
  WEAPONLEVEL_EFFECTSHOW_TAG = 32;
class RogueBattleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.TotalGainDataMap = new Map, this.GainDataMap = new Map, this.ElementMap = new Map, this.RoleFetterMap = new Map, this.BondAllRoleMap = new Map, this.FormationData = [], this.DescMode = 0, this.SelectGainData = void 0, this.CurrentBindId = 0, this.CurrentRoomTypeId = "", this.CurrentRoomId = 0, this.CurrentMapSummaryBond = 0, this.IsMapSummaryBondJumping = !1, this.MaxRoleStar = 0, this.SummaryRoleList = [], this.lec = new StateRef_1.StateRef("game_rogue_room_type", "none"), this.v5i = new Map
  }
  get CurrentRoomMusicState() {
    return this.lec.State
  }
  set CurrentRoomMusicState(t) {
    this.lec.State = t ?? "none"
  }
  ChangeDescMode() {
    this.DescMode = 0 === this.DescMode ? 1 : 0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueBattleDescModeChange)
  }
  GetOptionDataById(t) {
    return this.v5i.get(t)
  }
  SetOptionData(t, e) {
    this.v5i.set(t, e)
  }
  GetFormationDataByIndex(t) {
    return this.FormationData[t]
  }
  UpdateFormationData(t, e) {
    this.FormationData[t] = e
  }
  GetPhantomData() {
    if (this.TotalGainDataMap.has(Protocol_1.Aki.Protocol.hIc.hxs)) return Array.from(this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.hxs).values())[0] ?? void 0
  }
  GetTokenData() {
    return this.TotalGainDataMap.has(Protocol_1.Aki.Protocol.hIc.$9n) ? Array.from(this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.$9n).values()) : []
  }
  GetRoleInfoById(t) {
    var e = this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.RUs);
    if (e) return e.get(t)?.mIc;
    Log_1.Log.CheckError() && Log_1.Log.Error("RogueBattle", 34, "没有角色数据")
  }
  GetIncIdByRoleId(t) {
    if (this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.RUs))
      for (const e of this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.RUs))
        if (e[1].mIc?.Um1 === t) return e[0];
    return 0
  }
  GetRoleList() {
    var t = this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.RUs);
    if (!t) return Log_1.Log.CheckError() && Log_1.Log.Error("RogueBattle", 34, "没有角色数据"), [];
    var e = [];
    for (const o of t.values()) {
      let t = void 0;
      (t = new(o.mIc.Um1 > RoleDefine_1.ROBOT_DATA_MIN_ID ? RoleRobotData_1.RoleRobotData : RogueBattleRoleData_1.RogueBattleRoleData)(o.mIc.Um1)).GetLevelData().SetLevel(ModelManager_1.ModelManager.MapRogueModel.GetRogueRoleLevel()), t && e.push(t)
    }
    return e
  }
  IsRoleGot(t) {
    var e = this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.RUs);
    if (e) {
      for (const o of e.values())
        if (o.mIc.Um1 === t) return !0
    } else Log_1.Log.CheckError() && Log_1.Log.Error("RogueBattle", 34, "没有角色数据");
    return !1
  }
  GetRoleBondDataById(t) {
    return this.RoleFetterMap.has(t) ? this.RoleFetterMap.get(t) : {
      v9n: t,
      Whc: 0,
      Pm1: ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t)?.StarMap.get(1) ?? 0,
      F6n: 0
    }
  }
  GetAllOwnedRoleBondData() {
    return Array.from(this.RoleFetterMap.values())
  }
  UpdateOptionData(t) {
    for (const i of Object.keys(t.gIc)) {
      var e = Number.parseInt(i),
        o = t.gIc[i];
      this.SetOptionData(e, o)
    }
    for (const s of Object.keys(t.pIc)) {
      var r = Number.parseInt(s);
      this.v5i.delete(r)
    }
    for (const f of Object.keys(t.CIc)) {
      var n = Number.parseInt(f),
        a = t.CIc[f];
      this.SetOptionData(n, a)
    }
  }
  UpdateGainData(t) {
    for (const r of t.gIc) {
      let t = r.w5n;
      r.hIc === Protocol_1.Aki.Protocol.hIc.RUs && (t = r.mIc.Um1), this.GainDataMap.set(r.w5n, r), this.TotalGainDataMap.has(r.hIc) || this.TotalGainDataMap.set(r.hIc, new Map), this.TotalGainDataMap.get(r.hIc).set(t, r)
    }
    for (const n of t.CIc) {
      let t = n.w5n;
      n.hIc === Protocol_1.Aki.Protocol.hIc.RUs && (t = n.mIc.Um1), this.GainDataMap.set(n.w5n, n), this.TotalGainDataMap.has(n.hIc) || this.TotalGainDataMap.set(n.hIc, new Map), this.TotalGainDataMap.get(n.hIc).set(t, n)
    }
    for (const a of t.pIc) {
      var e, o = this.GainDataMap.get(a);
      o && (this.GainDataMap.delete(a), e = this.TotalGainDataMap.get(o.hIc)) && (o.hIc === Protocol_1.Aki.Protocol.hIc.RUs ? (o = o.mIc.Um1, e.delete(o)) : e.delete(a))
    }
  }
  UpdateElementData(t) {
    for (const e of t.ZVc) this.ElementMap.set(e.o5c, e)
  }
  UpdateFetterData(t) {
    for (const e of t.e11) this.RoleFetterMap.set(e.v9n, e)
  }
  InitOptionData(t) {
    for (const r of Object.keys(t.akc)) {
      var e = Number.parseInt(r),
        o = t.akc[r];
      this.SetOptionData(e, o)
    }
  }
  InitGainData(t) {
    this.RoleFetterMap.clear(), this.TotalGainDataMap.clear(), this.GainDataMap.clear(), this.RoleFetterMap.clear(), this.ElementMap.clear();
    for (const e of t.fIc) this.TotalGainDataMap.has(e.hIc) || this.TotalGainDataMap.set(e.hIc, new Map), e.hIc === Protocol_1.Aki.Protocol.hIc.RUs ? this.TotalGainDataMap.get(e.hIc).set(e.mIc.Um1, e) : this.TotalGainDataMap.get(e.hIc).set(e.w5n, e), this.GainDataMap.set(e.w5n, e);
    this.ElementMap.set(1, {
      o5c: 1,
      m9n: 0
    }), this.ElementMap.set(2, {
      o5c: 2,
      m9n: 0
    }), this.ElementMap.set(3, {
      o5c: 3,
      m9n: 0
    }), this.ElementMap.set(4, {
      o5c: 4,
      m9n: 0
    });
    for (const o of t.ZVc) this.ElementMap.set(o.o5c, o);
    t.e11.forEach(t => {
      this.RoleFetterMap.set(t.v9n, t)
    })
  }
  InitFormationData(t) {
    this.FormationData = t
  }
  OnClear() {
    return this.v5i.clear(), this.TotalGainDataMap.clear(), this.GainDataMap.clear(), this.ElementMap.clear(), this.SelectGainData = void 0, this.CurrentBindId = 0, this.CurrentRoomTypeId = "", this.CurrentRoomId = 0, this.CurrentRoomMusicState = "none", !0
  }
  GetTotalElementInfo(t = []) {
    var e, o = new Map;
    for (const n of t) {
      var r = {
        ElementId: n.o5c,
        Count: n.m9n,
        IsPreview: !0
      };
      o.set(n.o5c, r)
    }
    for (const a of this.ElementMap.values()) o.has(a.o5c) ? o.get(a.o5c).Count += a.m9n : (e = {
      ElementId: a.o5c,
      Count: a.m9n,
      IsPreview: !1
    }, o.set(a.o5c, e));
    return Array.from(o.values()).sort((t, e) => t.ElementId - e.ElementId)
  }
  GetTotalElementCount() {
    let t = 0;
    for (const e of this.ElementMap.values()) t += e.m9n;
    return t
  }
  GetElementInfoById(t) {
    t = this.ElementMap.get(t);
    if (t) return {
      ElementId: t.o5c,
      Count: t.m9n,
      IsPreview: !1
    }
  }
  CheckPhantomAffixCanUnlock(t) {
    let e = !0;
    for (const o of t.ZVc)
      if (this.ElementMap.get(o.o5c).m9n < o.m9n) {
        e = !1;
        break
      } return e
  }
  GetCurrentSeasonId() {
    var t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    return 0 === t ? 0 : (t = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(t)) ? t.SeasonId : ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId()
  }
  GetRoleListByBond(t) {
    if (0 === this.BondAllRoleMap.size)
      for (const f of ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResBondRole())
        for (const h of f.BondIds) this.BondAllRoleMap.get(h) || this.BondAllRoleMap.set(h, []), this.BondAllRoleMap.get(h).push(f.RoleId);
    t = this.BondAllRoleMap.get(t);
    if (!t) return [];
    var e = new Array,
      o = new Array,
      r = this.GetCurrentSeasonId(),
      n = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailRole(r, 0),
      a = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailRole(r, 1);
    for (const _ of t)
      if (this.IsRoleGot(_)) {
        var i = {
          IsGain: !0,
          ConfigId: _,
          NeedLevel: !1
        };
        e.push(i)
      } else if (!ModelManager_1.ModelManager.RoleModel.IsMainRole(_)) {
      i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(_);
      if (this.IsRoleGot(i.TrialRoleId)) {
        var s = {
          IsGain: !0,
          ConfigId: i.TrialRoleId,
          NeedLevel: !1
        };
        e.push(s)
      } else {
        let t = 0;
        s = {
          IsGain: !1,
          ConfigId: t = n.includes(i.TrialRoleId) || a.includes(i.TrialRoleId) ? i.TrialRoleId : _,
          NeedLevel: !1
        };
        o.push(s)
      }
    }
    return e.sort((t, e) => {
      var o = this.GetRoleInfoById(t.ConfigId),
        r = this.GetRoleIsRogueTrial(t.ConfigId),
        n = this.GetRoleInfoById(e.ConfigId),
        a = this.GetRoleIsRogueTrial(e.ConfigId);
      return o.F6n === n.F6n ? r === a ? t.ConfigId - e.ConfigId : r ? -1 : 1 : n.F6n - o.F6n
    }), o.sort((t, e) => {
      var o = this.GetRoleIsRogueTrial(t.ConfigId),
        r = this.GetRoleCantGet(t.ConfigId),
        n = this.GetRoleIsRogueTrial(e.ConfigId),
        a = this.GetRoleCantGet(e.ConfigId);
      return o !== n ? o ? -1 : 1 : r !== a ? r ? 1 : -1 : t.ConfigId - e.ConfigId
    }), [...e, ...o]
  }
  GetRoleCantGet(t) {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    return !ConfigManager_1.ConfigManager.RoleConfig.IsTrialRole(t) && !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Id)
  }
  GetRoleIsRogueTrial(t) {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    return ConfigManager_1.ConfigManager.RoleConfig.IsTrialRole(t) && !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Id)
  }
  GetEffectList() {
    var t = new Map,
      e = (this.wO1(t), this.AO1(t), this.PO1(t), []);
    for (const o of t) e.push(o[1]);
    return e
  }
  AO1(t) {
    var e = ModelManager_1.ModelManager.MapRogueModel.GameInfo.TeamLv;
    for (const s of ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResTeamLvRule()) {
      if (2 === s.LevelRange.length && 0 < s.RangeEffects.length && e >= s.LevelRange[0])
        for (const f of s.RangeEffects) {
          var o, r, n = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectById(f);
          n && (o = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResEffectTagById(n.Tag), r = e >= s.LevelRange[1] ? s.LevelRange[1] - s.LevelRange[0] + 1 : e - s.LevelRange[0] + 1, t.get(o.Text) ? t.get(o.Text).Count += r * n.DescIntParam : (r = {
            TagKey: o.Text,
            Count: r * n.DescIntParam,
            IsRatio: o.IsRatio,
            Icon: o.Icon
          }, t.set(o.Text, r)))
        }
      if (0 !== s.TargetLevel && e >= s.TargetLevel && 0 < s.TargetEffects.length)
        for (const h of s.TargetEffects) {
          var a, i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectById(h);
          i && (a = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResEffectTagById(i.Tag), t.get(a.Text) ? t.get(a.Text).Count += i.DescIntParam : (i = {
            TagKey: a.Text,
            Count: i.DescIntParam,
            IsRatio: a.IsRatio,
            Icon: a.Icon
          }, t.set(a.Text, i)))
        }
    }
  }
  wO1(t) {
    var e, o = ModelManager_1.ModelManager.MapRogueModel.GameInfo.TeamLv,
      r = ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResTeamLvRule(),
      n = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectTagById(ROLELEVEL_EFFECTSHOW_TAG),
      a = {
        TagKey: n.Text,
        Count: 0,
        IsRatio: !1,
        Icon: n.Icon
      },
      i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectTagById(WEAPONLEVEL_EFFECTSHOW_TAG),
      s = {
        TagKey: i.Text,
        Count: 0,
        IsRatio: !1,
        Icon: i.Icon
      };
    for (const _ of r) 2 === _.LevelRange.length && 0 < _.RoleLevel && o >= _.LevelRange[0] && (e = o >= _.LevelRange[1] ? _.LevelRange[1] - _.LevelRange[0] + 1 : o - _.LevelRange[0] + 1, a.Count += e * _.RoleLevel);
    s.Count = a.Count;
    var f = [...ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResSkillLvRule()],
      r = (f.sort((t, e) => t.Level - e.Level), ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectTagById(SKILLLEVEL_EFFECTSHOW_TAG)),
      h = {
        TagKey: r.Text,
        Count: 0,
        IsRatio: !1,
        Icon: r.Icon
      };
    for (let t = f.length - 1; 0 <= t; t--)
      if (o >= f[t].Level) {
        h.Count = f[t].SkillLevel.get(1) ?? 0;
        break
      } t.set(n.Text, a), t.set(i.Text, s), t.set(r.Text, h)
  }
  PO1(t) {
    for (const n of this.GetAllOwnedRoleBondData())
      if (0 !== n.F6n) {
        var e, o, r = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(n.v9n);
        if (r && 0 !== r.ExploreEffect.size)
          for (const a of r.ExploreEffect) n.F6n < a[0] || (o = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectById(a[1]), e = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResEffectTagById(o.Tag), t.get(e.Text) ? t.get(e.Text).Count += o.DescIntParam : (o = {
            TagKey: e.Text,
            Count: o.DescIntParam,
            IsRatio: e.IsRatio,
            Icon: e.Icon
          }, t.set(e.Text, o)))
      }
  }
  ClearData() {
    this.TotalGainDataMap.clear(), this.BondAllRoleMap.clear(), this.GainDataMap.clear(), this.ElementMap.clear(), this.RoleFetterMap.clear(), this.FormationData = []
  }
}
exports.RogueBattleModel = RogueBattleModel;
//# sourceMappingURL=RogueBattleModel.js.map