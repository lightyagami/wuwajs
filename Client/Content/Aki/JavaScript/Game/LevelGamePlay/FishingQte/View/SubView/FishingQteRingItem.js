"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingQteRingItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LevelSequencePlayer_1 = require("../../../../Module/Common/LevelSequencePlayer");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const FishingQteDefine_1 = require("../../FishingQteDefine");
const FishingQteRingBgItem_1 = require("./Ring/FishingQteRingBgItem");
const FishingQteRingQteItem_1 = require("./Ring/FishingQteRingQteItem");
const YAW_MAX_ANGLE = FishingQteDefine_1.FISHINGQTE_RING_ANGLE * 2;
class FishingQteRingItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RingConfig = undefined;
    this.GameInfo = undefined;
    this.RingInfo = undefined;
    this.RingBg = undefined;
    this.RingQte = undefined;
    this.LevelSequencePlayer = undefined;
    this.Yrn = undefined;
    this.cce = Rotator_1.Rotator.Create();
    this.XZh = 0;
    this.YZh = 0;
    this.PeriodAlphaTotalTime = 0;
    this.PeriodAlphaCurrentTime = 0;
    this.RotateMode = 0;
  }
  Init(i, t) {
    this.GameInfo = t;
    this.RingConfig = i;
    this.RingInfo = t.GetRingInfo();
    i = this.RingConfig.HiddenInterval[0] * 2 + this.RingConfig.HiddenInterval[1];
    if (i > 0) {
      this.PeriodAlphaTotalTime = i;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    var t = this.GetItem(1);
    this.RingBg = new FishingQteRingBgItem_1.FishingQteRingBgItem(this.RingInfo, this.RingConfig);
    i.push(this.RingBg.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(2);
    this.RingQte = new FishingQteRingQteItem_1.FishingQteRingQteItem(this.GameInfo, this.RingInfo, this.RingConfig);
    i.push(this.RingQte.CreateThenShowByActorAsync(t.GetOwner()));
    this.Yrn = this.GetItem(0);
    this.Yrn.SetUIRelativeRotation(Rotator_1.Rotator.Create().ToUeRotator());
    await Promise.all(i);
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear();
    this.LevelSequencePlayer = undefined;
  }
  InitRing() {
    this.RingInfo.ClearValidAreas();
    this.RingBg.SpawnBgArea();
    this.RingQte.InitAllQteAreas();
    var i = this.GameInfo.CursorSpeed;
    var t = this.GameInfo.RingSpeed;
    if (i > 0 && t > 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 37, "[FishingQte] 速度配置错误,同时存在指针速度和转盘速度");
      }
    } else {
      this.Ot_(i > 0 ? 0 : 1);
    }
  }
  OnAreaClick(i, t) {
    switch (i) {
      case 0:
        this.RingBg.PlayAnim("Fail");
        this.RingQte.PlayAnim("Fail");
        break;
      case 1:
        this.RingQte.PlayAnim("Success");
        this.PeriodAlphaCurrentTime = 0;
        break;
      case 2:
        this.RingQte.PlayAnim("PerfectQte");
        this.PeriodAlphaCurrentTime = 0;
    }
  }
  OnArrowStayAreaUpdate(i) {
    var t = this.RingInfo.GetValidAreas();
    if (!(i < 0) && !(i >= t.length)) {
      t = t[i];
      this.XZh = -Math.max(t.StartCellIndex - 1, 0) * FishingQteDefine_1.FISHINGQTE_SINGLECELL_ANGLE;
      this.YZh = -t.EndCellIndex * FishingQteDefine_1.FISHINGQTE_SINGLECELL_ANGLE;
      if (this.YZh >= this.XZh) {
        this.YZh -= 360;
      }
      switch (t.ArrowDirection) {
        case 0:
          this.cce.Yaw = this.XZh;
          break;
        case 1:
          this.cce.Yaw = this.YZh;
      }
      this.Yrn?.SetUIRelativeRotation(this.cce.ToUeRotator());
    }
  }
  OnTick(i) {
    if (!this.GameInfo.IsGamePause()) {
      var t = this.GameInfo.CursorSpeed;
      var e = this.GameInfo.RingSpeed;
      var t = this.RotateMode === 0 ? t : e;
      var e = this.RingInfo.ArrowDirection === 0 ? -1 : 1;
      var s = i / CommonDefine_1.MILLIONSECOND_PER_SECOND;
      this.cce.Yaw = this.Gt_(e, t, s);
      switch (this.RotateMode) {
        case 0:
          this.Yrn?.SetUIRelativeRotation(this.cce.ToUeRotator());
          this.RingInfo.CurrentArrowStayCellIndex = this.Ft_();
          break;
        case 1:
          this.RingQte.GetRootItem().SetUIRelativeRotation(this.cce.ToUeRotator());
          this.RingInfo.CurrentArrowStayCellIndex = FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT - this.Ft_() + 1;
      }
      if (this.PeriodAlphaTotalTime > 0) {
        var h = this.Nt_(this.PeriodAlphaCurrentTime);
        for (const n of this.RingInfo.GetQteAreas().keys()) {
          this.RingQte.GetQteAreaTexture(n).SetAlpha(h);
        }
        for (const r of this.RingInfo.GetPerfectAreas().keys()) {
          this.RingQte.GetPerfectAreaTexture(r).SetAlpha(h);
        }
        this.PeriodAlphaCurrentTime += i;
        if (this.PeriodAlphaCurrentTime >= this.PeriodAlphaTotalTime) {
          this.PeriodAlphaCurrentTime = 0;
        }
      }
    }
  }
  Gt_(i, t, e) {
    let s = this.cce.Yaw;
    if (this.RingInfo.IsWholeRing) {
      s += i * (t * e);
    } else {
      if ((s += i * (t * e)) < this.YZh) {
        s = this.YZh + 1;
        this.RingInfo.OnArrowDirectionReverse();
      }
      if (s > this.XZh) {
        s = this.XZh;
        this.RingInfo.OnArrowDirectionReverse();
      }
    }
    if (s > 0) {
      s -= FishingQteDefine_1.FISHINGQTE_RING_ANGLE;
    }
    return s % YAW_MAX_ANGLE;
  }
  Ft_() {
    var i = Math.abs(this.cce.Yaw) % FishingQteDefine_1.FISHINGQTE_RING_ANGLE;
    return Math.floor(i / FishingQteDefine_1.FISHINGQTE_SINGLECELL_ANGLE) + 1;
  }
  Nt_(i) {
    var t = this.RingConfig.HiddenInterval[0];
    var e = this.RingConfig.HiddenInterval[1];
    var s = this.RingConfig.HiddenInterval[2];
    var h = (e - s) / 2;
    if (i < t) {
      return 1;
    } else if (i < t + h) {
      return 1 - (i - t) / h;
    } else if (i < t + h + s) {
      return 0;
    } else if (i < t + e) {
      return (i - t - h - s) / h;
    } else {
      return 1;
    }
  }
  Ot_(i) {
    this.RotateMode = i;
    switch (this.RotateMode) {
      case 0:
        break;
      case 1:
        var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_ControlPointLock");
        this.SetTextureByPath(t, this.GetTexture(3));
        this.RingQte.GetRootItem().SetUIRelativeRotation(Rotator_1.Rotator.Create().ToUeRotator());
    }
  }
  SpawnContinuousArea(i, t = 1) {
    this.RingQte.SpawnContinuousArea(i, t);
  }
}
exports.FishingQteRingItem = FishingQteRingItem;
//# sourceMappingURL=FishingQteRingItem.js.map