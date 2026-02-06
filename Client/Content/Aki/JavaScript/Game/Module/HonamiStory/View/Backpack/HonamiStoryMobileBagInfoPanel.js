"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryMobileBagInfoPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const HonamiStoryUtil_1 = require("../../HonamiStoryUtil");
const HonamiStoryBackpackPanelBase_1 = require("./HonamiStoryBackpackPanelBase");
const HonamiStoryGridItemBase_1 = require("./Item/HonamiStoryGridItemBase");
const EQUIP_OFFSET = 300;
class HonamiStoryMobileBagInfoPanel extends HonamiStoryBackpackPanelBase_1.HonamiStoryBackpackPanelBase {
  constructor() {
    super(...arguments);
    this.RXl = undefined;
    this.ScrollView = undefined;
    this.ViewportItem = undefined;
    this.ViewportHeight = 0;
    this.EquipCount = 0;
    this.ContentItem = undefined;
    this.MoveUpItem = undefined;
    this.MoveDownItem = undefined;
    this.CurrentValueItem = undefined;
    this.Nfd = new Map();
    this.Vfd = new Set();
    this.jfd = undefined;
    this.Hfd = -1;
    this.$fd = -1;
    this.Wfd = -1;
    this.Qfd = -1;
    this.Kfd = -1;
    this.kdm = false;
    this.qdm = 10;
    this.iCm = new Set();
    this.TQd = i => {
      if (i.Qmd === this.RXl.BackpackId) {
        UiLayer_1.UiLayer.SetShowMaskLayer("HonamiStoryPickUpMobileView", true);
        this.zfd(i).then(() => {
          if (this.GetBackpackType() === 1) {
            this.CurrentValueItem.RefreshInGame();
          }
          UiLayer_1.UiLayer.SetShowMaskLayer("HonamiStoryPickUpMobileView", false);
          for (const t of this.GetUpdateContextEffectGridItems(i)) {
            t.PlayPosChangeSweepAnimation();
          }
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite]];
  }
  OnStart() {
    this.qdm = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetScrollingSpeed();
    this.GetSprite(3).SetUIActive(false);
    this.GetSprite(1).SetUIActive(false);
    this.GetSprite(1).SetHierarchyIndex(99);
    this.GetSprite(2).SetUIActive(false);
    this.GetSprite(2).SetHierarchyIndex(100);
  }
  OnBeforeShow() {
    this.dde();
    this.CurrentValueItem.RefreshInGame();
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, this.TQd);
  }
  async Init() {
    this.RXl = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(2);
    var t = this.RXl;
    var i = t.GetHeightCount(false) * t.GetCellHeight() + t.GetCellVerticalInterval() * (t.GetHeightCount(false) - 1);
    var t = t.GetWidthCount() * t.GetCellWidth() + t.GetCellHorizontalInterval() * (t.GetWidthCount() - 1);
    this.ContentItem.SetHeight(i + this.EquipCount * EQUIP_OFFSET);
    this.ContentItem.SetWidth(t);
    var s = this.GetItem(0);
    s.SetHeight(i);
    s.SetWidth(t);
    var i = [this.UpdateViewportItems()];
    await Promise.all(i);
  }
  async UpdateViewportItems() {
    var i = this.ContentItem.GetAnchorOffsetY() - this.EquipCount * EQUIP_OFFSET;
    var s = this.RXl.GetCellHeight() + this.RXl.GetCellVerticalInterval();
    var t = this.RXl.GetWidthCount();
    var e = this.RXl.GetHeightCount();
    var i = Math.floor(i / s);
    var s = Math.ceil(this.ViewportHeight / s) + 2;
    var i = Math.max(0, i);
    var e = Math.min(e - 1, i + s - 1);
    this.Qfd = i * t;
    this.Kfd = (e + 1) * t - 1;
    if (this.$fd !== this.Qfd || this.Wfd !== this.Kfd) {
      var s = this.$fd;
      var r = this.Wfd;
      var h = this.Qfd;
      var i = this.Kfd;
      var e = this.RXl.GetCapacity() + this.RXl.GetOverflowCapacity();
      this.$fd = this.Qfd;
      this.Wfd = this.Kfd;
      var a = [];
      if (s < h) {
        for (let t = s; t < h; t++) {
          a.push(this.Jfd(t));
        }
      }
      if (i < r) {
        for (let t = i + 1; t <= r; t++) {
          a.push(this.Jfd(t));
        }
      }
      await Promise.all(a);
      var o = [];
      if (h < s) {
        for (const n of this.GetAvailableGrid(h, Math.min(s - 1, e - 1))) {
          o.push(this.bQd(n));
        }
      }
      if (r < i) {
        for (const f of this.GetAvailableGrid(r + 1, Math.min(i, e - 1))) {
          o.push(this.bQd(f));
        }
      }
      await Promise.all(o);
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
  async c0m(t) {
    var i = this.RXl;
    var s = i.GetHeightCount() * i.GetCellHeight() + i.GetCellVerticalInterval() * (i.GetHeightCount() - 1);
    this.ContentItem.SetHeight(s);
    var s = this.ContentItem.GetAnchorOffsetY();
    var e = i.GetCellHeight() + i.GetCellVerticalInterval();
    var r = i.GetWidthCount();
    var h = i.GetHeightCount();
    var s = Math.floor(s / e);
    var e = Math.ceil(this.ViewportHeight / e) + 2;
    var s = Math.max(0, s);
    var h = Math.min(h - 1, s + e - 1);
    this.Qfd = s * r;
    this.Kfd = (h + 1) * r - 1;
    var e = this.$fd;
    var a = this.Wfd;
    var o = this.Qfd;
    var s = this.Kfd;
    if (this.$fd !== this.Qfd || this.Wfd !== this.Kfd) {
      this.$fd = this.Qfd;
      this.Wfd = this.Kfd;
      var h = i.GetCapacity() + i.GetOverflowCapacity();
      var n = [];
      if (e < o) {
        for (let t = e; t < o; t++) {
          n.push(this.Jfd(t));
        }
      }
      if (s < a) {
        for (let t = s + 1; t <= a; t++) {
          n.push(this.Jfd(t));
        }
      }
      await Promise.all(n);
      var f = [];
      if (o < e) {
        for (const v of this.GetAvailableGrid(o, Math.min(e - 1, h - 1))) {
          f.push(this.bQd(v));
        }
      }
      if (a < s) {
        for (const _ of this.GetAvailableGrid(a + 1, Math.min(s, h - 1))) {
          f.push(this.bQd(_));
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
      (i = this.GetSprite(1))?.SetUIActive(true);
      s = this.RXl.GetCellWidth() + this.RXl.GetCellHorizontalInterval();
      e = this.RXl.GetCellHeight() + this.RXl.GetCellVerticalInterval();
      i.SetWidth(s * t.GetGridWidth());
      i.SetHeight(e * t.GetGridHeight());
      this.tgd(i, t.GetPosition());
    } else {
      this.GetSprite(1).SetUIActive(false);
    }
  }
  egd(t) {
    var i;
    var s;
    var e;
    if (t) {
      (i = this.GetSprite(2)).SetUIActive(true);
      s = this.RXl.GetCellWidth() + this.RXl.GetCellHorizontalInterval();
      e = this.RXl.GetCellHeight() + this.RXl.GetCellVerticalInterval();
      i.SetWidth(s * t.Width);
      i.SetHeight(e * t.Height);
      i.SetChangeColor(t.IsValid, i.changeColor);
      this.tgd(i, t.StartPosition);
    } else {
      this.GetSprite(2).SetUIActive(false);
    }
  }
  async bQd(i) {
    if (!this.Nfd.has(i)) {
      var s = this.RXl.GetItemDataByPosition(i);
      if (!s) {
        if (this.iCm.has(i)) {
          return undefined;
        } else {
          await this.ngd(i);
          return;
        }
      }
      if (this.igd(s) && !this.iCm.has(i)) {
        var e = await this.RQd(true, s);
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
    this.iCm.add(t);
    var i = await this.RQd();
    var s = i.GetRootItem();
    this.tgd(s, t);
    s.SetWidth(this.RXl.GetCellWidth());
    s.SetHeight(this.RXl.GetCellHeight());
    s.SetDisplayName("HonamiStoryItem_" + t);
    i.Refresh(undefined, t);
    this.Nfd.set(t, i);
    await i.ShowAsync();
    this.iCm.delete(t);
  }
  tgd(t, i) {
    var s = Math.floor(i / this.RXl.GetWidthCount());
    var i = i % this.RXl.GetWidthCount();
    var i = i * this.RXl.GetCellWidth() + i * this.RXl.GetCellHorizontalInterval();
    var s = -s * this.RXl.GetCellHeight() - s * this.RXl.GetCellVerticalInterval();
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
      for (const h of t.G$d) {
        if (h.h5n !== 0 && (i = h.F$d.l9_, this.Nfd.get(i))) {
          e.push(this.hgd(i));
        }
      }
      for (const a of t.G$d) {
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
      for (const n of t.G$d) {
        if (n.h5n !== 2 && (s = n.B$d.l9_, this.RXl.GetItemDataByPosition(s))) {
          e.push(this.bQd(s));
        }
      }
      await Promise.all(e);
      await this.lgd();
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
      await this.c0m(t);
    }
    var i;
    var s;
    var e = [];
    for (let t = this.Qfd; t <= this.Kfd; t++) {
      if (!this.Nfd.get(t) && !this.iCm.has(t)) {
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
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, this.TQd);
  }
  async RQd(t = false, i = undefined) {
    var s;
    if (this.Vfd.size > 0) {
      s = this.Vfd.values().next().value;
      this.Vfd.delete(s);
    } else {
      (s = new HonamiStoryGridItemBase_1.HonamiStoryGridItemBase(t, this, i)).OnEnterGridCb = this.OnEnterItem;
      s.OnExitGridCb = this.OnExitItem;
      s.OnDownGridCb = this.OnDownItem;
      s.OnClickedGridCb = this.OnClickItem;
      await s.CreateByResourceIdAsync("UiItem_HonamiStoryGrid", this.GetItem(0));
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
    this.uGu(i.GetData());
    this.RefreshScrollMoveState(undefined);
    return super.OnDragBegin(t, i);
  }
  OnDrag(t, i) {
    this.uGu(i.GetData());
    return super.OnDrag(t, i);
  }
  OnDragEnd(t, i) {
    this.uGu(undefined);
    this.RefreshScrollMoveState(undefined);
    super.OnDragEnd(t, i);
  }
  GetDragItemPositionInContent(t) {
    var i = this.GetItem(0);
    var t = HonamiStoryUtil_1.HonamiStoryUtil.GetOffsetVector(t.GetWorldPointInPlane());
    var s = i.GetUIWorldPosition();
    var e = s.X - i.GetWidth() / 2;
    var r = e + i.GetWidth();
    var s = s.Z - i.GetHeight() / 2;
    var i = s + i.GetHeight();
    if (t.X < e || t.X > r || t.Z < s || t.Z > i) {
      return -1;
    } else {
      r = t.X - e;
      s = i - t.Z;
      e = this.RXl.GetCellWidth() + this.RXl.GetCellHorizontalInterval();
      i = this.RXl.GetCellHeight() + this.RXl.GetCellVerticalInterval();
      t = Math.floor(r / e);
      return Math.floor(s / i) * this.RXl.GetWidthCount() + t;
    }
  }
  CheckDragItemInViewport(t) {
    var t = HonamiStoryUtil_1.HonamiStoryUtil.GetOffsetVector(t.GetWorldPointInPlane());
    var i = this.GetItem(0);
    var s = i.GetUIWorldPosition();
    var e = s.X - i.GetWidth() / 2;
    var r = e + i.GetWidth();
    var s = s.Z - i.GetHeight() / 2;
    var i = s + i.GetHeight();
    return !(t.X < e) && !(t.X > r) && !(t.Z < s) && !(t.Z > i);
  }
  GetUpdateInfoInSameBackpack(t, i) {
    if (this.jfd && this.jfd.IsValid && (this.jfd.StartPosition !== i.GetPosition() || i.GetIsCross() !== i.GetIsDragCross())) {
      var s = new Set();
      var e = new Protocol_1.Aki.Protocol.V$d();
      e.Qmd = this.RXl.BackpackId;
      var r = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemSwapInfo(i, this.jfd.StartPosition);
      e.G$d.push(r);
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
          e.G$d.push(a);
        }
      }
      return e;
    }
  }
  cgd(t, i, s, e, r) {
    if (e.GetIsCross() === e.GetIsDragCross()) {
      return this.scm(t, i, s, r);
    } else {
      return this.acm(t, i, s, e, r);
    }
  }
  scm(t, i, s, e) {
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
  acm(t, i, s, e, r) {
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
    for (const c of h) {
      if (c) {
        var a = HonamiStoryUtil_1.HonamiStoryUtil.FindAvailablePosition(e, c, this.RXl.GetWidthCount(), false);
        if (a.Position === -1) {
          return;
        }
        var o = c.GetGridFillPositionByPosition(a.Position, a.IsCross);
        c.SetIsDragCross(a.IsCross);
        HonamiStoryUtil_1.HonamiStoryUtil.RemoveEmptyGridPosition(e, o);
        r.push(a.Position);
      }
    }
    var n = new Protocol_1.Aki.Protocol.V$d();
    n.Qmd = this.RXl.BackpackId;
    var s = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(i);
    n.G$d.push(s);
    for (let t = 0; t < h.length; t++) {
      var f = h[t];
      var f = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(f, r[t]);
      n.G$d.push(f);
    }
    return n;
  }
  GetUpdateInfoInReceiveBackpack(t, i, s) {
    if (this.jfd && this.jfd.IsValid) {
      var e = new Protocol_1.Aki.Protocol.V$d();
      e.Qmd = this.RXl.BackpackId;
      var i = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(i, this.jfd.StartPosition);
      e.G$d.push(i);
      for (const h of s) {
        var r = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(h);
        e.G$d.push(r);
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
    var [n, f] = this.f_m(s, o, i - n, e, r, false);
    var v = n[0];
    var _ = n.length < s.GetGridFillPositionList().length;
    var v = t.StartOperateBackpack === t.TargetOperateBackpack && s.GetPosition() === v && !s.GetIsCross();
    var c = this.dgd(s, n, false, undefined, s, false);
    if (v || !_ && c && !v) {
      f.IsValid = !v;
    } else {
      var c = Math.floor(s.GetBaseGridWidth(true) / 2);
      var v = o - 1 + s.GetBaseGridWidth(false);
      var [o, c] = this.f_m(s, h - c, i - (v - h), e, r, true);
      var i = this.dgd(s, o, false, undefined, s, true);
      var v = o.length < s.GetGridFillPositionList().length;
      var h = o[0];
      var e;
      if ((e = t.StartOperateBackpack === t.TargetOperateBackpack && s.GetPosition() === h && s.GetIsCross()) || i && !v && !e && !a) {
        c.IsValid = !e;
        this.InteractController.RefreshDragItem(t, true);
        return c;
      }
      if (!_ && this.dgd(s, n, true, f, s, false)) {
        f.IsValid = true;
      } else if (!v && !a && this.dgd(s, o, true, c, s, true)) {
        c.IsValid = true;
        this.InteractController.RefreshDragItem(t, true);
        return c;
      }
    }
    this.InteractController.RefreshDragItem(t, false);
    return f;
  }
  f_m(s, e, r, h, a, o) {
    let n = 10000;
    let f = -1;
    let v = 10000;
    let _ = -1;
    var c = [];
    for (let i = 0; i < s.GetBaseGridWidth(o); i++) {
      for (let t = 0; t < s.GetBaseGridHeight(o); t++) {
        var m = i + e;
        var l = t + r;
        if (!(m < 0) && !(h <= m) && !(l < 0) && !(a <= l)) {
          c.push(l * h + m);
          n = Math.min(n, l);
          f = Math.max(f, l);
          v = Math.min(v, m);
          _ = Math.max(_, m);
        }
      }
    }
    return [c, {
      IsValid: false,
      StartPosition: c[0],
      EndPosition: c[c.length - 1],
      Width: _ >= v ? _ - v + 1 : 0,
      Height: f >= n ? f - n + 1 : 0,
      FillPosList: c
    }];
  }
  OnBackpackLogicStateChange(t) {
    if (t === 0 || t === 4) {
      this.RefreshAllDataItem();
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
          for (const c of f.GetGridFillPositionList()) {
            if (!a.has(c)) {
              return false;
            }
          }
          if (!this.w1f(i, e, r, f, h)) {
            return false;
          }
          n.add(f);
        }
      }
    }
    return true;
  }
  w1f(t, i, s, e, r) {
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
  RefreshScrollMoveState(t) {
    var i;
    var s;
    if (t) {
      i = this.ContentItem.GetStretchTop();
      i = HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(t, this.MoveUpItem, true) && i < 0;
      s = this.ContentItem.GetStretchBottom();
      s = HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(t, this.MoveDownItem, true) && s < 0;
      this.MoveUpItem.SetUIActive(i);
      this.MoveDownItem.SetUIActive(s);
      if (i || s) {
        s = this.YCm(i, t);
        this.kdm = i;
        this.Odm(s);
      }
    } else {
      this.MoveUpItem.SetUIActive(false);
      this.MoveDownItem.SetUIActive(false);
    }
  }
  Odm(t) {
    var i = this.ContentItem.GetRelativeTransform().GetLocation();
    var t = (this.kdm ? -this.qdm : this.qdm) * t;
    this.ScrollView.SetScrollValue(new UE.Vector2D(0, Math.max(0, i.Y + t)));
    var i = this.ContentItem.GetStretchTop();
    var t = this.ContentItem.GetStretchBottom();
    if (this.kdm && i >= 0) {
      this.MoveUpItem.SetUIActive(false);
    } else if (!this.kdm && t >= 0) {
      this.MoveDownItem.SetUIActive(false);
    }
  }
  YCm(t, i) {
    var s = t ? this.MoveUpItem : this.MoveDownItem;
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
  GetUpdateContextEffectGridItems(t) {
    var i = [];
    for (const e of t.G$d) {
      var s = e.h5n !== 2;
      if (this.RXl.GetItemDataByInstanceId(e.Xmd, s) && (e.h5n === 0 || e.h5n === 1) && (s = e.B$d.l9_, s = this.Nfd.get(s))) {
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
}
exports.HonamiStoryMobileBagInfoPanel = HonamiStoryMobileBagInfoPanel;
//# sourceMappingURL=HonamiStoryMobileBagInfoPanel.js.map