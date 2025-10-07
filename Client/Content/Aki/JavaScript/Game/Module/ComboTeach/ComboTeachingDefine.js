"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inputActionMap = exports.banKeyMap = undefined;
const InputEnums_1 = require("../../Input/InputEnums");
exports.banKeyMap = new Map([["普攻", ["战斗状态.输入限制.禁止攻击", "功能.功能制作.隐藏按钮功能.隐藏普攻按键"]], ["技能", ["战斗状态.输入限制.禁止技能", "功能.功能制作.隐藏按钮功能.隐藏技能按键"]], ["大招", ["战斗状态.输入限制.禁止大招", "功能.功能制作.隐藏按钮功能.隐藏大招按键"]], ["跳跃", ["战斗状态.输入限制.禁止跳跃", "功能.功能制作.隐藏按钮功能.隐藏跳跃按键"]], ["幻象", ["战斗状态.输入限制.禁止幻象1", "战斗状态.输入限制.禁止幻象2", "功能.功能制作.隐藏按钮功能.隐藏探索幻象按键", "功能.功能制作.隐藏按钮功能.隐藏攻击幻象按键"]], ["闪避", ["战斗状态.输入限制.禁止闪避", "功能.功能制作.隐藏按钮功能.隐藏冲刺按键"]]]);
exports.inputActionMap = new Map([[InputEnums_1.EInputAction.跳跃, "跳跃"], [InputEnums_1.EInputAction.攀爬, "攀爬"], [InputEnums_1.EInputAction.走跑切换, "走跑切换"], [InputEnums_1.EInputAction.攻击, "攻击"], [InputEnums_1.EInputAction.闪避, "闪避"], [InputEnums_1.EInputAction.技能1, "技能1"], [InputEnums_1.EInputAction.幻象1, "幻象1"], [InputEnums_1.EInputAction.大招, "大招"], [InputEnums_1.EInputAction.幻象2, "幻象2"], [InputEnums_1.EInputAction.切换角色1, "切换角色1"], [InputEnums_1.EInputAction.切换角色2, "切换角色2"], [InputEnums_1.EInputAction.切换角色3, "切换角色3"], [InputEnums_1.EInputAction.锁定目标, "锁定目标"], [InputEnums_1.EInputAction.瞄准, "瞄准"], [InputEnums_1.EInputAction.通用交互, "通用交互"]]); //# sourceMappingURL=ComboTeachingDefine.js.map