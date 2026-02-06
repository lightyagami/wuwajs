"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPreviewView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const TotalTopUpDefine_1 = require("../TotalTopUpDefine");
class TotalTopUpPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.z9a = undefined;
    this.Vgt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e;
    var i;
    var t;
    var o;
    var s = this.OpenParam;
    if (s && s.RewardConfig) {
      e = [];
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
      this.lqe.SetCloseCallBack(this.Vgt);
      this.lqe.SetHelpBtnActive(false);
      if ((t = (i = s.RewardConfig).PreviewContentId) && t !== "") {
        if (o = TotalTopUpDefine_1.TotalTopUpUtil.GetPreviewSubViewConstructor(i.PreviewFunction)) {
          this.z9a = new o();
          o = this.z9a.CreateByResourceIdAsync(t, this.GetItem(1));
          e.push(o);
          await Promise.all(e);
          this.z9a.SetUiActive(true);
          this.z9a.ShowPreview(s);
        } else {
          TotalTopUpDefine_1.TotalTopUpUtil.Error("未找到奖励预览子界面构造函数", ["Function", i.PreviewFunction]);
        }
      } else {
        TotalTopUpDefine_1.TotalTopUpUtil.Error("奖励预览内容路径为空");
      }
    }
  }
}
exports.TotalTopUpPreviewView = TotalTopUpPreviewView;
//# sourceMappingURL=TotalTopUpPreviewView.js.map