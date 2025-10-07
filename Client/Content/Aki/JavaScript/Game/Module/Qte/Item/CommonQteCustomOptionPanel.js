"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteCustomOptionPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CommonQteSelectOptionContext_1 = require("../CommonQte/CommonQteSelectOptionContext");
const CommonQteCustomOptionItem_1 = require("./CommonQteCustomOptionItem");
const CommonQteItemBase_1 = require("./CommonQteItemBase");
class CommonQteCustomOptionPanel extends CommonQteItemBase_1.CommonQteItemBase {
  constructor() {
    super(...arguments);
    this.pQc = 0;
    this.iIl = -1;
    this.fS1 = undefined;
    this.vQc = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  SetPreloadQte(t) {
    this.pQc = t;
  }
  async OnBeforeStartAsync() {
    var t = ModelManager_1.ModelManager.CommonQteModel?.GetCommonQteConfig(this.pQc)?.BaseConfig.SelectOptionConfig;
    if (t) {
      var e = [];
      var o = t.UIConfigList;
      for (let t = 0; t < o.Num(); t++) {
        var s = o.Get(t);
        var i = new CommonQteCustomOptionItem_1.CommonQteCustomOptionItem();
        i.Init(t, s, this);
        this.vQc.push(i);
        e.push(i.CreateByResourceIdAsync("UiItem_QteBtnSingleTap", this.GetRootItem()));
      }
      await Promise.all(e);
    }
  }
  OnStart() {
    super.OnStart();
    this.SetUiActive(false);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    if (!this.IsQteEnd && this.fS1?.IsActive()) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.fS1.HandleId);
    }
    for (const t of this.vQc) {
      t.Destroy();
    }
    this.vQc.length = 0;
    this.fS1 = undefined;
    this.iIl = -1;
  }
  SetQteContext(t) {
    if (t instanceof CommonQteSelectOptionContext_1.CommonQteSelectOptionContext) {
      this.iIl = t.HandleId;
      this.fS1 = t;
      for (const e of this.vQc) {
        e.SetQteContext(t);
      }
      this.SetQteActive(t);
    }
  }
  PlayQteStart() {
    if (this.IsQteActive && !this.IsQteEnd && !this.IsQtePause && this.fS1) {
      this.IsQteStart = true;
      this.IsQtePlayStart = true;
      this.IsQteInteractive = true;
      this.SetUiActive(true);
      for (const t of this.vQc) {
        t.PlayQteStart();
      }
      ControllerHolder_1.ControllerHolder.CommonQteController.SetExpiredTimer(this.fS1);
    }
  }
  RefreshOnBattleUiVisibleChanged() {
    var t;
    if (!this.IsAttaching) {
      if (this.fS1?.Source === 0) {
        t = ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(20);
        this.SetActive(t);
      }
    }
  }
  CommonQteEnd(t) {
    if (this.iIl === t) {
      this.HandleQteEnd();
    }
  }
  HandleQteEnd() {
    if (!this.IsQteEnd) {
      this.IsQteEnd = true;
      this.ClearTickTimer();
      for (const t of [...this.vQc]) {
        t.PlayQteEnd();
      }
    }
  }
  OnOptionItemPlayEnded(t) {
    t = this.vQc.indexOf(t);
    if (t !== -1) {
      this.vQc.splice(t, 1);
    }
    if (this.vQc.length === 0) {
      this.Destroy();
    }
  }
  OnQtePause() {
    if (this.fS1) {
      ControllerHolder_1.ControllerHolder.CommonQteController.PauseQte(this.fS1.HandleId);
    }
  }
  OnQteResume() {
    if (!this.IsQtePlayStart) {
      this.PlayQteStart();
    }
    if (this.fS1) {
      ControllerHolder_1.ControllerHolder.CommonQteController.ResumeQte(this.fS1.HandleId);
    }
  }
  OnTick(t) {
    if (this.RootItem?.IsValid()) {
      if (this.IsQteStart && !this.IsQteEnd && !this.IsQtePause) {
        if (!this.fS1 || this.fS1.IsInvalid()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("CommonQte", 67, "Qte界面Context已无效, 强制关闭界面", ["State", this.fS1?.State]);
          }
          this.HandleQteEnd();
        } else {
          this.fS1.UpdateTime(t);
          if (!this.fS1.IsPermanent) {
            var e = this.fS1?.GetRemainingTimeProgress() ?? 1;
            for (const o of this.vQc) {
              o.SetProgress(e);
            }
          }
          if (ModelManager_1.ModelManager.CommonQteModel?.IsRefreshMode) {
            for (const s of this.vQc) {
              s.RefreshUiOffset();
            }
            if (this.IsAttaching) {
              this.Reattach(this.fS1);
            }
          }
        }
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "Item已销毁, 强制停止Qte");
      }
      this.HandleQteEnd();
    }
  }
}
exports.CommonQteCustomOptionPanel = CommonQteCustomOptionPanel;
//# sourceMappingURL=CommonQteCustomOptionPanel.js.map