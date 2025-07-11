"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionCheckSystemStateHelper = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbCheckCollectionShopState_1 = require("./FbCheckCollectionShopState");
const FbCheckMoonBuildingState_1 = require("./FbCheckMoonBuildingState");
const FbCheckTrackMoonPopularity_1 = require("./FbCheckTrackMoonPopularity");
class UnionCheckSystemStateHelper {
  static GetUnionCheckSystemStateObject(e) {
    switch (e) {
      case fb_condition_1.UnionCheckSystemState.CheckCollectionShopState:
        return new fb_condition_1.CheckCollectionShopState();
      case fb_condition_1.UnionCheckSystemState.CheckMoonBuildingState:
        return new fb_condition_1.CheckMoonBuildingState();
      case fb_condition_1.UnionCheckSystemState.CheckTrackMoonPopularity:
        return new fb_condition_1.CheckTrackMoonPopularity();
      default:
        return;
    }
  }
  static ReadUnionCheckSystemState(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_condition_1.UnionCheckSystemState.CheckCollectionShopState:
          return FbCheckCollectionShopState_1.FbCheckCollectionShopState.Create(t);
        case fb_condition_1.UnionCheckSystemState.CheckMoonBuildingState:
          return FbCheckMoonBuildingState_1.FbCheckMoonBuildingState.Create(t);
        case fb_condition_1.UnionCheckSystemState.CheckTrackMoonPopularity:
          return FbCheckTrackMoonPopularity_1.FbCheckTrackMoonPopularity.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionCheckSystemStateHelper = UnionCheckSystemStateHelper;
//# sourceMappingURL=UnionCheckSystemStateHelper.js.map