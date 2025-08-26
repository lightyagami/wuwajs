"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchPopupRewardItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BezierCurve_1 = require("../../../../Render/Utils/BezierCurve");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const FloroRanchDefine_1 = require("../../FloroRanchDefine");
class FloroRanchPopupRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IsPlayingBezier = false;
    this.RRu = false;
    this.ST1 = undefined;
    this.dYi = Vector_1.Vector.Create();
    this.fDe = Vector_1.Vector.Create();
    this.cz = Vector_1.Vector.Create();
    this.vSu = new BezierCurve_1.BeizerQuadraticCurve();
    this.ae = 0;
    this.r1t = 0;
    this.c_e = 0;
    this.Iqu = undefined;
    this.Tqu = undefined;
    this.SPe = undefined;
    this.YKu = undefined;
    this.Nqa = undefined;
    this.Fqa = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIArtText]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetArtText(2);
    this.YKu = e.GetArtTextData();
    var e = [];
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("TextData_NumH2");
    e.push(ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.LGUIArtTextData, (e, i) => {
      if (!e || !e.IsValid()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 78, "FloroRanchPopupRewardItem 找不到artTextData：TextData_NumH2");
        }
      }
      this.Nqa = e;
    }));
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("TextData_NumH3");
    e.push(ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.LGUIArtTextData, (e, i) => {
      if (!e || !e.IsValid()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 78, "FloroRanchPopupRewardItem 找不到artTextData：TextData_NumH3");
        }
      }
      this.Fqa = e;
    }));
    await Promise.all(e);
  }
  InitCurve(e) {
    this.ST1 = e;
  }
  Tick(e) {
    var i;
    if (this.RRu) {
      this.ae += e;
      i = this.ST1.GetFloatValue(this.ae / this.r1t);
      Vector_1.Vector.Lerp(this.dYi, this.fDe, i, this.cz);
      this.GetRootItem().SetUIWorldLocation(this.cz.ToUeVectorOld());
      if (this.ae >= this.r1t + this.c_e || ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        this.GetRootItem().SetUIWorldLocation(this.fDe.ToUeVectorOld());
        this.wRu();
        this.Tqu?.();
      }
    } else if (this.IsPlayingBezier && (i = this.ae / this.r1t, i = this.vSu.GetPos((i *= i) > 1 ? 1 : i), this.GetRootItem().SetUIWorldLocation(i.ToUeVectorOld()), this.ae += e, this.ae >= this.r1t || ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip)) {
      this.GetRootItem().SetUIWorldLocation(this.fDe.ToUeVectorOld());
      this.Iqu?.();
      this.ySu();
    }
  }
  PopupReward(e, i, t) {
    if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      t?.();
    } else {
      this.dYi = e;
      this.fDe = i;
      this.ae = 0;
      this.r1t = FloroRanchDefine_1.FLORO_RANCH_REWARD_POPUP_TIME;
      this.c_e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetPopupRewardStayTime();
      this.GetArtText(2).SetUIActive(true);
      this.RRu = true;
      this.GetRootItem().SetUIWorldLocation(e.ToUeVectorOld());
      this.Tqu = t;
    }
  }
  PlayBezierCurve(e, i, t) {
    if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
      t?.();
    } else {
      this.dYi = e;
      this.fDe = i;
      this.ae = 0;
      this.r1t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetBezierCurveTime();
      this.GetArtText(2).SetUIActive(false);
      e = this.fDe.X > this.dYi.X ? FloroRanchDefine_1.floroRanchRewardRightDirection : FloroRanchDefine_1.floroRanchRewardLeftDirection;
      this.vSu.InitByFactor(this.dYi, this.fDe, e, FloroRanchDefine_1.FLORO_RANCH_BEZIER_FACTOR, FloroRanchDefine_1.FLORO_RANCH_BEZIER_CENTER_FACTOR);
      this.IsPlayingBezier = true;
      this.Iqu = t;
    }
  }
  Refresh(e, i) {
    var t = this.GetArtText(2);
    t.SetUIActive(true);
    t.SetText(e.toString());
    if (e >= FloroRanchDefine_1.FLORO_RANCH_POPUP_REWARD_RED_COIN_COUNT) {
      t.SetArtTextData(this.Fqa);
    } else if (e >= FloroRanchDefine_1.FLORO_RANCH_POPUP_REWARD_YELLOW_COIN_COUNT) {
      t.SetArtTextData(this.Nqa);
    } else {
      t.SetArtTextData(this.YKu);
    }
    this.GetTexture(0).SetUIActive(false);
    this.SetTextureByPath(i, this.GetTexture(1));
  }
  PlayShowRewardAnim() {
    this.SPe ||= new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.GetRootItem().SetUIActive(true);
    this.SPe.PlayLevelSequenceByName("Start");
  }
  async PlayHideRewardAnim() {
    this.SPe ||= new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    await this.SPe.PlaySequenceAsync("Hide", new CustomPromise_1.CustomPromise()).then(() => {
      this.GetRootItem().SetUIActive(false);
    });
  }
  async PlayCloseRewardAnim() {
    this.SPe ||= new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    await this.SPe.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise()).then(() => {
      this.GetRootItem().SetUIActive(false);
    });
  }
  FollowPosition(e) {
    this.GetRootItem().SetUIWorldLocation(e.ToUeVectorOld());
  }
  OnBeforeDestroy() {
    this.ySu();
    this.wRu();
  }
  ySu() {
    this.ae = 0;
    this.r1t = 0;
    this.Iqu = undefined;
    this.IsPlayingBezier = false;
  }
  wRu() {
    this.ae = 0;
    this.r1t = 0;
    this.RRu = false;
  }
}
exports.FloroRanchPopupRewardItem = FloroRanchPopupRewardItem;
//# sourceMappingURL=FloroRanchPopupRewardItem.js.map