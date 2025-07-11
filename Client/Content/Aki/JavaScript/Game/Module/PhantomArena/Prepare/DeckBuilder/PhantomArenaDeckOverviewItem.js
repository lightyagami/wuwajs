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
    this.ElementList = [];
    this.OnToggleSelect = undefined;
    this.DV1 = () => {
      this.OnToggleSelect?.(this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UISprite], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[0, this.DV1]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    for (let e = 10; e <= 11; e++) {
      var i = new CardElementItem_1.CardElementItem();
      this.ElementList.push(i);
      t.push(i.CreateByActorAsync(this.GetItem(e).GetOwner()));
    }
    await Promise.all(t);
  }
  Refresh(e, t, i) {
    var r = (this.DeckInfo = e)?.GetElementList();
    var s = r?.length ?? 0;
    for (let e = 0; e < this.ElementList.length; e++) {
      if (e >= s) {
        this.ElementList[e].SetActive(false);
      } else {
        this.ElementList[e].SetActive(true);
        this.ElementList[e].RefreshElement(r[e]);
      }
    }
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0, false);
    var a;
    var n;
    var t = this.GetText(4);
    var h = this.GetText(8);
    var o = this.GetTexture(2);
    this.GetText(1).SetText((i + 1).toString());
    if (e.GetDeckServerId() === PhantomArenaDefine_1.DECK_ID_EMPTY_TEMP) {
      i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetDeckDefaultName();
      this.GetText(3).SetText(i);
      this.GetItem(6).SetUIActive(true);
      this.GetItem(5).SetUIActive(false);
      this.GetItem(7).SetUIActive(false);
      t.SetUIActive(false);
      h.SetUIActive(false);
      o.SetUIActive(false);
    } else {
      this.GetText(3).SetText(e.GetName());
      this.GetItem(6).SetUIActive(false);
      i = ModelManager_1.ModelManager.PhantomArenaModel.GetLastUsedCardDeckServerId() === e.GetDeckServerId();
      this.GetItem(7).SetUIActive(i);
      t.SetUIActive(true);
      h.SetUIActive(true);
      i = e.CanDeckBeUsed();
      this.GetItem(5).SetUIActive(!i);
      if ((a = e.GetNormalCardCount()) === (n = e.GetNormalCardCountLimit())) {
        t.SetText(a + "/" + n);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, "PhantomBattle_1042", a, n);
      }
      t = e.IsCoreCardSlotLocked();
      this.GetSprite(9).SetIsGray(t);
      h.SetChangeColor(t, h.changeColor);
      if (t) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(h, "PhantomBattle_1039");
      } else if ((a = e.GetCoreCardCount()) === (n = e.GetCoreCardCountLimit())) {
        h.SetText(a + "/" + n);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(h, "PhantomBattle_1042", a, n);
      }
      t = e.GetDeckFaceCardId();
      o.SetUIActive(t > 0);
      if (t > 0) {
        h = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t);
        this.SetTextureByPath(h.DeckFaceTexture, o);
        o.SetChangeColor(!i, o.changeColor);
      }
    }
  }
  OnSelected(e) {
    this.GetExtendToggle(0).SetToggleState(1, e);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleState(0, e);
  }
}
exports.PhantomArenaDeckOverviewItem = PhantomArenaDeckOverviewItem;
//# sourceMappingURL=PhantomArenaDeckOverviewItem.js.map