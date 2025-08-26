"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteSelectOptionPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CommonQteSelectOptionContext_1 = require("../CommonQte/CommonQteSelectOptionContext");
const CommonQteItemBase_1 = require("./CommonQteItemBase");
const CommonQteSelectOptionItem_1 = require("./CommonQteSelectOptionItem");
const MAX_OPTION_NUM = 4;
const OPTION_ITEM_OFFSET = 112;
class CommonQteSelectOptionPanel extends CommonQteItemBase_1.CommonQteItemBase {
  constructor() {
    super(...arguments);
    this.KZu = 0;
    this.iIl = -1;
    this.fS1 = undefined;
    this.XZu = [];
    this.sjc = [];
    this.Tyr = undefined;
    this.ajc = undefined;
    this.lqt = () => {
      this.RefreshOnInputControllerChange();
    };
  }
  OnRegisterComponent() {
    if (Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UISliderComponent], [6, UE.UIItem]];
    } else {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UISliderComponent], [12, UE.UIItem], [13, UE.UISliderComponent], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem]];
    }
  }
  SetPreloadQte(t) {
    this.KZu = t;
  }
  async OnBeforeStartAsync() {
    var t = ModelManager_1.ModelManager.CommonQteModel?.GetCommonQteConfig(this.KZu)?.BaseConfig.SelectOptionConfig;
    if (t) {
      var s = [];
      var o = t.UIConfigList;
      var h = Math.min(MAX_OPTION_NUM, o.Num());
      let e = undefined;
      let i = undefined;
      if (Info_1.Info.IsInTouch()) {
        e = [this.GetItem(0), this.GetItem(1), this.GetItem(2), this.GetItem(3)];
      } else {
        e = [this.GetItem(0), this.GetItem(1), this.GetItem(2), this.GetItem(3)];
        i = [this.GetItem(6), this.GetItem(7), this.GetItem(8), this.GetItem(9)];
      }
      for (let t = 0; t < h; t++) {
        var n = o.Get(t);
        var r = e[t];
        var m = new CommonQteSelectOptionItem_1.CommonQteSelectOptionItem();
        m.Init(t, n, this);
        this.XZu.push(m);
        s.push(m.CreateByActorAsync(r.GetOwner()));
        if (i) {
          m = i[t];
          (r = new CommonQteSelectOptionItem_1.CommonQteSelectOptionItem()).Init(t, n, this);
          this.sjc.push(r);
          s.push(r.CreateByActorAsync(m.GetOwner()));
        }
      }
      for (let t = h; t < e.length; t++) {
        e[t]?.SetUIActive(false);
      }
      if (i) {
        for (let t = h; t < i.length; t++) {
          i[t]?.SetUIActive(false);
        }
      }
      await Promise.all(s);
    }
  }
  OnStart() {
    super.OnStart();
    if (Info_1.Info.IsInTouch()) {
      this.Tyr = this.GetSlider(5);
      this.GetItem(4)?.SetUIActive(false);
    } else {
      this.Tyr = this.GetSlider(11);
      this.ajc = this.GetSlider(13);
      this.GetItem(10)?.SetUIActive(false);
      this.GetItem(12)?.SetUIActive(false);
      this.SetAttachRootItem(this.GetItem(16));
    }
    this.ljc();
    this.RefreshOnInputControllerChange();
    this.SetUiActive(false);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    if (!this.IsQteEnd && this.fS1?.IsActive()) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.fS1.HandleId);
    }
    for (const t of this.XZu) {
      t.Destroy();
    }
    this.XZu.length = 0;
    for (const e of this.sjc) {
      e.Destroy();
    }
    this.sjc.length = 0;
    this.fS1 = undefined;
    this.iIl = -1;
  }
  RefreshOnInputControllerChange() {
    var t;
    if (this.sjc.length !== 0) {
      t = Info_1.Info.IsInGamepad();
      this.GetItem(4)?.SetUIActive(!t);
      this.GetItem(14)?.SetUIActive(!t);
      this.GetItem(5)?.SetUIActive(t);
      this.GetItem(15)?.SetUIActive(t);
      if (this.fS1?.IsPermanent ?? true) {
        this.GetItem(10)?.SetUIActive(false);
        this.GetItem(12)?.SetUIActive(false);
      } else {
        this.GetItem(10)?.SetUIActive(!t);
        this.GetItem(12)?.SetUIActive(t);
      }
    }
  }
  ljc() {
    switch (this.XZu.length) {
      case 2:
        this.XZu[0].SetAnchorOffsetX(OPTION_ITEM_OFFSET);
        break;
      case 3:
        this.XZu[1].SetAnchorOffsetX(OPTION_ITEM_OFFSET);
        break;
      case 4:
        this.XZu[1].SetAnchorOffsetX(OPTION_ITEM_OFFSET);
        this.XZu[2].SetAnchorOffsetX(OPTION_ITEM_OFFSET);
    }
  }
  SetQteContext(t) {
    if (t instanceof CommonQteSelectOptionContext_1.CommonQteSelectOptionContext) {
      this.iIl = t.HandleId;
      if (!(this.fS1 = t).IsPermanent) {
        (Info_1.Info.IsInTouch() ? this.GetItem(4) : (this.GetItem(10)?.SetUIActive(true), this.GetItem(12)))?.SetUIActive(true);
      }
      if (t.IsAttachToActor()) {
        (Info_1.Info.IsInTouch() ? this.GetItem(6) : (this.GetItem(14)?.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector), this.GetItem(15)))?.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector);
      }
      for (const e of this.XZu) {
        e.SetQteContext(t);
      }
      for (const i of this.sjc) {
        i.SetQteContext(t);
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
      for (const t of this.XZu) {
        t.PlayQteStart();
      }
      for (const e of this.sjc) {
        e.PlayQteStart();
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
      for (const t of [...this.XZu]) {
        t.PlayQteEnd();
      }
      for (const e of [...this.sjc]) {
        e.PlayQteEnd();
      }
    }
  }
  OnOptionItemPlayEnded(t) {
    const e = this.XZu.indexOf(t);
    if (e !== -1) {
      this.XZu.splice(e, 1);
    } else if (this.sjc.length > 0) {
      const e = this.sjc.indexOf(t);
      if (e !== -1) {
        this.sjc.splice(e, 1);
      }
    }
    if (this.XZu.length === 0 && this.sjc.length === 0) {
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
      if (!!this.IsQteStart && !this.IsQteEnd && !this.IsQtePause) {
        if (!this.fS1 || this.fS1.IsInvalid()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("CommonQte", 67, "Qte界面Context已无效, 强制关闭界面", ["State", this.fS1?.State]);
          }
          this.HandleQteEnd();
        } else {
          this.fS1.UpdateTime(t);
          if (!this.fS1.IsPermanent) {
            t = this.fS1?.GetRemainingTimeProgress() ?? 1;
            this.Tyr?.SetValue(t);
            this.ajc?.SetValue(t);
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
exports.CommonQteSelectOptionPanel = CommonQteSelectOptionPanel;
//# sourceMappingURL=CommonQteSelectOptionPanel.js.map