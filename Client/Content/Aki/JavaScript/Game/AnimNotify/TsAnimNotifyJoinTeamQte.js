"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const PanelQteController_1 = require("../Module/PanelQte/PanelQteController");
class TsAnimNotifyJoinTeamQte extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.QteId = 0;
    this.PreloadRoleIdList = undefined;
    this.ShowTrialRoleTips = true;
  }
  Constructor() {}
  K2_Notify(e, r) {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti && this.PreloadRoleIdList) {
      var t = e.GetOwner();
      if (t instanceof TsBaseCharacter_1.default) {
        t = t.CharacterActorComponent?.Entity;
        if (t) {
          t = t.GetComponent(213).CreateAnimNotifyContent(r.GetName(), this.exportIndex);
          r = PanelQteController_1.PanelQteController.StartAnimNotifyQte(this.QteId, e, t);
          if (!(r <= 0)) {
            var o = [];
            for (let e = 0; e < this.PreloadRoleIdList.Num(); e++) {
              o.push(this.PreloadRoleIdList.Get(e));
            }
            ControllerHolder_1.ControllerHolder.SceneTeamController.RegisterPanelQteJoinTeam(r, o, this.ShowTrialRoleTips);
          }
        }
      }
    }
    return true;
  }
  GetNotifyName() {
    return "角色入队QTE";
  }
}
exports.default = TsAnimNotifyJoinTeamQte;
//# sourceMappingURL=TsAnimNotifyJoinTeamQte.js.map