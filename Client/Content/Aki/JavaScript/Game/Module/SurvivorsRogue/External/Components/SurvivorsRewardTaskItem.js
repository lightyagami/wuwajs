"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRewardTaskItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class SurvivorsRewardTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.sOn = undefined;
    this.OnGetBtnClick = () => {};
    this.T8e = undefined;
    this.rOe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.nIu = () => {
      var i;
      if (this.sOn && (i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsTask(this.sOn.Id))) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(i.JumpId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.OnGetBtnClick], [8, this.nIu]];
  }
  OnStart() {
    this.T8e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.rOe);
  }
  Refresh(i, t, r) {
    this.sOn = i;
    var e;
    var s;
    var a;
    var o = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsTask(i.Id);
    if (o) {
      e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(o.DropId);
      this.T8e.RefreshByData(e);
      e = i.Status === 2;
      s = i.Status === 0;
      a = i.Status === 1;
      this.GetButton(4).RootUIComp.SetUIActive(s);
      this.GetItem(7).SetUIActive(s);
      this.GetSprite(6).SetUIActive(e);
      this.GetText(5).SetUIActive(a && o.JumpId === 0);
      this.GetButton(8)?.RootUIComp.SetUIActive(a && o.JumpId > 0);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), o.TaskName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "SurvivorsNowProgress", i.Current, i.Target);
    }
  }
}
exports.SurvivorsRewardTaskItem = SurvivorsRewardTaskItem;
//# sourceMappingURL=SurvivorsRewardTaskItem.js.map