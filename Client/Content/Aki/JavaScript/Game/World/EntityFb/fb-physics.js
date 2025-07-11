"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionAngularConstraintMotion = exports.PhysicsAngularLimit = exports.AcmLocked = exports.AcmLimited = exports.AcmFree = undefined;
var acm_free_js_1 = require("./fb-physics/acm-free.js");
Object.defineProperty(exports, "AcmFree", {
  enumerable: true,
  get: function () {
    return acm_free_js_1.AcmFree;
  }
});
var acm_limited_js_1 = require("./fb-physics/acm-limited.js");
Object.defineProperty(exports, "AcmLimited", {
  enumerable: true,
  get: function () {
    return acm_limited_js_1.AcmLimited;
  }
});
var acm_locked_js_1 = require("./fb-physics/acm-locked.js");
Object.defineProperty(exports, "AcmLocked", {
  enumerable: true,
  get: function () {
    return acm_locked_js_1.AcmLocked;
  }
});
var physics_angular_limit_js_1 = require("./fb-physics/physics-angular-limit.js");
Object.defineProperty(exports, "PhysicsAngularLimit", {
  enumerable: true,
  get: function () {
    return physics_angular_limit_js_1.PhysicsAngularLimit;
  }
});
var union_angular_constraint_motion_js_1 = require("./fb-physics/union-angular-constraint-motion.js");
Object.defineProperty(exports, "UnionAngularConstraintMotion", {
  enumerable: true,
  get: function () {
    return union_angular_constraint_motion_js_1.UnionAngularConstraintMotion;
  }
});
//# sourceMappingURL=fb-physics.js.map