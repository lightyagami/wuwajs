"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RechargeModel = exports.RechargeInfo = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class RechargeInfo {
  constructor() {
    this.PayId = 0;
    this.Amount = "";
    this.ProductId = "";
  }
  Init(e, r, t) {
    this.PayId = e;
    this.Amount = r;
    this.ProductId = t;
  }
}
exports.RechargeInfo = RechargeInfo;
class RechargeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Jso = new Map();
  }
  SetRechargeInfo(e, r, t) {
    let o = this.Jso.get(e);
    (o = o || new RechargeInfo()).Init(e, this.zso(r), t);
    this.Jso.set(e, o);
  }
  GetPayIdAmount(e) {
    var r = this.Jso.get(e);
    if (r) {
      return r.Amount;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Shop", 27, "获取PayId的服务器价格失败", ["id", e]);
      }
      return "0";
    }
  }
  zso(e) {
    var r;
    var t = parseFloat(e);
    if (!isNaN(t) && ((r = (e = t.toString()).indexOf(".")) === -1 || r !== -1 && e.length - r - 1 == 1)) {
      return t.toFixed(2);
    } else {
      return e;
    }
  }
  GetPayIdProductId(e) {
    var r = this.Jso.get(e);
    if (r) {
      return r.ProductId;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Shop", 27, "获取PayId的商品名称价格失败", ["id", e]);
      }
      return "";
    }
  }
}
exports.RechargeModel = RechargeModel;
//# sourceMappingURL=RechargeModel.js.map