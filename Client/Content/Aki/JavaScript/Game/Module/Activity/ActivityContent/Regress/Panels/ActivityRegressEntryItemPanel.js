"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressEntryItemPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
class ActivityRegressEntryItemPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Xda = undefined;
    this.Lo = undefined;
    this.Yda = () => {
      var [e] = ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(this.Lo);
      if (e) {
        switch (this.Xda) {
          case 2:
            ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1023(3);
            UiManager_1.UiManager.OpenView("ActivityRegressMainView", 1);
            break;
          case 1:
            ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1023(1);
            UiManager_1.UiManager.OpenView("ActivityRegressMainView", 0);
            break;
          case 3:
            ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1023(2);
            UiManager_1.UiManager.OpenView("ActivityRegressMainView", 2);
            break;
          case 4:
            ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1023(2);
            UiManager_1.UiManager.OpenView("ActivityRegressMainView", 3);
        }
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Role_Lock");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UITexture]];
    this.BtnBindInfo = [[2, this.Yda]];
  }
  RefreshData(e, i) {
    this.Xda = e;
    e = (this.Lo = i) !== undefined;
    this.SetUiActive(e);
    if (e) {
      this.Og();
    }
  }
  Og() {
    var e;
    var i;
    var r;
    if (this.Lo === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("ActivityRecall", 63, "ActivityRegressEntryItemPanel.RefreshView->回流活动入口配置为空");
      }
      this.SetUiActive(false);
    } else {
      this.SetUiActive(true);
      e = this.GetText(0);
      i = this.Lo.Title;
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, i);
      this.GetText(1).text = "";
      e = this.KCa(this.Lo);
      i = this.GetTexture(3);
      [r] = ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(this.Lo);
      i.SetUIActive(r);
      this.SetTextureByPath(e, i);
    }
  }
  KCa(e) {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (i === 1) {
      return e.IconPath;
    } else if (i === 0) {
      return e.IconPathF;
    } else {
      return "";
    }
  }
}
exports.ActivityRegressEntryItemPanel = ActivityRegressEntryItemPanel;
//# sourceMappingURL=ActivityRegressEntryItemPanel.js.map