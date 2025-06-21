"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsGroupMatchData = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RacingBetsLegMatchData_1 = require("./RacingBetsLegMatchData");
class RacingBetsGroupMatchData {
  constructor() {
    this.Id = 0, this.HIc = void 0, this.$Ic = [], this.kxh = 1, this.Dxc = []
  }
  Init(t) {
    this.Id = t.ZZ_, this.HIc = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsGroupMatch(this.Id), this.kxh = this.HIc.Type, this.QIc(t.tJ_), this.Dxc = t.iJ_
  }
  Refresh(t) {
    this.Dxc = t.iJ_
  }
  QIc(t) {
    this.$Ic = [];
    for (const r of t) {
      var e = new RacingBetsLegMatchData_1.RacingBetsLegMatchData;
      e.Init(r, this), this.$Ic.push(e)
    }
  }
  RefreshGroupMatchResult(t) {
    this.Dxc = t.eJ_.slice(0, t.MP1)
  }
  GetLegMatchList() {
    return this.$Ic
  }
  GetPromoteDangoList() {
    return this.Dxc
  }
  SetPromoteDangoList(t) {
    this.Dxc = t
  }
  GetCellRoleList() {
    return this.HIc.DangoList
  }
  IsBasicGroupMatch() {
    return 0 < this.HIc.DangoList.length
  }
  get MatchType() {
    return this.kxh
  }
  IsGroupMatchFinished() {
    return this.Dxc && 0 < this.Dxc.length
  }
  GetLastGroupMatchIdList() {
    var t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    return t ? t.GetLastGroupMatchIdList(this.Id) : []
  }
  GetInGameDangoList() {
    var t = this.GetCellRoleList();
    if (0 < t.length) return t;
    t = this.GetLegMatchList();
    if (0 < t.length) {
      t = t[0].GetDangoActorDataList();
      if (0 < t.length) return t.map(t => t.DangoId)
    }
    t = this.GetLastGroupMatchIdList();
    if (0 === t.length) return Log_1.Log.CheckInfo() && Log_1.Log.Info("RacingBets", 78, "获取上一场小组赛Id列表为空", ["groupMatchId", this.Id]), [];
    var e = [];
    for (const i of t) {
      var r = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsGroupMatchData(i);
      r ? e.push(...r.GetPromoteDangoList()) : Log_1.Log.CheckInfo() && Log_1.Log.Info("RacingBets", 78, "获取上一场小组赛数据失败", ["groupMatchId", i])
    }
    return e
  }
}
exports.RacingBetsGroupMatchData = RacingBetsGroupMatchData;
//# sourceMappingURL=RacingBetsGroupMatchData.js.map