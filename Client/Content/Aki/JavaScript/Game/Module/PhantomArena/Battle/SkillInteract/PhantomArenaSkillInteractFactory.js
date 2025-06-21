"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaSkillInteractFactory = void 0;
const PhantomArenaAddBuffSkillInteract_1 = require("./PhantomArenaAddBuffSkillInteract"),
  PhantomArenaChooseCardSkillInteract_1 = require("./PhantomArenaChooseCardSkillInteract"),
  PhantomArenaNormalSkillInteract_1 = require("./PhantomArenaNormalSkillInteract");
class PhantomArenaSkillInteractFactory {
  static GetSkillInteract(t) {
    t = this.h31.get(t);
    return new(t || PhantomArenaNormalSkillInteract_1.PhantomArenaNormalSkillInteract)
  }
}(exports.PhantomArenaSkillInteractFactory = PhantomArenaSkillInteractFactory).h31 = new Map([
  [2, PhantomArenaAddBuffSkillInteract_1.PhantomArenaAddBuffSkillInteract],
  [7, PhantomArenaChooseCardSkillInteract_1.PhantomArenaChooseCardSkillInteract]
]);
//# sourceMappingURL=PhantomArenaSkillInteractFactory.js.map