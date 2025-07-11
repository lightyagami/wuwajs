"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingShowData = undefined;
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
  }
  Initialize() {
    this.Cvi();
    this.dvi = [...this.uvi];
    this.mvi = this.dvi.reduce((t, e) => t + e.Weight, 0);
  }
  gvi(t) {
    var e = new Set();
    for (const i of t) {
      e.add(i.ImageId);
    }
    var t = Array.from(e.values());
    var r = Math.random();
    return t[Math.round(r * (t.length - 1))];
  }
  Cvi() {
    this.DGc();
    var t = [];
    var e = this.xGc();
    if (e && e.length !== 0) {
      t.push(...e);
    } else {
      t.push(...this.UGc());
    }
    var r = [];
    for (const i of t) {
      r.push(...ConfigManager_1.ConfigManager.LoadingConfig.GetLoadingTipsTextList(i));
    }
    this.cvi = this.gvi(r);
    this.uvi = [];
    for (const a of r) {
      if (a.ImageId === this.cvi) {
        this.uvi.push(a);
      }
    }
  }
  xGc() {
    var t = ModelManager_1.ModelManager.LoadingModel.GetLoadingConfigId();
    if (t && t.length !== 0) {
      var e;
      var r;
      var i = [];
      for (const a of ConfigManager_1.ConfigManager.LoadingConfig.GetLevelArea()) {
        if (a.Type === 1 && (e = this.PGc >= a.LevelRange[0] && this.PGc <= a.LevelRange[1], r = t.includes(a.Id), e && r)) {
          i.push(a.Id);
        }
      }
      return i;
    }
  }
  DGc() {
    var t;
    this.PGc = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerLevel();
    this._Ui = ModelManager_1.ModelManager.GameModeModel.MapId;
    this.L9e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
    if (ModelManager_1.ModelManager.LoadingModel.TargetTeleportId !== 0 && ModelManager_1.ModelManager.LoadingModel.TargetTeleportId !== undefined && (t = ConfigManager_1.ConfigManager.MapConfig.GetTeleportConfigById(ModelManager_1.ModelManager.LoadingModel.TargetTeleportId), ModelManager_1.ModelManager.LoadingModel.TargetTeleportId = 0, t) && (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityData(t.TeleportEntityConfigId, t.MapId)) !== undefined) {
      this.L9e = t.AreaId;
    }
  }
  UGc() {
    var t;
    var e;
    var r;
    var i;
    var a = ConfigManager_1.ConfigManager.LoadingConfig.GetLevelArea();
    var o = [];
    var s = [];
    for (const M of a) {
      if (M.Id !== 1 && M.Type === 0 && (t = this.PGc >= M.LevelRange[0] && this.PGc <= M.LevelRange[1], e = M.MapId.includes(this._Ui), r = M.AreaId.includes(this.L9e), i = M.ConditionGroup === 0 || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(M.ConditionGroup.toString(), undefined), t && e && i && o.push(M), t && r && i)) {
        s.push(M);
      }
    }
    var n = o.length > 0 ? o : s;
    var h = n.filter(t => t.IsLimitShow);
    var n = n.filter(t => !t.IsLimitShow);
    if (h.length > 0 && h.filter(t => {
      t = ModelManager_1.ModelManager.ActivityModel?.GetActivityById(t.ActivityId);
      return t !== undefined && t.CheckIfInOpenTime();
    }).length > 0) {
      return h.map(t => t.Id);
    }
    if (n.length === 0) {
      return [a[0].Id];
    } else {
      return n.map(t => t.Id);
    }
  }
  pvi() {
    let e = this.mvi * Math.random();
    for (let t = 0; t < this.dvi.length; ++t) {
      var r = this.dvi[t];
      if (!(e > r.Weight)) {
        return t;
      }
      e -= r.Weight;
    }
    return 0;
  }
  GetNextTip() {
    if (this.uvi.length !== 0) {
      if (this.uvi.length === 1) {
        return this.uvi[0];
      }
      let t = -1;
      while ((t = this.pvi()) === this.hLt);
      this.hLt = t;
      return this.uvi[this.hLt];
    }
  }
  GetImageId() {
    return this.cvi;
  }
  GetTipCount() {
    return this.uvi.length;
  }
}
exports.LoadingShowData = LoadingShowData;
//# sourceMappingURL=LoadingShowData.js.map