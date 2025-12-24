"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisQteRingSingleItem = undefined;
const UE = require("ue");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const ArtemisQteRingSingleAreaItem_1 = require("./ArtemisQteRingSingleAreaItem");
class ArtemisQteRingSingleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$pt = undefined;
    this.JZ = undefined;
    this.zqf = undefined;
    this.Jqf = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = [];
    var t = this.GetItem(1);
    this.JZ = new ArtemisQteRingSingleAreaItem_1.ArtemisQteRingSingleAreaItem();
    e.push(this.JZ.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(2);
    this.zqf = new ArtemisQteRingSingleAreaItem_1.ArtemisQteRingSingleAreaItem();
    e.push(this.zqf.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(3);
    this.Jqf = new ArtemisQteRingSingleAreaItem_1.ArtemisQteRingSingleAreaItem();
    e.push(this.Jqf.CreateThenShowByActorAsync(t.GetOwner()));
    await Promise.all(e);
  }
  OnBeforeDestroy() {
    this.$pt?.Clear();
    this.$pt = undefined;
  }
  SetRotation(e) {
    e = Rotator_1.Rotator.Create(0, e, 0).ToUeRotator();
    this.JZ?.GetRootItem().SetUIRelativeRotation(e);
    this.zqf?.GetRootItem().SetUIRelativeRotation(e);
    this.Jqf?.GetRootItem().SetUIRelativeRotation(e);
  }
  InitItem() {
    this.GetRootItem()?.SetUIRelativeRotation(Rotator_1.Rotator.Create(0, 0, 0).ToUeRotator());
    this.GetRootItem()?.SetUIItemScale(new UE.Vector(1, 1, 1));
    this.GetRootItem()?.SetAlpha(1);
  }
  SetType(e) {
    this.SetActive(true);
    this.JZ?.SetHighLight(e === 2);
    this.GetItem(0)?.SetUIActive(e === 0);
    this.GetItem(1)?.SetAlpha(1);
    this.GetItem(2)?.SetAlpha(0);
    this.GetItem(3)?.SetAlpha(0);
  }
  SetFill(e) {
    this.JZ?.SetFillAmount(e);
    this.zqf?.SetFillAmount(e);
    this.Jqf?.SetFillAmount(e);
    this.JZ?.SetCustomMaterialScalarParameter(e);
    this.zqf?.SetCustomMaterialScalarParameter(e);
    this.Jqf?.SetCustomMaterialScalarParameter(e);
  }
  PlayAnim(e) {
    if (this.$pt.GetCurrentSequence() === e) {
      this.$pt.ReplaySequenceByKey(e);
    } else {
      this.$pt.StopPlayingSequence(false, true);
      this.$pt.PlayLevelSequenceByName(e, false);
    }
  }
  PlayLevelSequenceByName(e) {
    this.$pt.PlayLevelSequenceByName(e);
  }
  StopPlayingSequence(e) {
    if (this.$pt.GetCurrentSequence() === e) {
      this.$pt.StopPlayingSequence(false, true);
    }
  }
}
exports.ArtemisQteRingSingleItem = ArtemisQteRingSingleItem;
//# sourceMappingURL=ArtemisQteRingSingleItem.js.map