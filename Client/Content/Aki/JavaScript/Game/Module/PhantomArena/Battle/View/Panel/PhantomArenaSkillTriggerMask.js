"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaSkillTriggerMask = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class PhantomArenaSkillTriggerMask extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.x31 = undefined;
    this.ts1 = undefined;
    this.V7c = false;
    this.Htu = () => {
      this.x31?.ReceiveClickData(1);
    };
    this.Ldu = () => {
      this.x31?.ReceiveClickData(0);
    };
  }
  get IsInSkillInteract() {
    return this.V7c;
  }
  set IsInSkillInteract(e) {
    this.V7c = e;
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.Htu], [6, this.Ldu]];
  }
  OnStart() {
    this.ts1.CanvasManager.AddAreaCanvas(this);
  }
  ShowTriggerMask(e) {
    this.GetItem(1)?.SetUIActive(e !== undefined);
    this.SetActive(true);
    this.IsInSkillInteract = true;
  }
  RefreshTips(e, t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "PhantomBattle_1068", t, e, t);
  }
  RefreshSkill(e, t, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t, ...i);
  }
  RefreshCancelBtnActive(e) {
    this.GetButton(6)?.RootUIComp.SetUIActive(!e);
  }
  HideTriggerMask() {
    this.SetActive(false);
    this.IsInSkillInteract = false;
  }
  RegisterViewProxy(e) {
    this.ts1 = e;
  }
  CheckCanvasSortOrder() {
    return true;
  }
  HandleSortOrder() {}
  CancelSortOrder() {}
  ReceiveUiInteract(e) {
    this.x31 = e;
  }
}
exports.PhantomArenaSkillTriggerMask = PhantomArenaSkillTriggerMask;
//# sourceMappingURL=PhantomArenaSkillTriggerMask.js.map