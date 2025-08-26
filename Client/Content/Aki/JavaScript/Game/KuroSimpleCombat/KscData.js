"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscRemoveContext = exports.KscEntityRemoveReason = exports.landFireRemoveReason = undefined;
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const Vector_1 = require("../../Core/Utils/Math/Vector");
exports.landFireRemoveReason = FNameUtil_1.FNameUtil.GetDynamicFName("LandFireRemove");
class KscEntityRemoveReason {}
(exports.KscEntityRemoveReason = KscEntityRemoveReason).Dead = FNameUtil_1.FNameUtil.GetDynamicFName("Dead");
KscEntityRemoveReason.WorldKill = FNameUtil_1.FNameUtil.GetDynamicFName("WorldKill");
KscEntityRemoveReason.Arrival = FNameUtil_1.FNameUtil.GetDynamicFName("Arrival");
KscEntityRemoveReason.Coin = FNameUtil_1.FNameUtil.GetDynamicFName("Coin");
KscEntityRemoveReason.LandFire = exports.landFireRemoveReason;
class KscRemoveContext {
  constructor() {
    this.CreatureDataId = 0;
    this.KillerId = 0;
    this.KillerType = undefined;
    this.IsPreview = false;
    this.Location = Vector_1.Vector.Create();
    this.ReasonName = undefined;
    this.ClearCell = false;
    this.EffectRange = 0;
    this.FireNum = 0;
    this.Params = undefined;
  }
  InitFromRemoveContext(t, e) {
    this.CreatureDataId = e.get(t.EntityId)?.CreatureDataId ?? 0;
    this.KillerId = e.get(t.EntityIdKillBy)?.CreatureDataId ?? 0;
    this.KillerType = FNameUtil_1.FNameUtil.GetDynamicFName(t.EntityTypeKillBy.toString());
    this.IsPreview = t.IsPreview;
    this.Location.DeepCopy(t.Location);
    this.ReasonName = FNameUtil_1.FNameUtil.GetDynamicFName(t.ReasonName.toString());
    this.ClearCell = false;
    this.EffectRange = 0;
    this.FireNum = 0;
    this.Params = undefined;
  }
  InitFromLandFireContext(t, e) {
    this.CreatureDataId = e.get(t.SpawnerEntityId)?.CreatureDataId ?? 0;
    this.KillerId = this.CreatureDataId;
    this.KillerType = undefined;
    this.IsPreview = false;
    this.Location.Set(0, 0, 0);
    this.ReasonName = exports.landFireRemoveReason;
    this.ClearCell = t.ClearCell;
    this.EffectRange = t.EffectRange;
    this.FireNum = t.FireNum;
    this.Params = t.Params;
  }
}
exports.KscRemoveContext = KscRemoveContext;
//# sourceMappingURL=KscData.js.map