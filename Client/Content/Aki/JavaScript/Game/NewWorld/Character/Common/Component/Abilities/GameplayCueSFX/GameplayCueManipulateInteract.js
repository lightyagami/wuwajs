"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueManipulateInteract = undefined;
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GameplayCueHookCommonItem_1 = require("./CommonItem/GameplayCueHookCommonItem");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueManipulateInteract extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.$$o = undefined;
  }
  OnInit() {}
  OnTick(e) {}
  OnCreate() {
    var e;
    var t = this.GetTargetPosition();
    if (t) {
      e = !((e = this.CueConfig.Parameters).length > 0) || Number(e[0]) === 0;
      this.$$o = GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.Spawn(this.ActorInternal, FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket), t, this.CueConfig.Resources, e);
    }
  }
  OnDestroy() {
    if (this.$$o) {
      this.$$o.Destroy();
      this.$$o = undefined;
    }
  }
  GetTargetPosition() {
    return this.lsf()?.GetTargetLocation()?.ToUeVector();
  }
  lsf() {
    var e = this.EntityHandle.Entity;
    var t = e.GetComponent(71);
    return t || (e.GetComponent(235) ? ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(71) : undefined);
  }
}
exports.GameplayCueManipulateInteract = GameplayCueManipulateInteract;
//# sourceMappingURL=GameplayCueManipulateInteract.js.map