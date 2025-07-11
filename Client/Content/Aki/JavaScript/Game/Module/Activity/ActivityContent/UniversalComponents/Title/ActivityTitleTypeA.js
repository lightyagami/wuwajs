"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTitleTypeA = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityTitleTypeA extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UISprite]];
  }
  OnStart() {
    this.SetSubTitleVisible(false);
  }
  SetTitleByTextId(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, t);
  }
  SetTitleByText(e) {
    this.GetText(0).SetText(e);
  }
  SetTimeTextByText(e) {
    var t = this.GetText(1);
    if (t) {
      t.SetText(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 37, "[活动][DEBUG] SetTimeTextByText.Text不存在");
    }
  }
  SetTimeTextVisible(e) {
    var t = this.GetText(1);
    if (t) {
      t.SetUIActive(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 37, "[活动][DEBUG] SetTimeTextVisible.Text不存在");
    }
  }
  SetTimeTextByTextId(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, t);
  }
  SetBgTextureByPath(e, t) {
    this.SetTextureByPath(e, this.GetTexture(2), undefined, t);
  }
  SetBgTextureVisible(e) {
    this.GetTexture(2).SetUIActive(e);
  }
  SetSubTitleVisible(e) {
    this.GetText(3).SetUIActive(e);
  }
  SetSubTitleByTextId(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e, t);
  }
  SetSubTitleByText(e) {
    this.GetText(3).SetText(e);
  }
  SetSubTitleIconVisible(e) {
    this.GetSprite(4).SetUIActive(e);
  }
  SetSubTitleIconByPath(e, t) {
    this.SetSpriteByPath(e, this.GetSprite(4), true, undefined, t);
  }
}
exports.ActivityTitleTypeA = ActivityTitleTypeA;
//# sourceMappingURL=ActivityTitleTypeA.js.map