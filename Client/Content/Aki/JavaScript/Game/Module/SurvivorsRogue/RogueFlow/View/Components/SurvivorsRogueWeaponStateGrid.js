"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueWeaponStateGrid = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const SurvivorsRogueUiDefine_1 = require("../../../SurvivorsRogueUiDefine");
class SurvivorsRogueWeaponStateGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.Data = undefined;
    this.IFd = -1;
    this.YP = () => {
      var i;
      if (this.Data.IsDisable) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsCombat_WeaponNoUsed");
      } else if (this.Data.IsLock) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsWeaponAttribute_WaveUnlockTips", this.Data.UnlockBatch);
      } else {
        i = {
          SkipTabType: 1,
          SkipWeaponId: this.Data.WeaponData?.ConfigId
        };
        UiManager_1.UiManager.OpenView("SurvivorsTabMainView", i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite], [7, UE.UIItem], [9, UE.UIItem], [11, UE.UIItem], [6, UE.UIItem], [8, UE.UIItem], [10, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem]];
    this.BtnBindInfo = [[0, this.YP]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(i, t, e) {
    this.Data = i;
    this.SetSelectOn(false);
    if (i.IsDisable) {
      this.Zwd();
    } else if (i.IsLock) {
      this.eLd();
    } else {
      this.tLd();
    }
  }
  Zwd() {
    this.GetItem(13).SetUIActive(true);
    this.GetItem(12).SetUIActive(false);
    this.GetText(4).SetUIActive(false);
    this.GetTexture(2).SetUIActive(false);
    var i = this.GetSprite(1).changeColor;
    this.GetSprite(1).SetChangeColor(true, i);
    this.GetSprite(5).SetUIActive(false);
    this.GetText(4).SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
  }
  eLd() {
    this.GetItem(13).SetUIActive(false);
    this.GetItem(12).SetUIActive(true);
    this.GetText(4).SetUIActive(false);
    this.GetTexture(2).SetUIActive(false);
    var i = this.GetSprite(1).changeColor;
    this.GetSprite(1).SetChangeColor(true, i);
    this.GetSprite(5).SetUIActive(false);
    var i = this.GetText(4);
    if (this.Data?.UnlockBatch !== undefined) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, "SurvivorsWeaponAttribute_WaveUnlockButton", this.Data.UnlockBatch);
    }
    this.GetItem(14).SetUIActive(this.Data?.UnlockBatch !== undefined);
    i.SetUIActive(this.Data?.UnlockBatch !== undefined);
  }
  tLd() {
    this.GetItem(13).SetUIActive(false);
    this.GetItem(12).SetUIActive(false);
    var i;
    var t;
    var e;
    var r = this.Data.WeaponData;
    if (r && (i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(r.ConfigId), t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponEvolve(r.GetCurrentEvolveId()), i) && t && (t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetQualityConfig(t.Quality))) {
      e = this.GetText(4);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, SurvivorsRogueUiDefine_1.SURVIVORS_LV_KEY, r.Data.F6n);
      e.SetUIActive(true);
      this.GetItem(14).SetUIActive(true);
      this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(2));
      r = UE.Color.FromHex(t.WeaponColor);
      e = this.GetSprite(1).changeColor;
      this.GetSprite(1).SetChangeColor(false, e);
      this.GetSprite(5).SetChangeColor(true, r);
      this.GetSprite(5).SetUIActive(true);
      if (this.Data.BondPosition === -1) {
        this.SetConnected(true, 0);
      } else if (this.Data.BondPosition === 1) {
        this.SetConnected(false, 0);
      } else {
        this.SetDisConnected();
      }
    }
  }
  SetSelectOn(i) {
    this.GetItem(3).SetUIActive(i);
    if (i) {
      this.SPe.PlayOrReplaySequenceByName("PreArm");
    } else {
      this.SPe.StopSequenceByKey("PreArm", false, true);
    }
  }
  SetLevelUp() {
    this.SPe.StopSequenceByKey("PreArm", false, true);
    this.SPe.PlayOrReplaySequenceByName("LevelUp");
  }
  SetSingleAnim(i) {
    this.SPe.StopCurrentSequence(false, true);
    this.SPe.PlayOrReplaySequenceByName(i);
  }
  SetConnected(i, t) {
    this.SetDisConnected();
    this.IFd = (i ? [7, 9, 11] : [6, 8, 10])[t];
    this.GetItem(this.IFd)?.SetUIActive(true);
    this.SPe.PlayOrReplaySequenceByName("Connect");
  }
  SetDisConnected() {
    if (this.IFd >= 0) {
      this.GetItem(this.IFd)?.SetUIActive(false);
    }
    this.IFd = -1;
  }
  SetQualityById(i) {
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetQualityConfig(i);
    if (i) {
      i = UE.Color.FromHex(i.WeaponColor);
      this.GetSprite(5).SetChangeColor(true, i);
    }
  }
  GetKey(i, t) {
    return i.WeaponData?.ConfigId ?? 0;
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var t = this.GetButton(0)?.GetRootComponent();
    if (t) {
      return [t, t];
    } else {
      return undefined;
    }
  }
}
exports.SurvivorsRogueWeaponStateGrid = SurvivorsRogueWeaponStateGrid;
//# sourceMappingURL=SurvivorsRogueWeaponStateGrid.js.map