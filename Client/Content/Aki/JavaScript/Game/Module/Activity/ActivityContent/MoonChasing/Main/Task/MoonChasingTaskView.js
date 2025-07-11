"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonChasingTaskView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const RedDotController_1 = require("../../../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const ActivityMoonChasingController_1 = require("../../Activity/ActivityMoonChasingController");
const PopularityModule_1 = require("../PopularityModule");
const TaskBranchLineModule_1 = require("./TaskBranchLineModule");
const TaskMainLineModule_1 = require("./TaskMainLineModule");
class MoonChasingTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.eke = undefined;
    this.lqe = undefined;
    this.gAn = undefined;
    this.fAn = undefined;
    this.Xva = undefined;
    this.Yva = undefined;
    this.vAn = i => {
      this.Yva.TaskType = 2;
      this.fAn?.SetActive(false);
      this.GetExtendToggle(3)?.SetToggleState(0);
      this.MAn(this.Yva.TargetTaskId).finally(() => {
        this.Xva?.Play();
      });
      this.Ywa(1);
    };
    this.EAn = i => {
      this.Yva.TaskType = 1;
      this.gAn?.SetActive(false);
      this.GetExtendToggle(2)?.SetToggleState(0);
      this.SAn(this.Yva.TargetTaskId, this.Yva.IsLastTask).finally(() => {
        this.Xva?.Play();
      });
      this.Ywa(0);
    };
    this.yAn = () => this.Yva.TaskType === 2;
    this.IAn = () => this.Yva.TaskType !== 2;
    this.m2e = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIExtendToggle], [3, UE.UIExtendToggle], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[2, this.vAn], [3, this.EAn]];
  }
  async ERn() {
    this.eke = new PopularityModule_1.PopularityModule();
    await this.eke.CreateByActorAsync(this.GetItem(4).GetOwner());
    this.AddChild(this.eke);
  }
  async U3e() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.m2e);
    await this.lqe.SetCurrencyItemList([]);
  }
  Mqt() {
    this.GetExtendToggle(3).CanExecuteChange.Bind(this.yAn);
    this.GetExtendToggle(2).CanExecuteChange.Bind(this.IAn);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.ERn(), this.U3e()]);
  }
  OnStart() {
    this.Yva = this.OpenParam;
    if (this.Yva === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MoonChasing", 58, "MoonChasingTaskView Invalid OpenParam");
      }
    } else {
      this.Mqt();
      this.Xva = this.GetItem(1).GetOwner().GetComponentByClass(UE.UIInturnAnimController.StaticClass());
      (this.Yva.TaskType === 1 ? this.GetExtendToggle(3) : this.GetExtendToggle(2)).SetToggleStateForce(1, true);
    }
  }
  OnBeforeShow() {
    RedDotController_1.RedDotController.BindRedDot("MoonChasingMainlineTab", this.GetItem(5), undefined);
    RedDotController_1.RedDotController.BindRedDot("MoonChasingBranchTab", this.GetItem(6), undefined);
    ActivityMoonChasingController_1.ActivityMoonChasingController.CheckIsActivityClose();
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindRedDot("MoonChasingMainlineTab");
    RedDotController_1.RedDotController.UnBindRedDot("MoonChasingBranchTab");
  }
  async SAn(i, t) {
    if (!this.fAn) {
      this.fAn = new TaskMainLineModule_1.TaskMainLineModule();
      this.fAn.SetSelectTaskId(i, t);
      await this.fAn.CreateThenShowByResourceIdAsync("UiItem_MissionMainLine", this.GetItem(1));
    }
    await this.fAn.ShowAsync();
  }
  async MAn(i) {
    if (!this.gAn) {
      this.gAn = new TaskBranchLineModule_1.TaskBranchLineModule();
      this.gAn.SetSelectTaskId(i);
      await this.gAn.CreateThenShowByResourceIdAsync("UiItem_MissionBranchLine", this.GetItem(1));
    }
    await this.gAn.ShowAsync();
  }
  Ywa(i) {
    var t = this.GetExtendToggle(3).RootUIComp;
    var s = this.GetExtendToggle(2).RootUIComp;
    var e = t.GetHierarchyIndex();
    var o = s.GetHierarchyIndex();
    if ((!(o < e) || i !== 0) && (!(e < o) || i !== 1)) {
      t.SetHierarchyIndex(o);
      s.SetHierarchyIndex(e);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (!(i.length < 1)) {
      switch (i[0]) {
        case "Main":
          return this.fAn?.GetGuideUiItemAndUiItemForShowEx(i);
        case "Branch":
          return this.gAn?.GetGuideUiItemAndUiItemForShowEx(i);
        default:
          return;
      }
    }
  }
}
exports.MoonChasingTaskView = MoonChasingTaskView;
//# sourceMappingURL=MoonChasingTaskView.js.map