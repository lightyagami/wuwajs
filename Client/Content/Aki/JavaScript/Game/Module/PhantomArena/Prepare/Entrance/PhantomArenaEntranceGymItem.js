"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntranceGymRepeatItem = exports.EntranceGymItem = exports.GymItemBase = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaGymStarItem_1 = require("./PhantomArenaGymStarItem");
class GymItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Level = -1;
    this.ActivityId = 0;
    this.CallbackOnClick = undefined;
    this.CallbackOnHover = undefined;
    this.CallbackOnFocus = undefined;
    this.CallbackOnUnHover = undefined;
    this.SequencePlayer = undefined;
    this.OnClickLevel = () => {
      if (this.Level > 0 && this.CallbackOnClick) {
        if (ModelManager_1.ModelManager.PhantomArenaModel.IsGymLock(this.Level, this.ActivityId)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(PhantomArenaDefine_1.ENTRANCE_GYM_LOCK_TEXT_ID);
        } else {
          this.CallbackOnClick(this.Level);
        }
      }
    };
    this.OnFocus = () => {
      if (this.Level > 0 && this.CallbackOnFocus) {
        this.CallbackOnFocus(this.Level);
      }
    };
    this.OnHover = () => {
      if (this.Level > 0 && this.CallbackOnHover) {
        this.CallbackOnHover(this.Level);
      }
    };
    this.OnUnHover = () => {
      if (this.Level > 0 && this.CallbackOnUnHover) {
        this.CallbackOnUnHover(this.Level);
      }
    };
  }
  GetAnchorOffsetX() {
    return this.RootItem.GetAnchorOffsetX();
  }
  Refresh() {}
  PlayUnlock() {
    var t;
    if (!!this.Level && !(this.Level <= 0) && !(t = ModelManager_1.ModelManager.PhantomArenaModel).IsGymLock(this.Level, this.ActivityId) && !t.IsGymUnlockChecked(this.Level, this.ActivityId)) {
      ModelManager_1.ModelManager.PhantomArenaModel.SetGymUnlockChecked(this.Level, this.ActivityId);
      this.Refresh();
      this.SequencePlayer?.PlaySequence("Unlock");
    }
  }
  GetRedDotState() {
    return this.Level > 0 && ModelManager_1.ModelManager.PhantomArenaModel.GetGymRedDotById(this.Level, this.ActivityId);
  }
  RefreshRedDot() {}
}
class EntranceGymItem extends (exports.GymItemBase = GymItemBase) {
  constructor() {
    super(...arguments);
    this.i_u = undefined;
    this.zbe = () => {
      return new PhantomArenaGymStarItem_1.GymStarItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UISprite], [10, UE.UISprite], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickLevel]];
  }
  OnStart() {
    this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.i_u = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.zbe);
    this.GetButton(0).SetSelectionState(0);
    this.GetButton(0).FocusListenerDelegate.Bind(this.OnFocus);
  }
  OnBeforeShow() {
    var t = this.GetButton(0);
    t.OnPointEnterCallBack.Bind(this.OnHover);
    t.OnPointExitCallBack.Bind(this.OnUnHover);
    this.Refresh();
  }
  Refresh() {
    var t;
    var e;
    var i;
    var s;
    if (!(this.Level < 0)) {
      e = (t = ModelManager_1.ModelManager.PhantomArenaModel).IsGymLock(this.Level, this.ActivityId) || !t.IsGymUnlockChecked(this.Level, this.ActivityId);
      if (i = t.GetPhantomBattleGymConfigByLevel(this.Level, this.ActivityId)) {
        this.GetSprite(4).SetUIActive(!e);
        this.GetSprite(5).SetUIActive(e);
        this.SetSpriteByPath(i.IconBg, this.GetSprite(4), false);
        this.GetSprite(7).SetUIActive(e);
        this.GetSprite(8).SetUIActive(!e);
        this.GetSprite(9).SetUIActive(e);
        this.GetItem(11).SetUIActive(!e);
        s = e ? i.IconLock : i.Icon;
        this.SetSpriteByPath(s, this.GetSprite(6), false);
        this.SetSpriteByPath(i.IconRoman, this.GetSprite(10), false);
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), i?.Name);
        s = t.GetChallengeStateListByGymLevel(this.Level, this.ActivityId);
        this.i_u.RefreshByData(s);
        this.i_u.SetActive(!e);
        this.RefreshRedDot();
      }
    }
  }
  RefreshRedDot() {
    this.GetItem(12).SetUIActive(this.GetRedDotState());
  }
}
exports.EntranceGymItem = EntranceGymItem;
class EntranceGymRepeatItem extends GymItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UISprite], [10, UE.UISprite], [11, UE.UIText], [12, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickLevel]];
  }
  OnStart() {
    this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.GetButton(0).FocusListenerDelegate.Bind(this.OnFocus);
  }
  OnBeforeShow() {
    var t = this.GetButton(0);
    t.OnPointEnterCallBack.Bind(this.OnHover);
    t.OnPointExitCallBack.Bind(this.OnUnHover);
    this.Refresh();
  }
  Refresh() {
    var t;
    var e;
    if (!(this.Level < 0)) {
      t = (e = ModelManager_1.ModelManager.PhantomArenaModel).IsGymLock(this.Level, this.ActivityId) || !e.IsGymUnlockChecked(this.Level, this.ActivityId);
      e = e.GetPhantomBattleGymConfigByLevel(this.Level, this.ActivityId);
      this.GetSprite(4).SetUIActive(!t);
      this.GetTexture(5).SetUIActive(t);
      this.GetTexture(6).SetUIActive(!t);
      this.GetSprite(7).SetUIActive(t);
      this.GetSprite(8).SetUIActive(!t);
      this.GetSprite(9).SetUIActive(t);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), e?.Name);
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(11), e?.Name);
      this.RefreshRedDot();
    }
  }
  RefreshRedDot() {
    this.GetItem(12).SetUIActive(this.GetRedDotState());
  }
}
exports.EntranceGymRepeatItem = EntranceGymRepeatItem;
//# sourceMappingURL=PhantomArenaEntranceGymItem.js.map