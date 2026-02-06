"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonMonsterView = undefined;
const ue_1 = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const TowerElementItem_1 = require("../TowerDetailUi/View/TowerElementItem");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const InstanceDungeonMonsterGrid_1 = require("./InstanceDungeonMonsterGrid");
class InstanceDungeonMonsterView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yyn = 0;
    this.Mli = undefined;
    this.H1i = undefined;
    this.j1i = () => {
      var e = new InstanceDungeonMonsterGrid_1.InstanceDungeonMonsterGrid();
      e.CurrentInstanceId = this.yyn;
      return e;
    };
    this.jli = () => {
      return new TowerElementItem_1.TowerElementItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText], [1, ue_1.UIGridLayout], [2, ue_1.UIItem], [3, ue_1.UIHorizontalLayout], [4, ue_1.UIText], [5, ue_1.UIText]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.yyn = e.InstanceId;
    var e = e.InfoType;
    switch (e) {
      case 0:
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "PrefabTextItem_3355612697_Text");
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "PrefabTextItem_2611535427_T");
        break;
      case 1:
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "WeeklyBossInfo_Text");
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "WeeklyBossInfo_Title");
    }
    this.GetText(0).ShowTextNew(ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.yyn).MonsterTips);
    this.H1i = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.j1i);
    this.Mli = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.jli);
  }
  OnBeforeShow() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.yyn);
    this.H1i.RefreshByData(e.MonsterPreview);
    if (e.RecommendElement?.length > 0) {
      this.GetItem(2)?.SetUIActive(true);
      this.Mli.RefreshByData(e.RecommendElement);
    } else {
      this.GetItem(2)?.SetUIActive(false);
    }
  }
  OnBeforeDestroy() {
    this.H1i.ClearChildren();
  }
}
exports.InstanceDungeonMonsterView = InstanceDungeonMonsterView;
//# sourceMappingURL=InstanceDungeonMonsterView.js.map