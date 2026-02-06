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
    this.WSd = new Map();
    this.U5f = new Map();
    this.x5f = new Map();
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
    for (const d of e) {
      var s = d.r6n;
      for (const p of d.Uxs) {
        var i = this.vLl(s, p);
        this.cWl.delete(i);
        this.Ox_.delete(i);
        this.Op1.delete(i);
        this.WSd.delete(i);
        this.U5f.delete(i);
        this.x5f.delete(i);
      }
    }
    for (const u of t) {
      var r = u.qb_;
      var a = u.Ob_;
      var o = u.X4_;
      var n = u.ASd;
      var h = u.U3f;
      for (const f of new Set(Array.from(Object.keys(r).concat(Object.keys(a)).concat(Object.keys(o)).concat(Object.keys(n)).concat(Object.keys(h))))) {
        var l = Number(f);
        var v = o[l] ? 5 : r[l];
        var M = this.vLl(u.r6n, l);
        if (v !== undefined) {
          this.cWl.set(M, v);
        }
        if (a[l] !== undefined) {
          this.Ox_.set(M, a[l]);
        }
        if (o[l] !== undefined) {
          this.Op1.set(M, o[l]);
        } else {
          this.Op1.delete(M);
        }
        if (n[l] !== undefined) {
          this.WSd.set(M, n[l]);
        } else {
          this.WSd.delete(M);
        }
        if (h[l] !== undefined) {
          this.U5f.set(M, h[l].Hff);
          this.x5f.set(M, h[l].jff);
        } else {
          this.U5f.delete(M);
          this.x5f.delete(M);
        }
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LevelPlayStateDetailUpdate);
  }
  UpdateLevelPlayRewardsMsg(e, t, s, i) {
    e = this.vLl(e, t);
    this.U5f.set(e, s);
    this.x5f.set(e, i);
  }
  UpdateLevelPlayRewardMsgByNotify(e) {
    for (var [t, s] of Object.entries(e.U3f)) {
      var i = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(Number(t));
      if (i !== undefined) {
        this.UpdateLevelPlayRewardsMsg(i.LevelId, Number(t), s.Hff, s.jff);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LevelPlayRewardDetailUpdate);
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
    return this.WSd.get(e) ?? false;
  }
  IsCommonLevelPlayComplete(e, t) {
    var s = this.vLl(e, t);
    return (this.cWl.get(s) ?? 0) === 3 || !((this.Ox_.get(s) ?? 0) <= 0) && ConfigManager_1.ConfigManager.MapConfig.GetMapMarkByRelativeId(t, e)?.HistoryState === 1;
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
  UpdateDetailReportMsg(e, t, s) {
    var i = this.vLl(e, t);
    this.fLl.set(i, s);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LevelPlayReportDetailUpdate, e, t);
  }
  GetVar(e, t, s) {
    e = this.vLl(e, t);
    t = this.fLl.get(e);
    if (t !== undefined) {
      var i = t[s];
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
    let s = 1;
    for (const i of ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetLevelPlayReportConfig(t)?.Vars ?? []) {
      if (!this.GetVar(e, t, i)) {
        s = 0;
      }
    }
    return s === 1;
  }
  HaveLevelPlayReportRewardCanGet(e, t) {
    var s = ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetLevelPlayReportConfig(t);
    var i = this.GetSimpleReportMsg(e, t)?.Fb_ ?? 0;
    let r = 0;
    for (const a of s.Vars) {
      if (this.GetVar(e, t, a)) {
        r += 1;
      }
    }
    return i < r;
  }
  GetLevelPlayReportTarget(e, t) {
    var s = {
      States: [],
      ConditionTxtIds: [],
      GetBoxNum: 0
    };
    for (const o of ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetLevelPlayReportConfig(t)?.Vars ?? []) {
      if (this.GetVar(e, t, o)) {
        s.States.push(1);
      } else {
        s.States.push(0);
      }
    }
    var i = ConfigManager_1.ConfigManager.WorldMapConfig.GetPunishReportConfig(t);
    var r = i?.CondDescription1 ?? "";
    var a = i?.CondDescription2 ?? "";
    var i = i?.CondDescription3 ?? "";
    s.ConditionTxtIds.push(r);
    s.ConditionTxtIds.push(a);
    s.ConditionTxtIds.push(i);
    var r = this.GetSimpleReportMsg(e, t);
    s.GetBoxNum = r?.Fb_ ?? 0;
    return s;
  }
  GetLevelPlayRewardNodeIds(e, t) {
    e = this.vLl(e, t);
    return this.U5f.get(e) ?? [];
  }
  GetLevelPlayRewardTreasureBoxIds(e, t) {
    e = this.vLl(e, t);
    return this.x5f.get(e) ?? [];
  }
}
exports.LevelPlayReportModel = LevelPlayReportModel;
//# sourceMappingURL=LevelPlayReportModel.js.map