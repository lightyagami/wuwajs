"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaDeckOverviewItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaDeckOverviewItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.DeckInfo = undefined;
    this.ActivityId = 0;
    this.ElementList = [];
    this.OnToggleSelect = undefined;
    this.DV1 = () => {
      this.OnToggleSelect?.(this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UISprite], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText], [14, UE.UISprite]];
    this.BtnBindInfo = [[0, this.DV1]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (let t = 10; t <= 11; t++) {
      var i = new CardElementItem_1.CardElementItem();
      this.ElementList.push(i);
      e.push(i.CreateByActorAsync(this.GetItem(t).GetOwner()));
    }
    await Promise.all(e);
  }
  Refresh(t, e, i) {
    var r = (this.DeckInfo = t)?.GetElementList();
    var s = r?.length ?? 0;
    for (let t = 0; t < this.ElementList.length; t++) {
      if (t >= s) {
        this.ElementList[t].SetActive(false);
      } else {
        this.ElementList[t].SetActive(true);
        this.ElementList[t].RefreshElement(r[t]);
      }
    }
    this.GetExtendToggle(0).SetToggleState(e ? 1 : 0, false);
    var a;
    var e = this.GetText(4);
    var n = this.GetText(8);
    var h = this.GetTexture(2);
    var o = this.GetItem(12);
    this.GetText(1).SetText((i + 1).toString());
    if (t.GetDeckServerId() === PhantomArenaDefine_1.DECK_ID_EMPTY_TEMP) {
      i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetDeckDefaultName();
      this.GetText(3).SetText(i);
      this.GetItem(6).SetUIActive(true);
      this.GetItem(5).SetUIActive(false);
      this.GetItem(7).SetUIActive(false);
      e.SetUIActive(false);
      n.SetUIActive(false);
      h.SetUIActive(false);
      o.SetUIActive(false);
    } else {
      this.GetText(3).SetText(t.GetName());
      this.GetItem(6).SetUIActive(false);
      i = ModelManager_1.ModelManager.PhantomArenaModel.GetLastUsedCardDeckServerId(this.ActivityId) === t.GetDeckServerId();
      this.GetItem(7).SetUIActive(i);
      e.SetUIActive(true);
      n.SetUIActive(true);
      o.SetUIActive(t.GetFieldCardCountLimit() !== 0);
      i = t.CanDeckBeUsed();
      this.GetItem(5).SetUIActive(!i);
      if ((o = t.GetNormalCardCount()) === (a = t.GetNormalCardCountLimit())) {
        e.SetText(o + "/" + a);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "PhantomBattle_1042", o, a);
      }
      e = t.IsCoreCardSlotLocked();
      this.GetSprite(9).SetIsGray(e);
      n.SetChangeColor(e, n.changeColor);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(n, "PhantomBattle_1039");
      } else if ((o = t.GetCoreCardCount()) === (a = t.GetCoreCardCountLimit())) {
        n.SetText(o + "/" + a);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(n, "PhantomBattle_1042", o, a);
      }
      e = this.GetText(13);
      if ((n = t.GetFieldCardCount()) === (o = t.GetFieldCardCountLimit())) {
        e.SetText(n + "/" + o);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "PhantomBattle_1042", n, o);
      }
      e = (a = t.GetFieldCardSlot()?.Element) !== undefined ? ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(a).FieldCardElementInDeck : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconSoundRemnantArenaField");
      this.SetSpriteByPath(e, this.GetSprite(14), false);
      n = t.GetDeckFaceCardId();
      h.SetUIActive(n > 0);
      if (n > 0) {
        o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(n);
        this.SetTextureByPath(o.DeckFaceTexture, h);
        h.SetChangeColor(!i, h.changeColor);
      }
    }
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t);
  }
}
exports.PhantomArenaDeckOverviewItem = PhantomArenaDeckOverviewItem;
//# sourceMappingURL=PhantomArenaDeckOverviewItem.js.map