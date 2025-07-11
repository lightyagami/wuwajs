"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoAttachExhibitionView = exports.DEFAULT_ATTACH_TIME = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
exports.DEFAULT_ATTACH_TIME = 8;
class AutoAttachExhibitionView {
  constructor(t) {
    this.WWe = undefined;
    this.KWe = undefined;
    this.CurrentDirection = undefined;
    this.CreateSourceActor = undefined;
    this.CreateSourceUiActor = undefined;
    this.Items = new Array();
    this.SelectedIndex = 0;
    this.CreateItemFunction = (t, i, s) => {};
    this.DragState = false;
    this.InertiaState = false;
    this.Distance = 0;
    this.AttachTime = exports.DEFAULT_ATTACH_TIME;
    this.ItemSizeX = 0;
    this.ItemSizeY = 0;
    this.Gap = 0;
    this.ShowItemNum = 0;
    this.DataLength = 0;
    this.CurrentShowItemIndex = 0;
    this.Width = 0;
    this.Height = 0;
    this.byt = 0;
    this.SupportVelocity = true;
    this.CurrentVelocity = 0;
    this.VelocityDirection = 0;
    this.VelocityMoveState = false;
    this.CurrentVelocityTime = 0;
    this.VelocityFactor = 30;
    this.BoundDistance = 0;
    this.DebugMode = false;
    this.CurrentSelectState = false;
    this.qyt = 0;
    this.Gyt = 0;
    this.OnPointerBeginDrag = t => {
      this.DragState = true;
      this.InertiaState = false;
      this.VelocityMoveState = false;
      this.WWe = t.GetWorldPointInPlane();
      this.KWe = t.GetWorldPointInPlane();
      for (let t = 0; t < this.Items.length; t++) {
        this.Items[t].OnControllerDragStart();
      }
    };
    this.OnPointerDrag = t => {
      var i = t.GetWorldPointInPlane();
      this.KWe = t.GetWorldPointInPlane();
      let s = 0;
      if ((s = this.CurrentDirection === 0 ? i.X - this.WWe.X : i.Z - this.WWe.Z) !== 0) {
        this.MoveItems(s);
        this.WWe = i;
      }
    };
    this.OnPointerEndDrag = i => {
      for (let t = 0; t < this.Items.length; t++) {
        this.Items[t].OnControllerDragEnd();
      }
      this.DragState = false;
      this.Gyt = 0;
      if (this.SupportVelocity) {
        var i = i.GetWorldPointInPlane();
        let t = 0;
        t = this.CurrentDirection === 0 ? i.X - this.KWe.X : i.Z - this.KWe.Z;
        if (Math.abs(t) < this.VelocityFactor) {
          i = this.FindAutoAttachItem();
          this.ScrollToIndex(this.AttachTime, i.ShowItemIndex);
        } else {
          this.VelocityMoveState = true;
          this.CurrentVelocity = t;
          this.VelocityDirection = this.CurrentVelocity > 0 ? 1 : -1;
          this.CurrentVelocityTime = 0;
        }
      } else {
        i = this.FindAutoAttachItem();
        this.ScrollToIndex(this.AttachTime, i.ShowItemIndex);
      }
    };
    this.Actor = t;
    this.ItemActor = t.GetComponentByClass(UE.UIItem.StaticClass());
  }
  get Direction() {
    return this.CurrentDirection;
  }
  SetVelocitySupport(t) {
    this.SupportVelocity = t;
  }
  SetVelocityFactor(t) {
    this.VelocityFactor = t;
  }
  SetItemOnSelectTime(t) {
    this.byt = t;
  }
  SetBoundDistance(t) {
    this.BoundDistance = t;
  }
  GetDataLength() {
    return this.DataLength;
  }
  Destroy() {
    if (this.Actor) {
      ActorSystem_1.ActorSystem.Put("AutoAttachExhibitionView.Destroy", this.Actor);
    }
    this.Actor = undefined;
  }
  CreateItems(t, i, s, h, e) {
    this.AddDragEvent();
    this.CreateItemFunction = h;
    this.CreateSourceActor = t;
    this.CreateSourceUiActor = this.CreateSourceActor.GetComponentByClass(UE.UIItem.StaticClass());
    this.ShowItemNum = i;
    this.Nyt();
    this.Gap = s;
  }
  Nyt() {
    this.ItemSizeX = this.CreateSourceUiActor.GetWidth();
    this.ItemSizeY = this.CreateSourceUiActor.GetHeight();
    this.Width = this.ItemActor.GetWidth();
    this.Height = this.ItemActor.GetHeight();
    if (this.CurrentDirection === 0) {
      this.BoundDistance = this.ItemSizeX;
    } else {
      this.BoundDistance = this.ItemSizeY;
    }
  }
  ReloadView(t, i) {}
  DisableDragEvent() {
    var t;
    if (this.Actor && (t = this.Actor.GetComponentByClass(UE.UIDraggableComponent.StaticClass()))) {
      t.OnPointerBeginDragCallBack.Unbind();
      t.OnPointerDragCallBack.Unbind();
      t.OnPointerEndDragCallBack.Unbind();
    }
  }
  AddDragEvent() {
    var t;
    if (this.Actor && (t = this.Actor.GetComponentByClass(UE.UIDraggableComponent.StaticClass()))) {
      t.OnPointerBeginDragCallBack.Bind(t => {
        this.OnPointerBeginDrag(t);
      });
      t.OnPointerDragCallBack.Bind(t => {
        this.OnPointerDrag(t);
      });
      t.OnPointerEndDragCallBack.Bind(t => {
        this.OnPointerEndDrag(t);
      });
    }
  }
  SetData(i) {
    for (let t = 0; t < this.Items.length; t++) {
      this.Items[t].SetData(i);
    }
  }
  InitItems() {
    for (let t = 0; t < this.Items.length; t++) {
      this.Items[t].Init(this);
    }
    this.RefreshItemsView();
  }
  ForceUnSelectItems() {
    for (let t = 0; t < this.Items.length; t++) {
      this.Items[t].ForceUnSelectItem();
    }
    this.CurrentSelectState = false;
  }
  SetAttachTime(t) {
    this.AttachTime = t;
  }
  RefreshItemsView() {
    for (let t = 0; t < this.Items.length; t++) {
      this.Items[t].RefreshItem();
    }
  }
  FindNearestMiddleItem() {
    let h = this.Items[0];
    if (h) {
      let s = 0;
      s = this.CurrentDirection === 0 ? Math.abs(this.Items[0].GetItemPositionX()) : Math.abs(this.Items[0].GetItemPositionY());
      for (let i = 0; i < this.Items.length; i++) {
        let t = 0;
        if ((t = this.CurrentDirection === 0 ? Math.abs(this.Items[i].GetItemPositionX()) : Math.abs(this.Items[i].GetItemPositionY())) < s) {
          h = this.Items[i];
          s = t;
        }
      }
      return h;
    }
  }
  GetItems() {
    return this.Items;
  }
  GetItemByShowIndex(t) {
    for (const i of this.Items) {
      if (i.ShowItemIndex === t) {
        return i;
      }
    }
  }
  ScrollToItem(i, s) {
    if (!this.InertiaState) {
      var h = s;
      let t = 0;
      t = this.CurrentDirection === 0 ? h.GetItemPositionX() : h.GetItemPositionY();
      this.Distance = -t;
      for (let t = 0; t < this.Items.length; t++) {
        this.Items[t].UnSelect();
      }
      this.CurrentSelectState = false;
      this.CurrentShowItemIndex = s.ShowItemIndex;
      if (i === 0) {
        this.MoveItems(-t);
      } else {
        this.Gyt = 0;
        this.qyt = i;
        this.InertiaState = true;
      }
    }
  }
  ScrollToIndex(t, i) {
    this.AttachToIndex(t, i);
  }
  AttachToIndex(t, i) {
    this.Oyt(t, i);
  }
  Oyt(i, s) {
    if (!this.InertiaState) {
      var h = this.GetShowIndexItem(s);
      if (h) {
        this.ScrollToItem(i, h);
      } else {
        for (let t = 0; t < this.Items.length; t++) {
          this.Items[t].UnSelect();
        }
        this.CurrentSelectState = false;
        this.CurrentShowItemIndex = s;
        h = this.FindNearestMiddleItem();
        if (h) {
          s = s - h.ShowItemIndex;
          let t = 0;
          t = this.CurrentDirection === 0 ? (this.ItemSizeX + this.Gap) * s - h.GetItemPositionX() : ((this.ItemSizeY + this.Gap) * s - h.GetItemPositionY()) * -1;
          this.Distance = -t;
          if (i === 0) {
            this.MoveItems(-t);
          } else {
            this.Gyt = 0;
            this.qyt = i;
            this.InertiaState = true;
          }
        }
      }
    }
  }
  Tick(t) {
    if (this.DragState || !this.InertiaState && !this.VelocityMoveState) {
      if (this.InertiaState && (this.InertiaState = false, this.Gyt = 0, !this.CurrentSelectState) && this.byt === 1) {
        for (let t = 0; t < this.Items.length; t++) {
          var i = this.Items[t];
          if (i.ShowItemIndex === this.CurrentShowItemIndex && !i.GetSelectState()) {
            i.Select();
            this.CurrentSelectState = true;
          }
        }
      }
      this.VelocityMoveState = false;
    } else if (this.VelocityMoveState) {
      this.CurrentVelocity = this.ReCalculateOffset(this.CurrentVelocity);
      this.gKe(t);
    } else if (this.Gyt < this.qyt) {
      this.fKe();
    } else {
      this.InertiaState = false;
    }
  }
  gKe(t) {
    this.CurrentVelocityTime = this.CurrentVelocityTime + t / 100;
    if (this.VelocityDirection > 0) {
      this.MoveItems(this.CurrentVelocity);
      this.CurrentVelocity -= this.VelocityFactor * this.CurrentVelocityTime;
      if (this.CurrentVelocity <= 0) {
        this.EndVelocityMove();
      }
    } else if (this.VelocityDirection < 0 && (this.MoveItems(this.CurrentVelocity), this.CurrentVelocity += this.VelocityFactor * this.CurrentVelocityTime, this.CurrentVelocity >= 0)) {
      this.EndVelocityMove();
    }
  }
  ReCalculateOffset(t) {
    return t;
  }
  EndVelocityMove() {
    this.VelocityMoveState = false;
    this.InertiaState = false;
    var t = this.FindAutoAttachItem();
    this.ScrollToIndex(this.AttachTime, t.ShowItemIndex);
  }
  fKe() {
    this.MoveItems(this.Distance / this.qyt);
    this.Gyt++;
  }
  MoveItems(i) {
    for (let t = 0; t < this.Items.length; t++) {
      var s = this.Items[t];
      s.MoveItem(i);
      if (this.DebugMode && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCommon", 27, "Test");
      }
      if (!this.CurrentSelectState && this.byt === 0 && s.ShowItemIndex === this.CurrentShowItemIndex && !s.GetSelectState()) {
        s.Select();
        this.CurrentSelectState = true;
      }
    }
  }
  MovingState() {
    return this.DragState || this.InertiaState;
  }
  GetShowIndexItem(i) {
    let s = undefined;
    for (let t = 0; t < this.Items.length; t++) {
      if (this.Items[t].ShowItemIndex === i) {
        s = this.Items[t];
        break;
      }
    }
    return s;
  }
  AttachItem(t) {}
  FindAutoAttachItem() {
    return this.FindNearestMiddleItem();
  }
  GetWidth() {
    return this.Width;
  }
  GetHeight() {
    return this.Height;
  }
  Clear() {
    for (let t = 0; t < this.Items.length; t++) {
      this.Items[t].Clear();
    }
  }
}
exports.AutoAttachExhibitionView = AutoAttachExhibitionView;
//# sourceMappingURL=AutoAttachExhibitionView.js.map