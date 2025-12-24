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
    this.KDm = 0;
    this.hLt = 0;
    this.a2f = undefined;
    this.h2f = undefined;
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.a2f = new MotorLinkageStickerItem_1.MotorLinkageStickerItem();
    e.push(this.a2f.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.h2f = new MotorLinkageStickerItem_1.MotorLinkageStickerItem();
    e.push(this.h2f.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.a2f.ClickToggleCallback = () => {
      this.N8e(0);
    };
    this.h2f.ClickToggleCallback = () => {
      this.N8e(1);
    };
    this.R3a();
    this.uNf();
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh(e = false) {
    if (ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetIpConfig(this.KDm)) {
      this.R3a();
      if (!e) {
        this.SPe?.PlaySequencePurely("Start");
      }
    }
  }
  R3a() {
    var e = ConfigManager_1.ConfigManager.ActivityMotorLinkageConfig.GetIpConfig(this.KDm);
    if (e) {
      this.a2f?.Refresh(e.IpStickerList[0]);
      this.h2f?.Refresh(e.IpStickerList[1]);
    }
  }
  SetIpId(e) {
    this.KDm = e;
  }
  N8e(e) {
    (e === 0 ? this.h2f : this.a2f)?.SetToggleSelect(false);
    this.hLt = e;
    this.SPe?.PlayOrReplaySequenceByName("Switch");
  }
  RefreshTexture() {
    this.GetItem(1)?.SetUIActive(this.hLt === 0);
    this.GetItem(3)?.SetUIActive(this.hLt === 1);
  }
  uNf() {
    if (this.a2f && !this.a2f.IsReceived()) {
      this.a2f.SetToggleSelect(true, true);
    } else if (this.h2f && !this.h2f.IsReceived()) {
      this.h2f.SetToggleSelect(true, true);
    } else {
      this.a2f?.SetToggleSelect(true, true);
    }
    this.RefreshTexture();
  }
}
exports.MotorLinkageBackgroundItem = MotorLinkageBackgroundItem;
//# sourceMappingURL=MotorLinkageBackgroundItem.js.map