"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleTaskItem = exports.PhantomBattleTaskTabItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const PhantomArenaController_1 = require("../../PhantomArenaController");
class PhantomBattleTaskTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = 0;
    this.ActivityId = 0;
    this.OnClickedCb = undefined;
    this.jYe = () => {
      if (this.OnClickedCb) {
        this.OnClickedCb(this.Pe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.jYe]];
  }
  Refresh(t) {
    this.Pe = t;
    t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskTabConfigById(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Title);
    this.RefreshRedDot();
  }
  RefreshRedDot() {
    var t = ModelManager_1.ModelManager.PhantomArenaModel.CheckTaskRedDotByTab(this.Pe, this.ActivityId);
    this.GetItem(2)?.SetUIActive(t);
  }
  SetToggleState(t, e) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, e);
  }
}
exports.PhantomBattleTaskTabItem = PhantomBattleTaskTabItem;
class PhantomBattleTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.bOe = undefined;
    this.Pe = undefined;
    this.Uou = 0;
    this.JGe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.qOe = () => {
      PhantomArenaController_1.PhantomArenaController.TaskAllRewardRequest(this.Pe.TaskConfig.s5n);
    };
    this.i9i = () => {
      if (this.Pe && this.Uou) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Uou);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIText]];
    this.BtnBindInfo = [[0, this.i9i], [1, this.qOe]];
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), this.JGe);
  }
  Refresh(t, e, i) {
    this.Pe = t;
    this.bOe.RefreshByData(t.Reward);
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskConfigById(this.Pe.TaskConfig.s5n);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Desc);
    this.GetText(4)?.SetText(this.Pe.TaskConfig.lMs + "/" + this.Pe.TaskConfig.j6n);
    var r = this.Pe.TaskConfig.H6n;
    this.Uou = t.AccessPath;
    if (r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning && t.AccessPath !== 0) {
      this.GetButton(0)?.RootUIComp.SetUIActive(true);
    } else {
      this.GetButton(0)?.RootUIComp.SetUIActive(false);
    }
    this.GetItem(2)?.SetUIActive(r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken);
    this.GetButton(1)?.RootUIComp.SetUIActive(r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish);
    this.GetText(6)?.SetUIActive(r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning);
  }
}
exports.PhantomBattleTaskItem = PhantomBattleTaskItem;
//# sourceMappingURL=PhantomArenaEntranceTaskItem.js.map