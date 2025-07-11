"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoAttachExhibitionItem = exports.AutoAttachExhibitionItemAbstract = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class AutoAttachExhibitionItemAbstract extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.CurrentShowItemIndex = 0;
    this.AttachItem = undefined;
    this.CreateThenShowByActor(t);
  }
  SetShowItemIndex(t) {
    this.CurrentShowItemIndex = t;
  }
  GetShowItemIndex() {
    return this.CurrentShowItemIndex;
  }
  OnChangeDirection(t) {}
  RefreshItem(t) {}
  SetData(t) {}
  OnMoveItem(t) {}
  OnUnSelect() {}
  OnSelect() {}
  SetAttachItem(t) {
    this.AttachItem = t;
  }
  GetAttachItem() {
    return this.AttachItem;
  }
  Clear() {}
}
exports.AutoAttachExhibitionItemAbstract = AutoAttachExhibitionItemAbstract;
class AutoAttachExhibitionItem {
  constructor(t, e, i) {
    this.SelectState = false;
    this.CurrentDirection = undefined;
    this.InitGap = 0;
    this.ShowItemNum = 0;
    this.DataLength = 0;
    this.DragState = false;
    this.ExhibitionView = undefined;
    this.kvt = undefined;
    this.ShowItemIndex = 0;
    this.Actor = t.GetComponentByClass(UE.UIItem.StaticClass());
    this.FullSizeX = this.Actor.GetWidth();
    this.FullSizeY = this.Actor.GetHeight();
    this.Index = e;
    this.ShowItemNum = i;
  }
  SetViewItem(t) {
    this.kvt = t;
    this.kvt.SetAttachItem(this);
  }
  SetActive(t) {
    this.Actor.SetUIActive(t);
  }
  Init(t) {
    this.ExhibitionView = t;
    this.CurrentDirection = t.Direction;
    this.DataLength = t.GetDataLength();
    this.OnInit();
    this.SelectState = false;
    this.OnUnSelect();
  }
  ForceUnSelectItem() {
    this.SelectState = false;
    this.OnUnSelect();
  }
  OnInit() {}
  OnControllerDragStart() {
    this.DragState = true;
  }
  MoveItem(t) {
    this.OnMoveItem(t);
    this.kvt.OnMoveItem(t);
  }
  OnMoveItem(t) {}
  OnMoveFromRightToLeft() {
    this.kvt.OnChangeDirection(1);
  }
  OnMoveFromLeftToRight() {
    this.kvt.OnChangeDirection(-1);
  }
  OnMoveFromDownToUp() {
    this.kvt.OnChangeDirection(1);
  }
  OnMoveFromUpToDown() {
    this.kvt.OnChangeDirection(-1);
  }
  RefreshItem() {
    this.kvt.SetShowItemIndex(this.ShowItemIndex);
    this.kvt.RefreshItem(this.ShowItemIndex);
  }
  SetData(t) {
    this.kvt.SetData(t);
  }
  OnControllerDragEnd() {
    this.DragState = false;
  }
  GetItemPositionX() {
    return this.Actor.GetAnchorOffsetX();
  }
  GetItemPositionY() {
    return this.Actor.GetAnchorOffsetY();
  }
  GetSelectState() {
    return this.SelectState;
  }
  Select() {
    if (!this.SelectState) {
      this.SelectState = true;
      this.ExhibitionView.SelectedIndex = this.ShowItemIndex;
      this.OnSelect();
    }
  }
  OnSelect() {
    this.kvt.OnSelect();
  }
  UnSelect() {
    if (this.SelectState) {
      this.SelectState = false;
      this.OnUnSelect();
    }
  }
  OnUnSelect() {
    this.kvt.OnUnSelect();
  }
  Clear() {
    this.kvt.Clear();
  }
}
exports.AutoAttachExhibitionItem = AutoAttachExhibitionItem;
//# sourceMappingURL=AutoAttachExhibitionItem.js.map