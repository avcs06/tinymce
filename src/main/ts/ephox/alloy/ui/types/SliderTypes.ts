import { NativeSimulatedEvent } from '../../events/SimulatedEvent';
import { Cell, Option } from '@ephox/katamari';

import { AlloyBehaviourRecord } from '../../api/behaviour/Behaviour';
import { AlloyComponent } from '../../api/component/ComponentApi';
import { SketchBehaviours } from '../../api/component/SketchBehaviours';
import { AlloySpec, RawDomSchema } from '../../api/component/SpecTypes';
import { CompositeSketch, CompositeSketchDetail, CompositeSketchSpec } from '../../api/ui/Sketcher';
import { SugarPosition } from '../../alien/TypeDefinitions';

export interface SliderValueX {
  x: () => number
}

export interface SliderValueY {
  y: () => number
}

export interface SliderValueXY {
  x: () => number,
  y: () => number
}

export type SliderValue = SliderValueX | SliderValueY | SliderValueXY;

export interface SliderModelDetailParts {
  getSpectrum: (component: AlloyComponent) => AlloyComponent,
  getLeftEdge: (component: AlloyComponent) => Option<AlloyComponent>,
  getRightEdge: (component: AlloyComponent) => Option<AlloyComponent>,
  getTopEdge: (component: AlloyComponent) => Option<AlloyComponent>,
  getBottomEdge: (component: AlloyComponent) => Option<AlloyComponent>
}

export interface EdgeActions {
  'top-left': Option<(edge: AlloyComponent, detail: SliderDetail) => void>,
  'top': Option<(edge: AlloyComponent, detail: SliderDetail) => void>,
  'top-right': Option<(edge: AlloyComponent, detail: SliderDetail) => void>,
  'right': Option<(edge: AlloyComponent, detail: SliderDetail) => void>,
  'bottom-right': Option<(edge: AlloyComponent, detail: SliderDetail) => void>,
  'bottom': Option<(edge: AlloyComponent, detail: SliderDetail) => void>,
  'bottom-left': Option<(edge: AlloyComponent, detail: SliderDetail) => void>,
  'left': Option<(edge: AlloyComponent, detail: SliderDetail) => void>
}

export interface Manager {
  setValueFrom: (spectrum: AlloyComponent, detail: SliderDetail, value: number | SugarPosition) => void,
  setToMin: (spectrum: AlloyComponent, detail: SliderDetail) => void,
  setToMax: (spectrum: AlloyComponent, detail: SliderDetail) => void,
  getValueFromEvent: (simulatedEvent: NativeSimulatedEvent) => Option<number | SugarPosition>,
  setPositionFromValue: (slider: AlloyComponent, thumb: AlloyComponent, detail: SliderDetail, parts: SliderModelDetailParts) => void,
  onLeft: (spectrum: AlloyComponent, detail: SliderDetail) => Option<boolean>,
  onRight: (spectrum: AlloyComponent, detail: SliderDetail) => Option<boolean>,
  onUp: (spectrum: AlloyComponent, detail: SliderDetail) => Option<boolean>,
  onDown: (spectrum: AlloyComponent, detail: SliderDetail) => Option<boolean>,
  edgeActions: () => EdgeActions
}

export interface SliderModelDetail {
  minX?: () => number,
  maxX?: () => number,
  minY?: () => number,
  maxY?: () => number,
  value: () => Cell<SliderValue>,
  getInitialValue: () => () => SliderValue,
  manager: () => Manager
}

export interface SliderDetail extends CompositeSketchDetail {
  uid: () => string;
  dom: () => RawDomSchema;
  components: () => AlloySpec[];
  sliderBehaviours: () => SketchBehaviours;

  model: () => SliderModelDetail,
  rounded?: () => boolean;
  stepSize: () => number;
  snapToGrid: () => boolean;
  snapStart: () => Option<number>;

  onChange: () => (component: AlloyComponent, thumb: AlloyComponent, value: number | SliderValue) => void;
  onDragStart: () => (component: AlloyComponent, thumb: AlloyComponent) => void;
  onDragEnd: () => (component: AlloyComponent, thumb: AlloyComponent) => void;

  onInit: () => (component: AlloyComponent, thumb: AlloyComponent, spectrum: AlloyComponent, value: number | SliderValue) => void;

  mouseIsDown: () => Cell<boolean>;
}

export interface HorizontalSliderSpecMode {
  mode: 'x';
  minX?: number;
  maxX?: number;
  getInitialValue: () => SliderValueX;
}

export interface VerticalSliderSpecMode {
  mode: 'y';
  minY?: number;
  maxY?: number;
  getInitialValue: () => SliderValueY;
}

export interface TwoDSliderSpecMode {
  mode: 'xy';
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
  getInitialValue: () => SliderValueXY;
}

export interface SliderSpec extends CompositeSketchSpec {
  uid?: string;
  dom: RawDomSchema;
  components?: AlloySpec[];
  sliderBehaviours?: AlloyBehaviourRecord;

  model: HorizontalSliderSpecMode | VerticalSliderSpecMode | TwoDSliderSpecMode,
  stepSize?: number;
  snapToGrid?: boolean;
  snapStart?: number;
  rounded?: boolean;

  onChange?: (component: AlloyComponent, thumb: AlloyComponent, value: SliderValue) => void;
  onDragStart?: (component: AlloyComponent, thumb: AlloyComponent) => void;
  onDragEnd?: (component: AlloyComponent, thumb: AlloyComponent) => void;

  onInit?: (component: AlloyComponent, thumb: AlloyComponent, spectrum: AlloyComponent, value: SliderValue) => void;
}

export interface SliderSketcher extends CompositeSketch<SliderSpec, SliderDetail> {
  resetToMin: (slider: AlloyComponent) => void;
  resetToMax: (slider: AlloyComponent) => void;
  refresh: (slider: AlloyComponent) => void;
}