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
    for (const v of e) {
      var r = v.r6n;
      for (const M of v.Uxs) {
        var a = this.vLl(r, M);
        this.cWl.delete(a);
        this.Ox_.delete(a);
        this.Op1.delete(a);
      }
    }
    for (const p of t) {
      var i = p.qb_;
      var s = p.Ob_;
      var o = p.X4_;
      for (const u of new Set(Array.from(Object.keys(i).concat(Object.keys(s)).concat(Object.keys(o))))) {
        var n = Number(u);
        var l = o[n] ? 5 : i[n];
        var h = this.vLl(p.r6n, n);
        if (l !== undefined) {
          this.cWl.set(h, l);
        }
        if (s[n] !== undefined) {
          this.Ox_.set(h, s[n]);
        }
        if (o[n] !== undefined) {
          this.Op1.set(h, o[n]);
        } else {
          this.Op1.delete(h);
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
    var a = this.vLl(e, t);
    this.fLl.set(a, r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LevelPlayReportDetailUpdate, e, t);
  }
  GetVar(e, t, r) {
    e = this.vLl(e, t);
    t = this.fLl.get(e);
    if (t !== undefined) {
      var a = t[r];
      if (a !== undefined) {
        let e = undefined;
        switch ((0, IVar_1.getVarTypeByIndex)(a.iTs)) {
          case "Boolean":
            e = a.rTs;
            break;
          case "Float":
            e = a.sTs;
            break;
          case "Int":
            e = MathUtils_1.MathUtils.LongToNumber(a.oTs);
            break;
          case "String":
            e = a.nTs;
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
    for (const a of ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetLevelPlayReportConfig(t)?.Vars ?? []) {
      if (!this.GetVar(e, t, a)) {
        r = 0;
      }
    }
    return r === 1;
  }
  HaveLevelPlayReportRewardCanGet(e, t) {
    var r = ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetLevelPlayReportConfig(t);
    var a = this.GetSimpleReportMsg(e, t)?.Fb_ ?? 0;
    let i = 0;
    for (const s of r.Vars) {
      if (this.GetVar(e, t, s)) {
        i += 1;
      }
    }
    return a < i;
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
    var a = ConfigManager_1.ConfigManager.WorldMapConfig.GetPunishReportConfig(t);
    var i = a?.CondDescription1 ?? "";
    var s = a?.CondDescription2 ?? "";
    var a = a?.CondDescription3 ?? "";
    r.ConditionTxtIds.push(i);
    r.ConditionTxtIds.push(s);
    r.ConditionTxtIds.push(a);
    var i = this.GetSimpleReportMsg(e, t);
    r.GetBoxNum = i?.Fb_ ?? 0;
    return r;
  }
}
exports.LevelPlayReportModel = LevelPlayReportModel;
//# sourceMappingURL=LevelPlayReportModel.js.map