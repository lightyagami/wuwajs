"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiActorPool_1 = require("../../Ui/UiActorPool");
const UiLayer_1 = require("../../Ui/UiLayer");
const I18nUtils_1 = require("../../Utils/I18nUtils");
const NpcIconComponentView_1 = require("../NPC/NpcIconComponentView");
class PlotActorBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static SetI18nBillboardComponentSpriteById(t, e) {
    I18nUtils_1.I18nUtils.SetI18nBillboardComponentSpriteById(t, e);
  }
  static PlayFromStartForActor(t) {
    if (t !== undefined && t.IsValid() && t.SequencePlayer) {
      t.SequencePlayer.Play();
    }
  }
  static StopForActor(t) {
    if (t !== undefined && t.IsValid()) {
      t.SequencePlayer?.Stop();
    }
  }
  static UiTextureAttachToActor(t, e) {
    PlotActorBlueprintFunctionLibrary.UiAttachToActorImpAsync(t, e);
  }
  static TextNiagaraSetTextureAndLength(t, e) {
    PlotActorBlueprintFunctionLibrary.TextSetTextureAndLengthToNiagara(t, e);
  }
  static GetMediaNameByKey(t) {
    return I18nUtils_1.I18nUtils.GetI18nPlotAudioMediaName(t) ?? "";
  }
  static PostAudioEventAtActor(e, r, o, i) {
    if (e) {
      let t = 0;
      t = r && o ? AudioSystem_1.AudioSystem.PostEvent(e, i, {
        ExternalSourceName: r,
        ExternalSourceMediaName: o
      }) : AudioSystem_1.AudioSystem.PostEvent(e, i);
      PlotActorBlueprintFunctionLibrary.AudioHandleCache.push(t);
    }
  }
  static StopAllAudioByPostAudioEventAtActor() {
    for (const t of PlotActorBlueprintFunctionLibrary.AudioHandleCache) {
      AudioSystem_1.AudioSystem.ExecuteAction(t, 0);
    }
    PlotActorBlueprintFunctionLibrary.AudioHandleCache.length = 0;
  }
  static AddSuffixByGender(t, e, r) {
    return "" + t + (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? e ?? "" : r ?? "");
  }
  static AddPrefixByGender(t, e, r) {
    return "" + (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? e ?? "" : r ?? "") + t;
  }
  static async UiAttachToActorImpAsync(t, e) {
    var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_NPCIcon_Prefab");
    var r = (await UiActorPool_1.UiActorPool.GetAsync(r, UiLayer_1.UiLayer.WorldSpaceUiRootItem))?.Actor;
    if (r !== undefined) {
      r.K2_AttachToActor(t, undefined, 2, 0, 1, false);
      r.SetActorHiddenInGame(false);
      const o = new NpcIconComponentView_1.NpcIconComponentView();
      await o.CreateThenShowByActorAsync(r);
      o.SetHeadInfoNameState(false);
      o.SetDialogueActive(false);
      o.SetFunctionIcon(I18nUtils_1.I18nUtils.GetI18nPathAtCurrentLanguage(e), () => {
        o.SnapSizeFromTexture();
      });
    }
  }
  static TextSetTextureAndLengthToNiagara(t, e) {
    if (t) {
      const r = t.GetComponentByClass(UE.NiagaraComponent.StaticClass());
      if (r && (t = I18nUtils_1.I18nUtils.GetI18nPathAtCurrentLanguage(e))) {
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture2D, t => {
          if (t) {
            r.SetKuroNiagaraEmitterCustomTexture("TextTex", "Mask", t);
            r.SetNiagaraVariableFloat("TexSize", t.Blueprint_GetSizeX() / t.Blueprint_GetSizeY());
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 83, "[LLX]加载贴图失败");
          }
        }, 102);
      }
    }
  }
}
PlotActorBlueprintFunctionLibrary.AudioHandleCache = [];
exports.default = PlotActorBlueprintFunctionLibrary; //# sourceMappingURL=PlotActorBlueprintFunctionLibrary.js.map