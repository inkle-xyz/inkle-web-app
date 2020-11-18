import { atom } from 'recoil';
import { Widget } from '../interfaces/widget.interface';

export const selectedWidgetState = atom<Widget | null>({
  key: 'selectedWidget',
  default: null,
});

export const originalSelectedWidgetState = atom<Widget | null>({
  key: 'originalSelectedWidget',
  default: null,
});
