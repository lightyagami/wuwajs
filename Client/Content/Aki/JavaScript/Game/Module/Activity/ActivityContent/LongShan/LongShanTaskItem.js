"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LongShanTaskItem = void 0;
const UE = require("ue"),
  LongShanTaskById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanTaskById"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  ConditionGroupData_1 = require("../../ConditionGroupData"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityLongShanController_1 = require("./ActivityLongShanController");
class LongShanTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.BOe = 0, this.iZ1 = void 0, this.bOe = void 0, this.wVl = void 0, this.JGe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid, this.rZ1 = () => {
      if (!this.iZ1?.gJ1) {
        var t = [];
        for (const r of ConfigManager_1.ConfigManager.ConditionConfig.GetGroupConditionIds(this.iZ1.lj1)) {
          var e = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(r);
          let i = -1;
          e.AccessId && (n = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(e.AccessId), i = n.SkipName);
          var n = {
            ConditionId: r,
            ConditionTextId: e.Description,
            IsFinished: this.oZ1(r),
            AccessId: e.AccessId,
            AccessType: i
          };
          t.push(n)
        }
        var i = new ConditionGroupData_1.ConditionGroupData(this.iZ1.lj1, t);
        UiManager_1.UiManager.OpenView("CommonConditionView", i)
      }
    }, this.IOe = () => {
      var i = LongShanTaskById_1.configLongShanTaskById.GetConfig(this.BOe);
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(i.JumpId)
    }, this.qOe = () => {
      ActivityLongShanController_1.ActivityLongShanController.TakeTaskReward(this.BOe)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIScrollViewWithScrollbarComponent],
      [7, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.IOe],
      [1, this.qOe]
    ]
  }
  async OnBeforeStartAsync() {
    this.GetItem(7) && (this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock, await this.wVl.CreateByActorAsync(this.GetItem(7).GetOwner()), this.wVl.ButtonCallBack = () => {
      this.rZ1()
    }, this.wVl.SetTextByTextId("QiqiuThemeUnlock")), this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.JGe)
  }
  Refresh(i, t, e) {
    this.iZ1 = i, this.BOe = i.s5n;
    var n = LongShanTaskById_1.configLongShanTaskById.GetConfig(this.BOe),
      r = [];
    for (const s of n.TaskReward) {
      var o = [{
        IncId: 0,
        ItemId: s[0]
      }, s[1]];
      r.push(o)
    }
    this.bOe.RefreshByData(r), this.GetButton(1).RootUIComp.SetUIActive(i.dMs && !i.mMs), this.GetItem(3).SetUIActive(i.mMs), this.GetItem(2).SetUIActive(!i.dMs && 0 === n.JumpId), this.GetButton(0).RootUIComp.SetUIActive(!i.dMs && i.gJ1 && 0 < n.JumpId), this.wVl?.SetUiActive(!i.dMs && !i.gJ1 && 0 < n.JumpId), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), n.TaskName), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "LongShanStage_Progress", i.lMs, i.j6n)
  }
  oZ1(i) {
    for (const t of this.iZ1.qS_)
      if (i === t) return !0;
    return !1
  }
}
exports.LongShanTaskItem = LongShanTaskItem;
//# sourceMappingURL=LongShanTaskItem.js.map