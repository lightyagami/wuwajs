"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryBackpackPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const HonamiStoryDefine_1 = require("../../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../../HonamiStoryUtil");
const HonamiStoryBackpackPanelBase_1 = require("./HonamiStoryBackpackPanelBase");
const HonamiStoryBackpackTitleItem_1 = require("./Item/HonamiStoryBackpackTitleItem");
const HonamiStoryBackpackValueCountItem_1 = require("./Item/HonamiStoryBackpackValueCountItem");
const HonamiStoryGridItemBase_1 = require("./Item/HonamiStoryGridItemBase");
const CONTENT_SMALL_OFFSET = 112;
const CONTENT_FOR_SAFE = 6;
class HonamiStoryBackpackPanel extends HonamiStoryBackpackPanelBase_1.HonamiStoryBackpackPanelBase {
  constructor() {
    super(...arguments);
    this.RXl = undefined;
    this.xqe = undefined;
    this.Ffd = undefined;
    this.yGe = undefined;
    this.Nfd = new Map();
    this.Vfd = new Set();
    this.jfd = undefined;
    this.Hfd = -1;
    this.Ue1 = 0;
    this.$fd = -1;
    this.Wfd = -1;
    this.Qfd = -1;
    this.Kfd = -1;
    this.fom = undefined;
    this.Vmi = undefined;
    this.gom = undefined;
    this._s1 = undefined;
    this.Mlm = false;
    this.Elm = 10;
    this.ILm = -1;
    this.Dcm = new Set();
    this.Ucm = undefined;
    this.Ga_ = t => {
      ModelManager_1.ModelManager.HonamiStoryModel.GetInteractController().RefreshSelectedUiItem();
      this.Xfd();
    };
    this.SQd = s => {
      if (s.Qmd === this.RXl.BackpackId) {
        UiLayer_1.UiLayer.SetShowMaskLayer("HonamiStoryBackpackView", true);
        this.zfd(s).then(() => {
          this._s1?.Refresh();
          if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon() && this.GetBackpackType() === 1) {
            this.gom?.RefreshInGame();
          }
          UiLayer_1.UiLayer.SetShowMaskLayer("HonamiStoryBackpackView", false);
          var t = this.GetUpdateContextEffectGridItems(s);
          for (const i of t) {
            i.PlayPosChangeSweepAnimation();
          }
        });
      }
    };
    this.Wbm = () => {
      this.xqe.StopMovement();
      this.xqe.ScrollToTop(undefined, this.yGe, true);
    };
    this.Com = () => {
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic();
      var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
      if (i === 0) {
        t?.SetLogicState(4);
      } else if (i === 2 || i === 1) {
        t?.CloseTips();
      }
    };
    this.GLn = () => {
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic();
      var i = t.GetLogicState();
      if (i === 0) {
        ModelManager_1.ModelManager.HonamiStoryModel.SortBackpack();
      } else if (i === 4) {
        t.DoSell();
      } else if (i === 2 || i === 1) {
        t?.CloseTips();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem]];
  }
  OnStart() {
    this.Elm = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetScrollingSpeed();
    this.xqe = this.GetScrollViewWithScrollbar(2);
    this.Ffd = this.GetItem(3);
    this.Ue1 = this.Ffd.GetHeight();
    this.yGe = this.GetItem(4);
    this.GetSprite(5).SetUIActive(false);
    this.GetSprite(5).SetHierarchyIndex(99);
    this.GetSprite(6).SetUIActive(false);
    this.GetSprite(6).SetHierarchyIndex(100);
    this.RefreshScrollMoveState(undefined);
  }
  OnBeforeShow() {
    this.dde();
  }
  dde() {
    this.xqe.OnScrollValueChange.Bind(this.Ga_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, this.SQd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStorySortSuccess, this.Wbm);
  }
  async Init(t) {
    var i = (this.RXl = t).BackpackType === 0;
    if (t.GetOverflowCapacity()) {
      this.Ucm = new UiPanelBase_1.UiPanelBase();
      await this.Ucm.CreateThenShowByResourceIdAsync("UiItem_GridStateOverflow", this.yGe);
      s = this.RXl.GetCapacity() + this.RXl.GetOverflowCapacity();
      this.tgd(this.Ucm.GetRootItem(), s);
      this.Ucm?.GetRootItem().SetAsLastHierarchy();
      this.Ucm?.SetUiActive(false);
    }
    var s = this.Ucm !== undefined ? this.Ucm.GetRootItem().GetHeight() : 0;
    var i = t.GetHeightCount(i) * t.GetCellHeight() + t.GetCellVerticalInterval() * t.GetHeightCount(i);
    var e = t.GetWidthCount() * t.GetCellWidth() + t.GetCellHorizontalInterval() * t.GetWidthCount();
    this.yGe.SetHeight(i + s + CONTENT_FOR_SAFE);
    this.yGe.SetStretchTop(CONTENT_FOR_SAFE);
    this.GetItem(15)?.SetStretchBottom(s + CONTENT_FOR_SAFE);
    this.yGe.SetWidth(e);
    if (t.BackpackType === 2) {
      r = this.RootItem.GetStretchBottom();
      h = this.GetItem(11).GetHeight();
      this.RootItem.SetStretchBottom(r - h);
    }
    var r = this.GetItem(14)?.GetHeight() ?? 0;
    var h = i + s + CONTENT_SMALL_OFFSET;
    if (h < r) {
      this.GetItem(14)?.SetStretchBottom(r - h);
    }
    this.xqe.RootUIComp.SetWidth(e);
    if (this.IsShowOrShowing && t.GetOverflowCapacity()) {
      this.xqe.ScrollToBottom(undefined, this.yGe, false);
    }
    var s = [this.pom(), this.Xfd()];
    this._s1 = new HonamiStoryBackpackTitleItem_1.HonamiStoryBackpackTitleItem(t.BackpackType);
    s.push(this._s1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    await Promise.all(s);
    var r = this.xqe.RootUIComp.GetHeight();
    this.xqe.SetCanScroll(r <= i);
  }
  async pom() {
    var t;
    var i;
    var s = this.GetBackpackType() === 2;
    this.GetItem(11)?.SetUIActive(!s);
    var e = [];
    if (!s) {
      s = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData(false)?.GetPreGuideQuestFinishState() ?? false;
      i = !(t = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon()) && s;
      this.GetItem(8)?.SetUIActive(i);
      this.Vmi = new ButtonItem_1.ButtonItem();
      this.Vmi.SetFunction(this.GLn);
      e.push(this.Vmi.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()));
      this.gom = new HonamiStoryBackpackValueCountItem_1.HonamiStoryBackpackValueCountItem();
      e.push(this.gom.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()));
      if (i) {
        this.fom = new ButtonItem_1.ButtonItem();
        this.fom.SetFunction(this.Com);
        e.push(this.fom.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
      }
      await Promise.all(e);
      this.Vmi.SetLocalTextNew("HonamiStory_BackpackSort");
      if (i) {
        this.fom.SetLocalTextNew("HonamiStory_QuickSell");
      }
      this.gom.SetVisible(t && s);
      ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().RegisterValuePanel(this.gom);
      if (t && this.GetBackpackType() === 1) {
        this.gom?.RefreshInGame();
      }
    }
  }
  async Xfd() {
    var t = this.yGe.GetAnchorOffsetY();
    var i = this.RXl.GetCellHeight() + this.RXl.GetCellVerticalInterval();
    var s = this.RXl.GetWidthCount();
    var e = this.RXl.BackpackType === 0;
    var e = this.RXl.GetHeightCount(e);
    var t = Math.floor(t / i);
    var i = Math.ceil(this.Ue1 / i) + 2;
    var t = Math.max(0, t);
    var r = Math.min(e - 1, t + i - 1);
    this.Qfd = t * s;
    this.Kfd = (r + 1) * s - 1;
    var r = this.RXl.GetOverflowCapacity();
    var s = e - 1 <= t + i - 1 && r > 0;
    this.SetBottomItemEnable(s);
    if (this.$fd !== this.Qfd || this.Wfd !== this.Kfd) {
      var e = this.$fd;
      var h = this.Wfd;
      var a = this.Qfd;
      var o = this.Kfd;
      var t = this.RXl.GetCapacity() + this.RXl.GetOverflowCapacity();
      this.$fd = this.Qfd;
      this.Wfd = this.Kfd;
      var n = [];
      if (e !== -1 && h !== -1) {
        if (e < a) {
          for (let t = e; t < a; t++) {
            n.push(this.Jfd(t));
          }
        }
        if (o < h) {
          for (let t = o + 1; t <= h; t++) {
            n.push(this.Jfd(t));
          }
        }
        await Promise.all(n);
        var f = [];
        if (a < e) {
          for (const _ of this.GetAvailableGrid(a, Math.min(e - 1, t - 1))) {
            f.push(this.MQd(_));
          }
        }
        if (h < o) {
          for (const m of this.GetAvailableGrid(h + 1, Math.min(o, t - 1))) {
            f.push(this.MQd(m));
          }
        }
        await Promise.all(f);
      } else {
        for (let t = a; t < o; t++) {
          n.push(this.Jfd(t));
        }
        await Promise.all(n);
        var v = [];
        for (const c of this.GetAvailableGrid(a, Math.min(o, t - 1))) {
          v.push(this.MQd(c));
        }
        await Promise.all(v);
      }
    }
  }
  GetAvailableGrid(i, s) {
    var e = new Set();
    var r = new Set();
    for (let t = i; t <= s; t++) {
      var h = this.RXl.GetItemDataByPosition(t);
      if (h) {
        if (!r.has(h)) {
          r.add(h);
          e.add(t);
        }
      } else {
        e.add(t);
      }
    }
    return e;
  }
  async Vum(t) {
    var i = this.RXl;
    var s = this.RXl.BackpackType === 0;
    var e = i.GetHeightCount(s) * i.GetCellHeight() + i.GetCellVerticalInterval() * (i.GetHeightCount(s) - 1);
    var r = this.xqe.RootUIComp.GetHeight();
    this.xqe.SetCanScroll(r <= e);
    var r = i.GetOverflowCapacity() ? this.Ucm.GetRootItem().GetHeight() : 0;
    this.yGe.SetHeight(e + r);
    this.GetItem(15)?.SetStretchBottom(r);
    var e = this.yGe.GetAnchorOffsetY();
    var r = i.GetCellHeight() + i.GetCellVerticalInterval();
    var h = i.GetWidthCount();
    var s = i.GetHeightCount(s);
    var e = Math.floor(e / r);
    var r = Math.ceil(this.Ue1 / r) + 2;
    var e = Math.max(0, e);
    var s = Math.min(s - 1, e + r - 1);
    this.Qfd = e * h;
    this.Kfd = (s + 1) * h - 1;
    var r = this.$fd;
    var a = this.Wfd;
    var o = this.Qfd;
    var e = this.Kfd;
    if (this.$fd !== this.Qfd || this.Wfd !== this.Kfd) {
      this.$fd = this.Qfd;
      this.Wfd = this.Kfd;
      var s = i.GetCapacity() + i.GetOverflowCapacity();
      var n = [];
      if (r < o) {
        for (let t = r; t < o; t++) {
          n.push(this.Jfd(t));
        }
      }
      if (e < a) {
        for (let t = e + 1; t <= a; t++) {
          n.push(this.Jfd(t));
        }
      }
      await Promise.all(n);
      var f = [];
      if (o < r) {
        for (const v of this.GetAvailableGrid(o, Math.min(r - 1, s - 1))) {
          f.push(this.MQd(v));
        }
      }
      if (a < e) {
        for (const _ of this.GetAvailableGrid(a + 1, Math.min(e, s - 1))) {
          f.push(this.MQd(_));
        }
      }
      await Promise.all(f);
    }
  }
  uGu(t) {
    var i;
    var s;
    var e;
    if (t) {
      (i = this.GetSprite(5))?.SetUIActive(true);
      s = this.RXl.GetCellWidth() + this.RXl.GetCellHorizontalInterval();
      e = this.RXl.GetCellHeight() + this.RXl.GetCellVerticalInterval();
      i.SetWidth(s * t.GetGridWidth());
      i.SetHeight(e * t.GetGridHeight());
      this.tgd(i, t.GetPosition());
    } else {
      this.GetSprite(5).SetUIActive(false);
    }
  }
  egd(t) {
    var i;
    var s;
    var e;
    if (t) {
      (i = this.GetSprite(6)).SetUIActive(true);
      s = this.RXl.GetCellWidth() + this.RXl.GetCellHorizontalInterval();
      e = this.RXl.GetCellHeight() + this.RXl.GetCellVerticalInterval();
      i.SetWidth(s * t.Width);
      i.SetHeight(e * t.Height);
      i.SetChangeColor(t.IsValid, i.changeColor);
      this.tgd(i, t.StartPosition);
    } else {
      this.GetSprite(6).SetUIActive(false);
    }
  }
  async MQd(i) {
    if (!this.Nfd.has(i)) {
      var s = this.RXl.GetItemDataByPosition(i);
      if (!s) {
        if (this.Dcm.has(i)) {
          return undefined;
        } else {
          await this.ngd(i);
          return;
        }
      }
      if (this.igd(s) && !this.Dcm.has(i)) {
        var e = await this.EQd(true, s);
        var r = e.GetRootItem();
        var h = this.RXl.GetCellWidth() * s.GetGridWidth() + (s.GetGridWidth() - 1) * this.RXl.GetCellHorizontalInterval();
        var a = this.RXl.GetCellHeight() * s.GetGridHeight() + (s.GetGridHeight() - 1) * this.RXl.GetCellVerticalInterval();
        this.tgd(r, s.GetPosition());
        r.SetWidth(h);
        r.SetHeight(a);
        e.Refresh(s, i);
        await e.ShowAsync();
        var h = s.GetGridFillPositionList();
        let t = "HonamiStoryItem_";
        for (const o of h) {
          t += o + "_";
        }
        r.SetDisplayName(t);
        await this.ogd(s, e);
      }
    }
  }
  async ngd(t) {
    this.Dcm.add(t);
    var i = await this.EQd();
    var s = i.GetRootItem();
    this.tgd(s, t);
    s.SetWidth(this.RXl.GetCellWidth());
    s.SetHeight(this.RXl.GetCellHeight());
    s.SetDisplayName("HonamiStoryItem_" + t);
    i.Refresh(undefined, t);
    this.Nfd.set(t, i);
    await i.ShowAsync();
    this.Dcm.delete(t);
  }
  tgd(t, i) {
    var s = Math.floor(i / this.RXl.GetWidthCount());
    var i = i % this.RXl.GetWidthCount();
    var i = i * this.RXl.GetCellWidth() + (1 + i) * this.RXl.GetCellHorizontalInterval();
    var s = -s * this.RXl.GetCellHeight() - (s + 1) * this.RXl.GetCellVerticalInterval();
    t.SetAnchorOffsetX(i);
    t.SetAnchorOffsetY(s);
  }
  async ogd(t, i) {
    for (const e of t.GetGridFillPositionList()) {
      var s = this.Nfd.get(e);
      if (s) {
        if (s.GetData()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("HonamiStory", 58, "BackpackItemMap 已存在该位置", ["position", e]);
          }
        } else {
          await this.Jfd(e);
        }
      }
      this.Nfd.set(e, i);
    }
  }
  async Jfd(t) {
    var i = this.Nfd.get(t);
    if (i) {
      var s = i.GetData();
      if (s) {
        if (!this.sgd(i)) {
          for (const e of s.GetGridFillPositionList()) {
            this.Nfd.delete(e);
          }
          this.Vfd.add(i);
          await i.HideAsync();
        }
      } else {
        await this.agd(t);
      }
    }
  }
  async hgd(t) {
    var i = this.Nfd.get(t);
    if (i) {
      var s = i.GetData();
      if (s) {
        var e = s.GetOldCross();
        for (const r of s.GetGridFillPositionByPosition(t, e)) {
          this.Nfd.delete(r);
        }
        this.Vfd.add(i);
        await i.HideAsync();
      } else {
        await this.agd(t);
      }
    }
  }
  async agd(t) {
    var i = this.Nfd.get(t);
    if (i) {
      if (i.GetData()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("HonamiStory", 58, "BackpackItemMap 回收空格子失败", ["position", t]);
        }
      } else {
        this.Vfd.add(i);
        this.Nfd.delete(t);
        await i.HideAsync();
      }
    }
  }
  async zfd(t) {
    if (t.Qmd === this.RXl.BackpackId) {
      var i;
      var s;
      var e = [];
      for (const h of t.B$d) {
        if (h.h5n !== 0 && (i = h.k$d.l9_, this.Nfd.get(i))) {
          e.push(this.hgd(i));
        }
      }
      for (const a of t.B$d) {
        if (a.h5n !== 2) {
          var r = this.RXl.GetItemDataByInstanceId(a.Xmd);
          if (r) {
            for (const o of r.GetGridFillPositionList()) {
              e.push(this.hgd(o));
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("HonamiStory", 58, "BackpackData 不存在该实例", ["instanceId", a.Xmd]);
          }
        }
      }
      await Promise.all(e);
      e.length = 0;
      for (const n of t.B$d) {
        if (n.h5n !== 2 && (s = n.A$d.l9_, this.RXl.GetItemDataByPosition(s))) {
          e.push(this.MQd(s));
        }
      }
      await Promise.all(e);
      await this.lgd();
      if (Info_1.Info.IsInGamepad()) {
        ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic().Reset();
      }
    }
  }
  async lgd() {
    let t = 0;
    if (this.GetBackpackType() === 0) {
      i = this.RXl.GetOverflowCapacity();
      s = this.RXl.RefreshOverflowCapacity();
      t = s - i;
    }
    if (t !== 0) {
      await this.Vum(t);
    }
    var i;
    var s;
    var e = [];
    for (let t = this.Qfd; t <= this.Kfd; t++) {
      if (!this.Nfd.get(t) && !this.Dcm.has(t)) {
        e.push(this.ngd(t));
      }
    }
    await Promise.all(e);
  }
  sgd(t) {
    t = t.GetData();
    return !!t && this.igd(t);
  }
  igd(t) {
    let i = false;
    for (const s of t.GetGridFillPositionList()) {
      if (this._gd(s)) {
        i = true;
        break;
      }
    }
    return i;
  }
  _gd(t) {
    return !(t < this.Qfd) && !(t > this.Kfd);
  }
  OnBeforeHide() {
    this.Cde();
  }
  Cde() {
    this.xqe.OnScrollValueChange.Unbind();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, this.SQd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStorySortSuccess, this.Wbm);
  }
  async EQd(t = false, i = undefined) {
    var s;
    if (this.Vfd.size > 0) {
      s = this.Vfd.values().next().value;
      this.Vfd.delete(s);
    } else {
      (s = new HonamiStoryGridItemBase_1.HonamiStoryGridItemBase(t, this, i)).OnEnterGridCb = this.OnEnterItem;
      s.OnExitGridCb = this.OnExitItem;
      s.OnDownGridCb = this.OnDownItem;
      s.OnClickedGridCb = this.OnClickItem;
      await s.CreateByResourceIdAsync("UiItem_HonamiStoryGrid", this.GetItem(4));
    }
    return s;
  }
  GetBackpackType() {
    return this.RXl.BackpackType;
  }
  OnHover(t, i) {
    var s = this.GetDragItemPositionInContent(t);
    this.RefreshScrollMoveState(t);
    if (s !== -1 && this.Hfd !== s && i.OperateData) {
      this.jfd = this.ugd(i, s);
      this.Hfd = s;
      this.egd(this.jfd);
    }
  }
  OnHoverEnd() {
    this.Hfd = -1;
    this.jfd = undefined;
    this.RefreshScrollMoveState(undefined);
    this.egd(undefined);
  }
  OnDragBegin(t, i) {
    this.ILm = i.GetData()?.GetIncId() ?? -1;
    this.uGu(i.GetData());
    this.RefreshScrollMoveState(undefined);
    return super.OnDragBegin(t, i);
  }
  OnDrag(t, i) {
    if (this.ILm === (i.GetData()?.GetIncId() ?? -1)) {
      this.uGu(i.GetData());
    } else {
      this.uGu(undefined);
    }
    return super.OnDrag(t, i);
  }
  OnDragEnd(t, i) {
    this.ILm = -1;
    this.uGu(undefined);
    super.OnDragEnd(t, i);
    this.RefreshScrollMoveState(undefined);
  }
  GetDragItemPositionInContent(t) {
    var t = HonamiStoryUtil_1.HonamiStoryUtil.GetOffsetVector(t.GetWorldPointInPlane());
    var i = this.yGe.GetUIWorldPosition();
    var s = i.X - this.yGe.GetWidth() / 2;
    var e = s + this.yGe.GetWidth();
    var i = i.Z - this.yGe.GetHeight() / 2;
    var r = i + this.yGe.GetHeight();
    if (t.X < s || t.X > e || t.Z < i || t.Z > r) {
      return -1;
    } else {
      e = t.X - s;
      i = r - t.Z;
      s = this.RXl.GetCellWidth() + this.RXl.GetCellHorizontalInterval();
      r = this.RXl.GetCellHeight() + this.RXl.GetCellVerticalInterval();
      t = Math.floor(e / s);
      return Math.floor(i / r) * this.RXl.GetWidthCount() + t;
    }
  }
  CheckDragItemInViewport(t) {
    var t = HonamiStoryUtil_1.HonamiStoryUtil.GetOffsetVector(t.GetWorldPointInPlane());
    var i = this.Ffd.GetUIWorldPosition();
    var s = i.X - this.Ffd.GetWidth() / 2;
    var e = s + this.Ffd.GetWidth();
    var i = i.Z - this.Ffd.GetHeight() / 2;
    var r = i + this.Ffd.GetHeight();
    return !(t.X < s) && !(t.X > e) && !(t.Z < i) && !(t.Z > r);
  }
  GetUpdateInfoInSameBackpack(t, i) {
    if (this.jfd && this.jfd.IsValid && (this.jfd.StartPosition !== i.GetPosition() || i.GetIsCross() !== i.GetIsDragCross())) {
      var s = new Set();
      var e = new Protocol_1.Aki.Protocol.q$d();
      e.Qmd = this.RXl.BackpackId;
      var r = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemSwapInfo(i, this.jfd.StartPosition);
      e.B$d.push(r);
      s.add(i.GetIncId());
      var h = this.jfd.FillPosList;
      for (const n of h) {
        var a = this.RXl.GetItemDataByPosition(n);
        if (a && !s.has(a.GetIncId())) {
          var o = this.cgd(this.jfd, i.GetPosition(), a.GetPosition(), i, a);
          let t = true;
          for (const f of a.GetGridFillPositionByPosition(o, a.GetIsDragCross())) {
            if (f >= this.RXl.GetCapacity()) {
              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoSpaceForQuickAll");
              return;
            }
            if (h.includes(f)) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("HonamiStory", 77, "SwapInfo Error");
              }
              t = false;
              break;
            }
          }
          if (!t) {
            return;
          }
          s.add(a.GetIncId());
          a = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemSwapInfo(a, o);
          e.B$d.push(a);
        }
      }
      return e;
    }
  }
  cgd(t, i, s, e, r) {
    if (e.GetIsCross() === e.GetIsDragCross()) {
      return this.phm(t, i, s, r);
    } else {
      return this.vhm(t, i, s, e, r);
    }
  }
  phm(t, i, s, e) {
    var r = t.StartPosition;
    var h = this.RXl.GetWidthCount();
    var a = i;
    var o = r % h - a % h;
    var n = Math.floor(r / h) - Math.floor(a / h);
    if (Math.abs(o) >= t.Width || Math.abs(n) >= t.Height) {
      return a - r + s;
    } else if (o == 0 && n == 0) {
      return 0;
    } else if (o == 0 || n == 0) {
      r = -(a = Math.sign(o));
      n = -(o = Math.sign(n));
      a = Math.abs(a) * t.Width;
      return n * (Math.abs(o) * t.Height) * h + r * a + s;
    } else {
      return 1 + (i + t.EndPosition - s) - e.GetGridWidth() - (e.GetGridHeight() - 1) * this.RXl.GetWidthCount();
    }
  }
  vhm(t, i, s, e, r) {
    if (r.GetGridWidth() !== r.GetGridHeight()) {
      r.SetIsDragCross(!r.GetIsCross());
    }
    var r = e.GetGridFillPositionByPosition(i, e.GetIsCross());
    var h = e.GetGridFillPositionByPosition(t.StartPosition, e.GetIsDragCross());
    let a = 0;
    for (; a < h.length && h[a] !== s; a++);
    return r[e.GetTransPosIndex(a)];
  }
  GetUpdateInfoInSendBackpack(t, i, s) {
    var e = new Set();
    for (const v of i.GetGridFillPositionList()) {
      e.add(v);
    }
    for (const _ of this.RXl.GetEmptyGridSet()) {
      e.add(_);
    }
    var r = [];
    var h = Array.from(s);
    for (const m of h) {
      if (m) {
        var a = HonamiStoryUtil_1.HonamiStoryUtil.FindAvailablePosition(e, m, this.RXl.GetWidthCount(), false);
        if (a.Position === -1) {
          return;
        }
        var o = m.GetGridFillPositionByPosition(a.Position, a.IsCross);
        m.SetIsDragCross(a.IsCross);
        HonamiStoryUtil_1.HonamiStoryUtil.RemoveEmptyGridPosition(e, o);
        r.push(a.Position);
      }
    }
    var n = new Protocol_1.Aki.Protocol.q$d();
    n.Qmd = this.RXl.BackpackId;
    var s = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(i);
    n.B$d.push(s);
    for (let t = 0; t < h.length; t++) {
      var f = h[t];
      var f = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(f, r[t]);
      n.B$d.push(f);
    }
    return n;
  }
  GetUpdateInfoInReceiveBackpack(t, i, s) {
    if (this.jfd && this.jfd.IsValid) {
      var e = new Protocol_1.Aki.Protocol.q$d();
      e.Qmd = this.RXl.BackpackId;
      var i = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(i, this.jfd.StartPosition);
      e.B$d.push(i);
      for (const h of s) {
        var r = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(h);
        e.B$d.push(r);
      }
      return e;
    }
  }
  GetExchangeItemSet(t, i) {
    if (this.jfd && this.jfd.IsValid) {
      var s = new Set();
      for (const r of this.jfd.FillPosList) {
        var e = this.Nfd.get(r)?.GetData();
        if (e && !s.has(e)) {
          s.add(e);
        }
      }
      return s;
    }
  }
  ugd(t, i) {
    var s = t.OperateData;
    var e = this.RXl.GetWidthCount();
    var r = this.RXl.BackpackType === 0;
    var r = this.RXl.GetHeightCount(r);
    var h = i % e;
    var i = Math.floor(i / e);
    var a = s.GetBaseGridWidth(false) === s.GetBaseGridHeight(false);
    var o = Math.floor(s.GetBaseGridWidth(false) / 2);
    var n = Math.floor(s.GetBaseGridHeight(false) / 2);
    var o = h - o;
    var [n, f] = this.Psm(s, o, i - n, e, r, false);
    var v = n[0];
    var _ = n.length < s.GetGridFillPositionList().length;
    var v = t.StartOperateBackpack === t.TargetOperateBackpack && s.GetPosition() === v && !s.GetIsCross();
    var m = this.dgd(s, n, false, undefined, s, false);
    if (v || !_ && m && !v) {
      f.IsValid = !v;
    } else {
      var m = Math.floor(s.GetBaseGridWidth(true) / 2);
      var v = o - 1 + s.GetBaseGridWidth(false);
      var [o, m] = this.Psm(s, h - m, i - (v - h), e, r, true);
      var i = this.dgd(s, o, false, undefined, s, true);
      var v = o.length < s.GetGridFillPositionList().length;
      var h = o[0];
      var e;
      if ((e = t.StartOperateBackpack === t.TargetOperateBackpack && s.GetPosition() === h && s.GetIsCross()) || i && !v && !e && !a) {
        m.IsValid = !e;
        this.InteractController.RefreshDragItem(t, true);
        return m;
      }
      if (!_ && this.dgd(s, n, true, f, s, false)) {
        f.IsValid = true;
      } else if (!v && !a && this.dgd(s, o, true, m, s, true)) {
        m.IsValid = true;
        this.InteractController.RefreshDragItem(t, true);
        return m;
      }
    }
    this.InteractController.RefreshDragItem(t, false);
    return f;
  }
  Psm(s, e, r, h, a, o) {
    let n = 10000;
    let f = -1;
    let v = 10000;
    let _ = -1;
    var m = [];
    for (let i = 0; i < s.GetBaseGridWidth(o); i++) {
      for (let t = 0; t < s.GetBaseGridHeight(o); t++) {
        var c = i + e;
        var l = t + r;
        if (!(c < 0) && !(h <= c) && !(l < 0) && !(a <= l)) {
          m.push(l * h + c);
          n = Math.min(n, l);
          f = Math.max(f, l);
          v = Math.min(v, c);
          _ = Math.max(_, c);
        }
      }
    }
    return [m, {
      IsValid: false,
      StartPosition: m[0],
      EndPosition: m[m.length - 1],
      Width: _ >= v ? _ - v + 1 : 0,
      Height: f >= n ? f - n + 1 : 0,
      FillPosList: m
    }];
  }
  OnBackpackLogicStateChange(t) {
    if (t === 0 || t === 4) {
      this.RefreshBottomButton(t);
      this.RefreshAllDataItem();
    } else if (t === 6 || t === 5) {
      this.RefreshBottomButton(t);
    }
  }
  dgd(t, i, s, e, r, h) {
    var a = new Set();
    var o = this.RXl.GetCapacity();
    for (const v of i) {
      if (v >= o) {
        return false;
      }
      a.add(v);
    }
    var n = new Set();
    for (const _ of a) {
      var f = this.Nfd.get(_);
      if (f && f.GetData() !== t) {
        f = f.GetData();
        if (f && !n.has(f)) {
          if (!s) {
            return false;
          }
          for (const m of f.GetGridFillPositionList()) {
            if (!a.has(m)) {
              return false;
            }
          }
          if (!this.Awm(i, e, r, f, h)) {
            return false;
          }
          n.add(f);
        }
      }
    }
    return true;
  }
  Awm(t, i, s, e, r) {
    var h = this.RXl.GetItemDataByInstanceId(s.GetIncId(), false);
    var a = this.RXl.GetItemDataByInstanceId(e.GetIncId(), false);
    if (h && a) {
      var o = s.GetIsDragCross();
      s.SetIsDragCross(r);
      var n = e.GetIsDragCross();
      var h = this.cgd(i, s.GetPosition(), e.GetPosition(), s, e);
      for (const f of e.GetGridFillPositionByPosition(h, e.GetIsDragCross())) {
        if (t.includes(f)) {
          s.SetIsDragCross(o);
          e.SetIsDragCross(n);
          return false;
        }
      }
      s.SetIsDragCross(o);
      e.SetIsDragCross(n);
    }
    return true;
  }
  GetUpdateContextEffectGridItems(t) {
    var i = [];
    for (const e of t.B$d) {
      var s = e.h5n !== 2;
      if (this.RXl.GetItemDataByInstanceId(e.Xmd, s) && (e.h5n === 0 || e.h5n === 1) && (s = e.A$d.l9_, s = this.Nfd.get(s))) {
        i.push(s);
      }
    }
    return i;
  }
  RefreshSingleItem(t) {
    var i = t.GetPosition();
    var s = this.Nfd.get(i);
    if (s) {
      if (s.GetData() !== t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("HonamiStory", 77, "Get Error Grid With Data", ["pos", i]);
        }
      } else {
        s.Refresh(t, t.GetPosition());
      }
    }
  }
  RefreshBottomButton(t) {
    var i;
    var s;
    if (this.GetBackpackType() !== 2) {
      if (t === 0 || t === 4) {
        this.Vmi?.SetLocalTextNew((i = t === 0) ? "HonamiStory_BackpackSort" : "HonamiStory_ClickSell");
        this.fom?.SetUiActive(i);
        s = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
        this.gom.SetVisible(!i || s);
        this.SetButtonAlpha(true);
      } else if (t === 6 || t === 5) {
        this.SetButtonAlpha(false);
      }
    }
  }
  SetButtonAlpha(t) {
    this.Vmi?.SetEnableClick(t);
    this.fom?.SetEnableClick(t);
    t = t ? HonamiStoryDefine_1.HONAMI_ENABLE_ALPHA : HonamiStoryDefine_1.HONAMI_DISABLE_ALPHA;
    this.GetItem(11)?.SetAlpha(t);
  }
  RefreshAllDataItem() {
    var t;
    var i;
    var s = new Set();
    for ([, t] of this.Nfd) {
      if (!s.has(t) && t && (s.add(t), i = t.GetData())) {
        t.Refresh(i, i.GetPosition());
      }
    }
  }
  RefreshScrollMoveState(t) {
    var i;
    var s;
    if (t) {
      i = this.yGe.GetStretchTop();
      i = HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(t, this.GetItem(12), true) && i < 0;
      s = this.yGe.GetStretchBottom();
      s = HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(t, this.GetItem(13), true) && s < 0;
      this.GetItem(12)?.SetUIActive(i);
      this.GetItem(13)?.SetUIActive(s);
      if (i || s) {
        s = this.ydm(i, t);
        this.Mlm = i;
        this.Ilm(s);
      }
    } else {
      this.GetItem(12)?.SetUIActive(false);
      this.GetItem(13)?.SetUIActive(false);
    }
  }
  Ilm(t) {
    var i = this.yGe.GetRelativeTransform().GetLocation();
    var t = (this.Mlm ? -this.Elm : this.Elm) * t;
    this.xqe.SetScrollValue(new UE.Vector2D(0, Math.max(0, i.Y + t)));
    var i = this.yGe.GetStretchTop();
    var t = this.yGe.GetStretchBottom();
    if (this.Mlm && i >= 0) {
      this.GetItem(12)?.SetUIActive(false);
    } else if (!this.Mlm && t >= 0) {
      this.GetItem(13)?.SetUIActive(false);
    }
  }
  ydm(t, i) {
    var s = this.GetItem(t ? 12 : 13);
    var i = HonamiStoryUtil_1.HonamiStoryUtil.GetOffsetVector(i.GetWorldPointInPlane());
    var s = s.GetUIWorldPosition();
    if (t) {
      if (i.Z > s.Z) {
        return 2;
      } else {
        return 1;
      }
    } else if (i.Z > s.Z) {
      return 1;
    } else {
      return 2;
    }
  }
  SetBottomItemEnable(t) {
    this.Ucm?.SetUiActive(t);
    if (t && this.Ucm !== undefined) {
      t = this.RXl.GetCapacity() + this.RXl.GetOverflowCapacity();
      this.tgd(this.Ucm.GetRootItem(), t);
      this.Ucm?.GetRootItem().SetAsLastHierarchy();
    }
  }
  GetCurrentGridListGamepad() {
    var t = [];
    const s = [];
    this.Nfd.forEach((t, i) => {
      s.push(i);
    });
    s.sort((t, i) => t - i);
    for (const e of s) {
      var i = this.Nfd.get(e);
      if (i) {
        t.push(i);
      }
    }
    return t;
  }
  CheckPositionValidGamepad(t) {
    return this._gd(t);
  }
  OnScrollToTopOrBottomGamepad(t) {
    if (t) {
      this.xqe.ScrollToTop(undefined, this.yGe, false);
    } else {
      this.xqe.ScrollToBottom(undefined, this.yGe, false);
    }
  }
  OnScrollValueChangedGamepad(t) {
    var i = this.yGe.GetRelativeTransform().GetLocation();
    var t = (t ? -this.Elm : this.Elm) * 15;
    var i = Math.max(0, i.Y + t);
    this.xqe.SetScrollValue(new UE.Vector2D(0, i));
  }
  OnHoverGamepad(t, i, s) {
    if (i !== -1 && this.Hfd !== i && s.OperateData && (this.jfd = this.ugd(s, i), this.Hfd = i, this.egd(this.jfd), (s = UiManager_1.UiManager.GetViewByName("HonamiStoryBackpackView")) && s.ShowTipsHotKeyOnly(t), i = UiManager_1.UiManager.GetViewByName("HonamiStoryPickUpBackpackView"))) {
      i.ShowTipsHotKeyOnly(t);
    }
  }
  GetUpdateInfoInSameBackpackGamepad(t, i) {
    if (this.jfd && this.jfd.IsValid && (this.jfd.StartPosition !== i.GetPosition() || i.GetIsCross() !== i.GetIsDragCross())) {
      var s = new Set();
      var e = new Protocol_1.Aki.Protocol.q$d();
      e.Qmd = this.RXl.BackpackId;
      var r = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemSwapInfo(i, this.jfd.StartPosition);
      e.B$d.push(r);
      s.add(i.GetIncId());
      var h = this.jfd.FillPosList;
      for (const n of h) {
        var a = this.RXl.GetItemDataByPosition(n);
        if (a && !s.has(a.GetIncId())) {
          s.add(a.GetIncId());
          var o = this.cgd(this.jfd, i.GetPosition(), a.GetPosition(), i, a);
          let t = true;
          for (const f of a.GetGridFillPositionByPosition(o, a.GetIsDragCross())) {
            if (h.includes(f)) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("HonamiStory", 77, "SwapInfo Error");
              }
              t = false;
              break;
            }
          }
          if (!t) {
            return;
          }
          a = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemSwapInfo(a, o);
          e.B$d.push(a);
        }
      }
      return e;
    }
  }
  GetUpdateInfoInSendBackpackGamepad(t, i, s) {
    var e = new Set(this.RXl.GetEmptyGridSet());
    for (const v of i.GetGridFillPositionList()) {
      e.add(v);
    }
    var r = [];
    var h = Array.from(s);
    for (const _ of h) {
      if (_) {
        var a = HonamiStoryUtil_1.HonamiStoryUtil.FindFirstAvailablePosition(e, _, this.RXl.GetWidthCount());
        if (a.Position === -1) {
          return;
        }
        var o = _.GetGridFillPositionByPosition(a.Position, a.IsCross);
        HonamiStoryUtil_1.HonamiStoryUtil.RemoveEmptyGridPosition(e, o);
        r.push(a.Position);
      }
    }
    var n = new Protocol_1.Aki.Protocol.q$d();
    n.Qmd = this.RXl.BackpackId;
    var s = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(i);
    n.B$d.push(s);
    for (let t = 0; t < h.length; t++) {
      var f = h[t];
      var f = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(f, r[t]);
      n.B$d.push(f);
    }
    return n;
  }
  GetUpdateInfoInReceiveBackpackGamepad(t, i, s) {
    if (this.jfd && this.jfd.IsValid) {
      var e = new Protocol_1.Aki.Protocol.q$d();
      e.Qmd = this.RXl.BackpackId;
      var i = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(i, this.jfd.StartPosition);
      e.B$d.push(i);
      for (const h of s) {
        var r = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(h);
        e.B$d.push(r);
      }
      return e;
    }
  }
  GetExchangeItemSetGamepad(t, i) {
    if (this.jfd && this.jfd.IsValid) {
      var s = new Set();
      for (const r of this.jfd.FillPosList) {
        var e = this.Nfd.get(r)?.GetData();
        if (e && !s.has(e)) {
          s.add(e);
        }
      }
      return s;
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (!(t.length < 1)) {
      var i;
      var s;
      var e;
      var r;
      var h = t[0];
      if (h === "BtnSell") {
        if (i = this.GetGuideUiItem("0")) {
          return [i, i];
        } else {
          return undefined;
        }
      }
      if (h === "ToggleSelect") {
        if (i = this.GetGuideUiItem("1")) {
          return [i, i];
        } else {
          return undefined;
        }
      }
      if (h === "BtnReset") {
        if (i = this.GetGuideUiItem("2")) {
          return [i, i];
        } else {
          return undefined;
        }
      }
      if (h === "Item") {
        i = Number(t[1]);
        if (s = this.RXl.GetItemDataList()[i]) {
          e = s.GetPosition();
          r = this.Nfd.get(e)?.GetItemGridItem()?.GetRootItem();
          if (s) {
            if (r) {
              return [r, r];
            } else {
              return undefined;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Guide", 95, "引导获取背包物品GridItem失败", ["position", e]);
            }
            return;
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Guide", 95, "引导获取背包物品失败", ["index", i]);
          }
          return;
        }
      }
      if (h === "Plugin") {
        var a;
        var o = Number(t[1]);
        for (const n of this.RXl.GetItemDataList()) {
          if (n.GetItemId() === o) {
            a = n.GetPosition();
            if (a = this.Nfd.get(a)?.GetItemGridItem()?.GetRootItem()) {
              return [a, a];
            } else {
              return undefined;
            }
          }
        }
      }
    }
  }
}
exports.HonamiStoryBackpackPanel = HonamiStoryBackpackPanel;
//# sourceMappingURL=HonamiStoryBackpackPanel.js.map