"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaChooseCardSkillInteract = undefined;
const PhantomArenaSkillInteractBase_1 = require("./PhantomArenaSkillInteractBase");
class PhantomArenaChooseCardSkillInteract extends PhantomArenaSkillInteractBase_1.PhantomArenaSkillInteractBase {
  async OnExecute(e) {
    if (await this.RequestSelectResultInfo([])) {
      return 0;
    } else {
      return 1;
    }
  }
}
exports.PhantomArenaChooseCardSkillInteract = PhantomArenaChooseCardSkillInteract;
//# sourceMappingURL=PhantomArenaChooseCardSkillInteract.js.map