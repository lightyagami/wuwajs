"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PersonalPlayerTitleItem = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PlayerTitleItem_1 = require("../../Common/PlayerTitleItem"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PersonalPlayerTitleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.ihc = void 0, this.rhc = void 0, this.Yco = void 0, this.kqe = () => {
      this.Yco && this.Yco(this.GridIndex, this.ihc)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem]
    ], this.BtnBindInfo = [
      [1, this.kqe]
    ]
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(4);
    this.rhc = new PlayerTitleItem_1.PlayerTitleItem, this.rhc.SetIsPreview(!0), await this.rhc.CreateThenShowByActorAsync(e.GetOwner())
  }
  Refresh(e, t, i) {
    e && (this.ihc = e, this.GridIndex = i, this.BNe(e), this.SetToggleState(t), this.RefreshState(e), this.rhc) && (i = ModelManager_1.ModelManager.PersonalModel.GetSex(), this.rhc.Refresh(e.PlayerTitleId, e.StarLevel, i))
  }
  BNe(e) {
    this.GetItem(0).SetUIActive(e.GetIsShowRedDot())
  }
  SetToggleCallBack(e) {
    this.Yco = e
  }
  SetToggleState(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(1).SetToggleState(e)
  }
  OnSelected(e) {
    var t;
    this.SetToggleState(!0), this.ihc.GetIsShowRedDot() && ((t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord) ?? new Map).set(this.ihc.PlayerTitleId, !1), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord, t), this.GetItem(0).SetUIActive(!1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerTitleRefreshRedDot))
  }
  OnDeselected(e) {
    this.SetToggleState(!1)
  }
  RefreshState(e) {
    var t = this.GetItem(3),
      i = this.GetItem(2),
      t = (t?.SetUIActive(!e.IsUnLock), ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData());
    i?.SetUIActive(e.PlayerTitleId === t?.CurPlayerTitleId)
  }
}
exports.PersonalPlayerTitleItem = PersonalPlayerTitleItem;
//# sourceMappingURL=PersonalPlayerTitleItem.js.map