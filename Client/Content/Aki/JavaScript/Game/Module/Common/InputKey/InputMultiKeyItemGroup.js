"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputMultiKeyItemGroup = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InputKeyDefine_1 = require("./InputKeyDefine");
const InputMultiKeyItem_1 = require("./InputMultiKeyItem");
class InputMultiKeyItemGroup extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.vAt = undefined;
    this.MAt = undefined;
    this.vq = false;
    this.EAt = undefined;
    this.XBo = () => {
      if (this.EAt) {
        this.SAt(this.EAt);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.vAt = new InputMultiKeyItem_1.InputMultiKeyItem(false);
    this.MAt = new InputMultiKeyItem_1.InputMultiKeyItem(false);
    await Promise.all([this.vAt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner(), true), this.MAt.CreateThenShowByActorAsync(this.GetItem(2).GetOwner(), true)]);
  }
  OnStart() {}
  OnBeforeDestroy() {
    this.vAt = undefined;
    this.vAt = undefined;
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    if (this.EAt) {
      this.SAt(this.EAt);
    }
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
  }
  Refresh(e) {
    this.EAt = e;
    this.SAt(e);
  }
  SAt(e) {
    var t = e.SingleActionOrAxisKeyItem;
    var i = e.DoubleActionOrAxisKeyItem;
    var e = e.LinkString;
    var s = this.GetText(0);
    this.vAt?.RefreshByActionOrAxis(t);
    this.vAt?.SetActive(true);
    if (i) {
      this.MAt?.RefreshByActionOrAxis(i);
      this.MAt?.SetActive(true);
      s.SetText(e ?? "/");
      s.SetUIActive(true);
    } else {
      this.MAt?.SetActive(false);
      s.SetUIActive(false);
    }
  }
  SetEnable(e, t = false) {
    if (this.vq !== e || !!t) {
      if (e) {
        this.RootItem.SetAlpha(1);
      } else {
        this.RootItem.SetAlpha(InputKeyDefine_1.DISABLE_ALPHA);
      }
      this.vq = e;
    }
  }
}
exports.InputMultiKeyItemGroup = InputMultiKeyItemGroup;
//# sourceMappingURL=InputMultiKeyItemGroup.js.map