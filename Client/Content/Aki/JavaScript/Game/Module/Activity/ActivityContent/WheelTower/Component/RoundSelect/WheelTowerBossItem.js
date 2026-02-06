"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerBossItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const MS_PER_SEC = 1000;
const HP_BAR_ANIMATION_SPEED_MULTIPLE = 1.5;
const roundBgDefine = ["/Game/Aki/UI/UIResources/UiActivity/Atlas/ActivityMowingTower/MowingTower30/SP_RoundNumBg.SP_RoundNumBg", "/Game/Aki/UI/UIResources/UiActivity/Atlas/ActivityMowingTower/MowingTower30/SP_RoundNumBgYellow.SP_RoundNumBgYellow", "/Game/Aki/UI/UIResources/UiActivity/Atlas/ActivityMowingTower/MowingTower30/SP_RoundNumBgRed.SP_RoundNumBgRed"];
class WheelTowerBossItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.vrf = 0;
    this.WYl = undefined;
    this.yRf = undefined;
    this.It_ = undefined;
    this.ije = () => {
      this.WYl?.(this.GridIndex, this.vrf);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UIText], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UIItem], [11, UE.UISprite], [12, UE.UIText], [13, UE.UIItem]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  async OnBeforeStartAsync() {
    this.It_ = new TagItem();
    await this.It_.CreateThenShowByActorAsync(this.GetItem(13).GetOwner());
  }
  OnStart() {
    this.GetItem(3)?.SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.SRf();
  }
  Refresh(e, i, t) {
    this.nOe(e, t);
    if (e.StartPercent !== undefined) {
      const s = this.GetSprite(9);
      s.SetUIActive(true);
      const r = e.StartPercent / 100;
      const o = e.BossInfo.HpPercentage / 100;
      s.SetFillAmount(r);
      let i = 0;
      this.SRf();
      this.yRf = TimerSystem_1.GameplayTimerSystem.Forever(e => {
        i = MathUtils_1.MathUtils.Clamp(i + e * HP_BAR_ANIMATION_SPEED_MULTIPLE / MS_PER_SEC, 0, 1);
        s.SetFillAmount(MathUtils_1.MathUtils.Lerp(r, o, i));
        if (i >= 1) {
          this.SRf();
        }
      }, TimerSystem_1.MIN_TIME);
    }
  }
  SRf() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.yRf)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.yRf);
    }
  }
  nOe(e, i) {
    var e = e.BossInfo;
    this.vrf = e.WaveConfigId;
    var t = ConfigManager_1.ConfigManager.WheelTowerConfig.GetWaveConfigById(e.WaveConfigId);
    this.GetText(2)?.ShowTextNew(t.Name);
    this.PMf(i + 1);
    this.SetTextureShowUntilLoaded(t.Icon, this.GetTexture(7));
    var i = e.HpPercentage;
    this.GetText(5)?.SetText(i + "%");
    this.GetSprite(4)?.SetFillAmount(i / 100);
    var i = e.HpPercentage <= 0;
    this.SetFinished(i);
    this.GetItem(8)?.SetUIActive(false);
    this.It_?.Refresh(t.TagIdList[0]);
    var i = ModelManager_1.ModelManager.WheelTowerModel.EndlessMode;
    this.GetItem(10)?.SetUIActive(i);
    if (i) {
      this.GetText(12)?.SetText("R" + e.Round);
      this.Z9f(e.Round);
    }
  }
  Z9f(e) {
    e -= 1;
    let i = undefined;
    i = e < roundBgDefine.length ? roundBgDefine[e] : roundBgDefine[roundBgDefine.length - 1];
    this.SetSpriteByPath(i, this.GetSprite(11), false);
  }
  PMf(e) {
    this.GetText(1)?.SetText(e.toString());
  }
  SetFinished(e) {
    this.GetItem(6)?.SetUIActive(e);
    var i = this.GetTexture(7);
    i?.SetChangeColor(e, i.changeColor);
  }
  SetTagVisible(e) {
    this.It_?.SetUiActive(e);
  }
  SetCurrentChallenge(e) {
    this.GetItem(8)?.SetUIActive(e);
  }
  SetClickCallback(e) {
    this.WYl = e;
  }
}
exports.WheelTowerBossItem = WheelTowerBossItem;
class TagItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UISprite]];
  }
  Refresh(e) {
    e = ConfigManager_1.ConfigManager.WheelTowerConfig.GetTagConfigByTagId(e);
    this.GetText(1).ShowTextNew(e.Name);
    this.GetSprite(0).SetColor(UE.Color.FromHex(e.Color));
    this.SetSpriteByPath(e.Path, this.GetSprite(2), false);
  }
}
//# sourceMappingURL=WheelTowerBossItem.js.map