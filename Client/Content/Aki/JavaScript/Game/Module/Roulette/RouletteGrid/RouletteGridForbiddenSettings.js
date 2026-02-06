"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteGridForbiddenSettings = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
class RouletteGridForbiddenSettings {
  static CheckForbiddenState(e, r) {
    if (e === 0) {
      e = this.qla.get(r);
      if (e) {
        return e();
      }
    }
    return false;
  }
  static TipsForbiddenState(e, r) {
    if (e === 0 && (e = this.Gla.get(r))) {
      e();
    }
  }
  static CheckLockState(e, r) {
    switch (e) {
      case 0:
        if (ModelManager_1.ModelManager.RouletteModel.GetExploreDataBySkillId(r)) {
          break;
        }
        return true;
      case 1:
        if (ModelManager_1.ModelManager.RouletteModel.GetFuncDataByFuncId(r)) {
          break;
        }
        return true;
    }
    return false;
  }
  static TipsLockState(e, r) {
    if (e === 0) {
      e = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(r);
      if (e && e.SkillType === 4) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_SkillUnlockTech");
      }
    }
  }
  static CheckGridSpecialState(e, r, t) {
    switch (r) {
      case 0:
        if (this.CheckForbiddenState(r, t)) {
          return 0;
        }
        if (this.CheckLockState(r, t)) {
          return 5;
        }
        break;
      case 1:
        if (this.CheckLockState(r, t)) {
          return 3;
        }
        break;
      case 2:
        var i = e === 1;
        var n = ModelManager_1.ModelManager.RouletteModel.GetCurrentExploreRouletteListData().IsRouletteReplace();
        if (i && n) {
          if (ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId === 0) {
            return 3;
          }
        }
    }
  }
}
exports.RouletteGridForbiddenSettings = RouletteGridForbiddenSettings;
(_a = RouletteGridForbiddenSettings).w0o = () => {
  return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(217)?.HasTag(-1002623896) ?? false;
};
RouletteGridForbiddenSettings.vha = () => {
  return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(217)?.HasTag(-1488322179) ?? false;
};
RouletteGridForbiddenSettings._ag = () => ModelManager_1.ModelManager.GameModeModel.IsMulti;
RouletteGridForbiddenSettings.uag = () => {
  ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Flying_Tip_002");
};
RouletteGridForbiddenSettings.qla = new Map([[1001, _a.w0o], [1013, _a.vha], [6015, _a._ag]]);
RouletteGridForbiddenSettings.Gla = new Map([[6015, _a.uag]]); //# sourceMappingURL=RouletteGridForbiddenSettings.js.map