"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigStuffedRingLightItem = undefined;
const UE = require("ue");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const BigStuffedDefine_1 = require("../BigStuffedDefine");
const BigStuffedRingSubItem_1 = require("./BigStuffedRingSubItem");
class BigStuffedRingLightItem extends BigStuffedRingSubItem_1.BigStuffedRingSubItem {
  constructor(e, t) {
    super(e, t);
    this.awl = new UE.FName("Progress");
    this.Type = 3;
  }
  OnStart() {
    super.OnStart();
    this.TextureRing.SetUIActive(false);
    this.TextureRing.SetAlpha(0);
  }
  SpawnLightByArea(e) {
    var t = e.StartCellIndex;
    var e = e.EndCellIndex;
    var i = Math.max(t - 1, 0) * BigStuffedDefine_1.SINGLECELL_ANGLE;
    this.TextureRing.SetUIRelativeRotation(Rotator_1.Rotator.Create(0, -i, 0).ToUeRotator());
    var i = (0, BigStuffedDefine_1.calculateCellSize)(t, e) / BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT;
    this.TextureRing.SetCustomMaterialScalarParameter(this.awl, i);
    this.TextureRing.SetUIActive(true);
  }
}
exports.BigStuffedRingLightItem = BigStuffedRingLightItem;
//# sourceMappingURL=BigStuffedRingLightItem.js.map