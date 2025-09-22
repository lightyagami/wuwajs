"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingShowData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
class LoadingShowData {
  constructor() {
    this.uvi = [];
    this.cvi = 0;
    this.mvi = 0;
    this.dvi = [];
    this.hLt = 0;
    this.PGc = 0;
    this._Ui = 0;
    this.L9e = 0;
    this.Zed = 0;
  }
  Initialize() {
    this.Cvi();
    this.dvi = [...this.uvi];
    this.mvi = this.dvi.reduce((e, t) => e + t.Weight, 0);
  }
  gvi(e) {
    e = [...new Set(e)];
    e = e[Math.floor(Math.random() * (e.length - 1))];
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Loading", 71, "获取loading界面数据", ["id", e.LevelAreaId]);
    }
    return e.ImageId;
  }
  Cvi() {
    this.DGc();
    var e = [];
    var t = ModelManager_1.ModelManager.LoadingModel.GetSpecifiedLoadingConfig();
    var r = this.xGc();
    if (t) {
      e.push(t.Id);
      ModelManager_1.ModelManager.LoadingModel.ClearSpecifiedLoadingConfig();
      this.Zed = t.DuringTime;
    } else if (r && r.length !== 0) {
      e.push(...r);
    } else {
      e.push(...this.UGc());
    }
    var i = [];
    for (const a of e) {
      i.push(...ConfigManager_1.ConfigManager.LoadingConfig.GetLoadingTipsTextList(a));
    }
    this.cvi = this.gvi(i);
    this.uvi = [];
    for (const o of i) {
      if (o.ImageId === this.cvi) {
        this.uvi.push(o);
      }
    }
  }
  xGc() {
    var e = ModelManager_1.ModelManager.LoadingModel.GetLoadingConfigId();
    if (e && e.length !== 0) {
      var t;
      var r;
      var i = [];
      for (const a of ConfigManager_1.ConfigManager.LoadingConfig.GetLevelArea()) {
        if (a.Type === 1 && (t = this.PGc >= a.LevelRange[0] && this.PGc <= a.LevelRange[1], r = e.includes(a.Id), t && r)) {
          i.push(a.Id);
        }
      }
      return i;
    }
  }
  DGc() {
    var e;
    this.PGc = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerLevel();
    this._Ui = ModelManager_1.ModelManager.GameModeModel.MapId;
    this.L9e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
    if (ModelManager_1.ModelManager.LoadingModel.TargetTeleportId !== 0 && ModelManager_1.ModelManager.LoadingModel.TargetTeleportId !== undefined && (e = ConfigManager_1.ConfigManager.MapConfig.GetTeleportConfigById(ModelManager_1.ModelManager.LoadingModel.TargetTeleportId), ModelManager_1.ModelManager.LoadingModel.TargetTeleportId = 0, e) && (e = ModelManager_1.ModelManager.CreatureModel?.GetEntityData(e.TeleportEntityConfigId, e.MapId)) !== undefined) {
      this.L9e = e.AreaId;
    }
  }
  UGc() {
    var e;
    var t;
    var r;
    var i;
    var a = ConfigManager_1.ConfigManager.LoadingConfig.GetLevelArea();
    var o = [];
    var n = [];
    for (const g of a) {
      if (g.Id !== 1 && g.Type === 0 && (e = this.PGc >= g.LevelRange[0] && this.PGc <= g.LevelRange[1], t = g.MapId.includes(this._Ui), r = g.AreaId.includes(this.L9e), i = g.ConditionGroup === 0 || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(g.ConditionGroup.toString(), undefined), e && t && i && o.push(g), e && r && i)) {
        n.push(g);
      }
    }
    var s = o.length > 0 ? o : n;
    var h = s.filter(e => e.IsLimitShow);
    var s = s.filter(e => !e.IsLimitShow);
    if (h.length > 0 && h.filter(e => {
      e = ModelManager_1.ModelManager.ActivityModel?.GetActivityById(e.ActivityId);
      return e !== undefined && e.CheckIfInOpenTime();
    }).length > 0) {
      return h.map(e => e.Id);
    }
    if (s.length === 0) {
      return [a[0].Id];
    } else {
      return s.map(e => e.Id);
    }
  }
  pvi() {
    let t = this.mvi * Math.random();
    for (let e = 0; e < this.dvi.length; ++e) {
      var r = this.dvi[e];
      if (!(t > r.Weight)) {
        return e;
      }
      t -= r.Weight;
    }
    return 0;
  }
  GetNextTip() {
    if (this.uvi.length !== 0) {
      if (this.uvi.length === 1) {
        return this.uvi[0];
      }
      let e = -1;
      while ((e = this.pvi()) === this.hLt);
      this.hLt = e;
      return this.uvi[this.hLt];
    }
  }
  GetImageId() {
    return this.cvi;
  }
  GetTipCount() {
    return this.uvi.length;
  }
  GetDuringTime() {
    return this.Zed;
  }
}
exports.LoadingShowData = LoadingShowData;
//# sourceMappingURL=LoadingShowData.js.map