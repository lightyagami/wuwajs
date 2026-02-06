"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksPlayProxy = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
class DrinksPlayProxy {
  constructor() {
    this.MainView = undefined;
  }
  RegisterMainView(e) {
    this.MainView = e;
  }
  UpdateGameStep(e) {
    if (e) {
      this.MainView.OnGameCurrentStepStart();
    } else {
      this.MainView.OnGameCurrentStepEnd();
    }
  }
  OnDrinkBaseSelected(e, i) {
    this.MainView.OnDrinkBaseSelected(e, i);
  }
  OnBatchingSelected(e, i) {
    this.MainView.OnBatchingSelected(e, i);
  }
  OnNoBatchingConfirm() {
    this.MainView.OnNoBatchingConfirm();
  }
  OnOrnamentSelected(e) {
    this.MainView.OnOrnamentSelected(e);
  }
  OnEnterDrinkBaseQTE() {
    this.MainView.OnEnterDrinkBaseQTE();
  }
  OnLevelSequenceBegin() {
    ModelManager_1.ModelManager.DrinksModel.GetSceneController().OnStepSequenceStart();
    this.UpdateRoleRequire();
    this.MainView.UpdateFlavorBubble();
  }
  UpdateRoleRequire() {
    this.MainView.UpdateRoleRequire();
  }
  ActivateDialogBubble(e, i) {
    this.MainView.ActivateDialogBubble(e, i);
  }
  DeactivateDialogBubble() {
    this.MainView.DeactivateDialogBubble();
  }
  SetNeedTick(e) {
    this.MainView.SetNeedTickQTE(e);
    this.MainView.NeedTickQTE = e;
  }
  OnFinishMixing() {
    this.MainView.OnFinishMixing();
  }
  OnFinishMixingEnd() {
    this.MainView.OnFinishMixingEnd();
  }
  BackToPrev(e) {
    return this.MainView.ShowBackMask(e);
  }
  SetShakeCamera(e) {
    this.MainView.SetShakeCamera(e);
  }
  HideClose() {
    this.MainView.HideCaptionClose();
  }
}
exports.DrinksPlayProxy = DrinksPlayProxy;
//# sourceMappingURL=DrinksGamePlayProxy.js.map