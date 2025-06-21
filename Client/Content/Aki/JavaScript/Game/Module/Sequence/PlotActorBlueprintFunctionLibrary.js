"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiActorPool_1 = require("../../Ui/UiActorPool"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  I18nUtils_1 = require("../../Utils/I18nUtils"),
  NpcIconComponentView_1 = require("../NPC/NpcIconComponentView");
class PlotActorBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static SetI18nBillboardComponentSpriteById(t, e) {
    I18nUtils_1.I18nUtils.SetI18nBillboardComponentSpriteById(t, e)
  }
  static PlayFromStartForActor(t) {
    void 0 !== t && t.IsValid() && t.SequencePlayer && t.SequencePlayer.Play()
  }
  static StopForActor(t) {
    void 0 !== t && t.IsValid() && t.SequencePlayer?.Stop()
  }
  static UiTextureAttachToActor(t, e) {
    PlotActorBlueprintFunctionLibrary.UiAttachToActorImpAsync(t, e)
  }
  static TextNiagaraSetTextureAndLength(t, e) {
    PlotActorBlueprintFunctionLibrary.TextSetTextureAndLengthToNiagara(t, e)
  }
  static GetMediaNameByKey(t) {
    return I18nUtils_1.I18nUtils.GetI18nPlotAudioMediaName(t) ?? ""
  }
  static PostAudioEventAtActor(e, r, o, i) {
    if (e) {
      let t = 0;
      t = r && o ? AudioSystem_1.AudioSystem.PostEvent(e, i, {
        ExternalSourceName: r,
        ExternalSourceMediaName: o
      }) : AudioSystem_1.AudioSystem.PostEvent(e, i), PlotActorBlueprintFunctionLibrary.AudioHandleCache.push(t)
    }
  }
  static StopAllAudioByPostAudioEventAtActor() {
    for (const t of PlotActorBlueprintFunctionLibrary.AudioHandleCache) AudioSystem_1.AudioSystem.ExecuteAction(t, 0);
    PlotActorBlueprintFunctionLibrary.AudioHandleCache.length = 0
  }
  static AddSuffixByGender(t, e, r) {
    return "" + t + (1 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() ? e ?? "" : r ?? "")
  }
  static AddPrefixByGender(t, e, r) {
    return "" + (1 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() ? e ?? "" : r ?? "") + t
  }
  static async UiAttachToActorImpAsync(t, e) {
    var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_NPCIcon_Prefab"),
      r = (await UiActorPool_1.UiActorPool.GetAsync(r, UiLayer_1.UiLayer.WorldSpaceUiRootItem))?.Actor;
    if (void 0 !== r) {
      r.K2_AttachToActor(t, void 0, 2, 0, 1, !1), r.SetActorHiddenInGame(!1);
      const o = new NpcIconComponentView_1.NpcIconComponentView;
      await o.CreateThenShowByActorAsync(r), o.SetHeadInfoNameState(!1), o.SetDialogueActive(!1), o.SetFunctionIcon(I18nUtils_1.I18nUtils.GetI18nPathAtCurrentLanguage(e), () => {
        o.SnapSizeFromTexture()
      })
    }
  }
  static TextSetTextureAndLengthToNiagara(t, e) {
    if (t) {
      const r = t.GetComponentByClass(UE.NiagaraComponent.StaticClass());
      r && (t = I18nUtils_1.I18nUtils.GetI18nPathAtCurrentLanguage(e)) && ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture2D, t => {
        t ? (r.SetKuroNiagaraEmitterCustomTexture("TextTex", "Mask", t), r.SetNiagaraVariableFloat("TexSize", t.Blueprint_GetSizeX() / t.Blueprint_GetSizeY())) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 83, "[LLX]加载贴图失败")
      }, 102)
    }
  }
}
PlotActorBlueprintFunctionLibrary.AudioHandleCache = [], exports.default = PlotActorBlueprintFunctionLibrary;
//# sourceMappingURL=PlotActorBlueprintFunctionLibrary.js.map