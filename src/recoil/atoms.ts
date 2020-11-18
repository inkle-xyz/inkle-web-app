import { atom } from 'recoil';
import { Widget } from '../interfaces/widget.interface';
import { User } from '../interfaces/user.interface';

export const selectedWidgetState = atom<Widget | null>({
  key: 'selectedWidget',
  default: null,
});

export const originalSelectedWidgetState = atom<Widget | null>({
  key: 'originalSelectedWidget',
  default: null,
});

export const userState = atom<User | null>({
  key: 'user',
  default: null,
});

export const usersWidgetsState = atom<Widget[] | null>({
  key: 'usersWidgets',
  default: null,
});
