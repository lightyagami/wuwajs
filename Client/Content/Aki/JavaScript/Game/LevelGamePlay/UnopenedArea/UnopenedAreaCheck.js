"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnopenedAreaCheck = undefined;
const Log_1 = require("../../../Core/Common/Log");
const AreaByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaByAreaId");
const BinItem_1 = require("../BinTest/BinItem");
const FAILURE_COUNT = 7;
class UnopenedAreaCheck {
  constructor() {
    this.IsSplineInit = false;
    this.Xwe = 0;
    this.$we = new Map();
    this.Ywe = new Map();
    this.Vj = new Map();
  }
  AreaInit(t) {
    for (var [e, i] of t) {
      this.Jwe(e, i);
    }
    if (t.size === 0 && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 42, "初始化区域数量为零");
    }
    this.Xwe = 0;
    this.IsSplineInit = true;
  }
  AreaStatesChange(t) {
    this.Jwe(t.GRs.p6n, t.GRs.Y4n ?? false);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 42, "AreaStatesChange更新区域边界状态", ["AreaState.Proto_AreaId", t.GRs.p6n], ["AreaState.Proto_State", t.GRs.Y4n ?? false]);
    }
  }
  Jwe(e, t) {
    var i = AreaByAreaId_1.configAreaByAreaId.GetConfig(e);
    if (i && i.EdgeWallName) {
      const s = i.EdgeWallName + "_C";
      var a = i.MapConfigId;
      var i = i.DungeonId;
      if (t) {
        if (!this.Ywe.has(s)) {
          this.Ywe.set(s, new Set());
        }
        if (!this.Ywe.get(s).has(e)) {
          this.Ywe.get(s).add(e);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Map", 42, "AreaPathMap区域添加", ["AreaId", e], ["Path", s]);
          }
        }
        if (!this.$we.has(s)) {
          const r = new BinItem_1.BinItem();
          r.MapId = a;
          r.DungeonId = i;
          r.InitCallback = () => {
            if (r && r.BinSet && r.TestPoints) {
              this.$we.set(s, r);
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Map", 42, "BinMap添加边界", ["Path", s]);
              }
            } else if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Map", 42, "BinMap添加边界出错", ["Path", s]);
            }
          };
          r.Init(s);
        }
        let t = this.Vj.get(i);
        if (!t) {
          t = new Set();
          this.Vj.set(i, t);
        }
        t.add(s);
      } else {
        t = this.Ywe.get(s);
        if (t?.has(e) && (t.delete(e), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Map", 42, "AreaPathMap区域删除", ["AreaId", e], ["Path", s]);
        }
        if ((!t || t.size === 0) && !!this.$we.has(s)) {
          this.$we.delete(s);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Map", 42, "BinMap移除边界", ["Path", s]);
          }
        }
        a = this.Vj.get(i);
        if (a && a.delete(s) && a.size === 0) {
          this.Vj.delete(i);
        }
      }
    }
  }
  BinTest(t, e, i) {
    if (!this.IsSplineInit || this.$we.size === 0) {
      if (this.Xwe <= FAILURE_COUNT && (this.Xwe++, Log_1.Log.CheckInfo() && Log_1.Log.Info("Map", 42, "检测是否进入未开放区域，检测失败", ["IsSplineInit", this.IsSplineInit], ["BinMap.size", this.$we.size]), this.Xwe === FAILURE_COUNT) && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Map", 42, "检测是否进入未开放区域一直失败，不报Log了");
      }
      return true;
    }
    if (this.Xwe !== 0 && (this.Xwe = 0, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Map", 42, "检测是否进入未开放区域，恢复正常检测");
    }
    let a = false;
    i = this.Vj.get(i);
    if (i && i.size > 0) {
      for (const r of i) {
        var s = this.$we.get(r);
        if (s && (a = true, s.BinTest(t))) {
          return true;
        }
      }
    }
    if (a) {
      return false;
    }
    for (const o of this.$we) {
      if (e === o[1].MapId && (a = true, o[1].BinTest(t))) {
        return true;
      }
    }
    return !a;
  }
  Clear() {
    this.IsSplineInit = false;
    this.$we.clear();
  }
}
exports.UnopenedAreaCheck = UnopenedAreaCheck;
//# sourceMappingURL=UnopenedAreaCheck.js.map