"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTaskItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MotorcycleTaskTagItem_1 = require("./MotorcycleTaskTagItem");
class MotorcycleTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.rcf = 0;
    this.Uou = 0;
    this.TDe = undefined;
    this.It_ = undefined;
    this.Pe = undefined;
    this.vjf = () => {
      if (this.Pe && this.Pe.Type === 2) {
        this.yjf();
        this.TDe = TimerSystem_1.TimerSystem.Forever(this.Sjf, TimeUtil_1.TimeUtil.InverseMillisecond);
      }
    };
    this.Sjf = t => {
      if (this.Pe.EndTime - TimeUtil_1.TimeUtil.GetServerTime() <= 0) {
        this.It_.SetUiActive(false);
        this.yjf();
      } else {
        this.It_.SetUiActive(true);
        this.It_.Refresh(this.Pe);
      }
    };
    this.ocf = () => {
      var t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(this.rcf).TpItemId;
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t);
    };
    this.ncf = () => {
      var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetWaitRewardTaskIds(this.rcf);
      ControllerHolder_1.ControllerHolder.MotorcycleDevelopController.RequestMotorTechTaskOneKeyReward(t);
    };
    this.scf = () => {
      if (!(this.Uou <= 0)) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Uou);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [7, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UITexture], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[4, this.ocf], [6, this.ncf], [5, this.scf]];
  }
  async OnBeforeStartAsync() {
    this.It_ = new MotorcycleTaskTagItem_1.MotorcycleTaskTagItem();
    await this.It_.CreateThenShowByResourceIdAsync("UiItem_MotorcycleTaskTag", this.GetItem(10));
    this.It_.SetUiActive(false);
  }
  OnBeforeDestroy() {
    this.yjf();
  }
  Refresh(i, t, e) {
    this.Pe = i;
    this.rcf = i.TreeType;
    var s = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTaskConfig(i.TaskId);
    var r = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(this.rcf);
    if (s && r) {
      this.Uou = s.JumpId;
      var h = i.ProcessInfo.Current;
      var a = i.ProcessInfo.Target;
      var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(r.TpItemId).Icon;
      this.GetText(1).SetText(h + "/" + a);
      this.GetText(8).SetText("+" + s.RewardTpCount);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s.Title);
      this.SetTextureByPath(r, this.GetTexture(9));
      var h = i.RewardInfo.WaitRewardCount;
      var a = i.RewardInfo.RewardedCount;
      var r = i.RewardInfo.MaxRewardCount;
      if (h > 0) {
        this.GetItem(2).SetUIActive(false);
        this.GetItem(3).SetUIActive(false);
        this.GetItem(7).SetUIActive(false);
        this.GetButton(5).RootUIComp.SetUIActive(false);
        this.GetButton(6).RootUIComp.SetUIActive(true);
      } else {
        if (r > 0 && r <= a) {
          this.GetItem(2).SetUIActive(false);
          this.GetItem(3).SetUIActive(true);
          this.GetItem(7).SetUIActive(true);
          this.GetButton(5).RootUIComp.SetUIActive(false);
        } else {
          h = s.JumpId > 0;
          this.GetItem(2).SetUIActive(!h);
          this.GetItem(3).SetUIActive(false);
          this.GetItem(7).SetUIActive(false);
          this.GetButton(5).RootUIComp.SetUIActive(h);
        }
        this.GetButton(6).RootUIComp.SetUIActive(false);
      }
      let t = false;
      if (i.Type === 3) {
        t = true;
      } else if (i.Type === 2) {
        r = TimeUtil_1.TimeUtil.GetServerTime();
        t = i.EndTime > r;
      }
      this.It_.SetUiActive(t);
      if (t) {
        this.It_.Refresh(i);
      }
      this.vjf();
    }
  }
  yjf() {
    if (this.TDe) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  GetBtnGet() {
    return this.GetButton(6).RootUIComp;
  }
  GetNavigationItem() {
    return this.GetItem(11);
  }
}
exports.MotorcycleTaskItem = MotorcycleTaskItem;
//# sourceMappingURL=MotorcycleTaskItem.js.map