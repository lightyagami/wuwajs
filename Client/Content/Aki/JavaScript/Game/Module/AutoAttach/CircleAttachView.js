"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleAttachView = undefined;
const Log_1 = require("../../../Core/Common/Log");
const LguiUtil_1 = require("../Util/LguiUtil");
const AutoAttachBaseView_1 = require("./AutoAttachBaseView");
class CircleAttachView extends AutoAttachBaseView_1.AutoAttachBaseView {
  FindAutoAttachItem() {
    return this.FindNearestMiddleItem();
  }
  RecalculateMoveOffset(t) {
    return t;
  }
  ReloadItems(t, i, e = 0) {
    if (t < this.ShowItemNum) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCommon", 27, "组件数据长度需要大于等于展示长度");
      }
    } else {
      var s;
      var h = this.Items.length;
      for (let t = 0; t < h; t++) {
        this.Items[t].SetUiActive(false);
      }
      for (let t = 0; t < this.ShowItemNum + 1; t++) {
        if (t >= this.Items.length) {
          s = LguiUtil_1.LguiUtil.DuplicateActor(this.SourceActor, this.ControllerItem);
          (s = this.CreateItemFunction(s, t, this.ShowItemNum)).SetSourceView(this);
          this.Items.push(s);
        }
        this.Items[t].SetItemIndex(t);
        this.Items[t].SetUiActive(true);
        this.Items[t].SetData(i);
        this.Items[t].InitItem();
      }
      this.RefreshItems();
      this.ForceUnSelectItems();
      this.AttachToIndex(e, true);
    }
  }
  FindNextDirectionItem(t) {
    var s = this.FindNearestMiddleItem();
    var h = this.GetItems();
    if (h !== undefined && s !== undefined) {
      let i = s;
      var r = s.GetCurrentPosition();
      var o = h.length;
      let e = 99999;
      if (t > 0) {
        for (let t = 0; t < o; t++) {
          var l = h[t].GetCurrentPosition();
          if (r < l && l - r < e) {
            i = h[t];
            e = l - r;
          }
        }
      } else {
        for (let t = 0; t < o; t++) {
          var a = h[t].GetCurrentPosition();
          if (a < r && r - a < e) {
            i = h[t];
            e = r - a;
          }
        }
      }
      return i;
    }
  }
  GetIfCircle() {
    return true;
  }
  MoveToNextItem(i) {
    if (!this.MovingState()) {
      this.ForceUnSelectItems();
      let t = this.GetCurrentSelectIndex() + i;
      if (t < 0) {
        t = this.DataLength - 1;
      } else if (t >= this.DataLength) {
        t = 0;
      }
      this.CurrentSelectItemIndex = t;
      var e = this.GetAutoAttachMoveMinusOffsetDirection() * this.GetItemGapSize();
      this.SetMoveTypeOffset(1, -e * i);
      this.CurrentRunningElasticTime = 0;
      this.InertiaState = true;
      this.Tick(0);
    }
  }
}
exports.CircleAttachView = CircleAttachView;
//# sourceMappingURL=CircleAttachView.js.map