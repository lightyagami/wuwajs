"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssRankRoleData = exports.AbyssDangoOwnerData = exports.AbyssChallengePassRoleInfo = exports.AbyssChallengePassPlayerInfo = exports.AbyssChallengeInfo = exports.AbyssRankChallengeInfo = exports.AbyssFormationRoleSelectDetailInfo = exports.AbyssFormationRoleSelectInfo = exports.AbyssFormationInfo = exports.AbyssChallengeRoleHonor = exports.AbyssChallengeResultRoleInfo = exports.AbyssChallengeResultPlayerInfo = exports.AbyssChallengeResultData = exports.DangoAbyssInsSelectViewData = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const DangoAbyssDefine_1 = require("./DangoAbyssDefine");
const FIRST_RANKBG = "T_AnniversaryCelebrationRankBg_1";
const SECOND_RANKBG = "T_AnniversaryCelebrationRankBg_2";
const THIRD_RANKBG = "T_AnniversaryCelebrationRankBg_3";
const OTHER_RANKBG = "T_AnniversaryCelebrationRankBgOther";
const MAX_COUNT = 3;
class DangoAbyssInsSelectViewData {
  constructor() {
    this.AbyssDataList = [];
    this.ActivityData = undefined;
    this.FromSettlement = false;
  }
}
exports.DangoAbyssInsSelectViewData = DangoAbyssInsSelectViewData;
class AbyssChallengeResultData {
  constructor() {
    this.f$a = 0;
    this.Kvc = 0;
    this.Xvc = false;
    this.Yvc = [];
  }
  GetPassTime() {
    return this.f$a;
  }
  GetMinPassTime() {
    return this.Kvc;
  }
  GetIfSuccess() {
    return this.Xvc;
  }
  GetPlayerInfoList() {
    return this.Yvc;
  }
  GetPlayerInfoByPlayerId(s) {
    return this.Yvc.find(t => t.GetPlayerId() === s);
  }
  Phrase(s) {
    if (s) {
      this.f$a = s.Qxs;
      this.Kvc = s.JM_;
      this.Xvc = s.KRs;
      this.Yvc = [];
      var e = s.TRs.length;
      for (let t = 0; t < e; t++) {
        var i = new AbyssChallengeResultPlayerInfo();
        i.Phrase(s.TRs[t]);
        this.Yvc.push(i);
      }
    }
  }
}
exports.AbyssChallengeResultData = AbyssChallengeResultData;
class AbyssChallengeResultPlayerInfo {
  constructor() {
    this.j8 = 0;
    this.zvc = 0;
    this.TSn = [];
  }
  GetPlayerId() {
    return this.j8;
  }
  GetLikeCount() {
    return this.zvc;
  }
  GetRoleInfo() {
    return this.TSn;
  }
  SetLikeCount(t) {
    this.zvc = t;
  }
  Phrase(s) {
    this.j8 = s.W5n;
    this.zvc = s.V0c;
    this.TSn = [];
    var e = s.dUs.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssChallengeResultRoleInfo();
      i.Phrase(s.dUs[t]);
      this.TSn.push(i);
    }
  }
}
exports.AbyssChallengeResultPlayerInfo = AbyssChallengeResultPlayerInfo;
class AbyssChallengeResultRoleInfo {
  constructor() {
    this.Jvc = 0;
    this.Zvc = 0;
    this.eyc = 0;
    this.tyc = undefined;
    this.iyc = [];
  }
  GetRoleSkinId() {
    return this.Jvc;
  }
  GetRoleLevel() {
    return this.Zvc;
  }
  GetDangoId() {
    return this.eyc;
  }
  GetMainHonor() {
    return this.tyc;
  }
  GetSubHonor() {
    return this.iyc;
  }
  Phrase(s) {
    this.Jvc = s.eI_;
    this.Zvc = s.Ebs;
    this.eyc = s.Q0c;
    this.tyc = new AbyssChallengeRoleHonor();
    this.tyc.Phrase(s.K0c);
    this.iyc = [];
    var e = s.X0c.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssChallengeRoleHonor();
      i.Phrase(s.X0c[t]);
      this.iyc.push(i);
    }
  }
}
exports.AbyssChallengeResultRoleInfo = AbyssChallengeResultRoleInfo;
class AbyssChallengeRoleHonor {
  constructor() {
    this.E9 = 0;
    this.Xe = 0;
  }
  GetType() {
    return this.E9;
  }
  GetValue() {
    return this.Xe;
  }
  Phrase(t) {
    if (t) {
      this.E9 = t.h5n;
      this.Xe = t.e5n;
    }
  }
}
exports.AbyssChallengeRoleHonor = AbyssChallengeRoleHonor;
class AbyssFormationInfo {
  constructor() {
    this.ryc = [];
  }
  Phrase(s) {
    this.ryc = [];
    var e = s.TRs.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssFormationRoleSelectInfo();
      i.Phrase(s.TRs[t]);
      this.ryc.push(i);
    }
  }
}
exports.AbyssFormationInfo = AbyssFormationInfo;
class AbyssFormationRoleSelectInfo {
  constructor() {
    this.j8 = 0;
    this.oyc = [];
  }
  GetPlayerId() {
    return this.j8;
  }
  GetRoleSelectDetailInfoList() {
    return this.oyc;
  }
  Phrase(s) {
    this.j8 = s.W5n;
    this.oyc = [];
    var e = s.dUs.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssFormationRoleSelectDetailInfo();
      i.Phrase(s.dUs[t]);
      this.oyc.push(i);
    }
  }
}
exports.AbyssFormationRoleSelectInfo = AbyssFormationRoleSelectInfo;
class AbyssFormationRoleSelectDetailInfo {
  constructor() {
    this.dFe = 0;
    this.eyc = 0;
    this.nyc = [];
  }
  GetRoleId() {
    return this.dFe;
  }
  GetDangoId() {
    return this.eyc;
  }
  GetPluginItemList() {
    return this.nyc;
  }
  Phrase(t) {
    this.dFe = t.Q6n;
    this.eyc = t.Q0c;
    this.nyc = t.ipc;
  }
}
exports.AbyssFormationRoleSelectDetailInfo = AbyssFormationRoleSelectDetailInfo;
class AbyssRankChallengeInfo {
  constructor() {
    this.yt1 = new Map();
    this.Vnc = new Map();
    this.Hnc = new Map();
    this.Fnc = new Map();
    this.$nc = new Map();
    this.Nnc = [];
    this.jnc = [];
    this.syc = [];
    this.ayc = [];
    this.Wnc = undefined;
    this.Qnc = undefined;
    this.alc = (t, s) => t.GetProgress() === s.GetProgress() ? t.GetPassTime() - s.GetPassTime() : s.GetProgress() - t.GetProgress();
  }
  SetIsOpenAnonymousName(t, s) {
    this.yt1.set(t, s);
    var e = this.Vnc.get(t);
    if (e) {
      for (const i of e) {
        i.SetNameMode(s);
      }
    }
    e = this.Fnc.get(t);
    if (e) {
      for (const r of e) {
        r.SetNameMode(s);
      }
    }
  }
  OnSelfRankInfoUpdate(s) {
    this.clc(this.Fnc);
    this.clc(this.Vnc);
    if (s.mnc.length !== 0) {
      this.ayc = [];
      var e = s.mnc.length;
      for (let t = 0; t < e; t++) {
        var i = new AbyssChallengeInfo();
        i.Phrase(s.mnc[t]);
        this.ayc.push(i);
        if (i.GetIsSingle()) {
          this.Znc(i.GetChallengeId()).push(i);
          this.znc(i, i.GetChallengeId());
        } else {
          this.esc(i.GetChallengeId()).push(i);
          this.Jnc(i, i.GetChallengeId());
        }
      }
      this.ayc.forEach(t => {
        var s = t.GetChallengeId();
        var t = t.GetShowName();
        this.yt1.set(s, t);
      });
    }
  }
  GetAnonymousNameMode(t) {
    return this.yt1.get(t) ?? true;
  }
  clc(t) {
    for (const e of t.values()) {
      for (const i of e) {
        if (i.IsSelf) {
          var s = e.indexOf(i);
          if (s >= 0) {
            e.splice(s, 1);
            break;
          }
        }
      }
    }
  }
  OnChallengeRankInfoUpdate(s) {
    this.Fnc.clear();
    this.Vnc.clear();
    this.syc = [];
    var e = s.dnc.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssChallengeInfo();
      i.Phrase(s.dnc[t]);
      this.syc.push(i);
      (i.GetIsSingle() ? this.Znc(i.GetChallengeId()) : this.esc(i.GetChallengeId())).push(i);
    }
    this.ayc = [];
    var r = s.mnc.length;
    for (let t = 0; t < r; t++) {
      var h = new AbyssChallengeInfo();
      h.Phrase(s.mnc[t]);
      this.ayc.push(h);
      if (h.GetIsSingle()) {
        this.Znc(h.GetChallengeId()).push(h);
        this.znc(h, h.GetChallengeId());
      } else {
        this.esc(h.GetChallengeId()).push(h);
        this.Jnc(h, h.GetChallengeId());
      }
    }
  }
  RefreshAllPassDataRank(t) {
    this.Xnc(t, this.Znc(t), this.Nnc);
    this.Xnc(t, this.esc(t), this.jnc);
    this.Ync(t);
    this.RefreshSelfRankItemDataName(t);
  }
  Ync(t) {
    let s = this.Hnc.get(t);
    s = s || this.llc(t);
    this.Wnc = s;
    this.Wnc.IsInRank = this.Nnc.includes(s);
    let e = this.$nc.get(t);
    e = e || this._lc(t);
    this.Qnc = e;
    this.Qnc.IsInRank = this.jnc.includes(e);
  }
  llc(t) {
    var s = new AbyssChallengeInfo();
    this.znc(s, t);
    return s;
  }
  _lc(t) {
    var s = new AbyssChallengeInfo();
    this.Jnc(s, t);
    return s;
  }
  Xnc(t, s, e) {
    var i = this.alc;
    e.length = 0;
    s.sort(i);
    let r = 0;
    let h = 0;
    let a = 0;
    for (let t = 0; t < s.length; t++) {
      var n;
      var o;
      var l = s[t];
      if (t === 0 || (n = l.GetPassTime() !== h, o = l.GetProgress() !== a, n) || o) {
        r++;
        h = l.GetPassTime();
        a = l.GetProgress();
      }
      l.Rank = r;
      e.push(l);
    }
  }
  RefreshSelfRankItemDataName(t) {
    var s;
    var e = this.Fnc.get(t);
    if (e) {
      for (const r of e) {
        if (r.IsSelfInData) {
          s = this.yt1.get(t) ?? true;
          r.RefreshPlayerName(s);
        }
      }
    }
    var i;
    var e = this.Vnc.get(t);
    if (e) {
      for (const h of e) {
        if (h.IsSelfInData) {
          i = this.yt1.get(t) ?? true;
          h.RefreshPlayerName(i);
        }
      }
    }
  }
  GetRankDataListByOnlineType(t) {
    if (t) {
      return this.jnc;
    } else {
      return this.Nnc;
    }
  }
  GetSelfRankDataByTabType(t) {
    if (t) {
      return this.Qnc;
    } else {
      return this.Wnc;
    }
  }
  Znc(t) {
    let s = this.Fnc.get(t);
    if (!s) {
      s = [];
      this.Fnc.set(t, s);
    }
    return s;
  }
  znc(t, s) {
    t.IsSelf = true;
    this.Hnc.set(s, t);
  }
  esc(t) {
    let s = this.Vnc.get(t);
    if (!s) {
      s = [];
      this.Vnc.set(t, s);
    }
    return s;
  }
  Jnc(t, s) {
    t.IsSelf = true;
    this.$nc.set(s, t);
  }
  IsOwnSingleBestScore(t) {
    var s = this.Wnc.IsEmpty;
    var e = this.Qnc.IsEmpty;
    return s === e && !!s || (s !== e ? e : this.Wnc.GetPassTime() <= this.Qnc.GetPassTime());
  }
}
exports.AbyssRankChallengeInfo = AbyssRankChallengeInfo;
class AbyssChallengeInfo {
  constructor() {
    this.IsSelf = false;
    this.IsSelfInData = false;
    this.IsInRank = true;
    this.vsc = new Map();
    this.Yvc = [];
    this.f$a = 0;
    this.hyc = 0;
    this.lyc = false;
    this._yc = false;
    this.fye = 0;
    this.NG1 = 0;
    this.Rank = 0;
    this.iUc = [];
  }
  RefreshPlayerName(t) {
    var s = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    if (this.vsc.has(s)) {
      t = t ? ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() : "";
      this.vsc.set(s, t);
    }
  }
  GetDangoAbyssRankRoleData() {
    if (this.iUc.length === 0) {
      if (this.GetIsSingle()) {
        if (this.Yvc.length > 0) {
          for (const r of this.Yvc[0].GetPassRoleInfoList()) {
            var t = new DangoAbyssRankRoleData();
            t.RoleSkinId = r.GetRoleSkinId();
            t.RoleLevel = r.GetRoleLevel();
            t.DangoId = r.GetDangoId();
            t.DangoEquipIds = r.GetEquipmentList();
            t.IsOnline = false;
            t.IsEmpty = false;
            this.iUc.push(t);
          }
          for (let t = this.iUc.length; t < MAX_COUNT; t++) {
            var s = new DangoAbyssRankRoleData();
            this.iUc.push(s);
          }
        }
      } else {
        for (let t = 0, s = this.Yvc.length; t < s; t++) {
          for (const h of this.Yvc[t].GetPassRoleInfoList()) {
            var e = new DangoAbyssRankRoleData();
            e.RoleSkinId = h.GetRoleSkinId();
            e.RoleLevel = h.GetRoleLevel();
            e.DangoId = h.GetDangoId();
            e.DangoEquipIds = h.GetEquipmentList();
            e.IsOnline = true;
            e.IsEmpty = false;
            e.Pos = t;
            this.iUc.push(e);
          }
        }
        for (let t = this.iUc.length; t < MAX_COUNT; t++) {
          var i = new DangoAbyssRankRoleData();
          this.iUc.push(i);
        }
      }
    }
    return this.iUc;
  }
  get IsEmpty() {
    return this.Yvc.length === 0;
  }
  GetPlayerInfoList() {
    return this.Yvc;
  }
  GetPassTime() {
    return this.f$a;
  }
  GetProgress() {
    return this.NG1;
  }
  GetChallengeId() {
    return this.hyc;
  }
  GetIsSingle() {
    return this.lyc;
  }
  GetShowName() {
    return this._yc;
  }
  GetOwnerId() {
    return this.fye;
  }
  SetNameMode(t) {
    this._yc = t;
  }
  Phrase(s) {
    this.Yvc = [];
    this.iUc = [];
    var e = s.TRs.length;
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    this.vsc.clear();
    for (let t = 0; t < e; t++) {
      var r = new AbyssChallengePassPlayerInfo();
      r.Phrase(s.TRs[t]);
      this.Yvc.push(r);
      this.vsc.set(r.GetPlayerId(), r.GetName());
      if (i === r.GetPlayerId()) {
        this.IsSelfInData = true;
      }
    }
    this.f$a = s.Qxs;
    this.hyc = s.e8n;
    this.lyc = s.Cnc;
    this._yc = s.lnc;
    this.fye = s.nIs;
    this.NG1 = s.dPc;
  }
  get RankBg() {
    if (this.IsFirst) {
      return FIRST_RANKBG;
    } else if (this.IsSecond) {
      return SECOND_RANKBG;
    } else if (this.IsThird) {
      return THIRD_RANKBG;
    } else {
      return OTHER_RANKBG;
    }
  }
  get IsFirst() {
    return this.Rank === 1 && this.IsInRank;
  }
  get IsSecond() {
    return this.Rank === 2 && this.IsInRank;
  }
  get IsThird() {
    return this.Rank === 3 && this.IsInRank;
  }
  GetPlayerNameMap() {
    return this.vsc;
  }
}
exports.AbyssChallengeInfo = AbyssChallengeInfo;
class AbyssChallengePassPlayerInfo {
  constructor() {
    this.he = "";
    this.j8 = 0;
    this.cyc = [];
  }
  GetName() {
    return this.he;
  }
  GetPlayerId() {
    return this.j8;
  }
  GetPassRoleInfoList() {
    return this.cyc;
  }
  Phrase(s) {
    this.he = s.H8n;
    this.j8 = s.W5n;
    this.cyc = [];
    var e = s.dUs.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssChallengePassRoleInfo();
      i.Phrase(s.dUs[t]);
      this.cyc.push(i);
    }
  }
}
exports.AbyssChallengePassPlayerInfo = AbyssChallengePassPlayerInfo;
class AbyssChallengePassRoleInfo {
  constructor() {
    this.Jvc = 0;
    this.Zvc = 0;
    this.eyc = 0;
    this.DR1 = [];
  }
  GetRoleSkinId() {
    return this.Jvc;
  }
  GetRoleLevel() {
    return this.Zvc;
  }
  GetDangoId() {
    return this.eyc;
  }
  GetEquipmentList() {
    return this.DR1;
  }
  Phrase(t) {
    this.Jvc = t.eI_;
    this.Zvc = t.Ebs;
    this.eyc = t.Q0c;
    this.DR1 = t.fR1;
  }
}
exports.AbyssChallengePassRoleInfo = AbyssChallengePassRoleInfo;
class AbyssDangoOwnerData {
  constructor() {
    this.PlayerId = 0;
    this.RoleCfgId = 0;
    this.DangoId = 0;
    this.DangoLevel = 0;
    this.DangoEquipIds = [];
  }
}
exports.AbyssDangoOwnerData = AbyssDangoOwnerData;
class DangoAbyssRankRoleData {
  constructor() {
    this.IsEmpty = true;
    this.RoleSkinId = 0;
    this.RoleLevel = 0;
    this.DangoId = 0;
    this.IsOnline = false;
    this.Pos = 0;
    this.DangoEquipIds = [];
  }
  GetEquipPluginMap() {
    var s = new Map();
    for (let t = 0; t < DangoAbyssDefine_1.SLOT_COUNT; t++) {
      s.set(t, 0);
    }
    for (let t = 0; t < this.DangoEquipIds.length; t++) {
      s.set(t, this.DangoEquipIds[t]);
    }
    return s;
  }
}
exports.DangoAbyssRankRoleData = DangoAbyssRankRoleData;
//# sourceMappingURL=DangoAbyssData.js.map