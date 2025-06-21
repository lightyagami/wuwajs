"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.StackableChessboardPoint = void 0;
const Log_1 = require("../../../../../../Core/Common/Log"),
  ChessboradPoint_1 = require("../ChessBase/ChessboradPoint");
class StackableChessboardPoint extends ChessboradPoint_1.ChessboardPoint {
  constructor() {
    super(...arguments), this.iGi = void 0, this.cdc = void 0, this.s7 = 0
  }
  GetMoveLocationAndRotator() {
    var t = this.cdc?.GetStackableLocation();
    return t ? [t, this.Rotator] : super.GetMoveLocationAndRotator()
  }
  ItemEnter(t) {
    var i = new Set;
    let s = 1,
      e = (t.SetCurrentPoint(this), t),
      h = t.GetNextItem();
    for (; void 0 !== h;) {
      if (i.has(h.GetId())) {
        Log_1.Log.CheckError() && Log_1.Log.Error("Chess", 48, "ItemEnter 发生循环，数据错误");
        break
      }
      s++, h.SetCurrentPoint(this), e = h, i.add(h.GetId()), h = h.GetNextItem()
    }
    this.cdc ? this.cdc.SetNextItem(t) : this.iGi = t, this.cdc = e, this.s7 += s
  }
  ItemLeave(t) {
    var e = t;
    if (e === this.iGi) this.iGi = void 0, this.cdc = void 0, this.s7 = 0;
    else {
      let t = void 0,
        i = 0,
        s = this.iGi;
      for (; i < this.s7 && s !== e;) s = (t = s)?.GetNextItem(), i++;
      i !== this.s7 && (this.cdc = t, this.cdc?.SetNextItem(void 0), this.s7 = i)
    }
  }
  ChangeItemToMaxPriority(s) {
    if (!(this.s7 <= 1) && this.iGi && this.cdc) {
      var e = s.GetId();
      if (e !== this.cdc.GetId()) {
        var h = s.GetNextItem();
        if (h)
          if (e === this.iGi.GetId()) {
            s.SetNextItem(void 0);
            const r = this.cdc.GetStackableLocation();
            s.Teleport(r || this.Location, this.Rotator), this.cdc.SetNextItem(s), this.cdc = s, h.Teleport(this.Location, this.Rotator), void(this.iGi = h)
          } else {
            let t = 0,
              i = this.iGi;
            for (; t < this.s7;) {
              var o = i.GetNextItem();
              if (!o) return;
              if (o.GetId() === e) break;
              i = o, t++
            }
            i.SetNextItem(void 0), s.SetNextItem(void 0);
            const r = this.cdc.GetStackableLocation();
            s.Teleport(r || this.Location, this.Rotator), this.cdc.SetNextItem(s), this.cdc = s;
            s = i.GetStackableLocation();
            h.Teleport(s || this.Location, this.Rotator), i.SetNextItem(h)
          }
      }
    }
  }
  ComparePriority(t, i) {
    var s = t.GetId(),
      e = i.GetId();
    let h = 0,
      o = this.iGi;
    for (; o && h < this.s7;) {
      var r = o.GetId();
      if (r === s) return 1;
      if (r === e) return -1;
      o = o.GetNextItem(), h++
    }
    return 0
  }
}
exports.StackableChessboardPoint = StackableChessboardPoint;
//# sourceMappingURL=StackableChessboradPoint.js.map