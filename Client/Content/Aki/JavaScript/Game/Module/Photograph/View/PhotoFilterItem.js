"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoFilterItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../Core/Common/Info");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhotographController_1 = require("../PhotographController");
const PhotographDefine_1 = require("../PhotographDefine");
class PhotoFilterItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.f1_ = 0;
    this.gP_ = undefined;
    this.fPi = undefined;
    this.moc = undefined;
    this.v1_ = undefined;
    this.Lrt = false;
    this.pP_ = () => {
      return ModelManager_1.ModelManager.PhotographModel.GetPhotographFilter() !== this.f1_;
    };
    this.pQi = (e, t = 0) => {
      PhotographController_1.PhotographController.SetSingleFilterStrength(this.f1_, e);
      e = Math.floor(e * PhotographDefine_1.FILTER_MAX_STREGNTH);
      this.GetText(3).SetText(e.toString());
    };
    this.OnClicked = e => {
      if (ModelManager_1.ModelManager.PhotographModel.GetPhotographFilter() === this.f1_) {
        this.SetFilterStrengthVisible(e === 1);
      } else if (this.fPi) {
        this.fPi(this, true);
      }
    };
    this.FBt = () => {
      if (!this.pP_()) {
        if (Info_1.Info.IsInGamepad() && this.moc) {
          this.moc(this);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UISliderComponent], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UISprite]];
    this.BtnBindInfo = [[0, this.OnClicked]];
  }
  OnStart() {
    this.GetSlider(4)?.OnValueChangeCb.Bind(this.pQi);
    this.gP_ = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetExtendToggle(0).OnPointEnterCallBack.Bind(this.FBt);
  }
  OnBeforeDestroy() {
    this.GetSlider(4)?.OnValueChangeCb.Unbind();
    this.gP_ = undefined;
  }
  OnBeforeShow() {
    var e = !this.pP_();
    this.SetSelected(e);
  }
  Refresh(e) {
    var t;
    if (e !== 0 && (this.f1_ = e, this.v1_ = ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoFilterConfigById(e), this.v1_)) {
      e = this.v1_.Name;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
      e = this.v1_.Icon;
      this.SetTextureByPath(e, this.GetTexture(2));
      (e = this.GetSlider(4))?.SetMinValue(0, false, false);
      e?.SetMaxValue(1, false, false);
      t = ModelManager_1.ModelManager.PhotographModel.GetFilterStrengthByFilterId(this.f1_);
      e?.SetValue(t, false);
      e = Math.floor(t * PhotographDefine_1.FILTER_MAX_STREGNTH);
      this.GetText(3).SetText(e.toString());
    }
  }
  BindOnSelected(e) {
    this.fPi = e;
  }
  SetSelected(e, t = false) {
    this.GetSprite(7)?.SetUIActive(e);
    this.SetFilterStrengthVisible(e, false);
    var i = this.GetExtendToggle(0);
    if (e) {
      i.SetToggleStateForce(1, t);
      ModelManager_1.ModelManager.PhotographModel?.SetPhotographFilter(this.f1_);
      PhotographController_1.PhotographController.InitPostProcessVolBlendWeight(this.f1_);
    } else {
      i.SetToggleStateForce(0, t);
    }
  }
  SetFilterStrengthVisible(e, t = true) {
    const i = this.GetItem(8);
    if (this.f1_ === PhotographDefine_1.DEFAULT_FILTER_CONFIGID) {
      this.GetSprite(9)?.SetUIActive(false);
      i?.SetUIActive(false);
    } else if (t) {
      if (e) {
        i?.SetUIActive(true);
        if (this.moc) {
          this.moc(this);
        }
        this.gP_?.PlayLevelSequenceByName("Unfold");
      } else {
        this.gP_?.PlaySequenceAsync("Collapse", new CustomPromise_1.CustomPromise()).then(() => {
          i?.SetUIActive(false);
        });
      }
    } else {
      i?.SetUIActive(e);
    }
  }
  ShowFilterItem() {
    this.Lrt = true;
    this.SetActive(true);
  }
  GetPhotoFilterId() {
    return this.f1_;
  }
  PlayDisappearSequence(e) {
    this.Lrt = false;
    if (e) {
      this.PlayDisappearSequenceAsync();
    } else {
      this.SetActive(false);
    }
  }
  async PlayDisappearSequenceAsync() {
    await this.gP_?.PlaySequenceAsync("SwitchOut", new CustomPromise_1.CustomPromise()).then(() => {
      var e;
      this.SetActive(this.Lrt);
      if (this.Lrt) {
        e = !this.pP_();
        this.SetSelected(e);
      }
    });
  }
  BindScrollToSelectedItem(e) {
    this.moc = e;
  }
}
exports.PhotoFilterItem = PhotoFilterItem;
//# sourceMappingURL=PhotoFilterItem.js.map