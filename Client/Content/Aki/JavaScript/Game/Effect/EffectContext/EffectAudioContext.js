"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectAudioContext = undefined;
const cpp_1 = require("cpp");
const EffectContext_1 = require("./EffectContext");
class EffectAudioContext extends EffectContext_1.EffectContext {
  constructor() {
    super(...arguments);
    this.FromPrimaryRole = false;
  }
  ToKuroEffectContext(t) {
    super.ToKuroEffectContext(t);
    if (t instanceof cpp_1.FEffectAudioContext) {
      t.FromPrimaryRole = this.FromPrimaryRole;
    }
  }
}
exports.EffectAudioContext = EffectAudioContext;
//# sourceMappingURL=EffectAudioContext.js.map