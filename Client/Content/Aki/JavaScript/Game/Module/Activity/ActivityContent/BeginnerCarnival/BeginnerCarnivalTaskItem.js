"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BeginnerCarnivalTaskItem = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  ConditionGroupData_1 = require("../../ConditionGroupData"),
  BeginnerCarnivalController_1 = require("./BeginnerCarnivalController");
class BeginnerCarnivalTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.BOe = 0, this.fy1 = 0, this.Pou = [], this.xqe = void 0, this.JGe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid
    }, this.gy1 = () => {
      BeginnerCarnivalController_1.BeginnerCarnivalController.NewbieCarnivalAwardRequest(this.BOe)
    }, this.Niu = () => {
      var e = [],
        i = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalTask(this.BOe);
      for (const o of i.JumpConditionGroups)
        for (const s of ConfigManager_1.ConfigManager.ConditionConfig.GetGroupConditionIds(o)) {
          var r, t = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(s);
          let i = -1;
          t.AccessId && (r = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(t.AccessId), i = r.SkipName);
          const n = {
            ConditionId: s,
            ConditionTextId: t.Description,
            IsFinished: this.oZ1(s),
            AccessId: t.AccessId,
            AccessType: i
          };
          e.push(n)
        }
      const n = new ConditionGroupData_1.ConditionGroupData(i.JumpConditionGroup, e);
      UiManager_1.UiManager.OpenView("CommonConditionView", n)
    }, this.Wpa = () => {
      this.fy1 <= 0 || SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.fy1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [1, UE.UIButtonComponent],
      [6, UE.UIScrollViewWithScrollbarComponent],
      [7, UE.UIItem],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem]
    ], this.BtnBindInfo = [
      [1, this.gy1],
      [8, this.Niu],
      [0, this.Wpa]
    ]
  }
  OnStart() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.JGe)
  }
  Refresh(i, e, r) {
    this.BOe = i;
    var i = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData(),
      t = i.GetTaskDataById(this.BOe),
      n = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalTask(this.BOe),
      o = (this.fy1 = n.JumpId, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), n.TaskName), this.GetText(5).SetText(t.lMs + "/" + t.j6n), ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(n.TaskReward)),
      o = (this.xqe.RefreshByData(o), t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken),
      o = (this.GetItem(3).SetUIActive(o), t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish),
      o = (this.GetButton(1).RootUIComp.SetUIActive(o), this.GetItem(9).SetUIActive(o), t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning),
      t = 0 < n.JumpId,
      i = i.JumpTaskMap.get(this.BOe),
      n = (i?.length ?? 0) >= n.JumpConditionGroups.length;
    this.Pou = i ?? [], this.GetButton(0).RootUIComp.SetUIActive(o && t && n), this.GetItem(7).SetUIActive(o && t && !n), this.GetText(2).SetUIActive(o && !t)
  }
  oZ1(i) {
    return this.Pou.includes(i)
  }
}
exports.BeginnerCarnivalTaskItem = BeginnerCarnivalTaskItem;
//# sourceMappingURL=BeginnerCarnivalTaskItem.js.map