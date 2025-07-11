"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsGroupMatchData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RacingBetsLegMatchData_1 = require("./RacingBetsLegMatchData");
class RacingBetsGroupMatchData {
  constructor() {
    this.Id = 0;
    this.HIc = undefined;
    this.$Ic = [];
    this.kxh = 1;
    this.Dxc = [];
  }
  Init(t) {
    this.Id = t.ZZ_;
    this.HIc = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsGroupMatch(this.Id);
    this.kxh = this.HIc.Type;
    this.QIc(t.tJ_);
    this.Dxc = t.iJ_;
  }
  Refresh(t) {
    this.Dxc = t.iJ_;
  }
  QIc(t) {
    this.$Ic = [];
    for (const r of t) {
      var e = new RacingBetsLegMatchData_1.RacingBetsLegMatchData();
      e.Init(r, this);
      this.$Ic.push(e);
    }
  }
  RefreshGroupMatchResult(t) {
    this.Dxc = t.eJ_.slice(0, t.YP1);
  }
  GetLegMatchList() {
    return this.$Ic;
  }
  GetPromoteDangoList() {
    return this.Dxc;
  }
  SetPromoteDangoList(t) {
    this.Dxc = t;
  }
  GetCellRoleList() {
    return this.HIc.DangoList;
  }
  IsBasicGroupMatch() {
    return this.HIc.DangoList.length > 0;
  }
  get MatchType() {
    return this.kxh;
  }
  IsGroupMatchFinished() {
    return this.Dxc && this.Dxc.length > 0;
  }
  GetLastGroupMatchIdList() {
    var t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    if (t) {
      return t.GetLastGroupMatchIdList(this.Id);
    } else {
      return [];
    }
  }
  GetInGameDangoList() {
    var t = this.GetCellRoleList();
    if (t.length > 0) {
      return t;
    }
    t = this.GetLegMatchList();
    if (t.length > 0) {
      t = t[0].GetDangoActorDataList();
      if (t.length > 0) {
        return t.map(t => t.DangoId);
      }
    }
    t = this.GetLastGroupMatchIdList();
    if (t.length === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RacingBets", 78, "获取上一场小组赛Id列表为空", ["groupMatchId", this.Id]);
      }
      return [];
    }
    var e = [];
    for (const i of t) {
      var r = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsGroupMatchData(i);
      if (r) {
        e.push(...r.GetPromoteDangoList());
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RacingBets", 78, "获取上一场小组赛数据失败", ["groupMatchId", i]);
      }
    }
    return e;
  }
}
exports.RacingBetsGroupMatchData = RacingBetsGroupMatchData;
//# sourceMappingURL=RacingBetsGroupMatchData.js.map