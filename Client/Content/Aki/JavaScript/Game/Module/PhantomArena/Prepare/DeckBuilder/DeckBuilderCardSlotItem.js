"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderCardSlotItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
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
    this.Olu = 0;
    this.UYi = TickSystem_1.TickSystem.InvalidId;
    this.LongPressStartTime = 0;
    this.LongPressEndTime = 0;
    this.CanToggleChange = undefined;
    this.LongPressCallback = undefined;
    this.LongPressEndCallback = undefined;
    this.ShortClickCallback = undefined;
    this.OnToggleStateChange = undefined;
    this.OnPointEnterCallback = undefined;
    this.OnPointExitCallback = undefined;
    this.CanToggleExecuteChangeInternal = () => !this.CanToggleChange || this.CanToggleChange(this);
    this.qlu = () => {
      if (this.UYi !== TickSystem_1.TickSystem.InvalidId) {
        TickSystem_1.TickSystem.Remove(this.UYi);
        this.UYi = TickSystem_1.TickSystem.InvalidId;
      }
      this.Olu = 0;
      this.UYi = TickSystem_1.TickSystem.Add(this.Glu, "DeckBuilderCardSlotItem", undefined, true, undefined, true)?.Id ?? TickSystem_1.TickSystem.InvalidId;
    };
    this.Flu = (t, i) => {
      i = i?.dragComponent;
      if (!i || !i.IsValid()) {
        if (this.UYi !== TickSystem_1.TickSystem.InvalidId) {
          this.LongPressEndCallback?.();
          TickSystem_1.TickSystem.Remove(this.UYi);
          this.UYi = TickSystem_1.TickSystem.InvalidId;
        }
        this.UYi = TickSystem_1.TickSystem.InvalidId;
        if (this.Olu < this.LongPressStartTime) {
          this.ShortClickCallback?.(this);
        }
        this.Olu = 0;
      }
    };
    this.eY1 = t => {
      this.OnToggleStateChange?.(this, t);
    };
    this.Glu = t => {
      this.Olu += t;
      if (this.Olu >= this.LongPressStartTime) {
        t = (this.Olu - this.LongPressStartTime) / (this.LongPressEndTime - this.LongPressStartTime);
        this.LongPressCallback?.(this, t);
      }
      if (this.Olu > this.LongPressEndTime) {
        this.LongPressEndCallback?.();
        TickSystem_1.TickSystem.Remove(this.UYi);
        this.UYi = TickSystem_1.TickSystem.InvalidId;
      }
    };
    this.Nlu = () => {
      this.LongPressEndCallback?.();
      TickSystem_1.TickSystem.Remove(this.UYi);
      this.UYi = TickSystem_1.TickSystem.InvalidId;
      return true;
    };
    this.btu = () => {
      if (!Info_1.Info.IsInTouch()) {
        this.OnPointEnterCallback?.(this.Data.SlotInfo.CardId);
      }
    };
    this.Rtu = () => {
      if (!Info_1.Info.IsInTouch()) {
        this.OnPointExitCallback?.();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    this.aho = new CardElementItem_1.CardElementItem();
    await Promise.all([this.aho.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())]);
    var t = this.GetExtendToggle(0);
    t.CanExecuteChange.Bind(this.CanToggleExecuteChangeInternal);
    t.OnPointDownCallBack.Bind(this.qlu);
    t.OnStateChange.Add(this.eY1);
    t.OnPointUpCallBackWithEventData.Bind(this.Flu);
    t.OnPointerBeginDragCallBack.Bind(this.Nlu);
    t.OnPointEnterCallBack.Bind(this.btu);
    t.OnPointExitCallBack.Bind(this.Rtu);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  Refresh(t, i, s) {
    var e = (this.Data = t).SlotInfo;
    var h = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e.CardId);
    this.GetExtendToggle(0).SetToggleState(i ? 1 : 0);
    this.RefreshLockState();
    this.RefreshRedDot();
    this.GetText(3).SetText(h.Cost.toString());
    this.GetText(4).SetText("×" + e.Count);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), h.Name);
    this.SetTextureByPath(h.DeckFaceTexture, this.GetTexture(1));
    this.Hxt(e.Element);
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
    this.LongPressCallback?.(this, -1);
  }
}
exports.DeckBuilderCardSlotItem = DeckBuilderCardSlotItem;
//# sourceMappingURL=DeckBuilderCardSlotItem.js.map