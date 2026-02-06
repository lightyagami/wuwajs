"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderFieldCardItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem");
class DeckBuilderFieldCardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.PSf = false;
    this.FieldSlotItem = undefined;
    this.FieldElementLayout = undefined;
    this.SPe = undefined;
    this.OnEffectBtnClickCallback = undefined;
    this.jli = () => new CardElementItem_1.CardElementItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    this.FieldElementLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.jli);
    await this.FieldSlotItem.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(4));
    this.GetText(9)?.SetText("");
  }
  RefreshItem(e, t) {
    var i = e.GetFieldCardSlot();
    var s = i !== undefined;
    this.GetItem(7).SetUIActive(s);
    this.GetItem(8).SetUIActive(!s);
    if (!s) {
      this.PSf = false;
    }
    var s = i?.Count ?? 0;
    var e = e.GetFieldCardCountLimit();
    this.GetText(2).SetText(s + "/" + e);
    var s = [];
    if (i) {
      s.push(i.Element);
    }
    this.FieldElementLayout?.RefreshByData(s);
  }
  RefreshSlotItem(e) {
    this.FieldSlotItem?.Refresh(e, false, 0);
  }
  RefreshEffectUnlock(e) {
    var t = e.CurrentProgress >= e.MaxProgress;
    this.GetItem(5)?.SetUIActive(t);
    this.GetItem(6)?.SetUIActive(!t);
    var i = t ? "PhantomBattle_1163" : "PhantomBattle_1162";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), i, e.CurrentProgress, e.MaxProgress);
    if (e.Icon) {
      this.SetSpriteByPath(e.Icon, this.GetSprite(10), false);
    }
    if (t !== this.PSf) {
      this.ASf(t);
      this.PSf = t;
    }
  }
  OnBeforeDestroy() {
    this.SPe.Clear();
    this.SPe = undefined;
  }
  ASf(e) {
    this.SPe?.PlayLevelSequenceByName(e ? "Activate" : "InActivate", false);
  }
}
exports.DeckBuilderFieldCardItem = DeckBuilderFieldCardItem;
//# sourceMappingURL=DeckBuilderFieldCardItem.js.map