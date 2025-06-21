"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleTaskItem = exports.PhantomBattleTaskTabItem = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  PhantomArenaController_1 = require("../../PhantomArenaController");
class PhantomBattleTaskTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Pe = 0, this.OnClickedCb = void 0, this.jYe = () => {
      this.OnClickedCb && this.OnClickedCb(this.Pe)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.jYe]
    ]
  }
  Refresh(t) {
    this.Pe = t;
    t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskTabConfigById(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Title), this.RefreshRedDot()
  }
  RefreshRedDot() {
    var t = ModelManager_1.ModelManager.PhantomArenaModel.CheckTaskRedDotByTab(this.Pe);
    this.GetItem(2)?.SetUIActive(t)
  }
  SetToggleState(t, e) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, e)
  }
}
exports.PhantomBattleTaskTabItem = PhantomBattleTaskTabItem;
class PhantomBattleTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.bOe = void 0, this.Pe = void 0, this.Stu = 0, this.JGe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid, this.qOe = () => {
      PhantomArenaController_1.PhantomArenaController.TaskRewardRequest(this.Pe.TaskConfig.s5n)
    }, this.i9i = () => {
      this.Pe && this.Stu && SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Stu)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIScrollViewWithScrollbarComponent],
      [6, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.i9i],
      [1, this.qOe]
    ]
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), this.JGe)
  }
  Refresh(t, e, i) {
    this.Pe = t, this.bOe.RefreshByData(t.Reward);
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskConfigById(this.Pe.TaskConfig.s5n),
      r = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Desc), this.GetText(4)?.SetText(this.Pe.TaskConfig.lMs + "/" + this.Pe.TaskConfig.j6n), this.Pe.TaskConfig.H6n);
    this.Stu = t.AccessPath, r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning && 0 !== t.AccessPath ? this.GetButton(0)?.RootUIComp.SetUIActive(!0) : this.GetButton(0)?.RootUIComp.SetUIActive(!1), this.GetItem(2)?.SetUIActive(r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken), this.GetButton(1)?.RootUIComp.SetUIActive(r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish), this.GetText(6)?.SetUIActive(r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning)
  }
}
exports.PhantomBattleTaskItem = PhantomBattleTaskItem;
//# sourceMappingURL=PhantomArenaEntranceTaskItem.js.map