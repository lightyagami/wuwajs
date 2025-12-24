"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrLimitTaskItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
class InfrLimitTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnClickToGet = i => {};
    this.T8e = undefined;
    this.GKc = undefined;
    this.rOe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.zNd = () => {
      if (this.Pe.JumpId !== 0) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Pe.JumpId);
      }
    };
    this.m4m = () => {
      this.GKc?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIText], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.zNd], [10, this.m4m]];
  }
  OnStart() {
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.rOe);
  }
  Refresh(i, t, e) {
    this.Pe = i;
    var r = ConfigManager_1.ConfigManager.InfrastructureConfig.GetInfrActivityTaskConfig(this.Pe.ConfigId);
    var o = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.Pe.TaskReward);
    this.T8e.RefreshByData(o, () => {
      this.T8e.ScrollToLeft(0);
    });
    var o = i.Status;
    this.GetArtText(0).SetText(i.Index.toString());
    this.GetText(5).SetUIActive(o === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning);
    this.GetSprite(6).SetUIActive(o === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken);
    this.GetSprite(7).SetUIActive(o === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken);
    this.GetItem(8).SetUIActive(o === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish);
    this.GetButton(9).RootUIComp.SetUIActive(this.Pe.JumpId !== 0 && o === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning);
    this.GetButton(10).RootUIComp.SetUIActive(o === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish);
    this.GetText(1).ShowTextNew(r.TaskDes);
    this.GetText(2).SetText(this.Pe.Current + "/" + this.Pe.Target);
  }
  SetOnClickRewardCb(i) {
    this.GKc = i;
  }
}
exports.InfrLimitTaskItem = InfrLimitTaskItem;
//# sourceMappingURL=InfrLimitTaskItem.js.map