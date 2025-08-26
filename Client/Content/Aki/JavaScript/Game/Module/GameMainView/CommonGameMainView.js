"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonGameMainView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
class CommonGameMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.ts1 = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    if (this.OpenParam) {
      this.ts1 = this.OpenParam;
      this.ts1.RegisterView(this);
      await this.ts1.BeforeStartAsync();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 10, "通用主界面需要构建代理类传入参数");
    }
  }
  OnStart() {
    this.ts1?.Start();
  }
  OnBeforeShow() {
    this.ts1?.BeforeShow();
  }
  OnAfterShow() {
    this.ts1?.AfterShow();
  }
  OnBeforeHide() {
    this.ts1?.BeforeHide();
  }
  OnAfterHide() {
    this.ts1?.AfterHide();
  }
  OnAddEventListener() {
    this.ts1?.AddEventListener();
  }
  OnRemoveEventListener() {
    this.ts1?.RemoveEventListener();
  }
  OnTick(e) {
    e *= Time_1.Time.InverseSelfCenteredTimeDilation;
    this.ts1?.Tick(e);
  }
  OnAfterTick(e) {
    e *= Time_1.Time.InverseSelfCenteredTimeDilation;
    this.ts1?.AfterTick(e);
  }
  OnBeforeDestroy() {
    this.ts1?.BeforeDestroy();
  }
  GetContentPanel() {
    return this.GetItem(0);
  }
  SetMaskItemActive(e) {
    this.GetItem(1).SetUIActive(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return this.ts1?.GetGuideUiItemAndUiItemForShowEx(e);
  }
}
exports.CommonGameMainView = CommonGameMainView;
//# sourceMappingURL=CommonGameMainView.js.map