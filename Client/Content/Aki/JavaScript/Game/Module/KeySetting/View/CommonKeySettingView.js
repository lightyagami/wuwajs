"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonKeySettingView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const CommonKeySettingPanel_1 = require("./CommonKeySettingPanel");
class CommonKeySettingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = undefined;
    this.Owi = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.Qyi.SetCloseCallBack(() => {
      this.CloseMe();
    });
    var e = this.OpenParam ?? 0;
    this.Owi = new CommonKeySettingPanel_1.CommonKeySettingPanel(e);
    var e = [];
    var t = this.GetItem(0);
    e.push(this.Qyi.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(1);
    e.push(this.Owi.CreateThenShowByResourceIdAsync("UiItem_HandleSet", t));
    await Promise.all(e);
  }
}
exports.CommonKeySettingView = CommonKeySettingView;
//# sourceMappingURL=CommonKeySettingView.js.map