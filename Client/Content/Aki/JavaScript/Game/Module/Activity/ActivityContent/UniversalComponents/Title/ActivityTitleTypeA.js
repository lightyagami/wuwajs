"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTitleTypeA = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityTitleTypeA extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.FVm = 0;
    this.NVm = 0;
    this.kqe = () => {
      UiManager_1.UiManager.OpenView("ActivityTagInfoHelpView", [this.FVm, this.NVm]);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIExtendToggle], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIText], [9, UE.UIItem], [10, UE.UISprite], [11, UE.UIText], [12, UE.UIItem]];
    this.BtnBindInfo = [[5, this.kqe]];
  }
  OnStart() {
    this.SetSubTitleVisible(false);
    this.GetExtendToggle(5).RootUIComp.SetUIActive(false);
  }
  SetActivityBaseData(t) {
    if (t) {
      this.CNe = t;
      this.VVm();
    }
  }
  VVm() {
    var t;
    var i;
    var e;
    if (this.CNe) {
      if ((t = this.CNe.LocalConfig) && (i = t.ShowActTypeIds.length >= 1, e = t.ShowActTypeIds.length >= 2, i)) {
        this.GetExtendToggle(5).RootUIComp.SetUIActive(true);
        this.GetItem(6).SetUIActive(i);
        this.GetItem(9).SetUIActive(e);
        if (i && t.ShowActTypeIds[0]) {
          this.FVm = t.ShowActTypeIds[0];
          this.jVm(this.FVm);
        }
        if (e && t.ShowActTypeIds[1]) {
          this.NVm = t.ShowActTypeIds[1];
          this.HVm(this.NVm);
        }
      } else {
        this.GetExtendToggle(5).RootUIComp.SetUIActive(false);
      }
    }
  }
  jVm(t) {
    var i;
    var t = ConfigManager_1.ConfigManager.ActivityConfig.GetActivityTitleTags(t);
    if (t) {
      i = t.TogIcon;
      this.SetSpriteByPath(i, this.GetSprite(7), false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t.TagName);
    }
  }
  HVm(t) {
    var i;
    var t = ConfigManager_1.ConfigManager.ActivityConfig.GetActivityTitleTags(t);
    if (t) {
      i = t.TogIcon;
      this.SetSpriteByPath(i, this.GetSprite(10), false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), t.TagName);
    }
  }
  SetTitleByTextId(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t, i);
  }
  SetTitleByText(t) {
    this.GetText(0).SetText(t);
  }
  SetTimeTextByText(t) {
    var i = this.GetText(1);
    if (i) {
      i.SetText(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 37, "[活动][DEBUG] SetTimeTextByText.Text不存在");
    }
  }
  SetTimeTextVisible(t) {
    if (this.GetText(1)) {
      this.GetItem(12).SetUIActive(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 37, "[活动][DEBUG] SetTimeTextVisible.Text不存在");
    }
  }
  SetTimeTextByTextId(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, i);
  }
  SetBgTextureByPath(t, i) {
    this.SetTextureByPath(t, this.GetTexture(2), undefined, i);
  }
  SetBgTextureVisible(t) {
    this.GetTexture(2).SetUIActive(t);
  }
  SetSubTitleVisible(t) {
    this.GetText(3).SetUIActive(false);
  }
  SetSubTitleByTextId(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t, i);
  }
  SetSubTitleByText(t) {
    this.GetText(3).SetText(t);
  }
  SetSubTitleIconVisible(t) {
    this.GetSprite(4).SetUIActive(t);
  }
  SetSubTitleIconByPath(t, i) {
    this.SetSpriteByPath(t, this.GetSprite(4), true, undefined, i);
  }
  SetTogActPlayTypeVisible(t) {
    this.GetExtendToggle(5).RootUIComp.SetUIActive(t);
  }
}
exports.ActivityTitleTypeA = ActivityTitleTypeA;
//# sourceMappingURL=ActivityTitleTypeA.js.map