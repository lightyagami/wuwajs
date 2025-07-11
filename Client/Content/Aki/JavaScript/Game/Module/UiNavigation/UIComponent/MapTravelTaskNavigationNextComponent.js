"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapTravelTaskNavigationNextComponent = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const NavigationGroupComponent_1 = require("./NavigationGroupComponent");
class MapTravelTaskNavigationNextComponent extends NavigationGroupComponent_1.NavigationGroupNextComponent {
  JumpToNextGroupListener() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapTravelTaskNavigationNext);
  }
  OnRelease() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapTravelTaskNavigationNext);
  }
}
exports.MapTravelTaskNavigationNextComponent = MapTravelTaskNavigationNextComponent;
//# sourceMappingURL=MapTravelTaskNavigationNextComponent.js.map