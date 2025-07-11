"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseRankItemData = exports.TowerDefenseRankRoleData = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const FIRSTPLAYER_COLOR = "CB9C38FF";
const SECONDPLAYER_COLOR = "6A7E9DFF";
const THIRDPLAYER_COLOR = "997E76FF";
const FIRST_RANKBG = "T_TipItemBgGold";
const SECOND_RANKBG = "T_TipItemBgSilver";
const THIRD_RANKBG = "T_TipItemBgCopper";
const OTHER_RANKBG = "T_TipItemBgMask";
const MAX_COUNT = 3;
class TowerDefenseRankRoleData {
  constructor() {
    this.IsEmpty = true;
    this.RoleSkinId = 0;
    this.RoleLevel = 0;
    this.PhantomId = 0;
    this.IsOnline = false;
    this.Pos = 0;
  }
}
exports.TowerDefenseRankRoleData = TowerDefenseRankRoleData;
class TowerDefenseRankItemData {
  constructor(t, e, s) {
    this.IsSelfInData = false;
    this.ServerData = undefined;
    this.IsOnline = false;
    this.IsDifficult = false;
    this.IsInRank = true;
    this.IsSelf = false;
    this.Rank = 0;
    this.RoleDataList = [];
    this.vsc = new Map();
    this.IsOnline = t;
    this.IsDifficult = e;
    this.ServerData = s;
    this.ysc();
    this.Ssc();
    this.IsSelfInData = this.Msc();
  }
  get IsEmpty() {
    return this.ServerData.fnc.length === 0;
  }
  get PassScore() {
    if (this.IsDifficult) {
      return this.ServerData.Qxs;
    } else {
      return this.ServerData.SMs;
    }
  }
  ysc() {
    if (this.IsOnline) {
      for (let t = 0, e = this.ServerData.fnc.length; t < e; t++) {
        for (const r of this.ServerData.fnc[t].Y7n) {
          var s = new TowerDefenseRankRoleData();
          s.RoleSkinId = r.eI_;
          s.RoleLevel = r.Ebs;
          s.PhantomId = r.oxs;
          s.IsOnline = true;
          s.IsEmpty = false;
          s.Pos = t;
          this.RoleDataList.push(s);
        }
      }
      for (let t = this.RoleDataList.length; t < MAX_COUNT; t++) {
        var e = new TowerDefenseRankRoleData();
        this.RoleDataList.push(e);
      }
    } else if (this.ServerData.fnc.length > 0) {
      for (const a of this.ServerData.fnc[0].Y7n) {
        var t = new TowerDefenseRankRoleData();
        t.RoleSkinId = a.eI_;
        t.RoleLevel = a.Ebs;
        t.PhantomId = a.oxs;
        t.IsOnline = false;
        t.IsEmpty = false;
        this.RoleDataList.push(t);
      }
      for (let t = this.RoleDataList.length; t < MAX_COUNT; t++) {
        var i = new TowerDefenseRankRoleData();
        this.RoleDataList.push(i);
      }
    }
  }
  Ssc() {
    for (const t of this.ServerData.fnc) {
      this.vsc.set(t.W5n, t.H8n);
    }
  }
  Msc() {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    for (const e of this.ServerData.fnc) {
      if (e.W5n === t) {
        return true;
      }
    }
    return false;
  }
  GetPlayerNameList() {
    var t = [];
    for (const s of this.ServerData.fnc) {
      var e = this.vsc.get(s.W5n);
      t.push({
        PlayerId: s.W5n,
        PlayerName: e
      });
    }
    return t;
  }
  RefreshPlayerName(t) {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    if (this.vsc.has(e)) {
      t = t ? "" : ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName();
      this.vsc.set(e, t);
    }
  }
  get TopThreeNumColor() {
    if (this.IsFirst) {
      return FIRSTPLAYER_COLOR;
    } else if (this.IsSecond) {
      return SECONDPLAYER_COLOR;
    } else if (this.IsThird) {
      return THIRDPLAYER_COLOR;
    } else {
      return "FFFFFFFF";
    }
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
  get IsTopThree() {
    return this.IsFirst || this.IsSecond || this.IsThird;
  }
}
exports.TowerDefenseRankItemData = TowerDefenseRankItemData;
//# sourceMappingURL=TowerDefenseRankItemData.js.map