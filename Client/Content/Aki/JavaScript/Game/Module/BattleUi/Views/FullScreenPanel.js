"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullScreenPanel = undefined;
const puerts_1 = require("puerts");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel/BattleChildViewPanel");
const FullScreenNiagaraItem_1 = require("./FullScreenNiagaraItem");
class FullScreenPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.Dht = new Map();
    this.Rht = new Set();
    this.Uht = undefined;
    this.Aht = s => {
      var e = s.UniqueId;
      var t = s.NiagaraPath;
      this.Pht(e, t).then(e => {
        if (e) {
          for (var [t, i] of s.GetFloatParameterMap()) {
            e.SetNiagaraFloatValue(t, i);
          }
        }
      }, () => {});
    };
    this.xht = e => {
      e = e.UniqueId;
      this.wht(e);
      this.Bht(e);
    };
    this.bht = () => {
      this.qht();
    };
    this.Ght = (e, t, i) => {
      e = this.Nht(e);
      if (e) {
        e.SetNiagaraFloatValue(t, i);
      }
    };
  }
  InitializeTemp() {
    this.Oht();
  }
  Reset() {
    this.qht();
    this.kht();
    super.Reset();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddFullScreenEffect, this.Aht);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveFullScreenEffect, this.xht);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClearFullScreenEffect, this.bht);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeFullScreenNiagaraFloatParameter, this.Ght);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddFullScreenEffect, this.Aht);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveFullScreenEffect, this.xht);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClearFullScreenEffect, this.bht);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeFullScreenNiagaraFloatParameter, this.Ght);
  }
  Fht(e) {
    this.Rht.add(e);
  }
  wht(e) {
    this.Rht.delete(e);
  }
  Vht(e) {
    return this.Rht.has(e);
  }
  async Pht(e, t) {
    let i = this.Nht(e);
    if (!i) {
      this.Fht(e);
      i = await this.Hht(e);
    }
    var s = this.Vht(e);
    this.wht(e);
    if (s) {
      this.Dht.set(e, i);
      await i.LoadNiagara(t);
      if (i.GetRootItem()) {
        i.SetVisible(true);
        return i;
      }
    } else {
      i.Destroy();
    }
  }
  Bht(e) {
    var t = this.Nht(e);
    return !!t && (t.Destroy(), this.Dht.delete(e), true);
  }
  async Hht(e) {
    return await this.NewDynamicChildViewByResourceId(this.RootItem, "UiItem_FullScreenNiagara", FullScreenNiagaraItem_1.FullScreenNiagaraItem, true);
  }
  Nht(e) {
    return this.Dht.get(e);
  }
  qht() {
    if (!(this.Dht.size <= 0)) {
      for (const e of this.Dht.values()) {
        e.Reset();
      }
      this.Dht.clear();
      this.Rht.clear();
    }
  }
  Oht() {
    var e = (0, puerts_1.$ref)(undefined);
    var t = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
    if (t?.IsValid()) {
      t.GetScreenEffectFightRoot(e);
      this.Uht = (0, puerts_1.$unref)(e);
      this.Uht?.K2_AttachRootComponentTo(this.RootItem);
      ModelManager_1.ModelManager.ScreenEffectModel.SetFightRootInited(true);
    }
  }
  kht() {
    if (this.Uht?.IsValid()) {
      this.Uht.K2_DetachFromActor();
    }
    this.Uht = undefined;
    ModelManager_1.ModelManager.ScreenEffectModel?.SetFightRootInited(false);
  }
}
exports.FullScreenPanel = FullScreenPanel;
//# sourceMappingURL=FullScreenPanel.js.map