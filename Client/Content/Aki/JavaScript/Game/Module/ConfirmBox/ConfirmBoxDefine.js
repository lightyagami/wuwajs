"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmBoxDataNew = exports.BUTTON_DELAYTIME = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
const LguiUtil_1 = require("../Util/LguiUtil");
exports.BUTTON_DELAYTIME = 1000;
class ConfirmBoxDataNew extends UiPopViewData_1.UiPopViewData {
  constructor(t) {
    super();
    this.IsMultipleView = false;
    this.ConfigId = -1;
    this.CustomResourceId = undefined;
    this.CustomPopType = undefined;
    this.ItemIdMap = new Map();
    this.FunctionMap = new Map();
    this.InteractionMap = new Map();
    this.CanvasLayer = UiLayerType_1.ELayerType.Pop;
    this.CanExecuteCloseFunc = undefined;
    this.Title = "";
    this.BtnTextMap = new Map();
    this.HasToggle = false;
    this.ToggleText = "";
    this.ToggleTextKey = "";
    this.Tip = undefined;
    this.TextArgs = undefined;
    this.TableTxtArgNew = undefined;
    this.CanClickDuringTimer = true;
    this.IsEscViewTriggerCallBack = true;
    this.ShowPowerItem = false;
    this.AttachView = undefined;
    this.dqt = undefined;
    this.Cqt = undefined;
    this.j5e = undefined;
    this.FinishOpenFunction = undefined;
    this.DestroyFunction = undefined;
    this.BeforePlayCloseFunction = undefined;
    this.ConfigId = t;
  }
  SetTitle(t) {
    this.Title = t;
  }
  GetTitle() {
    return this.Title;
  }
  SetBtnText(t, i) {
    this.BtnTextMap.set(t, i);
  }
  GetBtnText(t) {
    if (this.BtnTextMap.has(t)) {
      return this.BtnTextMap.get(t);
    } else {
      return "";
    }
  }
  SetTableTextArgNew(t, ...i) {
    this.TableTxtArgNew = new LguiUtil_1.TableTextArgNew(t, ...i);
  }
  SetTextArgs(...t) {
    this.TextArgs = t;
  }
  SetCloseFunction(t) {
    this.dqt = t;
  }
  GetCloseFunction() {
    return this.dqt;
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  GetToggleFunction() {
    return this.j5e;
  }
  SetAfterShowFunction(t) {
    this.Cqt = t;
  }
  GetAfterShowFunction() {
    return this.Cqt;
  }
  GetContentText() {
    var t = ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetConfirmBoxConfig(this.ConfigId);
    let i = ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetContent(t.Content);
    return i = this.TextArgs ? StringUtils_1.StringUtils.Format(i, ...this.TextArgs) : i;
  }
}
exports.ConfirmBoxDataNew = ConfirmBoxDataNew;
//# sourceMappingURL=ConfirmBoxDefine.js.map