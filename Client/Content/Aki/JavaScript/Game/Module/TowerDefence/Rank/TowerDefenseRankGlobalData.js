"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.TowerDefenseRankGlobalData = void 0;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  TowerDefenceDefine_1 = require("../TowerDefenceDefine"),
  TowerDefenseRankItemData_1 = require("./TowerDefenseRankItemData");
class TowerDefenseRankGlobalData {
  constructor() {
    this.Gnc = !1, this.Fnc = new Map, this.Nnc = [], this.Vnc = new Map, this.jnc = [], this.Hnc = new Map, this.$nc = new Map, this.Wnc = void 0, this.Qnc = void 0, this.alc = (e, t) => t.PassScore - e.PassScore, this.hlc = (e, t) => e.PassScore - t.PassScore
  }
  get IsOpenAnonymousName() {
    return this.Gnc
  }
  SetIsOpenAnonymousName(e) {
    this.Gnc = e
  }
  Xnc(e, t, i) {
    var s = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(e),
      e = s.IsDifficult ? this.hlc : this.alc,
      a = (i.length = 0, ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseRankListSize());
    t.sort(e);
    let r = 0,
      n = 0;
    for (let e = 0; e < t.length && !(e >= a); e++) {
      var h = t[e];
      h.IsEmpty || (0 !== e && !(s.IsDifficult ? h.PassScore > n : h.PassScore < n) || (r++, n = h.PassScore), h.Rank = r, i.push(h))
    }
  }
  llc(e) {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(e),
      t = new TowerDefenseRankItemData_1.TowerDefenseRankItemData(!1, t.IsDifficult, Protocol_1.Aki.Protocol.Mnc.create());
    return this.znc(t, e), t
  }
  _lc(e) {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(e),
      t = new TowerDefenseRankItemData_1.TowerDefenseRankItemData(!0, t.IsDifficult, Protocol_1.Aki.Protocol.Mnc.create());
    return this.Jnc(t, e), t
  }
  Ync(e) {
    let t = this.Hnc.get(e),
      i = (t = t || this.llc(e), this.Wnc = t, this.Wnc.IsInRank = this.Nnc.includes(t), this.$nc.get(e));
    i = i || this._lc(e), this.Qnc = i, this.Qnc.IsInRank = this.jnc.includes(i)
  }
  Znc(e) {
    let t = this.Fnc.get(e);
    return t || (t = [], this.Fnc.set(e, t)), t
  }
  esc(e) {
    let t = this.Vnc.get(e);
    return t || (t = [], this.Vnc.set(e, t)), t
  }
  RefreshAllPassDataRank(e) {
    this.Xnc(e, this.Znc(e), this.Nnc), this.Xnc(e, this.esc(e), this.jnc), this.Ync(e), this.RefreshSelfRankItemDataName(e)
  }
  SetFriendServerData(e) {
    if (this.Fnc.clear(), this.Vnc.clear(), 0 < e.length)
      for (const s of e) {
        var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseConfigById(s.e8n),
          i = new TowerDefenseRankItemData_1.TowerDefenseRankItemData(!s.Cnc, t.IsDifficult, s.pnc);
        i.IsSelfInData || (i.IsOnline ? this.esc(t.InstanceId) : this.Znc(t.InstanceId)).push(i)
      }
  }
  clc(e) {
    for (const i of e.values())
      for (const s of i)
        if (s.IsSelfInData) {
          var t = i.indexOf(s);
          if (0 <= t) {
            i.splice(t, 1);
            break
          }
        }
  }
  znc(e, t) {
    e.IsSelf = !0, this.Hnc.set(t, e)
  }
  Jnc(e, t) {
    e.IsSelf = !0, this.$nc.set(t, e)
  }
  SetSelfServerData(e) {
    if (this.clc(this.Fnc), this.clc(this.Vnc), 0 < e.length)
      for (const s of e) {
        var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseConfigById(s.e8n),
          i = new TowerDefenseRankItemData_1.TowerDefenseRankItemData(!s.Cnc, t.IsDifficult, s.pnc);
        (i.IsOnline ? (this.Jnc(i, t.InstanceId), this.esc(t.InstanceId)) : (this.znc(i, t.InstanceId), this.Znc(t.InstanceId)))?.push(i)
      }
  }
  RefreshSelfRankItemDataName(e) {
    var t = this.Fnc.get(e);
    if (t)
      for (const i of t) i.IsSelfInData && i.RefreshPlayerName(this.IsOpenAnonymousName);
    t = this.Vnc.get(e);
    if (t)
      for (const s of t) s.IsSelfInData && s.RefreshPlayerName(this.IsOpenAnonymousName)
  }
  GetRankDataListByTabType(e) {
    return e === TowerDefenceDefine_1.ETabType.Single ? this.Nnc : this.jnc
  }
  GetSelfRankDataByTabType(e) {
    return e === TowerDefenceDefine_1.ETabType.Single ? this.Wnc : this.Qnc
  }
  GetBestScoreText(e) {
    this.Ync(e);
    var t, i, e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(e);
    return this.Wnc.IsEmpty !== this.Qnc.IsEmpty ? (t = (this.Qnc.IsEmpty ? this.Wnc : this.Qnc).PassScore, e.IsDifficult ? TimeUtil_1.TimeUtil.GetTimeDataFormat(t) : t.toString()) : (t = this.Wnc.PassScore, i = this.Qnc.PassScore, e.IsDifficult ? TimeUtil_1.TimeUtil.GetTimeDataFormat(Math.min(t, i)) : Math.max(t, i).toString())
  }
  IsOwnSingleBestScore(e) {
    var t = this.Wnc.IsEmpty,
      i = this.Qnc.IsEmpty;
    return !(t !== i || !t) || (t !== i ? i : (t = this.Wnc.PassScore, i = this.Qnc.PassScore, ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(e).IsDifficult ? t <= i : i <= t))
  }
}
exports.TowerDefenseRankGlobalData = TowerDefenseRankGlobalData;
//# sourceMappingURL=TowerDefenseRankGlobalData.js.map