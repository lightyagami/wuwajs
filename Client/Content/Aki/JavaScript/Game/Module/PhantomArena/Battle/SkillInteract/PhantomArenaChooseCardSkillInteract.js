"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaChooseCardSkillInteract = void 0;
const PhantomArenaSkillInteractBase_1 = require("./PhantomArenaSkillInteractBase");
class PhantomArenaChooseCardSkillInteract extends PhantomArenaSkillInteractBase_1.PhantomArenaSkillInteractBase {
  async OnExecute(e) {
    return await this.RequestSelectResultInfo([]) ? 0 : 1
  }
}
exports.PhantomArenaChooseCardSkillInteract = PhantomArenaChooseCardSkillInteract;
//# sourceMappingURL=PhantomArenaChooseCardSkillInteract.js.map