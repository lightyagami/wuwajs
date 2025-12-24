"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryMobileEquipPanel = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const HonamiStoryDefine_1 = require("../../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../../HonamiStoryUtil");
const HonamiStoryBackpackPanelBase_1 = require("./HonamiStoryBackpackPanelBase");
const HonamiStoryMobileBagInfoPanel_1 = require("./HonamiStoryMobileBagInfoPanel");
const HonamiStoryBackpackLevelItem_1 = require("./Item/HonamiStoryBackpackLevelItem");
const HonamiStoryBackpackValueCountItem_1 = require("./Item/HonamiStoryBackpackValueCountItem");
const HonamiStoryRoleEquipItem_1 = require("./Item/HonamiStoryRoleEquipItem");
class HonamiStoryMobileEquipPanel extends HonamiStoryBackpackPanelBase_1.HonamiStoryBackpackPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.d0m = false;
    this.L6e = 0;
    this.xqe = undefined;
    this.ViewportItem = undefined;
    this.ViewportHeight = 0;
    this.ContentItem = undefined;
    this.TeamDataItem = undefined;
    this.RXl = undefined;
    this.fgd = [];
    this.f_a = undefined;
    this.tIm = undefined;
    this.InsteadValueItem = undefined;
    this.CurrentValueItem = undefined;
    this.Fmi = undefined;
    this.Vmi = undefined;
    this.n2m = true;
    this.HXl = undefined;
    this.ToggleA = undefined;
    this.ToggleB = undefined;
    this.MoveUpItem = undefined;
    this.MoveDownItem = undefined;
    this.kdm = false;
    this.qdm = 10;
    this.rIm = 0;
    this.oIm = 0;
    this.lem = (t, i) => {
      this.RefreshNeedQuickAll();
      this.TeamDataItem.RefreshPowerLevel(t !== i, t < i, t, i);
    };
    this.pHm = () => {
      this.xqe.StopMovement();
      this.xqe.ScrollToTop(undefined, this.HXl.GetRootItem(), true);
    };
    this.TQd = i => {
      if (i.Qmd === this.RXl.BackpackId) {
        this.RefreshEquipItem().then(() => {
          for (const t of this.GetUpdateContextEffectGridItems(i)) {
            t.PlayPosChangeSweepAnimation();
          }
        });
      }
    };
    this.Ga_ = t => {
      this.nIm(t);
      ModelManager_1.ModelManager.HonamiStoryModel.GetInteractController().RefreshSelectedUiItem();
      this.HXl.UpdateViewportItems();
      if (this.f_a) {
        this.vgd(this.f_a, this.tIm);
      }
    };
    this.qLn = () => {
      var t;
      var i = Time_1.Time.Now;
      if (!(i - this.L6e < HonamiStoryDefine_1.HONAMI_BAKCPACK_CLICK_CD)) {
        this.L6e = i;
        if ((t = (i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic()).GetLogicState()) === 0) {
          ModelManager_1.ModelManager.HonamiStoryModel.ApplyQuickAll();
        } else if (t === 2 || t === 1) {
          i?.CloseTips();
        }
      }
    };
    this.GLn = () => {
      var t;
      var i = Time_1.Time.Now;
      if (!(i - this.L6e < HonamiStoryDefine_1.HONAMI_BAKCPACK_CLICK_CD)) {
        this.L6e = i;
        if ((t = (i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic()).GetLogicState()) === 0) {
          if (this.n2m) {
            ModelManager_1.ModelManager.HonamiStoryModel.QuickUnloadAllSlot();
          } else {
            ModelManager_1.ModelManager.HonamiStoryModel.SortBackpack();
          }
        } else if (t === 2 || t === 1) {
          i?.CloseTips();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UINiagara], [13, UE.UIItem], [14, UE.UIScrollViewWithScrollbarComponent], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UISprite]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.qdm = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetScrollingSpeed();
    this.xqe = this.GetScrollViewWithScrollbar(14);
    this.ViewportItem = this.GetItem(15);
    this.ContentItem = this.GetItem(13);
    this.ViewportHeight = this.ViewportItem.GetHeight();
    this.d0m = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData(false)?.GetPreGuideQuestFinishState() ?? false;
  }
  OnBeforeShow() {
    this.RefreshNeedQuickAll();
    this.dde();
  }
  OnAfterShow() {
    if (this.fgd.length > 0) {
      this.ScrollAfterInit();
    }
  }
  dde() {
    this.xqe.OnScrollValueChange.Bind(this.Ga_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, this.TQd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryPowerLevelUpdate, this.lem);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStorySortSuccess, this.pHm);
  }
  OnBeforeHide() {
    this.Cde();
  }
  Cde() {
    this.xqe.OnScrollValueChange.Unbind();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, this.TQd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryPowerLevelUpdate, this.lem);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStorySortSuccess, this.pHm);
  }
  async Init() {
    this.RXl = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerBackpackData();
    var t = [];
    t.push(this.Cgd());
    this.TeamDataItem = new HonamiStoryBackpackLevelItem_1.HonamiStoryBackpackLevelItem(true);
    t.push(this.TeamDataItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.InsteadValueItem = new HonamiStoryBackpackValueCountItem_1.HonamiStoryBackpackInsteadItem();
    t.push(this.InsteadValueItem.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.CurrentValueItem = new HonamiStoryBackpackValueCountItem_1.HonamiStoryBackpackValueCountItem();
    t.push(this.CurrentValueItem.CreateThenShowByActorAsync(this.GetItem(16).GetOwner()));
    this.Fmi = new ButtonItem_1.ButtonItem();
    this.Fmi.SetFunction(this.qLn);
    t.push(this.Fmi.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.Vmi = new ButtonItem_1.ButtonItem();
    this.Vmi.SetFunction(this.GLn);
    t.push(this.Vmi.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    await Promise.all(t);
    this.Fmi.SetLocalTextNew("HonamiStory_QuickEquippedAll");
    this.RefreshBottomPanel();
    await this.$Xl();
    this.InsteadValueItem.SetVisible(false);
    this.CurrentValueItem.SetVisible(this.d0m);
    if (this.IsShow) {
      this.ScrollAfterInit();
    }
    this.RefreshSelfPanel();
  }
  async Cgd() {
    this.GetItem(2).SetUIActive(false);
    var t = this.RXl.GetRoleEquipDataList();
    if (t.length !== 0) {
      var i = [];
      for (const e of t) {
        i.push(this.pgd(e));
      }
      await Promise.all(i);
    }
  }
  async pgd(t) {
    var t = new HonamiStoryRoleEquipItem_1.HonamiStoryRoleEquipItem(t);
    t.OnEnterGridCb = this.OnEnterItem;
    t.OnExitGridCb = this.OnExitItem;
    t.OnDownGridCb = this.OnDownItem;
    t.OnClickedGridCb = this.OnClickItem;
    t.OnMoreClickedCb = undefined;
    this.fgd.push(t);
    t.RegisterPanel(this);
    var i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1));
    await t.CreateThenShowByActorAsync(i.GetOwner());
  }
  async $Xl() {
    this.HXl = new HonamiStoryMobileBagInfoPanel_1.HonamiStoryMobileBagInfoPanel();
    this.HXl.OnEnterGridCb = this.OnEnterItem;
    this.HXl.OnExitGridCb = this.OnExitItem;
    this.HXl.OnDownGridCb = this.OnExitItem;
    this.HXl.OnClickedGridCb = this.OnClickedGridCb;
    this.InteractController.RegisterPanel(this.HXl);
    ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().RegisterPanel(this.HXl);
    this.HXl.RegisterDragController(this.InteractController);
    this.HXl.ScrollView = this.xqe;
    this.HXl.ContentItem = this.ContentItem;
    this.HXl.ViewportItem = this.ViewportItem;
    this.HXl.ViewportHeight = this.ViewportHeight;
    this.HXl.MoveUpItem = this.MoveUpItem;
    this.HXl.MoveDownItem = this.MoveDownItem;
    this.HXl.EquipCount = this.fgd.length;
    this.HXl.CurrentValueItem = this.CurrentValueItem;
    await this.HXl.CreateThenShowByResourceIdAsync("PnlBackpackEquipGridList", this.GetItem(13));
    await this.HXl.Init();
  }
  OnDragBegin(t, i) {
    this.uGu(i);
    this.RefreshScrollMoveState(undefined);
    return super.OnDragBegin(t, i);
  }
  OnDrag(t, i) {
    this.uGu(i);
    return super.OnDrag(t, i);
  }
  OnDragEnd(t, i) {
    this.uGu(undefined);
    this.RefreshScrollMoveState(undefined);
    super.OnDragEnd(t, i);
  }
  OnHover(t, i) {
    var e = this.Egd(t);
    this.RefreshScrollMoveState(t);
    if (this.f_a !== e) {
      this.f_a = e;
      this.tIm = i;
      this.vgd(e, i);
      this.OnCheckAttrItem(e, i);
    }
  }
  OnHoverEnd() {
    this.f_a = undefined;
    this.tIm = undefined;
    this.RefreshScrollMoveState(undefined);
    this.vgd(undefined, undefined);
    this.OnCheckAttrItem(undefined, undefined);
  }
  GetBackpackType() {
    return this.RXl.GetBackpackType();
  }
  CheckDragItemInViewport(t) {
    var t = HonamiStoryUtil_1.HonamiStoryUtil.GetOffsetVector(t.GetWorldPointInPlane());
    var i = this.GetRootItem().GetUIWorldPosition();
    var e = i.X - this.GetRootItem().GetWidth() / 2;
    var s = e + this.GetRootItem().GetWidth();
    var i = i.Z - this.GetRootItem().GetHeight() / 2;
    var h = i + this.GetRootItem().GetHeight();
    return !(t.X < e) && !(t.X > s) && !(t.Z < i) && !(t.Z > h);
  }
  GetUpdateInfoInSameBackpack(t, i) {
    var e;
    var s;
    var t = this.Egd(t);
    if (t !== undefined && t.GetData() !== i && this.ygd(t, i)) {
      (e = new Protocol_1.Aki.Protocol.V$d()).Qmd = this.RXl.BackpackId;
      s = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemSwapInfo(i, t.GetPosition());
      e.G$d.push(s);
      if (s = t.GetData()) {
        t = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemSwapInfo(s, i.GetPosition());
        e.G$d.push(t);
      }
      return e;
    }
  }
  GetUpdateInfoInSendBackpack(t, i, e) {
    if (i !== undefined && !(e.size > 1)) {
      let t = undefined;
      for (const h of e) {
        t = h;
        break;
      }
      var e = new Protocol_1.Aki.Protocol.V$d();
      e.Qmd = this.RXl.BackpackId;
      var s = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(i);
      e.G$d.push(s);
      if (t !== undefined) {
        s = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(t, i.GetPosition());
        e.G$d.push(s);
      }
      return e;
    }
  }
  GetUpdateInfoInReceiveBackpack(t, i, e) {
    if (i !== undefined) {
      t = this.Egd(t);
      if (t !== undefined) {
        var s = new Protocol_1.Aki.Protocol.V$d();
        s.Qmd = this.RXl.BackpackId;
        const h = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(i, t.GetPosition());
        s.G$d.push(h);
        for (const o of e) {
          if (o) {
            const h = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(o);
            s.G$d.push(h);
          }
        }
        return s;
      }
    }
  }
  GetExchangeItemSet(t, i) {
    var t = this.Egd(t);
    if (t !== undefined && this.ygd(t, i)) {
      i = new Set();
      if (t = t.GetData()) {
        i.add(t);
      }
      return i;
    }
  }
  OnBackpackLogicStateChange(t) {
    if (t === 0) {
      this.SetPanelAlpha(t);
      this.RefreshBottomPanel();
      for (const i of this.fgd) {
        i.RefreshState(t);
      }
    } else if (t === 2 || t === 1) {
      for (const e of this.fgd) {
        e.RefreshState(t);
      }
    } else if (t === 5 || t === 6) {
      this.SetPanelAlpha(t);
      this.RefreshBottomPanel();
      for (const s of this.fgd) {
        s.RefreshState(t);
      }
    } else if (t === 3) {
      this.SetPanelAlpha(t);
      this.RefreshBottomPanel();
      for (const h of this.fgd) {
        h.RefreshState(t);
      }
    }
  }
  GetUpdateContextEffectGridItems(t) {
    var i = [];
    for (const s of t.G$d) {
      var e = ModelManager_1.ModelManager.HonamiStoryModel.GetItemData(s.Xmd);
      if (e && (s.h5n === 0 || s.h5n === 1) && (e = e.GetPosition(), e = this.YTm(e))) {
        i.push(e);
      }
    }
    return i;
  }
  YTm(t) {
    for (const i of this.fgd) {
      for (const e of i.GetPluginItemList()) {
        if (e.GetPosition() === t) {
          return e;
        }
      }
    }
  }
  RefreshSelfPanel() {
    var t = this.GetItem(2).GetHeight();
    var i = this.GetItem(1).GetOwner().GetComponentByClass(UE.UIVerticalLayout.StaticClass()).GetSpacing();
    var e = this.fgd.length;
    var t = e * t + Math.max(0, i * (e - 1)) + Math.abs(this.GetItem(11).GetAnchorOffsetY()) * 2;
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(2);
    var e = i.GetCellHeight() * i.GetHeightCount(false);
    var i = Math.min(this.RootItem.GetHeight(), t + e);
    this.RootItem?.SetHeight(i);
  }
  ScrollAfterInit() {
    TimerSystem_1.TimerSystem.Next(() => {
      var t = this.GetItem(11).GetHeight();
      var i = this.ContentItem.GetHeight();
      var e = this.ViewportItem.GetHeight();
      this.oIm = t / (i - e);
      var t = this.fgd[this.fgd.length - 1];
      this.xqe.ScrollToTop(undefined, t.GetRootItem(), true);
    });
  }
  uGu(t) {
    var i;
    if (t) {
      (i = this.GetSprite(3)).SetUIActive(true);
      i.SetWidth(t.GetRootItem().GetWidth());
      i.SetHeight(t.GetRootItem().GetHeight());
      i.SetUIWorldLocation(t.GetRootItem().K2_GetComponentLocation());
    } else {
      this.GetSprite(3).SetUIActive(false);
    }
  }
  async RefreshEquipItem() {
    await this.Mgd();
  }
  async Mgd() {
    var i = this.RXl.GetRoleEquipDataList();
    var e = [];
    for (let t = 0; t < i.length; t++) {
      e.push(this.fgd[t].RefreshUiAsync(i[t]));
    }
    await Promise.all(e);
  }
  Egd(t) {
    for (const i of this.fgd) {
      if (HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(t, i.GetRootItem(), true)) {
        return i.GetEquipItemByEventData(t);
      }
    }
  }
  ygd(t, i) {
    return i.GetItemType() === 1 && t.GetIsUnlock();
  }
  vgd(t, i) {
    var e = this.GetSprite(4);
    if (t !== undefined && (i = i.OperateData) !== t.GetData() && i) {
      i = this.ygd(t, i);
      e.SetUIActive(true);
      e.SetWidth(t.GetRootItem().GetWidth());
      e.SetHeight(t.GetRootItem().GetHeight());
      t = t.GetRootItem().K2_GetComponentLocation();
      e.SetUIWorldLocation(t);
      e.SetChangeColor(i, e.changeColor);
    } else {
      e.SetUIActive(false);
    }
  }
  SetPanelAlpha(t) {
    var i = t === 0;
    var e = t === 5 || t === 6;
    this.TeamDataItem?.SetIsEnable(i || e);
    for (const s of this.fgd) {
      s.SetEnableState(t);
    }
    this.ToggleA.RootUIComp.SetAlpha(e ? HonamiStoryDefine_1.HONAMI_DISABLE_ALPHA : HonamiStoryDefine_1.HONAMI_ENABLE_ALPHA);
    this.ToggleB.RootUIComp.SetAlpha(e ? HonamiStoryDefine_1.HONAMI_DISABLE_ALPHA : HonamiStoryDefine_1.HONAMI_ENABLE_ALPHA);
    this.GetSprite(17)?.SetAlpha(i || e ? HonamiStoryDefine_1.HONAMI_ENABLE_ALPHA : HonamiStoryDefine_1.HONAMI_DISABLE_ALPHA);
  }
  RefreshBottomPanel() {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
    var i = t === 3;
    var t = t === 5 || t === 6;
    this.InsteadValueItem?.SetVisible(i);
    this.CurrentValueItem?.SetVisible(!i && this.d0m && !this.n2m);
    if (!i) {
      e = this.n2m ? "HonamiStory_QuickUnloadAll" : "HonamiStory_BackpackSort";
      this.Vmi?.SetLocalTextNew(e);
    }
    this.Vmi?.SetUiActive(!i);
    this.Fmi?.SetUiActive(this.n2m && !i);
    this.Vmi?.SetEnableClick(!t);
    this.Fmi?.SetEnableClick(!t);
    var e = t ? HonamiStoryDefine_1.HONAMI_DISABLE_ALPHA : HonamiStoryDefine_1.HONAMI_ENABLE_ALPHA;
    this.Vmi?.GetRootItem().SetAlpha(e);
    this.Fmi?.GetRootItem().SetAlpha(e);
  }
  RefreshScrollMoveState(t) {
    var i;
    var e;
    if (t) {
      i = this.ContentItem.GetStretchTop();
      i = HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(t, this.MoveUpItem, true) && i < 0;
      e = this.ContentItem.GetStretchBottom();
      e = HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(t, this.MoveDownItem, true) && e < 0;
      this.MoveUpItem.SetUIActive(i);
      this.MoveDownItem.SetUIActive(e);
      if (i || e) {
        e = this.YCm(i, t);
        this.kdm = i;
        this.Odm(e);
      }
    } else {
      this.MoveUpItem.SetUIActive(false);
      this.MoveDownItem.SetUIActive(false);
    }
  }
  Odm(t) {
    var i = this.ContentItem.GetRelativeTransform().GetLocation();
    var t = (this.kdm ? -this.qdm : this.qdm) * t;
    this.xqe.SetScrollValue(new UE.Vector2D(0, Math.max(0, i.Y + t)));
    var i = this.ContentItem.GetStretchTop();
    var t = this.ContentItem.GetStretchBottom();
    if (this.kdm && i >= 0) {
      this.MoveUpItem.SetUIActive(false);
    } else if (!this.kdm && t >= 0) {
      this.MoveDownItem.SetUIActive(false);
    }
  }
  YCm(t, i) {
    var e = t ? this.MoveUpItem : this.MoveDownItem;
    var i = HonamiStoryUtil_1.HonamiStoryUtil.GetOffsetVector(i.GetWorldPointInPlane());
    var e = e.GetUIWorldPosition();
    if (t) {
      if (i.Z > e.Z) {
        return 2;
      } else {
        return 1;
      }
    } else if (i.Z > e.Z) {
      return 1;
    } else {
      return 2;
    }
  }
  nIm(t) {
    var i;
    var e;
    var s;
    if (t) {
      e = this.GetItem(11).GetHeight();
      s = this.ContentItem.GetHeight();
      i = this.ViewportItem.GetHeight();
      this.oIm = e / (s - i);
      this.rIm = t.Y;
      e = this.rIm <= this.oIm ? 1 : 0;
      s = this.rIm <= this.oIm ? 0 : 1;
      this.n2m = this.rIm <= this.oIm;
      this.RefreshBottomPanel();
      this.ToggleA.SetToggleState(e);
      this.ToggleB.SetToggleState(s);
    }
  }
  RefreshNeedQuickAll() {
    var t;
    var i;
    if (this.GetUiNiagara(12)) {
      t = this.GetUiNiagara(12).IsUIActiveSelf();
      if ((i = ModelManager_1.ModelManager.HonamiStoryModel.QuickAllCheck()) !== t) {
        if (i) {
          this.SPe.PlayLevelSequenceByName("Tips_Rect");
        } else {
          this.SPe.StopSequenceByKey("Tips_Rect");
          this.GetUiNiagara(12).SetUIActive(false);
        }
      } else if (!i) {
        this.SPe.StopSequenceByKey("Tips_Rect");
        this.GetUiNiagara(12).SetUIActive(false);
      }
    }
  }
  OnClickedEquipToggle() {
    var t = this.rIm <= this.oIm ? 1 : 0;
    this.ToggleA.SetToggleState(t);
    this.xqe.ScrollToTop(undefined, this.GetItem(11), true);
  }
  OnClickedBackpackToggle() {
    var t = this.rIm <= this.oIm ? 0 : 1;
    this.ToggleB.SetToggleState(t);
    this.xqe.ScrollToTop(undefined, this.HXl.GetRootItem(), true);
  }
}
exports.HonamiStoryMobileEquipPanel = HonamiStoryMobileEquipPanel;
//# sourceMappingURL=HonamiStoryMobileEquipPanel.js.map