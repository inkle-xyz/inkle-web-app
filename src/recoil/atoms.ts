import { atom } from 'recoil';

export interface WidgetVariable {
  id: string;
  name: string;
  description: string;
  defaultValue: string;
}

const testWidgetVariable: WidgetVariable = {
  id: 'test_id',
  name: 'widget_name',
  description: 'Example description',
  defaultValue: 'Test',
};

export const widgetVariableState = atom<WidgetVariable[]>({
  key: 'widgetVariableState',
  default: [testWidgetVariable],
});
