"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelConditionCheckIsUsingVehicle = void 0;
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TsBaseItem_1 = require("../../NewWorld/SceneItem/BaseItem/TsBaseItem"),
  TsBaseVehicle_1 = require("../../NewWorld/Vehicle/TsBaseVehicle"),
  ActorUtils_1 = require("../../Utils/ActorUtils"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckIsUsingVehicle extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    var s = e?.Condition;
    if (s) switch (s.Type) {
      case "UsingVehicle":
        return this.Pi_(s, r);
      case "PlayerInVehicle":
        return this.wi_(s, r)
    }
    return !1
  }
  Pi_(e, r) {
    let s = void 0;
    e.TargetVehicle ? s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.TargetVehicle)?.Entity : r instanceof TsBaseVehicle_1.default ? s = r.VehicleActorComponent.Entity : r instanceof TsBaseCharacter_1.default ? s = r.CharacterActorComponent.Entity : r instanceof TsBaseItem_1.default && (s = ActorUtils_1.ActorUtils.GetEntityByActor(r)?.Entity);
    r = s?.GetComponent(0), r = ModelManager_1.ModelManager.VehicleModel.GetVehiclePlayerData(r.GetCreatureDataId());
    if (0 < r?.length)
      for (const a of r)
        if (a.Seat === e.Seat) return e.CheckIsBeingUsed;
    var r = s?.GetComponent(233);
    return !!r && (r = r.IsVehicleInUse(e.Seat), e.CheckIsBeingUsed ? r : !r)
  }
  wi_(e, r) {
    var s = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return !!s && !!(s = s.Entity.GetComponent(229)) && (s = s.VehicleType === e.VehicleType, e.CheckType ? s : !s)
  }
}
exports.LevelConditionCheckIsUsingVehicle = LevelConditionCheckIsUsingVehicle;
//# sourceMappingURL=LevelConditionCheckIsUsingVehicle.js.map