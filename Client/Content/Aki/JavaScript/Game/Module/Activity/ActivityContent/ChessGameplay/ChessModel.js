"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChessModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const ChessManagerCreator_1 = require("./ChessBase/ChessManagerCreator");
class ChessModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ldc = undefined;
    this.pcc = 0;
    this.vcc = new Map();
    this.ycc = new Map();
    this.tOc = undefined;
    this.CacheRankingItemIdList = undefined;
  }
  OnLeaveLevel() {
    this.ClearAll();
    return true;
  }
  OnClear() {
    this.ClearAll();
    return true;
  }
  ClearAll() {
    this.ldc = undefined;
    this.vcc.clear();
    for (const s of this.ycc.values()) {
      s.OnClear();
    }
    this.ycc.clear();
    this.tOc = undefined;
    this.CacheRankingItemIdList = undefined;
  }
  GetChessManager() {
    return this.ldc;
  }
  GetChessItem(s) {
    return this.ycc.get(s);
  }
  GetChessItemIdList(s = undefined) {
    var e = [];
    if (s) {
      var t = [];
      for (const o of this.ycc.values()) {
        t.push(o);
      }
      t.sort(s);
      for (const r of t) {
        e.push(r.GetId());
      }
    } else {
      for (const i of this.ycc.keys()) {
        e.push(i);
      }
    }
    return e;
  }
  GetChessboardPoint(s) {
    return this.vcc.get(s);
  }
  GetTerminalPoint() {
    return this.tOc;
  }
  UpdateChessMode(s, e = 0) {
    this.pcc = e;
    this.ldc = (0, ChessManagerCreator_1.createChessManager)(s);
  }
  AddChessboardPoint(s, e, t, o) {
    var r;
    if (this.ldc) {
      (r = this.ldc.CreateChessboardPoint()).Init(s, e, t, o);
      this.vcc.set(s, r);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Chess", 48, "请先设置正确的棋局模式");
    }
  }
  AddChessItem(s, e) {
    var t;
    if (this.ldc) {
      if (e = this.ldc.GetChessAgent(this.pcc, e)) {
        (t = this.ldc.CreateChessItem()).Init(s, e);
        this.ycc.set(s, t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Chess", 48, "创建棋子代理失败");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Chess", 48, "请设置正确的棋局模式");
    }
  }
  UpdateTerminalPoint(s) {
    this.tOc = this.vcc.get(s);
  }
}
exports.ChessModel = ChessModel;
//# sourceMappingURL=ChessModel.js.map