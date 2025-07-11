"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerTeamItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CommonSelectItem_1 = require("../../../Roguelike/View/CommonSelectItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BabelTowerTeamRoleItem_1 = require("./BabelTowerTeamRoleItem");
class BabelTowerTeamItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.NSn = undefined;
    this.OSn = undefined;
    this.kSn = [];
    this.jSn = undefined;
    this.OnClickBtnCallBack = undefined;
    this.nqe = () => {
      this.OnClickBtnCallBack?.();
    };
    this.KSn = () => new BabelTowerTeamRoleItem_1.BabelTowerTeamRoleItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIHorizontalLayout], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  async OnBeforeStartAsync() {
    this.NSn = new CommonSelectItem_1.CommonElementItem();
    this.OSn = new CommonSelectItem_1.CommonElementItem();
    await this.NSn.CreateByActorAsync(this.GetItem(3).GetOwner());
    this.NSn.SetActive(true);
    await this.OSn.CreateByActorAsync(this.GetItem(4).GetOwner());
    this.OSn.SetActive(true);
    this.kSn.push(this.NSn);
    this.kSn.push(this.OSn);
    this.jSn = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.KSn);
  }
  RefreshItem(e, t) {
    this.jSn?.RefreshByData(e);
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
    this.kSn.forEach(e => {
      e.SetActive(false);
    });
    var i = e?.RecommendElement ?? [];
    for (let e = 0; e < i.length; e++) {
      if (i[e] !== 0) {
        this.kSn[e].SetActive(true);
        this.kSn[e].Refresh(i[e], false, e);
      }
    }
    e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(t, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "BossRushRecommendLevel", e);
  }
}
exports.BabelTowerTeamItem = BabelTowerTeamItem;
//# sourceMappingURL=BabelTowerTeamItem.js.map