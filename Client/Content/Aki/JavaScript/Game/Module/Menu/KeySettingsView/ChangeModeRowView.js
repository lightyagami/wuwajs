"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeModeRowView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ChangeModeRowView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ChangeKeyModeRowData = undefined;
    this.fPi = undefined;
    this.sui = i => {
      if (this.ChangeKeyModeRowData && i === 1 && this.fPi) {
        this.fPi(this);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText]];
  }
  OnStart() {
    this.GetExtendToggle(0)?.OnStateChange.Add(this.sui);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(0)?.OnStateChange.Clear();
    this.fPi = undefined;
    this.ChangeKeyModeRowData = undefined;
  }
  Refresh(i) {
    this.ChangeKeyModeRowData = i;
    this.$ea();
    this.ufo();
  }
  $ea() {
    var i;
    if (this.ChangeKeyModeRowData) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(this.ChangeKeyModeRowData.SpriteResourceId);
      this.SetSpriteByPath(i, this.GetSprite(1), false);
    }
  }
  ufo() {
    var i;
    var e;
    if (this.ChangeKeyModeRowData) {
      i = this.GetText(2);
      e = this.GetText(3);
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, this.ChangeKeyModeRowData.DescriptionA, this.ChangeKeyModeRowData.DescriptionParametersA);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, this.ChangeKeyModeRowData.DescriptionB, this.ChangeKeyModeRowData.DescriptionParametersB);
    }
  }
  BindOnSelected(i) {
    this.fPi = i;
  }
  SetSelected(i) {
    if (i) {
      this.GetExtendToggle(0)?.SetToggleState(1, false);
    } else {
      this.GetExtendToggle(0)?.SetToggleState(0, false);
    }
  }
}
exports.ChangeModeRowView = ChangeModeRowView;
//# sourceMappingURL=ChangeModeRowView.js.map