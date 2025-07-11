"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spring25DialogueView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivitySpring25Controller_1 = require("../Controller/ActivitySpring25Controller");
const Spring25Define_1 = require("../Spring25Define");
class Spring25DialogueView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lGe = undefined;
    this.L8e = undefined;
    this.YGl = undefined;
    this.zGl = () => {
      ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleConfirmClickInDialogueView();
    };
    this.eFl = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Spring25", 64, "对话事件触发", ["passData", e]);
      }
      var i = this.OpenParam;
      var e = Spring25Define_1.spring25DialogIndex.get(e);
      if (e !== undefined && !(e >= i.ChatDataList.length)) {
        ((i = i.ChatDataList[e]).Position === 0 ? (this.L8e.RefreshText(i.ContentTextId), this.L8e) : (this.YGl.RefreshText(i.ContentTextId), this.YGl)).RefreshAnim(i.SpineAnimName);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    if (e.IsOpening) {
      this.UiViewSequence.StartSequenceName = "Start02";
    }
    this.lGe = new ButtonItem_1.ButtonItem(this.GetItem(0));
    this.lGe.SetFunction(this.zGl);
    this.lGe.SetLocalTextNew(Spring25Define_1.BUTTON_TEXT_ID_IN_DIALOG);
    this.L8e = new RoleItem();
    await this.L8e.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.YGl = new RoleItem();
    await this.YGl.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    await Promise.all([this.L8e.RefreshExternalByDataAsync(e.LeftSpineData), this.YGl.RefreshExternalByDataAsync(e.RightSpineData)]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.eFl);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.eFl);
  }
}
exports.Spring25DialogueView = Spring25DialogueView;
class RoleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.SpineSkeletonAnimationComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.SpineSkeletonAnimationComponent]];
  }
  async RefreshExternalByDataAsync(e) {
    if (e.AtlasPath !== undefined && e.SkeletonDataPath !== undefined) {
      await this.SetSpineAssetByPath(e.AtlasPath, e.SkeletonDataPath, this.GetSpine(0));
      this.GetSpine(0).SetAnimation(0, "idle", true);
      this.GetText(2)?.SetText("");
    }
  }
  RefreshText(e) {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), e);
  }
  RefreshAnim(e) {
    this.GetSpine(0).SetAnimation(0, e, true);
  }
}
//# sourceMappingURL=Spring25DialogueView.js.map