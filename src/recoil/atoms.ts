import { atom } from 'recoil';
import { WidgetState, WidgetVariableState } from '../interfaces/widget.interface';

const testWidgetVariable: WidgetVariableState = {
  id: 'test_id',
  name: 'widget_name',
  description: 'Example description',
  defaultValue: 'Test',
};

export const widgetVariableState = atom<WidgetVariableState[]>({
  key: 'widgetVariableState',
  default: [testWidgetVariable],
});

const defaultWidgetSettings: WidgetState = {
  id: 'widget_id',
  name: 'New Widget',
  description: 'This is a great widget',
  isDarkMode: false,
  deployedLink: 'inkle.xyz/widgets/GeuIflafaqcnvmNfeaqpzp',
};

export const widgetSettingsState = atom<WidgetState>({
  key: 'widgetSettingsState',
  default: defaultWidgetSettings,
});
