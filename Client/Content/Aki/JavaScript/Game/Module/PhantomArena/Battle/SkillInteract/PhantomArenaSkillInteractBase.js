"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaSkillInteractBase = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
class PhantomArenaSkillInteractBase {
  constructor() {
    this.BattleProxy = undefined;
    this.Info = undefined;
    this.Data = undefined;
  }
  async Execute(e, t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "开始执行Buff交互操作");
    }
    this.BattleProxy = e;
    this.Info = t;
    this.Data = this.Info.GetData();
    return this.OnExecute(this.BattleProxy);
  }
  async RequestSelectResultInfo(e) {
    if (this.Data.LastCardIndex !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
      return ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleSlotCardSkill(this.Data.DataId, e);
    } else if (this.Data.IsPassive) {
      return ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleSelectTarget(e);
    } else if (this.Data.IsRole) {
      return ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestBattleCardRoleSkill(this.Data.DataId, e);
    } else {
      return ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestBattleCardSkill(this.Data.DataId, e);
    }
  }
}
exports.PhantomArenaSkillInteractBase = PhantomArenaSkillInteractBase;
//# sourceMappingURL=PhantomArenaSkillInteractBase.js.map