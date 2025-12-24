"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisQteRingBgSingleItem = undefined;
const UE = require("ue");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const FishingQteDefine_1 = require("../../../../../LevelGamePlay/FishingQte/FishingQteDefine");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ArtemisQteDefine_1 = require("./ArtemisQteDefine");
const ArtemisQteRingSingleAreaItem_1 = require("./ArtemisQteRingSingleAreaItem");
class ArtemisQteRingBgSingleItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i, t) {
    super();
    this.StartIndex = e;
    this.EndIndex = i;
    this.IsWholeRing = t;
    this.JZ = undefined;
    this.zqf = undefined;
    this.Jqf = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    var i = this.GetItem(1);
    i.SetAlpha(1);
    this.JZ = new ArtemisQteRingSingleAreaItem_1.ArtemisQteRingSingleAreaItem();
    e.push(this.JZ.CreateThenShowByActorAsync(i.GetOwner()));
    var i = this.GetItem(2);
    i.SetAlpha(1);
    this.zqf = new ArtemisQteRingSingleAreaItem_1.ArtemisQteRingSingleAreaItem();
    e.push(this.zqf.CreateThenShowByActorAsync(i.GetOwner()));
    var i = this.GetItem(3);
    i.SetAlpha(1);
    this.Jqf = new ArtemisQteRingSingleAreaItem_1.ArtemisQteRingSingleAreaItem();
    e.push(this.Jqf.CreateThenShowByActorAsync(i.GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.AU();
  }
  AU() {
    var e = this.GetItem(1);
    var i = this.GetItem(2);
    var t = Math.max(this.StartIndex - 1, 0) * FishingQteDefine_1.FISHINGQTE_SINGLECELL_ANGLE;
    var t = Rotator_1.Rotator.Create(0, -t, 0).ToUeRotator();
    e.SetUIRelativeRotation(t);
    i.SetUIRelativeRotation(t);
    var e = (0, ArtemisQteDefine_1.calculateCellSize)(this.StartIndex, this.EndIndex) / FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT;
    this.JZ.SetFillAmount(e);
    this.zqf.SetFillAmount(e);
  }
  SetType(e) {
    switch (e) {
      case 1:
      case 2:
        break;
      case 0:
        this.GetItem(1).SetUIActive(false);
        this.GetItem(3).SetUIActive(false);
        this.GetItem(2).SetUIActive(false);
        this.GetItem(0).SetUIActive(true);
    }
  }
}
exports.ArtemisQteRingBgSingleItem = ArtemisQteRingBgSingleItem;
//# sourceMappingURL=ArtemisQteRingBgSingleItem.js.map