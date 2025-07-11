"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const RogueResDungeonConfigById_1 = require("../../../Core/Define/ConfigQuery/RogueResDungeonConfigById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const StateRef_1 = require("../../../Core/Utils/Audio/StateRef");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const RoleRobotData_1 = require("../RoleUi/RoleData/RoleRobotData");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
const RogueBattleRoleData_1 = require("./RogueBattleRoleData");
const ROLELEVEL_EFFECTSHOW_TAG = 34;
const SKILLLEVEL_EFFECTSHOW_TAG = 33;
const WEAPONLEVEL_EFFECTSHOW_TAG = 32;
class RogueBattleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.TotalGainDataMap = new Map();
    this.GainDataMap = new Map();
    this.ElementMap = new Map();
    this.RoleFetterMap = new Map();
    this.BondAllRoleMap = new Map();
    this.FormationData = [];
    this.DescMode = 0;
    this.SelectGainData = undefined;
    this.CurrentBindId = 0;
    this.CurrentRoomTypeId = "";
    this.CurrentRoomId = 0;
    this.CurrentMapSummaryBond = 0;
    this.IsMapSummaryBondJumping = false;
    this.MaxRoleStar = 0;
    this.SummaryRoleList = [];
    this.lec = new StateRef_1.StateRef("game_rogue_room_type", "none");
    this.v5i = new Map();
  }
  get CurrentRoomMusicState() {
    return this.lec.State;
  }
  set CurrentRoomMusicState(t) {
    this.lec.State = t ?? "none";
  }
  ChangeDescMode() {
    this.DescMode = this.DescMode === 0 ? 1 : 0;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueBattleDescModeChange);
  }
  GetOptionDataById(t) {
    return this.v5i.get(t);
  }
  SetOptionData(t, e) {
    this.v5i.set(t, e);
  }
  GetFormationDataByIndex(t) {
    return this.FormationData[t];
  }
  UpdateFormationData(t, e) {
    this.FormationData[t] = e;
  }
  GetPhantomData() {
    if (this.TotalGainDataMap.has(Protocol_1.Aki.Protocol.hIc.hxs)) {
      return Array.from(this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.hxs).values())[0] ?? undefined;
    }
  }
  GetTokenData() {
    if (this.TotalGainDataMap.has(Protocol_1.Aki.Protocol.hIc.$9n)) {
      return Array.from(this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.$9n).values());
    } else {
      return [];
    }
  }
  GetRoleInfoById(t) {
    var e = this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.RUs);
    if (e) {
      return e.get(t)?.mIc;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RogueBattle", 34, "没有角色数据");
    }
  }
  GetIncIdByRoleId(t) {
    if (this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.RUs)) {
      for (const e of this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.RUs)) {
        if (e[1].mIc?.if1 === t) {
          return e[0];
        }
      }
    }
    return 0;
  }
  GetRoleList() {
    var t = this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.RUs);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RogueBattle", 34, "没有角色数据");
      }
      return [];
    }
    var e = [];
    for (const o of t.values()) {
      let t = undefined;
      (t = new (o.mIc.if1 > RoleDefine_1.ROBOT_DATA_MIN_ID ? RoleRobotData_1.RoleRobotData : RogueBattleRoleData_1.RogueBattleRoleData)(o.mIc.if1)).GetLevelData().SetLevel(ModelManager_1.ModelManager.MapRogueModel.GetRogueRoleLevel());
      if (t) {
        e.push(t);
      }
    }
    return e;
  }
  IsRoleGot(t) {
    var e = this.TotalGainDataMap.get(Protocol_1.Aki.Protocol.hIc.RUs);
    if (e) {
      for (const o of e.values()) {
        if (o.mIc.if1 === t) {
          return true;
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RogueBattle", 34, "没有角色数据");
    }
    return false;
  }
  GetRoleBondDataById(t) {
    if (this.RoleFetterMap.has(t)) {
      return this.RoleFetterMap.get(t);
    } else {
      return {
        v9n: t,
        Whc: 0,
        ef1: ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t)?.StarMap.get(1) ?? 0,
        F6n: 0
      };
    }
  }
  GetRoleBondPreviewDataById(t, e = 0, o, r) {
    var n = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t);
    var a = this.RoleFetterMap.get(t);
    let i = 0;
    let s = 0;
    let f = 0;
    for (f = o !== undefined && r !== undefined ? (i = o, s = r + e, n.StarMap.get(Math.min(i + 1, this.MaxRoleStar))) : a ? (i = a.F6n, s = a.Whc + e, a.ef1) : (s = e, n.StarMap.get(1)); s >= f && (i = Math.min(i + 1, this.MaxRoleStar), f = n.StarMap.get(Math.min(i + 1, this.MaxRoleStar)), i !== this.MaxRoleStar););
    return {
      v9n: t,
      Whc: s,
      ef1: f,
      F6n: i
    };
  }
  GetBondRoleCount(t) {
    let e = 0;
    for (const o of ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResBondRole()) {
      if (o.BondIds.includes(t) && (this.IsRoleGot(o.RoleId) || this.IsRoleGot(o.TrialRoleId))) {
        e++;
      }
    }
    return e;
  }
  GetLinkIdByRoleList(t) {
    var e = new Map();
    var o = new Set();
    for (const s of t) {
      for (const f of ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(s.GetRoleId()).BondIds) {
        o.add(f);
        var r = e.get(f) ?? 0;
        e.set(f, r + 1);
      }
    }
    for (const h of o) {
      var n = this.GetRoleBondDataById(h);
      var a = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(h);
      var i = a.LinkRule[0];
      if (!(n.F6n < i)) {
        if (e.get(h) === a.ActLinkNum) {
          return h;
        }
      }
    }
    return 0;
  }
  IsBondLinkCanActivate(t) {
    var e = this.GetRoleBondDataById(t);
    var o = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t);
    return !!e && !!o && !(this.GetBondRoleCount(t) < o.ActLinkNum) && (t = o.LinkRule[0], e.F6n >= t);
  }
  IsAnyBondLinkCanActivate() {
    for (const t of this.GetAllOwnedRoleBondData()) {
      if (this.IsBondLinkCanActivate(t.v9n)) {
        return true;
      }
    }
    return false;
  }
  GetAllOwnedRoleBondData() {
    return Array.from(this.RoleFetterMap.values());
  }
  UpdateOptionData(t) {
    for (const i of Object.keys(t.gIc)) {
      var e = Number.parseInt(i);
      var o = t.gIc[i];
      this.SetOptionData(e, o);
    }
    for (const s of Object.keys(t.pIc)) {
      var r = Number.parseInt(s);
      this.v5i.delete(r);
    }
    for (const f of Object.keys(t.CIc)) {
      var n = Number.parseInt(f);
      var a = t.CIc[f];
      this.SetOptionData(n, a);
    }
  }
  UpdateGainData(t) {
    for (const r of t.gIc) {
      let t = r.w5n;
      if (r.hIc === Protocol_1.Aki.Protocol.hIc.RUs) {
        t = r.mIc.if1;
        this.SetRogueResNewRoleFlag(true);
      }
      this.GainDataMap.set(r.w5n, r);
      if (!this.TotalGainDataMap.has(r.hIc)) {
        this.TotalGainDataMap.set(r.hIc, new Map());
      }
      this.TotalGainDataMap.get(r.hIc).set(t, r);
    }
    for (const n of t.CIc) {
      let t = n.w5n;
      if (n.hIc === Protocol_1.Aki.Protocol.hIc.RUs) {
        t = n.mIc.if1;
      }
      this.GainDataMap.set(n.w5n, n);
      if (!this.TotalGainDataMap.has(n.hIc)) {
        this.TotalGainDataMap.set(n.hIc, new Map());
      }
      this.TotalGainDataMap.get(n.hIc).set(t, n);
    }
    for (const a of t.pIc) {
      var e;
      var o = this.GainDataMap.get(a);
      if (o && (this.GainDataMap.delete(a), e = this.TotalGainDataMap.get(o.hIc))) {
        if (o.hIc === Protocol_1.Aki.Protocol.hIc.RUs) {
          o = o.mIc.if1;
          e.delete(o);
        } else {
          e.delete(a);
        }
      }
    }
  }
  UpdateElementData(t) {
    for (const e of t.ZVc) {
      this.ElementMap.set(e.o5c, e);
    }
  }
  UpdateFetterData(t) {
    for (const e of t.ql1) {
      this.RoleFetterMap.set(e.v9n, e);
    }
  }
  InitOptionData(t) {
    for (const r of Object.keys(t.akc)) {
      var e = Number.parseInt(r);
      var o = t.akc[r];
      this.SetOptionData(e, o);
    }
  }
  InitGainData(t) {
    this.RoleFetterMap.clear();
    this.TotalGainDataMap.clear();
    this.GainDataMap.clear();
    this.RoleFetterMap.clear();
    this.ElementMap.clear();
    for (const e of t.fIc) {
      if (!this.TotalGainDataMap.has(e.hIc)) {
        this.TotalGainDataMap.set(e.hIc, new Map());
      }
      if (e.hIc === Protocol_1.Aki.Protocol.hIc.RUs) {
        this.TotalGainDataMap.get(e.hIc).set(e.mIc.if1, e);
      } else {
        this.TotalGainDataMap.get(e.hIc).set(e.w5n, e);
      }
      this.GainDataMap.set(e.w5n, e);
    }
    this.ElementMap.set(1, {
      o5c: 1,
      m9n: 0
    });
    this.ElementMap.set(2, {
      o5c: 2,
      m9n: 0
    });
    this.ElementMap.set(3, {
      o5c: 3,
      m9n: 0
    });
    this.ElementMap.set(4, {
      o5c: 4,
      m9n: 0
    });
    for (const o of t.ZVc) {
      this.ElementMap.set(o.o5c, o);
    }
    t.ql1.forEach(t => {
      this.RoleFetterMap.set(t.v9n, t);
    });
  }
  InitFormationData(t) {
    this.FormationData = t;
  }
  OnClear() {
    this.v5i.clear();
    this.TotalGainDataMap.clear();
    this.GainDataMap.clear();
    this.ElementMap.clear();
    this.SelectGainData = undefined;
    this.CurrentBindId = 0;
    this.CurrentRoomTypeId = "";
    this.CurrentRoomId = 0;
    this.CurrentRoomMusicState = "none";
    return true;
  }
  GetTotalElementInfo(t = []) {
    var e;
    var o = new Map();
    for (const n of t) {
      var r = {
        ElementId: n.o5c,
        Count: n.m9n,
        IsPreview: true
      };
      o.set(n.o5c, r);
    }
    for (const a of this.ElementMap.values()) {
      if (o.has(a.o5c)) {
        o.get(a.o5c).Count += a.m9n;
      } else {
        e = {
          ElementId: a.o5c,
          Count: a.m9n,
          IsPreview: false
        };
        o.set(a.o5c, e);
      }
    }
    return Array.from(o.values()).sort((t, e) => t.ElementId - e.ElementId);
  }
  GetTotalElementCount() {
    let t = 0;
    for (const e of this.ElementMap.values()) {
      t += e.m9n;
    }
    return t;
  }
  GetElementInfoById(t) {
    t = this.ElementMap.get(t);
    if (t) {
      return {
        ElementId: t.o5c,
        Count: t.m9n,
        IsPreview: false
      };
    }
  }
  CheckPhantomAffixCanUnlock(t) {
    let e = true;
    for (const o of t.ZVc) {
      if (this.ElementMap.get(o.o5c).m9n < o.m9n) {
        e = false;
        break;
      }
    }
    return e;
  }
  GetCurrentSeasonId() {
    var t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    if (t === 0) {
      return 0;
    } else if (t = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(t)) {
      return t.SeasonId;
    } else {
      return ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId();
    }
  }
  GetRoleListByBond(t) {
    if (this.BondAllRoleMap.size === 0) {
      for (const f of ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResBondRole()) {
        for (const h of f.BondIds) {
          if (!this.BondAllRoleMap.get(h)) {
            this.BondAllRoleMap.set(h, []);
          }
          this.BondAllRoleMap.get(h).push(f.RoleId);
        }
      }
    }
    t = this.BondAllRoleMap.get(t);
    if (!t) {
      return [];
    }
    var e = new Array();
    var o = new Array();
    var r = this.GetCurrentSeasonId();
    var n = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailRole(r, 0);
    var a = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailRole(r, 1);
    for (const g of t) {
      if (this.IsRoleGot(g)) {
        var i = {
          IsGain: true,
          ConfigId: g,
          NeedLevel: false
        };
        e.push(i);
      } else if (!ModelManager_1.ModelManager.RoleModel.IsMainRole(g)) {
        i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(g);
        if (this.IsRoleGot(i.TrialRoleId)) {
          var s = {
            IsGain: true,
            ConfigId: i.TrialRoleId,
            NeedLevel: false
          };
          e.push(s);
        } else {
          let t = 0;
          s = {
            IsGain: false,
            ConfigId: t = n.includes(i.TrialRoleId) || a.includes(i.TrialRoleId) ? i.TrialRoleId : g,
            NeedLevel: false
          };
          o.push(s);
        }
      }
    }
    e.sort((t, e) => {
      var o = this.GetRoleInfoById(t.ConfigId);
      var r = this.GetRoleIsRogueTrial(t.ConfigId);
      var n = this.GetRoleInfoById(e.ConfigId);
      var a = this.GetRoleIsRogueTrial(e.ConfigId);
      if (o.F6n === n.F6n) {
        if (r === a) {
          return t.ConfigId - e.ConfigId;
        } else if (r) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return n.F6n - o.F6n;
      }
    });
    o.sort((t, e) => {
      var o = this.GetRoleIsRogueTrial(t.ConfigId);
      var r = this.GetRoleCantGet(t.ConfigId);
      var n = this.GetRoleIsRogueTrial(e.ConfigId);
      var a = this.GetRoleCantGet(e.ConfigId);
      if (o !== n) {
        if (o) {
          return -1;
        } else {
          return 1;
        }
      } else if (r !== a) {
        if (r) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return t.ConfigId - e.ConfigId;
      }
    });
    return [...e, ...o];
  }
  GetRoleCantGet(t) {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    return !ConfigManager_1.ConfigManager.RoleConfig.IsTrialRole(t) && !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Id);
  }
  GetRoleIsRogueTrial(t) {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    return ConfigManager_1.ConfigManager.RoleConfig.IsTrialRole(t) && !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Id);
  }
  GetEffectList() {
    var t = new Map();
    this.sq1(t);
    this.aq1(t);
    this.hq1(t);
    var e = [];
    for (const o of t) {
      e.push(o[1]);
    }
    return e;
  }
  aq1(t) {
    var e = ModelManager_1.ModelManager.MapRogueModel.GameInfo.TeamLv;
    for (const s of ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResTeamLvRule()) {
      if (s.LevelRange.length === 2 && s.RangeEffects.length > 0 && e >= s.LevelRange[0]) {
        for (const f of s.RangeEffects) {
          var o;
          var r;
          var n = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectById(f);
          if (n) {
            o = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResEffectTagById(n.Tag);
            r = e >= s.LevelRange[1] ? s.LevelRange[1] - s.LevelRange[0] + 1 : e - s.LevelRange[0] + 1;
            if (t.get(o.Text)) {
              t.get(o.Text).Count += r * n.DescIntParam;
            } else {
              r = {
                TagKey: o.Text,
                Count: r * n.DescIntParam,
                IsRatio: o.IsRatio,
                Icon: o.Icon
              };
              t.set(o.Text, r);
            }
          }
        }
      }
      if (s.TargetLevel !== 0 && e >= s.TargetLevel && s.TargetEffects.length > 0) {
        for (const h of s.TargetEffects) {
          var a;
          var i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectById(h);
          if (i) {
            a = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResEffectTagById(i.Tag);
            if (t.get(a.Text)) {
              t.get(a.Text).Count += i.DescIntParam;
            } else {
              i = {
                TagKey: a.Text,
                Count: i.DescIntParam,
                IsRatio: a.IsRatio,
                Icon: a.Icon
              };
              t.set(a.Text, i);
            }
          }
        }
      }
    }
  }
  sq1(t) {
    var e;
    var o = ModelManager_1.ModelManager.MapRogueModel.GameInfo.TeamLv;
    var r = ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResTeamLvRule();
    var n = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectTagById(ROLELEVEL_EFFECTSHOW_TAG);
    var a = {
      TagKey: n.Text,
      Count: 0,
      IsRatio: false,
      Icon: n.Icon
    };
    var i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectTagById(WEAPONLEVEL_EFFECTSHOW_TAG);
    var s = {
      TagKey: i.Text,
      Count: 0,
      IsRatio: false,
      Icon: i.Icon
    };
    for (const g of r) {
      if (g.LevelRange.length === 2 && g.RoleLevel > 0 && o >= g.LevelRange[0]) {
        e = o >= g.LevelRange[1] ? g.LevelRange[1] - g.LevelRange[0] + 1 : o - g.LevelRange[0] + 1;
        a.Count += e * g.RoleLevel;
      }
    }
    s.Count = a.Count;
    var f = [...ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResSkillLvRule()];
    f.sort((t, e) => t.Level - e.Level);
    var r = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectTagById(SKILLLEVEL_EFFECTSHOW_TAG);
    var h = {
      TagKey: r.Text,
      Count: 0,
      IsRatio: false,
      Icon: r.Icon
    };
    for (let t = f.length - 1; t >= 0; t--) {
      if (o >= f[t].Level) {
        h.Count = f[t].SkillLevel.get(1) ?? 0;
        break;
      }
    }
    t.set(n.Text, a);
    t.set(i.Text, s);
    t.set(r.Text, h);
  }
  hq1(t) {
    for (const n of this.GetAllOwnedRoleBondData()) {
      if (n.F6n !== 0) {
        var e;
        var o;
        var r = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(n.v9n);
        if (r && r.ExploreEffect.size !== 0) {
          for (const a of r.ExploreEffect) {
            if (!(n.F6n < a[0])) {
              o = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResEffectById(a[1]);
              e = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResEffectTagById(o.Tag);
              if (t.get(e.Text)) {
                t.get(e.Text).Count += o.DescIntParam;
              } else {
                o = {
                  TagKey: e.Text,
                  Count: o.DescIntParam,
                  IsRatio: e.IsRatio,
                  Icon: e.Icon
                };
                t.set(e.Text, o);
              }
            }
          }
        }
      }
    }
  }
  GetRogueResNewRoleFlag() {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResNewRoleFlag, false);
    return t !== undefined && t;
  }
  SetRogueResNewRoleFlag(t) {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResNewRoleFlag, false);
    if (e === undefined || e !== t) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RogueResNewRoleFlag, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResNewRoleFlagChange);
    }
  }
  ClearData() {
    this.TotalGainDataMap.clear();
    this.BondAllRoleMap.clear();
    this.GainDataMap.clear();
    this.ElementMap.clear();
    this.RoleFetterMap.clear();
    this.FormationData = [];
  }
}
exports.RogueBattleModel = RogueBattleModel;
//# sourceMappingURL=RogueBattleModel.js.map