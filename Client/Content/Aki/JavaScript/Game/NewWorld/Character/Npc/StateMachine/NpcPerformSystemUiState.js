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
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
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
class NpcPerformSystemUiState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments);
    this.Htr = IComponent_1.ENpcUiInteractType.AntiqueShop;
    this.jtr = undefined;
    this.Wtr = [];
    this._Ko = false;
    this.uKo = undefined;
    this.mMo = 0;
    this.Ktr = -0;
    this.Qtr = -0;
    this.Xtr = -0;
    this.$tr = -0;
    this.Ytr = "";
    this.Jtr = undefined;
    this.ztr = undefined;
    this.Ztr = undefined;
    this.eir = undefined;
    this.tir = "";
    this.iir = undefined;
    this.oir = "";
    this.ShopSuccessMontage = undefined;
    this.rir = "";
    this.$Un = "";
    this.oNn = false;
    this.sva = undefined;
    this.ava = undefined;
    this.rHs = 0;
    this.oHs = 0;
    this.MPl = "";
    this.yPl = undefined;
    this.EPl = "";
    this.IPl = undefined;
    this.pd_ = 0;
    this.nir = new Map();
    this.FQe = t => {
      if (this.uKo) {
        if (this.uKo === t && (this._Ko = true, EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe), this.eir?.IsValid())) {
          if (this.Htr === IComponent_1.ENpcUiInteractType.AntiqueShop || this.Htr === IComponent_1.ENpcUiInteractType.ChengXiaoShanShop) {
            this.PlayMontage({
              MontageAsset: this.eir
            });
          } else {
            this.PlayMontage({
              MontageAsset: this.eir,
              IsLoop: false
            });
          }
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
    this.TPl = (t, e) => {
      if (this.uKo) {
        this.yPl = t;
      }
    };
    this.LPl = (t, e) => {
      if (this.uKo) {
        this.IPl = t;
      }
    };
    this.air = (t, e) => {
      if (this.uKo && (this.eir = t, Log_1.Log.CheckInfo() && Log_1.Log.Info("NPC", 36, "[NpcPerformSystemUiState]当打开界面时,播放进入界面的动作 EnterMontage", ["EntityId", this.Owner.Id], ["ViewName", this.uKo]), this._Ko)) {
        if (this.Htr === IComponent_1.ENpcUiInteractType.AntiqueShop || this.Htr === IComponent_1.ENpcUiInteractType.ChengXiaoShanShop) {
          this.PlayMontage({
            MontageAsset: this.eir
          });
        } else {
          this.PlayMontage({
            MontageAsset: this.eir,
            IsLoop: false
          });
        }
      }
    };
    this.hir = (t, e) => {
      if (this.uKo) {
        this.iir = t;
      }
    };
    this.lir = (t, e) => {
      if (this.uKo) {
        this.ShopSuccessMontage = t;
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
          this._ir(this.ztr, this.uKo, true);
          this.uir();
        }
      }
    };
    this.cir = () => {
      if (this.uKo) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品成功时,播放提交成功剧情 EnterFlow,播放提交成功动作 ShopSuccessMontage", ["EntityId", this.Owner.Id], ["FlowId", this.Jtr?.FlowId]);
        }
        this._ir(this.ztr, this.uKo, true);
        this.uir();
      }
    };
    this.mir = () => {
      if (this.uKo) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品失败时,播放提交物品失败剧情 ShopFailedFlow", ["EntityId", this.Owner.Id], ["FlowId", this.Ztr?.FlowId]);
        }
        this._ir(this.Ztr, this.uKo, true);
      }
    };
    this.Ybi = () => {
      if (this.Htr !== IComponent_1.ENpcUiInteractType.AntiqueShop && this.Htr !== IComponent_1.ENpcUiInteractType.ChengXiaoShanShop) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品升级成功时,Npc类型不是ChengXiaoShanShop或AntiqueShop,播放失败", ["NpcUiInteractType", this.Htr]);
        }
      } else if (StringUtils_1.StringUtils.IsEmpty(this.rir) || this.tir === "Empty") {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品升级成功时,UpgradeSequencePath为空或者StandByMontagePath为“Empth”,播放失败", ["NpcUiInteractType", this.Htr]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequencePlayFail);
      } else {
        this.jtr ||= new NpcPerformSequence_1.NpcPerformSequence();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品升级成功时,开始加载对应Sequence", ["NpcUiInteractType", this.Htr], ["UpgradeSequencePath", this.rir]);
        }
        const t = this.ConfigId;
        const e = this.rir;
        this.jtr.Load(this.rir, () => {
          if (this.jtr) {
            if (this.Owner?.Valid) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品升级成功时,开始播放对应Sequence", ["NpcUiInteractType", this.Htr], ["FinishDeliverySequence", this.rir], ["ShowNpcWhilePlayingSequence", this.oNn]);
              }
              if (!this.oNn) {
                this.Cir();
              }
            }
            this.jtr.Play(() => {
              if (this.jtr) {
                if (this.Owner?.Valid) {
                  if (Log_1.Log.CheckInfo()) {
                    Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品升级成功时,Sequence播放完成", ["NpcUiInteractType", this.Htr], ["FinishDeliverySequence", this.rir]);
                  }
                  this.PlayMontage({
                    MontageAsset: this.eir,
                    InSectionToStartMontageAt: CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION
                  });
                  this.SetNpcAndChildEnable();
                }
                EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
              } else {
                EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("UiCore", 50, "交付道具播放Sequence时Npc已销毁", ["PbDataId", t], ["Path", e]);
                }
              }
            });
          } else {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiCore", 50, "交付道具播放Sequence时Npc已销毁", ["PbDataId", t], ["Path", e]);
            }
          }
        });
      }
    };
    this.UPl = () => {
      if (this.Htr === IComponent_1.ENpcUiInteractType.Gramophone && !!this.IPl && !(Time_1.Time.WorldTime - this.pd_ < SWITCH_MONATGE_CD)) {
        this.pd_ = Time_1.Time.WorldTime;
        this.Qtr = Time_1.Time.WorldTimeSeconds;
        this.Ktr = this.IPl.SequenceLength - 0.1;
        this.PlayMontage({
          MontageAsset: this.IPl,
          IsLoop: false
        });
      }
    };
    this.APl = () => {
      if (this.Htr === IComponent_1.ENpcUiInteractType.Gramophone && this.yPl) {
        this.PlayMontage({
          MontageAsset: this.yPl,
          IsLoop: false
        });
      }
    };
    this.YUn = () => {
      if (this.Htr !== IComponent_1.ENpcUiInteractType.AntiqueShop && this.Htr !== IComponent_1.ENpcUiInteractType.ChengXiaoShanShop) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品等级升至满级时,Npc类型不是ChengXiaoShanShop,播放失败", ["NpcUiInteractType", this.Htr]);
        }
      } else {
        let t = this.rir;
        if (this.Htr === IComponent_1.ENpcUiInteractType.ChengXiaoShanShop) {
          t = this.$Un;
        }
        if (StringUtils_1.StringUtils.IsEmpty(t) || this.tir === "Empty") {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品等级升至满级时,FinishDeliverySequence为空或者StandByMontagePath为“Empth”,播放失败", ["NpcUiInteractType", this.Htr], ["FinishDeliverySequence", t], ["StandByMontagePath", this.tir]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequencePlayFail);
        } else {
          this.jtr ||= new NpcPerformSequence_1.NpcPerformSequence();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品等级升至满级时,开始加载对应Sequence", ["NpcUiInteractType", this.Htr], ["FinishDeliverySequence", t], ["ShowNpcWhilePlayingSequence", this.oNn]);
          }
          const e = this.ConfigId;
          this.jtr.Load(t, () => {
            if (this.jtr) {
              if (this.Owner?.Valid && (this.oNn || this.Cir(), Log_1.Log.CheckInfo())) {
                Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品等级升至满级时,开始播放对应Sequence", ["NpcUiInteractType", this.Htr], ["FinishDeliverySequence", t]);
              }
              this.jtr.Play(() => {
                if (this.jtr) {
                  if (this.Owner?.Valid) {
                    if (Log_1.Log.CheckInfo()) {
                      Log_1.Log.Info("NPC", 36, "[CollectionItemDisplay]当提交物品等级升至满级时,Sequence播放完成", ["NpcUiInteractType", this.Htr], ["FinishDeliverySequence", t]);
                    }
                    this.PlayMontage({
                      MontageAsset: this.eir,
                      InSectionToStartMontageAt: CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION
                    });
                    this.SetNpcAndChildEnable();
                  }
                  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopLevelMaxSequenceFinished);
                } else {
                  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("UiCore", 50, "交付道具播放Sequence时Npc已销毁", ["PbDataId", e], ["Path", t]);
                  }
                }
              });
            } else {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAntiqueShopUpgradeSequenceFinished);
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("UiCore", 50, "交付道具播放Sequence时Npc已销毁", ["PbDataId", e], ["Path", t]);
              }
            }
          });
        }
      }
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
    if (t?.ShowOnUiInteract) {
      this.Htr = t.ShowOnUiInteract.Type;
      switch (t.ShowOnUiInteract.Type) {
        case IComponent_1.ENpcUiInteractType.Shop:
          this.Ytr = t.ShowOnUiInteract.EnterMontage;
          this.Jtr = t.ShowOnUiInteract.EnterFlow;
          this.ztr = t.ShowOnUiInteract.ShopSuccessFlow;
          this.Ztr = t.ShowOnUiInteract.ShopFailedFlow;
          this.tir = t.ShowOnUiInteract.StandByMontage;
          this.oir = t.ShowOnUiInteract.ShopSuccessMontage;
          this.oNn = false;
          break;
        case IComponent_1.ENpcUiInteractType.AntiqueShop:
          this.Ytr = t.ShowOnUiInteract.EnterMontage;
          this.Jtr = t.ShowOnUiInteract.EnterFlow;
          this.ztr = t.ShowOnUiInteract.ShopSuccessFlow;
          this.Ztr = t.ShowOnUiInteract.ShopFailedFlow;
          this.tir = t.ShowOnUiInteract.StandByMontage;
          this.oir = t.ShowOnUiInteract.ShopSuccessMontage;
          this.rir = t.ShowOnUiInteract.UpgradeSequence;
          this.oNn = false;
          break;
        case IComponent_1.ENpcUiInteractType.ChengXiaoShanShop:
          this.Ytr = t.ShowOnUiInteract.EnterMontage;
          this.Jtr = t.ShowOnUiInteract.EnterFlow;
          this.ztr = t.ShowOnUiInteract.ShopSuccessFlow;
          this.Ztr = t.ShowOnUiInteract.ShopFailedFlow;
          this.tir = t.ShowOnUiInteract.StandByMontage;
          this.oir = t.ShowOnUiInteract.ShopSuccessMontage;
          this.rir = t.ShowOnUiInteract.UpgradeSequence;
          this.$Un = t.ShowOnUiInteract.FinishDeliverySequence;
          this.oNn = t.ShowOnUiInteract.ShowNpcWhilePlayingSequence ?? false;
          break;
        case IComponent_1.ENpcUiInteractType.Gramophone:
          this.Ytr = t.ShowOnUiInteract.EnterMontage;
          this.Jtr = t.ShowOnUiInteract.EnterFlow;
          this.ztr = t.ShowOnUiInteract.SuccessFlow;
          this.Ztr = t.ShowOnUiInteract.FailedFlow;
          this.MPl = t.ShowOnUiInteract.ExitMontage;
          this.EPl = t.ShowOnUiInteract.SwitchMusicMontage;
          this.tir = t.ShowOnUiInteract.StandByMontage;
      }
      super.OnCreate(t);
      this.nir.set("MingSuView", 3);
    }
  }
  OnEnter(t) {
    this.Owner?.Entity?.GetComponent(191)?.SightTarget(ControllerHolder_1.ControllerHolder.CameraController.WidgetCamera.DisplayComponent.CineCamera, 4);
    if (this.uKo && this.uKo !== "ForgingRootView") {
      this.sva = this.Owner?.Entity?.GetComponent(190);
      this.eir = undefined;
      this.iir = undefined;
      this.ShopSuccessMontage = undefined;
      this.rHs = CommonParamById_1.configCommonParamById.GetIntConfig("BuySuccessNpcDialogueTimeInterval") ?? 0;
      if (UiManager_1.UiManager.IsViewShow(this.uKo)) {
        this._Ko = true;
      } else {
        this._Ko = false;
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
      }
      this.Ore();
      this.gir(true);
      if (!StringUtils_1.StringUtils.IsEmpty(this.Ytr) && this.Ytr !== "Empty") {
        this.ava = ResourceSystem_1.ResourceSystem.LoadAsync(this.Ytr, UE.AnimMontage, this.air);
      }
      if (!StringUtils_1.StringUtils.IsEmpty(this.tir) && this.tir !== "Empty") {
        ResourceSystem_1.ResourceSystem.LoadAsync(this.tir, UE.AnimMontage, this.hir);
      }
      if (!StringUtils_1.StringUtils.IsEmpty(this.oir) && this.oir !== "Empty") {
        ResourceSystem_1.ResourceSystem.LoadAsync(this.oir, UE.AnimMontage, this.lir);
      }
      if (!StringUtils_1.StringUtils.IsEmpty(this.MPl) && this.MPl !== "Empty") {
        ResourceSystem_1.ResourceSystem.LoadAsync(this.MPl, UE.AnimMontage, this.TPl);
      }
      if (!StringUtils_1.StringUtils.IsEmpty(this.EPl) && this.EPl !== "Empty") {
        ResourceSystem_1.ResourceSystem.LoadAsync(this.EPl, UE.AnimMontage, this.LPl);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 36, "[NpcPerformSystemUiState]当打开界面时,播放进入界面的D级剧情 EnterFlow", ["EntityId", this.Owner.Id], ["ViewName", this.uKo], ["FlowId", this.Jtr?.FlowId]);
      }
      this._ir(this.Jtr, this.uKo, false);
      this.Qtr = Time_1.Time.WorldTimeSeconds;
      if (UiManager_1.UiManager.IsViewOpen("PupuVillageItemView") || UiManager_1.UiManager.IsViewOpen("PhonographView")) {
        this.Ktr = 1;
      } else {
        this.Ktr = STAND_BY_MONTAGE_CD;
      }
      this.$tr = Time_1.Time.WorldTimeSeconds;
      this.Xtr = 0;
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
    this.Owner?.Entity?.GetComponent(191)?.SightTarget(undefined, 4);
  }
  CanChangeFrom(t) {
    return t !== 9;
  }
  OnDestroy() {
    if (this.jtr) {
      this.jtr.Destroy();
      this.jtr = undefined;
    }
    this.ava = undefined;
    this.sva = undefined;
    this.Wtr.length = 0;
  }
  sir() {
    if ((this.Htr === IComponent_1.ENpcUiInteractType.AntiqueShop || this.Htr === IComponent_1.ENpcUiInteractType.ChengXiaoShanShop) && !!this.eir) {
      this.PlayMontage({
        MontageAsset: this.eir,
        InSectionToStartMontageAt: CharacterNameDefines_1.CharacterNameDefines.END_SECTION
      });
    }
    this.SetNpcAndChildEnable();
    this._Ko = false;
    this.uKo = undefined;
    this.eir = undefined;
    this.iir = undefined;
    this.ShopSuccessMontage = undefined;
    this.Jtr = undefined;
    this.IPl = undefined;
    this.pd_ = 0;
    this.Qtr = 0;
    this.Ktr = 0;
    this.Xtr = 0;
    this.$tr = 0;
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
          for (const h of t) {
            var i = e.GetEntityByPbDataId(h);
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
    if (this.iir && this.Qtr && Time_1.Time.WorldTimeSeconds > this.Qtr + this.Ktr) {
      let e = false;
      for (let t = 0; t < this.iir.CompositeSections.Num(); t++) {
        var i = this.iir.CompositeSections.Get(t);
        if (i && i.SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION)) {
          this.Ktr = i.SegmentLength;
          e = true;
        }
      }
      if (e) {
        this.PlayMontage({
          MontageAsset: this.iir,
          InSectionToStartMontageAt: CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION
        });
        this.Qtr = Time_1.Time.WorldTimeSeconds;
      } else {
        this.PlayMontage({
          MontageAsset: this.iir
        });
        this.Qtr = Time_1.Time.WorldTimeSeconds;
        this.Ktr = this.iir.SequenceLength + STAND_BY_MONTAGE_CD;
      }
    }
  }
  uir() {
    if (this.ava === undefined || !this.sva || !this.AnimComp?.MainAnimInstance?.Montage_IsPlaying(this.eir)) {
      if (this.ShopSuccessMontage && this._Ko && Time_1.Time.WorldTimeSeconds > this.$tr + this.Xtr) {
        this.PlayMontage({
          MontageAsset: this.ShopSuccessMontage,
          IsLoop: false
        });
        this.$tr = Time_1.Time.WorldTimeSeconds;
        this.Xtr = this.ShopSuccessMontage.SequenceLength;
        this.Qtr = Time_1.Time.WorldTimeSeconds;
        this.Ktr = this.ShopSuccessMontage.SequenceLength + STAND_BY_MONTAGE_CD;
      }
    }
  }
}
exports.NpcPerformSystemUiState = NpcPerformSystemUiState;
//# sourceMappingURL=NpcPerformSystemUiState.js.map