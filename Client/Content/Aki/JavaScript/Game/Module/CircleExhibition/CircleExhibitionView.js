"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleExhibitionView = undefined;
const Log_1 = require("../../../Core/Common/Log");
const LguiUtil_1 = require("../Util/LguiUtil");
const AutoAttachExhibitionView_1 = require("./AutoAttachExhibitionView");
class CircleExhibitionView extends AutoAttachExhibitionView_1.AutoAttachExhibitionView {
  CreateItems(i, t, e, s, h) {
    this.CurrentDirection = h || 0;
    super.CreateItems(i, t, e, s, h);
  }
  ReloadView(i, t) {
    if (i < this.ShowItemNum) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCommon", 27, "组件数据长度需要大于等于展示长度");
      }
    } else {
      this.DataLength = i;
      for (let i = 0; i < this.Items.length; i++) {
        this.Items[i].SetActive(false);
      }
      for (let i = 0; i < this.ShowItemNum + 1; i++) {
        var e;
        if (i >= this.Items.length) {
          e = LguiUtil_1.LguiUtil.DuplicateActor(this.CreateSourceActor, this.ItemActor);
          (e = this.CreateItemFunction(e, i, this.ShowItemNum)).InitGap = this.Gap;
          this.Items.push(e);
        }
        this.Items[i].SetActive(true);
      }
      this.SetData(t);
      this.InitItems();
      this.ForceUnSelectItems();
      this.AttachToIndex(0, 0);
    }
  }
  AttachItem(i) {
    var t = undefined;
    var o = undefined;
    var t = this.FindNearestMiddleItem();
    var o = this.GetItems();
    if (o !== undefined && t !== undefined) {
      let e = t;
      let s = 0;
      s = this.Direction === 0 ? t.GetItemPositionX() : t.GetItemPositionY();
      let h = 99999;
      if (i > 0) {
        for (let t = 0; t < o.length; t++) {
          let i = 0;
          if ((i = this.Direction === 0 ? o[t].GetItemPositionX() : o[t].GetItemPositionY()) > s && i - s < h) {
            e = o[t];
            h = i - s;
          }
        }
      } else {
        for (let t = 0; t < o.length; t++) {
          let i = 0;
          if ((i = this.Direction === 0 ? o[t].GetItemPositionX() : o[t].GetItemPositionY()) < s && s - i < h) {
            e = o[t];
            h = s - i;
          }
        }
      }
      return e;
    }
  }
}
exports.CircleExhibitionView = CircleExhibitionView;
//# sourceMappingURL=CircleExhibitionView.js.map