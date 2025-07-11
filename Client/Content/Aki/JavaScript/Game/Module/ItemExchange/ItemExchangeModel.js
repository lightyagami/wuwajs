"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemExchangeModel = exports.ExchangeSimulation = exports.ExchangeInfo = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ItemExchangeDefine_1 = require("./ItemExchangeDefine");
class ExchangeInfo {
  constructor() {
    this.ConsumeCount = 0;
    this.GainCount = 0;
  }
}
exports.ExchangeInfo = ExchangeInfo;
class ExchangeSimulation {
  constructor() {
    this.ExChangeTime = 0;
    this.ExChangeCount = 0;
    this.ConsumeCount = 0;
  }
}
exports.ExchangeSimulation = ExchangeSimulation;
class ItemExchangeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Dgi = undefined;
  }
  OnInit() {
    this.Dgi = new Map();
    return true;
  }
  OnClear() {
    return !(this.Dgi = undefined);
  }
  InitItemExchangeTimeInfo(e) {
    for (const t of e) {
      this.Dgi.set(t.L8n, t);
    }
  }
  GetExchangeInfo(e) {
    if (!this.Dgi.get(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ItemExchange", 8, "前后端版本可能不一致, 当前兑换的道具并没有后端配置!", ["itemId", e]);
      }
    }
    return this.Dgi.get(e);
  }
  GetExChangeTime(e) {
    return this.Dgi.get(e)?._9n ?? 0;
  }
  AddExchangeTime(e, t) {
    e = this.Dgi.get(e);
    if (e) {
      e.u9n += t;
      e._9n += t;
    }
  }
  CalculateConsume(i, e = 0, s = 0, h = false) {
    let g = e;
    if (s > 0) {
      g = ItemExchangeDefine_1.MAX_COUNT;
    }
    var c = ConfigManager_1.ConfigManager.ItemExchangeConfig.GetExChangeConfigList(i);
    if (c && !(c.length <= 0)) {
      let t = 0;
      var x = c.length - 1;
      var f = this.GetExChangeTime(i) + 1;
      let r = 0;
      for (let e = x; e >= 0; e--) {
        var u = c[e];
        if (f >= u.Times) {
          t = e;
          const i = u.Consume.keys().next()?.value;
          r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i);
          break;
        }
      }
      var l = this.Rgi(i);
      let a = 0;
      let n = 0;
      let o = 0;
      while (t <= x) {
        var M = c[t];
        var m = t < x ? c[t + 1] : undefined;
        let e = Math.ceil((g - n) / M.GainCount);
        if (m) {
          m = m.Times - M.Times;
          e = Math.min(e, m);
        }
        if ((e = s > 0 && e + a > s ? s - a : e) + a > l) {
          e = l - a;
        }
        m = M.Consume.values().next()?.value;
        if (!h && o + e * m > r) {
          e = Math.floor((r - o) / m);
        }
        o += e * m;
        a += e;
        if ((n += e * M.GainCount) >= g || s > 0 && a >= s || a >= l || o >= r) {
          break;
        }
        t++;
      }
      e = new ExchangeSimulation();
      e.ExChangeTime = a;
      e.ExChangeCount = n;
      e.ConsumeCount = o;
      return e;
    }
  }
  Rgi(e) {
    var e = this.GetExchangeInfo(e);
    var t = e.yxs > 0 ? e.yxs - e.u9n : ItemExchangeDefine_1.MAX_COUNT;
    var e = e.Exs > 0 ? e.Exs - e._9n : ItemExchangeDefine_1.MAX_COUNT;
    return Math.min(t, e);
  }
  GetCurExchangeInfo(e, t = 0) {
    var r = new ExchangeInfo();
    var a = ConfigManager_1.ConfigManager.ItemExchangeConfig.GetExChangeConfigList(e);
    if (a) {
      var n = this.GetExChangeTime(e) + t + 1;
      for (const i of a) {
        if (n < i.Times) {
          break;
        }
        for (var [, o] of i.Consume) {
          r.ConsumeCount = o;
          r.GainCount = i.GainCount;
        }
      }
    }
    return r;
  }
  CheckIsMaxExChangeTime(e, t = 0) {
    e = this.GetExchangeInfo(e);
    return e.yxs > 0 && e.u9n + t >= e.yxs || e.Exs > 0 && e._9n + t >= e.Exs;
  }
  GetMaxExChangeTime(e) {
    var t = this.Rgi(e);
    return this.CalculateConsume(e, 0, t)?.ExChangeTime ?? 0;
  }
}
exports.ItemExchangeModel = ItemExchangeModel;
//# sourceMappingURL=ItemExchangeModel.js.map