"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaNormalSkillInteract = undefined;
const PhantomArenaSkillInteractBase_1 = require("./PhantomArenaSkillInteractBase");
class PhantomArenaNormalSkillInteract extends PhantomArenaSkillInteractBase_1.PhantomArenaSkillInteractBase {
  async OnExecute(e) {
    if (await this.RequestSelectResultInfo([])) {
      return 0;
    } else {
      return 1;
    }
  }
}
exports.PhantomArenaNormalSkillInteract = PhantomArenaNormalSkillInteract;
//# sourceMappingURL=PhantomArenaNormalSkillInteract.js.map