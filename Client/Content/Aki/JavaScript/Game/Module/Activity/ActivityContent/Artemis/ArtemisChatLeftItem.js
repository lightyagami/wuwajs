"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisChatLeftItem = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const InfoDisplayController_1 = require("../../../InfoDisplay/InfoDisplayController");
class ArtemisChatLeftItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Qhf = undefined;
    this.SPe = undefined;
    this.CIf = (e, t) => {
      if (t === "Dele_M") {
        this.mIf(false);
        this.Muf(this.Qhf, false);
      }
    };
    this.Khf = () => {
      if (this.Qhf) {
        ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(this.Qhf);
        InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISizeControlByOther], [4, UE.UIText], [5, UE.UISprite], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UITexture], [10, UE.UISprite]];
    this.BtnBindInfo = [[8, this.Khf]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.RootActor?.OnSequencePlayEvent.Bind(this.CIf);
    this.GetText(0)?.SetUIActive(false);
    this.GetSprite(5)?.SetUIActive(false);
    this.GetItem(7)?.SetUIActive(false);
    this.GetSprite(6)?.SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.RootActor?.OnSequencePlayEvent.Unbind();
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  SetContent(e) {
    var t;
    if (e && (t = CommonParamById_1.configCommonParamById.GetStringConfig("ArtemisChatHeadIconPath"), this.NHf(t, 1), (t = CommonParamById_1.configCommonParamById.GetStringConfig("ArtemisChatHeadName")) && t?.length > 0 && this.GetText(2)?.ShowTextNew(t), this.GetUiSizeControlByOther(3).GetRootComponent().SetUIActive(e.Content?.length > 0), this.Edg(e.Content), this.Qhf = e.PicturePath, t = !!e.PicturePath && !!(e.PicturePath?.length > 0), this.GetButton(8)?.RootUIComp.SetUIActive(t), e.IsLock && this.SPe?.PlayLevelSequenceByName("Start"), this.mIf(e.IsLock), this.GetSprite(10)?.SetAlpha(e.IsShowEffect ? 1 : 0), t)) {
      this.Muf(this.Qhf, e.IsShowEffect);
    }
  }
  Edg(e) {
    if (e && e?.length > 0) {
      this.GetText(4)?.ShowTextNew(e);
      this.GetText(4)?.SetAlpha(1);
    }
  }
  NHf(e, t) {
    e = e && e?.length > 0 ? e : undefined;
    this.TrySetTextureByPath(e, this.GetTexture(t));
  }
  async Muf(e, t) {
    if (t) {
      if (t = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("MI_GlitchAimisPhoto")) {
        await this.SetTextureCustomMaterialAsync(t, this.GetTexture(9));
      }
    } else {
      this.GetTexture(9)?.SetCustomUIMaterial(undefined);
    }
    this.NHf(e, 9);
  }
  mIf(e) {
    if (e) {
      if (e = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("MI_GlitchAimisText")) {
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.MaterialInterface, e => {
          this.GetText(4)?.SetCustomUIMaterial(e);
        }, 102, this.MemoryTag);
      }
    } else {
      this.GetText(4)?.SetCustomUIMaterial(undefined);
    }
  }
  PlayFixDoneLevelSequence() {
    this.SPe?.PlayLevelSequenceByName("Fix_Done");
  }
}
exports.ArtemisChatLeftItem = ArtemisChatLeftItem;
//# sourceMappingURL=ArtemisChatLeftItem.js.map