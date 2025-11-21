"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldPassiveSkillCdData = exports.PassiveSkillCdData = undefined;
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PassiveSkillCdInfo_1 = require("./PassiveSkillCdInfo");
class PassiveSkillCdData {
  constructor() {
    this.SkillCdInfoMap = new Map();
    this.ServerSkillCd = new Map();
  }
  Clear() {
    this.SkillCdInfoMap.clear();
  }
}
exports.PassiveSkillCdData = PassiveSkillCdData;
class WorldPassiveSkillCdData {
  constructor() {
    this.EntitySkillCdMap = new Map();
    this.AllShareSkillCdData = new PassiveSkillCdData();
    this.OffRoleSkillCdMap = new Map();
  }
  Clear() {
    this.EntitySkillCdMap.clear();
    this.AllShareSkillCdData.Clear();
    this.OffRoleSkillCdMap.clear();
  }
  InitPassiveSkillCd(i, e) {
    let s = e.CdThreshold;
    if (s < 0) {
      s = CommonParamById_1.configCommonParamById.GetFloatConfig("PassiveSkillCdThreshold") ?? 0;
    }
    return this.InitSkillCdCommon(i, e.Id, e.CDTime, e.IsShareAllCdSkill, s);
  }
  InitSkillCdCommon(i, e, s, t, a) {
    let o = undefined;
    var r;
    var l;
    var n = i.Id;
    if (t) {
      o = this.AllShareSkillCdData;
    } else {
      l = undefined;
      if (!(o = this.EntitySkillCdMap.get(n))) {
        o = i.GetComponent(0).IsRole() && (r = i.GetComponent(0).GetPbDataId(), l = this.OffRoleSkillCdMap.get(r)) ? (this.OffRoleSkillCdMap.delete(r), l) : new PassiveSkillCdData();
        this.EntitySkillCdMap.set(n, o);
      }
    }
    let d = o.SkillCdInfoMap.get(e);
    if (!d) {
      (d = new PassiveSkillCdInfo_1.PassiveSkillCdInfo()).SkillId = e;
      d.SkillCd = s;
      if (a !== undefined) {
        d.Threshold = a;
      }
      d.IsShareAllCdSkill = t;
      d.CurMaxCd = 0;
      if (r = o.ServerSkillCd.get(e)) {
        if ((l = Time_1.Time.ServerTimeStamp) < r) {
          d.SkillCdFinishStampMap.set(n, Time_1.Time.FlowTime + (r - l));
        }
        o.ServerSkillCd.delete(e);
      }
      o.SkillCdInfoMap.set(e, d);
    }
    d.EntityIds.add(i.Id);
    return d;
  }
  RemoveEntity(i) {
    var e = i.Id;
    var s = this.EntitySkillCdMap.get(e);
    if (s && (this.EntitySkillCdMap.delete(e), i.GetComponent(0).IsRole())) {
      i = i.GetComponent(0).GetPbDataId();
      for (const t of s.SkillCdInfoMap.values()) {
        t.EntityIds.clear();
      }
      this.OffRoleSkillCdMap.set(i, s);
    }
    for (const a of this.AllShareSkillCdData.SkillCdInfoMap.values()) {
      a.EntityIds.delete(e);
    }
  }
  HandlePassiveSkillNotify(i) {
    var s = Time_1.Time.ServerTimeStamp;
    for (const r of i.jBs) {
      let [i, e] = this.nQe(r.Q6n);
      if (!e) {
        e = new PassiveSkillCdData();
        this.OffRoleSkillCdMap.set(r.Q6n, e);
      }
      for (const l of r.HBs) {
        var t;
        var a;
        var o = MathUtils_1.MathUtils.LongToNumber(l.$Bs);
        if (!(o <= s)) {
          t = MathUtils_1.MathUtils.LongToNumber(l.r5n);
          if ((a = e.SkillCdInfoMap.get(t)) && i) {
            a.SkillCdFinishStampMap.delete(i);
            a.SkillCdFinishStampMap.set(i, Time_1.Time.FlowTime + (o - s));
          } else {
            e.ServerSkillCd.set(t, o);
          }
        }
      }
    }
  }
  nQe(i) {
    const e = this.OffRoleSkillCdMap.get(i);
    if (e) {
      return [undefined, e];
    }
    for (const [t, e] of this.EntitySkillCdMap) {
      var s = ModelManager_1.ModelManager.CharacterModel?.GetHandle(t);
      if (s?.Valid) {
        s = s.Entity;
        if (!e) {
          if (s.GetComponent(0).IsRole()) {
            if (s.GetComponent(0).GetPbDataId() === i) {
              return [t, e];
            }
          }
        }
      }
    }
    return [undefined, undefined];
  }
}
exports.WorldPassiveSkillCdData = WorldPassiveSkillCdData;
//# sourceMappingURL=PassiveSkillCdData.js.map