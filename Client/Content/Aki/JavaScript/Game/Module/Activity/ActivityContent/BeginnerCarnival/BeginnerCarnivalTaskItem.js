"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeginnerCarnivalTaskItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ConditionGroupData_1 = require("../../ConditionGroupData");
const BeginnerCarnivalController_1 = require("./BeginnerCarnivalController");
class BeginnerCarnivalTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.BOe = 0;
    this.Gy1 = 0;
    this.Whu = [];
    this.xqe = undefined;
    this.JGe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.Fy1 = () => {
      BeginnerCarnivalController_1.BeginnerCarnivalController.NewbieCarnivalAwardRequest(this.BOe);
    };
    this.wsu = () => {
      var e = [];
      var i = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalTask(this.BOe);
      for (const o of i.JumpConditionGroups) {
        for (const s of ConfigManager_1.ConfigManager.ConditionConfig.GetGroupConditionIds(o)) {
          var r;
          var t = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(s);
          let i = -1;
          if (t.AccessId) {
            r = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(t.AccessId);
            i = r.SkipName;
          }
          const n = {
            ConditionId: s,
            ConditionTextId: t.Description,
            IsFinished: this.Teu(s),
            AccessId: t.AccessId,
            AccessType: i
          };
          e.push(n);
        }
      }
      const n = new ConditionGroupData_1.ConditionGroupData(i.JumpConditionGroup, e);
      UiManager_1.UiManager.OpenView("CommonConditionView", n);
    };
    this.Wpa = () => {
      if (!(this.Gy1 <= 0)) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Gy1);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [1, UE.UIButtonComponent], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Fy1], [8, this.wsu], [0, this.Wpa]];
  }
  OnStart() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.JGe);
  }
  Refresh(i, e, r) {
    this.BOe = i;
    var i = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
    var t = i.GetTaskDataById(this.BOe);
    var n = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalTask(this.BOe);
    this.Gy1 = n.JumpId;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), n.TaskName);
    this.GetText(5).SetText(t.lMs + "/" + t.j6n);
    var o = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(n.TaskReward);
    this.xqe.RefreshByData(o);
    var o = t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken;
    this.GetItem(3).SetUIActive(o);
    var o = t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish;
    this.GetButton(1).RootUIComp.SetUIActive(o);
    this.GetItem(9).SetUIActive(o);
    var o = t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning;
    var t = n.JumpId > 0;
    var i = i.JumpTaskMap.get(this.BOe);
    var n = (i?.length ?? 0) >= n.JumpConditionGroups.length;
    this.Whu = i ?? [];
    this.GetButton(0).RootUIComp.SetUIActive(o && t && n);
    this.GetItem(7).SetUIActive(o && t && !n);
    this.GetText(2).SetUIActive(o && !t);
  }
  Teu(i) {
    return this.Whu.includes(i);
  }
}
exports.BeginnerCarnivalTaskItem = BeginnerCarnivalTaskItem;
//# sourceMappingURL=BeginnerCarnivalTaskItem.js.map