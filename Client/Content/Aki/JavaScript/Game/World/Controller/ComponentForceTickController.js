"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentForceTickController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Core_1 = require("../../../Core/Core");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
class ComponentForceTickController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.S0r = [148, 338];
    this.y0r = [54, 71, 148, 114, 165, 167, 158, 156, 160, 168, 228];
    this.I0r = [67, 71, 167];
    return true;
  }
  static RegisterPreMoveTick(o, r) {
    if (this.T0r(o)) {
      if (this.Eq_.has(o)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("TickController", 35, "[ComponentForceTickController.RegisterPreMoveTick] 当前Comp已经注册过ForceTick", ["Comp", o.toString()]);
        }
      } else {
        this.Eq_.set(o, r);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TickController", 35, "[ComponentForceTickController.RegisterPreMoveTick] 当前Comp不允许注册到ForceTickController", ["Comp", o.toString()]);
    }
  }
  static RegisterPreTick(o, r) {
    if (this.T0r(o)) {
      Core_1.Core.RegisterPreTick(r);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TickController", 31, "[ComponentForceTickController.RegisterTick] 当前Comp不允许注册到ForceTickController", ["Comp", o.toString()]);
    }
  }
  static UnregisterPreTick(o) {
    Core_1.Core.UnRegisterPreTick(o);
  }
  static RegisterTick(o, r) {
    if (this.L0r(o)) {
      if (this.D0r.has(o)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("TickController", 31, "[ComponentForceTickController.RegisterTick] 当前Comp已经注册过ForceTick", ["Comp", o.toString()]);
        }
      } else {
        this.D0r.set(o, r);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TickController", 31, "[ComponentForceTickController.RegisterTick] 当前Comp不允许注册到ForceTickController", ["Comp", o.toString()]);
    }
  }
  static RegisterAfterTick(o, r) {
    if (this.R0r(o)) {
      if (this._It.has(o)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("TickController", 31, "[ComponentForceTickController.RegisterAfterTick] 当前Comp已经注册过ForceAfterTick", ["Comp", o.toString()]);
        }
      } else {
        this._It.set(o, r);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TickController", 31, "[ComponentForceTickController.RegisterAfterTick] 当前Comp不允许注册到ForceTickController", ["Comp", o.toString()]);
    }
  }
  static UnregisterPreMoveTick(o) {
    if (this.Eq_.has(o)) {
      this.Eq_.delete(o);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("TickController", 35, "[ComponentForceTickController.UnregisterPreTick] 当前Comp未注册过", ["Comp", o.toString()]);
    }
  }
  static UnregisterTick(o) {
    if (this.D0r.has(o)) {
      this.D0r.delete(o);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("TickController", 31, "[ComponentForceTickController.UnregisterTick] 当前Comp未注册过ForceTick", ["Comp", o.toString()]);
    }
  }
  static UnregisterAfterTick(o) {
    if (this._It.has(o)) {
      this._It.delete(o);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("TickController", 31, "[ComponentForceTickController.UnregisterAfterTick] 当前Comp未注册过ForceAfterTick", ["Comp", o.toString()]);
    }
  }
  static MoveTickPriority1(o) {
    for (var [r, e] of this.Eq_) {
      if (r.Active) {
        try {
          var t = this.m6(this.Iq_, r.constructor.name, "ComponentForceTickController.PreMoveTick");
          t?.Start();
          e(o * this.SW);
          t?.Stop();
        } catch (o) {
          if (o instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("TickController", 35, "处理方法执行异常", o, ["comp", r.toString()], ["error", o.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("TickController", 35, "处理方法执行异常", ["comp", r.toString()], ["error", o]);
          }
        }
      }
    }
  }
  static OnTick(o) {
    for (var [r, e] of this.D0r) {
      if (r.Active) {
        try {
          var t = this.m6(this.U0r, r.constructor.name, "ComponentForceTickController.OnTick.");
          t?.Start();
          e(o * this.SW);
          t?.Stop();
        } catch (o) {
          if (o instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("TickController", 31, "处理方法执行异常", o, ["comp", r.toString()], ["error", o.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("TickController", 31, "处理方法执行异常", ["comp", r.toString()], ["error", o]);
          }
        }
      }
    }
  }
  static OnAfterTick(o) {
    for (var [r, e] of this._It) {
      try {
        var t;
        if (r.Active) {
          (t = this.m6(this.A0r, r.constructor.name, "ComponentForceTickController.OnAfterTick."))?.Start();
          e(o * this.SW);
          t?.Stop();
        }
      } catch (o) {
        if (o instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("TickController", 31, "处理方法执行异常", o, ["comp", r.toString()], ["error", o.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TickController", 31, "处理方法执行异常", ["comp", r.toString()], ["error", o]);
        }
      }
    }
  }
  static T0r(r) {
    return Boolean(this.S0r.find(o => (0, RegisterComponent_1.isComponentInstance)(r, o)));
  }
  static L0r(r) {
    return Boolean(this.y0r.find(o => (0, RegisterComponent_1.isComponentInstance)(r, o)));
  }
  static R0r(r) {
    return Boolean(this.I0r.find(o => (0, RegisterComponent_1.isComponentInstance)(r, o)));
  }
  static m6(r, e, t) {
    if (Stats_1.Stat.Enable) {
      let o = r.get(e);
      if (!o) {
        o = Stats_1.Stat.CreateNoFlameGraph(t + e);
        r.set(e, o);
      }
      return o;
    }
  }
  static SetTimeDilation(o) {
    ComponentForceTickController.SW = o;
  }
}
(exports.ComponentForceTickController = ComponentForceTickController).y0r = [];
ComponentForceTickController.I0r = [];
ComponentForceTickController.S0r = [];
ComponentForceTickController.Iq_ = new Map();
ComponentForceTickController.U0r = new Map();
ComponentForceTickController.A0r = new Map();
ComponentForceTickController.SW = 1;
ComponentForceTickController.Eq_ = new Map();
ComponentForceTickController.D0r = new Map();
ComponentForceTickController._It = new Map(); //# sourceMappingURL=ComponentForceTickController.js.map