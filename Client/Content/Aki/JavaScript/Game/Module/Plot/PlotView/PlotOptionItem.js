"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotOptionItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalConfigFromCsvByName_1 = require("../../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TalkOptionIconById_1 = require("../../../../Core/Define/ConfigQuery/TalkOptionIconById");
const TextById_1 = require("../../../../Core/Define/ConfigQuery/TextById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const InputDevice_1 = require("../../../../Launcher/InputDevice/InputDevice");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const LevelGameplayActionsDefine_1 = require("../../../LevelGamePlay/LevelGameplayActionsDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const ToggleActionItem_1 = require("../../Common/Toggle/ToggleActionItem");
const InteractionModel_1 = require("../../Interaction/InteractionModel");
const InteractConfirmController_1 = require("../../Interaction/SecondConfirm/InteractConfirmController");
const TsInteractionUtils_1 = require("../../Interaction/TsInteractionUtils");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const PlotController_1 = require("../PlotController");
const SequenceController_1 = require("../Sequence/SequenceController");
const PlotView_1 = require("./PlotView");
const PlotViewHud_1 = require("./PlotViewHud");
class PlotOptionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super();
    this.$_i = undefined;
    this.fzi = 0;
    this.Option = undefined;
    this.pzi = "";
    this.vzi = undefined;
    this.Mzi = undefined;
    this.Ezi = 0;
    this.tui = undefined;
    this.iui = undefined;
    this.OptionIndex = -1;
    this.Szi = false;
    this.yzi = undefined;
    this.aui = false;
    this.Qtt = undefined;
    this.lqt = () => {
      if (!Info_1.Info.IsInTouch() && this.yzi instanceof PlotViewHud_1.PlotViewHud) {
        this.qqo();
      }
    };
    this.Lke = () => {
      var t;
      return !this.$_i.IsPlayingReleaseSequence && (t = this.$_i.GetToggleItem().GetToggleState(), !this.aui || t !== 1);
    };
    this._ui = () => {
      if (this.tui) {
        this.tui(this);
      }
    };
    this.uui = () => {
      if (this.iui) {
        this.iui(this);
      }
    };
    this.OptionClick = (t = 0) => {
      var i;
      if (this.Mzi && !this.Mzi.ConditionCheck || this.Option && !this.Option.ConditionCheck) {
        if (i = this.Mzi?.LockTips?.TidHintText ?? this.Option?.Config.OptionLockTip?.TidHintText) {
          i = new StringBuilder_1.StringBuilder(InteractionModel_1.LOCK_TEXTURE_PREFIX, PublicUtil_1.PublicUtil.GetConfigTextByKey(i));
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText(i.ToString());
        }
      } else if (ModelManager_1.ModelManager.PlotModel.OptionEnable) {
        ModelManager_1.ModelManager.PlotModel.OptionEnable = false;
        this.aui = true;
        this.$_i.PlayReleaseSequence().then(() => {
          this.Option?.OnClick?.();
          this.$_i.SetRaycastTarget(false);
          switch (this.fzi) {
            case 0:
              if (this.vzi) {
                PlotController_1.PlotController.EndInteraction(this.Mzi.Type.Type === "Flow");
                this.vzi.SecondConfirmHandle = TsInteractionUtils_1.TsInteractionUtils.HandleInteractionSecondConfirm(this.Mzi, this.vzi, this.stm);
              } else {
                PlotController_1.PlotController.EndInteraction();
              }
              break;
            case 1:
              ModelManager_1.ModelManager.PlotModel.MarkGrayOption(this.Ezi, this.OptionIndex);
              if (this.yzi instanceof PlotView_1.PlotView || this.yzi instanceof PlotViewHud_1.PlotViewHud) {
                ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SelectOption(this.OptionIndex, this.Option.Config.Actions);
              } else {
                SequenceController_1.SequenceController.SelectOption(this.OptionIndex, this.Ezi);
              }
          }
        }, () => {});
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "剧情选项点击失效", ["index", this.OptionIndex], ["id", this.Ezi]);
      }
    };
    this.stm = (t, i, e) => {
      PlotController_1.PlotController.EndInteraction(this.Mzi.Type.Type === "Flow");
      if (this.vzi.SecondConfirmHandle === t && InteractConfirmController_1.InteractConfirmController.CheckHandleValid(t) && i && e) {
        TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(this.Mzi, this.vzi);
      }
      this.vzi.SecondConfirmHandle = 0;
    };
    this.yzi = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
    if (!Info_1.Info.IsInTouch() && this.yzi instanceof PlotViewHud_1.PlotViewHud) {
      this.ComponentRegisterInfos.push([2, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(0);
    this.$_i = new ToggleActionItem_1.ToggleActionItem();
    await this.$_i.CreateThenShowByActorAsync(t.GetOwner());
    if (!Info_1.Info.IsInTouch() && this.yzi instanceof PlotViewHud_1.PlotViewHud && (this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem(), t = this.GetItem(2))) {
      await this.Qtt?.CreateByActorAsync(t.GetOwner());
    }
  }
  qqo() {
    if (Info_1.Info.IsInGamepad()) {
      if (this.OptionIndex === 0) {
        this.Qtt?.RefreshByActionOrAxis({
          ActionOrAxisName: InputMappingsDefine_1.actionMappings.D级限时选项_1
        });
      } else if (this.OptionIndex === 1) {
        this.Qtt?.RefreshByActionOrAxis({
          ActionOrAxisName: InputMappingsDefine_1.actionMappings.D级限时选项_2
        });
      }
    } else if (this.OptionIndex === 0) {
      this.Qtt?.RefreshByActionOrAxis({
        ActionOrAxisName: InputMappingsDefine_1.actionMappings.切换角色1
      });
    } else if (this.OptionIndex === 1) {
      this.Qtt?.RefreshByActionOrAxis({
        ActionOrAxisName: InputMappingsDefine_1.actionMappings.切换角色2
      });
    }
    this.Qtt?.Show();
  }
  OnStart() {
    this.aui = false;
    this.$_i.SetFunction(this.OptionClick);
    this.$_i.GetToggleItem().OnUndeterminedClicked.Add(this.OptionClick);
    this.$_i.GetToggleItem().CanExecuteChange.Bind(this.Lke);
    this.Izi();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
  }
  OnBeforeDestroy() {
    this.Tzi();
    this.$_i.Destroy();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
  }
  Izi() {
    var t = this.$_i.GetToggleItem();
    t.OnHover.Add(this._ui);
    t.OnUnHover.Add(this.uui);
  }
  Tzi() {
    var t = this.$_i.GetToggleItem();
    t.OnHover.Clear();
    t.OnUnHover.Clear();
  }
  BindOnHover(t) {
    this.tui = t;
  }
  BindOnUnHover(t) {
    this.iui = t;
  }
  SetSelectedDisplay(t) {
    this.GetItem(1).SetUIActive(t);
    if ((!t || !InputDevice_1.InputDevice.IsInTouch()) && this.$_i) {
      const i = this.$_i.GetToggleItem();
      if (i) {
        if (t) {
          i.SetToggleState(0, false);
          i.SetToggleState(1, false);
        } else if (this.CheckToggleGray()) {
          const i = this.$_i.GetToggleItem();
          i.SetToggleState(2);
        } else {
          i.SetToggleState(0, false);
        }
      }
    }
  }
  SetupSubtitleOption(t, i) {
    this.fzi = 1;
    this.Option = t;
    this.pzi = t.Config.TidTalkOption;
    this.Ezi = i;
    this.OptionIndex = ModelManager_1.ModelManager.PlotModel.GetOptionIndex(t.Config, i);
    this.$_i.GetToggleText().SetGameRichText(true);
    var e;
    var i = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.pzi);
    if (!t.ConditionCheck && t.Config.OptionLockTip) {
      if (t.Config.OptionLockTip.TidAppendText) {
        e = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.Config.OptionLockTip.TidAppendText);
        e = new StringBuilder_1.StringBuilder(i, InteractionModel_1.COLOR_PREFIX, e, InteractionModel_1.COLOR_SUFFIX);
        this.$_i.SetToggleText(e.ToString());
      } else {
        this.$_i.SetToggleText(i);
      }
      this.$_i.SetToggleTexture(InteractionModel_1.LOCK_TEXTURE);
    } else if (t.Config.OptionLockTip && t.ConditionCheck) {
      this.$_i.SetToggleText(i);
      this.$_i.SetToggleTexture(InteractionModel_1.UNLOCK_TEXTURE);
    } else {
      this.Lzi(this.fui(), i);
    }
    if (!Info_1.Info.IsInTouch() && this.yzi instanceof PlotViewHud_1.PlotViewHud) {
      this.qqo();
    }
  }
  SetupInteractiveOption(t, i) {
    this.fzi = 0;
    this.Mzi = t;
    this.vzi = i;
    var e;
    var i = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidContent);
    if (!t.ConditionCheck && t.LockTips) {
      if (t.LockTips.TidAppendText) {
        e = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.LockTips.TidAppendText);
        e = new StringBuilder_1.StringBuilder(i, InteractionModel_1.COLOR_PREFIX, e, InteractionModel_1.COLOR_SUFFIX);
        this.$_i.SetToggleText(e.ToString());
      } else {
        this.$_i.SetToggleText(i);
      }
      this.$_i.SetToggleTexture(InteractionModel_1.LOCK_TEXTURE);
    } else if (t.LockTips && t.ConditionCheck) {
      this.$_i.SetToggleText(i);
      this.$_i.SetToggleTexture(InteractionModel_1.UNLOCK_TEXTURE);
    } else {
      this.Lzi(this.fui(), i);
    }
  }
  SetupLeaveOption(t) {
    this.Szi = true;
    this.fzi = 0;
    this.Mzi = undefined;
    this.vzi = undefined;
    this.Lzi(this.fui(), t);
  }
  fui() {
    let i = undefined;
    switch (this.fzi) {
      case 0:
        {
          if (!this.Mzi) {
            var e = this.IsLeaveItem() ? "Leave" : "Dialog";
            i = this.Dzi(e);
            break;
          }
          if (this.IsTask()) {
            var s = this.Mzi.Context;
            if (!s) {
              break;
            }
            let t = undefined;
            switch (s.Type) {
              case 2:
                t = s.QuestId;
                break;
              case 6:
                t = s.TreeConfigId;
            }
            if (t === undefined) {
              break;
            }
            e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
            if (!e) {
              break;
            }
            e = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(e.QuestMarkId);
            i = e?.NpcTaskIcon;
            break;
          }
          let t = "Dialog";
          t = this.Option?.Config.OptionStyle === 1 ? "OS" : this.Mzi.Icon ?? "Dialog";
          i = this.Dzi(t);
          break;
        }
      case 1:
        if (this.Option && (e = this.Option.Config.Icon || 1, e = TalkOptionIconById_1.configTalkOptionIconById.GetConfig(e))) {
          i = e.Icon;
        }
    }
    return i ?? "";
  }
  Lzi(t, i) {
    let e = i;
    if (this.fzi === 1) {
      e = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e);
    }
    this.$_i.SetToggleTexture(t);
    this.$_i.SetToggleText(e);
  }
  Dzi(t) {
    t = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("EInteractIcon." + t) ?? GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("EInteractDefaultIcon." + t);
    if (t === undefined) {
      return "";
    } else {
      return t.Value;
    }
  }
  IsTask() {
    var t = this.Mzi?.Context;
    return !!t && (t.Type === 2 || t.Type === 6 && t.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest);
  }
  IsOpenSystemBoard() {
    if (this.Mzi?.Type?.Type === "Actions") {
      for (const t of (this.Mzi?.Type).Actions) {
        if (t.Name === "OpenSystemBoard") {
          return true;
        }
      }
    }
    return false;
  }
  IsLeaveItem() {
    return this.Szi;
  }
  CheckToggleGray() {
    return !this.Szi && (this.Mzi ? !this.Mzi.ConditionCheck : !this.Option?.ConditionCheck || !!this.Option?.Config.ReadMarkEnabled && ModelManager_1.ModelManager.PlotModel.IsOptionGray(this.Ezi, this.OptionIndex));
  }
  Refresh(t, i, e) {
    this.Mzi = undefined;
    this.Option = undefined;
    if (t) {
      if (t instanceof LevelGameplayActionsDefine_1.CommonInteractOption) {
        this.Rzi(t);
      } else {
        this.Uzi(t);
      }
    } else {
      this.Azi();
    }
    this.aui = false;
    this.SetSelectedDisplay(false);
    this.$_i.SetRaycastTarget(true);
  }
  Rzi(t) {
    if (this.yzi instanceof PlotView_1.PlotView) {
      this.SetupInteractiveOption(t, this.yzi.InteractController);
      this.SetActive(true);
    }
  }
  Azi() {
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(TextById_1.configTextById.GetConfig("Leave").TextContent);
    this.SetupLeaveOption(t);
  }
  Uzi(t) {
    this.SetupSubtitleOption(t, this.yzi.CurrentSubtitle.Id);
  }
  GetToggleItem() {
    return this.$_i?.GetToggleItem();
  }
}
exports.PlotOptionItem = PlotOptionItem;
//# sourceMappingURL=PlotOptionItem.js.map