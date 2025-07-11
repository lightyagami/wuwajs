"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaPassiveSkillTriggerLogic = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
const PhantomArenaSkillInteractFactory_1 = require("./PhantomArenaSkillInteractFactory");
class PhantomArenaPassiveSkillTriggerLogic {
  constructor(e, t) {
    this.ViewProxy = t;
    this.Data = undefined;
    this.Data = {
      InteractType: e.eF1,
      SelectFightIdList: e.uE1,
      SelectNum: e.D8n,
      IsRole: false,
      IsPassive: true,
      LastCardIndex: PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX
    };
  }
  async Execute() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "触发被动技能选择");
    }
    await PhantomArenaSkillInteractFactory_1.PhantomArenaSkillInteractFactory.GetSkillInteract(this.Data.InteractType).Execute(this.ViewProxy, this);
  }
  GetData() {
    return this.Data;
  }
}
exports.PhantomArenaPassiveSkillTriggerLogic = PhantomArenaPassiveSkillTriggerLogic;
//# sourceMappingURL=PhantomArenaPassiveSkillTriggerLogic.js.map