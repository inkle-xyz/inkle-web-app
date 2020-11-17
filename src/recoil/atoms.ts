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

export interface WidgetSettings {
  name: string;
  description: string;
  isDarkMode: boolean;
  deployedLink: string;
}

const defaultWidgetSettings: WidgetSettings = {
  name: 'New Widget',
  description: 'This is a great widget',
  isDarkMode: false,
  deployedLink: 'inkle.xyz/widgets/GeuIflafaqcnvmNfeaqpzp',
};

export const widgetSettingsState = atom<WidgetSettings>({
  key: 'widgetSettingsState',
  default: defaultWidgetSettings,
});
