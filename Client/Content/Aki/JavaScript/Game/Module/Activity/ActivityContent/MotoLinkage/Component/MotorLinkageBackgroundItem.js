"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorLinkageBackgroundItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const MotorLinkageStickerItem_1 = require("./MotorLinkageStickerItem");
class MotorLinkageBackgroundItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this._Dm = 0;
    this.hLt = 0;
    this.i4f = undefined;
    this.r4f = undefined;
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.i4f = new MotorLinkageStickerItem_1.MotorLinkageStickerItem();
    e.push(this.i4f.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.r4f = new MotorLinkageStickerItem_1.MotorLinkageStickerItem();
    e.push(this.r4f.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.i4f.ClickToggleCallback = () => {
      this.N8e(0);
    };
    this.r4f.ClickToggleCallback = () => {
      this.N8e(1);
    };
    this.R3a();
    this.X9f();
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh(e = false) {
    if (ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetIpConfig(this._Dm)) {
      this.R3a();
      if (!e) {
        this.SPe?.PlaySequencePurely("Start");
      }
    }
  }
  R3a() {
    var e = ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetIpConfig(this._Dm);
    if (e) {
      this.i4f?.Refresh(e.IpStickerList[0]);
      this.r4f?.Refresh(e.IpStickerList[1]);
    }
  }
  SetIpId(e) {
    this._Dm = e;
  }
  N8e(e) {
    (e === 0 ? this.r4f : this.i4f)?.SetToggleSelect(false);
    this.hLt = e;
    this.SPe?.PlayOrReplaySequenceByName("Switch");
  }
  RefreshTexture() {
    this.GetItem(1)?.SetUIActive(this.hLt === 0);
    this.GetItem(3)?.SetUIActive(this.hLt === 1);
  }
  X9f() {
    if (this.i4f && !this.i4f.IsReceived()) {
      this.i4f.SetToggleSelect(true, true);
    } else if (this.r4f && !this.r4f.IsReceived()) {
      this.r4f.SetToggleSelect(true, true);
    } else {
      this.i4f?.SetToggleSelect(true, true);
    }
    this.RefreshTexture();
  }
}
exports.MotorLinkageBackgroundItem = MotorLinkageBackgroundItem;
//# sourceMappingURL=MotorLinkageBackgroundItem.js.map