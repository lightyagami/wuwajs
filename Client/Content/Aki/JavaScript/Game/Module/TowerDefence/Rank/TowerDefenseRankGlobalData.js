"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseRankGlobalData = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const TowerDefenceDefine_1 = require("../TowerDefenceDefine");
const TowerDefenseRankItemData_1 = require("./TowerDefenseRankItemData");
class TowerDefenseRankGlobalData {
  constructor() {
    this.Gnc = false;
    this.Fnc = new Map();
    this.Nnc = [];
    this.Vnc = new Map();
    this.jnc = [];
    this.Hnc = new Map();
    this.$nc = new Map();
    this.Wnc = undefined;
    this.Qnc = undefined;
    this.alc = (e, t) => t.PassScore - e.PassScore;
    this.hlc = (e, t) => e.PassScore - t.PassScore;
  }
  get IsOpenAnonymousName() {
    return this.Gnc;
  }
  SetIsOpenAnonymousName(e) {
    this.Gnc = e;
  }
  Xnc(e, t, i) {
    var s = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(e);
    var e = s.IsDifficult ? this.hlc : this.alc;
    i.length = 0;
    var a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseRankListSize();
    t.sort(e);
    let r = 0;
    let n = 0;
    for (let e = 0; e < t.length && !(e >= a); e++) {
      var h = t[e];
      if (!h.IsEmpty) {
        if (e === 0 || !!(s.IsDifficult ? h.PassScore > n : h.PassScore < n)) {
          r++;
          n = h.PassScore;
        }
        h.Rank = r;
        i.push(h);
      }
    }
  }
  llc(e) {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(e);
    var t = new TowerDefenseRankItemData_1.TowerDefenseRankItemData(false, t.IsDifficult, Protocol_1.Aki.Protocol.Mnc.create());
    this.znc(t, e);
    return t;
  }
  _lc(e) {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(e);
    var t = new TowerDefenseRankItemData_1.TowerDefenseRankItemData(true, t.IsDifficult, Protocol_1.Aki.Protocol.Mnc.create());
    this.Jnc(t, e);
    return t;
  }
  Ync(e) {
    let t = this.Hnc.get(e);
    t = t || this.llc(e);
    this.Wnc = t;
    this.Wnc.IsInRank = this.Nnc.includes(t);
    let i = this.$nc.get(e);
    i = i || this._lc(e);
    this.Qnc = i;
    this.Qnc.IsInRank = this.jnc.includes(i);
  }
  Znc(e) {
    let t = this.Fnc.get(e);
    if (!t) {
      t = [];
      this.Fnc.set(e, t);
    }
    return t;
  }
  esc(e) {
    let t = this.Vnc.get(e);
    if (!t) {
      t = [];
      this.Vnc.set(e, t);
    }
    return t;
  }
  RefreshAllPassDataRank(e) {
    this.Xnc(e, this.Znc(e), this.Nnc);
    this.Xnc(e, this.esc(e), this.jnc);
    this.Ync(e);
    this.RefreshSelfRankItemDataName(e);
  }
  SetFriendServerData(e) {
    this.Fnc.clear();
    this.Vnc.clear();
    if (e.length > 0) {
      for (const s of e) {
        var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseConfigById(s.e8n);
        var i = new TowerDefenseRankItemData_1.TowerDefenseRankItemData(!s.Cnc, t.IsDifficult, s.pnc);
        if (!i.IsSelfInData) {
          (i.IsOnline ? this.esc(t.InstanceId) : this.Znc(t.InstanceId)).push(i);
        }
      }
    }
  }
  clc(e) {
    for (const i of e.values()) {
      for (const s of i) {
        if (s.IsSelfInData) {
          var t = i.indexOf(s);
          if (t >= 0) {
            i.splice(t, 1);
            break;
          }
        }
      }
    }
  }
  znc(e, t) {
    e.IsSelf = true;
    this.Hnc.set(t, e);
  }
  Jnc(e, t) {
    e.IsSelf = true;
    this.$nc.set(t, e);
  }
  SetSelfServerData(e) {
    this.clc(this.Fnc);
    this.clc(this.Vnc);
    if (e.length > 0) {
      for (const s of e) {
        var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseConfigById(s.e8n);
        var i = new TowerDefenseRankItemData_1.TowerDefenseRankItemData(!s.Cnc, t.IsDifficult, s.pnc);
        (i.IsOnline ? (this.Jnc(i, t.InstanceId), this.esc(t.InstanceId)) : (this.znc(i, t.InstanceId), this.Znc(t.InstanceId)))?.push(i);
      }
    }
  }
  RefreshSelfRankItemDataName(e) {
    var t = this.Fnc.get(e);
    if (t) {
      for (const i of t) {
        if (i.IsSelfInData) {
          i.RefreshPlayerName(this.IsOpenAnonymousName);
        }
      }
    }
    t = this.Vnc.get(e);
    if (t) {
      for (const s of t) {
        if (s.IsSelfInData) {
          s.RefreshPlayerName(this.IsOpenAnonymousName);
        }
      }
    }
  }
  GetRankDataListByTabType(e) {
    if (e === TowerDefenceDefine_1.ETabType.Single) {
      return this.Nnc;
    } else {
      return this.jnc;
    }
  }
  GetSelfRankDataByTabType(e) {
    if (e === TowerDefenceDefine_1.ETabType.Single) {
      return this.Wnc;
    } else {
      return this.Qnc;
    }
  }
  GetBestScoreText(e) {
    this.Ync(e);
    var t;
    var i;
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(e);
    if (this.Wnc.IsEmpty !== this.Qnc.IsEmpty) {
      t = (this.Qnc.IsEmpty ? this.Wnc : this.Qnc).PassScore;
      if (e.IsDifficult) {
        return TimeUtil_1.TimeUtil.GetTimeDataFormat(t);
      } else {
        return t.toString();
      }
    } else {
      t = this.Wnc.PassScore;
      i = this.Qnc.PassScore;
      if (e.IsDifficult) {
        return TimeUtil_1.TimeUtil.GetTimeDataFormat(Math.min(t, i));
      } else {
        return Math.max(t, i).toString();
      }
    }
  }
  IsOwnSingleBestScore(e) {
    var t = this.Wnc.IsEmpty;
    var i = this.Qnc.IsEmpty;
    return t === i && !!t || (t !== i ? i : (t = this.Wnc.PassScore, i = this.Qnc.PassScore, ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(e).IsDifficult ? t <= i : i <= t));
  }
}
exports.TowerDefenseRankGlobalData = TowerDefenseRankGlobalData;
//# sourceMappingURL=TowerDefenseRankGlobalData.js.map