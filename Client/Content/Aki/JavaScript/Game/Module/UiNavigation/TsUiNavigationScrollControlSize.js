"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsUiNavigationScrollControlSize = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
class TsUiNavigationScrollControlSize extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments);
    this.ScrollViewActor = undefined;
    this.ScrollView = undefined;
    this.SizeController = undefined;
    this.ScrollValue = 0;
    this.ContentItem = undefined;
    this.UseScroll = false;
  }
  Constructor() {
    this.ScrollView = undefined;
    this.SizeController = undefined;
    this.ScrollValue = 0;
    this.ContentItem = undefined;
    this.UseScroll = false;
  }
  AwakeBP() {
    this.SizeController = this.GetOwner()?.GetComponentByClass(UE.UISizeControlByOther.StaticClass());
    if (this.SizeController) {
      this.ScrollView = this.ScrollViewActor.GetComponentByClass(UE.UIScrollViewWithScrollbarComponent.StaticClass());
      this.ContentItem = this.ScrollView.GetContent()?.GetUIItem();
      this.ScrollValue = this.ScrollView.Vertical ? this.ScrollView.RootUIComp.GetHeight() : this.ScrollView.RootUIComp.GetWidth();
      this.SizeController.SetTargetActor(this.ScrollViewActor);
      this.UseScroll = true;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiNavigation", 10, "该组件需要放在有SizeControlByOther的Actor上");
    }
  }
  LateUpdateBP(i) {
    var t = this.ScrollView.Vertical ? this.ContentItem?.GetHeight() ?? 0 : this.ContentItem?.GetWidth() ?? 0;
    if (t <= this.ScrollValue && this.UseScroll) {
      this.UseScroll = false;
      this.SizeController?.SetTargetActor(this.ScrollView.Content);
    } else if (t > this.ScrollValue && !this.UseScroll) {
      this.UseScroll = true;
      this.SizeController?.SetTargetActor(this.ScrollViewActor);
    }
  }
}
exports.TsUiNavigationScrollControlSize = TsUiNavigationScrollControlSize;
exports.default = TsUiNavigationScrollControlSize; //# sourceMappingURL=TsUiNavigationScrollControlSize.js.map