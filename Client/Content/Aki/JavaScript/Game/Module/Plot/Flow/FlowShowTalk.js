"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowShowTalk = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const PlotController_1 = require("../PlotController");
class FlowShowTalk {
  constructor() {
    this.CurShowTalk = undefined;
    this.CurTalkItemIndex = 0;
    this.Context = undefined;
    this.B8 = undefined;
    this.S$i = undefined;
    this.U$i = -1;
    this.A$i = false;
    this.O$i = false;
    this.dbn = false;
    this.gjs = false;
    this.fjs = false;
    this.F$i = t => {
      var e;
      if (t) {
        if ((t = this.CurShowTalk.TalkItems[this.CurTalkItemIndex]).Type === "SystemOption") {
          this.fjs = true;
          ControllerHolder_1.ControllerHolder.PlotController.ShowSystemOption(t, (t, e) => {
            this.SelectOption(t, e);
          });
        } else if (t.Options && t.Options.length > 0) {
          this.Context.CurOptionId = -1;
          this.fjs = true;
          if (this.Context.IsBackground) {
            e = ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(t);
            this.HandleShowTalkItemOption(e, t.Options[e].Actions);
          } else {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShowPlotSubtitleOptions);
          }
        } else {
          this.V$i();
        }
      }
    };
    this.OnOptionActionCompleted = t => {
      if (t) {
        this.V$i();
      }
    };
    this.SubmitSubtitle = t => {
      if (this.Context && !this.Context.IsBackground) {
        this.mbn(t);
      }
    };
  }
  FinishShowTalk() {
    this.H$i();
    this.A$i = false;
    ModelManager_1.ModelManager.PlotModel.CenterTextTransition(false);
    ModelManager_1.ModelManager.PlotModel?.GrayOptionMap.clear();
    ModelManager_1.ModelManager.PlotModel.CurShowTalk = undefined;
    ModelManager_1.ModelManager.PlotModel.OptionEnable = true;
    ModelManager_1.ModelManager.PlotModel.PlotTemplate.OnFinishShowTalk();
    this.Context.CurTalkId = -1;
    this.gjs = false;
    this.fjs = false;
    this.Context.CurOptionId = -1;
    this.Context.CurSubActionId = 0;
    this.Context.CurShowTalk = undefined;
    this.Context.CurShowTalkActionId = 0;
    this.CurTalkItemIndex = -1;
    this.CurShowTalk = undefined;
    this.Context = undefined;
    this.B8 = undefined;
    this.dbn = false;
    PlotController_1.PlotController.ClearUi();
    ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(false);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotEndShowTalk);
    ControllerHolder_1.ControllerHolder.FlowController.RunNextAction();
  }
  Start(t, e) {
    this.CurShowTalk = t;
    this.Context = e;
    this.CurTalkItemIndex = -1;
    this.B8 = ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel;
    if (this.B8 === "LevelC" && !t?.TalkItems[0]?.BackgroundConfig?.Type && t?.TalkItems[0]?.Type !== "CenterText") {
      LevelLoadingController_1.LevelLoadingController.CloseLoading(0, undefined, 0);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotStartShowTalk, this.CurShowTalk);
    ModelManager_1.ModelManager.PlotModel.CurShowTalk = t;
    if (this.B8 === "Prompt" || this.Context.IsBackground) {
      this.V$i();
    } else {
      ControllerHolder_1.ControllerHolder.PlotController.WaitViewCallback(t => {
        if (t) {
          this.V$i();
        }
      });
    }
  }
  V$i() {
    var t;
    if (this.CurShowTalk) {
      this.CurTalkItemIndex++;
      if (!this.CurShowTalk.TalkItems || this.CurTalkItemIndex >= this.CurShowTalk.TalkItems.length) {
        this.FinishShowTalk();
      } else {
        t = this.CurShowTalk.TalkItems[this.CurTalkItemIndex];
        this.j$i(t);
      }
    } else {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("当前不在ShowTalk节点");
    }
  }
  SwitchTalkItem(e) {
    var i = this.CurShowTalk.TalkItems.length;
    for (let t = 0; t < i; t++) {
      var s = this.CurShowTalk.TalkItems[t];
      if (s.Id === e) {
        this.CurTalkItemIndex = t;
        this.j$i(s);
        return;
      }
    }
    this.FinishShowTalk();
  }
  async j$i(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "[FlowShowTalk][Subtitle] 字幕显示", ["id", t.Id]);
    }
    this.Context.CurTalkId = t.Id;
    this.Context.CurOptionId = -1;
    this.gjs = false;
    this.S$i = t;
    this.H$i();
    this.O$i = false;
    this.dbn = false;
    await this.Cbn();
    await this.gbn(t);
    await this.fbn();
    this.dbn = true;
    this.Fc();
    this.vbn();
    if (this.Context.IsBackground) {
      this.mbn();
    }
  }
  mbn(t) {
    if (this.CurShowTalk && !this.gjs) {
      t = t ?? this.S$i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "[FlowShowTalk][Subtitle] 字幕完成", ["id", t.Id]);
      }
      this.gjs = true;
      this.S$i = undefined;
      ControllerHolder_1.ControllerHolder.PlotController.PlotViewManager.OnSubmitSubtitle();
      ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(t.Actions, this.F$i);
    }
  }
  HandleShowTalkItemOption(t, e) {
    if (this.Context?.CurShowTalk && this.Context.CurOptionId === -1 && this.fjs) {
      this.O$i = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "[FlowShowTalk][Subtitle] 选择选项", ["index", t]);
      }
      this.Context.CurOptionId = t;
      this.fjs = false;
      ControllerHolder_1.ControllerHolder.FlowController.SelectOption(this.Context.CurTalkId, t);
      ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(e, this.OnOptionActionCompleted);
    }
  }
  Skip() {
    var t;
    var e;
    if (this.CurTalkItemIndex === -1) {
      this.V$i();
    } else if (this.CurTalkItemIndex < this.CurShowTalk.TalkItems.length) {
      if (this.fjs) {
        t = this.CurShowTalk.TalkItems[this.CurTalkItemIndex];
        e = ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(t);
        this.HandleShowTalkItemOption(e, t.Options[e].Actions);
      } else if (!this.gjs && this.dbn) {
        this.mbn(this.CurShowTalk.TalkItems[this.CurTalkItemIndex]);
      }
    } else {
      this.FinishShowTalk();
    }
  }
  H$i() {
    if (this.A$i && !this.O$i) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("遗漏选项C级", ["Miss TalkItem Id", this.U$i]);
    }
    if (!!this.CurShowTalk?.TalkItems && !(this.CurTalkItemIndex >= this.CurShowTalk.TalkItems.length)) {
      this.A$i = !!this.CurShowTalk.TalkItems[this.CurTalkItemIndex].Options && this.CurShowTalk.TalkItems[this.CurTalkItemIndex].Options.length > 0;
      this.U$i = this.CurShowTalk.TalkItems[this.CurTalkItemIndex].Id;
    }
  }
  Fc() {
    if (!this.Context?.IsBackground) {
      ModelManager_1.ModelManager.PlotModel.HandlePlayMontage(this.S$i.Montage);
    }
  }
  async Cbn() {
    var t = this.S$i?.BackgroundConfig;
    var e = UiManager_1.UiManager.GetViewByName("PlotView");
    if (t && this.B8 === "LevelC" && !this.Context.IsBackground && e) {
      const o = new CustomPromise_1.CustomPromise();
      var i = () => {
        o.SetResult();
      };
      switch (t.Type) {
        case "Clean":
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewBgFadePhoto, false, true, undefined, i);
          if (!o.IsFulfilled()) {
            await o.Promise;
          }
          await e.CloseChildView();
          break;
        case "Image":
          var s = t;
          PlotController_1.PlotController.UpdateViewControl(false);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewBgFadePhoto, true, true, s?.ImageAsset, i);
          if (!o.IsFulfilled()) {
            await o.Promise;
          }
          break;
        case "Icon":
          s = t;
          PlotController_1.PlotController.UpdateViewControl(false);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewBgFadePhoto, true, false, s?.ImageAsset, i);
          if (!o.IsFulfilled()) {
            await o.Promise;
          }
          break;
        case "ImageByMcGender":
          PlotController_1.PlotController.UpdateViewControl(false);
          if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewBgFadePhoto, true, true, t.ImageAssetMale, i);
          } else if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewBgFadePhoto, true, true, t.ImageAssetFemale, i);
          }
          if (!o.IsFulfilled()) {
            await o.Promise;
          }
          break;
        case "SpineImage":
          PlotController_1.PlotController.UpdateViewControl(false);
          await e.OpenChildView(t.Id, t.IsLoop ?? false);
      }
      LevelLoadingController_1.LevelLoadingController.CloseLoading(0, undefined, 1);
    }
  }
  async gbn(t) {
    if (this.B8 === "LevelC") {
      await ModelManager_1.ModelManager.PlotModel.PlotTemplate.HandleTemplateShowTalk(t);
    }
  }
  async fbn() {
    if (this.B8 === "LevelC" && !this.Context.IsBackground) {
      const t = new CustomPromise_1.CustomPromise();
      const e = this.S$i.Type === "CenterText";
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(false);
      ModelManager_1.ModelManager.PlotModel.CenterTextTransition(e, () => {
        if (!e) {
          ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(true);
        }
        t.SetResult();
      });
      await t.Promise;
    }
  }
  vbn() {
    if (!this.Context.IsBackground && (this.B8 !== "Prompt" || !ControllerHolder_1.ControllerHolder.PlotController.ShowTipsView(this.S$i, this.Context.UiParam))) {
      if (this.B8 === "LevelC" && this.S$i?.Type === "CenterText") {
        ModelManager_1.ModelManager.PlotModel.ShowTalkCenterText(this.S$i, this.SubmitSubtitle);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdatePlotSubtitle, this.S$i);
      }
    }
  }
  SelectOption(t, e) {
    if (this.Context && !this.Context.IsBackground) {
      this.HandleShowTalkItemOption(t, e);
    }
  }
}
exports.FlowShowTalk = FlowShowTalk;
//# sourceMappingURL=FlowShowTalk.js.map