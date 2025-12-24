"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationDataModel = undefined;
const Queue_1 = require("../../../Core/Container/Queue");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const CACHE_ON_LAND_SIZE = 15;
class FormationDataModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.PlayerAggroSet = new Set();
    this.OnLandPositionQueue = new Queue_1.Queue(CACHE_ON_LAND_SIZE);
    this.KeyboardLockEnemyMode = 0;
    this.GamepadLockEnemyMode = 0;
  }
  OnInit() {
    return true;
  }
  OnClear() {
    this.PlayerAggroSet.clear();
    this.OnLandPositionQueue.Clear();
    return true;
  }
  OnLeaveLevel() {
    this.OnLandPositionQueue.Clear();
    return true;
  }
  RefreshOnLandPosition() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    if (t) {
      var e = t.GetComponent(184);
      var r = e?.PositionState;
      var e = e?.PositionSubState;
      if (r === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && e !== CharacterUnifiedStateTypes_1.ECharPositionSubState.WaterSurface && e !== CharacterUnifiedStateTypes_1.ECharPositionSubState.WalkOnAir) {
        r = t.GetComponent(1);
        e = r?.Owner;
        if (e && !e.bHidden) {
          t = r.ActorLocationProxy;
          if (t) {
            let e = undefined;
            (e = (e = this.OnLandPositionQueue.Size >= CACHE_ON_LAND_SIZE ? this.OnLandPositionQueue.Pop() : e) || Vector_1.Vector.Create())?.DeepCopy(t);
            this.OnLandPositionQueue.Push(e);
          }
        }
      }
    }
  }
  GetLastPositionOnLand() {
    return this.OnLandPositionQueue.Front;
  }
}
exports.FormationDataModel = FormationDataModel;
//# sourceMappingURL=FormationDataModel.js.map