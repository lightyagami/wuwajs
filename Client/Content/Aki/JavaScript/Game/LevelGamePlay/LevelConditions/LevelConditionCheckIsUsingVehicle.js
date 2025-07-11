"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckIsUsingVehicle = undefined;
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const TsBaseItem_1 = require("../../NewWorld/SceneItem/BaseItem/TsBaseItem");
const TsBaseVehicle_1 = require("../../NewWorld/Vehicle/TsBaseVehicle");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckIsUsingVehicle extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    var s = e?.Condition;
    if (s) {
      switch (s.Type) {
        case "UsingVehicle":
          return this.Pi_(s, r);
        case "PlayerInVehicle":
          return this.wi_(s, r);
      }
    }
    return false;
  }
  Pi_(e, r) {
    let s = undefined;
    if (e.TargetVehicle) {
      s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.TargetVehicle)?.Entity;
    } else if (r instanceof TsBaseVehicle_1.default) {
      s = r.VehicleActorComponent.Entity;
    } else if (r instanceof TsBaseCharacter_1.default) {
      s = r.CharacterActorComponent.Entity;
    } else if (r instanceof TsBaseItem_1.default) {
      s = ActorUtils_1.ActorUtils.GetEntityByActor(r)?.Entity;
    }
    r = s?.GetComponent(0);
    r = ModelManager_1.ModelManager.VehicleModel.GetVehiclePlayerData(r.GetCreatureDataId());
    if (r?.length > 0) {
      for (const a of r) {
        if (a.Seat === e.Seat) {
          return e.CheckIsBeingUsed;
        }
      }
    }
    var r = s?.GetComponent(233);
    return !!r && (r = r.IsVehicleInUse(e.Seat), e.CheckIsBeingUsed ? r : !r);
  }
  wi_(e, r) {
    var s = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return !!s && !!(s = s.Entity.GetComponent(229)) && (s = s.VehicleType === e.VehicleType, e.CheckType ? s : !s);
  }
}
exports.LevelConditionCheckIsUsingVehicle = LevelConditionCheckIsUsingVehicle;
//# sourceMappingURL=LevelConditionCheckIsUsingVehicle.js.map