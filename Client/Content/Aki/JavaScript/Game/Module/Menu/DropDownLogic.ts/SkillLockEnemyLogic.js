"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillLockEnemyLogic = undefined;
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MenuController_1 = require("../MenuController");
const DropDownLogicBase_1 = require("./DropDownLogicBase");
const SkillLockEnemyDropDownData_1 = require("./SkillLockEnemyDropDownData");
class SkillLockEnemyLogic extends DropDownLogicBase_1.DropDownLogicBase {
  GetDropDownDataList() {
    var r = [];
    var e = ConfigManager_1.ConfigManager.MenuBaseConfig.GetMenuConfigByFunctionId(GameSettingsDefine_1.EFunction.SkillLockEnemyMode);
    if (e) {
      var n = e.OptionsName;
      for (let e = 0; e < n.length; e++) {
        var a = n[e];
        var a = new SkillLockEnemyDropDownData_1.SkillLockEnemyDropDownData(e, a);
        r.push(a);
      }
    }
    return r;
  }
  GetDataTextId(e, r) {
    return new LguiUtil_1.TableTextArgNew(e.TextId);
  }
  TriggerSelectChange(e, r) {
    var n = MenuController_1.MenuController.GetTargetConfig(r.FunctionId);
    var e = e.Index;
    if (n !== e) {
      GameSettingsManager_1.GameSettingsManager.HandleValueChange(r.FunctionId, e, 1);
      ModelManager_1.ModelManager.MenuModel.IsEdited = true;
    }
  }
  GetDefaultIndex(e) {
    return MenuController_1.MenuController.GetTargetConfig(e.FunctionId);
  }
}
exports.SkillLockEnemyLogic = SkillLockEnemyLogic;
//# sourceMappingURL=SkillLockEnemyLogic.js.map