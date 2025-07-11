"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchFingerManager = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const TouchFingerData_1 = require("./TouchFingerData");
const TouchFingerDefine_1 = require("./TouchFingerDefine");
class TouchFingerManager {
  static Initialize() {
    for (let e = TouchFingerDefine_1.EFingerIndex.One; e < TouchFingerDefine_1.EFingerIndex.Ten; e++) {
      TouchFingerManager.Wdr(e);
    }
  }
  static Wdr(e) {
    var n = new TouchFingerData_1.TouchFingerData(e);
    TouchFingerManager.mgt.set(e, n);
  }
  static GetTouchFingerData(e) {
    return TouchFingerManager.mgt.get(e);
  }
  static StartTouch(e, n) {
    e = TouchFingerManager.GetTouchFingerData(e);
    if (e && !e.IsInTouch()) {
      TouchFingerManager.CurrentTouchFingerCount++;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ControlScreen", 10, "开始触碰屏幕", ["FingerCount", TouchFingerManager.CurrentTouchFingerCount]);
      }
      e.StartTouch(n);
    }
  }
  static EndTouch(e) {
    e = TouchFingerManager.GetTouchFingerData(e);
    if (e && e.IsInTouch() && (TouchFingerManager.CurrentTouchFingerCount = Math.max(TouchFingerManager.CurrentTouchFingerCount - 1, 0), Log_1.Log.CheckDebug() && Log_1.Log.Debug("ControlScreen", 10, "结束触碰屏幕", ["FingerCount", TouchFingerManager.CurrentTouchFingerCount]), e)) {
      e.EndTouch();
    }
  }
  static MoveTouch(e, n) {
    e = TouchFingerManager.GetTouchFingerData(e);
    if (e) {
      e.MoveTouch(n);
    }
  }
  static GetTouchPosition(e) {
    e = TouchFingerManager.GetTouchFingerData(e);
    if (e && e.IsInTouch()) {
      return e.GetTouchPosition();
    }
  }
  static GetLastTouchPosition(e) {
    e = TouchFingerManager.GetTouchFingerData(e);
    if (e && e.IsInTouch()) {
      return e.GetLastTouchPosition();
    }
  }
  static GetTouchFingerCount() {
    return TouchFingerManager.CurrentTouchFingerCount;
  }
  static GetFingerExpandCloseValue(e, n) {
    var r;
    var i;
    var a;
    var e = TouchFingerManager.GetTouchFingerData(e);
    var n = TouchFingerManager.GetTouchFingerData(n);
    if (e && n && n.IsInTouch() && n.IsInTouch() && (r = e.GetLastTouchPosition(), i = n.GetLastTouchPosition(), r) && i && (e = e.GetTouchPosition(), n = n.GetTouchPosition(), e) && n) {
      return (a = e.X - n.X) * a + (a = e.Y - n.Y) * a + (a = e.Z - n.Z) * a - ((e = r.X - i.X) * e + (n = r.Y - i.Y) * n + (a = r.Z - i.Z) * a);
    } else {
      return 0;
    }
  }
  static GetFingerExpandCloseType(e, n) {
    let r = undefined;
    let i = 0;
    var e = TouchFingerManager.GetTouchFingerData(e);
    var n = TouchFingerManager.GetTouchFingerData(n);
    if (!e || !n) {
      r = TouchFingerDefine_1.EFingerExpandCloseType.None;
    }
    if (!n.IsInTouch() || !n.IsInTouch()) {
      r = TouchFingerDefine_1.EFingerExpandCloseType.None;
    }
    var a = e.GetLastTouchPosition();
    var o = n.GetLastTouchPosition();
    if (!a || !o) {
      r = TouchFingerDefine_1.EFingerExpandCloseType.None;
    }
    var e = e.GetTouchPosition();
    var n = n.GetTouchPosition();
    if ((r = e && n ? r : TouchFingerDefine_1.EFingerExpandCloseType.None) === TouchFingerDefine_1.EFingerExpandCloseType.None) {
      return {
        State: TouchFingerDefine_1.EFingerExpandCloseType.None,
        ChangeRate: i
      };
    } else {
      e = UE.KismetMathLibrary.Vector_DistanceSquared(e, n);
      n = UE.KismetMathLibrary.Vector_DistanceSquared(a, o);
      i = (e - n) / n;
      if (e < n) {
        r = TouchFingerDefine_1.EFingerExpandCloseType.Close;
      }
      if (n < e) {
        r = TouchFingerDefine_1.EFingerExpandCloseType.Expand;
      }
      if (Math.abs(i) <= TouchFingerDefine_1.FINGER_TOUCHDEAD_ZONE) {
        i = 0;
        r = TouchFingerDefine_1.EFingerExpandCloseType.None;
      }
      return {
        State: r,
        ChangeRate: i
      };
    }
  }
  static GetFingerDirection(e) {
    var n;
    var e = TouchFingerManager.GetTouchFingerData(e);
    if (e && e.IsInTouch()) {
      if (n = e.GetLastTouchPosition()) {
        return {
          X: (e = e.GetTouchPosition()).X - n.X,
          Y: e.Y - n.Y
        };
      } else {
        return {
          X: 0,
          Y: 0
        };
      }
    }
  }
}
(exports.TouchFingerManager = TouchFingerManager).mgt = new Map();
TouchFingerManager.CurrentTouchFingerCount = 0; //# sourceMappingURL=TouchFingerManager.js.map