"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleExhibitionItem = undefined;
const UE = require("ue");
const AutoAttachExhibitionItem_1 = require("./AutoAttachExhibitionItem");
class CircleExhibitionItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItem {
  constructor() {
    super(...arguments);
    this.MoveCircleState = false;
  }
  OnInit() {
    this.PKe();
    this.kyt();
  }
  kyt() {
    if (this.Index < this.DataLength) {
      this.ShowItemIndex = this.Index;
    } else {
      this.ShowItemIndex = this.Index - this.ShowItemNum;
    }
  }
  PKe() {
    var t;
    var i;
    if (this.ExhibitionView) {
      t = Math.floor(this.ShowItemNum / 2);
      if (this.CurrentDirection === 0) {
        i = 0;
        i = (this.Index - t) * (this.FullSizeX + this.InitGap);
        this.Actor.SetAnchorOffset(new UE.Vector2D(i, 0));
      } else {
        i = 0;
        i = (this.Index - t) * (this.FullSizeY + this.InitGap);
        this.Actor.SetAnchorOffset(new UE.Vector2D(0, i));
      }
    }
  }
  OnMoveItem(t) {
    let i = 0;
    this.MoveCircleState = false;
    if (this.CurrentDirection === 0) {
      i = this.Actor.GetAnchorOffsetX() + t;
      this.Fyt(i);
    } else {
      i = this.Actor.GetAnchorOffsetY() + t;
      this.Vyt(i);
    }
  }
  Fyt(t) {
    let i = t;
    if (this.Hyt(i)) {
      if (!this.jyt(i)) {
        while (!this.jyt(i)) {
          i += (this.FullSizeX + this.InitGap) * Math.ceil(this.ShowItemNum + 1);
        }
        for (this.ShowItemIndex = this.ShowItemIndex + (this.ShowItemNum + 1); this.ShowItemIndex >= this.DataLength;) {
          this.ShowItemIndex = this.ShowItemIndex - this.DataLength;
        }
        this.RefreshItem();
        this.OnMoveFromLeftToRight();
        this.MoveCircleState = true;
      }
    } else {
      while (!this.Hyt(i)) {
        i -= (this.FullSizeX + this.InitGap) * Math.ceil(this.ShowItemNum + 1);
      }
      for (this.ShowItemIndex = this.ShowItemIndex - (this.ShowItemNum + 1); this.ShowItemIndex < 0;) {
        this.ShowItemIndex = this.DataLength + this.ShowItemIndex;
      }
      this.RefreshItem();
      this.OnMoveFromRightToLeft();
      this.MoveCircleState = true;
    }
    this.Actor.SetAnchorOffsetX(i);
  }
  Vyt(t) {
    let i = t;
    if (this.Wyt(i)) {
      if (!this.Kyt(i)) {
        while (!this.Kyt(i)) {
          i += (this.FullSizeY + this.InitGap) * Math.ceil(this.ShowItemNum + 1);
        }
        for (this.ShowItemIndex = this.ShowItemIndex + (this.ShowItemNum + 1); this.ShowItemIndex >= this.DataLength;) {
          this.ShowItemIndex = this.ShowItemIndex - this.DataLength;
        }
        this.RefreshItem();
        this.OnMoveFromDownToUp();
        this.MoveCircleState = true;
      }
    } else {
      while (!this.Wyt(i)) {
        i -= (this.FullSizeY + this.InitGap) * Math.ceil(this.ShowItemNum + 1);
      }
      for (this.ShowItemIndex = this.ShowItemIndex - (this.ShowItemNum + 1); this.ShowItemIndex < 0;) {
        this.ShowItemIndex = this.DataLength + this.ShowItemIndex;
      }
      this.RefreshItem();
      this.OnMoveFromUpToDown();
      this.MoveCircleState = true;
    }
    this.Actor.SetAnchorOffsetY(i);
  }
  Hyt(t) {
    return !((this.FullSizeX + this.InitGap) * Math.ceil((this.ShowItemNum + 1) / 2) < t);
  }
  jyt(t) {
    return !(t < -(this.FullSizeX + this.InitGap) * Math.ceil(this.ShowItemNum / 2));
  }
  Wyt(t) {
    return !((this.FullSizeY + this.InitGap) * Math.ceil((this.ShowItemNum + 1) / 2) < t);
  }
  Kyt(t) {
    return !(t < -(this.FullSizeY + this.InitGap) * Math.ceil(this.ShowItemNum / 2));
  }
}
exports.CircleExhibitionItem = CircleExhibitionItem;
//# sourceMappingURL=CircleExhibitionItem.js.map