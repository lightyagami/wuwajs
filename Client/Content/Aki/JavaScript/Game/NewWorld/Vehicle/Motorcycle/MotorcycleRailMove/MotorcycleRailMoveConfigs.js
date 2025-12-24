"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleRailMoveConfig = exports.RailMoveEventHandler = exports.EnterRailCondition = exports.LinearMoveConfig = exports.ParabolaMoveConfig = exports.AccelerateAlongRailConfig = exports.DirectlyEnterRailConfig = exports.JumpAlongRailConfig = exports.JumpOffRailConfig = exports.SwitchRailConfig = exports.JumpToRailConfig = exports.BasicRailMoveConfig = exports.CommonConfig = undefined;
class CommonConfig {
  constructor() {
    this.ModifyVehicleTagsOnEnter = new Map();
    this.ModifyVehicleTagsOnExit = new Map();
    this.EnableBlockingCheck = false;
    this.MaxBlockingTimeOut = 0;
  }
  UpdateFromUeData(i) {
    this.ModifyVehicleTagsOnEnter.clear();
    for (let t = 0; t < i.ModifyVehicleTagsOnEnter.Num(); t++) {
      var s;
      var o;
      if (i.ModifyVehicleTagsOnEnter.IsValidIndex(t)) {
        s = i.ModifyVehicleTagsOnEnter.GetKey(t);
        o = i.ModifyVehicleTagsOnEnter.Get(s);
        this.ModifyVehicleTagsOnEnter.set(s.TagId, !!o);
      }
    }
    this.ModifyVehicleTagsOnExit.clear();
    for (let t = 0; t < i.ModifyVehicleTagsOnExit.Num(); t++) {
      var h;
      var e;
      if (i.ModifyVehicleTagsOnExit.IsValidIndex(t)) {
        h = i.ModifyVehicleTagsOnExit.GetKey(t);
        e = i.ModifyVehicleTagsOnExit.Get(h);
        this.ModifyVehicleTagsOnExit.set(h.TagId, !!e);
      }
    }
    this.EnableBlockingCheck = i.EnableBlockingCheck;
    this.MaxBlockingTimeOut = i.MaxBlockingTimeOut;
  }
  DeepCopy(t) {
    this.ModifyVehicleTagsOnEnter.clear();
    for (var [i, s] of t.ModifyVehicleTagsOnEnter) {
      this.ModifyVehicleTagsOnEnter.set(i, s);
    }
    this.ModifyVehicleTagsOnExit.clear();
    for (var [o, h] of t.ModifyVehicleTagsOnExit) {
      this.ModifyVehicleTagsOnExit.set(o, h);
    }
    this.EnableBlockingCheck = t.EnableBlockingCheck;
    this.MaxBlockingTimeOut = t.MaxBlockingTimeOut;
  }
}
exports.CommonConfig = CommonConfig;
class BasicRailMoveConfig {
  constructor() {
    this.MaxDeltaTimeForMoveUpdate = 0.05;
    this.DefaultMoveSpeed = 1500;
    this.AllowUseSkillIds = new Set();
    this.AutoEnterRailCdAfterLeaveRailMove = 0.5;
    this.AutoEnterRailCdAfterLeaveRail = 0;
    this.ClientEventHandlers = new Map();
    this.ModifyVehicleTagsOnEnterRail = new Map();
    this.ModifyVehicleTagsOnLeaveRail = new Map();
    this.ModifyVehicleBuffsOnEnterRail = new Map();
    this.ModifyVehicleBuffsOnLeaveRail = new Map();
    this.ModifyDriverPlayerTagsOnEnterRail = new Map();
    this.ModifyDriverPlayerTagsOnLeaveRail = new Map();
    this.ModifyDriverBuffsOnEnterRail = new Map();
    this.ModifyDriverBuffsOnLeaveRail = new Map();
  }
  UpdateFromUeData(i) {
    this.MaxDeltaTimeForMoveUpdate = i.MaxDeltaTimeForMoveUpdate;
    this.DefaultMoveSpeed = i.DefaultMoveSpeed;
    this.AllowUseSkillIds.clear();
    for (let t = 0; t < i.AllowUseSkillIds.Num(); t++) {
      var s;
      if (i.AllowUseSkillIds.IsValidIndex(t)) {
        s = i.AllowUseSkillIds.Get(t);
        this.AllowUseSkillIds.add(s);
      }
    }
    this.AutoEnterRailCdAfterLeaveRailMove = i.AutoEnterRailCdAfterLeaveRailMove;
    this.AutoEnterRailCdAfterLeaveRail = i.AutoEnterRailCdAfterLeaveRail;
    this.ClientEventHandlers.clear();
    for (let t = 0; t < i.ClientEventHandlers.Num(); t++) {
      var o;
      var h;
      var e;
      if (i.ClientEventHandlers.IsValidIndex(t) && (o = i.ClientEventHandlers.GetKey(t), h = i.ClientEventHandlers.Get(o))) {
        (e = new RailMoveEventHandler()).UpdateFromUeData(h);
        this.ClientEventHandlers.set(o.TagId, e);
      }
    }
    this.ModifyVehicleTagsOnEnterRail.clear();
    for (let t = 0; t < i.ModifyVehicleTagsOnEnterRail.Num(); t++) {
      var a;
      var r;
      if (i.ModifyVehicleTagsOnEnterRail.IsValidIndex(t)) {
        a = i.ModifyVehicleTagsOnEnterRail.GetKey(t);
        r = i.ModifyVehicleTagsOnEnterRail.Get(a);
        this.ModifyVehicleTagsOnEnterRail.set(a.TagId, !!r);
      }
    }
    this.ModifyVehicleTagsOnLeaveRail.clear();
    for (let t = 0; t < i.ModifyVehicleTagsOnLeaveRail.Num(); t++) {
      var n;
      var p;
      if (i.ModifyVehicleTagsOnLeaveRail.IsValidIndex(t)) {
        n = i.ModifyVehicleTagsOnLeaveRail.GetKey(t);
        p = i.ModifyVehicleTagsOnLeaveRail.Get(n);
        this.ModifyVehicleTagsOnLeaveRail.set(n.TagId, !!p);
      }
    }
    this.ModifyVehicleBuffsOnEnterRail.clear();
    for (let t = 0; t < i.ModifyVehicleBuffsOnEnterRail.Num(); t++) {
      var f;
      var l;
      if (i.ModifyVehicleBuffsOnEnterRail.IsValidIndex(t)) {
        f = i.ModifyVehicleBuffsOnEnterRail.GetKey(t);
        l = i.ModifyVehicleBuffsOnEnterRail.Get(f);
        this.ModifyVehicleBuffsOnEnterRail.set(Number(f), !!l);
      }
    }
    this.ModifyVehicleBuffsOnLeaveRail.clear();
    for (let t = 0; t < i.ModifyVehicleBuffsOnLeaveRail.Num(); t++) {
      var C;
      var c;
      if (i.ModifyVehicleBuffsOnLeaveRail.IsValidIndex(t)) {
        C = i.ModifyVehicleBuffsOnLeaveRail.GetKey(t);
        c = i.ModifyVehicleBuffsOnLeaveRail.Get(C);
        this.ModifyVehicleBuffsOnLeaveRail.set(Number(C), !!c);
      }
    }
    this.ModifyDriverPlayerTagsOnEnterRail.clear();
    for (let t = 0; t < i.ModifyDriverPlayerTagsOnEnterRail.Num(); t++) {
      var v;
      var g;
      if (i.ModifyDriverPlayerTagsOnEnterRail.IsValidIndex(t)) {
        v = i.ModifyDriverPlayerTagsOnEnterRail.GetKey(t);
        g = i.ModifyDriverPlayerTagsOnEnterRail.Get(v);
        this.ModifyDriverPlayerTagsOnEnterRail.set(v.TagId, !!g);
      }
    }
    this.ModifyDriverPlayerTagsOnLeaveRail.clear();
    for (let t = 0; t < i.ModifyDriverPlayerTagsOnLeaveRail.Num(); t++) {
      var m;
      var w;
      if (i.ModifyDriverPlayerTagsOnLeaveRail.IsValidIndex(t)) {
        m = i.ModifyDriverPlayerTagsOnLeaveRail.GetKey(t);
        w = i.ModifyDriverPlayerTagsOnLeaveRail.Get(m);
        this.ModifyDriverPlayerTagsOnLeaveRail.set(m.TagId, !!w);
      }
    }
    this.ModifyDriverBuffsOnEnterRail.clear();
    for (let t = 0; t < i.ModifyDriverBuffsOnEnterRail.Num(); t++) {
      var M;
      var R;
      if (i.ModifyDriverBuffsOnEnterRail.IsValidIndex(t)) {
        M = i.ModifyDriverBuffsOnEnterRail.GetKey(t);
        R = i.ModifyDriverBuffsOnEnterRail.Get(M);
        this.ModifyDriverBuffsOnEnterRail.set(Number(M), !!R);
      }
    }
    this.ModifyDriverBuffsOnLeaveRail.clear();
    for (let t = 0; t < i.ModifyDriverBuffsOnLeaveRail.Num(); t++) {
      var u;
      var D;
      if (i.ModifyDriverBuffsOnLeaveRail.IsValidIndex(t)) {
        u = i.ModifyDriverBuffsOnLeaveRail.GetKey(t);
        D = i.ModifyDriverBuffsOnLeaveRail.Get(u);
        this.ModifyDriverBuffsOnLeaveRail.set(Number(u), !!D);
      }
    }
  }
  DeepCopy(t) {
    this.MaxDeltaTimeForMoveUpdate = t.MaxDeltaTimeForMoveUpdate;
    this.DefaultMoveSpeed = t.DefaultMoveSpeed;
    this.AllowUseSkillIds.clear();
    for (const u of t.AllowUseSkillIds) {
      this.AllowUseSkillIds.add(u);
    }
    this.AutoEnterRailCdAfterLeaveRailMove = t.AutoEnterRailCdAfterLeaveRailMove;
    this.AutoEnterRailCdAfterLeaveRail = t.AutoEnterRailCdAfterLeaveRail;
    this.ClientEventHandlers.clear();
    for (var [i, s] of t.ClientEventHandlers) {
      var o = new RailMoveEventHandler();
      o.DeepCopy(s);
      this.ClientEventHandlers.set(i, o);
    }
    this.ModifyVehicleTagsOnEnterRail.clear();
    for (var [h, e] of t.ModifyVehicleTagsOnEnterRail) {
      this.ModifyVehicleTagsOnEnterRail.set(h, e);
    }
    this.ModifyVehicleTagsOnLeaveRail.clear();
    for (var [a, r] of t.ModifyVehicleTagsOnLeaveRail) {
      this.ModifyVehicleTagsOnLeaveRail.set(a, r);
    }
    this.ModifyVehicleBuffsOnEnterRail.clear();
    for (var [n, p] of t.ModifyVehicleBuffsOnEnterRail) {
      this.ModifyVehicleBuffsOnEnterRail.set(n, p);
    }
    this.ModifyVehicleBuffsOnLeaveRail.clear();
    for (var [f, l] of t.ModifyVehicleBuffsOnLeaveRail) {
      this.ModifyVehicleBuffsOnLeaveRail.set(f, l);
    }
    this.ModifyDriverPlayerTagsOnEnterRail.clear();
    for (var [C, c] of t.ModifyDriverPlayerTagsOnEnterRail) {
      this.ModifyDriverPlayerTagsOnEnterRail.set(C, c);
    }
    this.ModifyDriverPlayerTagsOnLeaveRail.clear();
    for (var [v, g] of t.ModifyDriverPlayerTagsOnLeaveRail) {
      this.ModifyDriverPlayerTagsOnLeaveRail.set(v, g);
    }
    this.ModifyDriverBuffsOnEnterRail.clear();
    for (var [m, w] of t.ModifyDriverBuffsOnEnterRail) {
      this.ModifyDriverBuffsOnEnterRail.set(m, w);
    }
    this.ModifyDriverBuffsOnLeaveRail.clear();
    for (var [M, R] of t.ModifyDriverBuffsOnLeaveRail) {
      this.ModifyDriverBuffsOnLeaveRail.set(M, R);
    }
  }
}
exports.BasicRailMoveConfig = BasicRailMoveConfig;
class JumpToRailConfig {
  constructor() {
    this.CommonConfig = new CommonConfig();
    this.SkillId = 100010012;
    this.EnterRailCondition = new EnterRailCondition();
    this.ParabolaMoveConfig = new ParabolaMoveConfig();
  }
  UpdateFromUeData(t) {
    this.CommonConfig.UpdateFromUeData(t.CommonConfig);
    this.SkillId = t.SkillId;
    this.EnterRailCondition.UpdateFromUeData(t.EnterCondition);
    this.ParabolaMoveConfig.UpdateFromUeData(t.ParabolaMove);
  }
  DeepCopy(t) {
    this.CommonConfig.DeepCopy(t.CommonConfig);
    this.SkillId = t.SkillId;
    this.EnterRailCondition.DeepCopy(t.EnterRailCondition);
    this.ParabolaMoveConfig.DeepCopy(t.ParabolaMoveConfig);
  }
}
exports.JumpToRailConfig = JumpToRailConfig;
class SwitchRailConfig {
  constructor() {
    this.CommonConfig = new CommonConfig();
    this.SkillId = 100010015;
    this.EnterRailCondition = new EnterRailCondition();
    this.ParabolaMoveConfig = new ParabolaMoveConfig();
  }
  UpdateFromUeData(t) {
    this.CommonConfig.UpdateFromUeData(t.CommonConfig);
    this.SkillId = t.SkillId;
    this.EnterRailCondition.UpdateFromUeData(t.EnterCondition);
    this.ParabolaMoveConfig.UpdateFromUeData(t.ParabolaMove);
  }
  DeepCopy(t) {
    this.CommonConfig.DeepCopy(t.CommonConfig);
    this.SkillId = t.SkillId;
    this.EnterRailCondition.DeepCopy(t.EnterRailCondition);
    this.ParabolaMoveConfig.DeepCopy(t.ParabolaMoveConfig);
  }
}
exports.SwitchRailConfig = SwitchRailConfig;
class JumpOffRailConfig {
  constructor() {
    this.CommonConfig = new CommonConfig();
    this.SkillId = 100010016;
    this.SideOffsetAbs = 300;
    this.ParabolaMoveConfig = new ParabolaMoveConfig();
  }
  UpdateFromUeData(t) {
    this.CommonConfig.UpdateFromUeData(t.CommonConfig);
    this.SkillId = t.SkillId;
    this.SideOffsetAbs = t.SideOffsetAbs;
    this.ParabolaMoveConfig.UpdateFromUeData(t.ParabolaMove);
  }
  DeepCopy(t) {
    this.CommonConfig.DeepCopy(t.CommonConfig);
    this.SkillId = t.SkillId;
    this.SideOffsetAbs = t.SideOffsetAbs;
    this.ParabolaMoveConfig.DeepCopy(t.ParabolaMoveConfig);
  }
}
exports.JumpOffRailConfig = JumpOffRailConfig;
class JumpAlongRailConfig {
  constructor() {
    this.CommonConfig = new CommonConfig();
    this.SkillId = 100010016;
    this.ParabolaMoveConfig = new ParabolaMoveConfig();
  }
  UpdateFromUeData(t) {
    this.CommonConfig.UpdateFromUeData(t.CommonConfig);
    this.SkillId = t.SkillId;
    this.ParabolaMoveConfig.UpdateFromUeData(t.ParabolaMove);
  }
  DeepCopy(t) {
    this.CommonConfig.DeepCopy(t.CommonConfig);
    this.SkillId = t.SkillId;
    this.ParabolaMoveConfig.DeepCopy(t.ParabolaMoveConfig);
  }
}
exports.JumpAlongRailConfig = JumpAlongRailConfig;
class DirectlyEnterRailConfig {
  constructor() {
    this.CommonConfig = new CommonConfig();
    this.MaxAbsorbDist = 100;
    this.EnterRailCondition = new EnterRailCondition();
    this.LinearMoveConfig = new LinearMoveConfig();
  }
  UpdateFromUeData(t) {
    this.CommonConfig.UpdateFromUeData(t.CommonConfig);
    this.MaxAbsorbDist = t.MaxAbsorbDist;
    this.EnterRailCondition.UpdateFromUeData(t.EnterCondition);
    this.LinearMoveConfig.UpdateFromUeData(t.LinearMove);
  }
  DeepCopy(t) {
    this.CommonConfig.DeepCopy(t.CommonConfig);
    this.MaxAbsorbDist = t.MaxAbsorbDist;
    this.EnterRailCondition.DeepCopy(t.EnterRailCondition);
    this.LinearMoveConfig.DeepCopy(t.LinearMoveConfig);
  }
}
exports.DirectlyEnterRailConfig = DirectlyEnterRailConfig;
class AccelerateAlongRailConfig {
  constructor() {
    this.CommonConfig = new CommonConfig();
    this.LinearMoveConfig = new LinearMoveConfig();
  }
  UpdateFromUeData(t) {
    this.CommonConfig.UpdateFromUeData(t.CommonConfig);
    this.LinearMoveConfig.UpdateFromUeData(t.LinearMove);
  }
  DeepCopy(t) {
    this.CommonConfig.DeepCopy(t.CommonConfig);
    this.LinearMoveConfig.DeepCopy(t.LinearMoveConfig);
  }
}
exports.AccelerateAlongRailConfig = AccelerateAlongRailConfig;
class ParabolaMoveConfig {
  constructor() {
    this.GravityAccelerationAbs = 980;
    this.Duration = 0.5;
    this.MinSpeedAlongRail = 10;
    this.MaxSpeedAlongRail = 3500;
  }
  UpdateFromUeData(t) {
    this.GravityAccelerationAbs = t.GravityAccelerationAbs;
    this.Duration = t.Duration;
    this.MinSpeedAlongRail = t.MinSpeedAlongRail;
    this.MaxSpeedAlongRail = t.MaxSpeedAlongRail;
  }
  DeepCopy(t) {
    this.GravityAccelerationAbs = t.GravityAccelerationAbs;
    this.Duration = t.Duration;
    this.MinSpeedAlongRail = t.MinSpeedAlongRail;
    this.MaxSpeedAlongRail = t.MaxSpeedAlongRail;
  }
}
exports.ParabolaMoveConfig = ParabolaMoveConfig;
class LinearMoveConfig {
  constructor() {
    this.MinSpeed = 10;
    this.MaxSpeed = 3500;
  }
  UpdateFromUeData(t) {
    this.MinSpeed = t.MinSpeed;
    this.MaxSpeed = t.MaxSpeed;
  }
  DeepCopy(t) {
    this.MinSpeed = t.MinSpeed;
    this.MaxSpeed = t.MaxSpeed;
  }
}
exports.LinearMoveConfig = LinearMoveConfig;
class EnterRailCondition {
  constructor() {
    this.MaxAngleBetweenForwardAndRailTangent = 90;
    this.MaxAngleBetweenUpAndRailUp = 90;
    this.MaxAngleBetweenVelocityAndRailTangent = 90;
    this.MinRailLenLeftAfterEnterRail = 100;
    this.MaxAngleBetweenTargetUpAndDirPlaneProjectionOfTargetToCurrent = 90;
  }
  UpdateFromUeData(t) {
    this.MaxAngleBetweenForwardAndRailTangent = t.MaxAngleBetweenForwardAndRailTangent;
    this.MaxAngleBetweenUpAndRailUp = t.MaxAngleBetweenUpAndRailUp;
    this.MaxAngleBetweenVelocityAndRailTangent = t.MaxAngleBetweenVelocityAndRailTangent;
    this.MinRailLenLeftAfterEnterRail = t.MinRailLenLeftAfterEnterRail;
    this.MaxAngleBetweenTargetUpAndDirPlaneProjectionOfTargetToCurrent = t.MaxAngleBetweenTargetUpAndDirPlaneProjectionOfTargetToCurrent;
  }
  DeepCopy(t) {
    this.MaxAngleBetweenForwardAndRailTangent = t.MaxAngleBetweenForwardAndRailTangent;
    this.MaxAngleBetweenUpAndRailUp = t.MaxAngleBetweenUpAndRailUp;
    this.MaxAngleBetweenVelocityAndRailTangent = t.MaxAngleBetweenVelocityAndRailTangent;
    this.MinRailLenLeftAfterEnterRail = t.MinRailLenLeftAfterEnterRail;
    this.MaxAngleBetweenTargetUpAndDirPlaneProjectionOfTargetToCurrent = t.MaxAngleBetweenTargetUpAndDirPlaneProjectionOfTargetToCurrent;
  }
}
exports.EnterRailCondition = EnterRailCondition;
class RailMoveEventHandler {
  constructor() {
    this.ModifyCues = new Map();
  }
  UpdateFromUeData(i) {
    this.ModifyCues.clear();
    for (let t = 0; t < i.ModifyCues.Num(); t++) {
      var s;
      var o;
      if (i.ModifyCues.IsValidIndex(t)) {
        s = i.ModifyCues.GetKey(t);
        o = i.ModifyCues.Get(s);
        this.ModifyCues.set(s, !!o);
      }
    }
  }
  DeepCopy(t) {
    this.ModifyCues.clear();
    for (var [i, s] of t.ModifyCues) {
      this.ModifyCues.set(i, s);
    }
  }
}
exports.RailMoveEventHandler = RailMoveEventHandler;
class MotorcycleRailMoveConfig {
  constructor() {
    this.BasicRailMoveConfig = new BasicRailMoveConfig();
    this.DirectlyEnterRailConfig = new DirectlyEnterRailConfig();
    this.AccelerateAlongRailConfig = new AccelerateAlongRailConfig();
    this.JumpToRailConfig = new JumpToRailConfig();
    this.SwitchRailConfig = new SwitchRailConfig();
    this.JumpOffRailConfig = new JumpOffRailConfig();
    this.JumpAlongRailConfig = new JumpAlongRailConfig();
  }
  UpdateFromUeData(t) {
    if (t.EnableBasicConfig) {
      this.BasicRailMoveConfig.UpdateFromUeData(t.BasicConfig);
    }
    if (t.EnableDirectlyEnterRailConfig) {
      this.DirectlyEnterRailConfig.UpdateFromUeData(t.DirectlyEnterRailConfig);
    }
    if (t.EnableAccelerateAlongRailConfig) {
      this.AccelerateAlongRailConfig.UpdateFromUeData(t.AccelerateAlongRailConfig);
    }
    if (t.EnableJumpToRailConfig) {
      this.JumpToRailConfig.UpdateFromUeData(t.JumpToRailConfig);
    }
    if (t.EnableSwitchRailConfig) {
      this.SwitchRailConfig.UpdateFromUeData(t.SwitchRailConfig);
    }
    if (t.EnableJumpOffRailConfig) {
      this.JumpOffRailConfig.UpdateFromUeData(t.JumpOffRailConfig);
    }
    if (t.EnableJumpAlongRailConfig) {
      this.JumpAlongRailConfig.UpdateFromUeData(t.JumpAlongRailConfig);
    }
  }
  DeepCopy(t) {
    this.BasicRailMoveConfig.DeepCopy(t.BasicRailMoveConfig);
    this.DirectlyEnterRailConfig.DeepCopy(t.DirectlyEnterRailConfig);
    this.AccelerateAlongRailConfig.DeepCopy(t.AccelerateAlongRailConfig);
    this.JumpToRailConfig.DeepCopy(t.JumpToRailConfig);
    this.SwitchRailConfig.DeepCopy(t.SwitchRailConfig);
    this.JumpOffRailConfig.DeepCopy(t.JumpOffRailConfig);
    this.JumpAlongRailConfig.DeepCopy(t.JumpAlongRailConfig);
  }
  ClearObject() {
    return true;
  }
}
exports.MotorcycleRailMoveConfig = MotorcycleRailMoveConfig;
//# sourceMappingURL=MotorcycleRailMoveConfigs.js.map