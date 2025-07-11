"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageToggleBase = exports.LanguageSettingViewBase = undefined;
const UE = require("ue");
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../../Core/Common/Log");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const LanguageUpdateManager_1 = require("../../../../Launcher/Update/LanguageUpdateManager");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const MenuController_1 = require("../MenuController");
const MenuTool_1 = require("../MenuTool");
class LanguageSettingViewBase extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.MenuDataIns = undefined;
    this.CancelButton = undefined;
    this.ConfirmButton = undefined;
    this.ScrollView = undefined;
    this.SelectedToggle = undefined;
    this.lBi = undefined;
    this.IsConfirm = false;
    this.eNt = () => {
      this.CloseMe();
    };
    this._Bi = () => {
      this.IsConfirm = true;
      this.eNt();
    };
    this.DoSelected = (e, t) => {
      if (this.SelectedToggle !== e && t === 1) {
        this.SelectedToggle?.UnSelect();
      }
      this.SelectedToggle = e;
      this.OnSelected(this.SelectedToggle, t);
    };
    this.DoRefreshScrollView = (e, t) => {
      var i = GameSettingsManager_1.GameSettingsManager.GetAudioCodeById(e);
      var i = LanguageUpdateManager_1.LanguageUpdateManager.GetUpdater(i);
      var i = i?.LanguageCode === LanguageSystem_1.LanguageSystem.PackageAudio && i.Status === 2;
      var t = this.CreateToggle(t, e, i);
      if (t) {
        if (i) {
          this.SelectedToggle = t;
        } else {
          t.UnSelect();
        }
        t.SetSelectedCallBack(this.DoSelected);
        this.OnRefreshView(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent]];
  }
  OnStart() {
    this.lBi = this.OpenParam;
    this.MenuDataIns = this.lBi[0];
    if (this.lBi && this.lBi[1]) {
      LanguageSettingViewBase.xw1 = this.lBi[1];
    }
    this.CancelButton = new ButtonItem_1.ButtonItem(this.GetItem(1));
    this.ConfirmButton = new ButtonItem_1.ButtonItem(this.GetItem(2));
    this.CancelButton.SetFunction(this.eNt);
    this.ConfirmButton.SetFunction(this._Bi);
    this.ScrollView = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(3), this.DoRefreshScrollView);
    this.InitScrollViewData();
    var e = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, this.MenuDataIns.FunctionName ?? "");
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {
      this.eNt();
    });
  }
  InitScrollViewData() {
    var e = [];
    for (const t of MenuTool_1.MenuTool.GetLanguageDefineData()) {
      e.push(t.LanguageType);
    }
    this.ScrollView.RefreshByData(e.sort((e, t) => e - t));
  }
  OnAfterHide() {
    var e = MenuController_1.MenuController.GetTargetConfig(this.MenuDataIns.FunctionId);
    if (this.IsConfirm && this.SelectedToggle.GetIndex() !== e && this.lBi && this.lBi[0] !== undefined && LanguageSettingViewBase.xw1 !== undefined) {
      LanguageSettingViewBase.xw1(this.lBi[0].FunctionId, this.SelectedToggle.GetIndex());
    }
    this.IsConfirm = false;
  }
  OnBeforeDestroyImplement() {
    if (this.ScrollView) {
      this.ScrollView.ClearChildren();
      this.ScrollView = undefined;
    }
  }
  CreateToggle(e, t, i) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Menu", 64, "必须重写CreateToggle");
    }
  }
  OnRefreshView(e) {
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.MenuDataIns.FunctionName ?? "");
  }
  OnSelected(e, t) {}
}
(exports.LanguageSettingViewBase = LanguageSettingViewBase).xw1 = undefined;
LanguageSettingViewBase.BackToPrevLangSettingViewName = undefined;
class LanguageToggleBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.ProgressBuilder = new StringBuilder_1.StringBuilder();
    this.Index = 0;
    this.PreToggled = false;
    this.SelectedCallBack = undefined;
    this.MainText = undefined;
    this.uBi = e => {
      this.SelectedCallBack?.(this, e);
      this.OnSelected();
    };
  }
  Initialize(e, t, i) {
    this.Index = t;
    this.PreToggled = i;
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.uBi]];
  }
  OnStart() {
    if (this.PreToggled) {
      this.GetExtendToggle(0).SetToggleState(1, false);
    }
    this.MainText = this.GetText(1);
  }
  OnBeforeDestroyImplement() {
    this.GetExtendToggle(0).CanExecuteChange.Unbind();
    this.ProgressBuilder.Clear();
  }
  SetSelectedCallBack(e) {
    this.SelectedCallBack = e;
  }
  SetMainText(e) {
    this.MainText.ShowTextNew(e);
  }
  GetMainText() {
    return this.MainText.text;
  }
  GetIndex() {
    return this.Index;
  }
  UnSelect() {
    this.GetExtendToggle(0).SetToggleState(0, false);
    this.OnUnSelected();
  }
  OnSelected() {}
  OnUnSelected() {}
}
exports.LanguageToggleBase = LanguageToggleBase;
//# sourceMappingURL=LanguageSettingViewBase.js.map