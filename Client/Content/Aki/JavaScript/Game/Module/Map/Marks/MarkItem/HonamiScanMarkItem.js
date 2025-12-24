"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiScanMarkItem = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HonamiScanMarkItemView_1 = require("../MarkItemView/HonamiScanMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class HonamiScanMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, t, i, r, a, s = 2) {
    super(e, t, i, r, a, s);
    this.InnerView = undefined;
    this.IsDirty = false;
    this.Kvm = "";
  }
  OnInitialize() {
    super.OnInitialize();
    this.yn_();
    this.$ff();
  }
  OnUpdate(e) {
    super.OnUpdate(e);
    if (this.MapType === 1) {
      this.$ff();
    }
  }
  InitIcon() {
    this.UpdateIcon();
  }
  UpdateIcon() {
    this.Kvm = this.IsLocked ? this.MarkConfig.LockMarkPic : this.MarkConfig.UnlockMarkPic;
  }
  GetMarkItemViewType() {
    return 29;
  }
  CreateView() {
    return new HonamiScanMarkItemView_1.HonamiScanMarkItemView(this);
  }
  get IsLocked() {
    return ModelManager_1.ModelManager.MapModel.GetHonamiScanMarkInfo(this.MarkId) === Protocol_1.Aki.Protocol.Tom.Proto_MarkDisable;
  }
  get IconPath() {
    return this.Kvm;
  }
  set IconPath(e) {
    this.Kvm = e;
  }
  GamePlayIsFinish() {
    return ModelManager_1.ModelManager.MapModel.GetHonamiScanMarkInfo(this.MarkId) === Protocol_1.Aki.Protocol.Tom.Proto_MarkComplete;
  }
  yn_() {
    this.MarkItemEntity.GamePlay.GamePlayState = this.GamePlayIsFinish() ? 2 : 0;
  }
  $ff() {
    this.IsSelectThisFloor = this.GetIsSelectThisFloor();
  }
}
exports.HonamiScanMarkItem = HonamiScanMarkItem;
//# sourceMappingURL=HonamiScanMarkItem.js.map