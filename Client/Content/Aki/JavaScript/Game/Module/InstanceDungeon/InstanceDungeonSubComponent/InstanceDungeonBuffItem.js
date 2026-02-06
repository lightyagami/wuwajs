"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonBuffItem = undefined;
const ue_1 = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Uth = undefined;
    this.Gli = () => {
      var e = {
        InstanceId: ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId,
        InfoType: this.Uth ? this.Uth.BuffInfoType : 0
      };
      UiManager_1.UiManager.OpenView("InstanceDungeonMonsterPreView", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText], [1, ue_1.UIButtonComponent], [2, ue_1.UIText]];
    this.BtnBindInfo = [[1, this.Gli]];
  }
  RefreshItem(e, t, i = 0) {
    this.Uth = {
      BuffText: e,
      ShowMonsterPreview: t,
      BuffInfoType: i
    };
    switch (this.Uth.BuffInfoType) {
      case 0:
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "PrefabTextItem_3585581324_Text");
        break;
      case 1:
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "WeeklyBossInfo_OuterTitle");
    }
    this.GetButton(1).RootUIComp.SetUIActive(t);
    if (e) {
      this.GetText(0).SetUIActive(true);
      this.GetText(0).ShowTextNew(e);
    } else {
      this.GetText(0).SetUIActive(false);
    }
  }
}
exports.InstanceDungeonBuffItem = InstanceDungeonBuffItem;
//# sourceMappingURL=InstanceDungeonBuffItem.js.map