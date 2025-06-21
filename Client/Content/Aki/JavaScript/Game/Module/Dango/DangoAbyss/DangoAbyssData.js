"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssRankRoleData = exports.AbyssDangoOwnerData = exports.AbyssChallengePassRoleInfo = exports.AbyssChallengePassPlayerInfo = exports.AbyssChallengeInfo = exports.AbyssRankChallengeInfo = exports.AbyssFormationRoleSelectDetailInfo = exports.AbyssFormationRoleSelectInfo = exports.AbyssFormationInfo = exports.AbyssChallengeRoleHonor = exports.AbyssChallengeResultRoleInfo = exports.AbyssChallengeResultPlayerInfo = exports.AbyssChallengeResultData = exports.DangoAbyssInsSelectViewData = void 0;
const ModelManager_1 = require("../../../Manager/ModelManager"),
  DangoAbyssDefine_1 = require("./DangoAbyssDefine"),
  FIRST_RANKBG = "T_AnniversaryCelebrationRankBg_1",
  SECOND_RANKBG = "T_AnniversaryCelebrationRankBg_2",
  THIRD_RANKBG = "T_AnniversaryCelebrationRankBg_3",
  OTHER_RANKBG = "T_AnniversaryCelebrationRankBgOther",
  MAX_COUNT = 3;
class DangoAbyssInsSelectViewData {
  constructor() {
    this.AbyssDataList = [], this.ActivityData = void 0, this.FromSettlement = !1
  }
}
exports.DangoAbyssInsSelectViewData = DangoAbyssInsSelectViewData;
class AbyssChallengeResultData {
  constructor() {
    this.f$a = 0, this.Kvc = 0, this.Xvc = !1, this.Yvc = []
  }
  GetPassTime() {
    return this.f$a
  }
  GetMinPassTime() {
    return this.Kvc
  }
  GetIfSuccess() {
    return this.Xvc
  }
  GetPlayerInfoList() {
    return this.Yvc
  }
  GetPlayerInfoByPlayerId(s) {
    return this.Yvc.find(t => t.GetPlayerId() === s)
  }
  Phrase(s) {
    if (s) {
      this.f$a = s.Qxs, this.Kvc = s.JM_, this.Xvc = s.KRs, this.Yvc = [];
      var e = s.TRs.length;
      for (let t = 0; t < e; t++) {
        var i = new AbyssChallengeResultPlayerInfo;
        i.Phrase(s.TRs[t]), this.Yvc.push(i)
      }
    }
  }
}
exports.AbyssChallengeResultData = AbyssChallengeResultData;
class AbyssChallengeResultPlayerInfo {
  constructor() {
    this.j8 = 0, this.zvc = 0, this.TSn = []
  }
  GetPlayerId() {
    return this.j8
  }
  GetLikeCount() {
    return this.zvc
  }
  GetRoleInfo() {
    return this.TSn
  }
  SetLikeCount(t) {
    this.zvc = t
  }
  Phrase(s) {
    this.j8 = s.W5n, this.zvc = s.V0c, this.TSn = [];
    var e = s.dUs.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssChallengeResultRoleInfo;
      i.Phrase(s.dUs[t]), this.TSn.push(i)
    }
  }
}
exports.AbyssChallengeResultPlayerInfo = AbyssChallengeResultPlayerInfo;
class AbyssChallengeResultRoleInfo {
  constructor() {
    this.Jvc = 0, this.Zvc = 0, this.eyc = 0, this.tyc = void 0, this.iyc = []
  }
  GetRoleSkinId() {
    return this.Jvc
  }
  GetRoleLevel() {
    return this.Zvc
  }
  GetDangoId() {
    return this.eyc
  }
  GetMainHonor() {
    return this.tyc
  }
  GetSubHonor() {
    return this.iyc
  }
  Phrase(s) {
    this.Jvc = s.eI_, this.Zvc = s.Ebs, this.eyc = s.Q0c, this.tyc = new AbyssChallengeRoleHonor, this.tyc.Phrase(s.K0c), this.iyc = [];
    var e = s.X0c.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssChallengeRoleHonor;
      i.Phrase(s.X0c[t]), this.iyc.push(i)
    }
  }
}
exports.AbyssChallengeResultRoleInfo = AbyssChallengeResultRoleInfo;
class AbyssChallengeRoleHonor {
  constructor() {
    this.E9 = 0, this.Xe = 0
  }
  GetType() {
    return this.E9
  }
  GetValue() {
    return this.Xe
  }
  Phrase(t) {
    t && (this.E9 = t.h5n, this.Xe = t.e5n)
  }
}
exports.AbyssChallengeRoleHonor = AbyssChallengeRoleHonor;
class AbyssFormationInfo {
  constructor() {
    this.ryc = []
  }
  Phrase(s) {
    this.ryc = [];
    var e = s.TRs.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssFormationRoleSelectInfo;
      i.Phrase(s.TRs[t]), this.ryc.push(i)
    }
  }
}
exports.AbyssFormationInfo = AbyssFormationInfo;
class AbyssFormationRoleSelectInfo {
  constructor() {
    this.j8 = 0, this.oyc = []
  }
  GetPlayerId() {
    return this.j8
  }
  GetRoleSelectDetailInfoList() {
    return this.oyc
  }
  Phrase(s) {
    this.j8 = s.W5n, this.oyc = [];
    var e = s.dUs.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssFormationRoleSelectDetailInfo;
      i.Phrase(s.dUs[t]), this.oyc.push(i)
    }
  }
}
exports.AbyssFormationRoleSelectInfo = AbyssFormationRoleSelectInfo;
class AbyssFormationRoleSelectDetailInfo {
  constructor() {
    this.dFe = 0, this.eyc = 0, this.nyc = []
  }
  GetRoleId() {
    return this.dFe
  }
  GetDangoId() {
    return this.eyc
  }
  GetPluginItemList() {
    return this.nyc
  }
  Phrase(t) {
    this.dFe = t.Q6n, this.eyc = t.Q0c, this.nyc = t.ipc
  }
}
exports.AbyssFormationRoleSelectDetailInfo = AbyssFormationRoleSelectDetailInfo;
class AbyssRankChallengeInfo {
  constructor() {
    this.tt1 = new Map, this.Vnc = new Map, this.Hnc = new Map, this.Fnc = new Map, this.$nc = new Map, this.Nnc = [], this.jnc = [], this.syc = [], this.ayc = [], this.Wnc = void 0, this.Qnc = void 0, this.alc = (t, s) => t.GetProgress() === s.GetProgress() ? t.GetPassTime() - s.GetPassTime() : s.GetProgress() - t.GetProgress()
  }
  SetIsOpenAnonymousName(t, s) {
    this.tt1.set(t, s);
    var e = this.Vnc.get(t);
    if (e)
      for (const i of e) i.SetNameMode(s);
    e = this.Fnc.get(t);
    if (e)
      for (const r of e) r.SetNameMode(s)
  }
  OnSelfRankInfoUpdate(s) {
    if (this.clc(this.Fnc), this.clc(this.Vnc), 0 !== s.mnc.length) {
      this.ayc = [];
      var e = s.mnc.length;
      for (let t = 0; t < e; t++) {
        var i = new AbyssChallengeInfo;
        i.Phrase(s.mnc[t]), this.ayc.push(i), i.GetIsSingle() ? (this.Znc(i.GetChallengeId()).push(i), this.znc(i, i.GetChallengeId())) : (this.esc(i.GetChallengeId()).push(i), this.Jnc(i, i.GetChallengeId()))
      }
      this.ayc.forEach(t => {
        var s = t.GetChallengeId(),
          t = t.GetShowName();
        this.tt1.set(s, t)
      })
    }
  }
  GetAnonymousNameMode(t) {
    return this.tt1.get(t) ?? !0
  }
  clc(t) {
    for (const e of t.values())
      for (const i of e)
        if (i.IsSelf) {
          var s = e.indexOf(i);
          if (0 <= s) {
            e.splice(s, 1);
            break
          }
        }
  }
  OnChallengeRankInfoUpdate(s) {
    this.Fnc.clear(), this.Vnc.clear(), this.syc = [];
    var e = s.dnc.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssChallengeInfo;
      i.Phrase(s.dnc[t]), this.syc.push(i), (i.GetIsSingle() ? this.Znc(i.GetChallengeId()) : this.esc(i.GetChallengeId())).push(i)
    }
    this.ayc = [];
    var r = s.mnc.length;
    for (let t = 0; t < r; t++) {
      var h = new AbyssChallengeInfo;
      h.Phrase(s.mnc[t]), this.ayc.push(h), h.GetIsSingle() ? (this.Znc(h.GetChallengeId()).push(h), this.znc(h, h.GetChallengeId())) : (this.esc(h.GetChallengeId()).push(h), this.Jnc(h, h.GetChallengeId()))
    }
  }
  RefreshAllPassDataRank(t) {
    this.Xnc(t, this.Znc(t), this.Nnc), this.Xnc(t, this.esc(t), this.jnc), this.Ync(t), this.RefreshSelfRankItemDataName(t)
  }
  Ync(t) {
    let s = this.Hnc.get(t),
      e = (s = s || this.llc(t), this.Wnc = s, this.Wnc.IsInRank = this.Nnc.includes(s), this.$nc.get(t));
    e = e || this._lc(t), this.Qnc = e, this.Qnc.IsInRank = this.jnc.includes(e)
  }
  llc(t) {
    var s = new AbyssChallengeInfo;
    return this.znc(s, t), s
  }
  _lc(t) {
    var s = new AbyssChallengeInfo;
    return this.Jnc(s, t), s
  }
  Xnc(t, s, e) {
    var i = this.alc;
    e.length = 0, s.sort(i);
    let r = 0,
      h = 0,
      a = 0;
    for (let t = 0; t < s.length; t++) {
      var n, o, l = s[t];
      (0 === t || (n = l.GetPassTime() !== h, o = l.GetProgress() !== a, n) || o) && (r++, h = l.GetPassTime(), a = l.GetProgress()), l.Rank = r, e.push(l)
    }
  }
  RefreshSelfRankItemDataName(t) {
    var s, e = this.Fnc.get(t);
    if (e)
      for (const r of e) r.IsSelfInData && (s = this.tt1.get(t) ?? !0, r.RefreshPlayerName(s));
    var i, e = this.Vnc.get(t);
    if (e)
      for (const h of e) h.IsSelfInData && (i = this.tt1.get(t) ?? !0, h.RefreshPlayerName(i))
  }
  GetRankDataListByOnlineType(t) {
    return t ? this.jnc : this.Nnc
  }
  GetSelfRankDataByTabType(t) {
    return t ? this.Qnc : this.Wnc
  }
  Znc(t) {
    let s = this.Fnc.get(t);
    return s || (s = [], this.Fnc.set(t, s)), s
  }
  znc(t, s) {
    t.IsSelf = !0, this.Hnc.set(s, t)
  }
  esc(t) {
    let s = this.Vnc.get(t);
    return s || (s = [], this.Vnc.set(t, s)), s
  }
  Jnc(t, s) {
    t.IsSelf = !0, this.$nc.set(s, t)
  }
  IsOwnSingleBestScore(t) {
    var s = this.Wnc.IsEmpty,
      e = this.Qnc.IsEmpty;
    return !(s !== e || !s) || (s !== e ? e : this.Wnc.GetPassTime() <= this.Qnc.GetPassTime())
  }
}
exports.AbyssRankChallengeInfo = AbyssRankChallengeInfo;
class AbyssChallengeInfo {
  constructor() {
    this.IsSelf = !1, this.IsSelfInData = !1, this.IsInRank = !0, this.vsc = new Map, this.Yvc = [], this.f$a = 0, this.hyc = 0, this.lyc = !1, this._yc = !1, this.fye = 0, this._G1 = 0, this.Rank = 0, this.iUc = []
  }
  RefreshPlayerName(t) {
    var s = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    this.vsc.has(s) && (t = t ? ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() : "", this.vsc.set(s, t))
  }
  GetDangoAbyssRankRoleData() {
    if (0 === this.iUc.length)
      if (this.GetIsSingle()) {
        if (0 < this.Yvc.length) {
          for (const r of this.Yvc[0].GetPassRoleInfoList()) {
            var t = new DangoAbyssRankRoleData;
            t.RoleSkinId = r.GetRoleSkinId(), t.RoleLevel = r.GetRoleLevel(), t.DangoId = r.GetDangoId(), t.DangoEquipIds = r.GetEquipmentList(), t.IsOnline = !1, t.IsEmpty = !1, this.iUc.push(t)
          }
          for (let t = this.iUc.length; t < MAX_COUNT; t++) {
            var s = new DangoAbyssRankRoleData;
            this.iUc.push(s)
          }
        }
      } else {
        for (let t = 0, s = this.Yvc.length; t < s; t++)
          for (const h of this.Yvc[t].GetPassRoleInfoList()) {
            var e = new DangoAbyssRankRoleData;
            e.RoleSkinId = h.GetRoleSkinId(), e.RoleLevel = h.GetRoleLevel(), e.DangoId = h.GetDangoId(), e.DangoEquipIds = h.GetEquipmentList(), e.IsOnline = !0, e.IsEmpty = !1, e.Pos = t, this.iUc.push(e)
          }
        for (let t = this.iUc.length; t < MAX_COUNT; t++) {
          var i = new DangoAbyssRankRoleData;
          this.iUc.push(i)
        }
      } return this.iUc
  }
  get IsEmpty() {
    return 0 === this.Yvc.length
  }
  GetPlayerInfoList() {
    return this.Yvc
  }
  GetPassTime() {
    return this.f$a
  }
  GetProgress() {
    return this._G1
  }
  GetChallengeId() {
    return this.hyc
  }
  GetIsSingle() {
    return this.lyc
  }
  GetShowName() {
    return this._yc
  }
  GetOwnerId() {
    return this.fye
  }
  SetNameMode(t) {
    this._yc = t
  }
  Phrase(s) {
    this.Yvc = [], this.iUc = [];
    var e = s.TRs.length,
      i = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    this.vsc.clear();
    for (let t = 0; t < e; t++) {
      var r = new AbyssChallengePassPlayerInfo;
      r.Phrase(s.TRs[t]), this.Yvc.push(r), this.vsc.set(r.GetPlayerId(), r.GetName()), i === r.GetPlayerId() && (this.IsSelfInData = !0)
    }
    this.f$a = s.Qxs, this.hyc = s.e8n, this.lyc = s.Cnc, this._yc = s.lnc, this.fye = s.nIs, this._G1 = s.dPc
  }
  get RankBg() {
    return this.IsFirst ? FIRST_RANKBG : this.IsSecond ? SECOND_RANKBG : this.IsThird ? THIRD_RANKBG : OTHER_RANKBG
  }
  get IsFirst() {
    return 1 === this.Rank && this.IsInRank
  }
  get IsSecond() {
    return 2 === this.Rank && this.IsInRank
  }
  get IsThird() {
    return 3 === this.Rank && this.IsInRank
  }
  GetPlayerNameMap() {
    return this.vsc
  }
}
exports.AbyssChallengeInfo = AbyssChallengeInfo;
class AbyssChallengePassPlayerInfo {
  constructor() {
    this.he = "", this.j8 = 0, this.cyc = []
  }
  GetName() {
    return this.he
  }
  GetPlayerId() {
    return this.j8
  }
  GetPassRoleInfoList() {
    return this.cyc
  }
  Phrase(s) {
    this.he = s.H8n, this.j8 = s.W5n, this.cyc = [];
    var e = s.dUs.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssChallengePassRoleInfo;
      i.Phrase(s.dUs[t]), this.cyc.push(i)
    }
  }
}
exports.AbyssChallengePassPlayerInfo = AbyssChallengePassPlayerInfo;
class AbyssChallengePassRoleInfo {
  constructor() {
    this.Jvc = 0, this.Zvc = 0, this.eyc = 0, this.hR1 = []
  }
  GetRoleSkinId() {
    return this.Jvc
  }
  GetRoleLevel() {
    return this.Zvc
  }
  GetDangoId() {
    return this.eyc
  }
  GetEquipmentList() {
    return this.hR1
  }
  Phrase(t) {
    this.Jvc = t.eI_, this.Zvc = t.Ebs, this.eyc = t.Q0c, this.hR1 = t.jb1
  }
}
exports.AbyssChallengePassRoleInfo = AbyssChallengePassRoleInfo;
class AbyssDangoOwnerData {
  constructor() {
    this.PlayerId = 0, this.RoleCfgId = 0, this.DangoId = 0, this.DangoLevel = 0, this.DangoEquipIds = []
  }
}
exports.AbyssDangoOwnerData = AbyssDangoOwnerData;
class DangoAbyssRankRoleData {
  constructor() {
    this.IsEmpty = !0, this.RoleSkinId = 0, this.RoleLevel = 0, this.DangoId = 0, this.IsOnline = !1, this.Pos = 0, this.DangoEquipIds = []
  }
  GetEquipPluginMap() {
    var s = new Map;
    for (let t = 0; t < DangoAbyssDefine_1.SLOT_COUNT; t++) s.set(t, 0);
    for (let t = 0; t < this.DangoEquipIds.length; t++) s.set(t, this.DangoEquipIds[t]);
    return s
  }
}
exports.DangoAbyssRankRoleData = DangoAbyssRankRoleData;
//# sourceMappingURL=DangoAbyssData.js.map