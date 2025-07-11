"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonBuffItem = undefined;
const ue_1 = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
class InstanceDungeonBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Uth = undefined;
    this.Gli = () => {
      UiManager_1.UiManager.OpenView("InstanceDungeonMonsterPreView", ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText], [1, ue_1.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.Gli]];
  }
  OnStart() {
    if (this.Uth) {
      this.RefreshItem(this.Uth.BuffText, this.Uth.ShowMonsterPreview);
    }
  }
  RefreshItem(e, s) {
    if (this.InAsyncLoading()) {
      this.Uth = {
        BuffText: e,
        ShowMonsterPreview: s
      };
    } else {
      this.GetButton(1).RootUIComp.SetUIActive(s);
      if (e) {
        this.GetText(0).SetUIActive(true);
        this.GetText(0).ShowTextNew(e);
      } else {
        this.GetText(0).SetUIActive(false);
      }
    }
  }
}
exports.InstanceDungeonBuffItem = InstanceDungeonBuffItem;
//# sourceMappingURL=InstanceDungeonBuffItem.js.map