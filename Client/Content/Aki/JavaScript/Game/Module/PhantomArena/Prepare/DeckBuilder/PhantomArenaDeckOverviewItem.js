"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaDeckOverviewItem = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaDeckOverviewItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.DeckInfo = void 0, this.ElementList = [], this.OnToggleSelect = void 0, this.iV1 = () => {
      this.OnToggleSelect?.(this.GridIndex)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UISprite],
      [10, UE.UIItem],
      [11, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.iV1]
    ]
  }
  async OnBeforeStartAsync() {
    var t = [];
    for (let e = 10; e <= 11; e++) {
      var i = new CardElementItem_1.CardElementItem;
      this.ElementList.push(i), t.push(i.CreateByActorAsync(this.GetItem(e).GetOwner()))
    }
    await Promise.all(t)
  }
  Refresh(e, t, i) {
    var r = (this.DeckInfo = e)?.GetElementList(),
      s = r?.length ?? 0;
    for (let e = 0; e < this.ElementList.length; e++) e >= s ? this.ElementList[e].SetActive(!1) : (this.ElementList[e].SetActive(!0), this.ElementList[e].RefreshElement(r[e]));
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0, !1);
    var a, n, t = this.GetText(4),
      h = this.GetText(8),
      o = this.GetTexture(2);
    this.GetText(1).SetText((i + 1).toString()), e.GetDeckServerId() === PhantomArenaDefine_1.DECK_ID_EMPTY_TEMP ? (i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetDeckDefaultName(), this.GetText(3).SetText(i), this.GetItem(6).SetUIActive(!0), this.GetItem(5).SetUIActive(!1), this.GetItem(7).SetUIActive(!1), t.SetUIActive(!1), h.SetUIActive(!1), o.SetUIActive(!1)) : (this.GetText(3).SetText(e.GetName()), this.GetItem(6).SetUIActive(!1), i = ModelManager_1.ModelManager.PhantomArenaModel.GetLastUsedCardDeckServerId() === e.GetDeckServerId(), this.GetItem(7).SetUIActive(i), t.SetUIActive(!0), h.SetUIActive(!0), i = e.CanDeckBeUsed(), this.GetItem(5).SetUIActive(!i), (a = e.GetNormalCardCount()) === (n = e.GetNormalCardCountLimit()) ? t.SetText(a + "/" + n) : LguiUtil_1.LguiUtil.SetLocalTextNew(t, "PhantomBattle_1042", a, n), t = e.IsCoreCardSlotLocked(), this.GetSprite(9).SetIsGray(t), h.SetChangeColor(t, h.changeColor), t ? LguiUtil_1.LguiUtil.SetLocalTextNew(h, "PhantomBattle_1039") : (a = e.GetCoreCardCount()) === (n = e.GetCoreCardCountLimit()) ? h.SetText(a + "/" + n) : LguiUtil_1.LguiUtil.SetLocalTextNew(h, "PhantomBattle_1042", a, n), t = e.GetDeckFaceCardId(), o.SetUIActive(0 < t), 0 < t && (h = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t), this.SetTextureByPath(h.DeckFaceTexture, o), o.SetChangeColor(!i, o.changeColor)))
  }
  OnSelected(e) {
    this.GetExtendToggle(0).SetToggleState(1, e)
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleState(0, e)
  }
}
exports.PhantomArenaDeckOverviewItem = PhantomArenaDeckOverviewItem;
//# sourceMappingURL=PhantomArenaDeckOverviewItem.js.map