"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoRunModel = exports.GmDataLayerInfo = exports.TeleportInfo = undefined;
const Log_1 = require("../../../Core/Common/Log");
const DataLayerConfigById_1 = require("../../../Core/Define/ConfigQuery/DataLayerConfigById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
class TeleportInfo {
  constructor(e, t) {
    this.Location = e;
    this.Rotator = t;
  }
}
exports.TeleportInfo = TeleportInfo;
class GmDataLayerInfo {
  constructor(e, t) {
    this.LoadDataLayers = e;
    this.UnloadDataLayers = t;
  }
}
exports.GmDataLayerInfo = GmDataLayerInfo;
class AutoRunModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.$Ke = "Stopped";
    this.YKe = "Disabled";
    this.JKe = Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid;
    this.zKe = 0;
    this.ZKe = 0;
    this.ShouldTpAfterSkip = false;
    this.ShouldFastSkip = false;
    this.eQe = new Map();
    this.tQe = new Map();
    this.dKs = new Map();
  }
  OnInit() {
    this.YKe = "Disabled";
    this.JKe = Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid;
    this.zKe = 0;
    return !(this.ZKe = 0);
  }
  OnClear() {
    this.ClearAllOverrideTpInfo();
    this.ClearAllGuaranteeTpInfo();
    this.ClearCachedDataLayerInfo();
    return true;
  }
  GetAutoRunState() {
    return this.$Ke;
  }
  SetAutoRunState(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Gm", 39, "[Gm一键推进] AutoRunState改变", ["原AutoRunState", this.$Ke], ["新AutoRunState", e]);
    }
    if (this.$Ke !== e) {
      this.$Ke = e;
      ModelManager_1.ModelManager.SundryModel.IsBlockTips = this.IsInLogicTreeGmMode();
      ModelManager_1.ModelManager.GuideModel.SetGmLock(this.IsInLogicTreeGmMode());
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GmAutoModeChange, e);
    }
  }
  IsInLogicTreeGmMode() {
    return this.YKe !== "Disabled" && this.$Ke === "Running";
  }
  IsInAfterRunningState() {
    return this.YKe !== "Disabled" && this.$Ke === "AfterRunning";
  }
  IsInServerControlGmMode() {
    return this.YKe === "ServerControlledSkip";
  }
  GetAutoRunMode() {
    return this.YKe;
  }
  SetAutoRunMode(e, t = Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid, o = 0, r = 0) {
    this.YKe = e;
    this.JKe = t;
    this.zKe = o;
    this.ZKe = r;
  }
  StopAutoRunAndClearInfo() {
    this.SetAutoRunState("Stopped");
    this.ClearAutoRunInfo();
  }
  ClearAutoRunInfo() {
    this.SetAutoRunMode("Disabled");
    this.ShouldFastSkip = false;
    this.ShouldTpAfterSkip = false;
    this.ShouldTpAfterSkip = false;
    this.ClearAllOverrideTpInfo();
    this.ClearAllGuaranteeTpInfo();
    this.ClearCachedDataLayerInfo();
  }
  GetGmSkipTreeType() {
    return this.JKe;
  }
  GetGmSkipTreeConfigId() {
    return this.zKe;
  }
  GetGmSkipNodeId() {
    return this.ZKe;
  }
  GetGuaranteeTpInfo(e) {
    e = e ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return this.tQe.get(e);
  }
  SetGuaranteeTpInfo(e, t) {
    t = t ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Gm", 39, "[Gm一键推进] 设置保底传送信息", ["地图Id", t], ["旧值", this.tQe.get(t)], ["新值", e]);
    }
    if (e) {
      this.tQe.set(t, e);
    } else {
      this.tQe.delete(t);
    }
  }
  ClearAllGuaranteeTpInfo() {
    this.tQe.clear();
  }
  GetOverrideTpInfo(e) {
    e = e ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return this.eQe.get(e);
  }
  SetOverrideTpInfo(e, t) {
    t = t ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Gm", 39, "[Gm一键推进] 设置覆盖传送信息", ["地图Id", t], ["旧值", this.eQe.get(t)], ["新值", e]);
    }
    if (e) {
      this.eQe.set(t, e);
    } else {
      this.eQe.delete(t);
    }
  }
  ClearAllOverrideTpInfo() {
    this.eQe.clear();
  }
  GetCachedDataLayerInfo(e) {
    e = e ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return this.dKs.get(e);
  }
  UpdateCachedDataLayerInfo(t, o, r) {
    if (t.length || o.length) {
      var n;
      var s;
      var r = r ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      var i = new Array();
      var a = new Array();
      for (const h of t) {
        if (typeof h == "string") {
          i.push(h);
        } else if (n = DataLayerConfigById_1.configDataLayerConfigById.GetConfig(h)) {
          i.push(n.DataLayer);
        }
      }
      for (const u of o) {
        if (typeof u == "string") {
          a.push(u);
        } else if (s = DataLayerConfigById_1.configDataLayerConfigById.GetConfig(u)) {
          a.push(s.DataLayer);
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Gm", 39, "[Gm一键推进] 更新缓存的DataLayer信息", ["地图Id", r], ["加载", i], ["卸载", a]);
      }
      let e = this.dKs.get(r);
      if (!e) {
        e = new GmDataLayerInfo(new Set(), new Set());
        this.dKs.set(r, e);
      }
      for (const d of i) {
        e.LoadDataLayers.add(d);
        e.UnloadDataLayers.delete(d);
      }
      for (const l of a) {
        e.UnloadDataLayers.add(l);
        e.LoadDataLayers.delete(l);
      }
    }
  }
  ClearCachedDataLayerInfo() {
    this.dKs.clear();
  }
}
exports.AutoRunModel = AutoRunModel;
//# sourceMappingURL=AutoRunModel.js.map