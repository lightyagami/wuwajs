"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StackableChessboardPoint = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ChessboradPoint_1 = require("../ChessBase/ChessboradPoint");
class StackableChessboardPoint extends ChessboradPoint_1.ChessboardPoint {
  constructor() {
    super(...arguments);
    this.iGi = undefined;
    this.cdc = undefined;
    this.s7 = 0;
  }
  GetMoveLocationAndRotator() {
    var t = this.cdc?.GetStackableLocation();
    if (t) {
      return [t, this.Rotator];
    } else {
      return super.GetMoveLocationAndRotator();
    }
  }
  ItemEnter(t) {
    var i = new Set();
    let s = 1;
    t.SetCurrentPoint(this);
    let e = t;
    let h = t.GetNextItem();
    while (h !== undefined) {
      if (i.has(h.GetId())) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Chess", 48, "ItemEnter 发生循环，数据错误");
        }
        break;
      }
      s++;
      h.SetCurrentPoint(this);
      e = h;
      i.add(h.GetId());
      h = h.GetNextItem();
    }
    if (this.cdc) {
      this.cdc.SetNextItem(t);
    } else {
      this.iGi = t;
    }
    this.cdc = e;
    this.s7 += s;
  }
  ItemLeave(t) {
    var e = t;
    if (e === this.iGi) {
      this.iGi = undefined;
      this.cdc = undefined;
      this.s7 = 0;
    } else {
      let t = undefined;
      let i = 0;
      let s = this.iGi;
      while (i < this.s7 && s !== e) {
        s = (t = s)?.GetNextItem();
        i++;
      }
      if (i !== this.s7) {
        this.cdc = t;
        this.cdc?.SetNextItem(undefined);
        this.s7 = i;
      }
    }
  }
  ChangeItemToMaxPriority(s) {
    if (!(this.s7 <= 1) && this.iGi && this.cdc) {
      var e = s.GetId();
      if (e !== this.cdc.GetId()) {
        var h = s.GetNextItem();
        if (h) {
          if (e === this.iGi.GetId()) {
            s.SetNextItem(undefined);
            const r = this.cdc.GetStackableLocation();
            s.Teleport(r || this.Location, this.Rotator);
            this.cdc.SetNextItem(s);
            this.cdc = s;
            h.Teleport(this.Location, this.Rotator);
            this.iGi = h;
          } else {
            let t = 0;
            let i = this.iGi;
            while (t < this.s7) {
              var o = i.GetNextItem();
              if (!o) {
                return;
              }
              if (o.GetId() === e) {
                break;
              }
              i = o;
              t++;
            }
            i.SetNextItem(undefined);
            s.SetNextItem(undefined);
            const r = this.cdc.GetStackableLocation();
            s.Teleport(r || this.Location, this.Rotator);
            this.cdc.SetNextItem(s);
            this.cdc = s;
            s = i.GetStackableLocation();
            h.Teleport(s || this.Location, this.Rotator);
            i.SetNextItem(h);
          }
        }
      }
    }
  }
  ComparePriority(t, i) {
    var s = t.GetId();
    var e = i.GetId();
    let h = 0;
    let o = this.iGi;
    while (o && h < this.s7) {
      var r = o.GetId();
      if (r === s) {
        return 1;
      }
      if (r === e) {
        return -1;
      }
      o = o.GetNextItem();
      h++;
    }
    return 0;
  }
}
exports.StackableChessboardPoint = StackableChessboardPoint;
//# sourceMappingURL=StackableChessboradPoint.js.map