"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderCardSlotItem = undefined;
const UE = require("ue");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class DeckBuilderCardSlotItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.aho = undefined;
    this.$pt = undefined;
    this._lu = 0;
    this.UYi = TickSystem_1.TickSystem.InvalidId;
    this.CanToggleChange = undefined;
    this.LongPressCallback = undefined;
    this.ShortClickCallback = undefined;
    this.OnToggleStateChange = undefined;
    this.CanToggleExecuteChangeInternal = () => !this.CanToggleChange || this.CanToggleChange(this);
    this.ulu = () => {
      if (this.UYi !== TickSystem_1.TickSystem.InvalidId) {
        TickSystem_1.TickSystem.Remove(this.UYi);
        this.UYi = TickSystem_1.TickSystem.InvalidId;
      }
      this._lu = 0;
      this.UYi = TickSystem_1.TickSystem.Add(this.clu, "DeckBuilderCardSlotItem", undefined, true, undefined, true)?.Id ?? TickSystem_1.TickSystem.InvalidId;
    };
    this.dlu = (t, i) => {
      i = i?.dragComponent;
      if (!i || !i.IsValid()) {
        TickSystem_1.TickSystem.Remove(this.UYi);
        this.UYi = TickSystem_1.TickSystem.InvalidId;
        this.ShortClickCallback?.(this);
        this._lu = 0;
      }
    };
    this.LX1 = t => {
      this.OnToggleStateChange?.(this, t);
    };
    this.clu = t => {
      this._lu += t;
      if (this._lu > 1000) {
        TickSystem_1.TickSystem.Remove(this.UYi);
        this.UYi = TickSystem_1.TickSystem.InvalidId;
        this.LongPressCallback?.(this);
      }
    };
    this.mlu = () => {
      TickSystem_1.TickSystem.Remove(this.UYi);
      this.UYi = TickSystem_1.TickSystem.InvalidId;
      return true;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    this.aho = new CardElementItem_1.CardElementItem();
    await this.aho.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    var t = this.GetExtendToggle(0);
    t.CanExecuteChange.Bind(this.CanToggleExecuteChangeInternal);
    t.OnPointDownCallBack.Bind(this.ulu);
    t.OnStateChange.Add(this.LX1);
    t.OnPointUpCallBackWithEventData.Bind(this.dlu);
    t.OnPointerBeginDragCallBack.Bind(this.mlu);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  Refresh(t, i, e) {
    var s = (this.Data = t).SlotInfo;
    var h = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(s.CardId);
    this.GetExtendToggle(0).SetToggleState(i ? 1 : 0);
    this.RefreshLockState();
    this.RefreshRedDot();
    this.GetText(3).SetText(h.Cost.toString());
    this.GetText(4).SetText("×" + s.Count);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), h.Name);
    this.SetTextureByPath(h.DeckFaceTexture, this.GetTexture(1));
    this.Hxt(s.Element);
    this.RefreshOutlookState();
    if (t.NeedPlayAddAnim) {
      t.NeedPlayAddAnim = false;
      this.$pt.PlayOrReplaySequenceByName("Start");
    }
  }
  RefreshLockState() {
    this.GetItem(6).SetUIActive(this.Data.Locked);
  }
  RefreshOutlookState() {
    var t = this.Data.OutlookUnlocked ? PhantomArenaDefine_1.CARD_SLOT_FRAME_GOLD_ICON_PATH : PhantomArenaDefine_1.CARD_SLOT_FRAME_NORMAL_ICON_PATH;
    this.SetSpriteByPath(t, this.GetSprite(9), false);
  }
  RefreshRedDot() {
    this.GetItem(7).SetUIActive(this.Data.RedDotState);
  }
  Hxt(t) {
    this.aho.Refresh(t);
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0);
  }
  GetData() {
    return this.Data?.SlotInfo;
  }
  TriggerLongPress() {
    this.LongPressCallback?.(this);
  }
}
exports.DeckBuilderCardSlotItem = DeckBuilderCardSlotItem;
//# sourceMappingURL=DeckBuilderCardSlotItem.js.map