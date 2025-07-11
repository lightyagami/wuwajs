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
  ReloadItems(t, e, i = 0) {
    if (t < this.ShowItemNum) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCommon", 27, "组件数据长度需要大于等于展示长度");
      }
    } else {
      var s;
      var r = this.Items.length;
      for (let t = 0; t < r; t++) {
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
        this.Items[t].SetData(e);
        this.Items[t].InitItem();
      }
      this.RefreshItems();
      this.ForceUnSelectItems();
      this.AttachToIndex(i, true);
    }
  }
  FindNextDirectionItem(t) {
    var s = this.FindNearestMiddleItem();
    var r = this.GetItems();
    if (r !== undefined && s !== undefined) {
      let e = s;
      var o = s.GetCurrentPosition();
      var h = r.length;
      let i = 99999;
      if (t > 0) {
        for (let t = 0; t < h; t++) {
          var l = r[t].GetCurrentPosition();
          if (o < l && l - o < i) {
            e = r[t];
            i = l - o;
          }
        }
      } else {
        for (let t = 0; t < h; t++) {
          var a = r[t].GetCurrentPosition();
          if (a < o && o - a < i) {
            e = r[t];
            i = o - a;
          }
        }
      }
      return e;
    }
  }
  GetIfCircle() {
    return true;
  }
}
exports.CircleAttachView = CircleAttachView;
//# sourceMappingURL=CircleAttachView.js.map