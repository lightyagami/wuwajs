"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaNormalSkillInteract = void 0;
const PhantomArenaSkillInteractBase_1 = require("./PhantomArenaSkillInteractBase");
class PhantomArenaNormalSkillInteract extends PhantomArenaSkillInteractBase_1.PhantomArenaSkillInteractBase {
  async OnExecute(e) {
    return await this.RequestSelectResultInfo([]) ? 0 : 1
  }
}
exports.PhantomArenaNormalSkillInteract = PhantomArenaNormalSkillInteract;
//# sourceMappingURL=PhantomArenaNormalSkillInteract.js.map