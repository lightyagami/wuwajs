"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayReportModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IVar_1 = require("../../../UniverseEditor/Interface/IVar");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const MapUtil_1 = require("../Map/MapUtil");
class LevelPlayReportModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.gLl = new Map();
    this.pLl = new Map();
    this.fLl = new Map();
    this.cWl = new Map();
    this.Ox_ = new Map();
    this.Op1 = new Map();
    this.Lvd = new Map();
  }
  HasRequestDetail(e, t) {
    e = this.vLl(e, t);
    return this.gLl.get(e) ?? false;
  }
  SetRequestDetailFlag(e, t) {
    e = this.vLl(e, t);
    this.gLl.set(e, true);
  }
  ResetDetailRequestFlag() {
    this.gLl.clear();
  }
  vLl(e, t) {
    return MapUtil_1.MapUtil.GetGamePlayKey(e, t);
  }
  UpdateSimpleReportMsg(e) {
    this.pLl.clear();
    e.forEach(e => {
      var t = this.vLl(e.r6n, e._ps);
      this.pLl.set(t, e);
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LevelPlayReportSimpleUpdate);
  }
  GetSimpleReportMsgMap() {
    return this.pLl;
  }
  UpdateLevelPlayStateMsg(e, t) {
    for (const M of e) {
      var r = M.r6n;
      for (const p of M.Uxs) {
        var i = this.vLl(r, p);
        this.cWl.delete(i);
        this.Ox_.delete(i);
        this.Op1.delete(i);
        this.Lvd.delete(i);
      }
    }
    for (const u of t) {
      var s = u.qb_;
      var a = u.Ob_;
      var o = u.X4_;
      var n = u._vd;
      for (const f of new Set(Array.from(Object.keys(s).concat(Object.keys(a)).concat(Object.keys(o)).concat(Object.keys(n))))) {
        var l = Number(f);
        var h = o[l] ? 5 : s[l];
        var v = this.vLl(u.r6n, l);
        if (h !== undefined) {
          this.cWl.set(v, h);
        }
        if (a[l] !== undefined) {
          this.Ox_.set(v, a[l]);
        }
        if (o[l] !== undefined) {
          this.Op1.set(v, o[l]);
        } else {
          this.Op1.delete(v);
        }
        if (n[l] !== undefined) {
          this.Lvd.set(v, n[l]);
        } else {
          this.Lvd.delete(v);
        }
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LevelPlayStateDetailUpdate);
  }
  GetLevelPlayHideReason(e, t) {
    e = this.vLl(e, t);
    t = this.Op1.get(e);
    if (t !== undefined) {
      return ModelManager_1.ModelManager.MapModel.ParseHideReason(t);
    }
  }
  GetLevelPlayStateMsgMap() {
    return this.cWl;
  }
  GetLevelPlayIsUnlock(e, t) {
    e = this.vLl(e, t);
    return this.Lvd.get(e) ?? false;
  }
  IsCommonLevelPlayComplete(e, t) {
    var r = this.vLl(e, t);
    return (this.cWl.get(r) ?? 0) === 3 || !((this.Ox_.get(r) ?? 0) <= 0) && ConfigManager_1.ConfigManager.MapConfig.GetMapMarkByRelativeId(t, e)?.HistoryState === 1;
  }
  IsCommonLevelPlayHide(e, t) {
    e = this.vLl(e, t);
    return (this.cWl.get(e) ?? 0) === 5;
  }
  IsCommonLevelPlayDiscover(e, t) {
    return !!this.IsCommonLevelPlayComplete(e, t) || (e = this.vLl(e, t), (this.cWl.get(e) ?? 0) > 0);
  }
  GetSimpleReportMsg(e, t) {
    e = this.vLl(e, t);
    return this.pLl.get(e);
  }
  UpdateDetailReportMsg(e, t, r) {
    var i = this.vLl(e, t);
    this.fLl.set(i, r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LevelPlayReportDetailUpdate, e, t);
  }
  GetVar(e, t, r) {
    e = this.vLl(e, t);
    t = this.fLl.get(e);
    if (t !== undefined) {
      var i = t[r];
      if (i !== undefined) {
        let e = undefined;
        switch ((0, IVar_1.getVarTypeByIndex)(i.iTs)) {
          case "Boolean":
            e = i.rTs;
            break;
          case "Float":
            e = i.sTs;
            break;
          case "Int":
            e = MathUtils_1.MathUtils.LongToNumber(i.oTs);
            break;
          case "String":
            e = i.nTs;
            break;
          default:
            e = undefined;
        }
        return e;
      }
    }
  }
  IsLevelPlayReportComplete(e, t) {
    let r = 1;
    for (const i of ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetLevelPlayReportConfig(t)?.Vars ?? []) {
      if (!this.GetVar(e, t, i)) {
        r = 0;
      }
    }
    return r === 1;
  }
  HaveLevelPlayReportRewardCanGet(e, t) {
    var r = ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetLevelPlayReportConfig(t);
    var i = this.GetSimpleReportMsg(e, t)?.Fb_ ?? 0;
    let s = 0;
    for (const a of r.Vars) {
      if (this.GetVar(e, t, a)) {
        s += 1;
      }
    }
    return i < s;
  }
  GetLevelPlayReportTarget(e, t) {
    var r = {
      States: [],
      ConditionTxtIds: [],
      GetBoxNum: 0
    };
    for (const o of ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetLevelPlayReportConfig(t)?.Vars ?? []) {
      if (this.GetVar(e, t, o)) {
        r.States.push(1);
      } else {
        r.States.push(0);
      }
    }
    var i = ConfigManager_1.ConfigManager.WorldMapConfig.GetPunishReportConfig(t);
    var s = i?.CondDescription1 ?? "";
    var a = i?.CondDescription2 ?? "";
    var i = i?.CondDescription3 ?? "";
    r.ConditionTxtIds.push(s);
    r.ConditionTxtIds.push(a);
    r.ConditionTxtIds.push(i);
    var s = this.GetSimpleReportMsg(e, t);
    r.GetBoxNum = s?.Fb_ ?? 0;
    return r;
  }
}
exports.LevelPlayReportModel = LevelPlayReportModel;
//# sourceMappingURL=LevelPlayReportModel.js.map