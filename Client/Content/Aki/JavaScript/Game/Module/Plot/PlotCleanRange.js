"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotCleanRange = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const SimpleNpcController_1 = require("../../NewWorld/Character/SimpleNpc/Logics/SimpleNpcController");
class Range {
  constructor(e, t, o) {
    this.Center = e;
    this.RadiusSquare = t;
    this.IgnoreList = o;
  }
}
class PlotCleanRange {
  constructor() {
    this.WNn = false;
    this.VYi = false;
    this.QNn = new Map();
    this.$Nn = false;
    this.uWs = [];
    this.Lz = Vector_1.Vector.Create();
    this.Jpe = (e, t) => {
      var o;
      if (this.JNn(t) && ((o = t.Entity?.Disable("PlotCleanRange.OnCreateEntity.DisableEntity")) !== undefined && this.QNn.set(t, o), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Plot", 26, "[PlotCleanRange] 剧情清场持续隐藏实体", ["pb", t.PbDataId], ["cd", t.CreatureDataId]);
      }
    };
  }
  Open(e) {
    this.WNn = true;
    const t = new Set();
    e.EntityIds.forEach(e => {
      t.add(e);
    });
    this.$Nn ||= !e.IsCleanPasserByNpc;
    var o;
    var n = Vector_1.Vector.Create();
    n.FromConfigVector(e.Center);
    var i = new Range(n, e.Radius * e.Radius, t);
    this.uWs.push(i);
    this.zNn(e.IsCleanSimpleNpc);
    for (const r of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
      if (this.JNn(r, i) && (o = r.Entity?.Disable("PlotCleanRange.Open.DisableEntity")) !== undefined) {
        this.QNn.set(r, o);
      }
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CreateEntity, this.Jpe)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateEntity, this.Jpe);
    }
    const l = [];
    this.QNn.forEach((e, t) => {
      l.push([t.PbDataId, t.CreatureDataId]);
    });
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "[PlotCleanRange] 剧情清场隐藏范围内实体", ["list", l]);
    }
  }
  Close() {
    if (this.WNn) {
      this.ZNn();
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateEntity, this.Jpe);
      for (var [e, t] of this.QNn) {
        if (e.Valid && e.Entity) {
          e.Entity.Enable(t, "PlotCleanRange.Close");
        }
      }
      this.uWs.length = 0;
      this.$Nn = false;
      this.QNn.clear();
      this.WNn = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "[PlotCleanRange] 恢复清场");
      }
    }
  }
  zNn(e) {
    if (!this.VYi) {
      if (e) {
        this.VYi = true;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 26, "[PlotCleanRange] 演出清理SimpleNPC");
        }
        SimpleNpcController_1.SimpleNpcController.SetClearOutState(0, true);
      }
    }
  }
  ZNn() {
    if (this.VYi) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "[PlotCleanRange] 演出恢复SimpleNPC");
      }
      SimpleNpcController_1.SimpleNpcController.SetClearOutState(0, false);
      this.VYi = false;
    }
  }
  JNn(e, t) {
    if (this.QNn.has(e)) {
      return false;
    }
    if (!e.Entity?.Valid) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotCleanRange] 实体失效 忽略", ["pb", e.PbDataId], ["cd", e.CreatureDataId]);
      }
      return false;
    }
    var o = e.Entity.GetComponent(0);
    if (!o) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotCleanRange] 拿不到CreatureData 忽略", ["pb", e.PbDataId], ["cd", e.CreatureDataId]);
      }
      return false;
    }
    if (o.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotCleanRange] 主角 忽略", ["pb", e.PbDataId], ["cd", e.CreatureDataId]);
      }
      return false;
    }
    var n = o.GetBaseInfo();
    if (n && n.Category.HideInFlowType === 100) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotCleanRange] 配置必显示 忽略", ["pb", e.PbDataId], ["cd", e.CreatureDataId]);
      }
      return false;
    }
    if (o.GetSubEntityType() === 2) {
      return !this.$Nn || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "[PlotCleanRange] 行人 忽略", ["pb", e.PbDataId], ["cd", e.CreatureDataId]), false);
    }
    if (e.Entity.GetComponent(224)) {
      return !this.$Nn || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "[PlotCleanRange] 刷行人器 忽略", ["pb", e.PbDataId], ["cd", e.CreatureDataId]), false);
    }
    n = e.Entity.GetComponent(1)?.ActorTransform;
    if (n) {
      this.Lz.FromUeVector(n.GetLocation());
    } else {
      n = o.GetEntityConfigType() === Protocol_1.Aki.Protocol.rLs.F6n ? ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(e.PbDataId)?.Transform : undefined;
      if (!n) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "[PlotCleanRange] 拿不到坐标 忽略", ["pb", e.PbDataId], ["cd", e.CreatureDataId]);
        }
        return false;
      }
      this.Lz.FromConfigVector(n.Pos);
    }
    let i = false;
    if (t) {
      i = this.zsn(e, o, t);
    } else {
      for (const t of this.uWs) {
        if (this.zsn(e, o, t)) {
          i = true;
          break;
        }
      }
    }
    return !!i;
  }
  zsn(e, t, o) {
    if (o.IgnoreList.has(t.GetPbDataId())) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[PlotCleanRange] 忽略列表中 忽略", ["pb", e.PbDataId], ["cd", e.CreatureDataId]);
      }
      return false;
    } else {
      return !(Vector_1.Vector.DistSquared(this.Lz, o.Center) > o.RadiusSquare) || !(Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "[PlotCleanRange] 范围外 忽略", ["pb", e.PbDataId], ["cd", e.CreatureDataId]), 1);
    }
  }
  OnTick(e) {}
}
exports.PlotCleanRange = PlotCleanRange;
//# sourceMappingURL=PlotCleanRange.js.map