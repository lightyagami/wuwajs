"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotSkipComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
class PlotSkipComponent {
  constructor(i, t, e, s, o) {
    this.dce = false;
    this.Zzi = undefined;
    this.eZi = StringUtils_1.EMPTY_STRING;
    this.tZi = true;
    this.iZi = undefined;
    this.uCa = undefined;
    this.ro_ = false;
    this.KYd = false;
    this.EnableSkipButton = i => {
      if ((!i || !!ModelManager_1.ModelManager.PlotModel.PlotConfig.CanSkip) && this.dce !== i && !(this.dce = i, this.oZi.SetUIActive(this.dce), this.dce)) {
        if (this.ro_) {
          this.ro_ = false;
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
          this.rsa?.();
        } else if (this.KYd) {
          this.KYd = false;
          UiManager_1.UiManager.CloseView("SummaryPopView");
          this.rsa?.();
        }
      }
    };
    this.rZi = () => {
      var i;
      if (this.dce) {
        this.NTt?.();
        if (StringUtils_1.StringUtils.IsEmpty(this.uCa)) {
          if (ModelManager_1.ModelManager.PlotModel.PlotConfig.IsSkipConfirmBoxShow) {
            this.tZi = true;
            (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(180)).HasToggle = true;
            i.ToggleText = this.eZi;
            i.SetToggleFunction(this.Cke);
            i.AttachView = this.iZi;
            i.FunctionMap.set(1, () => {
              if (this?.dce) {
                this.ro_ = false;
                this.rsa?.();
              }
            });
            i.FunctionMap.set(2, () => {
              if (this?.dce) {
                ModelManager_1.ModelManager.PlotModel.PlotConfig.IsSkipConfirmBoxShow = this.tZi;
                this.dce = false;
                this.ro_ = false;
                this.nZi?.();
              }
            });
            this.ro_ = ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
          } else {
            this.nZi?.();
          }
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Plot", 26, "剧情梗概", ["text", this.uCa]);
          }
          i = {
            Text: this.uCa,
            ConfirmFunc: () => {
              if (this?.dce) {
                this.KYd = false;
                this.dce = false;
                this.nZi?.();
              }
            },
            CancelFunc: () => {
              if (this?.dce) {
                this.KYd = false;
                this.rsa?.();
              }
            }
          };
          this.KYd = true;
          UiManager_1.UiManager.OpenView("SummaryPopView", i);
        }
      }
    };
    this.Cke = i => {
      if (this?.dce) {
        this.tZi = !i;
      }
    };
    this.Zzi = i;
    this.oZi = i.RootUIComp;
    this.nZi = t;
    this.NTt = e;
    this.rsa = o;
    this.iZi = s;
    this.dce = false;
    this.uCa = undefined;
    this.Zzi.OnClickCallBack.Bind(this.rZi);
    this.eZi = ConfigManager_1.ConfigManager.TextConfig?.GetTextById("PlotSkipConfirmToggle");
    if (StringUtils_1.StringUtils.IsEmpty(this.eZi)) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("剧情跳过二次确认框读不到Toggle文本 \"PlotSkipConfirmToggle\"");
      this.eZi = "";
    }
  }
  OnClear() {
    this.dce = false;
    this.Zzi?.OnClickCallBack.Unbind();
    this.Zzi = undefined;
    this.oZi = undefined;
    this.iZi = undefined;
    this.uCa = undefined;
    this.nZi = undefined;
    this.NTt = undefined;
    this.rsa = undefined;
    if (this.ro_) {
      this.ro_ = false;
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnableSkipPlot, this.EnableSkipButton);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnableSkipPlot, this.EnableSkipButton);
  }
  AddSummary(i) {
    if (i && !StringUtils_1.StringUtils.IsEmpty(i.TidOutline)) {
      i = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(i.TidOutline);
      this.uCa = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(i);
    }
  }
}
exports.PlotSkipComponent = PlotSkipComponent;
//# sourceMappingURL=PlotSkipComponent.js.map