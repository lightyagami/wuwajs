"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiScanItemMarkItemView = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HonamiNiagaraPanel_1 = require("../SubPanel/HonamiNiagaraPanel");
const ServerMarkItemView_1 = require("./ServerMarkItemView");
class HonamiScanItemMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e);
    this.Xvm = new HonamiNiagaraPanel_1.HonamiNiagaraPanel();
    this.fRi = () => {
      if (this.Holder?.MapType === 2) {
        if (ModelManager_1.ModelManager.HonamiStoryModel.ScanMarkItemIds.has(this.Holder.MarkId)) {
          this.Xvm.SetUiActive(true);
          ModelManager_1.ModelManager.HonamiStoryModel.ScanMarkItemIds.delete(this.Holder.MarkId);
          this.Xvm.SetNiagaraAndShow("NS_Fx_LGUI_HonamiStory_Map_Burst");
        } else {
          this.Xvm.SetUiActive(false);
        }
      }
    };
  }
  RegisterEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapViewOpened, this.fRi);
  }
  UnRegisterEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapViewOpened, this.fRi);
  }
  async OnBeforeStartAsync() {
    await this.Xvm.CreateByResourceIdAsync("UiItem_MapMarkActiveScan", this.RootItem);
  }
  OnIconPathChanged(e) {
    super.OnIconPathChanged(e);
    this.MarkItemChildIconHandle.Update();
    this.MarkItemChildIconHandle.ApplyModified();
  }
}
exports.HonamiScanItemMarkItemView = HonamiScanItemMarkItemView;
//# sourceMappingURL=HonamiScanItemMarkItemView.js.map