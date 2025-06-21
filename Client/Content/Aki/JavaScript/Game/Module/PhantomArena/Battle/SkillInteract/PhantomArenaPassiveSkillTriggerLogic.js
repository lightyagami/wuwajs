"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaPassiveSkillTriggerLogic = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  PhantomArenaDefine_1 = require("../PhantomArenaDefine"),
  PhantomArenaSkillInteractFactory_1 = require("./PhantomArenaSkillInteractFactory");
class PhantomArenaPassiveSkillTriggerLogic {
  constructor(e, t) {
    this.ViewProxy = t, this.Data = void 0, this.Data = {
      InteractType: e.EG1,
      SelectFightIdList: e.VM1,
      SelectNum: e.D8n,
      IsRole: !1,
      IsPassive: !0,
      LastCardIndex: PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX
    }
  }
  async Execute() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "触发被动技能选择"), await PhantomArenaSkillInteractFactory_1.PhantomArenaSkillInteractFactory.GetSkillInteract(this.Data.InteractType).Execute(this.ViewProxy, this)
  }
  GetData() {
    return this.Data
  }
}
exports.PhantomArenaPassiveSkillTriggerLogic = PhantomArenaPassiveSkillTriggerLogic;
//# sourceMappingURL=PhantomArenaPassiveSkillTriggerLogic.js.map