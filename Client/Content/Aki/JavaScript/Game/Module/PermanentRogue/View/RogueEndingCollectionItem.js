"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueEndingCollectionItem = undefined;
const UE = require("ue");
const RogueResDungeonConfigById_1 = require("../../../../Core/Define/ConfigQuery/RogueResDungeonConfigById");
const RogueResEndById_1 = require("../../../../Core/Define/ConfigQuery/RogueResEndById");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueEndingCollectionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.OnItemClickCall = undefined;
    this.YP = () => {
      if (this.OnItemClickCall) {
        this.OnItemClickCall(this.Lo.ConfigId);
      }
    };
    this.ww1 = () => {
      this.Uar();
    };
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResEndingRedDotUpdate, this.ww1);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResEndingRedDotUpdate, this.ww1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITextureTransitionComponent], [2, UE.UIArtText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.YP]];
  }
  Refresh(e) {
    this.Lo = e;
    var t = this.Lo.Index;
    var t = t >= 10 ? t.toString() : "0" + t;
    this.GetArtText(2)?.SetText(t);
    var t = RogueResEndById_1.configRogueResEndById.GetConfig(this.Lo.ConfigId);
    var i = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 0 ? t.CGF : t.CGM;
    if (!StringUtils_1.StringUtils.IsBlank(i) && e.IsUnlock) {
      this.GetUiTextureTransitionComponent(1)?.RootUIComp.SetUIActive(true);
      this.SetTextureTransitionByPath(i, this.GetUiTextureTransitionComponent(1));
    } else {
      this.GetUiTextureTransitionComponent(1)?.RootUIComp.SetUIActive(false);
    }
    var i = e.IsUnlock ? t.Title : "RogueRes_CollectionEventLock";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i);
    var i = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(t.InstId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.Title);
    this.Uar();
    this.GetItem(6)?.SetUIActive(!e.IsUnlock);
    this.GetItem(7)?.SetUIActive(!e.IsUnlock);
    this.GetButton(0)?.SetSelfInteractive(!e.IsSubView);
    if (!e.IsSubView) {
      (t = Rotator_1.Rotator.Create()).Pitch = e.Rotation;
      t.Yaw = 0;
      t.Roll = -90;
      this.GetButton(0).GetOwner()?.K2_SetActorRotation(t.ToUeRotator(), false);
    }
  }
  Uar() {
    var e;
    var t;
    if (this.Lo.IsSubView) {
      this.GetItem(5)?.SetUIActive(false);
    } else {
      e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(this.Lo.ConfigId);
      t = this.Lo.IsUnlock;
      this.GetItem(5)?.SetUIActive(!e && t && this.Lo.Rotation !== 0);
    }
  }
}
exports.RogueEndingCollectionItem = RogueEndingCollectionItem;
//# sourceMappingURL=RogueEndingCollectionItem.js.map