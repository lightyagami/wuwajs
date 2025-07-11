"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotOptionItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalConfigFromCsvByName_1 = require("../../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TalkOptionIconById_1 = require("../../../../Core/Define/ConfigQuery/TalkOptionIconById");
const TextById_1 = require("../../../../Core/Define/ConfigQuery/TextById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const InputDevice_1 = require("../../../../Launcher/InputDevice/InputDevice");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const LevelGameplayActionsDefine_1 = require("../../../LevelGamePlay/LevelGameplayActionsDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ToggleActionItem_1 = require("../../Common/Toggle/ToggleActionItem");
const InteractionModel_1 = require("../../Interaction/InteractionModel");
const TsInteractionUtils_1 = require("../../Interaction/TsInteractionUtils");
const PlotSubtitleView_1 = require("../../Sequence/Subtitle/PlotSubtitleView");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const PlotController_1 = require("../PlotController");
const SequenceController_1 = require("../Sequence/SequenceController");
const PlotView_1 = require("./PlotView");
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
    this.OptionIndex = -1;
    this.Szi = false;
    this.yzi = undefined;
    this.aui = false;
    this.Lke = () => {
      var t;
      return !this.$_i.IsPlayingReleaseSequence && (t = this.$_i.GetToggleItem().GetToggleState(), !this.aui || t !== 1);
    };
    this._ui = () => {
      if (this.tui) {
        this.tui(this);
      }
    };
    this.OptionClick = (t = 0) => {
      var e;
      if (this.Mzi && !this.Mzi.ConditionCheck || this.Option && !this.Option.ConditionCheck) {
        if (e = this.Mzi?.LockTips?.TidHintText ?? this.Option?.Config.OptionLockTip?.TidHintText) {
          e = new StringBuilder_1.StringBuilder(InteractionModel_1.LOCK_TEXTURE_PREFIX, PublicUtil_1.PublicUtil.GetConfigTextByKey(e));
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText(e.ToString());
        }
      } else if (ModelManager_1.ModelManager.PlotModel.OptionEnable) {
        ModelManager_1.ModelManager.PlotModel.OptionEnable = false;
        this.aui = true;
        this.$_i.PlayReleaseSequence().then(() => {
          this.$_i.SetRaycastTarget(false);
          switch (this.fzi) {
            case 0:
              if (this.vzi) {
                PlotController_1.PlotController.EndInteraction(this.Mzi.Type.Type === "Flow");
                TsInteractionUtils_1.TsInteractionUtils.HandleInteractionOptionNew(this.Mzi, this.vzi);
              } else {
                PlotController_1.PlotController.EndInteraction();
              }
              break;
            case 1:
              ModelManager_1.ModelManager.PlotModel.MarkGrayOption(this.Ezi, this.OptionIndex);
              if (this.yzi instanceof PlotView_1.PlotView) {
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
    this.yzi = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(0);
    this.$_i = new ToggleActionItem_1.ToggleActionItem();
    await this.$_i.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnStart() {
    this.aui = false;
    this.$_i.SetFunction(this.OptionClick);
    this.$_i.GetToggleItem().OnUndeterminedClicked.Add(this.OptionClick);
    this.$_i.GetToggleItem().CanExecuteChange.Bind(this.Lke);
    this.Izi();
  }
  OnBeforeDestroy() {
    this.Tzi();
    this.$_i.Destroy();
  }
  Izi() {
    this.$_i.GetToggleItem().OnHover.Add(this._ui);
  }
  Tzi() {
    this.$_i.GetToggleItem().OnHover.Clear();
  }
  BindOnHover(t) {
    this.tui = t;
  }
  SetSelectedDisplay(t) {
    this.GetItem(1).SetUIActive(t);
    if ((!t || !InputDevice_1.InputDevice.IsInTouch()) && this.$_i) {
      const e = this.$_i.GetToggleItem();
      if (e) {
        if (t) {
          e.SetToggleState(0, false);
          e.SetToggleState(1, false);
        } else if (this.CheckToggleGray()) {
          const e = this.$_i.GetToggleItem();
          e.SetToggleState(2);
        } else {
          e.SetToggleState(0, false);
        }
      }
    }
  }
  SetupSubtitleOption(t, e) {
    this.fzi = 1;
    this.Option = t;
    this.pzi = t.Config.TidTalkOption;
    this.Ezi = e;
    this.OptionIndex = ModelManager_1.ModelManager.PlotModel.GetOptionIndex(t.Config, e);
    this.$_i.GetToggleText().SetGameRichText(true);
    var i;
    var e = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.pzi);
    if (!t.ConditionCheck && t.Config.OptionLockTip) {
      if (t.Config.OptionLockTip.TidAppendText) {
        i = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.Config.OptionLockTip.TidAppendText);
        i = new StringBuilder_1.StringBuilder(e, InteractionModel_1.COLOR_PREFIX, i, InteractionModel_1.COLOR_SUFFIX);
        this.$_i.SetToggleText(i.ToString());
      } else {
        this.$_i.SetToggleText(e);
      }
      this.$_i.SetToggleTexture(InteractionModel_1.LOCK_TEXTURE);
    } else if (t.Config.OptionLockTip && t.ConditionCheck) {
      this.$_i.SetToggleText(e);
      this.$_i.SetToggleTexture(InteractionModel_1.UNLOCK_TEXTURE);
    } else {
      this.Lzi(this.fui(), e);
    }
  }
  SetupInteractiveOption(t, e) {
    this.fzi = 0;
    this.Mzi = t;
    this.vzi = e;
    var i;
    var e = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidContent);
    if (!t.ConditionCheck && t.LockTips) {
      if (t.LockTips.TidAppendText) {
        i = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.LockTips.TidAppendText);
        i = new StringBuilder_1.StringBuilder(e, InteractionModel_1.COLOR_PREFIX, i, InteractionModel_1.COLOR_SUFFIX);
        this.$_i.SetToggleText(i.ToString());
      } else {
        this.$_i.SetToggleText(e);
      }
      this.$_i.SetToggleTexture(InteractionModel_1.LOCK_TEXTURE);
    } else if (t.LockTips && t.ConditionCheck) {
      this.$_i.SetToggleText(e);
      this.$_i.SetToggleTexture(InteractionModel_1.UNLOCK_TEXTURE);
    } else {
      this.Lzi(this.fui(), e);
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
    let e = undefined;
    switch (this.fzi) {
      case 0:
        {
          if (!this.Mzi) {
            var i = this.IsLeaveItem() ? "Leave" : "Dialog";
            e = this.Dzi(i);
            break;
          }
          if (this.IsTask()) {
            var r = this.Mzi.Context;
            if (!r) {
              break;
            }
            let t = undefined;
            switch (r.Type) {
              case 2:
                t = r.QuestId;
                break;
              case 6:
                t = r.TreeConfigId;
            }
            if (t === undefined) {
              break;
            }
            i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
            if (!i) {
              break;
            }
            i = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(i.QuestMarkId);
            e = i?.NpcTaskIcon;
            break;
          }
          let t = "Dialog";
          t = this.Option?.Config.OptionStyle === 1 ? "OS" : this.Mzi.Icon ?? "Dialog";
          e = this.Dzi(t);
          break;
        }
      case 1:
        if (this.Option && (i = this.Option.Config.Icon || 1, i = TalkOptionIconById_1.configTalkOptionIconById.GetConfig(i))) {
          e = i.Icon;
        }
    }
    return e ?? "";
  }
  Lzi(t, e) {
    let i = e;
    if (this.fzi === 1) {
      i = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(i);
    }
    this.$_i.SetToggleTexture(t);
    this.$_i.SetToggleText(i);
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
  Refresh(t, e, i) {
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
    if (!(this.yzi instanceof PlotSubtitleView_1.PlotSubtitleView)) {
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