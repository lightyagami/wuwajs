"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDungeonSelectRightPanel = undefined;
const UE = require("ue");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FloroRanchDefine_1 = require("../FloroRanchDefine");
const FloroRanchDifficultyItem_1 = require("./Item/FloroRanchDifficultyItem");
const FloroRanchRaceItem_1 = require("./Item/FloroRanchRaceItem");
class FloroRanchDungeonSelectRightPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.jAu = undefined;
    this.HAu = undefined;
    this.$Au = undefined;
    this.ZEu = undefined;
    this.OnSelectDifficultyCallBack = undefined;
    this.WAu = e => {
      this.HAu = e;
      this.OnSelectDifficultyCallBack?.(e.Id);
      this.$Au.SelectGridProxyByKey(e.Id);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Farm_DungeonTarget", e.GetMaxStage(), e.GetStageDay());
      this.GetText(3)?.SetText(e.FirstReward.toString());
      this.GetText(4)?.SetText(e.AgainReward.toString());
      this.GetItem(11)?.SetUIActive(e.AgainReward !== 0);
      e = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchTagConfig(e.TagId);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Name);
      }
      this.RefreshRaceList(this.HAu.SelectedRaceIds);
    };
    this.QAu = () => {
      var e = new FloroRanchDifficultyItem_1.FloroRanchDifficultyItem();
      e.SetToggleCallBack(this.WAu);
      return e;
    };
    this.KAu = () => {
      return new FloroRanchRaceItem_1.FloroRanchRaceItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIHorizontalLayout], [0, UE.UIText], [1, UE.UIHorizontalLayout], [9, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [10, UE.UIItem], [11, UE.UIItem]];
  }
  OnStart() {
    this.$Au = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.QAu);
    this.ZEu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(9), this.KAu);
    var e = {
      UiText: this.GetText(5),
      ViewType: 1,
      AttachDirection: 1,
      AttachItem: this.GetRootItem(),
      Style: 2,
      ReportType: 8
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
  }
  RefreshDungeonInfo(e, t) {
    this.jAu = e;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.GetDungeonName());
    this.GetItem(6)?.SetUIActive(!e.IsUnLock);
    this.GetItem(10)?.SetUIActive(e.IsUnLock);
    if (e.IsUnLock) {
      const i = e.GetSubDungeonData();
      this.$Au.DeselectCurrentGridProxy();
      this.$Au.RefreshByData(i, () => {
        var e = t ?? i[0];
        this.WAu(e);
      });
    } else {
      e = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(this.jAu.ConditionId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e);
    }
  }
  RefreshRaceList(e) {
    var t = [];
    for (const i of e) {
      t.push(new FloroRanchDefine_1.FloroRanchSelectRaceData(i, this.HAu));
    }
    this.ZEu.RefreshByData(t);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(5));
  }
}
exports.FloroRanchDungeonSelectRightPanel = FloroRanchDungeonSelectRightPanel;
//# sourceMappingURL=FloroRanchDungeonSelectRightPanel.js.map