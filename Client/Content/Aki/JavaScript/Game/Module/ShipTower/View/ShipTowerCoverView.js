"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerCoverView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ShipTowerDefine_1 = require("../ShipTowerDefine");
const ShipTowerCoverItem_1 = require("./ShipTowerCoverItem");
class ShipTowerCoverView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.L8e = undefined;
    this.YGl = undefined;
    this.abc = false;
    this.JGt = (e, i) => {
      if (this.abc = i) {
        e.SureCoverChallenge();
      }
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.L8e = new ShipTowerCoverItem_1.ShipTowerCoverItem();
    this.L8e.ConfirmCallback = this.JGt;
    await this.L8e.Init(this.GetItem(0));
    this.YGl = new ShipTowerCoverItem_1.ShipTowerCoverItem();
    this.YGl.ConfirmCallback = this.JGt;
    await this.YGl.Init(this.GetItem(1));
    var e = this.GetText(2);
    var i = ShipTowerDefine_1.shipTowerTextKey.CoverTitle;
    var t = this.OpenParam.StageData.TitleKey;
    var t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t);
    var i = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(i, t);
    e.SetText(i);
  }
  OnBeforeShow() {
    var e = this.OpenParam.StageData;
    this.L8e.UpdateData(e, false);
    this.YGl.UpdateData(e, true);
  }
  OnBeforeDestroy() {
    var e;
    if (!this.abc) {
      (e = this.OpenParam.StageData).UpdateToEdit();
      ModelManager_1.ModelManager.ShipTowerModel.SetChallengeStageDataNull();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerStageUpdate, e.Id);
    }
  }
}
exports.ShipTowerCoverView = ShipTowerCoverView;
//# sourceMappingURL=ShipTowerCoverView.js.map