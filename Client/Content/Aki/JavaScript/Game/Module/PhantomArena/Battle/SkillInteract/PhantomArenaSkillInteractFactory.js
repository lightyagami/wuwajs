"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaSkillInteractFactory = undefined;
const PhantomArenaChooseCardSkillInteract_1 = require("./PhantomArenaChooseCardSkillInteract");
const PhantomArenaNormalSkillInteract_1 = require("./PhantomArenaNormalSkillInteract");
const PhantomArenaSelectSkillInteract_1 = require("./PhantomArenaSelectSkillInteract");
class PhantomArenaSkillInteractFactory {
  static GetSkillInteract(t) {
    t = this.F31.get(t);
    return new (t || PhantomArenaNormalSkillInteract_1.PhantomArenaNormalSkillInteract)();
  }
  static HasSkillInteract(t) {
    return this.F31.has(t);
  }
}
(exports.PhantomArenaSkillInteractFactory = PhantomArenaSkillInteractFactory).F31 = new Map([[2, PhantomArenaSelectSkillInteract_1.PhantomArenaSelectSkillInteract], [7, PhantomArenaChooseCardSkillInteract_1.PhantomArenaChooseCardSkillInteract], [21, PhantomArenaSelectSkillInteract_1.PhantomArenaSelectSkillInteract], [23, PhantomArenaSelectSkillInteract_1.PhantomArenaSelectSkillInteract], [24, PhantomArenaSelectSkillInteract_1.PhantomArenaSelectSkillInteract], [25, PhantomArenaSelectSkillInteract_1.PhantomArenaSelectSkillInteract], [27, PhantomArenaSelectSkillInteract_1.PhantomArenaSelectSkillInteract]]);
//# sourceMappingURL=PhantomArenaSkillInteractFactory.js.map