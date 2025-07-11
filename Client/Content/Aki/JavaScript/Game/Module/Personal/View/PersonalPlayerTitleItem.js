"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalPlayerTitleItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PersonalPlayerTitleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ihc = undefined;
    this.rhc = undefined;
    this.Yco = undefined;
    this.kqe = () => {
      if (this.Yco) {
        this.Yco(this.GridIndex, this.ihc);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[1, this.kqe]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(4);
    this.rhc = new PlayerTitleItem_1.PlayerTitleItem();
    this.rhc.SetIsPreview(true);
    await this.rhc.CreateThenShowByActorAsync(e.GetOwner());
  }
  Refresh(e, t, i) {
    if (e && (this.ihc = e, this.GridIndex = i, this.BNe(e), this.SetToggleState(t), this.RefreshState(e), this.rhc)) {
      i = ModelManager_1.ModelManager.PersonalModel.GetSex();
      this.rhc.Refresh(e.PlayerTitleId, e.StarLevel, i);
    }
  }
  BNe(e) {
    this.GetItem(0).SetUIActive(e.GetIsShowRedDot());
  }
  SetToggleCallBack(e) {
    this.Yco = e;
  }
  SetToggleState(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(1).SetToggleState(e);
  }
  OnSelected(e) {
    var t;
    this.SetToggleState(true);
    if (this.ihc.GetIsShowRedDot()) {
      (t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord) ?? new Map()).set(this.ihc.PlayerTitleId, false);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord, t);
      this.GetItem(0).SetUIActive(false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerTitleRefreshRedDot);
    }
  }
  OnDeselected(e) {
    this.SetToggleState(false);
  }
  RefreshState(e) {
    var t = this.GetItem(3);
    var i = this.GetItem(2);
    t?.SetUIActive(!e.IsUnLock);
    var t = ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData();
    i?.SetUIActive(e.PlayerTitleId === t?.CurPlayerTitleId);
  }
}
exports.PersonalPlayerTitleItem = PersonalPlayerTitleItem;
//# sourceMappingURL=PersonalPlayerTitleItem.js.map