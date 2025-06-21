"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.TouchFingerManager = void 0;
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  TouchFingerData_1 = require("./TouchFingerData"),
  TouchFingerDefine_1 = require("./TouchFingerDefine");
class TouchFingerManager {
  static Initialize() {
    for (let e = TouchFingerDefine_1.EFingerIndex.One; e < TouchFingerDefine_1.EFingerIndex.Ten; e++) TouchFingerManager.Wdr(e)
  }
  static Wdr(e) {
    var n = new TouchFingerData_1.TouchFingerData(e);
    TouchFingerManager.mgt.set(e, n)
  }
  static GetTouchFingerData(e) {
    return TouchFingerManager.mgt.get(e)
  }
  static StartTouch(e, n) {
    e = TouchFingerManager.GetTouchFingerData(e);
    e && !e.IsInTouch() && (TouchFingerManager.CurrentTouchFingerCount++, Log_1.Log.CheckDebug() && Log_1.Log.Debug("ControlScreen", 10, "开始触碰屏幕", ["FingerCount", TouchFingerManager.CurrentTouchFingerCount]), e.StartTouch(n))
  }
  static EndTouch(e) {
    e = TouchFingerManager.GetTouchFingerData(e);
    e && e.IsInTouch() && (TouchFingerManager.CurrentTouchFingerCount = Math.max(TouchFingerManager.CurrentTouchFingerCount - 1, 0), Log_1.Log.CheckDebug() && Log_1.Log.Debug("ControlScreen", 10, "结束触碰屏幕", ["FingerCount", TouchFingerManager.CurrentTouchFingerCount]), e) && e.EndTouch()
  }
  static MoveTouch(e, n) {
    e = TouchFingerManager.GetTouchFingerData(e);
    e && e.MoveTouch(n)
  }
  static GetTouchPosition(e) {
    e = TouchFingerManager.GetTouchFingerData(e);
    if (e && e.IsInTouch()) return e.GetTouchPosition()
  }
  static GetLastTouchPosition(e) {
    e = TouchFingerManager.GetTouchFingerData(e);
    if (e && e.IsInTouch()) return e.GetLastTouchPosition()
  }
  static GetTouchFingerCount() {
    return TouchFingerManager.CurrentTouchFingerCount
  }
  static GetFingerExpandCloseValue(e, n) {
    var r, i, a, e = TouchFingerManager.GetTouchFingerData(e),
      n = TouchFingerManager.GetTouchFingerData(n);
    return e && n && n.IsInTouch() && n.IsInTouch() && (r = e.GetLastTouchPosition(), i = n.GetLastTouchPosition(), r) && i && (e = e.GetTouchPosition(), n = n.GetTouchPosition(), e) && n ? (a = e.X - n.X) * a + (a = e.Y - n.Y) * a + (a = e.Z - n.Z) * a - ((e = r.X - i.X) * e + (n = r.Y - i.Y) * n + (a = r.Z - i.Z) * a) : 0
  }
  static GetFingerExpandCloseType(e, n) {
    let r = void 0,
      i = 0;
    var e = TouchFingerManager.GetTouchFingerData(e),
      n = TouchFingerManager.GetTouchFingerData(n),
      a = (e && n || (r = TouchFingerDefine_1.EFingerExpandCloseType.None), n.IsInTouch() && n.IsInTouch() || (r = TouchFingerDefine_1.EFingerExpandCloseType.None), e.GetLastTouchPosition()),
      o = n.GetLastTouchPosition(),
      e = (a && o || (r = TouchFingerDefine_1.EFingerExpandCloseType.None), e.GetTouchPosition()),
      n = n.GetTouchPosition();
    return (r = e && n ? r : TouchFingerDefine_1.EFingerExpandCloseType.None) === TouchFingerDefine_1.EFingerExpandCloseType.None ? {
      State: TouchFingerDefine_1.EFingerExpandCloseType.None,
      ChangeRate: i
    } : (e = UE.KismetMathLibrary.Vector_DistanceSquared(e, n), n = UE.KismetMathLibrary.Vector_DistanceSquared(a, o), i = (e - n) / n, e < n && (r = TouchFingerDefine_1.EFingerExpandCloseType.Close), n < e && (r = TouchFingerDefine_1.EFingerExpandCloseType.Expand), Math.abs(i) <= TouchFingerDefine_1.FINGER_TOUCHDEAD_ZONE && (i = 0, r = TouchFingerDefine_1.EFingerExpandCloseType.None), {
      State: r,
      ChangeRate: i
    })
  }
  static GetFingerDirection(e) {
    var n, e = TouchFingerManager.GetTouchFingerData(e);
    if (e && e.IsInTouch()) return (n = e.GetLastTouchPosition()) ? {
      X: (e = e.GetTouchPosition()).X - n.X,
      Y: e.Y - n.Y
    } : {
      X: 0,
      Y: 0
    }
  }
}(exports.TouchFingerManager = TouchFingerManager).mgt = new Map, TouchFingerManager.CurrentTouchFingerCount = 0;
//# sourceMappingURL=TouchFingerManager.js.map