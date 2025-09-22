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
    this.ZQu = [];
    this.eKu = [];
    this.tKu = [];
    this.tue = [];
    this.iKu = undefined;
    this.Hri = 0;
    this.Lin = 0;
    this.oYu = undefined;
  }
  Init() {
    this.Hri = CommonParamById_1.configCommonParamById.GetIntConfig("TowerDefenseHeadStateShowMaxDistance");
    this.Lin = CommonParamById_1.configCommonParamById.GetIntConfig("TowerDefenseHeadStateShowMinDistance");
  }
  OnWorldDone() {
    this.LoadDynamicBatchView();
  }
  LoadDynamicBatchView() {
    this.oYu = new TowerDefenseHeadStateDynamicBatchView_1.TowerDefenseHeadStateDynamicBatchView();
    this.oYu.CreateThenShowByResourceIdAsync("UiItem_TowerDefenseHPDynamicBatch", UiLayer_1.UiLayer.WorldSpaceUiRootItem, true);
  }
  AddEntity(e, t, i, s, o) {
    var r;
    if (!this.rlt.has(e)) {
      (r = new TowerDefenseHeadStateData_1.TowerDefenseHeadStateData()).EntityId = e;
      r.UpdatePosition(t);
      r.UpdateHp(s, i, o);
      this.rlt.set(e, r);
      this.ZQu.push(r);
      this.eKu.push(r);
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
        this.eKu.push(r);
      }
    } else {
      this.AddEntity(e, t, i, s, o);
    }
  }
  RemoveEntity(e) {
    var t = this.rlt.get(e);
    if (t && (this.rlt.delete(e), this.tKu.push(t), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("TowerDefenseBattle", 17, "塔防怪物移除血条", ["entityId", e]);
    }
  }
  Tick(e) {
    for (const i of this.ZQu) {
      i.ScaleCurve = this.GetScaleCurve();
    }
    this.ZQu.length = 0;
    for (const s of this.eKu) {
      s.RefreshHpAndShield();
    }
    this.eKu.length = 0;
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
    for (const r of this.tKu) {
      r.Destroy();
    }
    this.tKu.length = 0;
    if (this.oYu?.GetIsEnable() && (this.oYu.ClearDynamicBatchMesh(), this.tue.length > 0)) {
      this.tue.sort((e, t) => t.DistanceSquared - e.DistanceSquared);
      for (let e = Math.max(this.tue.length - 15, 0); e < this.tue.length; e++) {
        this.oYu.AddToDynamicBatchMesh(this.tue[e]);
      }
      this.tue.length = 0;
    }
  }
  GetScaleCurve() {
    var e;
    if (!this.iKu) {
      e = CommonParamById_1.configCommonParamById.GetStringConfig("HeadStateScaleCurvePath");
      this.iKu = ResourceSystem_1.ResourceSystem.Load(e, UE.CurveFloat);
    }
    return this.iKu;
  }
  Clear() {
    this.ZQu.length = 0;
    this.eKu.length = 0;
    for (const e of this.rlt.values()) {
      e.Destroy();
    }
    this.rlt.clear();
    for (const t of this.tKu) {
      t.Destroy();
    }
    this.tKu.length = 0;
    this.iKu = undefined;
    this.oYu?.Destroy();
    this.oYu = undefined;
  }
}
exports.TowerDefenseHeadStateManager = TowerDefenseHeadStateManager;
//# sourceMappingURL=TowerDefenseHeadStateManager.js.map