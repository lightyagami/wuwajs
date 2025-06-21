"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.EntranceGymRepeatItem = exports.EntranceGymItem = exports.GymItemBase = void 0;
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  PhantomArenaGymStarItem_1 = require("./PhantomArenaGymStarItem");
class GymItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Level = -1, this.CallbackOnClick = void 0, this.CallbackOnHover = void 0, this.CallbackOnFocus = void 0, this.CallbackOnUnHover = void 0, this.SequencePlayer = void 0, this.OnClickLevel = () => {
      0 < this.Level && this.CallbackOnClick && (ModelManager_1.ModelManager.PhantomArenaModel.IsGymLock(this.Level) ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(PhantomArenaDefine_1.ENTRANCE_GYM_LOCK_TEXT_ID) : this.CallbackOnClick(this.Level))
    }, this.OnFocus = () => {
      0 < this.Level && this.CallbackOnFocus && this.CallbackOnFocus(this.Level)
    }, this.OnHover = () => {
      0 < this.Level && this.CallbackOnHover && this.CallbackOnHover(this.Level)
    }, this.OnUnHover = () => {
      0 < this.Level && this.CallbackOnUnHover && this.CallbackOnUnHover(this.Level)
    }
  }
  GetAnchorOffsetX() {
    return this.RootItem.GetAnchorOffsetX()
  }
  Refresh() {}
  PlayUnlock() {
    var t;
    !this.Level || this.Level <= 0 || (t = ModelManager_1.ModelManager.PhantomArenaModel).IsGymLock(this.Level) || t.IsGymUnlockChecked(this.Level) || (ModelManager_1.ModelManager.PhantomArenaModel.SetGymUnlockChecked(this.Level), this.Refresh(), this.SequencePlayer?.PlaySequence("Unlock"))
  }
  GetRedDotState() {
    return 0 < this.Level && ModelManager_1.ModelManager.PhantomArenaModel.GetGymRedDotById(this.Level)
  }
  RefreshRedDot() {}
}
class EntranceGymItem extends(exports.GymItemBase = GymItemBase) {
  constructor() {
    super(...arguments), this.onu = void 0, this.zbe = () => {
      return new PhantomArenaGymStarItem_1.GymStarItem
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UISprite],
      [9, UE.UISprite],
      [10, UE.UISprite],
      [11, UE.UIItem],
      [12, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.OnClickLevel]
    ]
  }
  OnStart() {
    this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.onu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.zbe), this.GetButton(0).SetSelectionState(0), this.GetButton(0).FocusListenerDelegate.Bind(this.OnFocus)
  }
  OnBeforeShow() {
    var t = this.GetButton(0);
    t.OnPointEnterCallBack.Bind(this.OnHover), t.OnPointExitCallBack.Bind(this.OnUnHover), this.Refresh()
  }
  Refresh() {
    var t, e, i, s;
    this.Level < 0 || (e = (t = ModelManager_1.ModelManager.PhantomArenaModel).IsGymLock(this.Level) || !t.IsGymUnlockChecked(this.Level), (i = t.GetPhantomBattleGymConfigByLevel(this.Level)) && (this.GetSprite(4).SetUIActive(!e), this.GetSprite(5).SetUIActive(e), this.SetSpriteByPath(i.IconBg, this.GetSprite(4), !1), this.GetSprite(7).SetUIActive(e), this.GetSprite(8).SetUIActive(!e), this.GetSprite(9).SetUIActive(e), this.GetItem(11).SetUIActive(!e), s = e ? i.IconLock : i.Icon, this.SetSpriteByPath(s, this.GetSprite(6), !1), this.SetSpriteByPath(i.IconRoman, this.GetSprite(10), !1), LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), i?.Name), s = t.GetChallengeStateListByGymLevel(this.Level), this.onu.RefreshByData(s), this.onu.SetActive(!e), this.RefreshRedDot()))
  }
  RefreshRedDot() {
    this.GetItem(12).SetUIActive(this.GetRedDotState())
  }
}
exports.EntranceGymItem = EntranceGymItem;
class EntranceGymRepeatItem extends GymItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UISprite],
      [5, UE.UITexture],
      [6, UE.UITexture],
      [7, UE.UISprite],
      [8, UE.UISprite],
      [9, UE.UISprite],
      [10, UE.UISprite],
      [11, UE.UIText],
      [12, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.OnClickLevel]
    ]
  }
  OnStart() {
    this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.GetButton(0).FocusListenerDelegate.Bind(this.OnFocus)
  }
  OnBeforeShow() {
    var t = this.GetButton(0);
    t.OnPointEnterCallBack.Bind(this.OnHover), t.OnPointExitCallBack.Bind(this.OnUnHover), this.Refresh()
  }
  Refresh() {
    var t, e;
    this.Level < 0 || (t = (e = ModelManager_1.ModelManager.PhantomArenaModel).IsGymLock(this.Level) || !e.IsGymUnlockChecked(this.Level), e = e.GetPhantomBattleGymConfigByLevel(this.Level), this.GetSprite(4).SetUIActive(!t), this.GetTexture(5).SetUIActive(t), this.GetTexture(6).SetUIActive(!t), this.GetSprite(7).SetUIActive(t), this.GetSprite(8).SetUIActive(!t), this.GetSprite(9).SetUIActive(t), LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), e?.Name), LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(11), e?.Name), this.RefreshRedDot())
  }
  RefreshRedDot() {
    this.GetItem(12).SetUIActive(this.GetRedDotState())
  }
}
exports.EntranceGymRepeatItem = EntranceGymRepeatItem;
//# sourceMappingURL=PhantomArenaEntranceGymItem.js.map