"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiPopFrameView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiLayer_1 = require("../UiLayer");
const UiPopFrameViewStorage_1 = require("../UiPopFrameViewStorage");
const UiPanelBase_1 = require("./UiPanelBase");
const UiSequencePlayer_1 = require("./UiSequencePlayer");
class UiPopFrameView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.PopItem = undefined;
    this.our = undefined;
    this.$pt = undefined;
    this.our = e;
  }
  OnBeforeCreate() {
    var e = UiPopFrameViewStorage_1.UiPopFrameViewStorage.GetUiBehaviourPopInfo(this.our.CommonPopBg);
    var i = e[0];
    this.PopItem = new e[1]();
    this.SetRootActorLoadInfo(i, UiLayer_1.UiLayer.GetLayerRootUiItem(this.our.Type), false);
  }
  async OnBeforeHideAsync() {
    var e = new CustomPromise_1.CustomPromise();
    await this.$pt.PlaySequenceAsync("Close", e, true);
  }
  async OnBeforeStartAsync() {
    await this.PopItem.OnlyCreateByActorAsync(this.GetOriginalActor());
    this.PopItem.SetViewInfo(this.our);
    var e = this.Parent.GetOriginalActor().GetComponentByClass(UE.UIItem.StaticClass());
    this.PopItem.AttachItem(e, this.Parent.GetRootItem());
    this.PopItem.SetPopupViewBase();
    this.AddChild(this.PopItem);
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
  }
  async OnShowAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    const i = new CustomPromise_1.CustomPromise();
    this.$pt.PlaySequenceAsync("Start", e).finally(() => {
      i.SetResult(true);
    });
    await i.Promise;
  }
  OnBeforeShow() {}
  OnAutoDestroy() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCommon", 10, "UiPopFrameView执行自动销毁");
    }
    this.$pt.Clear();
  }
  SetCloseBtnInteractive(e) {
    this.PopItem.SetCloseBtnInteractive(e);
  }
  SetTitleByTextIdAndArg(e, ...i) {
    this.PopItem.SetTitleByTextIdAndArg(e, i);
  }
  SetBackBtnShowState(e) {
    this.PopItem.SetBackBtnShowState(e);
  }
  GetPopViewRootActor() {
    return this.GetRootActor();
  }
  GetPopViewRootItem() {
    return this.GetRootItem();
  }
  GetPopViewOriginalActor() {
    return this.GetOriginalActor();
  }
  HidePopView() {
    this.Hide();
  }
  ShowPopView() {
    this.Show();
  }
  SetViewPermanent() {
    LguiUtil_1.LguiUtil.SetActorIsPermanent(this.GetOriginalActor(), true, true);
  }
  PlayLevelSequenceByName(e, i = false) {
    this.$pt.PlaySequence(e, i);
  }
  async PlaySequenceAsync(e, i, t = false, s = false) {
    await this.$pt.PlaySequenceAsync(e, i, t, s);
  }
}
exports.UiPopFrameView = UiPopFrameView;
//# sourceMappingURL=UiPopFrameView.js.map