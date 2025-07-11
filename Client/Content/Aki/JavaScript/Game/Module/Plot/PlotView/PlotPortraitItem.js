"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotPortraitItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioController_1 = require("../../../../Core/Audio/AudioController");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const MonsterDisplayById_1 = require("../../../../Core/Define/ConfigQuery/MonsterDisplayById");
const SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const PlotController_1 = require("../PlotController");
const VELOCITY_FOLLOW = 0.01;
const ARM_LENGTH_MIN = 100;
const ARM_LENGTH_MAX = 350;
const HORI_DEC_RATIO = 4;
const HORI_INC_RATIO = 0.3;
const SCALE_RATIO = 0.002;
const VO_RTPC_VALUE_MIN = -48;
const VO_RTPC_VALUE_MAX = 0;
const AUDIO_GROUP_NAME = "phone_call";
class PlotPortraitItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pzi = undefined;
    this.sKe = 0;
    this.xzi = undefined;
    this.wzi = undefined;
    this.Bzi = 0;
    this.zZt = 0;
    this.bzi = undefined;
    this.qzi = undefined;
    this.Gzi = false;
    this.SPe = undefined;
    this.Nzi = new AudioController_1.PlayResult();
    this.wk = undefined;
    this.he = undefined;
    this.Ozi = undefined;
    this.kzi = new Map([[0, "call_01"], [1, "call_02"], [2, "call_03"], [3, "call_04"]]);
    this.Fzi = new Map([[0, "Start01"], [1, "Start01"], [2, "Start02"], [3, "Start03"]]);
    this.OnTick = t => {
      if (this.Vzi()) {
        this.zZt += t;
        if (!(this.zZt < this.Bzi)) {
          this.zZt = 0;
          this.Hzi();
          this.jzi(t);
          this.Wzi();
          this.Kzi();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UINiagara], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UITexture], [12, UE.UINiagara], [13, UE.UIText], [14, UE.UIText], [15, UE.UINiagara]];
  }
  async OpenAsync(t, i) {
    this.Pzi = i;
    await this.CreateThenShowByResourceIdAsync("UiItem_PlotCall_Prefab", t, true);
  }
  async CloseAsync() {
    await this.HideAsync();
    await this.DestroyAsync();
  }
  async SwitchAsync(t) {}
  async OnCreateAsync() {
    const i = new CustomPromise_1.CustomPromise();
    if (this.Pzi.Type === 0) {
      const s = this.Pzi;
      const r = SpeakerById_1.configSpeakerById.GetConfig(s.WhoId);
      if (StringUtils_1.StringUtils.IsEmpty(r?.HeadIconAsset)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "对话人不存在或头像未配置", ["id", s.WhoId]);
        }
      } else {
        this.he = PublicUtil_1.PublicUtil.GetConfigIdByTable(0, r.Id);
        ResourceSystem_1.ResourceSystem.LoadAsync(r.HeadIconAsset, UE.Texture, t => {
          if (!ObjectUtils_1.ObjectUtils.IsValid(t)) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Plot", 26, "对话人头像资源为空", ["id", s.WhoId], ["path", r.HeadIconAsset]);
            }
          }
          this.wk = t;
          i.SetResult();
        });
        await i.Promise;
      }
    } else if (this.Pzi.Type === 5) {
      const h = this.Pzi;
      const o = MonsterDisplayById_1.configMonsterDisplayById.GetConfig(h.MonsterDisplayId);
      if (StringUtils_1.StringUtils.IsEmpty(o?.MonsterPileIconAsset)) {
        this.Ozi = PublicUtil_1.PublicUtil.GetConfigIdByTable(3, o.Id);
        this.he = PublicUtil_1.PublicUtil.GetConfigIdByTable(2, o.Id);
        ResourceSystem_1.ResourceSystem.LoadAsync(o.MonsterPileIconAsset, UE.Texture, t => {
          if (!ObjectUtils_1.ObjectUtils.IsValid(t)) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Plot", 18, "怪物半身像资源为空", ["id", h.MonsterDisplayId], ["path", o.MonsterPileIconAsset]);
            }
          }
          this.wk = t;
          i.SetResult();
        });
        await i.Promise;
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "怪物显示不存在或未配置", ["id", [h.MonsterDisplayId]]);
      }
    } else {
      var t;
      var e;
      if (this.Pzi.Type === 1) {
        t = this.Pzi;
        if (e = SpeakerById_1.configSpeakerById.GetConfig(t.WhoId)) {
          this.he = PublicUtil_1.PublicUtil.GetConfigIdByTable(0, e.Id);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "对话人不存在", ["id", t.WhoId]);
        }
      }
    }
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.Qzi();
    this.sKe = PlotController_1.PlotController.AddTick(this.OnTick);
    switch (this.Pzi.Type) {
      case 0:
        this.Xzi();
        break;
      case 1:
        this.$zi();
        break;
      case 2:
        this.Yzi();
        break;
      case 3:
        this.Jzi();
        break;
      case 5:
        this.zzi();
    }
  }
  async OnShowAsyncImplementImplement() {
    this.Gzi = true;
    var t = new CustomPromise_1.CustomPromise();
    if (this.Nzi.PlayingIds.length !== 0) {
      AudioController_1.AudioController.StopEvent(this.Nzi, true);
    }
    AudioController_1.AudioController.SetSwitch(AUDIO_GROUP_NAME, this.kzi.get(this.Pzi.Type), this.RootActor);
    AudioController_1.AudioController.PostEventByUi(ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.CallShowAudioEvent, this.Nzi);
    var i = this.Fzi.get(this.Pzi.Type);
    if (i) {
      await this.SPe.PlaySequenceAsync(i, t);
    }
  }
  async OnHideAsyncImplementImplement() {
    AudioController_1.AudioController.PostEventByUi(ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.CallHideAudioEvent, this.Nzi);
    var t = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("Close", t);
    this.Gzi = false;
  }
  OnAfterHide() {
    PlotController_1.PlotController.RemoveTick(this.sKe);
  }
  OnBeforeDestroy() {
    this.SPe.Clear();
    this.SPe = undefined;
    this.wk = undefined;
    this.he = undefined;
    this.Ozi = undefined;
    this.zZt = 0;
    this.sKe = 0;
  }
  Xzi() {
    this.GetItem(10).SetUIActive(true);
    this.GetItem(3).SetUIActive(true);
    this.GetItem(4).SetUIActive(true);
    this.GetItem(2).SetUIActive(true);
    this.GetText(0).ShowTextNew(this.he ?? StringUtils_1.EMPTY_STRING);
    var t = this.GetTexture(1);
    var i = this.GetUiNiagara(8);
    t.SetTexture(this.wk);
    i.SetNiagaraEmitterCustomTexture("head_portrait_01", "Mask", this.wk);
    i.SetNiagaraEmitterCustomTexture("head_portrait_02", "Mask", this.wk);
    i.SetNiagaraEmitterCustomTexture("head_portrait_03", "Mask", this.wk);
    i.SetNiagaraVarFloat("Size X", t.Width);
    i.SetNiagaraVarFloat("Size Y", t.Height);
  }
  $zi() {
    this.GetItem(10).SetUIActive(true);
    this.GetItem(3).SetUIActive(true);
    this.GetItem(5).SetUIActive(true);
    this.GetText(0).ShowTextNew(this.he ?? StringUtils_1.EMPTY_STRING);
  }
  Yzi() {
    this.GetItem(10).SetUIActive(true);
    this.GetItem(6).SetUIActive(true);
    this.GetItem(2).SetUIActive(true);
  }
  Jzi() {
    this.GetItem(10).SetUIActive(true);
    this.GetItem(7).SetUIActive(true);
    this.GetItem(2).SetUIActive(true);
  }
  zzi() {
    this.GetItem(9).SetUIActive(true);
    this.GetTexture(11).SetTexture(this.wk);
    var t = this.GetUiNiagara(12);
    t.SetNiagaraEmitterCustomTexture("Frame001", "BaseTexture", this.wk);
    t.SetNiagaraEmitterCustomTexture("Frame001", "BackgroundTexture", this.wk);
    this.GetText(13).ShowTextNew(this.he ?? StringUtils_1.EMPTY_STRING);
    this.GetText(14).ShowTextNew(this.Ozi ?? StringUtils_1.EMPTY_STRING);
  }
  Qzi() {
    this.GetItem(2).SetUIActive(false);
    this.GetItem(4).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
    this.GetItem(9).SetUIActive(false);
    this.GetItem(10).SetUIActive(false);
  }
  Hzi() {
    var t = Global_1.Global.BaseCharacter.D_K2_GetActorLocation();
    var i = (0, puerts_1.$ref)(undefined);
    UE.GameplayStatics.D_ProjectWorldToScreen(Global_1.Global.CharacterController, t, i, true);
    var i = (0, puerts_1.$unref)(i);
    var e = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
    this.xzi = e.ConvertPositionFromViewportToLGUICanvas(i);
    this.xzi.Y = UiLayer_1.UiLayer.UiRootItem.Height / 2;
    var e = ModelManager_1.ModelManager.CameraModel.CameraLocation;
    if (e) {
      i = Math.pow(e.X - t.X, 2) + Math.pow(e.Y - t.Y, 2) + Math.pow(e.Z - t.Z, 2);
      if ((i = Math.sqrt(i)) < ARM_LENGTH_MIN) {
        this.xzi.X -= (ARM_LENGTH_MIN - i) * HORI_DEC_RATIO;
      } else if (i > ARM_LENGTH_MAX) {
        this.xzi.X += (i - ARM_LENGTH_MAX) * HORI_INC_RATIO;
        e = MathUtils_1.MathUtils.Clamp(1 - (i - ARM_LENGTH_MAX) * SCALE_RATIO, 0.5, 1);
        if (this.wzi) {
          this.wzi.Set(e, e, e);
        } else {
          this.wzi = new UE.Vector(e);
        }
      }
    }
  }
  jzi(t) {
    var i = this.RootItem.GetAnchorOffset();
    var t = MathUtils_1.MathUtils.Clamp(t * VELOCITY_FOLLOW, 0, 1);
    var e = MathUtils_1.MathUtils.Lerp(i.X, this.xzi.X, t);
    var i = MathUtils_1.MathUtils.Lerp(i.Y, this.xzi.Y, t);
    this.RootItem.SetAnchorOffsetX(e);
    this.RootItem.SetAnchorOffsetY(i);
  }
  Wzi() {
    if (this.wzi) {
      this.RootItem.SetUIItemScale(this.wzi);
    }
  }
  Kzi() {}
  Vzi() {
    return this.Gzi && this.GetActive() && Global_1.Global.BaseCharacter !== undefined;
  }
}
exports.PlotPortraitItem = PlotPortraitItem;
//# sourceMappingURL=PlotPortraitItem.js.map