"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderConfig = exports.INVALID_SECTION_INDEX = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
exports.INVALID_SECTION_INDEX = 99999;
class RenderConfig {
  static GenerateExtraMeshName(e) {
    return e + "_ExtraMesh";
  }
  static GetBodyTypeByName(e) {
    this.Wlr ||= new Map([["CharacterMesh0", 0], ["WeaponCase0", 1], ["WeaponCase1", 1], ["WeaponCase2", 1], ["WeaponCase3", 1], ["WeaponCase4", 1], ["HuluCase", 2], ["OtherCase0", 3], ["OtherCase1", 3], ["OtherCase2", 3], ["OtherCase3", 3], ["OtherCase4", 3]]);
    return this.Wlr.get(e);
  }
  static GetEntityRenderPriority(e, n) {
    if (e) {
      return 3;
    }
    this.Klr ||= new Map([[Protocol_1.Aki.Protocol.kks.Proto_Player, 1], [Protocol_1.Aki.Protocol.kks.Proto_Npc, 2], [Protocol_1.Aki.Protocol.kks.Proto_Monster, 4], [Protocol_1.Aki.Protocol.kks.Proto_Vision, 5], [Protocol_1.Aki.Protocol.kks.Proto_Animal, 6], [Protocol_1.Aki.Protocol.kks.Proto_SceneItem, 7], [Protocol_1.Aki.Protocol.kks.Proto_Custom, 8]]);
    e = this.Klr.get(n);
    return e || 0;
  }
  static GetBodyNamesByBodyType(e) {
    this.Qlr ||= new Map([[0, RenderConfig.MaterialControlAllCaseArray], [1, RenderConfig.MaterialControlBodyCaseArray], [2, RenderConfig.MaterialControlWeaponCaseArray], [3, RenderConfig.MaterialControlHuluCaseArray], [5, RenderConfig.MaterialControlOtherCaseArray], [4, RenderConfig.MaterialControlWeaponAndHuluCaseArray], [6, RenderConfig.MaterialControlExtraBodyCaseArray]]);
    return this.Qlr.get(e);
  }
  static GetMaterialSlotType(e) {
    if (e.startsWith("MI_")) {
      return 1;
    } else if (e.startsWith("OL_")) {
      return 2;
    } else if (e.startsWith("HETA_")) {
      return 4;
    } else if (e.startsWith("HET_")) {
      return 3;
    } else if (e.startsWith("FS_")) {
      return 5;
    } else {
      return 0;
    }
  }
  static GetMaterialPartType(e) {
    e = e.toLocaleLowerCase();
    if (e.includes("bang")) {
      return 0;
    } else if (e.includes("hair") || e.includes("fur")) {
      return 1;
    } else if (e.includes("head")) {
      return 2;
    } else if (e.includes("face")) {
      return 3;
    } else if (e.includes("eye")) {
      return 4;
    } else if (e.includes("body")) {
      return 5;
    } else if (e.includes("up")) {
      return 6;
    } else if (e.includes("down")) {
      return 7;
    } else if (e.includes("leg")) {
      return 8;
    } else if (e.includes("cloth")) {
      return 9;
    } else if (e.includes("skirt")) {
      return 10;
    } else if (e.includes("star")) {
      return 11;
    } else if (e.includes("core")) {
      return 12;
    } else if (e.includes("hand")) {
      return 13;
    } else if (e.includes("wing")) {
      return 14;
    } else if (e.includes("prop")) {
      return 15;
    } else if (e.includes("weapon")) {
      return 16;
    } else {
      return 17;
    }
  }
}
(exports.RenderConfig = RenderConfig).UseMaterialContainerV2 = true;
RenderConfig.UseCharUnrealCacheObject = true;
RenderConfig.MaterialControlAllCaseArray = ["CharacterMesh0", "WeaponCase0", "WeaponCase1", "WeaponCase2", "WeaponCase3", "WeaponCase4", "HuluCase", "OtherCase0", "OtherCase1", "OtherCase2", "OtherCase3", "OtherCase4", "GenericCase0", "GenericCase1", "GenericCase2", "GenericCase3", "GenericCase4"];
RenderConfig.MaterialControlBodyCaseArray = ["CharacterMesh0"];
RenderConfig.MaterialControlWeaponCaseArray = ["WeaponCase0", "WeaponCase1", "WeaponCase2", "WeaponCase3", "WeaponCase4"];
RenderConfig.MaterialControlHuluCaseArray = ["HuluCase"];
RenderConfig.MaterialControlWeaponAndHuluCaseArray = ["WeaponCase0", "WeaponCase1", "WeaponCase2", "WeaponCase3", "WeaponCase4", "HuluCase"];
RenderConfig.MaterialControlOtherCaseArray = ["OtherCase0", "OtherCase1", "OtherCase2", "OtherCase3", "OtherCase4"];
RenderConfig.MaterialControlExtraBodyCaseArray = ["CharacterMesh0_ExtraMesh"];
RenderConfig.MeshPartsHeadArray = [0, 1, 2, 3, 4];
RenderConfig.Wlr = undefined;
RenderConfig.Klr = undefined;
RenderConfig.Qlr = undefined;
RenderConfig.CharMaterialContainerDataPath = "/Game/Aki/Render/RuntimeBP/Character/MaterialContainer/DA_CharacterMaterialContainerData.DA_CharacterMaterialContainerData";
RenderConfig.HolographicPath = "/Game/Aki/Effect/EffectGroup/Sequence/Common/DA_Fx_Group_Seq_Communicate.DA_Fx_Group_Seq_Communicate";
RenderConfig.RefErrorCount = 20;
RenderConfig.UseRim = new UE.FName("E_Rim_UseRim");
RenderConfig.RimUseTex = new UE.FName("E_Rim_UseTex");
RenderConfig.RimChannel = new UE.FName("E_Rim_Channel");
RenderConfig.RimRange = new UE.FName("E_Rim_RimRange");
RenderConfig.RimColor = new UE.FName("E_Rim_RimColor");
RenderConfig.RimIntensity = new UE.FName("E_Rim_Intensity");
RenderConfig.UseDissolve = new UE.FName("E_Dissolve_UseDissolve");
RenderConfig.DissolveChannelSwitch = new UE.FName("E_Dissolve_Channel");
RenderConfig.DissolveProgress = new UE.FName("E_Dissolve_Progress");
RenderConfig.DissolveSmooth = new UE.FName("E_Dissolve_Smooth");
RenderConfig.DissolveMulti = new UE.FName("E_Dissolve_Multi");
RenderConfig.DissolveEmission = new UE.FName("E_Dissolve_Emission");
RenderConfig.OutlineUseTex = new UE.FName("E_Outline_UseTex");
RenderConfig.OutlineWidth = new UE.FName("MaxOutlineWidth");
RenderConfig.OutlineColor = new UE.FName("E_Outline_EmissionColor");
RenderConfig.OutlineColorIntensity = new UE.FName("E_Outline_EmissionIntensity");
RenderConfig.UseTexture = new UE.FName("E_Tex_UseTex");
RenderConfig.TextureUseMask = new UE.FName("E_Tex_UseMask");
RenderConfig.TextureMaskRange = new UE.FName("E_Tex_MaskRange");
RenderConfig.NoiseTexture = new UE.FName("E_Tex_NoiseTex");
RenderConfig.TextureUvSwitch = new UE.FName("E_Tex_UVSwitch");
RenderConfig.TextureUseScreenUv = new UE.FName("E_Tex_UseScreenUV");
RenderConfig.TextureScaleAndOffset = new UE.FName("E_Tex_ScaleAndOffset");
RenderConfig.TextureSpeed = new UE.FName("E_Tex_Speed");
RenderConfig.TextureColor = new UE.FName("E_Tex_Color");
RenderConfig.TextureRotation = new UE.FName("E_Tex_Rotation");
RenderConfig.BaseUseTex = new UE.FName("E_Base_UseTex");
RenderConfig.BaseColor = new UE.FName("E_Base_Color");
RenderConfig.BaseColorIntensity = new UE.FName("E_Base_Intensity");
RenderConfig.EmissionUseTex = new UE.FName("E_Emission_UseTex");
RenderConfig.EmissionColor = new UE.FName("E_Emission_Color");
RenderConfig.EmissionIntensity = new UE.FName("E_Emission_Intensity");
RenderConfig.UseHeadMaskHideEffect = new UE.FName("E_UseHeadMaskHide");
RenderConfig.DitherUseInRayTracing = new UE.FName("E_UseInRayTracing");
RenderConfig.UseDitherEffect = new UE.FName("E_Dither_UseDither");
RenderConfig.DitherValue = new UE.FName("E_Dither_DitherValue");
RenderConfig.DitherValueMainPass = new UE.FName("E_Dither_DitherValue_MainPass");
RenderConfig.UseDitherEffect2 = new UE.FName("E_Dither_UseDither2");
RenderConfig.DitherValue2 = new UE.FName("E_Dither_DitherValue2");
RenderConfig.CharacterAmbientColor = new UE.FName("CharacterAmbientColor");
RenderConfig.CharacterSkinAmbientColor = new UE.FName("CharacterSkinAmbientColor");
RenderConfig.EnableTransfer = new UE.FName("E_Transfer_Enable");
RenderConfig.TransferDensity = new UE.FName("E_Transfer_Density");
RenderConfig.TransferHardness = new UE.FName("E_Transfer_Hardness");
RenderConfig.TransferDirection = new UE.FName("E_Transfer_Direction");
RenderConfig.TransferHeight = new UE.FName("E_Transfer_Height");
RenderConfig.TransferOutlineColor = new UE.FName("E_Transfer_OutlineColor");
RenderConfig.MotionRange = new UE.FName("E_MotionRange");
RenderConfig.MotionOffset = new UE.FName("E_Motion_Offset");
RenderConfig.MotionNoiseSpeed = new UE.FName("E_Motion_NoiseSpeed");
RenderConfig.StarScarEnergyControl = new UE.FName("XingHenControl");
RenderConfig.TexMipOffset = new UE.FName("Tex_Mip_Offset");
RenderConfig.RootName = new UE.FName("Root");
RenderConfig.UIName = new UE.FName("UI");
RenderConfig.GlobalRainIntensity = new UE.FName("GlobalRainIntensity");
RenderConfig.GlobalSnowIntensity = new UE.FName("GlobalSnowIntensity");
RenderConfig.GlobalWindSpeed = new UE.FName("GlobalWindSpeed");
RenderConfig.GlobalGrassAO = new UE.FName("GlobalGrassAO");
RenderConfig.GlobalMainLightVector = new UE.FName("GlobalSceneMainLightDirection");
RenderConfig.GlobalLensFlareColorTint = new UE.FName("GlobalLensFlareColorTint");
RenderConfig.GlobalCharacterPreviousWP = new UE.FName("GlobalCharacterPreviousWP");
RenderConfig.GlobalCharacterWorldPosition = new UE.FName("GlobalCharacterWorldPosition");
RenderConfig.GlobalCharacterWeaponPosition = new UE.FName("GlobalCharacterWeaponPosition");
RenderConfig.GlobalCharacterWorldForwardDirection = new UE.FName("GlobalCharacterWorldForwardDirection");
RenderConfig.GlobalCharacterOnGround = new UE.FName("GlobalCharacterOnGround");
RenderConfig.GlobalCameraPosAndRadius = new UE.FName("GlobalCameraPosAndRadius");
RenderConfig.UseSocketTransform = new UE.FName("UseSocketTransform");
RenderConfig.UseClipboardTransform = new UE.FName("UseClipboardTransform");
RenderConfig.UseSocketTransform2 = new UE.FName("使用插槽变换信息");
RenderConfig.UseClipboardTransform2 = new UE.FName("使用剪切板变换信息");
RenderConfig.PhysicsActor = new UE.FName("PhysicsActor");
RenderConfig.WaterCollisionProfileName = new UE.FName("水体");
RenderConfig.UIShowBrightness = new UE.FName("Lumin");
RenderConfig.UIShowSaturation = new UE.FName("Saturation");
RenderConfig.UIShowContrast = new UE.FName("Contrast");
RenderConfig.GlobalTimeHour = new UE.FName("GlobalTimeHour");
RenderConfig.GlobalTimeMinutes = new UE.FName("GlobalTimeMinutes");
RenderConfig.GravityDirection = new UE.FName("GravityDirection");
RenderConfig.IdMaterialContainer = 1;
RenderConfig.IdMaterialController = 2;
RenderConfig.IdDitherEffect = 3;
RenderConfig.IdBadSignal = 4;
RenderConfig.IdSceneInteraction = 5;
RenderConfig.IdPropertyModifier = 6;
RenderConfig.IdComplexBroken = 7;
RenderConfig.IdNpcDitherEffect = 8;
RenderConfig.IdBodyEffect = 9;
RenderConfig.IdDecalShadow = 10;
RenderConfig.IdGrassInteraction = 11;
RenderConfig.IdExtraMesh = 12;
RenderConfig.IdMaterialContainerV2 = 13;
RenderConfig.IdMaterialControllerV2 = 14;
RenderConfig.IdEnviInteractionEffect = 15;
RenderConfig.EmptyMaterialPath = "/Game/Aki/Render/Shaders/Character/MI_Empty";
RenderConfig.E_Action_UseBaseColorScale = new UE.FName("E_Action_UseBaseColorScale");
RenderConfig.E_Action_BaseColorScale = new UE.FName("E_Action_BaseColorScale");
RenderConfig.E_Action_UseEmissionColor = new UE.FName("E_Action_UseEmissionColor");
RenderConfig.E_Action_EmissionColor = new UE.FName("E_Action_EmissionColor");
RenderConfig.E_Action_UseRimLight = new UE.FName("E_Action_UseRimLight");
RenderConfig.E_Action_RimLightColor = new UE.FName("E_Action_RimLightColor");
RenderConfig.E_Action_RimPower = new UE.FName("E_Action_RimPower");
RenderConfig.E_Action_UseEmissionChange = new UE.FName("E_Action_UseEmissionChange");
RenderConfig.E_Action_EmissionLightColorChangeColor = new UE.FName("E_Action_EmissionLightColorChangeColor");
RenderConfig.E_Action_EmissionLightColorChangeStrength = new UE.FName("E_Action_EmissionLightColorChangeStrength");
RenderConfig.E_Action_EmissionLightColorChangeProgress = new UE.FName("E_Action_EmissionLightColorChangeProgress");
RenderConfig.E_Action_UseDissolve = new UE.FName("E_Action_UseDissolve");
RenderConfig.E_Action_DissolveProgress = new UE.FName("E_Action_DissolveProgress");
RenderConfig.E_Action_DissolveAdjustment = new UE.FName("E_Action_DissolveAdjustment");
RenderConfig.E_Action_DissolveEdageWidth = new UE.FName("E_Action_DissolveEdageWidth");
RenderConfig.E_Action_DissolveEdageColor = new UE.FName("E_Action_DissolveEdageColor");
RenderConfig.E_Action_DissolveEdageStrength = new UE.FName("E_Action_DissolveEdageStrength");
RenderConfig.E_Action_DissolveTex_S_O = new UE.FName("E_Action_DissolveTex_S_O");
RenderConfig.E_Action_DissolveTexSpeed = new UE.FName("E_Action_DissolveTexSpeed");
RenderConfig.E_Tex_DissolveTexUVSwitch = new UE.FName("E_Tex_DissolveTexUVSwitch");
RenderConfig.E_Action_ScanningOutlineMixNoiseStrength = new UE.FName("E_Action_ScanningOutlineMixNoiseStrength");
RenderConfig.E_Action_GlobalBaseColorScale = new UE.FName("E_Action_GlobalBaseColorScale");
RenderConfig.E_Action_GlobalAddEmissionColor = new UE.FName("E_Action_GlobalAddEmissionColor");
RenderConfig.E_Action_ScanningOutline = new UE.FName("E_Action_ScanningOutline");
RenderConfig.E_Action_GlobalRimLight = new UE.FName("E_Action_GlobalRimLight");
RenderConfig.E_Action_UseScanning = new UE.FName("E_Action_UseScanning");
RenderConfig.E_Action_RimMix = new UE.FName("E_Action_RimMix");
RenderConfig.E_Action_ScanningOutlineStrength = new UE.FName("E_Action_ScanningOutlineStrength");
RenderConfig.E_Action_ScanningTex_S_O = new UE.FName("E_Action_ScanningTex_S_O");
RenderConfig.E_Action_ScanningOutlineColor = new UE.FName("E_Action_ScanningOutlineColor");
RenderConfig.E_Action_RimWidth = new UE.FName("E_Action_RimWidth");
RenderConfig.BrokenTex_S_O = new UE.FName("BrokenTex_S_O");
RenderConfig.OutlineTex_S_O = new UE.FName("OutlineTex_S_O");
RenderConfig.E_Action_VertexAnim_TimeDebug = new UE.FName("E_Action_VertexAnim_TimeDebug");
RenderConfig.E_Action_VertexAnim_Frame = new UE.FName("E_Action_VertexAnim_Frame");
RenderConfig.E_Action_PivotPainterTransform = new UE.FName("E_Action_PivotPainterTransform");
RenderConfig.E_Action_PivotPainter_FloatingThreshold = new UE.FName("E_Action_PivotPainter_FloatingThreshold");
RenderConfig.E_Action_UsePivotPainterWorldPositionOffset = new UE.FName("E_Action_UsePivotPainterWorldPositionOffset");
RenderConfig.E_Action_UseWPO = new UE.FName("E_Action_UseWPO");
RenderConfig.E_Action_DisableFoliageEffect = new UE.FName("E_Action_DisableFoliageEffect");
RenderConfig.E_Action_EnableFoliageEffect = new UE.FName("E_Action_EnableFoliageEffect");
RenderConfig.E_Action_RimLightColorSpecil = new UE.FName("E_Action_RimLightColorSpecil");
RenderConfig.E_Action_UseRimlightColorSpecil = new UE.FName("E_Action_UseRimlightColorSpecil");
RenderConfig.E_Action_RimlightColorStrength = new UE.FName("E_Action_RimlightColorStrength");
RenderConfig.E_Action_SimpleWPO_Normal = new UE.FName("E_Action_SimpleWPO_Normal");
RenderConfig.E_Action_SimpleWPO_Offset = new UE.FName("E_Action_SimpleWPO_Offset");
RenderConfig.E_Action_UseEmissionTex = new UE.FName("E_Action_UseEmissionTex");
RenderConfig.E_Action_EmissionTexStrength = new UE.FName("E_Action_EmissionTexStrength");
RenderConfig.E_Action_Simple_Uspeed = new UE.FName("E_Action_Simple_Uspeed");
RenderConfig.E_Action_Simple_Vspeed = new UE.FName("E_Action_Simple_Vspeed");
RenderConfig.E_Action_Simple_UseFlow = new UE.FName("E_Action_Simple_UseFlow");
RenderConfig.E_Action_UseQuanXiPinTu = new UE.FName("E_Action_UseQuanXiPinTu");
RenderConfig.E_Action_TransparencyQuanXiPinTu = new UE.FName("E_Action_TransparencyQuanXiPinTu");
RenderConfig.E_Action_TransparentColorQuanXiPinTu = new UE.FName("E_Action_TransparentColorQuanXiPinTu");
RenderConfig.E_Action_OpaqueColorQuanXiPinTu = new UE.FName("E_Action_OpaqueColorQuanXiPinTu");
RenderConfig.E_Action_UseQuanXiFengSuo = new UE.FName("E_Action_UseQuanXiFengSuo");
RenderConfig.E_Action_TransparencyQuanXiFengSuo = new UE.FName("E_Action_TransparencyQuanXiFengSuo");
RenderConfig.E_Action_TransparentColorQuanXiFengSuo = new UE.FName("E_Action_TransparentColorQuanXiFengSuo"); //# sourceMappingURL=RenderConfig.js.map