"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaSkillInteractBase = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  PhantomArenaDefine_1 = require("../PhantomArenaDefine");
class PhantomArenaSkillInteractBase {
  constructor() {
    this.BattleProxy = void 0, this.Info = void 0, this.Data = void 0
  }
  async Execute(e, t) {
    return Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "开始执行Buff交互操作"), this.BattleProxy = e, this.Info = t, this.Data = this.Info.GetData(), this.OnExecute(this.BattleProxy)
  }
  async RequestSelectResultInfo(e) {
    return this.Data.LastCardIndex !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX ? ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleSlotCardSkill(this.Data.DataId, e) : this.Data.IsPassive ? ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleSelectTarget(e) : this.Data.IsRole ? ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestBattleCardRoleSkill(this.Data.DataId, e) : ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestBattleCardSkill(this.Data.DataId, e)
  }
}
exports.PhantomArenaSkillInteractBase = PhantomArenaSkillInteractBase;
//# sourceMappingURL=PhantomArenaSkillInteractBase.js.map