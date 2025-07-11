"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFloroRanchEntityComponentDefine = undefined;
const FloroRanchCardDataComponent_1 = require("./Component/FloroRanchCardDataComponent");
const FloroRanchEmptyUiComponent_1 = require("./Component/FloroRanchEmptyUiComponent");
const FloroRanchEntityDataComponent_1 = require("./Component/FloroRanchEntityDataComponent");
const FloroRanchMoveComponent_1 = require("./Component/FloroRanchMoveComponent");
const FloroRanchRoleSkillDataComponent_1 = require("./Component/FloroRanchRoleSkillDataComponent");
const FloroRanchTerrainDataComponent_1 = require("./Component/FloroRanchTerrainDataComponent");
const FloroRanchToyDataComponent_1 = require("./Component/FloroRanchToyDataComponent");
const FloroRanchUiCardComponent_1 = require("./Component/FloroRanchUiCardComponent");
const FloroRanchUiPopupRewardComponent_1 = require("./Component/FloroRanchUiPopupRewardComponent");
const FloroRanchUiRoleSkillComponent_1 = require("./Component/FloroRanchUiRoleSkillComponent");
const FloroRanchUiTerrainComponent_1 = require("./Component/FloroRanchUiTerrainComponent");
const FloroRanchUiToyComponent_1 = require("./Component/FloroRanchUiToyComponent");
const FloroRanchEntityCreateData_1 = require("./FloroRanchEntityCreateData");
let floroRanchEntityComponentDefine = undefined;
const getFloroRanchEntityComponentDefine = o => (floroRanchEntityComponentDefine = floroRanchEntityComponentDefine || {
  [1]: new FloroRanchEntityCreateData_1.FloroRanchEntityCreateData(1, [FloroRanchEntityDataComponent_1.FloroRanchEntityDataComponent, FloroRanchCardDataComponent_1.FloroRanchCardDataComponent, FloroRanchMoveComponent_1.FloroRanchMoveComponent, FloroRanchUiPopupRewardComponent_1.FloroRanchUiPopupRewardComponent, FloroRanchUiCardComponent_1.FloroRanchUiCardComponent]),
  0: new FloroRanchEntityCreateData_1.FloroRanchEntityCreateData(0, [FloroRanchEntityDataComponent_1.FloroRanchEntityDataComponent, FloroRanchTerrainDataComponent_1.FloroRanchTerrainDataComponent, FloroRanchUiPopupRewardComponent_1.FloroRanchUiPopupRewardComponent, FloroRanchUiTerrainComponent_1.FloroRanchUiTerrainComponent]),
  2: new FloroRanchEntityCreateData_1.FloroRanchEntityCreateData(2, [FloroRanchEntityDataComponent_1.FloroRanchEntityDataComponent, FloroRanchToyDataComponent_1.FloroRanchToyDataComponent, FloroRanchUiPopupRewardComponent_1.FloroRanchUiPopupRewardComponent, FloroRanchUiToyComponent_1.FloroRanchUiToyComponent]),
  3: new FloroRanchEntityCreateData_1.FloroRanchEntityCreateData(3, [FloroRanchEntityDataComponent_1.FloroRanchEntityDataComponent, FloroRanchEmptyUiComponent_1.FloroRanchEmptyUiComponent]),
  4: new FloroRanchEntityCreateData_1.FloroRanchEntityCreateData(4, [FloroRanchEntityDataComponent_1.FloroRanchEntityDataComponent, FloroRanchRoleSkillDataComponent_1.FloroRanchRoleSkillDataComponent, FloroRanchUiRoleSkillComponent_1.FloroRanchUiRoleSkillComponent, FloroRanchUiPopupRewardComponent_1.FloroRanchUiPopupRewardComponent])
})[o];
exports.getFloroRanchEntityComponentDefine = getFloroRanchEntityComponentDefine;
//# sourceMappingURL=FloroRanchEntityDefine.js.map