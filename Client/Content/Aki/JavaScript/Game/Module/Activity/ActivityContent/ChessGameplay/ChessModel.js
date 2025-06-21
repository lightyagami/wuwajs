"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ChessModel = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  ChessManagerCreator_1 = require("./ChessBase/ChessManagerCreator");
class ChessModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.ldc = void 0, this.pcc = 0, this.vcc = new Map, this.ycc = new Map, this.tOc = void 0, this.CacheRankingItemIdList = void 0
  }
  OnLeaveLevel() {
    return this.ClearAll(), !0
  }
  OnClear() {
    return this.ClearAll(), !0
  }
  ClearAll() {
    this.ldc = void 0, this.vcc.clear();
    for (const s of this.ycc.values()) s.OnClear();
    this.ycc.clear(), this.tOc = void 0, this.CacheRankingItemIdList = void 0
  }
  GetChessManager() {
    return this.ldc
  }
  GetChessItem(s) {
    return this.ycc.get(s)
  }
  GetChessItemIdList(s = void 0) {
    var e = [];
    if (s) {
      var t = [];
      for (const o of this.ycc.values()) t.push(o);
      t.sort(s);
      for (const r of t) e.push(r.GetId())
    } else
      for (const i of this.ycc.keys()) e.push(i);
    return e
  }
  GetChessboardPoint(s) {
    return this.vcc.get(s)
  }
  GetTerminalPoint() {
    return this.tOc
  }
  UpdateChessMode(s, e = 0) {
    this.pcc = e, this.ldc = (0, ChessManagerCreator_1.createChessManager)(s)
  }
  AddChessboardPoint(s, e, t, o) {
    var r;
    this.ldc ? ((r = this.ldc.CreateChessboardPoint()).Init(s, e, t, o), this.vcc.set(s, r)) : Log_1.Log.CheckError() && Log_1.Log.Error("Chess", 48, "请先设置正确的棋局模式")
  }
  AddChessItem(s, e) {
    var t;
    this.ldc ? (e = this.ldc.GetChessAgent(this.pcc, e)) ? ((t = this.ldc.CreateChessItem()).Init(s, e), this.ycc.set(s, t)) : Log_1.Log.CheckError() && Log_1.Log.Error("Chess", 48, "创建棋子代理失败") : Log_1.Log.CheckError() && Log_1.Log.Error("Chess", 48, "请设置正确的棋局模式")
  }
  UpdateTerminalPoint(s) {
    this.tOc = this.vcc.get(s)
  }
}
exports.ChessModel = ChessModel;
//# sourceMappingURL=ChessModel.js.map