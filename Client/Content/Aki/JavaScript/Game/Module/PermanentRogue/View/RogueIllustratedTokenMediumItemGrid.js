"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueIllustratedTokenMediumItemGrid = undefined;
const RogueResBuffPoolById_1 = require("../../../../Core/Define/ConfigQuery/RogueResBuffPoolById");
const RogueResCollectionByIdKey_1 = require("../../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RogueIllustratedTokenMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.F5c = undefined;
    this.ndi = undefined;
  }
  OnRefresh(e, o, t) {
    this.F5c = e;
    var i = RogueResBuffPoolById_1.configRogueResBuffPoolById.GetConfig(e.GetConfigId());
    var r = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(e.GetCollectionIndex());
    var r = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(r.IdKey);
    var e = {
      Type: 4,
      Data: e,
      QualityId: i?.Quality,
      QualityType: "MediumItemGridQualitySpritePath",
      BottomTextId: i?.BuffName,
      IsLockVisible: r === Protocol_1.Aki.Protocol.zps.Z6n,
      IsRedDotVisible: r === Protocol_1.Aki.Protocol.zps.CMs,
      IconPath: i?.BuffIcon,
      IsDisable: r === Protocol_1.Aki.Protocol.zps.Z6n
    };
    this.Apply(e);
    this.SetSelected(o);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
  BindOnItemButtonClickedCallback(e) {
    this.ndi = e;
  }
  OnExtendToggleStateChanged(e) {
    if (this.ndi) {
      this.ndi(this.F5c);
    }
  }
}
exports.RogueIllustratedTokenMediumItemGrid = RogueIllustratedTokenMediumItemGrid;
//# sourceMappingURL=RogueIllustratedTokenMediumItemGrid.js.map