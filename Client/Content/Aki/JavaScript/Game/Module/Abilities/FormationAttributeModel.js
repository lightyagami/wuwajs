"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationAttributeModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const FormationPropertyAll_1 = require("../../../Core/Define/ConfigQuery/FormationPropertyAll");
const FormationPropertyById_1 = require("../../../Core/Define/ConfigQuery/FormationPropertyById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
class FormationAttributeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.pK = new Map();
    this.zBe = new Map();
    this.BoundsLockerMap = new Map();
  }
  GetConfig(e) {
    var t;
    var r = this.pK.get(e);
    if (!r) {
      r = {
        RawConfig: t = FormationPropertyById_1.configFormationPropertyById.GetConfig(e),
        ForbidIncreaseTags: (t.MarkTag ?? []).map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e)),
        ForbidDecreaseTags: (t.ResistTag ?? []).map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))
      };
      this.pK.set(e, r);
    }
    return r;
  }
  OnInit() {
    var e = Time_1.Time.WorldTime;
    for (const t of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
      this.zBe.set(t.Id, {
        Max: t.InitMax,
        BaseMax: t.InitMax,
        Value: t.InitValue,
        Speed: t.InitRecoveryRate,
        BaseSpeed: t.InitRecoveryRate,
        Timestamp: e
      });
    }
    return true;
  }
  OnClear() {
    this.pK.clear();
    this.zBe.clear();
    return true;
  }
  GetValue(e) {
    var t;
    var r;
    var i = this.GetData(e);
    if (i) {
      r = this.GetPredictedServerStopTime() - i.Timestamp;
      if ((t = i.Speed) === 0 || r <= 0) {
        return i.Value;
      } else {
        r = r * CommonDefine_1.SECOND_PER_MILLIONSECOND * t;
        return this.ClampValue(e, i.Value + r, 0, i.Max);
      }
    } else {
      return 0;
    }
  }
  GetMax(e) {
    return this.GetData(e)?.Max ?? 0;
  }
  GetBaseMax(e) {
    return this.GetData(e)?.BaseMax ?? 0;
  }
  GetBaseRate(e) {
    return this.GetData(e)?.BaseSpeed ?? 0;
  }
  GetSpeed(e) {
    return this.GetData(e)?.Speed ?? 0;
  }
  GetData(e) {
    var t = this.zBe.get(e);
    if (t) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CombatInfo", 19, "尝试读取不存在的队伍属性。", ["typeId", e]);
    }
  }
  SetData(e, t, r, i, o, a) {
    e = this.GetData(e);
    if (e) {
      e.Max = t;
      e.BaseMax = r;
      e.Value = i;
      e.Speed = o;
      e.Timestamp = a;
    }
  }
  SetSpeed(e, t) {
    var r = this.GetData(e);
    if (r) {
      e = this.GetValue(e);
      r.Timestamp = this.GetPredictedServerStopTime();
      r.Value = e;
      r.Speed = t;
    }
  }
  SetValue(e, t) {
    var r = this.GetData(e);
    if (r) {
      r.Timestamp = this.GetPredictedServerStopTime();
      r.Value = this.ClampValue(e, t, 0, r.Max);
    }
  }
  SetMax(e, t) {
    var r = this.zBe.get(e);
    if (r) {
      e = this.GetValue(e);
      r.Timestamp = this.GetPredictedServerStopTime();
      r.Value = Math.min(e, t);
      r.Max = t;
    }
  }
  ClampValue(e, t, r, i) {
    let o = t;
    let a = r;
    let s = i;
    var n;
    var t = this.BoundsLockerMap.get(e);
    if (t) {
      for (const h of t.values()) {
        if (h.LockLowerBounds) {
          n = h.LowerPercent * i + h.LowerOffset;
          a = Math.max(a ?? n, n);
        }
        if (h.LockUpperBounds) {
          n = h.UpperPercent * i + h.UpperOffset;
          s = Math.min(s ?? n, n);
        }
      }
    }
    if (s !== undefined) {
      o = Math.min(s, o);
    }
    return o = a !== undefined ? Math.max(a, o) : o;
  }
  AddBoundsLocker(e, t, r) {
    this.SetValue(e, this.GetValue(e));
    let i = this.BoundsLockerMap.get(e);
    if (!i) {
      this.BoundsLockerMap.set(e, i = new Map());
    }
    if (i.has(r) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 19, "重复添加队伍属性锁", ["attrId", e], ["handle", r]);
    }
    i.set(r, t);
    this.SetValue(e, this.GetValue(e));
    return r;
  }
  RemoveBoundsLocker(e, t) {
    this.SetValue(e, this.GetValue(e));
    var r = this.BoundsLockerMap.get(e);
    return !!r && !!r.delete(t) && !(this.SetValue(e, this.GetValue(e)), 0);
  }
  GetPredictedServerStopTime() {
    return Time_1.Time.ServerCombatStopTime;
  }
}
exports.FormationAttributeModel = FormationAttributeModel;
//# sourceMappingURL=FormationAttributeModel.js.map