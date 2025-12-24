"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformSystemUiState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const NpcPerformBaseState_1 = require("./NpcPerformBaseState");
const NpcPerformSequence_1 = require("./NpcPerformSequence/NpcPerformSequence");
const STAND_BY_MONTAGE_CD = 20;
const SWITCH_MONATGE_CD = 2000;
class MontageInfo {
  constructor(t) {
    var e;
    this.Path = undefined;
    this.Asset = undefined;
    this.State = undefined;
    if (typeof t == "string" || t === undefined) {
      this.Path = t;
    } else if (t.Type === "Asset") {
      this.Path = t.Asset;
    } else if (t.Type === "Registered") {
      e = t.MontageId.MontageId;
      t = t.MontageId.IsAbp ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(e) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(e);
      this.Path = t?.ActionMontage;
      this.State = {
        InitStateName: t?.InitState,
        EndStateName: t?.EndState
      };
    }
  }
  TryLoadAsset() {
    if (!this.Asset?.IsValid()) {
      if (MontageInfo.IsPathValid(this.Path)) {
        ResourceSystem_1.ResourceSystem.LoadAsync(this.Path, UE.AnimMontage, t => {
          if (t?.IsValid()) {
            this.Asset = t;
          }
        });
      }
    }
  }
  static IsPathValid(t) {
    return t !== undefined && t !== "" && t !== "None" && t !== "Empty";
  }
}
class NpcShopPerformParams {
  constructor() {
    this.EnterMontageInfo = undefined;
    this.StandByMontageInfo = undefined;
    this.ShopSuccessMontageInfo = undefined;
    this.SwitchMusicMontageInfo = undefined;
    this.ExitMontageInfo = undefined;
    this.EnterFlow = undefined;
    this.ShopSuccessFlow = undefined;
    this.ShopFailedFlow = undefined;
    this.UpgradeFlow = undefined;
    this.UpgradeSequencePath = undefined;
    this.FinishDeliverySequence = "";
    this.ShowNpcWhilePlayingSequence = false;
  }
  TryLoadAllMontage() {
    this.EnterMontageInfo?.TryLoadAsset();
    this.StandByMontageInfo?.TryLoadAsset();
    this.ShopSuccessMontageInfo?.TryLoadAsset();
    this.SwitchMusicMontageInfo?.TryLoadAsset();
    this.ExitMontageInfo?.TryLoadAsset();
  }
}
class NpcPerformSystemUiState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments);
    this.HGf = undefined;
    this.Htr = IComponent_1.ENpcUiInteractType.AntiqueShop;
    this.uKo = undefined;
    this._Ko = false;
    this.mMo = 0;
    this.jtr = undefined;
    this.Wtr = [];
    this.Ktr = -0;
    this.Qtr = -0;
    this.Xtr = -0;
    this.$tr = -0;
    this.rHs = 0;
    this.oHs = 0;
    this.pd_ = 0;
    this.nir = new Map();
    this.FQe = t => {
      if (this.uKo) {
        if (this.uKo === t) {
          this._Ko = true;
          EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
          this.jGf();
        }
      } else {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
      }
    };
    this.$Ge = t => {
      if (this.uKo) {
        if (this.uKo === t) {
          this.sir();
          this.StateMachine.Switch(1);
        }
      } else {
        this.kre();
      }
    };
    this.xdi = (t, e) => {
      if (this.uKo && t === this.mMo) {
        if ((t = ModelManager_1.ModelManager.PlotModel).IsInPlot && t.PlotConfig.PlotLevel === "LevelD") {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("NPC", 36, "[NpcPerformSystemUiState]当前正在播放D级剧情，不会再播放购买成功的D级剧情", ["EntityId", this.Owner.Id]);
          }
        } else if ((t = Time_1.Time.WorldTime) < this.oHs) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("NPC", 36, "[NpcPerformSystemUiState]处于冷却间隔中，无法再次播放购买成功D级剧情", ["worldTime", t], ["CanPlayBuySuccessTimeStamp", this.oHs], ["BuySuccessNpcDialogueTimeInterval", this.rHs]);
          }
        } else {
          this.oHs = t + this.rHs;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("NPC", 36, "[NpcPerformSystemUiState]当购买成功时播放提交成功动作 ShopSuccessMontage", ["EntityId", this.Owner.Id], ["worldTime", t], ["BuySuccessNpcDialogueTimeInterval", this.rHs], ["CanPlayBuySuccessTimeStamp", this.oHs]);
          }
          this._ir(this.HGf?.ShopSuccessFlow, this.uKo, true);
          this.uir();
        }
      }
    };
    this.UPl = () => {
      if (this.Htr === IComponent_1.ENpcUiInteractType.Gramophone && !!this.HGf?.SwitchMusicMontageInfo?.Asset?.IsValid() && !(Time_1.Time.WorldTime - this.pd_ < SWITCH_MONATGE_CD)) {
        this.pd_ = Time_1.Time.WorldTime;
        this.Qtr = Time_1.Time.WorldTimeSeconds;
        this.Ktr = this.HGf.SwitchMusicMontageInfo.Asset.SequenceLength - 0.1;
        this.PlayMontage({
          MontageAsset: this.HGf.SwitchMusicMontageInfo.Asset,
          IsLoop: false,
          AnimStateParam: this.HGf.SwitchMusicMontageInfo.State
        });
      }
    };
    this.APl = () => {
      if (this.Htr === IComponent_1.ENpcUiInteractType.Gramophone || this.Htr === IComponent_1.ENpcUiInteractType.SunSpirit || this.Htr === IComponent_1.ENpcUiInteractType.SoundBox3) {
        if (this.HGf?.ExitMontageInfo?.Asset?.IsValid()) {
          this.PlayMontage({
            MontageAsset: this.HGf.ExitMontageInfo.Asset,
            IsLoop: false,
            AnimStateParam: this.HGf.ExitMontageInfo.State
          });
        }
      }
    };
    this.cir = () => {
      if (this.uKo) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品成功时,播放提交成功剧情 EnterFlow,播放提交成功动作 ShopSuccessMontage", ["EntityId", this.Owner.Id], ["FlowId", this.HGf?.ShopSuccessFlow?.FlowId]);
        }
        this._ir(this.HGf?.ShopSuccessFlow, this.uKo, true);
        this.uir();
      }
    };
    this.mir = () => {
      if (this.uKo) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品失败时,播放提交物品失败剧情 ShopFailedFlow", ["EntityId", this.Owner.Id], ["FlowId", this.HGf?.ShopFailedFlow?.FlowId]);
        }
        this._ir(this.HGf?.ShopFailedFlow, this.uKo, true);
      }
    };
    this.Ybi = () => {
      if (this.Htr !== IComponent_1.ENpcUiInteractType.AntiqueShop && this.Htr !== IComponent_1.ENpcUiInteractType.ChengXiaoShanShop && this.Htr !== IComponent_1.ENpcUiInteractType.SoundBox3 && this.Htr !== IComponent_1.ENpcUiInteractType.SunSpirit) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品升级成功时,Npc类型不是ChengXiaoShanShop或AntiqueShop,播放失败", ["NpcUiInteractType", this.Htr]);
        }
      } else if (this.HGf) {
        if (this.HGf.UpgradeFlow) {
          ControllerHolder_1.ControllerHolder.FlowController.StartFlow(this.HGf.UpgradeFlow.FlowListName, this.HGf.UpgradeFlow.FlowId, this.HGf.UpgradeFlow.StateId);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
        } else if (MontageInfo.IsPathValid(this.HGf.UpgradeSequencePath) && MontageInfo.IsPathValid(this.HGf.StandByMontageInfo?.Path)) {
          this.jtr ||= new NpcPerformSequence_1.NpcPerformSequence();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品升级成功时,开始加载对应Sequence", ["NpcUiInteractType", this.Htr], ["UpgradeSequencePath", this.HGf.UpgradeSequencePath]);
          }
          this.jtr.Load(this.HGf.UpgradeSequencePath, this.$Gf);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品升级成功时,UpgradeSequencePath为空或者StandByMontagePath为“Empth”,播放失败", ["NpcUiInteractType", this.Htr]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequencePlayFail);
        }
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
      }
    };
    this.$Gf = () => {
      if (this.Owner?.Valid && this.HGf) {
        if (this.jtr) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品升级成功时,开始播放对应Sequence", ["NpcUiInteractType", this.Htr], ["FinishDeliverySequence", this.HGf.UpgradeSequencePath], ["ShowNpcWhilePlayingSequence", this.HGf.ShowNpcWhilePlayingSequence]);
          }
          if (!this.HGf.ShowNpcWhilePlayingSequence) {
            this.Cir();
          }
          this.jtr.Play(this.WGf);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiCore", 50, "交付道具播放Sequence时Npc已销毁", ["PbDataId", this.ConfigId], ["Path", this.HGf.UpgradeSequencePath]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
        }
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
      }
    };
    this.WGf = () => {
      if (this.Owner?.Valid && this.HGf) {
        if (this.jtr) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品升级成功时,Sequence播放完成", ["NpcUiInteractType", this.Htr], ["FinishDeliverySequence", this.HGf.UpgradeSequencePath]);
          }
          this.PlayMontage({
            MontageAsset: this.HGf.EnterMontageInfo?.Asset,
            InSectionToStartMontageAt: CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
            AnimStateParam: this.HGf.EnterMontageInfo?.State
          });
          this.SetNpcAndChildEnable();
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 50, "交付道具播放Sequence时Npc已销毁", ["PbDataId", this.ConfigId], ["Path", this.HGf.UpgradeSequencePath]);
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
    };
    this.YUn = () => {
      var t;
      if (this.Htr !== IComponent_1.ENpcUiInteractType.AntiqueShop && this.Htr !== IComponent_1.ENpcUiInteractType.ChengXiaoShanShop && this.Htr !== IComponent_1.ENpcUiInteractType.SoundBox3 && this.Htr !== IComponent_1.ENpcUiInteractType.SunSpirit) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品等级升至满级时,Npc类型不是ChengXiaoShanShop,播放失败", ["NpcUiInteractType", this.Htr]);
        }
      } else if (this.HGf) {
        if (this.HGf.UpgradeFlow) {
          ControllerHolder_1.ControllerHolder.FlowController.StartFlow(this.HGf.UpgradeFlow.FlowListName, this.HGf.UpgradeFlow.FlowId, this.HGf.UpgradeFlow.StateId);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
        } else {
          t = this.Htr === IComponent_1.ENpcUiInteractType.ChengXiaoShanShop ? this.HGf.FinishDeliverySequence : this.HGf.UpgradeSequencePath;
          if (MontageInfo.IsPathValid(t) && MontageInfo.IsPathValid(this.HGf.StandByMontageInfo?.Path)) {
            this.jtr ||= new NpcPerformSequence_1.NpcPerformSequence();
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品等级升至满级时,开始加载对应Sequence", ["NpcUiInteractType", this.Htr], ["FinishDeliverySequence", t], ["ShowNpcWhilePlayingSequence", this.HGf.ShowNpcWhilePlayingSequence]);
            }
            this.jtr.Load(t, this.QGf);
          } else {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品等级升至满级时,FinishDeliverySequence为空或者StandByMontagePath为“Empth”,播放失败", ["NpcUiInteractType", this.Htr], ["FinishDeliverySequence", t], ["StandByMontagePath", this.HGf.StandByMontageInfo?.Path]);
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequencePlayFail);
          }
        }
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
      }
    };
    this.QGf = () => {
      var t;
      if (this.Owner?.Valid && this.HGf) {
        t = this.Htr === IComponent_1.ENpcUiInteractType.ChengXiaoShanShop ? this.HGf.FinishDeliverySequence : this.HGf.UpgradeSequencePath;
        if (this.jtr) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品等级升至满级时,开始播放对应Sequence", ["NpcUiInteractType", this.Htr], ["FinishDeliverySequence", t]);
          }
          if (!this.HGf.ShowNpcWhilePlayingSequence) {
            this.Cir();
          }
          this.jtr.Play(this.KGf);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiCore", 50, "交付道具播放Sequence时Npc已销毁", ["PbDataId", this.ConfigId], ["Path", t]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
        }
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
      }
    };
    this.KGf = () => {
      var t;
      if (this.Owner?.Valid && this.HGf) {
        t = this.Htr === IComponent_1.ENpcUiInteractType.ChengXiaoShanShop ? this.HGf.FinishDeliverySequence : this.HGf.UpgradeSequencePath;
        if (this.jtr) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品等级升至满级时,Sequence播放完成", ["NpcUiInteractType", this.Htr], ["FinishDeliverySequence", t]);
          }
          this.PlayMontage({
            MontageAsset: this.HGf.EnterMontageInfo?.Asset,
            InSectionToStartMontageAt: CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
            AnimStateParam: this.HGf.EnterMontageInfo?.State
          });
          this.SetNpcAndChildEnable();
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 50, "交付道具播放Sequence时Npc已销毁", ["PbDataId", this.ConfigId], ["Path", this.HGf.UpgradeSequencePath]);
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
    };
  }
  get SystemUiViewName() {
    return this.uKo;
  }
  set SystemUiViewName(t) {
    this.uKo = t;
  }
  get BoardId() {
    return this.mMo;
  }
  set BoardId(t) {
    this.mMo = t;
  }
  OnCreate(t) {
    super.OnCreate(t);
    if (t?.ShowOnUiInteract) {
      this.XGf(t.ShowOnUiInteract);
      this.nir.set("MingSuView", 3);
    }
  }
  OnEnter(t) {
    this.PerformComp?.SightTarget(ControllerHolder_1.ControllerHolder.CameraController.WidgetCamera.DisplayComponent.CineCamera, 4);
    if (this.uKo && this.uKo !== "ForgingRootView") {
      this.HGf?.TryLoadAllMontage();
      if (UiManager_1.UiManager.IsViewShow(this.uKo)) {
        this._Ko = true;
      } else {
        this._Ko = false;
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
      }
      this.Ore();
      this.gir(true);
      this.jGf();
      this.YGf();
      this.zGf();
    }
  }
  OnUpdate(t) {
    if (this.Htr !== IComponent_1.ENpcUiInteractType.AntiqueShop && this.Htr !== IComponent_1.ENpcUiInteractType.ChengXiaoShanShop) {
      this.fir();
    }
  }
  OnExit(t) {
    this.gir(false);
    this.SetNpcAndChildEnable();
    this.PerformComp?.SightTarget(undefined, 4);
  }
  OnDestroy() {
    if (this.jtr) {
      this.jtr.Destroy();
      this.jtr = undefined;
    }
    this.Wtr.length = 0;
  }
  CanChangeFrom(t) {
    return t !== 9;
  }
  XGf(t) {
    this.Htr = t.Type;
    this.HGf = new NpcShopPerformParams();
    switch (t?.Type) {
      case IComponent_1.ENpcUiInteractType.Shop:
      case IComponent_1.ENpcUiInteractType.ShopNew:
        this.HGf.EnterMontageInfo = new MontageInfo(t.EnterMontage);
        this.HGf.StandByMontageInfo = new MontageInfo(t.StandByMontage);
        this.HGf.ShopSuccessMontageInfo = new MontageInfo(t.ShopSuccessMontage);
        this.HGf.EnterFlow = t.EnterFlow;
        this.HGf.ShopSuccessFlow = t.ShopSuccessFlow;
        this.HGf.ShopFailedFlow = t.ShopFailedFlow;
        this.HGf.ShowNpcWhilePlayingSequence = false;
        break;
      case IComponent_1.ENpcUiInteractType.AntiqueShop:
        this.HGf.EnterMontageInfo = new MontageInfo(t.EnterMontage);
        this.HGf.StandByMontageInfo = new MontageInfo(t.StandByMontage);
        this.HGf.ShopSuccessMontageInfo = new MontageInfo(t.ShopSuccessMontage);
        this.HGf.EnterFlow = t.EnterFlow;
        this.HGf.ShopSuccessFlow = t.ShopSuccessFlow;
        this.HGf.ShopFailedFlow = t.ShopFailedFlow;
        this.HGf.UpgradeSequencePath = t.UpgradeSequence;
        this.HGf.ShowNpcWhilePlayingSequence = false;
        break;
      case IComponent_1.ENpcUiInteractType.ChengXiaoShanShop:
        this.HGf.EnterMontageInfo = new MontageInfo(t.EnterMontage);
        this.HGf.StandByMontageInfo = new MontageInfo(t.StandByMontage);
        this.HGf.ShopSuccessMontageInfo = new MontageInfo(t.ShopSuccessMontage);
        this.HGf.EnterFlow = t.EnterFlow;
        this.HGf.ShopSuccessFlow = t.ShopSuccessFlow;
        this.HGf.ShopFailedFlow = t.ShopFailedFlow;
        this.HGf.UpgradeSequencePath = t.UpgradeSequence;
        this.HGf.FinishDeliverySequence = t.FinishDeliverySequence;
        this.HGf.ShowNpcWhilePlayingSequence = t.ShowNpcWhilePlayingSequence ?? false;
        break;
      case IComponent_1.ENpcUiInteractType.Gramophone:
        this.HGf.EnterMontageInfo = new MontageInfo(t.EnterMontage);
        this.HGf.StandByMontageInfo = new MontageInfo(t.StandByMontage);
        this.HGf.SwitchMusicMontageInfo = new MontageInfo(t.SwitchMusicMontage);
        this.HGf.ExitMontageInfo = new MontageInfo(t.ExitMontage);
        this.HGf.EnterFlow = t.EnterFlow;
        this.HGf.ShopSuccessFlow = t.SuccessFlow;
        this.HGf.ShopFailedFlow = t.FailedFlow;
        break;
      case IComponent_1.ENpcUiInteractType.SoundBox3:
      case IComponent_1.ENpcUiInteractType.SunSpirit:
        this.HGf.EnterMontageInfo = new MontageInfo(t.EnterMontage);
        this.HGf.StandByMontageInfo = new MontageInfo(t.StandByMontage);
        this.HGf.ShopSuccessMontageInfo = new MontageInfo(t.ShopSuccessMontage);
        this.HGf.EnterFlow = t.EnterFlow;
        this.HGf.ShopSuccessFlow = t.ShopSuccessFlow;
        this.HGf.ShopFailedFlow = t.ShopFailedFlow;
        this.HGf.UpgradeFlow = t.UpgradeFlow;
        this.HGf.UpgradeSequencePath = t.UpgradeSequence;
        this.HGf.ShowNpcWhilePlayingSequence = false;
        if (t.ExitMontage?.Type === "Asset") {
          this.HGf.ExitMontageInfo = new MontageInfo(t.ExitMontage.Asset);
        }
    }
  }
  jGf() {
    var t;
    if (this.HGf?.EnterMontageInfo && this.uKo && this._Ko) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 36, "[NpcPerformSystemUiState]当打开界面时,播放进入界面的动作 EnterMontage", ["EntityId", this.Owner.Id], ["ViewName", this.uKo]);
      }
      t = (this.Htr === IComponent_1.ENpcUiInteractType.AntiqueShop || this.Htr === IComponent_1.ENpcUiInteractType.ChengXiaoShanShop) && undefined;
      this.PlayMontage({
        MontagePath: this.HGf.EnterMontageInfo.Path,
        IsLoop: t,
        AnimStateParam: this.HGf.EnterMontageInfo.State,
        OnPlayCallback: t => {
          if (!this._Ko) {
            if (this.HGf?.EnterMontageInfo?.Asset?.IsValid()) {
              this.StopMontage({
                Montage: this.HGf.EnterMontageInfo.Asset
              });
            }
          }
        }
      });
    }
  }
  YGf() {
    if (this.HGf?.EnterFlow && this.uKo) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 36, "[NpcPerformSystemUiState]当打开界面时,播放进入界面的D级剧情 EnterFlow", ["EntityId", this.Owner.Id], ["ViewName", this.uKo], ["FlowId", this.HGf.EnterFlow.FlowId]);
      }
      this._ir(this.HGf.EnterFlow, this.uKo, false);
    }
  }
  zGf() {
    this.rHs = CommonParamById_1.configCommonParamById.GetIntConfig("BuySuccessNpcDialogueTimeInterval") ?? 0;
    this.Qtr = Time_1.Time.WorldTimeSeconds;
    this.Ktr = UiManager_1.UiManager.IsViewOpen("PupuVillageItemView") || UiManager_1.UiManager.IsViewOpen("PhonographView") ? 1 : STAND_BY_MONTAGE_CD;
    this.$tr = Time_1.Time.WorldTimeSeconds;
    this.Xtr = 0;
  }
  JGf() {
    this.pd_ = 0;
    this.Qtr = 0;
    this.Ktr = 0;
    this.Xtr = 0;
    this.$tr = 0;
  }
  sir() {
    if ((this.Htr === IComponent_1.ENpcUiInteractType.AntiqueShop || this.Htr === IComponent_1.ENpcUiInteractType.ChengXiaoShanShop) && !!this.HGf?.EnterMontageInfo?.Asset?.IsValid()) {
      this.PlayMontage({
        MontageAsset: this.HGf.EnterMontageInfo.Asset,
        InSectionToStartMontageAt: CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
        AnimStateParam: this.HGf.EnterMontageInfo.State
      });
    }
    this.SetNpcAndChildEnable();
    this._Ko = false;
    this.uKo = undefined;
    this.JGf();
    this.kre();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BoughtItem, this.xdi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSubmitItemSuccess, this.cir);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSubmitItemFail, this.mir);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSubmitItemLevelUp, this.Ybi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSubmitItemLevelMax, this.YUn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhonographSwitchMusic, this.UPl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExitNpcInteract, this.APl);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BoughtItem, this.xdi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSubmitItemSuccess, this.cir);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSubmitItemFail, this.mir);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSubmitItemLevelUp, this.Ybi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSubmitItemLevelMax, this.YUn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhonographSwitchMusic, this.UPl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExitNpcInteract, this.APl);
  }
  Cir() {
    if (this.jtr) {
      const s = this.Owner.Entity.Disable("播放Sequence隐藏Npc");
      this.Wtr.push({
        HandleId: s,
        EntityHandle: this.Owner
      });
      var t = this.Owner?.Entity.GetComponent(0);
      if (t?.Valid) {
        t = t.GetBaseInfo().ChildEntityIds;
        if (t && !(t.length < 1)) {
          var e = ModelManager_1.ModelManager.CreatureModel;
          for (const n of t) {
            var i = e.GetEntityByPbDataId(n);
            if (i?.Valid) {
              const s = i.Entity.Disable("播放Sequence隐藏子实体");
              this.Wtr.push({
                HandleId: s,
                EntityHandle: i
              });
            }
          }
        }
      }
    }
  }
  gir(t) {
    var e = this.Owner?.Entity?.GetComponent(1);
    if (e?.SkeletalMesh?.IsValid()) {
      e.SkeletalMesh.ForcedLodModel = t ? 1 : 0;
    }
  }
  SetNpcAndChildEnable() {
    for (const t of this.Wtr) {
      t.EntityHandle.Entity.Enable(t.HandleId, "NpcPerformSystemUiState.SetNpcAndChildEnable");
    }
    this.Wtr.length = 0;
  }
  _ir(t, e, i) {
    if (t) {
      e = {
        ViewName: e,
        Position: this.nir.get(e) ?? 2,
        TextWidth: 700
      };
      ControllerHolder_1.ControllerHolder.FlowController.StartFlowForView(t.FlowListName, t.FlowId, t.StateId, e, i);
    }
  }
  fir() {
    if (this.HGf?.StandByMontageInfo?.Asset?.IsValid() && this.Qtr && Time_1.Time.WorldTimeSeconds > this.Qtr + this.Ktr) {
      let e = false;
      var i = this.HGf.StandByMontageInfo.Asset;
      for (let t = 0; t < i.CompositeSections.Num(); t++) {
        var s = i.CompositeSections.Get(t);
        if (s && s.SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION)) {
          this.Ktr = s.SegmentLength;
          e = true;
        }
      }
      if (e) {
        this.PlayMontage({
          MontageAsset: i,
          InSectionToStartMontageAt: CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
          AnimStateParam: this.HGf.StandByMontageInfo.State
        });
        this.Qtr = Time_1.Time.WorldTimeSeconds;
      } else {
        this.PlayMontage({
          MontageAsset: i,
          AnimStateParam: this.HGf.StandByMontageInfo.State
        });
        this.Qtr = Time_1.Time.WorldTimeSeconds;
        this.Ktr = i.SequenceLength + STAND_BY_MONTAGE_CD;
      }
    }
  }
  uir() {
    var t = this.HGf?.EnterMontageInfo?.Asset;
    if (!t?.IsValid() || !this.Owner?.Valid || !this.AnimComp?.MainAnimInstance?.Montage_IsPlaying(t)) {
      if ((t = this.HGf?.ShopSuccessMontageInfo?.Asset)?.IsValid() && this._Ko && Time_1.Time.WorldTimeSeconds > this.$tr + this.Xtr) {
        this.PlayMontage({
          MontageAsset: t,
          IsLoop: false,
          AnimStateParam: this.HGf?.ShopSuccessMontageInfo?.State
        });
        this.$tr = Time_1.Time.WorldTimeSeconds;
        this.Xtr = t.SequenceLength;
        this.Qtr = Time_1.Time.WorldTimeSeconds;
        this.Ktr = t.SequenceLength + STAND_BY_MONTAGE_CD;
      }
    }
  }
}
exports.NpcPerformSystemUiState = NpcPerformSystemUiState;
//# sourceMappingURL=NpcPerformSystemUiState.js.map