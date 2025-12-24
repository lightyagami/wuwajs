"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaPassiveSkillTriggerLogic = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const PhantomArenaSkillInteractFactory_1 = require("./PhantomArenaSkillInteractFactory");
class PhantomArenaPassiveSkillTriggerLogic {
  constructor(t, e) {
    this.ViewProxy = e;
    this.Data = undefined;
    this.Data = {
      InteractType: t.eF1,
      SelectFightIdList: t.uE1,
      SelectNum: t.D8n,
      IsRole: false,
      IsPassive: true,
      IsFight: false,
      IsClickInteract: false,
      DataId: t.dRf
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