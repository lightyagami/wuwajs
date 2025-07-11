"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleFormationChildView = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleEntityChildView_1 = require("./BattleEntityChildView");
class BattleFormationChildView extends BattleEntityChildView_1.BattleEntityChildView {
  constructor() {
    super(...arguments);
    this.FormationInstance = undefined;
  }
  OnActivate() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.GetEntityId(), {
      ParamType: 1
    });
    this.FormationInstance = t;
  }
  OnDeactivate() {
    this.FormationInstance = undefined;
  }
  GetFormationInstance() {
    return this.FormationInstance;
  }
  IsValid() {
    return !!super.IsValid() && this.FormationInstance !== undefined;
  }
}
exports.BattleFormationChildView = BattleFormationChildView;
//# sourceMappingURL=BattleFormationChildView.js.map