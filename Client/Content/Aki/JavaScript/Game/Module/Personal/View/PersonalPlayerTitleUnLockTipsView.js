"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalPlayerTitleUnLockTipsView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
const CLOSE_TIME = 4000;
class PersonalPlayerTitleUnLockTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.rhc = undefined;
    this.Ybe = 0;
    this.vNi = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.rhc = new PlayerTitleItem_1.PlayerTitleItem();
    this.rhc.SetIsPreview(true);
    await this.rhc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    var e;
    var i = this.OpenParam;
    if (i === undefined) {
      this.CloseMe();
    } else {
      e = ModelManager_1.ModelManager.PersonalModel.GetSex();
      this.rhc.Refresh(i.PlayerTitleId, i.StarLevel, e);
    }
  }
  OnTick(e) {
    if (!this.vNi) {
      this.Ybe += e;
      if (this.Ybe >= CLOSE_TIME) {
        this.vNi = true;
        this.CloseMe();
      }
    }
  }
}
exports.PersonalPlayerTitleUnLockTipsView = PersonalPlayerTitleUnLockTipsView;
//# sourceMappingURL=PersonalPlayerTitleUnLockTipsView.js.map