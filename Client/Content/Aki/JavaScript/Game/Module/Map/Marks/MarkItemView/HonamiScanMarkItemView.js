"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiScanMarkItemView = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HonamiNiagaraPanel_1 = require("../SubPanel/HonamiNiagaraPanel");
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class HonamiScanMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
    this.Gmm = new HonamiNiagaraPanel_1.HonamiNiagaraPanel();
    this.Fmm = e => {
      if (this.MarkConfig.MarkId === e) {
        (e = this.Holder).UpdateIcon();
        this.OnIconPathChanged(e.IconPath);
      }
    };
    this.fRi = () => {
      if (this.Holder?.MapType === 2) {
        if (ModelManager_1.ModelManager.HonamiStoryModel.ScanMarkId !== this.Holder.MarkId) {
          this.Gmm.SetUiActive(false);
        } else {
          this.Gmm.SetUiActive(true);
          ModelManager_1.ModelManager.HonamiStoryModel.ScanMarkId = undefined;
          this.Gmm.SetNiagaraAndShow("NS_Fx_LGUI_HonamiStory_Map_Kuosan", "play_ui_honamistory_scan_mark_start");
        }
      }
    };
  }
  RegisterEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiScanMarkInfoUpdate, this.Fmm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapViewOpened, this.fRi);
  }
  UnRegisterEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiScanMarkInfoUpdate, this.Fmm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapViewOpened, this.fRi);
  }
  async OnBeforeStartAsync() {
    await this.Gmm.CreateByResourceIdAsync("UiItem_MapMarkActiveScan", this.RootItem);
  }
  OnBeforeDestroy() {
    this.Gmm.SetUiActive(false);
  }
}
exports.HonamiScanMarkItemView = HonamiScanMarkItemView;
//# sourceMappingURL=HonamiScanMarkItemView.js.map