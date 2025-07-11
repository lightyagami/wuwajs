"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyActivityTaskItem = exports.DailyActiveTaskData = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DailyActivityController_1 = require("../DailyActivityController");
const DailyActivityTaskController_1 = require("./DailyActivityTaskController");
class DailyActiveTaskData {
  constructor() {
    this.RewardItemList = [];
    this.TaskId = 0;
    this.TaskState = 2;
    this.CurrentProgress = 0;
    this.TargetProgress = 0;
    this.Sort = 0;
    this.IsFunctionUnlock = false;
  }
}
exports.DailyActiveTaskData = DailyActiveTaskData;
class DailyActivityTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.BOe = 0;
    this.Wkt = 1;
    this.Kkt = [];
    this.Qkt = false;
    this.Xkt = 0;
    this.$kt = () => {
      if (this.BOe) {
        DailyActivityController_1.DailyActivityController.RequestDailyActivityTaskReward([this.BOe]);
      }
    };
    this.Ykt = () => {
      if (this.BOe) {
        if (this.Qkt) {
          DailyActivityTaskController_1.DailyActiveTaskController.TrackTaskByType(this.Wkt, this.Kkt);
        } else {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
        }
      }
    };
    this.jbe = () => {
      if (this.BOe && this.Xkt) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Xkt);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIText]];
    this.BtnBindInfo = [[4, this.jbe], [5, this.Ykt], [6, this.$kt]];
  }
  OnStart() {}
  OnBeforeDestroy() {}
  IsNormalTaskJumpType() {
    return this.Wkt === 1;
  }
  Refresh(t, i, s) {
    this.BOe = t.TaskId;
    this.Qkt = t.IsFunctionUnlock;
    this.GetText(1).SetText(t.CurrentProgress.toString() + "/" + t.TargetProgress.toString());
    var e = ConfigManager_1.ConfigManager.DailyActivityConfig.GetActivityTaskConfigById(this.BOe);
    var r = e.TaskName;
    var a = [];
    if (e.UpdateType === 2 && !((h = ModelManager_1.ModelManager.DailyActivityModel.AreaId) <= 0)) {
      if ((h = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(h)) && (h = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(h.Title))) {
        a.push(h);
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r, ...a);
    var h = e.TaskFunc;
    if (h.length >= 1) {
      this.Wkt = Number(h[0]);
    }
    if (h.length >= 2) {
      this.Kkt = h.slice(1);
    }
    if (this.Wkt === 6) {
      this.Kkt = [ModelManager_1.ModelManager.DailyActivityModel.AreaId.toString()];
    }
    var r = t.RewardItemList[0];
    this.Xkt = r[0].ItemId;
    this.GetText(8).SetText("+" + r[1].toString());
    switch (t.TaskState) {
      case 2:
        var o = this.IsNormalTaskJumpType();
        this.GetText(2).SetUIActive(o);
        this.GetButton(5).RootUIComp.SetUIActive(!o);
        this.GetButton(6).RootUIComp.SetUIActive(false);
        this.GetItem(3).SetUIActive(false);
        this.GetItem(7).SetUIActive(false);
        break;
      case 1:
        this.GetText(2).SetUIActive(false);
        this.GetButton(5).RootUIComp.SetUIActive(false);
        this.GetButton(6).RootUIComp.SetUIActive(true);
        this.GetItem(3).SetUIActive(false);
        this.GetItem(7).SetUIActive(false);
        break;
      case 3:
        this.GetText(2).SetUIActive(false);
        this.GetButton(5).RootUIComp.SetUIActive(false);
        this.GetButton(6).RootUIComp.SetUIActive(false);
        this.GetItem(3).SetUIActive(true);
        this.GetItem(7).SetUIActive(true);
    }
  }
}
exports.DailyActivityTaskItem = DailyActivityTaskItem;
//# sourceMappingURL=DailyActivityTaskItem.js.map