"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigMarkItemView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const MarkItemView_1 = require("./MarkItemView");
class ConfigMarkItemView extends MarkItemView_1.MarkItemView {
  constructor(e) {
    super(e);
    this.dRi = undefined;
    this.CRi = undefined;
  }
  get MarkConfig() {
    return this.Holder.MarkConfig;
  }
  OnInitialize() {
    super.OnInitialize();
    this.CRi = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnDataInitialized(e) {
    this.CRi = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnViewInitialize() {
    this.OnIconPathChanged(this.Holder.IconPath);
  }
  async PlayUnlockSequence() {
    await this.LoadingPromise;
    if (!this.dRi) {
      var i = await this.LoadPrefabAsync(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_Mark_Prefab_Effect"), this.RootItem);
      this.dRi = i.GetComponentByClass(UE.UIItem.StaticClass());
      let e = i.GetComponentByClass(UE.UINiagara.StaticClass());
      if (e = e || this.dRi.GetAttachUIChild(0)?.GetOwner()?.GetComponentByClass(UE.UINiagara.StaticClass())) {
        if (this.Holder?.MapType === 2) {
          e.bAdaptPosAndSizeChanged = false;
        } else {
          e.bAdaptPosAndSizeChanged = true;
        }
      }
    }
    this.CRi?.PlayLevelSequenceByName("Start");
  }
  OnBeforeDestroy() {
    if (this.dRi) {
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.dRi.GetOwner(), true);
    }
    super.OnBeforeDestroy();
  }
  OnIconPathChanged(e) {
    var i;
    if (this.IsViewReady) {
      i = this.GetSprite(1);
      this.LoadIcon(i, e);
      this.MarkItemChildIconHandle.Update();
      this.MarkItemChildIconHandle.ApplyModified();
    }
  }
  UpdateIcon() {
    var e = this.Holder.IconPath;
    this.OnIconPathChanged(e);
  }
}
exports.ConfigMarkItemView = ConfigMarkItemView;
//# sourceMappingURL=ConfigMarkItemView.js.map