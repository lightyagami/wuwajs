"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoAttachBaseView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const AutoAttachDefine_1 = require("./AutoAttachDefine");
const ENDMOVEFLOAT = 0.01;
const MOVEMULFACTOR = 5;
const VERYBIGDISTANCE = 99999;
const DISTANCETOMIDDLE = 0.5;
const DEFALTAUDIO = "ui_common_picker_tick";
class AutoAttachBaseView {
  constructor(t, i = false) {
    this.SourceActor = undefined;
    this.SourceItem = undefined;
    this.SourceItemHeight = 0;
    this.SourceItemWidth = 0;
    this.ControllerActor = undefined;
    this.ControllerItem = undefined;
    this.ControllerHeight = 0;
    this.ControllerWidth = 0;
    this.Gap = 0;
    this.ShowItemNum = 0;
    this.DataLength = 0;
    this.MoveBoundary = 0;
    this.InertiaState = false;
    this.jWe = false;
    this.DragState = false;
    this.VelocityMoveState = false;
    this.WWe = undefined;
    this.KWe = undefined;
    this.QWe = true;
    this.XWe = 0;
    this.CurrentVelocityRunningTime = 0;
    this.$We = undefined;
    this.YWe = undefined;
    this.BoundaryCurve = undefined;
    this.JWe = 0;
    this.zWe = 0;
    this.ZWe = 0;
    this.eKe = 0;
    this.tKe = 0;
    this.iKe = new Map();
    this.Items = new Array();
    this.jD_ = undefined;
    this.AttachDirection = undefined;
    this.CurrentSelectState = false;
    this.CurrentSelectItemIndex = 0;
    this.CurrentRunningElasticTime = 0;
    this.nKe = 1;
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.aKe = MOVEMULFACTOR;
    this.uR1 = false;
    this.hKe = DEFALTAUDIO;
    this.lKe = undefined;
    this.CreateItemFunction = (t, i, s) => {};
    this._Ke = false;
    this.cW1 = false;
    this.uKe = undefined;
    this.v9e = () => {
      this.Clear();
    };
    this.Tick = t => {
      var i = UE.LGUIManagerActor.GetSequencerManager(GlobalData_1.GlobalData.World);
      var t = t * (i ? i.GetGlobalPlayRate() : 1);
      if (this.Kj_ !== undefined) {
        this.Xj_(this.Kj_);
        this.Kj_ = undefined;
      }
      if (this.jD_) {
        this.HD_(this.jD_);
        this.jD_ = undefined;
      }
      if (this.cKe && (this.mKe += 1, this.mKe >= 1)) {
        this.cKe = false;
        this.dKe(this.CKe);
      }
      if (this.DragState || !this.InertiaState && !this.VelocityMoveState) {
        if (this.jWe && (this.jWe = false, this.CurrentRunningElasticTime = 0, !this.CurrentSelectState) && this.nKe === 1) {
          var s = this.Items.length;
          for (let t = 0; t < s; t++) {
            var h = this.Items[t];
            if (h.GetCurrentShowItemIndex() === this.CurrentSelectItemIndex && !h.GetSelectedState()) {
              h.Select();
              this.CurrentSelectState = true;
            }
          }
        }
        this.VelocityMoveState = false;
      } else if (this.VelocityMoveState) {
        this.gKe(t);
      } else if (this.CurrentRunningElasticTime < this.zWe) {
        this.fKe(t);
      } else {
        this.jWe = true;
        this.InertiaState = false;
      }
      if (this._Ke !== this.MovingState() && (this._Ke = this.MovingState(), this._Ke)) {
        this.uKe?.();
      }
    };
    this.Kj_ = undefined;
    this.pKe = t => {
      this.DragState = true;
      this.InertiaState = false;
      this.jWe = false;
      this.VelocityMoveState = false;
      this.WWe = t.GetWorldPointInPlane();
      this.KWe = t.GetWorldPointInPlane();
      var i = this.Items.length;
      for (let t = 0; t < i; t++) {
        this.Items[t].OnControllerDragStart();
      }
      this.uKe?.();
    };
    this.N8i = t => {
      if (t.scrollAxisValue !== 0) {
        this.AttachToNextItem(-t.scrollAxisValue);
      }
    };
    this.mKe = 0;
    this.cKe = false;
    this.CKe = undefined;
    this.vKe = t => {
      this.mKe = 0;
      this.cKe = true;
      var t = (this.CKe = t).GetWorldPointInPlane();
      var i = this.MKe(t) - this.MKe(this.WWe);
      if (i != 0) {
        this.SetMoveTypeOffset(1, i);
        i = this.RecalculateMoveOffset(i);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCommon", 27, "OnpointerDrag", ["result", i]);
        }
        this.EKe(i);
        this.WWe = t;
      }
    };
    this.SKe = i => {
      var s = this.Items.length;
      for (let t = 0; t < s; t++) {
        this.Items[t].OnControllerDragEnd();
      }
      this.DragState = false;
      this.CurrentRunningElasticTime = 0;
      this.eKe = 0;
      this.ZWe = 0;
      if (this.QWe) {
        var i = i.GetWorldPointInPlane();
        let t = 0;
        if (this.KWe) {
          t = (this.MKe(i) - this.MKe(this.KWe)) * this.aKe;
        }
        if (Math.abs(t) < this.tKe) {
          i = this.FindAutoAttachItem();
          this.AttachToIndex(i.GetCurrentShowItemIndex());
        } else if (this.uR1 && Math.abs(t) > this.GetItemGapSize()) {
          i = t > 0 ? -1 : 1;
          this.AttachToNextItem(i);
        } else {
          this.VelocityMoveState = true;
          this.SetMoveTypeOffset(0, t);
          this.XWe = t > 0 ? 1 : -1;
          this.CurrentVelocityRunningTime = 0;
        }
      } else {
        i = this.FindAutoAttachItem();
        this.AttachToIndex(i.GetCurrentShowItemIndex());
      }
    };
    this.ControllerActor = t;
    this.ControllerItem = t.GetComponentByClass(UE.UIItem.StaticClass());
    this.ControllerHeight = this.ControllerItem.Height;
    this.ControllerWidth = this.ControllerItem.Width;
    this.iKe.set(0, 0);
    this.iKe.set(1, 0);
    this.sKe = TickSystem_1.TickSystem.Add(this.Tick, "AutoAttachBaseView", 0, true, undefined, true).Id;
    this.$We = ResourceSystem_1.ResourceSystem.GetLoadedAsset(AutoAttachDefine_1.VELOCITY_CURVE_PATH, UE.CurveFloat);
    this.YWe = ResourceSystem_1.ResourceSystem.GetLoadedAsset(AutoAttachDefine_1.INERTIA_CURVE_PATH, UE.CurveFloat);
    this.BoundaryCurve = ResourceSystem_1.ResourceSystem.GetLoadedAsset(AutoAttachDefine_1.BOUNDARY_CURVE_PATH, UE.CurveFloat);
    this.JWe = ConfigManager_1.ConfigManager.CommonConfig.GetAutoAttachVelocityTime();
    this.zWe = ConfigManager_1.ConfigManager.CommonConfig.GetAutoAttachInertiaTime();
    this._Ke = false;
    this.ControllerItem.GetOwner()?.OnDestroyed.Add(this.v9e);
    this.cW1 = i;
  }
  GetTrueBoundary() {
    return 0;
  }
  SetItemSelectMode(t) {
    this.nKe = t;
  }
  SetPageLimitState(t) {
    this.uR1 = t;
  }
  SetMoveMultiFactor(t) {
    this.aKe = t;
  }
  SetDragBeginCallback(t) {
    this.uKe = t;
  }
  SetAudioEvent(t) {
    this.hKe = t;
  }
  IsVelocityMoveState() {
    return this.VelocityMoveState;
  }
  CreateItems(t, i, s, h = 0) {
    this.EnableDragEvent();
    this.CreateItemFunction = s;
    this.SourceActor = t;
    this.SourceItem = this.SourceActor.GetComponentByClass(UE.UIItem.StaticClass());
    this.Gap = i;
    this.AttachDirection = h;
    this.SourceItemHeight = this.SourceItem.Height;
    this.SourceItemWidth = this.SourceItem.Width;
    this.ShowItemNum = this.yKe();
    this.tKe = this.GetItemGapSize() / 2;
    this.IKe();
  }
  SetMoveBoundary(t) {
    this.MoveBoundary = t;
  }
  GetCurrentMoveDirection() {
    return this.AttachDirection;
  }
  IKe() {
    this.MoveBoundary = this.GetItemSize();
  }
  SetBoundDistance(t) {
    this.MoveBoundary = t;
  }
  GetItemGapSize() {
    return this.GetItemSize() + this.Gap;
  }
  yKe() {
    let t = 0;
    t = this.AttachDirection === 0 ? this.ControllerWidth : this.ControllerHeight;
    var i = this.GetItemGapSize();
    var i = Math.ceil(t / i);
    if (i % 2 == 0) {
      return i - 1;
    } else {
      return i;
    }
  }
  EnableDragEvent() {
    var t;
    if (this.ControllerActor && (t = this.ControllerActor.GetComponentByClass(UE.UIDraggableComponent.StaticClass())) && (t.OnPointerBeginDragCallBack.Bind(t => {
      this.pKe(t);
    }), t.OnPointerDragCallBack.Bind(t => {
      this.vKe(t);
    }), t.OnPointerEndDragCallBack.Bind(t => {
      this.SKe(t);
    }), t.NavigateToPrevDelegate.Bind(() => {
      this.AttachToNextItem(-1);
    }), t.NavigateToNextDelegate.Bind(() => {
      this.AttachToNextItem(1);
    }), this.cW1)) {
      t.OnPointerScrollCallBack.Bind(this.N8i);
    }
  }
  DisableDragEvent() {
    var t;
    if (this.ControllerActor && (t = this.ControllerActor.GetComponentByClass(UE.UIDraggableComponent.StaticClass()))) {
      t.OnPointerBeginDragCallBack.Unbind();
      t.OnPointerDragCallBack.Unbind();
      t.OnPointerEndDragCallBack.Unbind();
      t.NavigateToPrevDelegate.Unbind();
      t.NavigateToNextDelegate.Unbind();
    }
  }
  GetGap() {
    return this.Gap;
  }
  GetItemSize() {
    let t = 0;
    return t = this.AttachDirection === 0 ? this.SourceItemWidth : this.SourceItemHeight;
  }
  GetViewSize() {
    let t = 0;
    return t = this.AttachDirection === 0 ? this.ControllerWidth : this.ControllerHeight;
  }
  gKe(t) {
    var i = this.GetMoveTypeOffset(0);
    var s = i / this.JWe;
    this.CurrentVelocityRunningTime = this.CurrentVelocityRunningTime + t;
    var h = this.CurrentVelocityRunningTime / this.JWe;
    var s = s * this.GetCurveValue(this.$We, h = h > 1 ? 1 : h) * t;
    let e = this.RecalculateMoveOffset(s);
    if (Math.abs(e) < ENDMOVEFLOAT) {
      e = 0;
    }
    s = this.eKe + e;
    if (Math.abs(s) > Math.abs(i)) {
      e = i - this.eKe;
    }
    this.EKe(e);
    this.eKe += e;
    if (this.XWe > 0) {
      if (e <= 0) {
        this.TKe();
      }
    } else if (this.XWe < 0 && e >= 0) {
      this.TKe();
    }
    if (h >= 1) {
      if (Math.abs(this.eKe) < Math.abs(i)) {
        this.CurrentVelocityRunningTime -= t;
      } else {
        this.TKe();
      }
    }
  }
  fKe(t) {
    var i = this.GetMoveTypeOffset(1);
    var s = i / this.zWe;
    this.CurrentRunningElasticTime = this.CurrentRunningElasticTime + t;
    var h = this.CurrentRunningElasticTime / this.zWe;
    let e = s * this.GetCurveValue(this.YWe, h = h > 1 ? 1 : h) * t;
    s = this.ZWe + e;
    if (Math.abs(s) > Math.abs(i)) {
      e = i - this.ZWe;
    }
    this.EKe(e);
    this.ZWe += e;
    if (h >= 1 && Math.abs(this.ZWe) < Math.abs(i)) {
      this.CurrentRunningElasticTime -= t;
    }
  }
  GetCurveValue(t, i) {
    return t.GetFloatValue(i);
  }
  TKe() {
    this.VelocityMoveState = false;
    this.InertiaState = false;
    var t = this.FindAutoAttachItem();
    this.ScrollToItem(t);
  }
  ReloadView(t, i, s = 0) {
    this.DataLength = t;
    this.ReloadItems(t, i, s);
  }
  GetShowItemNum() {
    return this.ShowItemNum;
  }
  GetDataLength() {
    return this.DataLength;
  }
  RefreshItems() {
    var i = this.Items.length;
    for (let t = 0; t < i; t++) {
      this.Items[t].RefreshItem();
    }
  }
  FindNearestMiddleItem() {
    let s = this.Items[0];
    if (s) {
      let i = 0;
      i = Math.abs(this.Items[0].GetCurrentPosition());
      var h = this.Items.length;
      for (let t = 0; t < h; t++) {
        var e;
        if ((e = Math.abs(this.Items[t].GetCurrentPosition())) < i) {
          s = this.Items[t];
          i = e;
        }
      }
      return s;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCommon", 27, "列表没有数据，找不到中间物体");
    }
  }
  GetItems() {
    return this.Items;
  }
  GetShowIndexItem(i) {
    let s = undefined;
    var h = this.Items.length;
    for (let t = 0; t < h; t++) {
      if (this.Items[t].GetCurrentShowItemIndex() === i) {
        s = this.Items[t];
        break;
      }
    }
    return s;
  }
  GetItemByShowIndex(t) {
    for (const i of this.Items) {
      if (i.GetCurrentShowItemIndex() === t) {
        return i;
      }
    }
  }
  ForceUnSelectItems() {
    var i = this.Items.length;
    for (let t = 0; t < i; t++) {
      this.Items[t].ForceUnSelectItem();
    }
    this.CurrentSelectState = false;
  }
  ScrollToItem(t, i = false) {
    var s;
    if (!this.InertiaState || !!i) {
      s = t.GetCurrentPosition();
      this.SetMoveTypeOffset(1, -s);
      this.ForceUnSelectItems();
      this.CurrentSelectItemIndex = t.GetCurrentShowItemIndex();
      if (i) {
        this.jD_ = t;
      } else {
        this.CurrentRunningElasticTime = 0;
        this.InertiaState = true;
      }
    }
  }
  Xj_(t) {
    var i = this.FindNearestMiddleItem();
    if (i) {
      t = t - i.GetCurrentShowItemIndex();
      t = this.GetAutoAttachMoveMinusOffsetDirection() * this.GetItemGapSize() * t + i.GetCurrentPosition();
      this.SetMoveTypeOffset(1, -t);
      i = this.RecalculateMoveOffset(-t);
      this.EKe(i, true);
      this.InertiaState = false;
      this.VelocityMoveState = false;
    }
  }
  HD_(t) {
    t = t.GetCurrentPosition();
    this.SetMoveTypeOffset(1, -t);
    t = this.RecalculateMoveOffset(-t);
    this.EKe(t, true);
    this.InertiaState = false;
    this.VelocityMoveState = false;
  }
  AttachToNextItem(t) {
    var i;
    var t = this.FindNextDirectionItem(t);
    if (!t) {
      if (i = this.FindNearestMiddleItem()) {
        this.AttachToIndex(i.GetCurrentShowItemIndex());
        return;
      } else {
        return undefined;
      }
    }
    this.AttachToIndex(t.GetCurrentShowItemIndex());
  }
  AttachToIndex(t, i = false) {
    if (!this.InertiaState || i) {
      var s = this.GetShowIndexItem(t);
      if (s) {
        this.ScrollToItem(s, i);
      } else {
        this.ForceUnSelectItems();
        this.CurrentSelectItemIndex = t;
        s = this.FindNearestMiddleItem();
        if (!s) {
          return;
        }
        if (i) {
          this.Kj_ = t;
        } else {
          i = t - s.GetCurrentShowItemIndex();
          t = this.GetAutoAttachMoveMinusOffsetDirection() * this.GetItemGapSize() * i - s.GetCurrentPosition();
          this.SetMoveTypeOffset(1, -t);
          this.CurrentRunningElasticTime = 0;
          this.InertiaState = true;
        }
      }
      this.Tick(0);
    }
  }
  GetAutoAttachMoveMinusOffsetDirection() {
    if (this.AttachDirection === 0) {
      return 1;
    } else {
      return -1;
    }
  }
  GetCurrentSelectIndex() {
    return this.CurrentSelectItemIndex;
  }
  GetCurrentSelectItem() {
    return this.Items[this.CurrentSelectItemIndex];
  }
  MovingState() {
    return this.DragState || this.InertiaState;
  }
  dKe(t) {
    this.KWe = t.GetWorldPointInPlane();
  }
  MKe(t) {
    if (this.AttachDirection === 0) {
      return t.X;
    } else {
      return t.Z;
    }
  }
  GetMoveTypeOffset(t) {
    return this.iKe.get(t);
  }
  SetMoveTypeOffset(t, i) {
    this.iKe.set(t, i);
    if (t === 1) {
      this.ZWe = 0;
    }
  }
  EKe(i, s = false) {
    let h = VERYBIGDISTANCE;
    let e = undefined;
    var r = this.Items.length;
    for (let t = 0; t < r; t++) {
      var o = this.Items[t];
      o.MoveItem(i);
      if ((!this.CurrentSelectState && this.nKe === 0 || !!s) && o.GetCurrentShowItemIndex() === this.CurrentSelectItemIndex && !o.GetSelectedState()) {
        o.Select();
        this.CurrentSelectState = true;
      }
      var a = o.GetCurrentMovePercentage();
      var a = Math.abs(a - DISTANCETOMIDDLE);
      if (a < h) {
        h = a;
        e = o.GetItemIndex();
      }
    }
    if (this.lKe !== e) {
      this.lKe = e;
      if (!s) {
        AudioSystem_1.AudioSystem.PostEvent(this.hKe);
      }
    }
  }
  Clear() {
    this.Items.forEach(t => {
      t.Destroy();
    });
    this.Items = [];
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.sKe);
      this.sKe = TickSystem_1.TickSystem.InvalidId;
    }
  }
}
exports.AutoAttachBaseView = AutoAttachBaseView;
//# sourceMappingURL=AutoAttachBaseView.js.map