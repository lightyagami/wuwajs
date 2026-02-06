"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const TsAiController_1 = require("../../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
const DEFAULT_WAIT_TIME = 3;
const STOP_MONTAGE_BLEND_OUT_TIME = 0.1;
class TsTaskNpcPlayFlow extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.FlowListName = "";
    this.FlowSubTitle = "";
    this.IsInitTsVariables = false;
    this.TsFlowListName = "";
    this.TsFlowSubTitle = "";
    this.TempTalkItems = undefined;
    this.TempFlowIndex = 0;
    this.TimeRemain = 0;
    this.FlowEnd = true;
    this.HeadInfoComp = undefined;
    this.AnimComp = undefined;
    this.PerformComp = undefined;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsFlowListName = "";
    this.TsFlowSubTitle = "";
    this.TempTalkItems = undefined;
    this.TempFlowIndex = 0;
    this.TimeRemain = 0;
    this.FlowEnd = true;
    this.HeadInfoComp = undefined;
    this.AnimComp = undefined;
    this.PerformComp = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsFlowListName = this.FlowListName;
      this.TsFlowSubTitle = this.FlowSubTitle;
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    if (t instanceof TsAiController_1.default && this.TsFlowListName && this.TsFlowSubTitle && (t = t.AiController.CharActorComp)) {
      this.Reset();
      this.HeadInfoComp = t.Entity.GetComponent(87);
      this.AnimComp = t.Entity.GetComponent(188);
      this.PerformComp = t.Entity.GetComponent(49);
      if (this.HandlePlayFlow()) {
        this.HandleFlowAction(0);
      } else {
        this.Finish(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  ReceiveTickAI(t, i, s) {
    if (this.FlowEnd) {
      this.Finish(true);
    } else if (this.TimeRemain > 0 && (this.TimeRemain -= s, this.TimeRemain < 0)) {
      this.HandleFlowAction(this.TempFlowIndex + 1);
    }
  }
  HandlePlayFlow() {
    var t = ConfigManager_1.ConfigManager.FlowConfig.GetRandomFlow(this.TsFlowListName, Number(this.TsFlowSubTitle), this.ActorOwner.ActorLabel);
    return !!t && (this.TempTalkItems = t.TalkItems, true);
  }
  HandleFlowAction(t) {
    this.TempFlowIndex = t;
    var i = this.TempTalkItems;
    if (i.length > t) {
      i = i[t];
      if (this.ExecuteNpcFlow(i)) {
        this.FlowEnd = false;
        this.TimeRemain = i.WaitTime && i.WaitTime > 0 ? i.WaitTime : DEFAULT_WAIT_TIME;
      } else {
        this.HandleFlowAction(t + 1);
      }
    } else {
      this.FlowEnd = true;
    }
  }
  ExecuteNpcFlow(t) {
    let i = false;
    var s = this.GetFlowText(t.TidTalk);
    if (s && (i = true, this.HeadInfoComp)) {
      this.HeadInfoComp.SetDialogueText(s);
    }
    if (this.AnimComp) {
      if (t.Montage) {
        i = true;
        s = t.Montage.ActionMontage.Path;
        ResourceSystem_1.ResourceSystem.LoadAsync(s, UE.AnimMontage, t => {
          if (t?.IsValid() && this.PerformComp) {
            this.PerformComp.PlayPerformMontage(3, {
              MontageAsset: t
            });
          }
        });
      } else if (this.PerformComp) {
        this.PerformComp.StopPerformMontage(3, {
          Method: 0,
          BlendOutTime: STOP_MONTAGE_BLEND_OUT_TIME
        });
      }
    }
    return i;
  }
  GetFlowText(t) {
    if (t && !StringUtils_1.StringUtils.IsEmpty(t)) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
    }
  }
  Reset() {
    this.TempTalkItems = undefined;
    this.TempFlowIndex = 0;
    this.TimeRemain = 0;
    this.FlowEnd = true;
  }
  OnClear() {
    this.Reset();
    if (this.HeadInfoComp) {
      this.HeadInfoComp.HideDialogueText();
      this.HeadInfoComp = undefined;
    }
    if (this.PerformComp) {
      this.PerformComp.StopPerformMontage(3, {
        Method: 0,
        BlendOutTime: STOP_MONTAGE_BLEND_OUT_TIME
      });
    }
  }
}
exports.default = TsTaskNpcPlayFlow;
//# sourceMappingURL=TsTaskNpcPlayFlow.js.map