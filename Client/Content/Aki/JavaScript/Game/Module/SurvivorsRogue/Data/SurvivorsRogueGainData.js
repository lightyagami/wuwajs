"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueGainData = exports.SurvivorsItemGainData = exports.SurvivorsWeaponGainData = exports.SurvivorsRoleGainData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class SurvivorsGainData {
  constructor(t, e) {
    this.IncId = t;
    this.ConfigId = e;
    this.Type = 0;
  }
}
class SurvivorsRoleGainData extends SurvivorsGainData {
  constructor(t, e, o, r = 2) {
    super(t, e);
    this.IncId = t;
    this.ConfigId = e;
    this.Data = o;
    this.Type = r;
  }
  GetCurrentEvolveId() {
    return this.Data.dEd.at(-1) ?? 0;
  }
}
exports.SurvivorsRoleGainData = SurvivorsRoleGainData;
class SurvivorsWeaponGainData extends SurvivorsGainData {
  constructor(t, e, o, r = 1) {
    super(t, e);
    this.IncId = t;
    this.ConfigId = e;
    this.Data = o;
    this.Type = r;
  }
  GetCurrentEvolveId() {
    return this.Data.dEd.at(-1) ?? 0;
  }
  SetWeaponKillCount(t) {
    this.Data.qLd = t;
  }
  GetWeaponSpecialAttributeList() {
    var t = [];
    for (const o of this.Data.cEd) {
      var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponLv(o);
      var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetPropertyConfig(e.PropertyId);
      if (e.IsSpecial) {
        e = {
          WeaponLvId: o,
          AttrId: e.Id,
          SortId: e.Priority
        };
        t.push(e);
      }
    }
    t.sort((t, e) => t.SortId - e.SortId);
    return t;
  }
}
exports.SurvivorsWeaponGainData = SurvivorsWeaponGainData;
class SurvivorsItemGainData extends SurvivorsGainData {
  constructor(t, e, o, r = 0) {
    super(t, e);
    this.IncId = t;
    this.ConfigId = e;
    this.Data = o;
    this.Type = r;
  }
}
exports.SurvivorsItemGainData = SurvivorsItemGainData;
const PERMYRIAD_RATIO = 10000;
class SurvivorsRogueGainData {
  constructor() {
    this.Kwd = new Map();
    this.Xwd = new Map();
    this.WeaponGainMap = new Map();
    this.zwd = new Map();
    this.WeaponMaxCount = 0;
    this.WeaponUiMaxShowCount = CommonParamById_1.configCommonParamById.GetIntConfig("SurvivorsRogueWeaponUiMaxCount");
    this.WeaponUnlockWaves = [];
  }
  static Create() {
    return new SurvivorsRogueGainData();
  }
  InitGain(t, e, o) {
    this.Clear();
    for (const r of t) {
      this.AddGain(r);
    }
    this.WeaponMaxCount = e;
    this.WeaponUnlockWaves = o;
  }
  Clear() {
    this.Xwd.clear();
    this.WeaponGainMap.clear();
    this.zwd.clear();
    this.Kwd.clear();
    this.WeaponMaxCount = 0;
    this.WeaponUnlockWaves.length = 0;
  }
  AddGain(t) {
    var e = t;
    switch (e.R5n) {
      case "nEd":
        var o = new SurvivorsRoleGainData(t.w5n, t.v9n, e.nEd);
        this.Xwd.set(t.w5n, o);
        this.Kwd.set(t.w5n, o);
        if (o && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SurvivorsRogue", 37, "[SurvivorsRogue] 新增角色增益", ["Type", o.Type], ["Id", o.ConfigId], ["IncId", o.IncId]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueRoleGainUpdate, e.v9n);
        break;
      case "sEd":
        o = new SurvivorsWeaponGainData(t.w5n, t.v9n, e.sEd);
        this.WeaponGainMap.set(t.w5n, o);
        this.Kwd.set(t.w5n, o);
        if (o && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SurvivorsRogue", 37, "[SurvivorsRogue] 新增武器增益", ["Type", o.Type], ["Id", o.ConfigId], ["IncId", o.IncId]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueWeaponGainUpdate, e.v9n, true);
        break;
      case "aEd":
        o = new SurvivorsItemGainData(t.w5n, t.v9n, e.aEd);
        this.zwd.set(t.w5n, o);
        this.Kwd.set(t.w5n, o);
        if (o && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SurvivorsRogue", 37, "[SurvivorsRogue] 新增道具增益", ["Type", o.Type], ["Id", o.ConfigId], ["IncId", o.IncId]);
        }
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SurvivorsRogue", 37, "[SurvivorsRogue] 增益信息类型未实现", ["Type", e.R5n]);
        }
    }
  }
  UpdateGain(t) {
    if (this.Kwd.get(t.w5n)) {
      var e = t;
      switch (e.R5n) {
        case "nEd":
          this.Xwd.get(t.w5n).Data = e.nEd;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueRoleGainUpdate, e.v9n);
          break;
        case "sEd":
          var o = this.WeaponGainMap.get(t.w5n);
          var r = o.Data.F6n < e.sEd.F6n;
          o.Data = e.sEd;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueWeaponGainUpdate, e.v9n, r);
          break;
        case "aEd":
          this.zwd.get(t.w5n).Data = e.aEd;
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SurvivorsRogue", 37, "[SurvivorsRogue] 增益信息更新类型未实现", ["Type", e.R5n]);
          }
      }
    }
  }
  RemoveGain(t) {
    if (this.Kwd.get(t) && (this.Xwd.delete(t), this.WeaponGainMap.delete(t), this.zwd.delete(t), this.Kwd.delete(t), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("SurvivorsRogue", 37, "[SurvivorsRogue] 删除增益", ["IncId", t]);
    }
  }
  GetRoleGainData() {
    return this.Xwd.values().next().value;
  }
  GetItemGainList() {
    return Array.from(this.zwd.values());
  }
  GetWeaponGainList() {
    return Array.from(this.WeaponGainMap.values());
  }
  GetWeaponDataByWeaponId(t) {
    for (const e of this.WeaponGainMap.values()) {
      if (e.ConfigId === t) {
        return e;
      }
    }
  }
  GetWeaponBondOwnedWeaponId(t) {
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(t);
    if (e) {
      var o = e.BindWeaponsId;
      for (const r of this.WeaponGainMap.values()) {
        if (r.Data.mEd === 0) {
          if (o.includes(r.ConfigId)) {
            return r.ConfigId;
          }
          if (ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(r.ConfigId)?.BindWeaponsId.includes(t)) {
            return r.ConfigId;
          }
        }
      }
    }
    return 0;
  }
  GetWeaponGainListWithBondInfo(t = this.GetWeaponGainList()) {
    const e = new Map();
    t.forEach(t => e.set(t.ConfigId, t));
    var o;
    var r;
    var i;
    var s = [];
    var a = new Set();
    for (const n of t) {
      if (!a.has(n.IncId)) {
        r = (o = (o = n.Data.mEd) > 0 ? e.get(o) : undefined) !== undefined && !a.has(o.IncId);
        i = {
          WeaponData: n,
          BondPosition: r ? 1 : 0
        };
        s.push(i);
        a.add(n.IncId);
        if (r) {
          s.push({
            WeaponData: o,
            BondPosition: -1
          });
          a.add(o.IncId);
        }
      }
    }
    return s;
  }
  GetWeaponGridDataList(e = this.GetWeaponGainListWithBondInfo(), o = this.WeaponMaxCount) {
    var r;
    var i;
    var s = [];
    var a = Math.max(this.WeaponUiMaxShowCount, o);
    for (let t = 0; t < a; t++) {
      if (e.length <= t) {
        if (o <= t) {
          s.push({
            IsLock: false,
            IsDisable: true
          });
        } else {
          r = this.WeaponUnlockWaves.at(t);
          s.push({
            IsLock: true,
            IsDisable: false,
            UnlockBatch: r
          });
        }
      } else {
        i = {
          WeaponData: (r = e[t]).WeaponData,
          IsLock: false,
          IsDisable: false,
          BondPosition: r.BondPosition
        };
        s.push(i);
      }
    }
    return s;
  }
  GetRoleSpecialPropertyValue(e) {
    var t = this.GetRoleGainData();
    if (!t) {
      return 0;
    }
    let o = 0;
    t.Data.cEd.forEach(t => {
      var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRoleLv(t);
      if (t.PropertyId === e && t.BuffCategoryType === 1) {
        t = t.PropertyValue / PERMYRIAD_RATIO;
        o += t;
      }
    });
    return o;
  }
}
exports.SurvivorsRogueGainData = SurvivorsRogueGainData;
//# sourceMappingURL=SurvivorsRogueGainData.js.map