"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiModelController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ModelManager_1 = require("../../Manager/ModelManager");
class AiModelController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.AiModel;
  }
  static AddAiToTeam(o, r) {
    o.AiTeam = this.Model.GetAiTeam(r);
    o.AiTeam.AddMember(o);
  }
  static RemoveAiFromTeam(o) {
    var r = o.AiTeam;
    if (r) {
      r.RemoveMember(o);
      o.AiTeam = undefined;
    }
  }
  static OnTick(o) {
    this.Model.AiScoreManager.Update();
    for (var [, r] of this.Model.ActiveAiTeams) {
      if (r.TeamMemberToGroup.size > 0) {
        r.Tick();
      }
    }
    this.Dte();
  }
  static Dte() {
    for (var [, o] of this.Model.HatredGroups) {
      for (var [, r] of o) {
        for (const s of r) {
          if (!s.CharAiDesignComp?.Valid || !s.CharAiDesignComp.Entity.Valid) {
            r.delete(s);
          }
        }
      }
    }
    for (var [, e] of this.Model.HatredGroups) {
      for (var [, t] of e) {
        for (const i of t) {
          if (i.AiHateList.IsCurrentTargetInMaxArea) {
            var a = i.AiHateList.GetCurrentTarget().Id;
            for (const l of t) {
              if (i !== l) {
                l.AiHateList.SharedHatredTarget(a);
              }
            }
          }
        }
      }
    }
  }
}
exports.AiModelController = AiModelController;
//# sourceMappingURL=AiModelController.js.map