"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryEquipBackpackPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Time_1 = require("../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const HonamiStoryDefine_1 = require("../../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../../HonamiStoryUtil");
const HonamiStoryBackpackPanelBase_1 = require("./HonamiStoryBackpackPanelBase");
const HonamiStoryBackpackLevelItem_1 = require("./Item/HonamiStoryBackpackLevelItem");
const HonamiStoryBackpackValueCountItem_1 = require("./Item/HonamiStoryBackpackValueCountItem");
const HonamiStoryRoleEquipItem_1 = require("./Item/HonamiStoryRoleEquipItem");
const HonamiStoryRoleTipItem_1 = require("./Item/HonamiStoryRoleTipItem");
class HonamiStoryEquipBackpackPanel extends HonamiStoryBackpackPanelBase_1.HonamiStoryBackpackPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.TeamDataItem = undefined;
    this.RXl = undefined;
    this.fgd = [];
    this.zgm = undefined;
    this.f_a = undefined;
    this.InsteadValueItem = undefined;
    this.Jgm = undefined;
    this.Gdm = undefined;
    this.Fdm = undefined;
    this.L6e = 0;
    this.ViewPanelHeight = 0;
    this.SelfHeight = 0;
    this.SelfOldHeight = 0;
    this.ContentHeight = 0;
    this.TQd = i => {
      if (i.Qmd === this.RXl.BackpackId) {
        this.RefreshEquipItem().then(() => {
          for (const t of this.GetUpdateContextEffectGridItems(i)) {
            t.PlayPosChangeSweepAnimation();
          }
          if (Info_1.Info.IsInGamepad()) {
            ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().Reset();
          }
        });
        this.RefreshRoleTipItem();
      }
    };
    this.qBm = () => {
      this.RefreshEquipItem();
      this.RefreshRoleTipItem();
    };
    this.lem = (t, i) => {
      this.RefreshNeedQuickAll();
      this.TeamDataItem.RefreshPowerLevel(t !== i, t < i, t, i);
    };
    this.Ndm = () => {
      var t = Time_1.Time.Now;
      if (!(t - this.L6e < HonamiStoryDefine_1.HONAMI_BAKCPACK_CLICK_CD)) {
        this.L6e = t;
        ModelManager_1.ModelManager.HonamiStoryModel.ApplyQuickAll();
      }
    };
    this.Vdm = () => {
      var t = Time_1.Time.Now;
      if (!(t - this.L6e < HonamiStoryDefine_1.HONAMI_BAKCPACK_CLICK_CD)) {
        this.L6e = t;
        if (ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState() === 0) {
          ModelManager_1.ModelManager.HonamiStoryModel.QuickUnloadAllSlot();
        }
      }
    };
    this.Zgm = () => {
      this.e0m();
    };
    this.t0m = t => {
      if (this.zgm === t) {
        this.e0m();
      } else {
        this.zgm = t;
        for (const e of this.fgd) {
          e.SetActive(e === t);
        }
        var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().GetLogicState();
        this.RefreshBottomPanel(i);
        this.RefreshRoleTipItem();
      }
    };
    this.ppm = () => {
      this.TeamDataItem?.CheckCanUpgrade();
      for (const t of this.fgd) {
        for (const i of t.GetPluginItemList()) {
          i.RefreshLockState();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UINiagara], [13, UE.UIItem], [14, UE.UIScrollViewWithScrollbarComponent], [18, UE.UIItem]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.GetSprite(3).SetUIActive(true);
    this.GetSprite(4).SetUIActive(true);
    this.GetButton(5)?.RootUIComp.SetUIActive(false);
    this.RefreshNeedQuickAll();
    this.dde();
  }
  OnAfterShow() {
    this.GetSprite(3).SetUIActive(false);
    this.GetSprite(4).SetUIActive(false);
  }
  OnBeforeHide() {
    this.Cde();
  }
  OnBeforeDestroy() {
    this.zgm = undefined;
    this.TeamDataItem = undefined;
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, this.TQd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryPowerLevelUpdate, this.lem);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryRoleEquipChanged, this.qBm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemList, this.ppm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveCommonItem, this.ppm);
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, this.TQd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryPowerLevelUpdate, this.lem);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryRoleEquipChanged, this.qBm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemList, this.ppm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveCommonItem, this.ppm);
  }
  async Init(t) {
    this.RXl = t;
    var t = [];
    t.push(this.Cgd());
    var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
    this.TeamDataItem = new HonamiStoryBackpackLevelItem_1.HonamiStoryBackpackLevelItem(i);
    t.push(this.TeamDataItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.InsteadValueItem = new HonamiStoryBackpackValueCountItem_1.HonamiStoryBackpackInsteadItem();
    t.push(this.InsteadValueItem.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.Gdm = new ButtonItem_1.ButtonItem();
    this.Gdm.SetFunction(this.Ndm);
    t.push(this.Gdm.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.Fdm = new ButtonItem_1.ButtonItem();
    this.Fdm.SetFunction(this.Vdm);
    t.push(this.Fdm.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.Jgm = new HonamiStoryRoleTipItem_1.HonamiStoryRoleTipItem();
    this.Jgm.RegisterCloseCallback(this.Zgm);
    t.push(this.Jgm.CreateByResourceIdAsync("PnlBackpackEquipTip", this.GetItem(11)));
    this.Jgm.SetActive(false);
    await Promise.all(t);
    this.ContentHeight = this.GetItem(13).GetHeight();
    this.Gdm.SetLocalTextNew("HonamiStory_QuickEquippedAll");
    this.Fdm.SetLocalTextNew("HonamiStory_QuickUnloadAll");
    this.InsteadValueItem.SetVisible(false);
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
    t.OnMoreClickedCb = this.t0m;
    this.fgd.push(t);
    t.RegisterPanel(this);
    var i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1));
    await t.CreateThenShowByActorAsync(i.GetOwner());
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
  async RefreshEquipItem() {
    await this.Mgd();
  }
  RefreshRoleTipItem() {
    var t;
    var i;
    var e;
    var s;
    if (this.Jgm && this.zgm) {
      this.Jgm.Refresh(this.zgm.GetRoleEquipData());
      i = this.RootItem.GetStretchBottom();
      t = this.RootItem.GetHeight();
      this.RootItem?.SetHeight(t + i);
      t = t + i - this.GetScrollViewWithScrollbar(14).RootUIComp.GetStretchTop();
      i = this.GetItem(2).GetHeight();
      e = this.GetItem(11).GetAnchorOffsetY();
      s = this.GetScrollViewWithScrollbar(14).RootUIComp.GetStretchBottom();
      this.Jgm.GetRootItem().SetHeight(t - i - Math.abs(e) * 2 - s);
    }
  }
  async Mgd() {
    var i = this.RXl.GetRoleEquipDataList();
    var e = [];
    for (let t = 0; t < i.length; t++) {
      e.push(this.fgd[t].RefreshUiAsync(i[t]));
    }
    await Promise.all(e);
  }
  GetBackpackType() {
    return this.RXl.GetBackpackType();
  }
  OnDragBegin(t, i) {
    this.uGu(i);
    return super.OnDragBegin(t, i);
  }
  OnDrag(t, i) {
    this.uGu(i);
    return super.OnDrag(t, i);
  }
  OnDragEnd(t, i) {
    this.uGu(undefined);
    super.OnDragEnd(t, i);
  }
  OnHover(t, i) {
    t = this.Egd(t);
    if (this.f_a !== t) {
      this.f_a = t;
      this.vgd(t, i);
      this.OnCheckAttrItem(t, i);
    }
  }
  OnHoverEnd() {
    this.f_a = undefined;
    this.vgd(undefined, undefined);
    this.OnCheckAttrItem(undefined, undefined);
  }
  Egd(t) {
    for (const i of this.fgd) {
      if (i.GetRootItem().IsUIActiveSelf() && HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(t, i.GetRootItem(), true)) {
        return i.GetEquipItemByEventData(t);
      }
    }
  }
  CheckDragItemInViewport(t) {
    var t = HonamiStoryUtil_1.HonamiStoryUtil.GetOffsetVector(t.GetWorldPointInPlane());
    var i = this.GetRootItem().GetUIWorldPosition();
    var e = i.X - this.GetRootItem().GetWidth() / 2;
    var s = e + this.GetRootItem().GetWidth();
    var i = i.Z - this.GetRootItem().GetHeight() / 2;
    var o = i + this.GetRootItem().GetHeight();
    return !(t.X < e) && !(t.X > s) && !(t.Z < i) && !(t.Z > o);
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
      for (const o of e) {
        t = o;
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
        const o = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(i, t.GetPosition());
        s.G$d.push(o);
        for (const r of e) {
          if (r) {
            const o = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(r);
            s.G$d.push(o);
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
      this.RefreshBottomPanel(t);
      this.Jgm?.RefreshItemTipsOpen();
      for (const i of this.fgd) {
        i.RefreshState(t);
      }
    } else if (t === 4) {
      this.SetPanelAlpha(t);
    } else if (t === 1 || t === 2) {
      this.Jgm?.RefreshItemTipsOpen();
      for (const e of this.fgd) {
        e.RefreshState(t);
      }
    } else if (t === 6 || t === 5) {
      this.SetPanelAlpha(t);
      for (const s of this.fgd) {
        s.RefreshState(t);
      }
    } else if (t === 3) {
      this.SetPanelAlpha(t);
      this.RefreshBottomPanel(t);
      for (const o of this.fgd) {
        o.RefreshState(t);
      }
    }
  }
  RefreshUnlockSlot() {
    this.RefreshEquipItem();
  }
  ygd(t, i) {
    return i.GetItemType() === 1 && t.GetIsUnlock();
  }
  RefreshNeedQuickAll() {
    var t = this.GetUiNiagara(12).IsUIActiveSelf();
    var i = ModelManager_1.ModelManager.HonamiStoryModel.QuickAllCheck();
    if (i !== t) {
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
  RefreshSingleItem(t) {
    var t = t.GetPosition();
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetRoleItemDataByPosition(t);
    var t = i.GetHonamiStoryPluginIndex(t);
    var i = this.fgd[i.GetPosition()].GetPluginItemList()[t];
    i.Refresh(i.GetData(), -1);
  }
  SetPanelAlpha(t) {
    var i = t === 0;
    var e = t === 5 || t === 6;
    this.Gdm?.SetEnableClick(i);
    this.Fdm?.SetEnableClick(i);
    this.TeamDataItem?.SetIsEnable(i || e);
    for (const o of this.fgd) {
      o.SetEnableState(t);
    }
    var s = t === 0 || t === 3 ? HonamiStoryDefine_1.HONAMI_ENABLE_ALPHA : HonamiStoryDefine_1.HONAMI_DISABLE_ALPHA;
    this.GetItem(9)?.SetAlpha(s);
    this.GetItem(10)?.SetAlpha(i || e ? HonamiStoryDefine_1.HONAMI_ENABLE_ALPHA : HonamiStoryDefine_1.HONAMI_DISABLE_ALPHA);
  }
  RefreshBottomPanel(t) {
    var i = this.zgm !== undefined;
    var e = t === 0;
    this.InsteadValueItem?.SetVisible(t === 3);
    this.Gdm?.SetUiActive(e && !i);
    this.Fdm?.SetUiActive(e && !i);
  }
  RefreshSelfPanel() {
    var t = this.GetItem(2).GetHeight();
    var i = this.GetItem(1).GetOwner().GetComponentByClass(UE.UIVerticalLayout.StaticClass()).GetSpacing();
    var e = this.fgd.length;
    var t = e * t + Math.max(0, i * (e - 1));
    var i = Math.abs(this.GetItem(11).GetAnchorOffsetY());
    this.ContentHeight = t + i * 2;
    this.GetItem(13)?.SetHeight(this.ContentHeight);
    var e = this.GetScrollViewWithScrollbar(14).RootUIComp.GetHeight();
    var t = e - this.ContentHeight;
    this.SelfOldHeight = this.RootItem.GetHeight();
    this.SelfHeight = this.SelfOldHeight - t;
    this.RootItem?.SetHeight(this.SelfHeight);
  }
  e0m() {
    for (const i of this.fgd) {
      i.SetActive(true);
    }
    this.Jgm?.ShowTips(false);
    this.RootItem?.SetHeight(this.SelfHeight);
    this.GetItem(13)?.SetHeight(this.ContentHeight);
    this.zgm?.SetRoleTipOpenState(false);
    this.zgm = undefined;
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
    this.RefreshBottomPanel(t);
  }
  GetCurrentGridListGamepad() {
    var t = [];
    for (const i of this.fgd) {
      for (const e of i.GetPluginItemList()) {
        t.push(e);
      }
    }
    return t;
  }
  OnHoverGamepad(t, i, e) {
    var s = t;
    if (this.f_a !== s && (this.f_a = s, this.vgd(s, e), this.OnCheckAttrItem(s, e), (s = UiManager_1.UiManager.GetViewByName("HonamiStoryBackpackView")) && s.ShowTipsHotKeyOnly(t), e = UiManager_1.UiManager.GetViewByName("HonamiStoryPickUpBackpackView"))) {
      e.ShowTipsHotKeyOnly(t);
    }
  }
  GetUpdateInfoInSameBackpackGamepad(t, i) {
    var e;
    var s;
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
  GetUpdateInfoInSendBackpackGamepad(t, i, e) {
    if (i !== undefined && !(e.size > 1)) {
      let t = undefined;
      for (const o of e) {
        t = o;
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
  GetUpdateInfoInReceiveBackpackGamepad(t, i, e) {
    if (i !== undefined) {
      if (t !== undefined) {
        var s = new Protocol_1.Aki.Protocol.V$d();
        s.Qmd = this.RXl.BackpackId;
        const o = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(i, t.GetPosition());
        s.G$d.push(o);
        for (const r of e) {
          if (r) {
            const o = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(r);
            s.G$d.push(o);
          }
        }
        return s;
      }
    }
  }
  GetExchangeItemSetGamepad(t, i) {
    if (t !== undefined && this.ygd(t, i)) {
      i = new Set();
      if (t = t.GetData()) {
        i.add(t);
      }
      return i;
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t.length !== 0) {
      var i;
      var e = t[0];
      if (e === "RolePanel") {
        if (i = this.GetGuideUiItem("3")) {
          return [i, i];
        } else {
          return undefined;
        }
      }
      if (e === "Equips") {
        if (i = this.fgd[0]?.GetGuideUiItem("0")) {
          return [i, i];
        } else {
          return undefined;
        }
      }
      if (e === "AddBtn") {
        return this.fgd[0]?.GetGuideUiItemAndUiItemForShowEx(t);
      }
      if (e === "Plugin") {
        for (const o of this.fgd) {
          var s = Number(t[1]);
          var s = o.GuideFindPluginItemWithId(s);
          if (s) {
            return s;
          }
        }
      }
      if (e === "UpdateBtn") {
        if (i = this.GetGuideUiItem("5")) {
          return [i, i];
        } else {
          return undefined;
        }
      } else if (e === "Capybara") {
        i = Number(t[1]);
        if (i = this.fgd[i]?.GetGuideUiItem("1")) {
          return [i, i];
        } else {
          return undefined;
        }
      } else if (e === "SuitDesc") {
        return this.Jgm?.GetGuideUiItemAndUiItemForShowEx(t);
      } else {
        return undefined;
      }
    }
  }
}
exports.HonamiStoryEquipBackpackPanel = HonamiStoryEquipBackpackPanel;
//# sourceMappingURL=HonamiStoryEquipBackpackPanel.js.map