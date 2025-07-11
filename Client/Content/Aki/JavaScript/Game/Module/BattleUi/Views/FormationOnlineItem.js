"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationOnlineItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class FormationOnlineItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.fht = undefined;
    this.pht = undefined;
    this.yrh = undefined;
    this.vht = false;
    this.Mht = false;
    this.Eht = false;
    this.Sht = undefined;
    this.CreateThenShowByResourceIdAsync("UiItem_FigthRoleHeadOnline", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.Sht = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(1));
    this.yht();
  }
  OnBeforeDestroy() {
    this.Sht.Clear();
    this.Sht = undefined;
  }
  SetNameText(t) {
    if (this.InAsyncLoading()) {
      this.fht = t;
    } else {
      this.fht = t;
      this.Erh(t);
    }
  }
  async Erh(t) {
    var i = this.GetText(3);
    if (StringUtils_1.StringUtils.IsEmpty(t)) {
      i.SetUIActive(false);
    } else {
      i.SetUIActive(true);
      i.SetText(t);
    }
    return Promise.resolve();
  }
  SetOnlineNumber(t) {
    var i;
    if (this.InAsyncLoading()) {
      this.pht = t;
    } else {
      i = this.GetTexture(2);
      if (t < 0) {
        i.SetUIActive(false);
      } else {
        i.SetUIActive(true);
        t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(`FormationOnline${t}PIcon`);
        this.SetTextureByPath(t, i);
      }
    }
  }
  SetIsGrayByOtherControl(t) {
    var i;
    if (this.InAsyncLoading()) {
      this.vht = t;
    } else {
      (i = this.GetTexture(2)).SetChangeColor(t, i.changeColor);
      (i = this.GetText(3)).SetChangeColor(t, i.changeColor);
    }
  }
  SetNetWeak(t) {
    if (this.InAsyncLoading()) {
      this.Mht = t;
    } else {
      this.GetItem(0).SetUIActive(t);
    }
  }
  RefreshPlayStationItem(t) {
    if (this.InAsyncLoading()) {
      this.yrh = t;
    } else {
      this.yrh = t;
      this.Trh(t);
      this.sPa(t);
      if (this.fht) {
        this.Erh(this.fht);
      }
    }
  }
  sPa(t) {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      t = t !== "";
      this.GetItem(5)?.SetUIActive(!t);
    } else {
      this.GetItem(5)?.SetUIActive(false);
    }
  }
  async Trh(t) {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      t = t !== "";
      this.GetItem(4)?.SetUIActive(t);
      await Promise.resolve();
    } else {
      this.GetItem(4)?.SetUIActive(false);
    }
  }
  SetNetDisconnect(t) {
    if (this.InAsyncLoading()) {
      this.Eht = t;
    } else {
      this.Iht(t);
    }
  }
  Iht(t) {
    this.GetItem(1).SetUIActive(t);
    this.Sht.StopCurrentSequence();
    if (t) {
      this.Sht.PlayLevelSequenceByName("AutoLoop");
    }
  }
  yht() {
    if (this.fht !== undefined) {
      this.SetNameText(this.fht);
      this.fht = undefined;
    }
    if (this.pht) {
      this.SetOnlineNumber(this.pht);
      this.pht = undefined;
    }
    if (this.yrh !== undefined) {
      this.RefreshPlayStationItem(this.yrh);
      this.yrh = undefined;
    }
    this.GetItem(0).SetUIActive(this.Mht);
    this.Iht(this.Eht);
    this.SetIsGrayByOtherControl(this.vht);
  }
}
exports.FormationOnlineItem = FormationOnlineItem;
//# sourceMappingURL=FormationOnlineItem.js.map