"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckBuilderCardSlotItem = void 0;
const UE = require("ue"),
  TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class DeckBuilderCardSlotItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Data = void 0, this.aho = void 0, this.$pt = void 0, this.Xou = 0, this.UYi = TickSystem_1.TickSystem.InvalidId, this.CanToggleChange = void 0, this.LongPressCallback = void 0, this.ShortClickCallback = void 0, this.OnToggleStateChange = void 0, this.CanToggleExecuteChangeInternal = () => !this.CanToggleChange || this.CanToggleChange(this), this.You = () => {
      this.UYi !== TickSystem_1.TickSystem.InvalidId && (TickSystem_1.TickSystem.Remove(this.UYi), this.UYi = TickSystem_1.TickSystem.InvalidId), this.Xou = 0, this.UYi = TickSystem_1.TickSystem.Add(this.zou, "DeckBuilderCardSlotItem", void 0, !0)?.Id ?? TickSystem_1.TickSystem.InvalidId
    }, this.Jou = (t, i) => {
      i = i?.dragComponent;
      i && i.IsValid() || (TickSystem_1.TickSystem.Remove(this.UYi), this.UYi = TickSystem_1.TickSystem.InvalidId, this.ShortClickCallback?.(this), this.Xou = 0)
    }, this.BK1 = t => {
      this.OnToggleStateChange?.(this, t)
    }, this.zou = t => {
      this.Xou += t, 1e3 < this.Xou && (TickSystem_1.TickSystem.Remove(this.UYi), this.UYi = TickSystem_1.TickSystem.InvalidId, this.LongPressCallback?.(this))
    }, this.Zou = () => (TickSystem_1.TickSystem.Remove(this.UYi), this.UYi = TickSystem_1.TickSystem.InvalidId, !0)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UISprite]
    ]
  }
  async OnBeforeStartAsync() {
    this.aho = new CardElementItem_1.CardElementItem, await this.aho.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    var t = this.GetExtendToggle(0);
    t.CanExecuteChange.Bind(this.CanToggleExecuteChangeInternal), t.OnPointDownCallBack.Bind(this.You), t.OnStateChange.Add(this.BK1), t.OnPointUpCallBackWithEventData.Bind(this.Jou), t.OnPointerBeginDragCallBack.Bind(this.Zou), this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem())
  }
  Refresh(t, i, e) {
    var s = (this.Data = t).SlotInfo,
      h = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(s.CardId);
    this.GetExtendToggle(0).SetToggleState(i ? 1 : 0), this.RefreshLockState(), this.RefreshRedDot(), this.GetText(3).SetText(h.Cost.toString()), this.GetText(4).SetText("×" + s.Count), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), h.Name), this.SetTextureByPath(h.DeckFaceTexture, this.GetTexture(1)), this.Hxt(s.Element), this.RefreshOutlookState(), t.NeedPlayAddAnim && (t.NeedPlayAddAnim = !1, this.$pt.PlayOrReplaySequenceByName("Start"))
  }
  RefreshLockState() {
    this.GetItem(6).SetUIActive(this.Data.Locked)
  }
  RefreshOutlookState() {
    var t = this.Data.OutlookUnlocked ? PhantomArenaDefine_1.CARD_SLOT_FRAME_GOLD_ICON_PATH : PhantomArenaDefine_1.CARD_SLOT_FRAME_NORMAL_ICON_PATH;
    this.SetSpriteByPath(t, this.GetSprite(9), !1)
  }
  RefreshRedDot() {
    this.GetItem(7).SetUIActive(this.Data.RedDotState)
  }
  Hxt(t) {
    this.aho.Refresh(t)
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1)
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0)
  }
  GetData() {
    return this.Data?.SlotInfo
  }
  TriggerLongPress() {
    this.LongPressCallback?.(this)
  }
}
exports.DeckBuilderCardSlotItem = DeckBuilderCardSlotItem;
//# sourceMappingURL=DeckBuilderCardSlotItem.js.map