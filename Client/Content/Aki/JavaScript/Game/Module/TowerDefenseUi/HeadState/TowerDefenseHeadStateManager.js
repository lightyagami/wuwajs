"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseHeadStateManager = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiLayer_1 = require("../../../Ui/UiLayer");
const TowerDefenseHeadStateData_1 = require("./TowerDefenseHeadStateData");
const TowerDefenseHeadStateDynamicBatchView_1 = require("./TowerDefenseHeadStateDynamicBatchView");
class TowerDefenseHeadStateManager {
  constructor() {
    this.rlt = new Map();
    this.h9c = [];
    this.l9c = [];
    this._9c = [];
    this.tue = [];
    this.u9c = undefined;
    this.Hri = 0;
    this.Lin = 0;
    this.c9c = undefined;
  }
  Init() {
    this.Hri = CommonParamById_1.configCommonParamById.GetIntConfig("TowerDefenseHeadStateShowMaxDistance");
    this.Lin = CommonParamById_1.configCommonParamById.GetIntConfig("TowerDefenseHeadStateShowMinDistance");
  }
  OnWorldDone() {
    this.LoadDynamicBatchView();
  }
  LoadDynamicBatchView() {
    this.c9c = new TowerDefenseHeadStateDynamicBatchView_1.TowerDefenseHeadStateDynamicBatchView();
    this.c9c.CreateThenShowByResourceIdAsync("UiItem_TowerDefenseHPDynamicBatch", UiLayer_1.UiLayer.WorldSpaceUiRootItem, true);
  }
  AddEntity(e, t, i, s, o) {
    var r;
    if (!this.rlt.has(e)) {
      (r = new TowerDefenseHeadStateData_1.TowerDefenseHeadStateData()).EntityId = e;
      r.UpdatePosition(t);
      r.UpdateHp(s, i, o);
      this.rlt.set(e, r);
      this.h9c.push(r);
      this.l9c.push(r);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("TowerDefenseBattle", 17, "塔防怪物添加血条", ["entityId", e]);
      }
    }
  }
  HandleMsg(e, t, i, s, o) {
    var r = this.rlt.get(e);
    if (r) {
      r.UpdatePosition(t);
      if (r.UpdateHp(s, i, o)) {
        this.l9c.push(r);
      }
    } else {
      this.AddEntity(e, t, i, s, o);
    }
  }
  RemoveEntity(e) {
    var t = this.rlt.get(e);
    if (t && (this.rlt.delete(e), this._9c.push(t), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("TowerDefenseBattle", 17, "塔防怪物移除血条", ["entityId", e]);
    }
  }
  Tick(e) {
    for (const i of this.h9c) {
      i.ScaleCurve = this.GetScaleCurve();
    }
    this.h9c.length = 0;
    for (const s of this.l9c) {
      s.RefreshHpAndShield();
    }
    this.l9c.length = 0;
    this.tue.length = 0;
    var t = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
    for (const o of this.rlt.values()) {
      o.RefreshDistance(t);
      if (o.DistanceSquared < this.Hri && o.DistanceSquared > this.Lin) {
        o.SetVisible(true);
        o.Tick(e);
        this.tue.push(o);
      } else {
        o.SetVisible(false);
      }
    }
    for (const r of this._9c) {
      r.Destroy();
    }
    this._9c.length = 0;
    if (this.c9c?.GetIsEnable() && (this.c9c.ClearDynamicBatchMesh(), this.tue.length > 0)) {
      this.tue.sort((e, t) => t.DistanceSquared - e.DistanceSquared);
      for (let e = Math.max(this.tue.length - 15, 0); e < this.tue.length; e++) {
        this.c9c.AddToDynamicBatchMesh(this.tue[e]);
      }
      this.tue.length = 0;
    }
  }
  GetScaleCurve() {
    var e;
    if (!this.u9c) {
      e = CommonParamById_1.configCommonParamById.GetStringConfig("HeadStateScaleCurvePath");
      this.u9c = ResourceSystem_1.ResourceSystem.Load(e, UE.CurveFloat);
    }
    return this.u9c;
  }
  Clear() {
    this.h9c.length = 0;
    this.l9c.length = 0;
    for (const e of this.rlt.values()) {
      e.Destroy();
    }
    this.rlt.clear();
    for (const t of this._9c) {
      t.Destroy();
    }
    this._9c.length = 0;
    this.u9c = undefined;
    this.c9c?.Destroy();
    this.c9c = undefined;
  }
}
exports.TowerDefenseHeadStateManager = TowerDefenseHeadStateManager;
//# sourceMappingURL=TowerDefenseHeadStateManager.js.map