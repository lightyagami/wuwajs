"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoCircleExhibitionView = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const LguiUtil_1 = require("../Util/LguiUtil");
const AutoAttachExhibitionView_1 = require("./AutoAttachExhibitionView");
const FLOATDURABLENUM = 0.01;
class NoCircleExhibitionView extends AutoAttachExhibitionView_1.AutoAttachExhibitionView {
  CreateItems(t, i, e, s, h) {
    this.CurrentDirection = h || 0;
    super.CreateItems(t, i, e, s, h);
  }
  ReloadView(t, i) {
    var e;
    var s = (this.DataLength = t) > this.ShowItemNum ? this.ShowItemNum + 1 : t;
    for (let t = 0; t < this.Items.length; t++) {
      this.Items[t].SetActive(false);
    }
    for (let t = 0; t < s; t++) {
      if (t >= this.Items.length) {
        e = LguiUtil_1.LguiUtil.DuplicateActor(this.CreateSourceActor, this.ItemActor);
        (e = this.CreateItemFunction(e, t, this.ShowItemNum)).InitGap = this.Gap;
        this.Items.push(e);
      }
      this.Items[t].SetActive(true);
    }
    this.SetData(i);
    this.InitItems();
    this.ForceUnSelectItems();
    this.AttachToIndex(0, 0);
  }
  MoveItems(t) {
    if (t === 0) {
      this.Qyt();
    } else {
      var i = this.ReCalculateOffset(t);
      if (Math.abs(i) === 0 && this.VelocityMoveState) {
        this.CurrentVelocity = 0;
      } else if (this.Xyt(i)) {
        for (let t = 0; t < this.Items.length; t++) {
          var e = this.Items[t];
          e.MoveItem(i);
          var s = e.ShowItemIndex >= 0 && e.ShowItemIndex < this.DataLength;
          e.SetActive(s);
          if (e.ShowItemIndex === this.CurrentShowItemIndex && !e.GetSelectState() && s) {
            e.Select();
            this.CurrentSelectState = true;
          }
        }
      }
    }
  }
  Qyt() {
    if (!this.CurrentSelectState) {
      for (let t = 0; t < this.Items.length; t++) {
        var i = this.Items[t];
        var e = i.ShowItemIndex >= 0 && i.ShowItemIndex < this.DataLength;
        if (i.ShowItemIndex === this.CurrentShowItemIndex && !i.GetSelectState() && e) {
          i.Select();
          this.CurrentSelectState = true;
        }
      }
    }
  }
  ReCalculateOffset(t) {
    return this.VKe(t);
  }
  VKe(t) {
    let i = t > 0 ? 0 : this.DataLength - 1;
    if (this.CurrentDirection !== 0) {
      i = t > 0 ? this.DataLength - 1 : 0;
    }
    var e = this.GetShowIndexItem(i);
    if (!e) {
      return t;
    }
    let s = e.GetItemPositionX();
    if (this.CurrentDirection !== 0) {
      s = e.GetItemPositionY();
    }
    let h = (s = -FLOATDURABLENUM < s && s < FLOATDURABLENUM ? 0 : s) + t;
    if (this.CurrentDirection !== 0) {
      h = s - t;
    }
    if (t > 0) {
      if (h < 0) {
        return t;
      }
    } else if (h > 0) {
      return t;
    }
    return this.KKe(t, s);
  }
  KKe(t, i) {
    let e = 0;
    let s = 0;
    if (t > 0) {
      if (i < 0) {
        s = 0 - i;
      }
    } else if (i > 0) {
      s = 0 - i;
    }
    var h = t - (e = 0 + s);
    var r = this.QKe(t, i);
    var h = e + h * r;
    var r = i + h;
    return e = t > 0 ? r >= this.BoundDistance ? s > 0 ? s + this.BoundDistance : this.BoundDistance - i : h : r <= this.BoundDistance * -1 ? s < 0 ? s + this.BoundDistance * -1 : (this.BoundDistance + i) * -1 : h;
  }
  QKe(t, i) {
    if (this.BoundDistance <= 0) {
      return 0;
    }
    let e = 1;
    e = (e = t > 0 && i >= 0 || t < 0 && i <= 0 ? Math.abs(i) / this.BoundDistance : e) > 1 ? 1 : e;
    return MathUtils_1.MathUtils.Lerp(1, 0, e);
  }
  FindAutoAttachItem() {
    return this.kKe();
  }
  kKe() {
    let e = undefined;
    let s = 10000000;
    for (let i = 0; i < this.Items.length; i++) {
      let t = 0;
      t = this.CurrentDirection === 0 ? Math.abs(this.Items[i].GetItemPositionX()) : Math.abs(this.Items[i].GetItemPositionY());
      var h = this.Items[i].ShowItemIndex >= 0 && this.Items[i].ShowItemIndex < this.DataLength;
      if (t < s && h) {
        e = this.Items[i];
        s = t;
      }
    }
    if (e === undefined) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCommon", 27, "找不到可附着物体，拿第一个做保底");
      }
      e = this.Items[0];
    }
    return e;
  }
  AttachItem(t) {
    let i = 0;
    var e = this.FindNearestMiddleItem().ShowItemIndex;
    i = t > 0 ? e + t < this.DataLength ? e + t : this.DataLength - 1 : e + t > 0 ? e + t : 0;
    return this.GetShowIndexItem(i);
  }
  Xyt(t) {
    if (this.CurrentDirection === 0) {
      return this.$yt(t);
    } else {
      return this.Yyt(t);
    }
  }
  $yt(i) {
    let e = undefined;
    for (let t = 0; t < this.Items.length - 1; t++) {
      if (this.Items[t].ShowItemIndex === 0) {
        e = this.Items[t];
        break;
      }
    }
    if (e && i > 0) {
      var t = e.GetItemPositionX() + i;
      if ((this.ItemSizeX + this.Gap) * Math.ceil((this.ShowItemNum + 1) / 2) < t) {
        return false;
      }
    } else if (i < 0) {
      for (let t = 0; t < this.Items.length; t++) {
        if (this.Items[t].ShowItemIndex === this.DataLength - 1) {
          if (this.Items[t].GetItemPositionX() + i < -(this.ItemSizeX + this.Gap) * Math.ceil(this.ShowItemNum / 2)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  Yyt(t) {
    return true;
  }
}
exports.NoCircleExhibitionView = NoCircleExhibitionView;
//# sourceMappingURL=NoCircleExhibitionView.js.map