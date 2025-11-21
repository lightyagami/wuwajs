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
    this.Mlm = false;
    this.Elm = 10;
    this.Dcm = new Set();
    this.SQd = i => {
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
    this.Elm = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetScrollingSpeed();
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, this.SQd);
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
      var h = this.Wfd;
      var r = this.Qfd;
      var i = this.Kfd;
      var e = this.RXl.GetCapacity() + this.RXl.GetOverflowCapacity();
      this.$fd = this.Qfd;
      this.Wfd = this.Kfd;
      var a = [];
      if (s < r) {
        for (let t = s; t < r; t++) {
          a.push(this.Jfd(t));
        }
      }
      if (i < h) {
        for (let t = i + 1; t <= h; t++) {
          a.push(this.Jfd(t));
        }
      }
      await Promise.all(a);
      var o = [];
      if (r < s) {
        for (const n of this.GetAvailableGrid(r, Math.min(s - 1, e - 1))) {
          o.push(this.MQd(n));
        }
      }
      if (h < i) {
        for (const v of this.GetAvailableGrid(h + 1, Math.min(i, e - 1))) {
          o.push(this.MQd(v));
        }
      }
      await Promise.all(o);
    }
  }
  GetAvailableGrid(i, s) {
    var e = new Set();
    var h = new Set();
    for (let t = i; t <= s; t++) {
      var r = this.RXl.GetItemDataByPosition(t);
      if (r) {
        if (!h.has(r)) {
          h.add(r);
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
    var s = i.GetHeightCount() * i.GetCellHeight() + i.GetCellVerticalInterval() * (i.GetHeightCount() - 1);
    this.ContentItem.SetHeight(s);
    var s = this.ContentItem.GetAnchorOffsetY();
    var e = i.GetCellHeight() + i.GetCellVerticalInterval();
    var h = i.GetWidthCount();
    var r = i.GetHeightCount();
    var s = Math.floor(s / e);
    var e = Math.ceil(this.ViewportHeight / e) + 2;
    var s = Math.max(0, s);
    var r = Math.min(r - 1, s + e - 1);
    this.Qfd = s * h;
    this.Kfd = (r + 1) * h - 1;
    var e = this.$fd;
    var a = this.Wfd;
    var o = this.Qfd;
    var s = this.Kfd;
    if (this.$fd !== this.Qfd || this.Wfd !== this.Kfd) {
      this.$fd = this.Qfd;
      this.Wfd = this.Kfd;
      var r = i.GetCapacity() + i.GetOverflowCapacity();
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
      var v = [];
      if (o < e) {
        for (const f of this.GetAvailableGrid(o, Math.min(e - 1, r - 1))) {
          v.push(this.MQd(f));
        }
      }
      if (a < s) {
        for (const _ of this.GetAvailableGrid(a + 1, Math.min(s, r - 1))) {
          v.push(this.MQd(_));
        }
      }
      await Promise.all(v);
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
        var h = e.GetRootItem();
        var r = this.RXl.GetCellWidth() * s.GetGridWidth() + (s.GetGridWidth() - 1) * this.RXl.GetCellHorizontalInterval();
        var a = this.RXl.GetCellHeight() * s.GetGridHeight() + (s.GetGridHeight() - 1) * this.RXl.GetCellVerticalInterval();
        this.tgd(h, s.GetPosition());
        h.SetWidth(r);
        h.SetHeight(a);
        e.Refresh(s, i);
        await e.ShowAsync();
        var r = s.GetGridFillPositionList();
        let t = "HonamiStoryItem_";
        for (const o of r) {
          t += o + "_";
        }
        h.SetDisplayName(t);
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
        for (const h of s.GetGridFillPositionByPosition(t, e)) {
          this.Nfd.delete(h);
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
      for (const r of t.B$d) {
        if (r.h5n !== 0 && (i = r.k$d.l9_, this.Nfd.get(i))) {
          e.push(this.hgd(i));
        }
      }
      for (const a of t.B$d) {
        if (a.h5n !== 2) {
          var h = this.RXl.GetItemDataByInstanceId(a.Xmd);
          if (h) {
            for (const o of h.GetGridFillPositionList()) {
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
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryBackpackUpdate, this.SQd);
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
    var h = e + i.GetWidth();
    var s = s.Z - i.GetHeight() / 2;
    var i = s + i.GetHeight();
    if (t.X < e || t.X > h || t.Z < s || t.Z > i) {
      return -1;
    } else {
      h = t.X - e;
      s = i - t.Z;
      e = this.RXl.GetCellWidth() + this.RXl.GetCellHorizontalInterval();
      i = this.RXl.GetCellHeight() + this.RXl.GetCellVerticalInterval();
      t = Math.floor(h / e);
      return Math.floor(s / i) * this.RXl.GetWidthCount() + t;
    }
  }
  CheckDragItemInViewport(t) {
    var t = HonamiStoryUtil_1.HonamiStoryUtil.GetOffsetVector(t.GetWorldPointInPlane());
    var i = this.GetItem(0);
    var s = i.GetUIWorldPosition();
    var e = s.X - i.GetWidth() / 2;
    var h = e + i.GetWidth();
    var s = s.Z - i.GetHeight() / 2;
    var i = s + i.GetHeight();
    return !(t.X < e) && !(t.X > h) && !(t.Z < s) && !(t.Z > i);
  }
  GetUpdateInfoInSameBackpack(t, i) {
    if (this.jfd && this.jfd.IsValid && this.jfd.StartPosition !== i.GetPosition()) {
      var s = new Set();
      var e = new Protocol_1.Aki.Protocol.q$d();
      e.Qmd = this.RXl.BackpackId;
      var h = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemSwapInfo(i, this.jfd.StartPosition);
      e.B$d.push(h);
      s.add(i.GetIncId());
      var h = this.jfd.FillPosList;
      for (const o of h) {
        var r;
        var a = this.RXl.GetItemDataByPosition(o);
        if (!!a && !s.has(a.GetIncId())) {
          s.add(a.GetIncId());
          r = this.cgd(this.jfd, i.GetPosition(), a.GetPosition(), i, a);
          a = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemSwapInfo(a, r);
          e.B$d.push(a);
        }
      }
      return e;
    }
  }
  cgd(t, i, s, e, h) {
    if (e.GetIsCross() === e.GetIsDragCross()) {
      return this.phm(t, i, s);
    } else {
      return this.vhm(t, i, s, e, h);
    }
  }
  phm(t, i, s) {
    var e = t.StartPosition;
    var h = this.RXl.GetWidthCount();
    var r = i;
    var a = e % h - r % h;
    var o = Math.floor(e / h) - Math.floor(r / h);
    if (Math.abs(a) >= t.Width || Math.abs(o) >= t.Height) {
      return r - e + s;
    } else if (a == 0 && o == 0) {
      return 0;
    } else if (a == 0 || o == 0) {
      e = -(r = Math.sign(a));
      o = -(a = Math.sign(o));
      r = Math.abs(r) * t.Width;
      return o * (Math.abs(a) * t.Height) * h + e * r + s;
    } else {
      return i + t.EndPosition - s;
    }
  }
  vhm(t, i, s, e, h) {
    if (h.GetGridWidth() !== h.GetGridHeight()) {
      h.SetIsDragCross(!h.GetIsCross());
    }
    var h = e.GetGridFillPositionByPosition(i, e.GetIsCross());
    var r = e.GetGridFillPositionByPosition(t.StartPosition, e.GetIsDragCross());
    let a = 0;
    for (; a < r.length && r[a] !== s; a++);
    return h[e.GetTransPosIndex(a)];
  }
  GetUpdateInfoInSendBackpack(t, i, s) {
    var e = new Set();
    for (const f of i.GetGridFillPositionList()) {
      e.add(f);
    }
    for (const _ of this.RXl.GetEmptyGridSet()) {
      e.add(_);
    }
    var h = [];
    var r = Array.from(s);
    for (const c of r) {
      if (c) {
        var a = HonamiStoryUtil_1.HonamiStoryUtil.FindAvailablePosition(e, c, this.RXl.GetWidthCount(), false);
        if (a.Position === -1) {
          return;
        }
        var o = c.GetGridFillPositionByPosition(a.Position, a.IsCross);
        HonamiStoryUtil_1.HonamiStoryUtil.RemoveEmptyGridPosition(e, o);
        h.push(a.Position);
      }
    }
    var n = new Protocol_1.Aki.Protocol.q$d();
    n.Qmd = this.RXl.BackpackId;
    var s = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(i);
    n.B$d.push(s);
    for (let t = 0; t < r.length; t++) {
      var v = r[t];
      var v = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(v, h[t]);
      n.B$d.push(v);
    }
    return n;
  }
  GetUpdateInfoInReceiveBackpack(t, i, s) {
    if (this.jfd && this.jfd.IsValid) {
      var e = new Protocol_1.Aki.Protocol.q$d();
      e.Qmd = this.RXl.BackpackId;
      var i = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemAddInfo(i, this.jfd.StartPosition);
      e.B$d.push(i);
      for (const r of s) {
        var h = HonamiStoryUtil_1.HonamiStoryUtil.GetHonamiStoryItemRemoveInfo(r);
        e.B$d.push(h);
      }
      return e;
    }
  }
  GetExchangeItemSet(t, i) {
    if (this.jfd && this.jfd.IsValid) {
      var s = new Set();
      for (const h of this.jfd.FillPosList) {
        var e = this.Nfd.get(h)?.GetData();
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
    var h = this.RXl.BackpackType === 0;
    var h = this.RXl.GetHeightCount(h);
    var r = i % e;
    var i = Math.floor(i / e);
    var a = Math.floor(s.GetBaseGridWidth(false) / 2);
    var o = Math.floor(s.GetBaseGridHeight(false) / 2);
    var [a, o] = this.Psm(s, r - a, i - o, e, h, false);
    var n = a[0];
    var v = a.length < s.GetGridFillPositionList().length;
    var n = t.StartOperateBackpack === t.TargetOperateBackpack && s.GetPosition() === n;
    var a = this.dgd(s, a);
    o.IsValid = !v && a && !n;
    if (!n && !o.IsValid) {
      var v = Math.floor(s.GetBaseGridWidth(true) / 2);
      var a = Math.floor(s.GetBaseGridHeight(true) / 2);
      var [n, r] = this.Psm(s, r - v, i - a, e, h, true);
      var v = this.dgd(s, n);
      var i = n.length < s.GetGridFillPositionList().length;
      r.IsValid = v && !i;
      if (r.IsValid) {
        this.InteractController.RefreshDragItem(t, true);
        return r;
      }
    }
    this.InteractController.RefreshDragItem(t, false);
    return o;
  }
  Psm(s, e, h, r, a, o) {
    let n = 10000;
    let v = -1;
    let f = 10000;
    let _ = -1;
    var c = [];
    for (let i = 0; i < s.GetBaseGridWidth(o); i++) {
      for (let t = 0; t < s.GetBaseGridHeight(o); t++) {
        var m = i + e;
        var p = t + h;
        if (!(m < 0) && !(r <= m) && !(p < 0) && !(a <= p)) {
          c.push(p * r + m);
          n = Math.min(n, p);
          v = Math.max(v, p);
          f = Math.min(f, m);
          _ = Math.max(_, m);
        }
      }
    }
    return [c, {
      IsValid: false,
      StartPosition: c[0],
      EndPosition: c[c.length - 1],
      Width: _ >= f ? _ - f + 1 : 0,
      Height: v >= n ? v - n + 1 : 0,
      FillPosList: c
    }];
  }
  OnBackpackLogicStateChange(t) {
    if (t === 0 || t === 4) {
      this.RefreshAllDataItem();
    }
  }
  dgd(t, i) {
    var s = new Set();
    var e = this.RXl.GetCapacity();
    for (const r of i) {
      if (r >= e) {
        return false;
      }
      s.add(r);
    }
    for (const a of s) {
      var h = this.Nfd.get(a);
      if (h && h.GetData() !== t) {
        h = h.GetData();
        if (h) {
          for (const o of h.GetGridFillPositionList()) {
            if (!s.has(o)) {
              return false;
            }
          }
        }
      }
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
        s = this.ydm(i, t);
        this.Mlm = i;
        this.Ilm(s);
      }
    } else {
      this.MoveUpItem.SetUIActive(false);
      this.MoveDownItem.SetUIActive(false);
    }
  }
  Ilm(t) {
    var i = this.ContentItem.GetRelativeTransform().GetLocation();
    var t = (this.Mlm ? -this.Elm : this.Elm) * t;
    this.ScrollView.SetScrollValue(new UE.Vector2D(0, Math.max(0, i.Y + t)));
    var i = this.ContentItem.GetStretchTop();
    var t = this.ContentItem.GetStretchBottom();
    if (this.Mlm && i >= 0) {
      this.MoveUpItem.SetUIActive(false);
    } else if (!this.Mlm && t >= 0) {
      this.MoveDownItem.SetUIActive(false);
    }
  }
  ydm(t, i) {
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
    var i;
    var s = [];
    for (const e of t.B$d) {
      if (this.RXl.GetItemDataByInstanceId(e.Xmd) && (e.h5n === 0 || e.h5n === 1) && (i = e.A$d.l9_, i = this.Nfd.get(i))) {
        s.push(i);
      }
    }
    return s;
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