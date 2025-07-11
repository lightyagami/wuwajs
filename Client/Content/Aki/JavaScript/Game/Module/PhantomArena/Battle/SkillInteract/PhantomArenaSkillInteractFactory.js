"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaSkillInteractFactory = undefined;
const PhantomArenaAddBuffSkillInteract_1 = require("./PhantomArenaAddBuffSkillInteract");
const PhantomArenaChooseCardSkillInteract_1 = require("./PhantomArenaChooseCardSkillInteract");
const PhantomArenaNormalSkillInteract_1 = require("./PhantomArenaNormalSkillInteract");
class PhantomArenaSkillInteractFactory {
  static GetSkillInteract(t) {
    t = this.F31.get(t);
    return new (t || PhantomArenaNormalSkillInteract_1.PhantomArenaNormalSkillInteract)();
  }
}
(exports.PhantomArenaSkillInteractFactory = PhantomArenaSkillInteractFactory).F31 = new Map([[2, PhantomArenaAddBuffSkillInteract_1.PhantomArenaAddBuffSkillInteract], [7, PhantomArenaChooseCardSkillInteract_1.PhantomArenaChooseCardSkillInteract]]);
//# sourceMappingURL=PhantomArenaSkillInteractFactory.js.map