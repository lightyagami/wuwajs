"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaAiOperationFactory = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const AddBuffOperation_1 = require("./AddBuffOperation");
const BackSlotCardLibraryOperation_1 = require("./BackSlotCardLibraryOperation");
const BackToLibraryOperation_1 = require("./BackToLibraryOperation");
const CardAttrOperation_1 = require("./CardAttrOperation");
const ChangeCardOperation_1 = require("./ChangeCardOperation");
const DiscardCardOperation_1 = require("./DiscardCardOperation");
const EvolveCardOperation_1 = require("./EvolveCardOperation");
const FourCostTaskOperation_1 = require("./FourCostTaskOperation");
const GamerStatusOperation_1 = require("./GamerStatusOperation");
const LeaveSlotOperation_1 = require("./LeaveSlotOperation");
const NpcCardUpdateOperation_1 = require("./NpcCardUpdateOperation");
const ReserveCardOperation_1 = require("./ReserveCardOperation");
const SettingCardOperation_1 = require("./SettingCardOperation");
const SkillTriggerOperation_1 = require("./SkillTriggerOperation");
const UseCardSkillOperation_1 = require("./UseCardSkillOperation");
const UseRoleSkillOperation_1 = require("./UseRoleSkillOperation");
class PhantomArenaAiOperationFactory {
  static GetAiOperation(r, ...e) {
    var a = this.E01[r];
    if (a) {
      return new a(...e);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 10, "Ai操作类型不存在!代码未进行注册", ["type", r]);
    }
    throw new Error("未注册的Buff类型: " + r);
  }
}
(exports.PhantomArenaAiOperationFactory = PhantomArenaAiOperationFactory).E01 = {
  [0]: SettingCardOperation_1.SettingCardOperation,
  1: EvolveCardOperation_1.EvolveCardOperation,
  2: ChangeCardOperation_1.ChangeCardOperation,
  4: UseCardSkillOperation_1.UseCardSkillOperation,
  3: UseRoleSkillOperation_1.UseRoleSkillOperation,
  5: AddBuffOperation_1.AddBuffOperation,
  6: BackToLibraryOperation_1.BackToLibraryOperation,
  7: SkillTriggerOperation_1.SkillTriggerOperation,
  8: GamerStatusOperation_1.GamerStatusOperation,
  9: CardAttrOperation_1.CardAttrOperation,
  10: DiscardCardOperation_1.DiscardCardOperation,
  11: FourCostTaskOperation_1.FourCostTaskOperation,
  12: LeaveSlotOperation_1.LeaveSlotOperation,
  13: BackSlotCardLibraryOperation_1.BackSlotCardLibraryOperation,
  14: ReserveCardOperation_1.ReserveCardOperation,
  15: NpcCardUpdateOperation_1.NpcCardUpdateOperation
};
//# sourceMappingURL=PhantomArenaAiOperationFactory.js.map