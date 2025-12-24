"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryRoleEquipData = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../HonamiStoryUtil");
const HonamiStoryRoleEquipSlotData_1 = require("./HonamiStoryRoleEquipSlotData");
class HonamiStoryRoleEquipData {
  constructor(t) {
    this.dFe = 0;
    this.L6d = -1;
    this.VYc = [];
    this.IRr = 0;
    this.dgt = new Map();
    this.IRr = t;
  }
  GetEquipItemDataList() {
    var t = [];
    for (const o of this.VYc) {
      var e = o.GetItemData();
      if (e !== undefined) {
        t.push(e);
      }
    }
    return t;
  }
  GetCurPowerLevel(t = true) {
    var e = this.GetEquipItemDataList();
    return this.GetPowerLevelByItemList(e, t);
  }
  GetPowerLevelByItemList(e, t) {
    if (this.dFe <= 0) {
      return 0;
    }
    let o = 0;
    var r;
    var i;
    var n = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponData(this.L6d);
    var s = new Map();
    var a = t ? 0 : HonamiStoryDefine_1.HONAMI_ROLE_VIRTUAL_SCORE;
    for (const v of e) {
      o += v.GetBaseEnhance();
      var h;
      var u = v.GetGroupId();
      if (HonamiStoryUtil_1.HonamiStoryUtil.CheckRolePowerValid(v.GetRoleId(), this.GetParentRoleId())) {
        if (u === 0) {
          o += v.GetRoleEnhance() + a;
        } else {
          h = s.get(u) ?? 0;
          s.set(u, Math.max(h, v.GetRoleEnhance() + a));
        }
      }
      if (n && n.PluginTags.includes(v.GetWeaponTag())) {
        if (u === 0) {
          o += v.GetWeaponEnhance();
        } else {
          h = s.get(u) ?? 0;
          s.set(u, Math.max(h, v.GetWeaponEnhance()));
        }
      }
    }
    for ([, r] of s) {
      o += r;
    }
    if (n) {
      let t = 0;
      for (const c of n.SuitId) {
        if (this.IsSuitActivate(c, e).IsActive) {
          i = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponSuitData(c);
          o += i.Enhance;
          t++;
        }
      }
      for (var [f, l] of n.ExtraSuitAddEnhanceLevel) {
        if (f <= t) {
          o += l;
        }
      }
    }
    return o;
  }
  GetParentRoleId() {
    return ModelManager_1.ModelManager.HonamiStoryModel.GetParentRoleId(this.dFe);
  }
  CheckItemBuffIsActive(t) {
    if (t.GetRoleId() !== 0) {
      return this.CheckRoleItemBuffIsActive(t);
    }
    if (t.GetGroupId() === 0) {
      return true;
    }
    let e = false;
    var o = this.GetEquipItemDataList();
    var r = new Map();
    for (const n of o) {
      const i = n.GetGroupId();
      if (i !== 0) {
        if (r.has(i)) {
          r.get(i).GetQuality();
          n.GetQuality();
        } else {
          r.set(i, n);
        }
      }
    }
    const i = t.GetGroupId();
    return e = r.has(i) && r.get(i).GetIncId() === t.GetIncId() ? true : e;
  }
  CheckRoleItemBuffIsActive(t) {
    var e = t.GetGroupId();
    var o = t.GetRoleId();
    if (e === 0 && HonamiStoryUtil_1.HonamiStoryUtil.CheckRolePowerValid(o, this.GetParentRoleId())) {
      return true;
    }
    let r = false;
    var i;
    var e = this.GetEquipItemDataList();
    var n = new Map();
    for (const a of e) {
      const s = a.GetGroupId();
      if (s !== 0 && (i = a.GetRoleId(), HonamiStoryUtil_1.HonamiStoryUtil.CheckRolePowerValid(i, this.GetParentRoleId()))) {
        if (n.has(s)) {
          n.get(s).GetQuality();
          a.GetQuality();
        } else {
          n.set(s, a);
        }
      }
    }
    const s = t.GetGroupId();
    return r = n.has(s) && n.get(s).GetIncId() === t.GetIncId() ? true : r;
  }
  SetItemData(t, e) {
    this.dgt.set(t, e);
    t = this.GetHonamiStoryPluginIndex(t);
    this.VYc[t].SetItemData(e);
  }
  GetItemDataByPosition(t) {
    return this.dgt.get(t);
  }
  RemoveItemData(t) {
    this.dgt.delete(t);
    t = this.GetHonamiStoryPluginIndex(t);
    this.VYc[t].SetItemData(undefined);
  }
  SetEquipData(t) {
    if (t) {
      this.dFe = t.Q6n ?? -1;
      this.L6d = t.I4d ?? -1;
      for (const r of t.q$d.sort((t, e) => t.T4d - e.T4d)) {
        var e;
        var o = r.T4d - 1;
        if (o >= this.VYc.length) {
          (e = new HonamiStoryRoleEquipSlotData_1.HonamiStoryRoleEquipSlotData(r.T4d)).SetIsUnlock(r.K6n);
          this.VYc.push(e);
        } else {
          this.VYc[o].SetIsUnlock(r.K6n);
        }
      }
    }
  }
  SetRoleInfo(t) {
    this.dFe = t;
  }
  SetWeaponInfo(t) {
    this.L6d = t;
  }
  GetRoleId() {
    return this.dFe;
  }
  GetPosition() {
    return this.IRr;
  }
  GetHonamiStoryPluginPosition(t) {
    return (this.IRr + 1) * HonamiStoryDefine_1.HONAMI_ROLE_SLOT_OFFSET + t + 1;
  }
  GetHonamiStoryPluginIndex(t) {
    return t - (this.IRr + 1) * HonamiStoryDefine_1.HONAMI_ROLE_SLOT_OFFSET - 1;
  }
  GetPluginList() {
    var t = [];
    for (const e of this.VYc) {
      t.push(e.GetItemData());
    }
    return t;
  }
  GetWeaponId() {
    return this.L6d;
  }
  GetUnlockCounts() {
    let t = 0;
    for (const e of this.VYc) {
      t += e.GetIsUnlock() ? 1 : 0;
    }
    return t;
  }
  GetSlotList() {
    return this.VYc;
  }
  GetEquipRoleItemList() {
    var t = [];
    for (const e of this.dgt) {
      if (e[1] && e[1].GetRoleId() !== 0) {
        t.push(e[1]);
      }
    }
    return t;
  }
  IsSuitActivate(t, e) {
    t = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponSuitData(t);
    if (!t) {
      return {
        IsActive: false,
        CurCount: 0,
        NeedCount: 0
      };
    }
    var o = t.WeaponPluginType;
    var t = t.NeedNum;
    let r = 0;
    if (e !== undefined) {
      for (const n of e) {
        if (n.GetSubType() === o) {
          r++;
        }
      }
    } else {
      for (const s of this.dgt) {
        var i = s[1];
        if (i && i.GetSubType() === o) {
          r++;
        }
      }
    }
    return {
      IsActive: r >= t,
      CurCount: r,
      NeedCount: t
    };
  }
  CheckEquipOnEmpty(t) {
    var e = [];
    let o = 0;
    for (const i of this.VYc) {
      var r = i.GetItemData();
      if (r !== undefined) {
        e.push(r);
      }
      if (!i.GetIsUnlock()) {
        break;
      }
      o++;
    }
    if (e.length >= o) {
      return 0;
    } else {
      e.push(t);
      return this.GetPowerLevelByItemList(e, false) - this.GetCurPowerLevel(false);
    }
  }
  GetNextEmptySlot() {
    for (const t of this.VYc) {
      if (t.GetIsUnlock() && t.GetItemData() === undefined) {
        return this.GetHonamiStoryPluginPosition(t.GetSlotId() - 1);
      }
    }
    return -1;
  }
  CheckEquipInstead(o) {
    let t = -1;
    let r = this.GetCurPowerLevel();
    let i = undefined;
    var n = [];
    for (const h of this.VYc) {
      var e = h.GetItemData();
      if (e) {
        n.push(e);
      }
    }
    for (let e = 0; e < n.length; e++) {
      var s = [];
      for (let t = 0; t < n.length; t++) {
        if (e === t) {
          s.push(o);
        } else {
          s.push(n[t]);
        }
      }
      var a = this.GetPowerLevelByItemList(s, false);
      if (a > r) {
        t = e;
        r = a;
        i = n[e];
      }
    }
    return [t !== -1 ? this.GetHonamiStoryPluginPosition(t) : -1, Math.max(0, r - this.GetCurPowerLevel(false)), i];
  }
}
exports.HonamiStoryRoleEquipData = HonamiStoryRoleEquipData;
//# sourceMappingURL=HonamiStoryRoleEquipData.js.map