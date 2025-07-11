"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawMainViewNew = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const BlackScreenController_1 = require("../../BlackScreen/BlackScreenController");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GlobalData_1 = require("../../../GlobalData");
const Info_1 = require("../../../../Core/Common/Info");
const SHOW_TIPS_DELAY = 2000;
class DrawMainViewNew extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Delay = 0;
    this.IsHold = false;
    this.IsShowTips = false;
    this.IsEnd = false;
    this.MaxQuality = 0;
    this.HasNewItems = false;
    this.LevelSequencePlayer = undefined;
    this.GachaBP = undefined;
    this.IsFirstShow = true;
    this.IsFireEndGacha = false;
    this.InitGachaBp = (e, i) => {
      let t = 0;
      if (e === 1) {
        if (i === 3) {
          t = 0;
        } else if (i === 4) {
          t = 1;
        } else if (i === 5) {
          t = 2;
        }
      } else if (i === 4) {
        t = 3;
      } else if (i === 5) {
        t = 4;
      }
      this.MaxQuality = i;
      this.GachaBP = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("GachaBP"), 0);
      this.GachaBP.TSInitParameters(t);
      this.GachaBP.SetTickableWhenPaused(true);
      this.GachaBP.Timeline_0?.SetTickableWhenPaused(true);
    };
    this.InitAudioState = (e, i) => {
      AudioSystem_1.AudioSystem.SetState("ui_gacha_times", e === 1 ? "one" : "ten");
      if (i === 3) {
        AudioSystem_1.AudioSystem.SetState("ui_gacha_quality_max", "normal");
      } else if (i === 4) {
        AudioSystem_1.AudioSystem.SetState("ui_gacha_quality_max", "purple");
      } else if (i === 5) {
        AudioSystem_1.AudioSystem.SetState("ui_gacha_quality_max", "golden");
      }
    };
    this.OnClickSkip = () => {
      this.GachaBP.IsSkip = true;
      if (this.GachaBP.WhiteScreen) {
        this.GachaBP.Timeline_0?.Stop();
        this.GachaBP.WhiteScreenOff();
      }
      this.OnEndGacha();
    };
    this.OnEndGacha = () => {
      this.IsShowTips = true;
      if (!this.IsFireEndGacha) {
        if (this.GachaBP.IsSkip) {
          BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "GachaSkip").finally(() => {
            if (this.MaxQuality === 5 || this.HasNewItems) {
              let e = this.OpenParam;
              if (e) {
                e.IsOnlyShowGold = true;
              } else {
                e = {
                  SkipOnLoadResourceFinish: false,
                  ResultViewHideExtraReward: false,
                  IsOnlyShowGold: true
                };
              }
              UiManager_1.UiManager.OpenView("GachaScanView", e, () => {
                UiManager_1.UiManager.CloseView(this.Info.Name);
              });
            } else {
              UiManager_1.UiManager.OpenView("GachaResultView", this.OpenParam, () => {
                UiManager_1.UiManager.CloseView(this.Info.Name);
              });
              var e = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("UpdateInteractBP"), 0);
              e?.EndGachaScene();
              e?.SetTickableWhenPaused(true);
            }
          });
        } else {
          UiManager_1.UiManager.OpenView("GachaScanView", this.OpenParam, () => {
            UiManager_1.UiManager.CloseView(this.Info.Name);
          });
        }
        this.IsFireEndGacha = true;
      }
    };
    this.OnGachaInteractFinish = () => {
      this.IsEnd = true;
      this.IsShowTips;
    };
    this.OnGachaClick = e => {
      if (e) {
        this.IsHold = true;
        this.Delay = 0;
        this.IsShowTips = false;
      } else {
        this.IsHold = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.OnClickSkip]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (const i of ModelManager_1.ModelManager.GachaModel.CurGachaResult) {
      e.push(i.e9n.L8n);
    }
    await ModelManager_1.ModelManager.GachaModel.PreloadGachaSequence(e);
  }
  OnBeforeShow() {
    var e;
    var i;
    if (this.IsFirstShow) {
      e = ModelManager_1.ModelManager.GachaModel.CurGachaResult.length;
      i = ModelManager_1.ModelManager.GachaModel.CurGachaResult.reduce((e, i) => {
        var t = i.e9n.L8n;
        var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t)?.QualityId ?? 0;
        this.HasNewItems = this.HasNewItems || t >= 4 && i.IsNew;
        return Math.max(e, t);
      }, 0);
      this.InitGachaBp(e, i);
      this.InitAudioState(e, i);
      this.IsFirstShow = false;
    }
    if (Info_1.Info.IsMacPlatform()) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.AllowHardwareOcclusion 0");
    }
  }
  OnStart() {
    this.GetButton(1).RootUIComp.SetUIActive(true);
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnTick(e) {
    if (!this.IsHold && !this.IsShowTips && !this.IsEnd) {
      this.Delay += e;
      if (this.Delay > SHOW_TIPS_DELAY) {
        this.IsShowTips = true;
      }
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EndGachaScene, this.OnEndGacha);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GachaClick, this.OnGachaClick);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GachaInteractFinish, this.OnGachaInteractFinish);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EndGachaScene, this.OnEndGacha);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GachaClick, this.OnGachaClick);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GachaInteractFinish, this.OnGachaInteractFinish);
  }
  OnBeforeDestroyImplement() {
    if (this.GachaBP?.IsValid()) {
      this.GachaBP?.EndGachaSequence();
      this.GachaBP?.LevelSequenceShow?.SequencePlayer?.Stop();
    }
  }
}
exports.DrawMainViewNew = DrawMainViewNew;
//# sourceMappingURL=DrawMainViewNew.js.map