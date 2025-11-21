"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityListItem = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class ActivityListItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.DNl = undefined;
    this.YSd = undefined;
    this.LZ_ = () => {
      this.DNl.OnClickCb();
      this.YSd?.();
      this.GetExtendToggle(0).SetToggleState(0);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UIItem], [10, UE.UIItem], [0, UE.UIExtendToggle]];
    this.BtnBindInfo = [[0, this.LZ_]];
  }
  Refresh(i) {
    this.DNl = i.Data;
    this.YSd = i.OnclickCb;
    this.RefreshReadPoint();
    this.RefreshInfo();
  }
  RefreshReadPoint() {
    this.GetItem(1).SetUIActive(this.DNl.RedPoint);
  }
  GetMapPeriodicActivityId() {
    return this.DNl.Id;
  }
  RefreshInfo() {
    var i = ConfigManager_1.ConfigManager.MapConfig.GetMapPeriodicActivityConfig(this.DNl.Id);
    this.GetText(2).ShowTextNew(i?.TitleKey ?? "");
    this.GetText(4).ShowTextNew(i?.DescriptionKey ?? "");
    this.SetSpriteByPath(i.IconPath, this.GetSprite(7), true);
    this.GetText(3).SetText(this.DNl.LeftTimeText);
    this.GetText(6).SetText(this.DNl.CurrentNum + "/" + this.DNl.TotalNum);
    this.GetItem(5).SetUIActive(false);
    this.GetSprite(8).SetUIActive(this.DNl.IsFinish);
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("MapPeriodicActivityTime");
    var t = this.DNl.LeftTime;
    var s = this.GetText(3);
    s.SetChangeColor(t > 0 && t <= i, s.changeColor);
  }
}
exports.ActivityListItem = ActivityListItem;
//# sourceMappingURL=ActivityListItem.js.map