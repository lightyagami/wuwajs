"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookPhotoView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../Util/LguiUtil");
const HandBookController_1 = require("./HandBookController");
class HandBookPhotoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Wei = undefined;
    this.Kei = 0;
    this.tNe = () => {
      if (this.Wei && this.Kei !== 0) {
        this.Kei = this.Kei - 1;
        this.bl();
      }
    };
    this.iNe = () => {
      if (this.Wei && this.Kei !== this.Wei.TextureList.length - 1) {
        this.Kei = this.Kei + 1;
        this.bl();
      }
    };
    this.lyt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIButtonComponent], [11, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.tNe], [10, this.iNe], [2, this.lyt], [11, this.lyt]];
  }
  OnStart() {
    this.Wei = this.OpenParam;
    if (this.Wei) {
      this.Kei = this.Wei.Index;
      this.Qei(this.Kei);
    }
  }
  Qei(t) {
    var i = this.Wei.TextureList.length;
    this.GetButton(9).RootUIComp.SetUIActive(t !== 0);
    this.GetButton(10).RootUIComp.SetUIActive(t !== i - 1);
    var i = this.GetText(6);
    if (this.Wei.DateText) {
      i.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalText(i, "DateOfAcquisition", this.Wei.DateText[t]);
    } else {
      i.SetUIActive(false);
    }
    var i = this.GetText(5);
    if (this.Wei.NameText) {
      i.SetUIActive(true);
      i.SetText(this.Wei.NameText[t]);
    } else {
      i.SetUIActive(false);
    }
    var i = this.GetText(4);
    if (this.Wei.TypeText) {
      i.SetUIActive(true);
      i.SetText(this.Wei.TypeText[t]);
    } else {
      i.SetUIActive(false);
    }
    var i = this.GetText(8);
    if (this.Wei.DescrtptionText) {
      i.SetUIActive(true);
      i.SetText(this.Wei.DescrtptionText[t]);
    } else {
      i.SetUIActive(false);
    }
    var i = this.GetTexture(3);
    if (this.Wei.TextureList) {
      i.SetUIActive(true);
      this.UTt(this.Wei.TextureList[t]);
    } else {
      i.SetUIActive(false);
    }
  }
  UTt(t) {
    this.SetTextureByPath(t, this.GetTexture(3));
  }
  bl() {
    if (this.Wei.HandBookType === 2) {
      this.Xei(this.Kei);
    } else if (this.Wei.HandBookType === 6) {
      this.$ei(this.Kei);
    } else if (this.Wei.HandBookType === 7) {
      this.Yei(this.Kei);
    }
  }
  $ei(t) {
    t = this.Wei.TextureList[t];
    this.UTt(t);
  }
  Xei(t) {
    this.Jei(t);
    this.Qei(t);
  }
  Jei(t) {
    var t = this.Wei.ConfigId[t];
    var i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, t);
    if (i && !i.IsRead) {
      HandBookController_1.HandBookController.SendIllustratedReadRequest(2, t);
    }
  }
  Yei(t) {
    this.zei(t);
    this.Qei(t);
  }
  zei(t) {
    var t = this.Wei.ConfigId[t];
    var i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(7, t);
    if (i && !i.IsRead) {
      HandBookController_1.HandBookController.SendIllustratedReadRequest(7, t);
    }
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhotoSelect, this.Wei.ConfigId[this.Kei]);
    this.Wei = undefined;
    this.Kei = 0;
  }
}
exports.HandBookPhotoView = HandBookPhotoView;
//# sourceMappingURL=HandBookPhotoView.js.map