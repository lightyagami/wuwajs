"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaSkillTriggerMask = void 0;
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class PhantomArenaSkillTriggerMask extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.e31 = void 0, this.Bn1 = void 0, this.xuu = !1, this.Ieu = () => {
      this.e31?.ReceiveClickData(1)
    }, this.nau = () => {
      this.e31?.ReceiveClickData(0)
    }
  }
  get IsInSkillInteract() {
    return this.xuu
  }
  set IsInSkillInteract(e) {
    this.xuu = e, ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty()
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [0, this.Ieu],
      [6, this.nau]
    ]
  }
  OnStart() {
    this.Bn1.CanvasManager.AddAreaCanvas(this)
  }
  ShowTriggerMask(e) {
    this.GetItem(1)?.SetUIActive(void 0 !== e), this.SetActive(!0), this.IsInSkillInteract = !0
  }
  RefreshTips(e, t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "PhantomBattle_1068", t, e, t)
  }
  RefreshSkill(e, t, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t, ...i)
  }
  HideTriggerMask() {
    this.SetActive(!1), this.IsInSkillInteract = !1
  }
  RegisterViewProxy(e) {
    this.Bn1 = e
  }
  CheckCanvasSortOrder() {
    return !0
  }
  HandleSortOrder() {}
  CancelSortOrder() {}
  ReceiveUiInteract(e) {
    this.e31 = e
  }
}
exports.PhantomArenaSkillTriggerMask = PhantomArenaSkillTriggerMask;
//# sourceMappingURL=PhantomArenaSkillTriggerMask.js.map