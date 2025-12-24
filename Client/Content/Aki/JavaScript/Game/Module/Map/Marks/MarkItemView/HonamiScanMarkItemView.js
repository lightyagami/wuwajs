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
    this.Xvm = new HonamiNiagaraPanel_1.HonamiNiagaraPanel();
    this.Yvm = e => {
      if (this.MarkConfig.MarkId === e) {
        (e = this.Holder).UpdateIcon();
        this.OnIconPathChanged(e.IconPath);
      }
    };
    this.fRi = () => {
      if (this.Holder?.MapType === 2) {
        if (ModelManager_1.ModelManager.HonamiStoryModel.ScanMarkId !== this.Holder.MarkId) {
          this.Xvm.SetUiActive(false);
        } else {
          this.Xvm.SetUiActive(true);
          ModelManager_1.ModelManager.HonamiStoryModel.ScanMarkId = undefined;
          this.Xvm.SetNiagaraAndShow("NS_Fx_LGUI_HonamiStory_Map_Kuosan", "play_ui_honamistory_scan_mark_start");
        }
      }
    };
  }
  RegisterEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiScanMarkInfoUpdate, this.Yvm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapViewOpened, this.fRi);
  }
  UnRegisterEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiScanMarkInfoUpdate, this.Yvm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapViewOpened, this.fRi);
  }
  async OnBeforeStartAsync() {
    await this.Xvm.CreateByResourceIdAsync("UiItem_MapMarkActiveScan", this.RootItem);
  }
  OnBeforeDestroy() {
    this.Xvm.SetUiActive(false);
  }
}
exports.HonamiScanMarkItemView = HonamiScanMarkItemView;
//# sourceMappingURL=HonamiScanMarkItemView.js.map