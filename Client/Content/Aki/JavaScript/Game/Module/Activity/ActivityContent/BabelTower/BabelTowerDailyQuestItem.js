"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerDailyQuestItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const BabelTowerController_1 = require("./BabelTowerController");
const BabelTowerDailyQuestBuffOrDeTermItem_1 = require("./BabelTowerDailyQuestBuffOrDeTermItem");
class BabelTowerDailyQuestItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.BOe = 0;
    this.Wec = undefined;
    this.Qec = undefined;
    this.jWt = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.xDo = () => {
      return new BabelTowerDailyQuestBuffOrDeTermItem_1.BabelTowerDailyQuestBuffOrDeTermItem();
    };
    this.tfc = () => {
      BabelTowerController_1.BabelTowerController.BabelTowerDailyTaskRewardRequest(this.BOe);
    };
    this.PMc = () => {
      var e = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDailyQuest(this.BOe);
      if (e) {
        ModelManager_1.ModelManager.BabelTowerModel.LevelChoseHandle = e.JumpToLevelId;
        if (UiManager_1.UiManager.IsViewHide("BabelTowerHardLevelChoseView")) {
          UiManager_1.UiManager.NormalResetToView("BabelTowerHardLevelChoseView", () => {
            UiManager_1.UiManager.CloseView("BabelTowerQuestView");
          });
        } else {
          UiManager_1.UiManager.NormalResetToView("BabelTowerMainView", () => {
            UiManager_1.UiManager.OpenView("BabelTowerHardLevelChoseView", undefined, () => {
              UiManager_1.UiManager.CloseView("BabelTowerQuestView");
            });
          });
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIHorizontalLayout], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[3, this.tfc], [5, this.PMc]];
  }
  OnStart() {
    this.GetText(4).SetUIActive(false);
    this.Wec = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.jWt);
    this.Qec = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), this.xDo);
  }
  Refresh(e, r, i) {
    this.BOe = e;
    var o = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDailyQuest(e);
    if (o) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), o.Title);
      var t = o.DropId > 0 ? ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(o.DropId) : [];
      this.Wec?.RefreshByData(t);
      var t = BabelTowerController_1.BabelTowerController.GetBabelTowerData().DailyQuest.get(e)?.H6n ?? Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning;
      this.GetButton(3).RootUIComp.SetUIActive(t === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish);
      this.GetButton(5).RootUIComp.SetUIActive(t === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning);
      this.GetItem(8).SetUIActive(t === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken);
      var a = [];
      for (const l of o.ShowDeTerm) {
        const e = {
          IsDeTerm: true,
          ConfigId: l
        };
        a.push(e);
      }
      for (const s of o.ShowBuff) {
        const e = {
          IsDeTerm: false,
          ConfigId: s
        };
        a.push(e);
      }
      this.Qec?.RefreshByData(a);
    }
  }
}
exports.BabelTowerDailyQuestItem = BabelTowerDailyQuestItem;
//# sourceMappingURL=BabelTowerDailyQuestItem.js.map