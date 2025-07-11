"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchConfirmBoxView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const FloroRanchConfirmBoxContentPanel_1 = require("./FloroRanchConfirmBoxContentPanel");
class FloroRanchConfirmBoxView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lbu = undefined;
    this.Lo = undefined;
    this._bu = undefined;
    this.ubu = () => {
      this.CloseMe();
    };
    this.oPn = i => {
      this.CloseMe(i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIText]];
    this.BtnBindInfo = [[2, this.ubu], [0, this.ubu]];
  }
  async OnBeforeStartAsync() {
    var i = this.OpenParam;
    this.lbu = i;
    this.Lo = ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetConfirmBoxConfig(i.ConfigId);
    var t = StringUtils_1.StringUtils.IsBlank(i.GetTitle()) ? ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetTitle(this.Lo.Title) : i.GetTitle();
    this.GetText(4).SetText(t);
    this._bu = new FloroRanchConfirmBoxContentPanel_1.FloroRanchConfirmBoxContentPanel(i, this.oPn);
    var t = this.GetItem(1);
    await this._bu.CreateThenShowByResourceIdAsync("UiItem_PastureTipsInfo", t);
  }
  OnStart() {
    var i = this.OpenParam.AttachView?.GetRootItem();
    if (i) {
      this.ChildPopView.GetPopViewOriginalActor().GetComponentByClass(UE.UIItem.StaticClass()).SetUIParent(i);
    }
  }
  OnBeforeShow() {
    this.ChildPopView?.SetBackBtnShowState(this.Lo.NeedClose);
    this.ChildPopView?.PopItem.SetMaskResponsibleState(this.Lo.NeedMaskClose);
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(this._bu.OnClose);
  }
  OnAfterShow() {
    this.lbu.GetAfterShowFunction()?.();
  }
  OnBeforeHide() {
    if (this.LastHide) {
      this.lbu?.BeforePlayCloseFunction?.();
    }
  }
  OnGetTimeDilation() {
    var i = this.OpenParam;
    return ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetConfirmBoxConfig(i.ConfigId).TimeDilation;
  }
}
exports.FloroRanchConfirmBoxView = FloroRanchConfirmBoxView;
//# sourceMappingURL=FloroRanchConfirmBoxView.js.map