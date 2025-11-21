"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundBoxMarkItemView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ServerMarkItemView_1 = require("./ServerMarkItemView");
class SoundBoxMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e);
    this.GRi = undefined;
    this.zbn = false;
  }
  async OnCreateAsync() {
    var e;
    var r;
    if (!this.GRi && (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_Mark_Radar_Effect"), e = await this.LoadPrefabAsync(e), this.GRi = e.GetComponentByClass(UE.UIItem.StaticClass()), e = this.Holder.MapType === 2, r = this.GRi.GetChildComponent(0))) {
      r.bAdaptPosAndSizeChanged = e;
      r.bResetNiagara = true;
    }
  }
  OnStart() {
    this.GRi.SetUIParent(this.GetRootItem());
    super.OnStart();
  }
  OnViewRefresh() {
    this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnSafeUpdate(e, r, t) {
    var i = this.Holder.GetSoundBoxEntityId();
    if (i) {
      i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
      this.SwitchSleepState(i === undefined);
    }
  }
  SwitchSleepState(e) {
    if (this.zbn !== e) {
      if (this.zbn = e) {
        this.SetSpriteByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e ? "SP_MarkSleep" : "SP_MarkNormal"), this.GetSprite(2), false);
        this.GetSprite(2).SetUIActive(true);
      } else {
        this.GetSprite(2).SetUIActive(false);
      }
    }
  }
  GetInteractiveFlag() {
    return false;
  }
  OnBeforeDestroy() {
    if (this.GRi) {
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.GRi.GetOwner(), true);
    }
    this.GRi = undefined;
    super.OnBeforeDestroy();
  }
}
exports.SoundBoxMarkItemView = SoundBoxMarkItemView;
//# sourceMappingURL=SoundBoxMarkItemView.js.map