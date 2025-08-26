"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerLevelInfoView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ShipTowerBurningTideItem_1 = require("./ShipTowerBurningTideItem");
class ShipTowerLevelInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.pzc = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)).SetCloseCallBack(this.CloseMe.bind(this));
    this.pzc = new ShipTowerBurningTideItem_1.ShipTowerBurningTideItem();
    await this.pzc.CreateThenShowByActorAsync(this.GetItem(10).GetOwner());
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    if (e) {
      this.vzc();
      this.ryn();
      this.yzc();
      this.Szc(e.CurScore, e.MaxScore);
    }
  }
  vzc() {
    var e = ModelManager_1.ModelManager.ShipTowerModel.GetCurrentStageTeamData();
    if (e) {
      this.GetText(2).ShowTextNew("GhostShipMonster_Text1");
      e = e.GetInstanceDungeonCfg();
      this.GetText(3).ShowTextNew(e.DungeonDesc);
    }
  }
  ryn() {
    var e = ModelManager_1.ModelManager.ShipTowerModel.GetInTheBattleBuffInfo();
    var i = this.GetText(5);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.TitleKey);
    var i = this.GetText(6);
    if (e.SubTitleKey) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.SubTitleKey);
    } else {
      i?.SetText("");
    }
    if (e.DescTitleKey) {
      this.GetText(7)?.ShowTextNew(e.DescTitleKey);
    }
    if (e.DescInfoList.length > 0) {
      this.GetText(8)?.ShowTextNew(e.DescInfoList[0].DescKey);
    }
  }
  yzc() {
    var e = ModelManager_1.ModelManager.ShipTowerModel.CurSeasonCfg;
    if (e) {
      this.GetText(11)?.ShowTextNew(e.HotDesc);
      this.GetText(12)?.ShowTextNew(e.BuringTideDesc);
    }
  }
  Szc(e, i) {
    this.pzc?.UpdateValue(e, i);
  }
}
exports.ShipTowerLevelInfoView = ShipTowerLevelInfoView;
//# sourceMappingURL=ShipTowerLevelInfoView.js.map