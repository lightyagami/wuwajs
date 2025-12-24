"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaSkillInteractBase = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class PhantomArenaSkillInteractBase {
  constructor() {
    this.BattleProxy = undefined;
    this.Info = undefined;
    this.Data = undefined;
  }
  async Execute(t, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "开始执行Buff交互操作");
    }
    this.BattleProxy = t;
    this.Info = e;
    this.Data = this.Info.GetData();
    return this.OnExecute(this.BattleProxy);
  }
  async RequestSelectResultInfo(t) {
    if (this.Data.IsFight) {
      return ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleSlotCardSkill(this.Data.DataId, t, this.Data.SkillId, this.Data.IsClickInteract);
    } else if (this.Data.IsPassive) {
      return this.PassiveSkillRequest(t);
    } else if (this.Data.IsRole) {
      return ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestBattleCardRoleSkill(this.Data.DataId, t);
    } else {
      return ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestBattleCardSkill(this.Data.DataId, t);
    }
  }
  async PassiveSkillRequest(t) {
    return ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleSelectTarget(t);
  }
}
exports.PhantomArenaSkillInteractBase = PhantomArenaSkillInteractBase;
//# sourceMappingURL=PhantomArenaSkillInteractBase.js.map