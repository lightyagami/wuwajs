"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScratchTicketRoundData = undefined;
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RewardItemData_1 = require("../../../../ItemReward/RewardData/RewardItemData");
const ActivityScratchTicketDefine_1 = require("../ActivityScratchTicketDefine");
const ScratchTicketCellData_1 = require("./ScratchTicketCellData");
class ScratchTicketRoundData {
  constructor() {
    this.Id = 0;
    this.Gol = 0;
    this.Config = undefined;
    this.Ool = [];
    this.Y2i = 0;
    this.kol = [];
    this.Nol = 0;
    this.Vll = new Map();
    this.f7 = 0;
    this.Nvl = undefined;
  }
  Init(t) {
    this.Id = t.Tol;
    this.Config = ConfigManager_1.ConfigManager.ActivityScratchTicketConfig.GetScratchTicketRoundConfig(this.Id);
    if (this.Config !== undefined) {
      this.f7 = this.Config.Size * this.Config.Size;
      this.Gol = Number(MathUtils_1.MathUtils.LongToBigInt(t.yzs));
      this.Fol();
      this.Hll();
      this.UpdateCellDataReward(t.cOl);
      this.UpdateRemainReward(t.MM_);
    }
  }
  Fol() {
    this.Ool = [];
    for (let t = 0; t < this.f7; t++) {
      var e = new ScratchTicketCellData_1.ScratchTicketCellData(t);
      this.Ool.push(e);
    }
  }
  Hll() {
    this.Vll.clear();
    this.Config.RewardSortList.forEach((t, e) => {
      this.Vll.set(t, e);
    });
  }
  UpdateCellDataReward(t) {
    for (const i of Object.keys(t)) {
      var e = Number.parseInt(i);
      if (!(e < 0) && !(e >= this.Ool.length)) {
        this.Ool[e].SetRewardItem(t[i]);
        this.Y2i++;
      }
    }
  }
  UpdateRemainReward(t) {
    this.kol = [];
    for (const r of Object.keys(t)) {
      var e = Number.parseInt(r);
      var i = t[r];
      this.kol.push([{
        ItemId: e,
        IncId: 0
      }, i]);
    }
    this.kol.sort((t, e) => {
      return (this.Vll.get(t[0].ItemId) ?? Number.MAX_VALUE) - (this.Vll.get(e[0].ItemId) ?? Number.MAX_VALUE);
    });
  }
  UpdateRoundState(t) {
    if (TimeUtil_1.TimeUtil.GetServerTimeStamp() <= this.Gol || t !== 2) {
      this.Nol = 0;
    } else if (this.Y2i >= this.Config.Size * this.Config.Size) {
      this.Nol = 2;
    } else {
      this.Nol = 1;
    }
  }
  GetUnlockTime() {
    return this.Gol;
  }
  GetPreRoundState() {
    var t = ModelManager_1.ModelManager.ActivityScratchTicketModel.GetScratchRoundData(this.Config.PreRoundId);
    if (t === undefined) {
      return 2;
    } else {
      return t.GetRoundState();
    }
  }
  GetRoundState() {
    return this.Nol;
  }
  GetCellDataList() {
    return this.Ool;
  }
  GetRemainRewardList() {
    return this.kol;
  }
  GetRewardDataList(t) {
    var e = [];
    for (const s of Object.keys(t)) {
      var i = Number.parseInt(s);
      var r = t[s];
      var i = new RewardItemData_1.RewardItemData(i, r);
      e.push(i);
    }
    e.sort((t, e) => {
      return (this.Vll.get(t.ConfigId) ?? Number.MAX_VALUE) - (this.Vll.get(e.ConfigId) ?? Number.MAX_VALUE);
    });
    return e;
  }
  GetRewardResultList(t, e) {
    if (!this.Vol(t)) {
      return [];
    }
    switch (e) {
      case 0:
        return this.Hol(t, ActivityScratchTicketDefine_1.FIRST_SHOW_REWARD_INTERVAL, "HamsterA");
      case 1:
        return this.jol(t);
      case 3:
        return this.Wol(t);
      case 2:
        return this.Qol(t);
      case 5:
        return this.Kol(t);
      case 4:
        return this.$ol(t);
      case 6:
        return this.Xol(t);
      default:
        return [];
    }
  }
  Hol(t, e, i) {
    var r = [];
    if (this.Vol(t)) {
      t = this.Yol(t, 0, true);
      t = this.s0l([t], e, i);
      r.push(t);
    }
    return r;
  }
  jol(t) {
    var e = this.Hol(t, ActivityScratchTicketDefine_1.HAMSTER_B_SEQUENCE_INTERVAL, "HamsterB");
    this.a0l(e, t, false);
    this.oSl(e, ActivityScratchTicketDefine_1.TOUCH_BOUNDARY_INTERVAL, "InnerGlow");
    this.a0l(e, t, true);
    return e;
  }
  a0l(t, e, i) {
    var r = [];
    this.zol(r, e, 1, i);
    this.zol(r, e, 2, i);
    this.zol(r, e, 3, i);
    this.zol(r, e, 4, i);
    if (!(r.length <= 0)) {
      e = this.l0l(false, !i);
      i = this.s0l(r, e);
      t.push(i);
    }
  }
  $ol(t) {
    var e = this.Hol(t, ActivityScratchTicketDefine_1.HAMSTER_B_SEQUENCE_INTERVAL, "HamsterB");
    this.h0l(e, t, false);
    this.oSl(e, ActivityScratchTicketDefine_1.TOUCH_BOUNDARY_INTERVAL, "InnerGlow");
    this.h0l(e, t, true);
    return e;
  }
  h0l(t, e, i) {
    var r = [];
    this.zol(r, e, 1, i);
    this.zol(r, e, 2, i);
    this.zol(r, e, 3, i);
    this.zol(r, e, 4, i);
    this.zol(r, e, 5, i);
    this.zol(r, e, 6, i);
    this.zol(r, e, 7, i);
    this.zol(r, e, 8, i);
    if (!(r.length <= 0)) {
      e = this.l0l(false, !i);
      i = this.s0l(r, e);
      t.push(i);
    }
  }
  Wol(t) {
    var e = this.Hol(t, ActivityScratchTicketDefine_1.HAMSTER_B_SEQUENCE_INTERVAL, "HamsterB");
    this._0l(e, t, false);
    this.oSl(e, ActivityScratchTicketDefine_1.TOUCH_BOUNDARY_INTERVAL, "InnerGlow");
    this._0l(e, t, true);
    return e;
  }
  _0l(t, e, i) {
    var r = [];
    this.u0l(r, e, 1, i);
    this.u0l(r, e, 2, i);
    this.Zol(t, r, i);
  }
  Qol(t) {
    var e = this.Hol(t, ActivityScratchTicketDefine_1.HAMSTER_B_SEQUENCE_INTERVAL, "HamsterB");
    this.c0l(e, t, false);
    this.oSl(e, ActivityScratchTicketDefine_1.TOUCH_BOUNDARY_INTERVAL, "InnerGlow");
    this.c0l(e, t, true);
    return e;
  }
  c0l(t, e, i) {
    var r = [];
    this.u0l(r, e, 3, i);
    this.u0l(r, e, 4, i);
    this.Zol(t, r, i);
  }
  Kol(t) {
    var e = this.Hol(t, ActivityScratchTicketDefine_1.HAMSTER_B_SEQUENCE_INTERVAL, "HamsterB");
    this.m0l(e, t, false);
    this.oSl(e, ActivityScratchTicketDefine_1.TOUCH_BOUNDARY_INTERVAL, "InnerGlow");
    this.m0l(e, t, true);
    return e;
  }
  m0l(t, e, i) {
    var r = [];
    this.u0l(r, e, 3, i);
    this.u0l(r, e, 4, i);
    this.u0l(r, e, 1, i);
    this.u0l(r, e, 2, i);
    this.Zol(t, r, i);
  }
  Xol(t) {
    t = this.Hol(t, ActivityScratchTicketDefine_1.HAMSTER_C_SEQUENCE_INTERVAL, "HamsterC");
    this.d0l(t, false);
    this.oSl(t, ActivityScratchTicketDefine_1.TOUCH_BOUNDARY_INTERVAL, "InnerGlow");
    this.d0l(t, true);
    return t;
  }
  d0l(t, e) {
    var i;
    var r;
    var s = [];
    for (const a of this.GetCellDataList()) {
      if (!e || !!a.IsLock()) {
        i = this.Yol(a.Index, 0, true);
        s.push(i);
      }
    }
    if (s.length > 0) {
      r = this.l0l(false, !e);
      r = this.s0l(s, r);
      t.push(r);
    }
  }
  Zol(t, e, i) {
    let r = e;
    var s = this.l0l(false, !i);
    for (; r.length > 0;) {
      var a = this.s0l(r, s);
      t.push(a);
      var h = [];
      for (const n of r) {
        this.u0l(h, n.Index, n.DirectionType, i);
      }
      r = h;
    }
  }
  u0l(t, e, i, r) {
    let s = e;
    do {
      s = this.enl(s, i);
      var a = this.GetCellDataByIndex(s);
      if (a !== undefined) {
        if (!r || a.IsLock()) {
          a = this.Yol(s, i, r);
          t.push(a);
          return;
        }
      }
    } while (s >= 0);
  }
  zol(t, e, i, r) {
    var e = this.enl(e, i);
    var s = this.GetCellDataByIndex(e);
    if (s !== undefined && (!r || !!s.IsLock())) {
      s = this.Yol(e, i, r);
      t.push(s);
    }
  }
  oSl(t, e, i) {
    e = this.s0l([], e, i);
    t.push(e);
  }
  GetDiagonalResultList() {
    if (this.Nvl === undefined) {
      this.Nvl = [];
      var e = this.Config.Size;
      for (let t = 0; t < e * 2; t++) {
        this.Fvl(this.Nvl, t);
      }
    }
    return this.Nvl;
  }
  Fvl(t, e) {
    var i = [];
    for (let t = 0; t <= e; t++) {
      var r = e - t;
      var r = this.Vvl(t, r);
      if (!(r < 0)) {
        i.push({
          Index: r,
          DirectionType: 0,
          SequenceType: 7
        });
      }
    }
    var s = this.s0l(i, ActivityScratchTicketDefine_1.REVEAL_DELAY_INTERVAL);
    t.push(s);
  }
  Vol(t, e = 0) {
    return t >= 0 && t < this.f7;
  }
  s0l(t, e, i = "Empty") {
    return {
      RewardList: t,
      DelayInterval: e,
      SequenceName: i
    };
  }
  Yol(t, e, i) {
    return {
      Index: t,
      DirectionType: e,
      SequenceType: i ? ActivityScratchTicketDefine_1.directionToSequenceMap.get(e) : 6
    };
  }
  l0l(t, e) {
    if (t) {
      return ActivityScratchTicketDefine_1.FIRST_SHOW_REWARD_INTERVAL;
    } else if (e) {
      return ActivityScratchTicketDefine_1.CELL_SHOW_WARNING_INTERVAL;
    } else {
      return ActivityScratchTicketDefine_1.CELL_SHOW_REWRD_INTERVAL;
    }
  }
  GetCellDataByIndex(t) {
    if (this.Vol(t)) {
      return this.Ool[t];
    }
  }
  Vvl(t, e) {
    var i = this.Config.Size;
    if (e < 0 || i <= e || t < 0 || i <= t) {
      return -1;
    } else {
      return t * i + e;
    }
  }
  enl(t, e) {
    var i = this.Config.Size;
    let r = t % i;
    let s = Math.floor(t / i);
    switch (e) {
      case 0:
        break;
      case 3:
        s--;
        break;
      case 4:
        s++;
        break;
      case 1:
        r--;
        break;
      case 2:
        r++;
        break;
      case 5:
        s--;
        r--;
        break;
      case 6:
        s++;
        r--;
        break;
      case 7:
        s--;
        r++;
        break;
      case 8:
        s++;
        r++;
    }
    return this.Vvl(s, r);
  }
}
exports.ScratchTicketRoundData = ScratchTicketRoundData;
//# sourceMappingURL=ScratchTicketRoundData.js.map