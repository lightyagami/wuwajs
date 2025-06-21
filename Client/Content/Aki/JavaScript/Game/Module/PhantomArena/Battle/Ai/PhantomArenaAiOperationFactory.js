"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaAiOperationFactory = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  AddBuffOperation_1 = require("./AddBuffOperation"),
  BackSlotCardLibraryOperation_1 = require("./BackSlotCardLibraryOperation"),
  BackToLibraryOperation_1 = require("./BackToLibraryOperation"),
  CardAttrOperation_1 = require("./CardAttrOperation"),
  ChangeCardOperation_1 = require("./ChangeCardOperation"),
  DiscardCardOperation_1 = require("./DiscardCardOperation"),
  EvolveCardOperation_1 = require("./EvolveCardOperation"),
  FourCostTaskOperation_1 = require("./FourCostTaskOperation"),
  GamerStatusOperation_1 = require("./GamerStatusOperation"),
  LeaveSlotOperation_1 = require("./LeaveSlotOperation"),
  NpcCardUpdateOperation_1 = require("./NpcCardUpdateOperation"),
  ReserveCardOperation_1 = require("./ReserveCardOperation"),
  SettingCardOperation_1 = require("./SettingCardOperation"),
  SkillTriggerOperation_1 = require("./SkillTriggerOperation"),
  UseCardSkillOperation_1 = require("./UseCardSkillOperation"),
  UseRoleSkillOperation_1 = require("./UseRoleSkillOperation");
class PhantomArenaAiOperationFactory {
  static GetAiOperation(r, ...e) {
    var a = this.e01[r];
    if (a) return new a(...e);
    throw Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "Ai操作类型不存在!代码未进行注册", ["type", r]), new Error("未注册的Buff类型: " + r)
  }
}(exports.PhantomArenaAiOperationFactory = PhantomArenaAiOperationFactory).e01 = {
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