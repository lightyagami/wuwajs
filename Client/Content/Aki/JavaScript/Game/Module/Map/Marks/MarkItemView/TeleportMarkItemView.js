"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportMarkItemView = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
const TeleportMarkItemChildIconHandle_1 = require("./Handles/TeleportMarkItemChildIconHandle");
class TeleportMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
    this.Zbn = e => {
      var t = this.Holder;
      t.IsSelectThisFloor = t.GetMultiMapId() === e;
      this.OnIconPathChanged(t.IconPath);
    };
    this.uRi = e => {
      if (this.MarkConfig.MarkId === e) {
        this.OnIconPathChanged(this.Holder.IconPath);
      }
    };
    this.OnMarkItemStateChange = e => {
      if ((ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(this.Holder.MarkId)).ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable) {
        this.GetSprite(2).SetUIActive(true);
      } else {
        this.GetSprite(2).SetUIActive(false);
      }
    };
  }
  RegisterEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMarkItemShowStateChange, this.OnMarkItemStateChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapSelectMultiMap, this.Zbn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnlockTeleport, this.uRi);
  }
  UnRegisterEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMarkItemShowStateChange, this.OnMarkItemStateChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapSelectMultiMap, this.Zbn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnlockTeleport, this.uRi);
  }
  OnViewRefresh() {
    this.bl();
  }
  bl() {
    this.UpdateMultiMapFloorSelectState(true);
    this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnSafeUpdate(e, t, r) {
    this.UpdateMultiMapFloorSelectState();
  }
  UpdateMultiMapFloorSelectState(e = false) {
    var t;
    if ((this.Holder?.MapType !== 2 || !!e) && !(t = (e = this.Holder).IsSelectThisFloor, e.IsSelectThisFloor = e.GetIsSelectThisFloor(), t === e.IsSelectThisFloor)) {
      this.OnIconPathChanged(e.IconPath);
    }
  }
  OnIconPathChanged(e) {
    var t;
    if (this.MarkItemChildIconHandle !== undefined) {
      t = this.GetSprite(1);
      this.LoadIcon(t, e);
      this.MarkItemChildIconHandle.Update();
      this.MarkItemChildIconHandle.ApplyModified();
    }
  }
  OnSelectedStateChange(e) {
    if (e && (ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(this.Holder.MarkId)).ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable) {
      if (ModelManager_1.ModelManager.MapModel.IsMarkForbidGravityTeleport(this.Holder.MarkId, this.Holder.MarkType)) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MultiModeCannotTeleport");
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Map_TeleportMark_Disable_Tips");
      }
    }
  }
  CreateChildIconHandle(e) {
    return new TeleportMarkItemChildIconHandle_1.TeleportMarkItemChildIconHandle(e);
  }
}
exports.TeleportMarkItemView = TeleportMarkItemView;
//# sourceMappingURL=TeleportMarkItemView.js.map